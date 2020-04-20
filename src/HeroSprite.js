import FireComponent from './FireComponent';
import LifeComponent from './LifeComponent';
import ShadowComponent from './ShadowComponent';

const PI_4 = Math.PI / 4;

export default class HeroSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'hero');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(10, 10, true);
    this.body.setBounce(0, 0);

    this.scene = scene;
    this.ennemyGroup = null;
    this.fireComponent = new FireComponent(scene, this, { bulletType: 'hero_bullet', speed: 0.3 });
    this.lifeComponent = new LifeComponent(scene, this, 5);
    this.shadowComponent = new ShadowComponent(scene, this, 'hero');

    this.target = scene.add.image(0, 0, 'target').setVisible(false);
    this.target.setDepth(100);

    this.setDepth(1);

    scene.input.on('pointermove', (pointer) => {
      const rotAngle = Phaser.Math.Angle.BetweenPoints(this, pointer);
      const rotation = Phaser.Math.Snap.To(rotAngle, PI_4);
      let frame = Math.round((rotation + Math.PI) / (Phaser.Math.PI2 / 8));
      if (frame > 7) {
        frame = 7;
      }

      this.setFrame(frame);
      this.shadowComponent.shadow.setFrame(frame);
      this.target.setPosition(pointer.x, pointer.y).setVisible(this.visible);
    });

    scene.input.on('pointerdown', (pointer, time, lastFired) => {
      if (!this.lifeComponent.isAlive() || !this.visible) {
        return;
      }
      this.fireComponent.fireTo(this.target);
    });

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.setDamping(true);
    this.setDrag(0.98);
    this.setMaxVelocity(120, 120);

    this.reset();
  }

  reset() {
    this.lifeComponent.reset();

    this.setPosition(160, 128);
    this.setActive(true);
    this.setVisible(true);
  }

  preUpdate(time, delta) {
    this.setAccelerationX(0);
    this.setAccelerationY(0);

    if (this.lifeComponent.isAlive()) {
      if (this.cursors.left.isDown) {
        this.setAccelerationX(-250);
      } else if (this.cursors.right.isDown) {
        this.setAccelerationX(250);
      }
      if (this.cursors.up.isDown) {
        this.setAccelerationY(-250);
      } else if (this.cursors.down.isDown) {
        this.setAccelerationY(250);
      }
    }

    if (this.y > 256) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = 256;
    }
    if (this.x > 320) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = 320;
    }
    this.lifeComponent.update(time, delta);
    this.shadowComponent.update(time, delta);
  }

  setEnnemyGroups(ennemiesGroup, ennemyBulletsGroupe) {
    this.ennemyGroup = ennemiesGroup;

    // collision hero / ennemy
    this.scene.physics.add.collider(
      this,
      ennemiesGroup,
      this.handleHeroCrashIntoEnnemy,
      null,
      this,
    );

    // collision hero / ennemyBullet
    this.scene.physics.add.collider(
      this,
      ennemyBulletsGroupe,
      this.handleHeroHitByBullet,
      null,
      this,
    );

    // collision hero bullet / ennemy
    this.scene.physics.add.collider(
      this.fireComponent.bulletsGroup,
      ennemiesGroup,
      this.handleBulletHitEnnemy,
      null,
      this,
    );
  }

  handleHeroHitByBullet(hero, bullet) {
    if (!bullet.active) {
      return;
    }
    this.lifeComponent.damage(1);
    bullet.die();
  }

  handleHeroCrashIntoEnnemy(hero, ennemy) {
    if (!ennemy.lifeComponent.isAlive() || hero.dying) {
      return;
    }

    this.lifeComponent.damage(99);
  }

  handleBulletHitEnnemy(bullet, ennemy) {
    if (ennemy.lifeComponent.isAlive() && bullet.active) {
      this.fireComponent.killBullet(bullet);
      ennemy.hit();
    }
  }

  die() {
    this.setActive(false);
    this.setVisible(false);
    this.shadowComponent.remove();
  }
}
