import { Scene } from 'phaser'

class PreloadScene extends Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('fall','assets/Fall.png')
    }

    create() {
    this.add.image(400,400, 'fall').setScale(5).refreshBody
    this.add.text(120, 200, 'Click to Start', {fontSize: '64px', fill: '#999'});
    this.input.on('pointerdown', () => this.scene.start('game'))
    }
}

export default PreloadScene