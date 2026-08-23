import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js"
import Physics from "../engine/physics.js"

class Obstacle extends GameObject {
    constructor(x, y, w, h, img, fallingSpeed) 
    {
        super(x, y);
        this.renderer = new Renderer(w, h, img);
        this.addComponent(this.renderer);

        this.addComponent(new Physics(
            {x:0,y:fallingSpeed},{x:0,y:0},{x:0,y:0}
        ));

        this.tag = "obstacle";
        this.damage = 1;
    }
}

export default Obstacle;