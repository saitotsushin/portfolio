// import Sphere from './module/sphere';
import Stage from './module/stage';
import Object from './module/object';
// import Scroll from './module/scroll';
// import LoadTexture from './module/loadTexture';

var face;
const stage = new Stage();
stage.init();

// const sphere = new Sphere(stage);
// sphere.init();

const object = new Object(stage);
object.init();

// const scroll = new Scroll(stage);
    
// const loadTexture = new LoadTexture(stage);
// loadTexture.render();

// scroll.scrolled(window.scrollY);
window.addEventListener('scroll', e => {
    // scroll.scrolled(window.scrollY);
    // loadTexture.scrolled(window.scrollY);
});
  
window.addEventListener("resize", () => {
    sphere.onResize();
    stage.onResize();
});

const _raf = () => {
    window.requestAnimationFrame(() => {
        _raf();

        // sphere.onRaf();
        object.onRaf();
        stage.onRaf();
    });
};
_raf();
