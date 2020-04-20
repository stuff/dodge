export default class ShadowComponent {
  constructor(scene, object, frame) {
    this.object = object;
    this.scene = scene;

    this.shadow = this.scene.add.sprite(0, 0, frame);
    this.shadow.setTintFill(Phaser.Display.Color.GetColor(0, 0, 0)).setAlpha(0.5);
    this.shadow.setOrigin(this.object.originX, this.object.originY);
    this.update();
  }

  update(time, delta) {
    this.shadow.setVisible(this.object.visible);
    this.shadow.setPosition(this.object.x + 3, this.object.y + 3);
  }

  remove() {
    this.shadow.setPosition(-200, -200);
  }
}
