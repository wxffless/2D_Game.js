import GameObject from "../engine/gameobject.js";
import UI from "../engine/ui.js";

import Player from "./player.js";

class gamestateUI extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.uiComp = new UI("", x,y);

        this.addComponent(this.uiComp);
    }

    showStartScreen() {
        this.uiComp.setText("Star Collector - Press SPACE to start");
    }

    showPauseScreen() {
        this.uiComp.setText("PAUSED - Press ESCAPE to continue");
    }

    showGameOverScreen() {

        let player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        this.uiComp.setText("GAME OVER - Score: " + player.score + " - Press SPACE to restart");
    }

    hide() {
        this.uiComp.setText("");
    }
}

export default gamestateUI;