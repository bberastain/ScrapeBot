const puppeteer = require('puppeteer');

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof');
  await page.waitForSelector('a.result-image')

  let scrapedInfo = await page.evaluate(() => {
    // debugger;
    // can't seem to pause here
    let links = document.querySelectorAll('a.result-image');
    let results = [];
    links.forEach(item => results.push(item.href));

    console.log(links)
    return results;
  })
  // await browser.close();
  return scrapedInfo;
}

module.exports = scrape;