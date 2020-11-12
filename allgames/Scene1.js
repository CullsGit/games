class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");

    this.score = 0
    this.gameFinished = false
    this.skeleSpeed = 5000
  }

  preload() {
    this.load.spritesheet('hero', 'assets/sprite/hero.png', {frameWidth: 32, frameHeight: 48 })
    this.load.spritesheet('skeleton', 'assets/sprite/skeleton.png',{frameWidth: 64, frameHeight: 64})
    this.load.image('trees', 'assets/trees.png')
    this.load.image('terrain', 'assets/try.png')
    this.load.tilemapTiledJSON('map', 'assets/maptile/other.json')
    this.load.audio( 'ghost', 'assets/ghost_town.mp3')

    this.scale.pageAlignHorizontally = true;

  }

  //////////////////////////////////////////////////
  /////////////////////CREATE///////////////////////


  create() {
    const map = this.make.tilemap({ key: 'map'});
    const tileset = map.addTilesetImage('try', 'terrain');
    const treeset = map.addTilesetImage('trees', 'trees');
    this.hero = this.physics.add.sprite(640, 300, 'hero', 0);
    this.sfx = this.sound.add('ghost');
    this.sfx.play();





    this.scoreText = this.add.text(16,16, 'Score:0', { fontSize: '32px', fill: '#000'})
    this.gameOverText = this.add.text(400, 300, 'Game Over', {fontSize: '64px', fill: '#000'})
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;
    this.keys = this.input.keyboard.createCursorKeys();

    const botLayer = map.createStaticLayer('bot', tileset, 0, 0).setDepth(-1);
    const topLayer = map.createStaticLayer('top', [tileset, treeset], 0, 0);
    this.physics.add.collider(this.hero, topLayer)


    topLayer.setCollisionByProperty({ collision: true });
    this.hero.body.setCollideWorldBounds(true);
    this.hero.body.setSize(0,0);



    ///Player walking animation///
    this.anims.create({
      key: 'walk-down',
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames('hero', {start: 0, end: 2})
    });
    this.anims.create({
      key: 'walk-up',
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames('hero', {start:9, end:11})
    });
    this.anims.create({
      key: 'walk-left',
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames('hero', {start:3 , end: 5})
    });
    this.anims.create({
      key: 'walk-right',
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames('hero', {start:6, end:8})
    });

    ///Skeleton Walk\\\\
    this.anims.create({
      key: 'sk-walk-down',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames('skeleton', {start: 18, end: 26})
    });
    this.anims.create({
      key: 'sk-walk-up',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames('skeleton', {start:0, end:8})
    });
    this.anims.create({
      key: 'sk-walk-left',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames('skeleton', {start:9 , end: 17})
    });
    this.anims.create({
      key: 'sk-walk-right',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames('skeleton', {start:27, end:35})
    });

    ///Initial spawn
    this.createSkeletonsLeft()
    this.createSkeletonsRight()
    this.createSkeletonsUp()
    this.createSkeletonsDown()

    //Interval spawning
    setInterval(() => {
      this.createSkeletonsLeft()
      this.createSkeletonsRight()
      this.createSkeletonsUp()
      this.createSkeletonsDown()
    }, this.skeleSpeed)


  }

  createSkeletonsLeft() {
    const y = Phaser.Math.FloatBetween(50,750)
    this.skeletons = this.physics.add.group({
      key: 'skeleton',
      repeat: 2,
      setXY: { x: 1200, y: y, stepX: 400}
    });

    this.skeletons.children.iterate(function(child) {
      child.setVelocityX(Phaser.Math.FloatBetween(-80,-20))
      child.play('sk-walk-left')
      child.setSize(35, 38)
    });
    this.physics.add.collider(this.skeletons, this.hero, this.gameOver, null, this);



  }

  createSkeletonsRight() {
    const y = Phaser.Math.FloatBetween(50,750)
    this.skeletons = this.physics.add.group({
      key: 'skeleton',
      repeat: 2,
      setXY: { x: -800, y: y, stepX: 400}
    });
    this.skeletons.children.iterate(function(child) {
      child.setVelocityX(Phaser.Math.FloatBetween(20, 80))
      child.play('sk-walk-right')
      child.setSize(35, 38)
    });
    this.physics.add.collider(this.skeletons, this.hero, this.gameOver, null, this);



  }
  createSkeletonsUp() {
    const x = Phaser.Math.FloatBetween(10,500)
    this.skeletons = this.physics.add.group({
      key: 'skeleton',
      repeat: 2,
      setXY: { x: x, y: 750, stepX: 350}
    });
    this.skeletons.children.iterate(function(child) {
      child.setVelocityY(Phaser.Math.FloatBetween(-80,-20))
      child.play('sk-walk-up')
      child.setSize(35, 38)
    });
    this.physics.add.collider(this.skeletons, this.hero, this.gameOver, null, this);

  }
  createSkeletonsDown() {
    const x = Phaser.Math.FloatBetween(10,500)
    this.skeletons = this.physics.add.group({
      key: 'skeleton',
      repeat: 2,
      setXY: { x: x, y: 20, stepX: 350}
    });
    this.skeletons.children.iterate(function(child) {
      child.setVelocityY(Phaser.Math.FloatBetween(20, 80))
      child.play('sk-walk-down')
      child.setSize(35, 38)
    });
    this.physics.add.collider(this.skeletons, this.hero, this.gameOver, null, this);

  }

  gameOver(hero, skeleton) {
    this.physics.pause();
    hero.setTint(0xff0000);
    this.gameFinished = true;
  }



  //////////////////////////////////////////////////
  /////////////////////UPDATE///////////////////////

  update() {
    ////Player movement\\\\

    ////Diagonal movement\\\\
    if (this.keys.left.isDown && this.keys.down.isDown) {
      this.hero.play('walk-left', true);
      this.hero.body.setVelocityX(-30);
      this.hero.body.setVelocityY(30);
    } else if (this.keys.right.isDown && this.keys.down.isDown) {
      this.hero.play('walk-right', true);
      this.hero.body.setVelocityX(30);
      this.hero.body.setVelocityY(30);
    } else if (this.keys.left.isDown && this.keys.up.isDown) {
      this.hero.play('walk-left', true);
      this.hero.body.setVelocityX(-30);
      this.hero.body.setVelocityY(-30);
    } else if (this.keys.right.isDown && this.keys.up.isDown) {
      this.hero.play('walk-right', true);
      this.hero.body.setVelocityX(30);
      this.hero.body.setVelocityY(-30);
    }
    ////Vertical and Horizontal movement\\\\
    if (this.keys.left.isDown ) {
      this.hero.play('walk-left', true);
      this.hero.body.setVelocityX(-60);
    } else if (this.keys.right.isDown) {
      this.hero.play('walk-right', true);
      this.hero.body.setVelocityX(+60);
    } else if (this.keys.up.isDown) {
      this.hero.play('walk-up', true);
      this.hero.body.setVelocityY(-60);
    } else if (this.keys.down.isDown) {
      this.hero.play('walk-down', true);
      this.hero.body.setVelocityY(60);
    } else {
      this.hero.anims.stop(null, true);
      this.hero.body.setVelocityX(0);
      this.hero.body.setVelocityY(0);
    }




    ////Timer\\\\
    if (!this.gameFinished) {
      this.score += 1/60;
      this.scoreText.setText(`Score:${Math.floor(this.score)}`)
    }





  }

}
