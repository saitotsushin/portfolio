import {
  Clock,
  Mesh,
  ShaderMaterial,
  WebGLRenderTarget,
  PlaneGeometry,
  Scene,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  AnimationMixer
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Object {
  constructor(stage) {
    this.color = '#fff';
    this.stage = stage;
    this.mixer = "";
    this.clock = new Clock();
    this.offScene = null;
    this.offCamera = null;
    this.postScene = null;
    this.postCamera = null;
    this.renderTarget = null;
    this.mat = null;
    this.webGLRenderer = null;
    this.face_clone = null;
    /*
    * シェーダーに渡すデータ
    */
    this.uniforms = {
      uResolution: {value: [0, 0]}, // ウィンドウの幅と高さ
      uMouse: {value: [-100.0, -100.0]}, // マウス座標
      uTexture0: {value: null} // テクスチャ
    };
  }

  init() {
    // 3Dモデルの読み込み
    const stage = this.stage;
    // GLTFLoaderを作成
    var gltfLoader = new GLTFLoader();
    var face = this.face;

    // let mixer = this.mixer;
    this.webGLRenderer = new WebGLRenderer();
    document.getElementById("screen").appendChild(this.webGLRenderer.domElement);

    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    this.renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    // 頂点シェーダー
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // フラグメントシェーダー
    const fragmentShader = `
      //参考: https://blog.design-nkt.com/osyare-glsl2/
      uniform vec2 uResolution; // ウィンドウの幅と高さ
      uniform vec2 uMouse; // マウス座標
      uniform sampler2D t1; // オフスクリーン(メモリ)に描き込んだテクスチャ
      varying vec2 vUv; // テクスチャ座標

      void main(void) {

        // 色をつけるピクセルの座標を正規化(-1~1)します
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

        // モザイク係数を作ります
        float mosaic = (1.0 - step(0.3, length(p - uMouse))) * max(uResolution.x, uResolution.y) + 50.0;

        // モザイク係数を使ってテクスチャ座標を変換します(ここでモザイク加工をしています)
        // vec2 uv = vec2(0.0, 0.0);
        vec2 uv = floor(vUv * 200.0) / 200.0;

        // テクスチャから色を取り出してピクセルの色とします
        gl_FragColor = texture(t1, uv);
        
      }
    `;

    // ベースとなるシーンには板ポリ１枚だけしかありません
    // シェーダーを使うのでShaderMaterialを使います
    const geo = new PlaneGeometry(2, 2); // 板ポリをウィンドウぴったりにするために２×２
    this.mat = new ShaderMaterial({
      vertexShader: vertexShader, // 頂点シェーダー
      fragmentShader: fragmentShader,
      uniforms: this.uniforms
    });
    const plane = new Mesh(geo, this.mat);
    plane.position.set(0, 0, 1);
    
    let _this = this;

    this.offScene = new Scene();
    this.offCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.offCamera.position.set(0, 0, 5);
    const ambientLight = new AmbientLight(0xaaaaaa);
    this.offScene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(-1, 2, 2);
    this.offScene.add(directionalLight);        


    let _offScene = this.offScene;

    this.postScene = new Scene();
    this.postCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.postCamera.position.set(0, 0, 5);
    const postGeometry = new PlaneBufferGeometry(2, 2);
    const postMaterial = new ShaderMaterial({
      vertexShader: vertexShader, // 頂点シェーダー
      fragmentShader: fragmentShader,
      uniforms: {
        t1: { type: "t", value: this.renderTarget.texture },
        uResolution: {value: [window.innerWidth, window.innerHeight]}, // ウィンドウの幅と高さ
        uMouse: {value: [0, 0]}, // マウス座標  
      },
    });
    const postMesh = new Mesh(postGeometry, postMaterial);
    postMesh.position.set(0, 0, 1);
    this.postScene.add(postMesh);


    // glbファイルを読み込み、シーンに追加
    gltfLoader.load(
        '../assets/images/face.glb',
      function (gltf) {
        stage.scene.add(gltf.scene);
        stage.face = gltf.scene;
        _this._animation(gltf);
        var _face_clone = gltf.scene.clone();
        _this.face_clone = _face_clone;
        _face_clone.position.set(1, 0, 0);
        _offScene.add(_face_clone);
        
      },
      undefined,
      function (error) {
          console.error(error);
      }
    );
  }
  _setMesh() {
  }
  _animation(_gltf) {
    const animations = _gltf.animations;
    if (animations && animations.length) {
      console.log("anime");
      this.mixer = new AnimationMixer(_gltf.scene);
      //全てのAnimation Clipに対して
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i];

        //Animation Actionを生成
        let action = this.mixer.clipAction(animation) ;

        //アニメーションを再生
        action.play();
      }      

    }
  }
  _render() {   
    if (this.mixer) {
      console.log("_ren");
      this.mixer.update(this.clock.getDelta());
    }

    // this.webGLRenderer.setRenderTarget(null); // レンダーターゲットを解除します

  }
  onResize() {
    //
  }

  onRaf() {
    this._render();
    
    this.webGLRenderer.setClearColor(0xf5f542); // 背景色

    this.webGLRenderer.setRenderTarget(this.renderTarget);
    this.webGLRenderer.render(this.offScene, this.offCamera);

    this.webGLRenderer.setRenderTarget(null);
    this.webGLRenderer.render(this.postScene, this.postCamera);
  
  }
}