import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js"
import Physics from "../engine/physics.js"

class Collectible extends GameObject {
    constructor(x, y, w, h, img, fallingSpeed) 
    {
        super(x, y);
        this.renderer = new Renderer("gold", w, h, img);
        this.addComponent(this.renderer);

        this.addComponent(new Physics(
            {x:0,y:fallingSpeed},{x:0,y:0},{x:0,y:0}
        ));
        
        this.tag = "collectible";
        this.value = 100;

        this.HDirection = -1;
        this.Speed = 50;
        this.elapsedTime = 0;
    }

    update(deltaTime)
    {
        if(this.elapsedTime >= 0.3)
        {
            this.HDirection *=-1;
            this.elapsedTime = 0;
        }
        this.x += this.HDirection * this.Speed * deltaTime;
        
        this.elapsedTime += deltaTime;
        super.update(deltaTime);
    }
}

export default Collectible;