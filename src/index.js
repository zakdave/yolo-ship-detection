import puppeteer from 'puppeteer';
import * as config from './config.js';


const scraped = [];
const quantity = config.default.quantity;
const queries = config.default.queries;


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let index = 0; index < queries.length; index++) {
    const query = queries[index];

    console.log(`Searching for query: ${query}`);
    await page.goto('https://duckduckgo.com');
    await page.type('#searchbox_input', query);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    //click images tab
    await page.waitForSelector('#duckbar_static > li:nth-child(2) > a');
    await page.click('#duckbar_static > li:nth-child(2) > a');

    // grab required results images from query
    const results = [];
  
    for (let i = 0; i < 2;i++) {
      try {
        await page.waitForSelector(`#zci-images > div > div.tile-wrap > div.zci__main.zci__main--tiles.js-tiles.has-nav.tileview__images.has-tiles--grid > div:nth-child(${3+i}) > div.tile--img__media > span > img`);
        const imgSrc = await page.$eval(`#zci-images > div > div.tile-wrap > div.zci__main.zci__main--tiles.js-tiles.has-nav.tileview__images.has-tiles--grid > div:nth-child(${3+i}) > div.tile--img__media > span > img`, img => img.src);
        results.push(imgSrc);

      } catch({name , message}) {
        console.log(`${name} error at index: ${i}: ${message}`);
        //save page error screenshot
        await page.screenshot({path: `images/errors/error${i}.jpeg`});
      }
    }
    scraped[query] = results;
  }
  await browser.close();
})();

console.log(scraped);