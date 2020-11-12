window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 800,
    pixelArt: true,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    backgroundColor: 0x000000,
    scene: [Scene1]
  };


  const game = new Phaser.Game(config);

};
