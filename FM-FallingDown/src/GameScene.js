import Phaser, { Scene } from 'phaser';
import { config } from './config';

class GameScene extends Scene {
  constructor(){
    super();
    this.h = config.height;
    this.rockY = [];
    this.rockX = [];
    this.indexY = 0;
    this.indexX = 0;
    this.randomStuff = [];
    this.randomRockPlace = [];
    this.pastPlayerY = 0;
    this.currentPlayerY = 0;
    this.upKeyDown = false;
    this.gameOver = false;
    this.randomPosForKiller =[];
    this.musicConfig = {
      volume: 0.35
    }
    this.nextLevelText = false;
    this.score = 0;
  }


  preload(){
    this.load.image('brick-wall', 'assets/brick.jpg');
    this.load.image('rock2','assets/rock2.png');
    this.load.image('rock3','assets/rock3.png');
    this.load.image('rock4','assets/rock4.png');
    this.load.image('kunai','assets/kunaii.png');
    this.load.image('axe','assets/axe.png');

    this.load.spritesheet('player-firstAnim','assets/no-move.png', {frameWidth:77, frameHeight: 132});
    this.load.spritesheet('player-secondAnim','assets/walk.png', {frameWidth:77, frameHeight: 132});
    this.load.spritesheet('player-thirdAnim','assets/no-move-left.png', {frameWidth:77, frameHeight: 132});
    this.load.spritesheet('player-forthAnim','assets/left.png', {frameWidth:77, frameHeight: 132});
    this.load.spritesheet('player-fifthAnim','assets/jump.png', {frameWidth: 77,frameHeight:132});
    this.load.spritesheet('player-sixthAnim','assets/dizzy.png', {frameWidth: 75,frameHeight:132});

    this.load.spritesheet('killer','assets/killer.png',{frameWidth: 162,frameHeight:55});
    this.load.spritesheet('fire','assets/fire.png',{frameWidth:130,frameHeight:130});
    this.load.spritesheet('fireL','assets/fire.png',{frameWidth:130,frameHeight:130});
    this.load.spritesheet('lava', 'assets/giphy.gif',{frameWidth:137,frameHeight:131});

    this.load.audio('sfx','assets/shinobi.mp3');
    this.load.audio('gameOver','assets/gameover.mp3');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(){
    this.createMusic();
    this.createBrick();
    this.createPlayer();
    this.createScore();

    this.createFire(500);
    this.createKunai(1200);
    this.createAxe(200);
    this.createAxeL(1000);

    this.killer = this.physics.add.sprite(100,900,'killer').setOrigin(0.5,1.45);
    this.anims.create({
      key:'killer',
      frames:this.anims.generateFrameNumbers('killer', {start:0,end:8}),
      frameRate: 10,
      repeat:-1
    });
    this.killer.anims.play('killer', true);
    this.physics.add.collider(this.player,this.killer, this.hit, null, this);

    this.cameras.main.setBounds(0,0,config.width,30*config.height)
    this.cameras.main.startFollow(this.player);
  }

  createScore(){
    this.scoreText = this.add.text(15,this.player.y-275,'Score: 0',{ fontSize:'32px',
                                                     fill:'#ffffff'});
  }

  createMusic(){
    this.sfx = this.sound.add('sfx');
    this.sfx.play(this.musicConfig);
  }

  createPlayer(){
    window.player = this.player;
    this.player.setGravityY(600);

    this.anims.create({
      key:'no-move',
      frames: this.anims.generateFrameNumbers('player-firstAnim',{start:0,end:15}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('player-secondAnim',{start:0, end:7 }),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('player-forthAnim',{start:0, end:7}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'no-move-left',
      frames: this.anims.generateFrameNumbers('player-thirdAnim',{start:0, end:15}),
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'jump',
      frames: this.anims.generateFrameNumbers('player-fifthAnim',{start:0, end:2}),
      frameRate:10,
      repeat:0
    });

    this.anims.create({
      key:'dizzy',
      frames: this.anims.generateFrameNumbers('player-sixthAnim',{start:0, end:8}),
      frameRate:10,
      repeat:-1
    });
    this.player.anims.play('no-move',true);

    this.physics.add.collider(this.player,this.killer, this.hit, null, this);
  }

  createLava(){
    this.lava = this.add.sprite(400,this.player.y,'lava').setOrigin(0.5).setAlpha(0.8).setScale(6);

    this.anims.create({
      key:'lava-on',
      frames: this.anims.generateFrameNumbers('lava', {start:0,end:7}),
      frameRate: 10,
      repeat:-1,
    });
    this.lava.anims.play('lava-on',true)
  }

  createBrick(){
    let h = this.h;

    this.add.image(config.width/2,h/2,'brick-wall')
                  .setOrigin(0.5).setScrollFactor(0.25).setAlpha(0.5);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100,900,'rock2').setScale(2).refreshBody();
    this.platforms.create(400,700,'rock3').setScale(1.25).refreshBody();
    this.platforms.create(300,300,'rock4').setScale(0.5).refreshBody();

    for (let i=0; i<28; i++){
      this.add.image(config.width/2,h,'brick-wall')
                    .setOrigin(0.5,0).setScrollFactor(0.25).setAlpha(0.5);

      h += 600;
      let randomPos = this.randomPos(h);

      this.platforms.create(randomPos[0][0],randomPos[0][1],'rock2').setScale(2).refreshBody();
      this.platforms.create(randomPos[1][0],randomPos[1][1],'rock3').setScale(1.25).refreshBody();
      this.platforms.create(randomPos[2][0],randomPos[2][1],'rock4').setScale(0.5).refreshBody();

      this.randomStuff.push(randomPos[3]);
    }

    this.player = this.physics.add.sprite(300,290,'player-firstAnim')
                                  .setScale(1)
                                  .setOrigin(0,1.225);

    this.physics.add.collider(this.player,this.platforms);
    this.platforms.world.bounds.height = 30*config.height+1100;
    this.player.setCollideWorldBounds(true);
  }

  randomPos(h){
    const x = [0,200,400];

    for (let i = 2; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
        [x[i], x[j]] = [x[j], x[i]];
    }

    let x1 = Phaser.Math.Between(x[0],x[0]+200);
    let y1 = Phaser.Math.Between(h+2*config.height/3,h+config.height);
    let x2 = Phaser.Math.Between(x[1],x[1]+200);
    let y2 = Phaser.Math.Between(h+config.height/3,h+2*config.height/3);
    let x3 = Phaser.Math.Between(x[2],x[2]+200);
    let y3 = Phaser.Math.Between(h,h+config.height/3);

    let random_stuff = Math.floor(Math.random()*3);

    this.rockY.push(h,h+config.height/3,h+2*config.height/3);
    this.rockX.push((x1+x2+x3)/3);

    if (Math.random()>0.75){

      if (random_stuff !== 1 && Math.random()>0.5){
        this.randomPosForKiller.push([x3,y3]);
      }else{
        this.randomPosForKiller.push([x1,y1]);
      }
    }

    return [[x1,y1],[x2,y2],[x3,y3]];
  }

  createKunai(height){
    this.kunai = this.physics.add.image(800,height,'kunai').setScale(1/5);
    this.kunai.body.velocity.x = -300;
    this.physics.add.collider(this.player,this.kunai, this.hit, null, this);
  }

  createKunaiL(height){
    this.kunai = this.physics.add.image(0,height,'kunai').setScale(1/5);
    this.kunai.flipX = true;
    this.kunai.body.velocity.x = +300;
    this.physics.add.collider(this.player,this.kunai, this.hit, null, this);
  }

  createAxe(height){
    this.axe = this.physics.add.image(800,height,'axe').setScale(1/10)
    this.axe.body.velocity.x = -200;
    this.physics.add.collider(this.player,this.axe, this.hit, null, this);
    this.physics.add.collider(this.axe, this.player, this.hit, null, this);
  }

  createAxeL(height){
    this.axeL = this.physics.add.image(0,height,'axe')
                               .setScale(1/10);

    this.axeL.flipY = true;
    this.axeL.body.velocity.x = +200;
    this.physics.add.collider(this.player,this.axeL, this.hit, null, this);
    this.physics.add.collider(this.axeL, this.player, this.hit, null, this);

  }

  createFire(height){
    this.fire = this.physics.add.sprite(0,height,'fire')
                                .setOrigin(0.5)
                                .setCircle(20,45,45);

    this.anims.create({
      key:'fireR-on',
      frames: this.anims.generateFrameNumbers('fire', {start:0,end:35}),
      frameRate:10,
      delay:0,
      repeat:0
    });
    this.fire.anims.play('fireR-on',true);

    this.fire.body.velocity.x = 200;

    setTimeout( () => {
      this.fire.destroy();
    } ,2100 );

    this.physics.add.collider(this.player,this.fire, this.hit, null, this);
  }

  createFireL(height){
    this.fireL = this.physics.add.sprite(config.width,height,'fireL')
                                .setOrigin(0.5)
                                .setCircle(20,45,45);

    this.anims.create({
      key:'fireL-on',
      frames: this.anims.generateFrameNumbers('fireL', {start:0,end:35}),
      frameRate:10,
      delay:0,
      repeat:0
    });
    this.fireL.anims.play('fireL-on',true);

    this.fireL.body.velocity.x = -200;

    setTimeout( () => {
      this.fireL.destroy();
    } ,2100 );

    this.physics.add.collider(this.player,this.fireL, this.hit, null, this);
  }

  createKiller(){
    this.killer = this.physics.add.sprite(this.randomPosForKiller[0][0],
                                          this.randomPosForKiller[0][1],
                                          'killer').setOrigin(0.5,1.45);

    this.anims.create({
      key:'killer',
      frames:this.anims.generateFrameNumbers('killer', {start:0,end:8}),
      frameRate: 10,
      repeat:-1
    });
    this.killer.anims.play('killer',true);

    this.physics.add.collider(this.player,this.killer, this.hit, null, this);
  }

  hit(player,any){
    this.createLava();
    any.visible = false;

    this.sfx.stop();
    this.gameOverMusic = this.sound.add('gameOver');
    this.gameOverMusic.play(this.musicConfig);

    this.physics.pause();
    this.gameOver = true;

    this.add.text(400,this.player.y, 'Game Over', {
      fontSize:'48px',fill:'#000000'
    }).setOrigin(0.5);

    if (this.lava.alpha < 1){
      setTimeout( () => {
        this.lava.setAlpha(this.lava.alpha+0.25)
      }, 6000 );
    }
  }

  update(){

    const cam = this.cameras.main;

    if ( this.player.y > 30*config.height+1100 ){

      this.player.setVelocityY(0);

      if ( !this.nextLevelText ){
        this.add.text(400,this.player.y-300,'Next Level --->',
                                            {fontSize:'32px',
                                             fill: '#ffffff'})
                                            .setOrigin(0.5);
        this.nextLevelText = true;
      }
    }

    if (!this.gameOver){

      if(this.cursors.right.isDown){
        this.playerFace = 'right';
        this.player.anims.play('right',true);
        this.player.setVelocityX(160);

      }else if(this.cursors.left.isDown){
        this.playerFace = 'left';
        this.player.anims.play('left',true);
        this.player.setVelocityX(-160);

      }else if(this.cursors.up.isDown){
        if (!this.upKeyDown){

          if (this.playerFace === 'right'){
            this.player.anims.play('no-move');

          }else{
            this.player.anims.play('no-move-left', true);
          }

          this.player.setVelocityY(-400);
          this.upKeyDown = true;
        }

      }else{

        if(this.playerFace === 'right'){
          this.player.setVelocityX(0);
          this.player.anims.play('no-move', true);

        }else{
          this.player.setVelocityX(0);
          this.player.anims.play('no-move-left', true);
        }

        this.upKeyDown = false;
      }
      
      this.score += 1/60;
      this.scoreText.setText(`Score: ${ Math.floor(this.score) }`)
      this.scoreText.x = 15;
      this.scoreText.y = this.player.y-275;

    }else{
      this.player.anims.play('dizzy',true);
    }

    if ( this.kunai.x > config.width+20 || this.kunai.x < -20){
      this.kunai.destroy();
    }

    if ( this.axe.x < -20){
      this.axe.destroy();

    }else{
      this.axe.setCircle(250,175+175*Math.cos(this.axe.angle),175+175*Math.sin(this.axe.angle))
      this.axe.angle +=1;
    }

    if ( this.axeL.x > 820){
      this.axeL.destroy();

    }else{
      this.axeL.setCircle(250,175+175*Math.cos(this.axeL.angle),175+175*Math.sin(this.axeL.angle))
      this.axeL.angle +=1;
    }

    if (cam.scrollY > this.rockY[this.indexY]){

      if(this.randomStuff[0] === 0){
        if (this.rockX[this.indexX]<= 350){
          this.createFire(this.rockY[this.indexY+2]+150);
          this.createAxe(this.rockY[this.indexY+2]+400);

        }else{
          this.createFireL(this.rockY[this.indexY+2] +50);
          this.createKunaiL(this.rockY[this.indexY+2]+150);
        }

      }else if (this.randomStuff[0] === 1){
        if (this.rockX[this.indexX]<= 350){
          this.createAxeL(this.rockY[this.indexY+2]+150);
          this.createFireL(this.rockY[this.indexY+2] +300);

        }else{
          this.createAxe(this.rockY[this.indexY+2]);
          this.createKunaiL(this.rockY[this.indexY+2]+250);
        }

      }else{
        if (this.rockX[this.indexX]<= 350){
          this.createKunaiL(this.rockY[this.indexY+2]-50);
          this.createFireL(this.rockY[this.indexY+2] +150);

        }else{
          this.createKunai(this.rockY[this.indexY+2]+250);
          this.createAxeL(this.rockY[this.indexY+2]+400);
        }
      }

      this.rockY = this.rockY.slice(3);
      this.indexY += 3;
      this.indexX += 1;
      this.randomStuff.shift();
    }

    if (this.player.y > this.killer.y+600 && this.randomPosForKiller.length > 0){
      this.killer.destroy();
      this.randomPosForKiller.shift();
      this.createKiller();
    }

    if (cam.scrollY === 30*config.height - 600){
      this.cameras.main.setBounds(0,0,config.width,32*config.height)
      this.add.image(config.width/2,cam.scrollY,'brick-wall')
                    .setOrigin(0.5,0).setScrollFactor(0.25).setAlpha(0.5);
    }

  }

}

export default GameScene;
