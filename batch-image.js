const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const games = [
  'tank', 'fruit', 'flappybird', '2048', 'memory', /* ...补全你的游戏目录... */
];
const baseDir = 'D:/FruitCutSite/games/games-master';

games.forEach(game => {
  for (let i = 1; i <= 3; i++) {
    const src = path.join(baseDir, game, `screenshot${i}.png`);
    const thumb = path.join(baseDir, game, `thumb${i}.jpg`);
    const webp = path.join(baseDir, game, `screenshot${i}.webp`);
    if (fs.existsSync(src)) {
      sharp(src)
        .resize(320, 180)
        .jpeg({ quality: 80 })
        .toFile(thumb, () => {});
      sharp(src)
        .webp({ quality: 80 })
        .toFile(webp, () => {});
    }
  }
});