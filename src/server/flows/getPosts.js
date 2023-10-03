// const puppeteer = require('puppeteer');
const puppeteerInstance = require('../services/puppeteer');
const getRemFontSize = require('../utils/getRemFontSize')

async function getPosts(query) {
    let { url, extras } = query;
    const browser = await puppeteerInstance.instance;
    const page = await browser.newPage();

    await page.goto(url);

    const posts = await page.evaluate((extrasIn) => {
        let getRemFontSize = (element) => { return parseFloat(getComputedStyle(element).fontSize) / parseFloat(getComputedStyle(document.documentElement).fontSize) }
        const posts = Array.from(document.querySelectorAll('div:nth-child(2)'));
        var postsArray = [];
        for(let post of posts) { 
            let title =  Array.from(post.querySelectorAll('div')).find(x => getRemFontSize(x) == 1.125);
            let description = Array.from(post.querySelectorAll('div')).find(x => getRemFontSize(x) == 0.875);
            if(!title || !description) continue;
            let extrasOut = {};
            if(extrasIn){
                extrasIn.split(',').forEach(extra => {
                    if(!extrasOut[extra]) extrasOut[extra] = [];

                    let foundElements = Array.from(post.querySelectorAll(extra));
                    foundElements.forEach(element => {
                        if(element.href)
                            extrasOut[extra] = [...extrasOut[extra], element.href]
                        else if(element.src)
                            extrasOut[extra] = [...extrasOut[extra], element.src]
                        else if(element.innerText)
                            extrasOut[extra] = [...extrasOut[extra], element.innerText]
                    })
                })
            }
            if(!postsArray.find(x => x.title == title.innerText))
                postsArray.push({
                    id: title.innerText.toLowerCase().replace(/ /g, '-'),
                    title: title.innerText,
                    description: description.innerText,
                    extras: extrasOut
                })
        }
        console.log(postsArray)
        return postsArray;
    }, extras)

    
    await page.close();

    return posts;
}

module.exports = getPosts;