'use strict';

// let mercutioVersion = process.env.MERCUTIO;

let selectors = {
    menuButton  : '.js-header-menu-toggle-open',
    menu        : '.primary-menu',
    header      : 'header',
    footer      : 'footer.footer-main'
};

gemini.suite('Core', (suite) => {
    suite.setUrl('/')

    gemini.suite('header', (section) => {
        section.setCaptureElements(selectors.header).capture('plain', (actions) => {
            actions.wait(200);
        });
    });

    gemini.suite('menu', (section) => {
        section.setCaptureElements(selectors.menu).capture('opened', (actions, find) => {
            let $menuButton = find(selectors.menuButton);
            actions.click($menuButton).wait(300);
        });
    });

    gemini.suite('footer', (section) => {
        section.setCaptureElements(selectors.footer).capture('plain', (actions) => {
            // Because back to top button is flakey, and header is position fixed
            actions.executeJS(function(window) {
                var btt = document.getElementsByClassName('back-to-top');
                var header = document.getElementsByTagName('header');
                var mainContent = document.getElementById('maincontent');
                btt[0].parentNode.removeChild(btt[0]);
                header[0].parentNode.removeChild(header[0]);
                mainContent.parentNode.removeChild(mainContent);
            });
        });
    });
});
