import Game from "../engine/game.js"
import {Images} from "../engine/resources.js"

import Collectible from "./collectible.js"
import Background from "./background.js"
import Obstacle from "./obstacles.js"

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);

        this.elapsedTime = 0;
        this.spawnTimer = 0;
        
      this.camera.update = () => 
        {
            this.camera.x = 0;
            this.camera.y = 0;
        };

        this.addGameObject(new Background(0,0, 10000,this.canvas.height, Images.backgroud));
    }
    
    update()
    {
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
            "Red",
            fallingSpeed
        );

        this.addGameObject(obstacle);
    }

}

export default Level