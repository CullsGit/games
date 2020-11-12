import Phaser, { Scene } from 'phaser';
import { config } from './config';

class GameScene extends Scene {

  // =====================================
  // init

  constructor(){
    super();
    this.gameOver = false;
    this.score = 0;
    this.petrol = 100;
    this.petrolFeedCount = false;
    this.speed = 1;
    this.pause = false;
    this.x = 0;
    this.y = 0;
  }

  // =====================================
  // preload

  preload(){
    this.load.image('sky', 'assets/Mars.jpeg');
    this.load.image('shoot', ' assets/shoot.png');
    this.load.image('ground','assets/rock.png');
    this.load.image('line','assets/shoot.png');
    this.load.image('petrolImg','assets/petrol.png')
    this.load.spritesheet('ship', 'assets/ship.png', {
      frameWidth:16,
      frameHeight: 16
    });
    this.load.spritesheet('explosion', 'assets/explosion.png', {
      frameWidth:16,
      frameHeight: 16
    });

    this.load.audio('song','assets/Space.mp3');
    this.load.audio('explosion','assets/explosion.mp3');
    this.load.audio('petrolSound','assets/petrolSound.mp3');
    this.load.audio('gameOver','assets/GameOver.mp3');

  }

  // =====================================
  // create

  create(){
    this.createMainSong();
    this.createSky();
    this.createShip();
    this.createExplosion();
    this.randomXY();
    this.createPlatform1();
    this.createPlatform2();
    this.createPlatform3();
    this.createPlatform4();
    this.createPlatform5();
    this.createPlatform6();
    this.createCursor();
    this.createText();
  }

  createMainSong(){
    this.sfx = this.sound.add('song');
    this.sfx.play();
  }

  createText(){
    this.petrolText = this.add.text(15,15,`Petrol: ${this.petrol}`,{fontSize:'32px',fill:'#ccc'});
    this.scoreText = this.add.text(config.width - 95,31,`Score: ${this.score}`,{fontSize:'32px',fill:'#ccc'}).setOrigin(0.5);
  }

  createSky() {
    this.sky = this.add.tileSprite(0,0, config.width, config.height, 'sky').setOrigin(0,0);
  }

  createPlatform1() {
    this.randomXY();
    this.platform1 = this.physics.add.image(this.x,this.y,'ground').setScale(32/512);
    this.platform1.setCircle(225,22,26);

    this.physics.add.collider(this.platform1, this.ship );
    this.physics.add.collider(this.ship, this.platform1 );

    this.physics.add.overlap(this.ship, this.platform1, this.hitPlatform, null, this);
  }
  createPlatform2() {
    this.randomXY();
    this.platform2 = this.physics.add.image(this.x,this.y,'ground').setScale(32/256);
    this.platform2.setCircle(227,44,45);

    this.physics.add.collider(this.platform2, this.ship );
    this.physics.add.collider(this.ship, this.platform2 );

    this.physics.add.overlap(this.ship, this.platform2, this.hitPlatform, null, this);
  }
  createPlatform3() {
    this.randomXY();
    this.platform3 = this.physics.add.image(this.x,this.y,'ground').setScale(32/128);
    this.platform3.setCircle(240,25,15);

    this.physics.add.collider(this.platform3, this.ship );
    this.physics.add.collider(this.ship, this.platform3 );

    this.physics.add.overlap(this.ship, this.platform3, this.hitPlatform, null, this);
  }
  createPlatform4() {
    this.randomXY();
    this.platform4 = this.physics.add.image(this.x,this.y,'ground').setScale(32/512);
    this.platform4.setCircle(240,25,25,250);

    this.physics.add.collider(this.platform4, this.ship );
    this.physics.add.collider(this.ship, this.platform4 );

    this.physics.add.overlap(this.ship, this.platform4, this.hitPlatform, null, this);
  }
  createPlatform5() {
    this.randomXY();
    this.platform5 = this.physics.add.image(this.x,this.y,'ground').setScale(32/256);
    this.platform5.setCircle(240,25,25,250);

    this.physics.add.collider(this.platform5, this.ship );
    this.physics.add.collider(this.ship, this.platform5 );

    this.physics.add.overlap(this.ship, this.platform5, this.hitPlatform, null, this);
  }
  createPlatform6() {
    this.randomXY();
    this.platform6 = this.physics.add.image(this.x,this.y,'ground').setScale(32/128);
    this.platform6.setCircle(240,25,25,250);

    this.physics.add.collider(this.platform6, this.ship );
    this.physics.add.collider(this.ship, this.platform6 );

    this.physics.add.overlap(this.ship, this.platform6, this.hitPlatform, null, this);
  }

  randomXY(){
    if ( Math.random() > 0.5 ){
      this.x = Phaser.Math.Between(0,config.width);
    }else{
      this.x = Phaser.Math.Between(this.ship.x-400,this.ship.x+400);
    }

    this.y = Phaser.Math.Between(0,config.height/2);
  }

  hitPlatform(ship,platform) {
    this.sfx.stop();
    this.explosionMusic = this.sound.add('explosion');
    this.explosionMusic.play();
    this.physics.pause();
    ship.setTexture('explosion');
    ship.play('explode-anim');
    this.gameOver = true;
    this.add.text(config.width/2,
                  config.height/2,
                  'Game Over',
                  {fontSize:'32px',fill:'#ff0000'}).setOrigin(0.5);
  }

  createShip() {
    this.ship = this.physics.add.sprite(40,config.height-20,'ship').setScale(2);
    this.ship.setCollideWorldBounds(true);

    this.anims.create({
      key:'ship-anim',
      frames:this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1
    });

    this.ship.play('ship-anim');
  }

  createExplosion() {
    this.anims.create({
      key:'explode-anim',
      frames:this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPetrol(){
    if (!this.petrolFeedCount) {
      this.petrolImage = this.physics.add.image(Phaser.Math.Between(100,config.width-100),
                                                Phaser.Math.Between(100,config.height-100),
                                                'petrolImg').setOrigin(0.5)
                                                .setScale(1/10)
                                                .setCircle(150,60,5);
    }

    this.physics.add.overlap(this.ship, this.petrolImage, this.collectPetrol, null, this);
    this.physics.add.collider(this.petrolImage, this.ship );
  }

  collectPetrol(ship, petrol){
    petrol.disableBody(true,true);
    petrol.destroy;
    this.petrol = Number(this.petrol) +10;
    this.speed += 0.5;
    this.score = Number(this.score) + 10;

    this.collectPetrolSound = this.sound.add('petrolSound');
    this.collectPetrolSound.play();
  }

  // =====================================
  // update

  movePlatform(platform,speed) {
    platform.y += speed;
  }

  petrolFinished(){
    if (this.petrol < 1 && !this.gameOver){
      this.sfx.stop()
      this.gameOverMusic = this.sound.add('gameOver');
      this.gameOverMusic.play();
      this.physics.pause();
      this.add.text(config.width/2,
                    config.height/2,
                    ['Petrol is finished','    Game Over'],
                    {fontSize:'32px',fill:'#ff0000'}).setOrigin(0.5);
      this.gameOver = true;
    }

    this.speedUp(70.86,70.90);
    this.speedUp(50.86,50.90);
    this.speedUp(30.86,30.90);
    this.speedUp(10.86,10.90);
    config.physics.arcade.gravity.y += 2.5;
  }

  speedUp(t1,t2){
    if (this.petrol>t1 && this.petrol < t2) {
      this.speed += 0.25;
      this.createPetrol();
      this.movePlatform(this.petrolImage,40);
    }
  }


  update(){

    this.petrolFinished();
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(160);
    } else {
      this.ship.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.ship.setVelocityY(-160);
    } else if(this.cursors.down.isDown) {
      this.ship.setVelocityY(160);
    } else {
      this.ship.setVelocityY(0);
    }

    if (!this.gameOver){
      this.sky.tilePositionY -= 0.5;

      this.movePlatform(this.platform1, this.speed/4);
      this.movePlatform(this.platform2, this.speed/2);
      this.movePlatform(this.platform3, this.speed*3/4);
      this.movePlatform(this.platform4, this.speed);
      this.movePlatform(this.platform5, this.speed*5/4);
      this.movePlatform(this.platform6, this.speed*3);

      if (this.platform1.y > config.height+15){
          this.platform1.destroy();
          this.createPlatform1();
          this.platform1.y = -15;
      }
      if (this.platform2.y > config.height+30){
          this.platform2.destroy();
          this.createPlatform2();
          this.platform2.y = -30;

      }
      if (this.platform3.y > config.height+50){
          this.platform3.destroy();
          this.createPlatform3();
          this.platform3.y = -50;

      }
      if (this.platform4.y > config.height+50){
          this.platform4.destroy();
          this.createPlatform4();
          this.platform4.y = -15;

      }
      if (this.platform5.y > config.height+50){
          this.platform5.destroy();
          this.createPlatform5();
          this.platform5.y = -30;

      }
      if (this.platform6.y > config.height+50){
          this.platform6.destroy();
          this.createPlatform6();
          this.platform6.y = -50;

      }
      this.petrol -= 1/60;
      this.score += 1/50;
      this.petrol = this.petrol.toFixed(2);
      this.petrolText.setText(`Petrol: ${Math.floor(this.petrol)}`);
      this.scoreText.setText(`Score: ${Math.floor(this.score)}`);
    }
  }
}

export default GameScene;
