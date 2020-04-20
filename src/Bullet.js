import ShadowComponent from './ShadowComponent';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.shadowComponent = new ShadowComponent(scene, this, key);

    this.speed = 1;
    this.born = 0;
    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  fire(shooter, target, speed) {
    this.speed = speed;
    this.setPosition(shooter.x, shooter.y);
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
    this.born = 0;
  }

  update(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;

    this.shadowComponent.update(time, delta);

    if (this.born > 1800) {
      this.die();
    }
  }

  die() {
    this.setActive(false);
    this.setVisible(false);
    this.shadowComponent.remove();
    // this.destroy();
  }
}
