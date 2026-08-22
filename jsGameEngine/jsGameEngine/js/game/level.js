import Game from "../engine/game.js"
import {Images} from "../engine/resources.js"

import Collectible from "./collectible.js"

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
            this.spawnCollectible();
            this.spawnTimer = Math.max
            (
                0.35,
                0.9 - this.elapsedTime * 0.01
            );
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
    
}

export default Level