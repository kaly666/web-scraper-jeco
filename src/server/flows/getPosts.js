// const puppeteer = require('puppeteer');
const puppeteerInstance = require('../services/puppeteer');

async function getPosts(query) {
    let { url, extras } = query;
    const browser = await puppeteerInstance.instance;
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const posts = await page.evaluate((extrasQuery) => { 
        let getRemFontSize = (element) => { return parseFloat(getComputedStyle(element).fontSize) / parseFloat(getComputedStyle(document.documentElement).fontSize) }
        const posts = Array.from(document.querySelectorAll('main > div > div > div > div'));
        var postsArray = [];
        for(let post of posts) { 
            var title =  Array.from(post.querySelectorAll('div')).find(x => getRemFontSize(x) == 1.125);
            var description = Array.from(post.querySelectorAll('div')).find(x => getRemFontSize(x) == 0.875);
            var extrasOut = null;

            if(!title || !description){
                // fallback for other websites, why not
                var title = Array.from(post.querySelectorAll('h3'));
                var description = Array.from(post.querySelectorAll('p')).length ? Array.from(post.querySelectorAll('p')) : Array.from(post.querySelectorAll('span'));
                if(!title || !description) continue;
            }
            
            if(extrasQuery?.split(',').length){
                extrasOut = {};
                for(let extra of extrasQuery.split(',')){
                    try {
                        extrasOut[extra] = Array.from(post.querySelectorAll(extra));
                        if(!extrasOut[extra].length) continue;

                        if(extrasOut[extra][0]?.src) {
                            extrasOut[extra] = extrasOut[extra]?.map(x => {
                                return x.src;
                            })
                        } else if(extrasOut[extra][0]?.href) {
                            extrasOut[extra] = extrasOut[extra]?.map(x => {
                                return x.href
                            })
                        } else if(extrasOut[extra][0]?.innerText) {
                            extrasOut[extra] = extrasOut[extra]?.map(x => {
                                return x.innerText
                            })
                        }
                    } catch(err) {
                        console.log(err);
                    }
                }
            }

            if(!postsArray.find(x => x.title == title.innerText) && title.innerText){
                let queryResult = {
                    id: title.innerText?.toLowerCase().replace(/ /g, '-'),
                    title: title.innerText,
                    description: description.innerText
                }
                if(extrasOut) {
                    queryResult = Object.assign(queryResult, {extras: extrasOut})
                }
                postsArray.push(queryResult)
            }
        }
        return postsArray;
    }, extras)
    console.log(posts);
    
    return posts;
}

module.exports = getPosts;