import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";

class Background extends GameObject {
    constructor(x, y, w, h, img) {
        super(x, y);

        this.renderer = new Renderer(
            "black",
            w,
            h,
            img
        );

        this.addComponent(
            this.renderer
        );
    }
}

export default Background;