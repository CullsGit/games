import Phaser from 'phaser';
import GameScene from './GameScene';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: GameScene,
    pixelArt:true,
    physics: {
      default: 'arcade',
      arcade:{
        debug: false,
        gravity: {y: 20}
      }
    }
};

export { config };
