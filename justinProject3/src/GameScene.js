import { Scene } from 'phaser'



class GameScene extends Scene {
    constructor() {
        super()

        this.gameOver = false
        this.gameWin
    }

    preload() {

        //preload audio 
        this.load.audio('hype','assets/megaman.mp3');
       
    // preloaded images and sprites ===============================================
    this.load.image('dirt', 'assets/dirt.png');
    this.load.image('end', 'assets/End.png');
    this.load.image('grass', 'assets/grass.png');
    this.load.image('big-grass', 'assets/big-grass.png');
    this.load.image('brick', 'assets/brickbox.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('spike', 'assets/newspike.png');
    this.load.image('spikeflip', 'assets/newspikeflip.png');
    this.load.image('leftspike', 'assets/leftspike.png');
    this.load.image('rightspike', 'assets/rspike.png');
    this.load.image('bigspike', 'assets/bigspike.png');
    this.load.image('bigspikeflip', 'assets/bigspikeflip.png');

// preload sprite ==================================================
    this.load.spritesheet('dude', 'assets/running.png', 
    { frameWidth: 32, frameHeight: 30 }
    );
 
}
   
 create() {
    
        const backgroundImage = this.add.image(400, 300, 'background');

        this.hype = this.sound.add('hype');
        var musicConfig = {
        mute: false,
        volume: .2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
        }
        this.hype.play(musicConfig)

        this.createPlayer()
        this.createPlatforms()
        this.createCursor()
        this.createSpikes()
        this.createWin()

        this.gameOverText = this.add.text(280, 200, 'Game Over', {fontSize: '64px', fill: '#000'});
        this.gameOverText.visible = false

        this.gameWinText = this.add.text(280, 200, 'You Win', {fontSize: '64px', fill: '#000'});
        this.gameWinText.visible = false

    }
    
    createPlatforms() {

        this.platforms = this.physics.add.staticGroup();

 // top layer roof ============================================================
 this.platforms.create(742, 10,'big-grass').setScale(.2).refreshBody()
 this.platforms.create(334, 10,'big-grass').setScale(.2).refreshBody()
 this.platforms.create(533, 10,'big-grass').setScale(.2).refreshBody()
 this.platforms.create(334, 10,'big-grass').setScale(.2).refreshBody()
 this.platforms.create(130, 10,'big-grass').setScale(.2).refreshBody()
 this.platforms.create(10, 10,'big-grass').setScale(.2).refreshBody()




// top layer=====================================================================

this.platforms.create(636, 100,'big-grass').setScale(.2).refreshBody()
this.platforms.create(635, 85,'grass').setScale(.3).refreshBody()
this.platforms.create(512, 100,'big-grass').setScale(.2).refreshBody()
this.platforms.create(435, 85,'grass').setScale(.3).refreshBody()
this.platforms.create(388, 100,'big-grass').setScale(.2).refreshBody()
this.platforms.create(235, 85,'grass').setScale(.3).refreshBody()
this.platforms.create(10, 85,'dirt').setScale(.3).refreshBody()
this.platforms.create(10, 65,'dirt').setScale(.3).refreshBody()
this.platforms.create(10, 45,'dirt').setScale(.3).refreshBody()
this.platforms.create(10, 25,'dirt').setScale(.3).refreshBody()
this.platforms.create(264, 100,'big-grass').setScale(.2).refreshBody()
this.platforms.create(140, 100,'big-grass').setScale(.2).refreshBody()
this.platforms.create(16, 100,'big-grass').setScale(.2).refreshBody()


// long jumps ===============================================================
this.platforms.create(240, 212,'grass').setScale(.2).refreshBody()
this.platforms.create(392, 212,'grass').setScale(.2).refreshBody()
this.platforms.create(550, 212,'grass').setScale(.1).refreshBody()
this.platforms.create(703, 212,'grass').setScale(.1).refreshBody()
this.platforms.create(793, 150,'grass').setScale(.2).refreshBody()




// mid layer ================================================================
this.platforms.create(15, 350,'big-grass').setScale(.5).refreshBody()
this.platforms.create(480, 350,'big-grass').setScale(.5).refreshBody()
this.platforms.create(610, 325,'grass').setScale(.3).refreshBody()
this.platforms.create(540, 325,'dirt').setScale(.3).refreshBody()
this.platforms.create(540, 306,'grass').setScale(.3).refreshBody()
this.platforms.create(470, 325,'grass').setScale(.3).refreshBody()
this.platforms.create(400, 325,'dirt').setScale(.3).refreshBody()
this.platforms.create(400, 306,'grass').setScale(.3).refreshBody()

// mid level climb ============================================================
this.platforms.create(10, 325,'grass').setScale(.3).refreshBody()
this.platforms.create(50, 250,'grass').setScale(.3).refreshBody()
this.platforms.create(69, 250,'grass').setScale(.3).refreshBody()
this.platforms.create(88, 250,'dirt').setScale(.3).refreshBody()
this.platforms.create(88, 231,'dirt').setScale(.3).refreshBody()
this.platforms.create(88, 212,'grass').setScale(.3).refreshBody()

//wall down ===================================================================
this.platforms.create(580, 381,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 413,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 445,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 477,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 509,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 540,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 572,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 604,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 635,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 666,'dirt').setScale(.5).refreshBody()
this.platforms.create(580, 697,'dirt').setScale(.5).refreshBody()


// start layer ================================================================ 
        this.platforms.create(34, 570,'grass')
        this.platforms.create(96, 570,'dirt')
        this.platforms.create(96,508 ,'grass')
        this.platforms.create(258, 485,'grass')
        this.platforms.create(260, 549,'dirt')
        this.platforms.create(322, 549,'dirt')
        this.platforms.create(362, 565,'grass').setScale(.3).refreshBody()
        
// floor level ================================================================
        this.platforms.create(170,770,'brick')
        this.platforms.create(294,770,'brick')
        this.platforms.create(294,708,'brick')
        this.platforms.create(353,770,'brick')
        this.platforms.create(415,770,'brick')
        this.platforms.create(477,770,'brick')
        this.platforms.create(477,722,'brick')
        this.platforms.create(477,662,'brick')
        this.platforms.create(477,662,'brick')

 //brick wall up ==============================================================
        this.platforms.create(492,617,'brick').setScale(.5).refreshBody()
        this.platforms.create(492,590,'brick').setScale(.5).refreshBody()
        this.platforms.create(492,563,'brick').setScale(.5).refreshBody()
        this.platforms.create(492,536,'brick').setScale(.5).refreshBody()
        this.platforms.create(492,509,'grass').setScale(.5).refreshBody()

//floor climb =================================================================
        this.platforms.create(537,800,'brick')
        this.platforms.create(650,785,'brick').setScale(.3).refreshBody()
        this.platforms.create(750,720,'brick').setScale(.3).refreshBody()
        this.platforms.create(650,660,'brick').setScale(.3).refreshBody()
        this.platforms.create(750,585,'brick').setScale(.3).refreshBody()
        this.platforms.create(650,520,'brick').setScale(.3).refreshBody()
        this.platforms.create(750,445,'brick').setScale(.3).refreshBody()
        this.platforms.create(700,380,'brick').setScale(.3).refreshBody()
        

        this.physics.add.collider(this.player, this.platforms);

    }

    createPlayer() {

        this.player = this.physics.add.sprite( 40, 525, 'dude');
        this.player.setBounce(0.2);

        this.player.setCollideWorldBounds(true);
       
        
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 23 }),
            frameRate: 15,
            repeat: -2
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: [] } ],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1
        });
   }
       createCursor(){
           this.cursors = this.input.keyboard.createCursorKeys();

       }
// Spikes =================================================================================

       createSpikes() {
            this.spikes = this.physics.add.staticGroup();
            this.physics.add.collider(this.spikes, this.platforms);
            this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this)

            // bottom spikes ==============================================================
            this.spikes.create(-150, 785,'bigspike')
            this.spikes.create(233, 785,'spike')
            this.spikes.create(355, 724,'spike')
            this.spikes.create(415, 724,'spike')
            this.spikes.create(593, 792,'spike').setScale(.5).refreshBody()
            this.spikes.create(626, 792,'spike').setScale(.5).refreshBody()
            this.spikes.create(804, 792,'bigspike').setScale(.5).refreshBody()

            // climb spikes ================================================================
            this.spikes.create(650, 674,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(750, 599,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(650, 534,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(750, 459,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(700, 394,'spikeflip').setScale(.3).refreshBody()



            // start spikes ===============================================================
            this.spikes.create(325, 501,'spike')
            this.spikes.create(260, 438,'spike')
            this.spikes.create(220, 470,'leftspike').setScale(.5).refreshBody()
            this.spikes.create(220, 500,'leftspike').setScale(.5).refreshBody()
            this.spikes.create(220, 530,'leftspike').setScale(.5).refreshBody()
            this.spikes.create(220, 560,'leftspike').setScale(.5).refreshBody()
            this.spikes.create(136, 491,'rightspike').setScale(.5).refreshBody()
            this.spikes.create(136, 519,'rightspike').setScale(.5).refreshBody()
            this.spikes.create(136, 549,'rightspike').setScale(.5).refreshBody()
            this.spikes.create(136, 579,'rightspike').setScale(.5).refreshBody()

            // mid spikes =================================================================
            this.spikes.create(610, 311,'spike').setScale(.3).refreshBody()
            this.spikes.create(540, 291,'spike').setScale(.3).refreshBody()
            this.spikes.create(470, 311,'spike').setScale(.3).refreshBody()
            this.spikes.create(400, 291,'spike').setScale(.3).refreshBody()

            this.spikes.create(178, 350,'rightspike').setScale(.5).refreshBody()

            this.spikes.create(102, 251,'rightspike').setScale(.3).refreshBody()

            // top spikes
            this.spikes.create(769, 21,'bigspikeflip').setScale(.3).refreshBody()
            this.spikes.create(635, 71,'spike').setScale(.3).refreshBody()
            this.spikes.create(95, 21,'bigspikeflip').setScale(.3).refreshBody()
            this.spikes.create(586, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(568, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(550, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(532, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(514, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(496, 21,'spikeflip').setScale(.3).refreshBody()
           
            this.spikes.create(369, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(351, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(333, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(315, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(297, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(281, 21,'spikeflip').setScale(.3).refreshBody()
            this.spikes.create(435, 71,'spike').setScale(.3).refreshBody()

       }
//  hit spikes and die 
       hitSpike(player, spike) {
        this.physics.pause();
        player.setTint('#d13048');
        this.gameOver = true;
        this.gameOverText.visible = true

       }
// Win Function ======================================================
       createWin() {
        this.wins = this.physics.add.staticGroup();
            this.physics.add.collider(this.wins, this.platforms);
            this.physics.add.collider(this.player, this.wins, this.hitTrophy, null, this)

            this.wins.create(50, 60,'end')

       }
// Hit trophy and win ==================================================
       hitTrophy(player, win) {
        this.physics.pause();
        player.setTint('#d13048');
        this.gameWin = true;
        this.gameWinText.visible = true

       }

       update() {  
   if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);}
          else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-325);
        }
        
    }
    
}

export default GameScene