import 'phaser';
import './bassoonplayer-min';

import GameScene from './GameScene';

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 256;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.NONE,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zoom: 2,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
