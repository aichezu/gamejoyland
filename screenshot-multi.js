const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const games = [
  // ...你的游戏目录
];

const screenshotCount = 3;
const interval = 2000;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  });
  for (const game of games) {
    const page = await browser.newPage();
    const url = `file:///D:/FruitCutSite/games/games-master/${game}/index.html`;
    try {
      await page.goto(url, {waitUntil: 'networkidle2', timeout: 30000});
      await page.setViewport({width: 800, height: 600});
      for (let i = 1; i <= screenshotCount; i++) {
        await page.waitForTimeout(interval);
        const screenshotPath = `D:/FruitCutSite/games/games-master/${game}/screenshot${i}.png`;
        await page.screenshot({path: screenshotPath});
        console.log(`Screenshot ${i} for ${game} saved.`);
      }
    } catch (e) {
      console.error(`Failed to screenshot ${game}:`, e.message);
    }
    await page.close();
  }
  await browser.close();
})();