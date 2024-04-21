

export default class Scroll {
    constructor(stage) {
        this.scrollY = 0;
        this.stage = stage;
      }
  
    scrolled(y) {
        // console.log("scrollY",this.scrollY);
        this.scrollY = y;
        console.log("stage=", this.stage.face);
        if (this.stage.face) {
            // this.stage.face.position.y = this.scrollY * 0.01;     
            this.stage.face.rotation.y = this.scrollY * 0.01;     
            // this.stage.face.scale.set(
            //     this.scrollY * 0.01,
            //     this.scrollY * 0.01,
            //     1
            // );
        }
      }
  }