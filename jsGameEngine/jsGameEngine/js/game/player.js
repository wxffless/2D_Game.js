import GameObject from "../engine/gameobject.js"
import Physics from "../engine/physics.js"
import Input from "../engine/input.js"
import Renderer from "../engine/renderer.js"
import {AudioFiles} from "../engine/resources.js";

import Collectible from "./collectible.js"
import Obstacle from "./obstacles.js"

class Player extends GameObject
{
    constructor(x,y,img)
    {
        super(x,y);

        this.Renderer = new Renderer("green",90, 70, img);
        this.addComponent(this.Renderer);

        this.addComponent(new Physics({x:0,y:0},{x:0,y:0}, { x: 0, y: 0 }));
        this.addComponent(new Input());

        this.speed = 300;
        this.direction = -1;

        this.score = 0;
        this.lives = 3;
    }

    keepOnScreen() 
    {
        const canvasWidth = this.game.canvas.width;
        const playerWidth = 90;
        const physics = this.getComponent(Physics);

        // Stop the player leaving the left side.
        if (this.x < 0) 
        {
            this.x = 0;
            physics.velocity.x = 0;
        }

        // Stop the player leaving the right side.
        if(this.x + playerWidth > canvasWidth) 
        {
            this.x = canvasWidth - playerWidth;
            physics.velocity.x = 0;
        }
    }

    collect(collectable)
    {
        //AudioFiles.collect.volume *= 0.1;
        AudioFiles.collect.play();

        this.score += collectable.value;
        console.log("Score: " + this.score);
    }

    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        
        if(input.isKeyDown('ArrowLeft'))
        {
            physics.velocity.x = -this.speed;
            this.direction = 1;
        }
        else if(input.isKeyDown('ArrowRight'))
        {
            physics.velocity.x = this.speed;
            this.direction = -1;
        }
        else
        {
            physics.velocity.x =0;
        }
        
        //collision with collectibles;
        const collectibles = this.game.gameObjects.
        filter((obj)=>obj instanceof Collectible);
        
        for(const coll of collectibles)        
        {
             if(physics.isColliding(coll.getComponent(Physics)))
             {
                this.collect(coll); 
                this.game.removeGameObject(coll);
             }
        }

        //collision with obstacles;
        const obstacles = this.game.gameObjects.
        filter((obj)=>obj instanceof Obstacle);
        
        for(const coll of obstacles)        
        {
             if(physics.isColliding(coll.getComponent(Physics)))
             {
                this.lives -= coll.damage;
                this.game.removeGameObject(coll);
             }
        }
        
        super.update(deltaTime);
        this.keepOnScreen();
    }
    }

export default Player;