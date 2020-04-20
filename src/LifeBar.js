import ShadowComponent from './ShadowComponent';

export default class LifeBar extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, hero) {
    super(scene, x, y, 'lifebar');

    this.hero = hero;

    // this.setDepth(1);
    this.setOrigin(0, 0);
    this.setCrop(0, 0, 8, 24);
    this.shadowComponent = new ShadowComponent(scene, this, 'lifebar');

    this.bg = scene.add.image(x, y, 'lifebar_bg');
    this.bg.setOrigin(0, 0);

    scene.add.existing(this);
  }

  setVisible(visibility) {
    super.setVisible(visibility);
    this.bg.setVisible(visibility);
  }

  preUpdate(time, delta) {
    const w = this.hero.lifeComponent.life * (this.width / this.hero.lifeComponent.maxLife);
    this.shadowComponent.update(time, delta);
    this.setCrop(0, 0, w, 24);
  }
}
