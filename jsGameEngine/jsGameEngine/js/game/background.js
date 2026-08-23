import GameObject from "../engine/gameobject.js";
import HorizontalTileRenderer from "../engine/horizontalTileRenderer.js"
import Physics from "../engine/physics.js"

class Background extends GameObject
{
    constructor(x, y,w, h, img)
    {
        super(x,y);
        this.renderer = new HorizontalTileRenderer('Navy',w, h, img);
        this.addComponent(this.renderer);
    }
    
}

export default Background