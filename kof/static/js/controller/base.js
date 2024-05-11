export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.press_key = new Set();
        this.start();
    }

    start() {
        let outer = this;
        this.$canvas.keydown(function (e) {
            outer.press_key.add(e.key);

        })
        this.$canvas.keyup(function (e) {
            outer.press_key.delete(e.key);
        })
    }
}