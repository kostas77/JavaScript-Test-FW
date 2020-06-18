import { Builder, ScreenshotData } from 'selenium-webdriver';
import { DriverConfig } from './driverConfig';
import { setWorldConstructor, setDefaultTimeout } from 'cucumber';
import * as chai from 'chai';
import { writeFile } from 'fs';
import { join } from 'path';
import * as Calipers from 'calipers';
import * as sharp from 'sharp';
import { createCanvas, loadImage } from 'canvas';

declare module 'selenium-webdriver' {
    interface WebDriver {
        saveScreenshot(filename: string): Promise<ScreenshotData>;
        saveFullScreenshot(filename: string): Promise<string>;
    }
    interface ScreenshotData {
        filepath: string;
        image: string;
    }
}

function CustomWorld(): void {
    const config = new DriverConfig();
    const { server, capabilities } = config.getDriverConfig();
    this.assert = chai.assert;
    this.expect = chai.expect;

    setDefaultTimeout(60 * 1000);

    this.customerDetails = []; // Used to record current customer details during sign-in step.
    this.orderDetails = []; // Used to record new order details so can validate against ORR and order xml
    this.orderHistoryListedTitles = []; // Used to hold the titles found on the order's Order History entry
    this.orderHistoryListedIsbns = []; // Used to hold the ISBNs found on the order's Order History entry
    this.orrListedOrderedIsbns = []; // Used to hold the ISBNs found on the order's ORR page
    this.orderActivityLogText = [];  // Used to record activity log record text from ORR order page
    this.bundleFlag = false;
    this.testEnv = config.testEnv;
    this.platform = config.platform;
    this.osName = config.osName;
    this.osVersion = config.osVersion;
    this.browserName = config.browserName;

    this.driver = new Builder()
        .usingServer('http://' + server + '/wd/hub')
        .withCapabilities(capabilities)
        .build();

    this.driver.saveScreenshot = (filename: string): Promise<ScreenshotData> => {
        return new Promise((resolve) => {
            if (!/\.png$/.test(filename)) {
                filename += '.png';
            }

            const filepath = join(__dirname, '..', '..', 'screenshots', filename);
            return this.driver.takeScreenshot().then(image => {
                writeFile(filepath, image, 'base64', err => {
                    if (err) {
                        throw err;
                    }

                    return resolve({
                        filepath,
                        image
                    });
                });
            });
        });
    };

    this.driver.saveFullScreenshot = async (filename: string): Promise<string> => {
        if (!/\.png$/.test(filename)) {
            filename += '.png';
        }
        // Sleep to ensure any navigation has finished
        this.driver.sleep(5000);

        const filepath = join(__dirname, '..', '..', 'screenshots', `full_${filename}`);
        const files: any = {
            parts: []
        };
        const calipers = Calipers('png');

        // Get window/document dimensions
        const scrollHeight = await this.driver.executeScript('return document.body.scrollHeight;');
        const windowHeight = await this.driver.executeScript('return window.outerHeight || window.screen.height;');

        // Add a crop mask
        await this.driver.executeScript(`
            var elems = document.body.getElementsByTagName("*");
            var len = elems.length
            for (var i=0;i<len;i++) {
                if (window.getComputedStyle(elems[i],null).getPropertyValue('position') == 'fixed') {
                    elems[i].style.position = 'absolute';
                }
            }
            window.scrollTo(0,0);
            var cropMask = document.createElement('div');
            cropMask.classList.add('cropMask');
            cropMask.style.cssText = 'position: absolute; top: 0px; left: 0px; background-color: rgb(255, 0, 0); width: 100vw; height: 100vh; z-index: 99999999;'
            document.body.prepend(cropMask);
        `);

        // Save a screenshot of the crop mask
        files.mask = await this.driver.saveScreenshot(`mask_${filename}`);

        // Clean up the crop mask
        await this.driver.executeScript(`
            document.querySelector(".cropMask").remove();
        `);

        // Get the crop area
        const imageSize = await calipers.measure(files.mask.filepath);

        if (!Array.isArray(imageSize.pages) || !imageSize.pages.length) {
            throw new Error(`Failed to get image size data for ${files.mask.filepath}`);
        }

        const isIOS = await this.driver.executeScript('return /iP(?:hone|ad|od)/i.test(navigator.userAgent);');
        const imageWidth = imageSize.pages[0].width;
        const imageHeight = imageSize.pages[0].height;
        const imageFactor = isIOS ? windowHeight / imageHeight : await this.driver.executeScript('return window.devicePixelRatio;');

        const canvas = createCanvas(imageWidth, imageHeight);
        const ctx = canvas.getContext('2d');
        const cropArea = await loadImage(files.mask.filepath)
            .then(async (image) => {
                ctx.drawImage(image, 0, 0);

                // Sleep to ensure the image has been drawn
                await this.driver.sleep(5000);

                const dimensions = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                };
                for (let i = 0; i < imageHeight; i++) {
                    const d = ctx.getImageData(Math.floor(imageWidth / 2), i, 1, 1).data;
                    if (d[0] === 255 && d[1] === 0 && d[2] === 0) {
                        dimensions.y = i;
                        break;
                    }
                }
                for (let i = dimensions.y; i < imageHeight; i++) {
                    const d = ctx.getImageData(Math.floor(imageWidth / 2), i, 1, 1).data;
                    if (d[0] !== 255 && d[1] !== 0 && d[2] !== 0) {
                        dimensions.h = i - dimensions.y;
                        break;
                    }
                    if (i === (imageHeight - 1)) {
                        dimensions.h = imageHeight - dimensions.y;
                    }
                }
                for (let i = 0; i < imageWidth; i++) {
                    const d = ctx.getImageData(i, dimensions.y, 1, 1).data;
                    if (d[0] === 255 && d[1] === 0 && d[2] === 0) {
                        dimensions.x = i;
                        break;
                    }
                }
                for (let i = dimensions.x; i < imageWidth; i++) {
                    const d = ctx.getImageData(i, dimensions.y, 1, 1).data;
                    if (d[0] !== 255 && d[1] !== 0 && d[2] !== 0) {
                        dimensions.w = i - dimensions.x;
                        break;
                    }
                    if (i === (imageWidth - 1)) {
                        dimensions.w = imageWidth - dimensions.x;
                    }
                }

                return dimensions;
            }
        );

        if (cropArea.x <= 0 && cropArea.y <= 0 && cropArea.w <= 0 && cropArea.h <= 0) {
            throw new Error('Could not calculate crop area :(');
        }

        cropArea.h -= 1;

        // Get number of scrolls to make
        const scrollCount = Math.ceil(scrollHeight / (cropArea.h * imageFactor));
        const fullImageHeight = Math.ceil(cropArea.h * (scrollHeight / (cropArea.h * imageFactor)));


        for (let i = 0; i < scrollCount; i++) {
            await this.driver.executeScript(`window.scrollTo(0,${(cropArea.h * imageFactor) * i});`);
            files.parts.push(await this.driver.saveScreenshot(`part_${i}_${filename}`));
        }

        const images = [];

        for (let i = 0, last = files.parts.length - 1; i < files.parts.length; i++) {
            const input = await sharp(files.parts[i].filepath)
                .extract({
                    left: cropArea.x,
                    top: cropArea.y,
                    width: cropArea.w,
                    height: cropArea.h
                })
                .toBuffer();

            images.push({
                input,
                top: (i === last) ? fullImageHeight - cropArea.h : i * cropArea.h,
                left: 0
            });
        }

        files.full = await sharp({
            create: {
                width: cropArea.w,
                height: fullImageHeight,
                channels: 4,
                background: { r: 255, g: 255, b: 255 }
            }
        })
            .composite(images)
            .toFile(filepath);

        return filepath;
    };
}

setWorldConstructor(CustomWorld);
