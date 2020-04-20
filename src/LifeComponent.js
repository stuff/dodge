export default class LifeComponent {
  constructor(scene, object, life) {
    this.object = object;
    this.maxLife = life;

    this.explosion = scene.add.sprite(0, 0, 'explode_1');
    this.explosion.setDepth(10);

    this.reset();
  }

  reset() {
    this.life = this.maxLife;
    this.life = this.maxLife;
    this.dying = false;
    this.explosion.setVisible(false);
    this.explosion.once(
      'animationcomplete-life_explode_1',
      (animation, frame) => {
        this.object.die();
        this.explosion.setVisible(false);
      },
      this,
    );

    this.hitIndicatorLife = null;
  }

  damage(amount) {
    if (this.dying) {
      return;
    }
    this.life -= amount;
    this.object.setTintFill(Phaser.Display.Color.GetColor(255, 255, 255));
    this.hitIndicatorLife = 0;

    if (this.life <= 0) {
      this.dying = true;
      this.explosion.setVisible(true);
      this.object.setVisible(false);
      this.explosion.play('life_explode_1');
    }
  }

  isAlive() {
    return this.life > 0;
  }

  update(time, delta) {
    this.explosion.setPosition(this.object.x, this.object.y);

    if (this.hitIndicatorLife !== null) {
      this.hitIndicatorLife += delta;

      if (this.hitIndicatorLife > 100) {
        this.object.clearTint();
      }
    }
  }
}
