import GameObject from "../engine/gameobject.js";
import UI from "../engine/ui.js";

import Player from "./player.js";

class PlayerUI extends GameObject
{
    constructor(x, y)
    {
        super(x,y);
        this.uiComp = new UI("Lives:3       Score:0", x, y);
        this.addComponent(this.uiComp);
    }
    
    update(deltaTime)
    {
        let player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        
        this.uiComp.setText("Lives:"+player.lives +"    Score:" +player.score+"    Difficulty: " +this.game.difficultylevel);
        super.update(deltaTime);
    }
}

export default PlayerUI;

