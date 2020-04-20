import FireComponent from './FireComponent';
import LifeComponent from './LifeComponent';
import ShadowComponent from './ShadowComponent';

export default class Ennemy1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, target, bulletGroup, dieCallback) {
    super(scene, -20, -20, 'ennemy_1');

    this.fireComponent = new FireComponent(scene, this, {
      group: bulletGroup,
      autoFire: { delay: 2000, target },
      salve: 2,
    });
    this.lifeComponent = new LifeComponent(scene, this, 1);
    this.shadowComponent = new ShadowComponent(scene, this, 'ennemy_1');

    this.dieCallback = dieCallback;
    this.scene = scene;
    this.speed = 0.1;
    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.life = 1;

    this.setDepth(1);
    scene.add.existing(this);

    this.play('moving');

    this.init(scene);
  }

  init(scene) {
    const rnd = Phaser.Math.RND.between(0, 1);
    const dir = Phaser.Math.RND.between(0, 1);
    let pos1;
    let pos2;
    let startPosition;
    let endPosition;

    const mainCamera = scene.cameras.main;
    // horizontal mouving
    if (rnd === 1) {
      pos1 = Phaser.Math.RND.between(0, mainCamera.height);
      pos2 = Phaser.Math.RND.between(0, mainCamera.height);

      if (dir === 1) {
        startPosition = { x: mainCamera.width + this.width, y: pos1 };
        endPosition = { x: 0 - this.width, y: pos2 };
      } else {
        startPosition = { x: 0 - this.width, y: pos2 };
        endPosition = { x: mainCamera.width + this.width, y: pos1 };
      }

      // vertical mouving
    } else {
      pos1 = Phaser.Math.RND.between(0, mainCamera.width);
      pos2 = Phaser.Math.RND.between(0, mainCamera.width);

      if (dir === 1) {
        startPosition = { x: pos2, y: mainCamera.height + this.height };
        endPosition = { x: pos1, y: 0 - this.height };
      } else {
        startPosition = { x: pos1, y: 0 - this.height };
        endPosition = { x: pos2, y: mainCamera.height + this.height };
      }
    }

    this.setPosition(startPosition.x, startPosition.y);
    this.direction = Math.atan(
      (endPosition.x - startPosition.x) / (endPosition.y - startPosition.y),
    );

    if (endPosition.y >= startPosition.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
  }

  update(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;

    if (
      this.x > this.scene.cameras.main.width + this.width ||
      this.x < -this.width ||
      this.y > this.scene.cameras.main.height + this.height ||
      this.y < -this.height
    ) {
      this.setActive(false);
      this.setVisible(false);
    }

    this.fireComponent.update(time, delta);
    this.lifeComponent.update(time, delta);
    this.shadowComponent.update(time, delta);
  }

  hit() {
    this.lifeComponent.damage(1);
    if (this.lifeComponent.dying) {
      this.xSpeed /= 2;
      this.ySpeed /= 2;
    }
  }

  die() {
    this.shadowComponent.remove();
    this.destroy();
    this.dieCallback();
  }
}
