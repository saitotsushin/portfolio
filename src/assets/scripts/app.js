import Sphere from './module/sphere';
import Stage from './module/stage';
import Object from './module/object';

const stage = new Stage();
stage.init();

const sphere = new Sphere(stage);
// sphere.init();

const object = new Object(stage);
object.init();

window.addEventListener("resize", () => {
    sphere.onResize();
    stage.onResize();
});

const _raf = () => {
    window.requestAnimationFrame(() => {
        _raf();

        sphere.onRaf();
        object.onRaf();
        stage.onRaf();
    });
};
_raf();
