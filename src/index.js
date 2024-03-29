import puppeteer from 'puppeteer';
import * as config from './config.js';


const results = {};
const quantity = config.default.quantity;
const queries = config.default.queries;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let index = 0; index < queries.length; index++){
    const query = queries[index];
    results[query] = [];
    console.log(`Searching for query: ${query}`);
    await page.goto('https://images.google.com');

    //Type query with gLFyf google class name selector
    await page.type('.gLFyf', query);
    await page.keyboard.press('Enter');

    //wait for results
    await page.waitForNavigation();

    //click first image to pull up side window to expose full sized image
    await page.waitForSelector('#islrg > div.islrc > div:nth-child(2) > a.FRuiCf.islib.nfEiy > div.fR600b.islir');
    
    await page.click('#islrg > div.islrc > div:nth-child(2) > a.FRuiCf.islib.nfEiy > div.fR600b.islir');

    for (let j = 0; j < quantity; j++) {
      try {
        //wait for image to render
        await page.waitForSelector('#Sva75c > div.A8mJGd.NDuZHe.OGftbe-N7Eqid-H9tDt > div.LrPjRb > div.AQyBn > div.tvh9oe.BIB1wf > c-wiz > div > div > div > div > div.v6bUne > div.p7sI2.PUxBg > a > img.sFlh5c.pT0Scc.iPVvYb');
        
        //collect image src
        const imgSrc = await page.$eval('#Sva75c > div.A8mJGd.NDuZHe.OGftbe-N7Eqid-H9tDt > div.LrPjRb > div.AQyBn > div.tvh9oe.BIB1wf > c-wiz > div > div > div > div > div.v6bUne > div.p7sI2.PUxBg > a > img.sFlh5c.pT0Scc.iPVvYb', img => img.src);
        results[query].push(imgSrc)
        //click arrow to go to next image
        await page.click('#Sva75c > div.A8mJGd.NDuZHe.OGftbe-N7Eqid-H9tDt > div.LrPjRb > div.AQyBn > div.tvh9oe.BIB1wf > c-wiz > div > div > div > div > div.s9n5ef.VTMWGb > div > div.HJRshd > button:nth-child(2) > div')
        
      } catch({ name, message }) {
        console.log(`${name} error at index: ${j}: ${message}`);
        //save page error screenshot
        await page.screenshot({path: `images/errors/error${j}.jpeg`});

        }
    }
  }
  //await page.screenshot({path: `scraped-images/screencap.jpeg`});
  await browser.close();
})();
