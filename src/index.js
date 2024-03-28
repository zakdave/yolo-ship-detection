import puppeteer from 'puppeteer';

(async () => {

  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('https://google.com');

  // Query for an element handle.
  const imgElement = await page.waitForSelector('img');

  console.log(imgElement)

  await page.screenshot({
    path: 'first-screenshot.png'
  });

  // Dispose of handle
  await imgElement.dispose();

  // Close browser.
  await browser.close();

})();