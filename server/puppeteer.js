const puppeteer = require('puppeteer');

const scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('a.result-title')
  // await page.screenshot({path: 'screenshot.png'});

  let scrapedInfo = await page.evaluate(() => {
    // debugger;
    // can't seem to pause here
    let links = document.querySelectorAll('a.result-title');
    let times = document.querySelectorAll('time.result-date');
    let results = [];
    for (var i = 0; i < links.length; i++) {
      results.push({
        url: links[i].href,
        text: links[i].innerText,
        date: times[i].dateTime
      })
    }
    // console.log(links)
    console.log('DO THAT THING I LIKE')
    return results;
  })
  // await browser.close();
  return scrapedInfo;
}

module.exports = scrape;