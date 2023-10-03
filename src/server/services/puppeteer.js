const { config } = require('process');
const puppeteer = require('puppeteer-extra');

puppeteer.use(require('puppeteer-extra-plugin-stealth')());

class PuppeteerSingleton {
    constructor() {
        this.browser = null;
        this.pages = [];
    }

    /**
     * @returns {Promise<puppeteer.Browser>}
     */
    get instance() {
        if(!this.browser) {
            this.browser = new Promise((resolve) => {
                puppeteer.launch(config.puppeteer).then(browser => {
                    resolve(browser);
                })
            })

            return this.browser;
        }
        else {
            return this.browser;
        }
    }
    
    async init() {
        
    }
    
}

const puppeteerInstance = new PuppeteerSingleton();

module.exports = puppeteerInstance;