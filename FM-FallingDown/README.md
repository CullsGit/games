# Games : "Tower"

This is a game made by using Phaser3. There are some axes, kunais and fires that if the player has
collision with them, the game is over. I have made the platforms, axes, fires and kunais to randomly comes
in a random place.

## About this project
Making a game using Phaser3 and modern javascript, it is the third project in software
engineering immersive course of GA (General Assembly) Sydney.

## Future works on this project.
* Using physics editor to make the main body of the player and objects to be a physics body.
* Making next levels of the game.
* Making enemy using AI.
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

#### createMusic()
* In this function, the music added to the game.

#### createBrick()
* creating the platforms in three fixed positions and after that make them randomly using a randomPos()
function which has been defined as well.

#### createPlayer()
* Creating the player, set the gravity for this player and making his own animations, using different
sprite sheets.

#### createScore()
* Adding a text to the game as it shows the score. ( up to now, score is just count the seconds of the game that the player is alive. this has been made by adding 1/60 to one global variable for the GameScene, as update rendered 60 times a second in phaser3).

#### createFire(), createFireL()
* The physics of the fire has been defined, the animation to be played using sprite sheet. assigning a velocity to
the animation as it can have movement, and at the end making a setTimeout function to destroy the fire after the animation is finished.
* createFireL(): flip the fire one to comes from the opposite direction.

#### createKunai(), createKunaiL(), createAxe(), createAxeL()
* Same functions, but this time made for kunais and axes.

#### createLava()
* When the kunais, axes and fires hit the player, a lava background will be appear on the screen. (just for
  game over and it is gonna be changed in the future).

#### hit()
* If there is a collision between player and kunais, axes and fires, this function gonna make
game over music, pause the physics, add game over text and will make the alpha of lava to increase, using setTimeout
function.

### Update
* At first, it is gonna check if the player comes to the end of the tower, and it will make the velocity of the player in
y direction to be zero.

* Next it will add a text 'Next Level'. (future: next level will be made).

* If the game is not over, makes the arrow keys on keyboard to work properly.

* If the game is over, it makes the player to have an animation named "dizzy".

* It will check if the axes and kunais went out of the window boundries, destroy them.

* using setCircle() for axes to have dynamic boundries of axes to chase the head of the axes. (by using
  Math.cos() and Math.sin() ).

* Chase the player.y value and create new axes, kunais and fires in random position.


## Techs and libraries
* Modern javascript
* Phaser3
* Node.js
