"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const driverConfig_1 = require("./driverConfig");
const cucumber_1 = require("cucumber");
const chai = require("chai");
const fs_1 = require("fs");
const path_1 = require("path");
const Calipers = require("calipers");
const sharp = require("sharp");
const canvas_1 = require("canvas");
function CustomWorld() {
    const config = new driverConfig_1.DriverConfig();
    const { server, capabilities } = config.getDriverConfig();
    this.assert = chai.assert;
    this.expect = chai.expect;
    cucumber_1.setDefaultTimeout(60 * 1000);
    this.customerDetails = [];
    this.orderDetails = [];
    this.orderHistoryListedTitles = [];
    this.orderHistoryListedIsbns = [];
    this.orrListedOrderedIsbns = [];
    this.orderActivityLogText = [];
    this.bundleFlag = false;
    this.testEnv = config.testEnv;
    this.platform = config.platform;
    this.osName = config.osName;
    this.osVersion = config.osVersion;
    this.browserName = config.browserName;
    this.driver = new selenium_webdriver_1.Builder()
        .usingServer('http://' + server + '/wd/hub')
        .withCapabilities(capabilities)
        .build();
    this.driver.saveScreenshot = (filename) => {
        return new Promise((resolve) => {
            if (!/\.png$/.test(filename)) {
                filename += '.png';
            }
            const filepath = path_1.join(__dirname, '..', '..', 'screenshots', filename);
            return this.driver.takeScreenshot().then(image => {
                fs_1.writeFile(filepath, image, 'base64', err => {
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
    this.driver.saveFullScreenshot = (filename) => __awaiter(this, void 0, void 0, function* () {
        if (!/\.png$/.test(filename)) {
            filename += '.png';
        }
        this.driver.sleep(5000);
        const filepath = path_1.join(__dirname, '..', '..', 'screenshots', `full_${filename}`);
        const files = {
            parts: []
        };
        const calipers = Calipers('png');
        const scrollHeight = yield this.driver.executeScript('return document.body.scrollHeight;');
        const windowHeight = yield this.driver.executeScript('return window.outerHeight || window.screen.height;');
        yield this.driver.executeScript(`
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
        files.mask = yield this.driver.saveScreenshot(`mask_${filename}`);
        yield this.driver.executeScript(`
            document.querySelector(".cropMask").remove();
        `);
        const imageSize = yield calipers.measure(files.mask.filepath);
        if (!Array.isArray(imageSize.pages) || !imageSize.pages.length) {
            throw new Error(`Failed to get image size data for ${files.mask.filepath}`);
        }
        const isIOS = yield this.driver.executeScript('return /iP(?:hone|ad|od)/i.test(navigator.userAgent);');
        const imageWidth = imageSize.pages[0].width;
        const imageHeight = imageSize.pages[0].height;
        const imageFactor = isIOS ? windowHeight / imageHeight : yield this.driver.executeScript('return window.devicePixelRatio;');
        const canvas = canvas_1.createCanvas(imageWidth, imageHeight);
        const ctx = canvas.getContext('2d');
        const cropArea = yield canvas_1.loadImage(files.mask.filepath)
            .then((image) => __awaiter(this, void 0, void 0, function* () {
            ctx.drawImage(image, 0, 0);
            yield this.driver.sleep(5000);
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
        }));
        if (cropArea.x <= 0 && cropArea.y <= 0 && cropArea.w <= 0 && cropArea.h <= 0) {
            throw new Error('Could not calculate crop area :(');
        }
        cropArea.h -= 1;
        const scrollCount = Math.ceil(scrollHeight / (cropArea.h * imageFactor));
        const fullImageHeight = Math.ceil(cropArea.h * (scrollHeight / (cropArea.h * imageFactor)));
        for (let i = 0; i < scrollCount; i++) {
            yield this.driver.executeScript(`window.scrollTo(0,${(cropArea.h * imageFactor) * i});`);
            files.parts.push(yield this.driver.saveScreenshot(`part_${i}_${filename}`));
        }
        const images = [];
        for (let i = 0, last = files.parts.length - 1; i < files.parts.length; i++) {
            const input = yield sharp(files.parts[i].filepath)
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
        files.full = yield sharp({
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
    });
}
cucumber_1.setWorldConstructor(CustomWorld);
//# sourceMappingURL=world.js.map