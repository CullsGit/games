import Phaser from 'phaser'
import GameScene from './GameScene'
import PreloadScene from './PreloadScene'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 800,
    scene: [ PreloadScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false,
        }
    },
};

export { config } 