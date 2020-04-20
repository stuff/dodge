import heroimg from 'img/hero.png';
import heroBulletImg from 'img/hero_bullet.png';
import targetImg from 'img/target.png';
import ennemyBullet1Img from 'img/ennemy_bullet1.png';
import ennemy1Img from 'img/ennemy1.png';
import gameBackImg from 'img/game_back.png';
import explode1Img from 'img/explode_1.png';
import lifebarImg from 'img/lifebar.png';
import lifebarBgImg from 'img/lifebar_bg.png';
import font2Img from 'img/font2.png';
import fontImg from 'img/CAB08X14.png';
import titleImg from 'img/title.png';

import HeroSprite from './HeroSprite';
import Ennemy1 from './Ennemy1';
import Bullet from './Bullet';
import LifeBar from './LifeBar';
import Score from './Score';

const DELAY_BETWEEN_ENNEMY = 5000;
const DELAY_BETWEEN_ENNEMY_DIVIDER = 1.05;
const MAX_ENNEMIES = 50;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });

    this.state = 'enter_screen';
    this.score = null;
    this.ennemyBullets = null;
    this.hero = null;
    this.ennemies = null;
    this.ennemyBullets = null;
    this.gameDuration = 0;
    this.nextEnnemySpawn = null;
    this.timeBetweenEnnemies = DELAY_BETWEEN_ENNEMY;
  }

  preload() {
    this.load.spritesheet('hero_bullet', heroBulletImg, { frameWidth: 4 });
    this.load.spritesheet('hero', heroimg, { frameWidth: 16 });
    this.load.spritesheet('ennemy_1', ennemy1Img, { frameWidth: 16 });
    this.load.spritesheet('ennemy_bullet_1', ennemyBullet1Img, { frameWidth: 8 });
    this.load.spritesheet('explode_1', explode1Img, { frameWidth: 32 });
    this.load.image('target', targetImg);
    this.load.image('font2', font2Img);
    this.load.image('font', fontImg);
    this.load.image('lifebar', lifebarImg);
    this.load.image('lifebar_bg', lifebarBgImg);
    this.load.image('game_back', gameBackImg);
    this.load.image('title', titleImg);
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.cache.bitmapFont.add(
      'font2',
      Phaser.GameObjects.RetroFont.Parse(this, {
        image: 'font2',
        width: 16,
        height: 32,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!, ',
      }),
    );

    this.cache.bitmapFont.add(
      'font',
      Phaser.GameObjects.RetroFont.Parse(this, {
        image: 'font',
        charsPerRow: 40,
        width: 8,
        height: 14,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:;/-().,?="\'#@ ',
      }),
    );

    this.anims.create({
      key: 'moving',
      frames: this.anims.generateFrameNumbers('ennemy_1', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'exploding',
      frames: this.anims.generateFrameNumbers('ennemy_1', { start: 4, end: 7 }),
      frameRate: 16,
      repeat: 0,
    });

    this.anims.create({
      key: 'life_explode_1',
      frames: this.anims.generateFrameNumbers('explode_1', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: 0,
    });

    this.ennemyBullets = this.physics.add.group({
      classType: Bullet,
      defaultKey: 'ennemy_bullet_1',
      runChildUpdate: true,
    });

    this.background = this.add
      .tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'game_back')
      .setOrigin(0);
    this.ennemies = this.physics.add.group({ runChildUpdate: true });
    this.hero = new HeroSprite(this, centerX, centerY);
    this.hero.setEnnemyGroups(this.ennemies, this.ennemyBullets);

    this.lifeBar = new LifeBar(this, 104, 10, this.hero);

    this.score = new Score(this);

    this.gameOver = this.add
      .group([
        this.add
          .bitmapText(163, 123, 'font2', 'GAME OVER')
          .setOrigin(0.5, 0.5)
          .setTintFill(Phaser.Display.Color.GetColor(0, 0, 0))
          .setAlpha(0.6),
        this.add.bitmapText(160, 120, 'font2', 'GAME OVER').setOrigin(0.5, 0.5),
      ])
      .setDepth(100);

    this.pressPlay = this.add
      .group([
        this.add
          .bitmapText(162, 162, 'font', 'PRESS SPACE TO PLAY')
          .setOrigin(0.5, 0.5)
          .setTintFill(Phaser.Display.Color.GetColor(0, 0, 0))
          .setAlpha(0.6),
        this.add.bitmapText(160, 160, 'font', 'PRESS SPACE TO PLAY').setOrigin(0.5, 0.5),
      ])
      .setDepth(100);

    this.title = this.add.image(0, 0, 'title').setOrigin(0.5, 0.5).setPosition(160, 90);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.escKey = this.input.keyboard.addKey('ESC');

    this.goEnterScreen();
  }

  goEnterScreen() {
    this.state = 'enter_screen';
    this.title.setVisible(true);
    this.gameOver.setVisible(false);
    this.hero.setVisible(false);
    this.score.setVisible(false);
    this.lifeBar.setVisible(false);
    this.pressPlay.setVisible(true);
  }

  goGame() {
    this.state = 'game';
    this.title.setVisible(false);
    this.gameOver.setVisible(false);
    this.hero.setVisible(true);
    this.score.setVisible(true);
    this.lifeBar.setVisible(true);
    this.pressPlay.setVisible(false);

    this.score.reset();
    this.hero.reset();

    this.nextEnnemySpawn = DELAY_BETWEEN_ENNEMY / 2;
    this.timeBetweenEnnemies = DELAY_BETWEEN_ENNEMY;
    this.gameDuration = 0;
  }

  goGameOver() {
    this.state = 'game_over';
    this.title.setVisible(false);
    this.gameOver.setVisible(true);
    this.hero.setVisible(false);
    this.score.setVisible(true);
    this.lifeBar.setVisible(true);
    this.pressPlay.setVisible(true);
  }

  update(time, delta) {
    this.background.tilePositionX += Math.sin(time / 1000); //0.5;
    this.background.tilePositionY += 0.5;

    if (this.escKey.isDown) {
      this.goEnterScreen();
    }

    if (this.state === 'enter_screen') {
      if (this.cursors.space.isDown) {
        this.goGame();
      }
    }

    if (this.state === 'game') {
      this.gameDuration += delta;

      if (this.gameDuration > this.nextEnnemySpawn && this.ennemies.countActive() < MAX_ENNEMIES) {
        this.spawnNewEnnemy();
      }

      this.gameOver.setVisible(!this.hero.lifeComponent.isAlive());

      if (!this.hero.lifeComponent.isAlive() /*&& this.cursors.space.isDown*/) {
        // this.scene.restart();
        this.goGameOver();
      }
    }

    if (this.state === 'game_over') {
      if (this.cursors.space.isDown) {
        this.goGame();
      }
    }
  }

  spawnNewEnnemy() {
    if (!this.hero.lifeComponent.isAlive()) {
      return;
    }

    this.ennemies.add(
      new Ennemy1(this, this.hero, this.ennemyBullets, () => {
        this.score.inc();
      }),
    );
    this.timeBetweenEnnemies /= DELAY_BETWEEN_ENNEMY_DIVIDER;
    this.nextEnnemySpawn = this.gameDuration + this.timeBetweenEnnemies;
  }
}
