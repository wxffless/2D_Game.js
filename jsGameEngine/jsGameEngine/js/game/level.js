import Game from "../engine/game.js"
import {Images, AudioFiles} from "../engine/resources.js"

import Collectible from "./collectible.js"
import Background from "./background.js"
import Obstacle from "./obstacles.js"
import Player from "./player.js"
import PlayerUI from "./playerUI.js"
import gamestateUI from "./gamestateUI.js"

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        
        this.state = "start";

        this.camera.update = () => 
        {
            this.camera.x = 0;
            this.camera.y = 0;
        };

        this.addGameObject(new Background(0,0, this.canvas.width, this.canvas.height, Images.background));

        const playerWidth = 90;
        const playerHeight = 70;

        this.player = new Player((this.canvas.width - playerWidth) / 2, this.canvas.height - playerHeight, Images.player);
        this.addGameObject(this.player);

        this.addGameObject(new PlayerUI(10,10));

        this.gamestateUI = new gamestateUI(this.canvas.width / 2 - 200, this.canvas.height / 2);
        this.addGameObject(this.gamestateUI);
        this.gamestateUI.showStartScreen();

        this.elapsedTime = 0;
        this.spawnTimer = 0;

        this.addkeyboardevents();
    }

    addkeyboardevents()
    {
        document.addEventListener("keydown",(event) => 
        {
            //starting
            if(event.code === "Space" && this.state === "start")
            {
                this.beginGame();
            }

            //restarting at gameover
            if(event.code === "Space" && this.state === "GameOver")
            {
                this.resetLevel();
                this.beginGame();
            }

            //pausing
            if(event.code === "Escape" && this.state === "playing")
            {
                this.pauseGame();
            }

            else if(event.code === "Escape" && this.state === "paused")
            {
                this.continueGame();
            }
        })
    }

    beginGame()
    {
        this.state = "playing";
        this.gamestateUI.hide();
    }

    pauseGame()
    {
        this.state = "paused";
        this.gamestateUI.showPauseScreen();
    }

    continueGame()
    {
        this.state = "playing";
        this.gamestateUI.hide();
    }

    endGame()
    {
        this.state = "GameOver"
        this.gamestateUI.showGameOverScreen();
        console.log("game over");
    }
    
    update()
    {
        if(this.state != "playing")
            return;
        
        this.elapsedTime += this.deltaTime;

        this.updateSpawner();
        
        super.update();
    }

    updateSpawner() 
    {
        this.spawnTimer -= this.deltaTime;

        if (this.spawnTimer <= 0) 
        {
            this.spawnFallingObject();
            this.spawnTimer = Math.max
            (
                0.35,
                0.9 - this.elapsedTime * 0.01
            );
        }
    }

    spawnFallingObject() 
    {
        const spawnCollectible = Math.random() < 0.65;

        if (spawnCollectible) 
        {
            this.spawnCollectible();
        } 

        else 
        {
            this.spawnObstacle();
        }
    }

    spawnCollectible() 
    {
        const w = 42;
        const h = 42;
        const fallingSpeed = 200;

        //chooses random position for the star to spawn
        const x = Math.random() * (this.canvas.width - w);

        const collectible = new Collectible
        (
            x,
            -h,
            w,
            h,
            Images.collectible,
            fallingSpeed
        );

        this.addGameObject(collectible);
    }
    
    spawnObstacle() 
    {
        const w = 42;
        const h = 42;
        const fallingSpeed = 200;

        const x = Math.random() * (this.canvas.width - w);

        const obstacle = new Obstacle
        (
            x,
            -h,
            w,
            h,
            Images.enemy,
            fallingSpeed
        );

        this.addGameObject(obstacle);
    }

    resetLevel()
    {
        const fallingObjects = this.gameObjects.filter((object) => object instanceof Collectible || object instanceof Obstacle);

        for (const object of fallingObjects) 
            {
                this.removeGameObject(object);
            }

        this.elapsedTime = 0;
        this.spawnTimer = 0;

        this.player.resetPlayer();
    }

}

export default Level