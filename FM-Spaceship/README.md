# Games : "Spaceship"

This is a game made by using Phaser3. There are some rocks that if the spaceship has
collision with them, the game is over. There is a petrol value as well and if it is finished,
the game is over. At some certain seconds, the petrol icons will pop up, and if the player eats them, the score (which shows the seconds that the game is not over) will be added by 10 points, the petrol will be added by 10 as well and the velocity of the rocks will be increased. The rocks have random position.

## About this project
Making a game using Phaser3 and modern javascript, it is the third project in software
engineering immersive course of GA (General Assembly) Sydney.

## Future works on this project.
* Using physics editor to make the main body of the player and objects to be a physics body.
* Making next levels of the game.
* Making better css for the canvas and button.

## Link to the app

#### [https://cullsgit.github.io/games/](https://cullsgit.github.io/games/)

## Making the game steps

1. Config.js

### config
* Define the configuration of the game: width and height of the canvas, physics (arcade), and the scene.

2. GameScene.js
### Load
* Loading all the images, sprite sheets, audios and defining the cursors as user can
play the game using arrow keys.

### Create
* Defining different functions for creating different objects of the game.

#### createMainSong()
* In this function, the music added to the game.

#### createSky()
* creating the sky using tile sprite sheet.

#### createShip()
* Creating the player, set the collisopn with world bounds to be true as the ship can not
go out of the window, making its own animations, using a sprite sheet.

#### createExplosion()
* Defining the explosion animation, as if the spaceship has any collision with the rocks, it will be played.

#### randomXY()
* Will give the rocks to have random positions.

#### createPlatform1(), createPlatform2(), createPlatform3(), createPlatform4(), createPlatform5(), createPlatform6()
* creating 6 rocks and making the boundary of that by using setCircle() function (this will be changed, after using physics
  editor).


#### createText()
* Making the score text and game over text.

#### hitPlatform()
* If there is a collision between spaceship and rocks, this function gonna make
game over music, pause the physics, add game over.

#### createPetrol()
* Making a petrol icon and giving a random position for that.

#### collectPetrol()
* making the petrol body to disabled, adding the speed of the game, adding 10 points and 10 value to petrol and
playing the collect petrol sound.

### Update
* At first it is gonna check if the petrol is over or any collision with the rock, then it will stop the
main music of the game, it will play the game over music song, it will pause the physics. Otherwise, it will make the
speed to increase in some certain petrol value and it will make the gravity to increase.

* It will chase the arrow keys of keyboard and give them a different velocity.

* It will make a new rocks.

* it will makes the score/petrol value to increase/decrease.

## Techs and libraries
* Modern javascript
* Phaser3
* Node.js
