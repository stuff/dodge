const SALVE_DELAY = 200;

import Bullet from './Bullet';

export default class FireComponent {
  constructor(
    scene,
    shooter,
    { autoFire = null, salve = 1, bulletType = 'ennemy_bullet_1', group, speed = 0.2 } = {},
  ) {
    this.shooter = shooter;
    this.autoFire = autoFire;
    this.bulletSpeed = speed;
    this.salve = salve;
    this.nextFire = autoFire ? autoFire.delay / 2 : null;
    this.born = 0;
    this.currentSalveCount = 0;

    this.bulletsGroup =
      group ||
      scene.physics.add.group({
        classType: Bullet,
        defaultKey: bulletType,
        runChildUpdate: true,
      });
  }

  fireTo(object) {
    const bullet = this.bulletsGroup.get().setActive(true).setVisible(true);
    bullet.fire(this.shooter, object, this.bulletSpeed);
  }

  killBullet(bullet) {
    bullet.die();
  }

  update(time, delta) {
    this.born += delta;
    if (
      this.nextFire &&
      this.autoFire.target.active &&
      this.born > this.nextFire &&
      !this.shooter.lifeComponent.dying
    ) {
      this.fireTo(this.autoFire.target);

      this.nextFire = this.nextFire + SALVE_DELAY;
      this.currentSalveCount += 1;

      if (this.currentSalveCount >= this.salve) {
        this.currentSalveCount = 0;
        this.nextFire = this.nextFire + this.autoFire.delay;
      }
    }
  }
}
