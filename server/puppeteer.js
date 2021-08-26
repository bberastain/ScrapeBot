const puppeteer = require('puppeteer');

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://offerup.com/?__cf_chl_captcha_tk__=pmd_awYT7WFecm3VTNt3ppLVNiSGsPPcZWShzLt7c7NkRHQ-1630001767-0-gqNtZGzNAuWjcnBszQel');
  await page.waitForSelector('a.jss265')

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
    return results;
  })
  await browser.close();
  return scrapedInfo;
}

module.exports = scrape;