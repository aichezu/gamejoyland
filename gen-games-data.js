const fs = require('fs');
const path = require('path');

// 游戏类型映射（可根据实际需求扩展）
const typeMap = {
  tank: 'Action',
  fruit: 'Casual',
  flappybird: 'Casual',
  '2048': 'Puzzle',
  memory: 'Puzzle',
  shoot: 'Shooter',
  simplechess: 'Strategy',
  doudizhu: 'Strategy',
  shenjingmao: 'Strategy',
  ballgame: 'Sports',
  bike: 'Sports',
  rpgdemo: 'RPG',
  // ...可扩展
};

// 简介映射（可根据实际需求扩展）
const descMap = {
  tank: 'Classic tank action game. Destroy enemy tanks and protect your base!',
  fruit: 'Slice the flying fruits! Fast, fun, and addictive.',
  flappybird: 'Tap to fly and avoid the pipes. How far can you go?',
  '2048': 'Combine numbers to reach 2048. Simple to play, hard to master!',
  memory: 'Test your memory! Flip cards and find all the matching pairs.',
  shoot: 'Aim and shoot! Test your accuracy and reaction speed.',
  simplechess: 'A simplified chess game. Challenge your mind!',
  doudizhu: 'Classic Chinese poker game. Outsmart your opponents!',
  shenjingmao: 'Trap the cat before it escapes! A game of wits.',
  ballgame: 'Play billiards and show off your skills!',
  bike: 'Ride your bike and overcome obstacles!',
  rpgdemo: 'Embark on a mini adventure, defeat monsters, and level up!',
  // ...可扩展
};

const gamesRoot = path.join(__dirname, 'games-master');
const outputJson = path.join(__dirname, 'games-data.json');
const outputJs = path.join(__dirname, 'games-data.js');
const defaultThumb = 'default-thumb.png';

function getMainImages(gameDir) {
  const prefer = ['logo.png', 'background.png', 'battlecity.png', 'gameover.png'];
  let imgs = [];
  // 递归查找主图
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (/\.(png|jpg|jpeg|gif)$/i.test(file)) {
        imgs.push(full.replace(gamesRoot + path.sep, 'games-master/').replace(/\\/g, '/'));
      }
    }
  }
  walk(gameDir);
  // 优先主图
  for (const p of prefer) {
    const found = imgs.find(img => img.endsWith('/' + p));
    if (found) return [found];
  }
  if (imgs.length === 0) {
    imgs.push(defaultThumb);
  }
  // 否则返回前3张
  return imgs.slice(0, 3);
}

function getGameList() {
  return fs.readdirSync(gamesRoot).filter(d => {
    const full = path.join(gamesRoot, d);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'index.html'));
  });
}

function toTitle(str) {
  return str.replace(/(^|[-_])(\w)/g, (a, b, c) => ' ' + c.toUpperCase()).trim();
}

function main() {
  const games = getGameList();
  const data = games.map(dir => {
    const name = toTitle(dir);
    const type = typeMap[dir] || 'Casual';
    const shortDesc = descMap[dir] || 'A fun web game.';
    const screenshots = getMainImages(path.join(gamesRoot, dir));
    const iframeUrl = fs.existsSync(path.join(gamesRoot, dir, 'index.html')) ? `games-master/${dir}/index.html` : '';
    const age = '8-12';
    const funLevel = 4;
    const highlights = `Fun, easy to play, suitable for all ages.`;
    const howToPlay = `Use mouse or keyboard to control the game. Try to get the highest score!`;
    return { name, type, age, funLevel, screenshots, shortDesc, highlights, howToPlay, iframeUrl };
  });
  fs.writeFileSync(outputJson, JSON.stringify(data, null, 2));
  fs.writeFileSync(outputJs, 'const gamesData = ' + JSON.stringify(data, null, 2) + ';');
  console.log('已生成 games-data.json 和 games-data.js，可直接粘贴 gamesData 到 index.htm');
}

main(); 