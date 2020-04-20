export default class Score extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    scene.add.existing(this);

    this.posX = 0;
    this.posY = 216;

    this.score = 0;

    this.scoreTextShadow = scene.add.bitmapText(this.posX + 3, this.posY + 3, 'font2', this.score);
    this.scoreText = scene.add.bitmapText(this.posX, this.posY, 'font2', this.score);

    this.scoreTextShadow.setTintFill(Phaser.Display.Color.GetColor(0, 0, 0)).setAlpha(0.35);

    this.reset();
  }

  preUpdate(time, delta) {}

  reset() {
    this.score = -1;
    this.inc();
  }

  setVisible(visibility) {
    this.scoreTextShadow.setVisible(visibility);
    this.scoreText.setVisible(visibility);
  }

  inc() {
    this.score += 1;
    this.scoreText.setText(this.score);
    this.scoreTextShadow.setText(this.score);

    this.center();
  }

  center() {
    this.posX = 160 - this.scoreText.width / 2;

    this.scoreText.setPosition(this.posX, this.posY);
    this.scoreTextShadow.setPosition(this.posX + 3, this.posY + 3);
  }
}
