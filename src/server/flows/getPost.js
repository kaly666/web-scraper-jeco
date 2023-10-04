const puppeteerInstance = require('../services/puppeteer');
const analyzeSentiment = require('./sentimentAnalysis');

async function getPost(query) {
    const { url, sentiment, rawText } = query;
    const browser = await puppeteerInstance.instance;
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let text = await page.evaluate((raw) => {
        let sentimentResult = 'N/A';
        let postElements = Array.from(document.querySelectorAll('div > div > div:nth-child(2) > div')[0].children)

        let category = postElements[0].innerText;
        let title = postElements[1].innerText;
        
        try {
            if(raw) {
                let raw = postElements[2].innerText;
                return {
                    category,
                    title,
                    content: null,
                    sentimentResult,
                    raw
                } 
            }
        } catch(err) {
            console.log('Could not return raw data. Continuing ...')
        }

        let content = Array.from(postElements[2].children)
        let sections = [];
        let sectionIndex = 0;
        for(let element of content) {
            if(getComputedStyle(element).fontWeight > 400){
                sectionIndex++;
            }
            if(element.innerText == undefined) continue;

            sections[sectionIndex] += element.innerText + '\n';
        }

        return {
            category,
            title,
            content: sections,
            sentimentResult,
            raw: postElements[2].innerText
        }
    }, rawText)

    if(sentiment == 'true') {
        text.sentimentResult = analyzeSentiment(text.raw);
    }

    return text;
}

module.exports = getPost;