const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 你的所有游戏目录（可根据实际情况补充完整）
const games = [
  'tank', 'allalive', 'timberpig', 'magicplain', 'shoot', 'plane', 'attackonball', '2048', 'memory', 'russianblock', 'puzzle', 'fruit', 'flappybird', 'candy', 'collectstar', 'doudizhu', 'simplechess', 'shenjingmao', 'ballgame', 'bike', 'marathon', 'rpgdemo', 'legendofwolf', 'mota', 'weiduan', 'snap', 'wipeglass'
  // ...补充所有目录
];

(async () => {
  const browser = await puppeteer.launch();
  for (const game of games) {
    const page = await browser.newPage();
    const url = `file:///D:/FruitCutSite/games/games-master/${game}/index.html`;
    try {
      await page.goto(url, {waitUntil: 'networkidle2', timeout: 30000});
      await page.setViewport({width: 800, height: 600});
      await page.waitForTimeout(2000); // 等待2秒以确保游戏主界面加载
      const screenshotPath = `D:/FruitCutSite/games/games-master/${game}/screenshot.png`;
      await page.screenshot({path: screenshotPath});
      console.log(`Screenshot for ${game} saved.`);
    } catch (e) {
      console.error(`Failed to screenshot ${game}:`, e.message);
    }
    await page.close();
  }
  await browser.close();
})(); 