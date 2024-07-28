import {
  LoadingManager, AnimationMixer, Clock, LoopOnce, LoopPingPong, LoopRepeat,
  RawShaderMaterial,
  Mesh,
  Color,
  SphereBufferGeometry,
  Vector2,
  TextureLoader,
  ShaderMaterial,
  WebGLRenderTarget,
  PlaneGeometry,
  Scene,
  OrthographicCamera,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  PlaneBufferGeometry
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from "gsap";

import vertexSource from '../shaders/vertexshader.vert';
import fragmentSource from '../shaders/fragmentshader.frag';

// import vertexShader from '../shaders/vertexshader.vert';
// import fragmentShader from '../shaders/fragmentshader.frag';

export default class Object {
  constructor(stage) {
    this.color = '#fff';
    this.stage = stage;
    this.mixer = "";
    this.clock = new Clock();
    this.offScene = null;
    this.offCamera = null;
    this.renderTarget = null;
    this.mat = null;
    this.webGLRenderer = null;
    /*
    * シェーダーに渡すデータ
    */
    this.uniforms = {
      uResolution: {value: [0, 0]}, // ウィンドウの幅と高さ
      uMouse: {value: [0, 0]}, // マウス座標
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
      // precision mediump float;

      // out vec2 vUv;

      // void main(void) {
      //   vUv = uv; // フラグメントシェーダーにテクスチャ座標を渡す
      //   gl_Position = vec4(position, 1.0); // 座標変換しない
      // }

      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // フラグメントシェーダー
    const fragmentShader = `
      uniform vec2 uResolution; // ウィンドウの幅と高さ
      uniform vec2 uMouse; // マウス座標
      uniform sampler2D uTexture0; // オフスクリーン(メモリ)に描き込んだテクスチャ
      varying vec2 vUv; // テクスチャ座標
      // out vec4 fragColor; // 最終的なピクセルの色

      void main(void) {

        // 色をつけるピクセルの座標を正規化(-1~1)します
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

        // モザイク係数を作ります
        float mosaic = (1.0 - step(0.3, length(p - uMouse))) * max(uResolution.x, uResolution.y) + 50.0;

        // モザイク係数を使ってテクスチャ座標を変換します(ここでモザイク加工をしています)
        vec2 uv = vec2(0.0, 0.0);

        // テクスチャから色を取り出してピクセルの色とします
        gl_FragColor = texture(uTexture0, uv);
        
      }
      // varying vec2 vUv;
      // uniform sampler2D uTex;

      // void main() {
      //   vec4 color = vec4(0.0, 1.0, 1.0, 1.0);// rgba
      //   gl_FragColor = color;
      // }
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
    plane.position.set(0, 0, 1);//#TODO (0,0,5)だと表示される
    
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
    // this.offScene.add(plane);
    // // ボックスジオメトリとマテリアルの作成
    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new Mesh(geometry, material);

    // // ボックスをシーンに追加
    // this.offScene.add(cube);

    const postScene = new Scene();
    const postGeometry = new PlaneBufferGeometry(2,2);
    const postMaterial = new ShaderMaterial({
      vertexShader: vertexShader, // 頂点シェーダー
      fragmentShader: fragmentShader,
      uniforms: {
          t1: {type: "t", value: this.renderTarget.texture},
      },
    });
    const postMesh = new Mesh(postGeometry, postMaterial);
    postScene.add(postMesh);


    // glbファイルを読み込み、シーンに追加
    gltfLoader.load(
        '../assets/images/face.glb',
      function (gltf) {
       
        stage.scene.add(gltf.scene);
        stage.face = gltf.scene;
        _this._animation(gltf);
        var face_clone = gltf.scene.clone();
        face_clone.position.set(1, 0, 0);
        // ライトを２種類作ります
        _offScene.add(face_clone);
        
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

      //Animation Mixerインスタンスを生成
      this.mixer = new AnimationMixer(_gltf.scene);

      //全てのAnimation Clipに対して
      for (let i = 0; i < animations.length; i++) {
          let animation = animations[i];

          //Animation Actionを生成
        let action = this.mixer.clipAction(animation);

          //ループ設定（1回のみ）
          action.setLoop(LoopPingPong);

          //アニメーションの最後のフレームでアニメーションが終了
          action.clampWhenFinished = true;

          //アニメーションを再生
          action.play();
      }
    }
  }
  _render() {   
    // Animation Mixerを実行
    if (this.mixer) {
        this.mixer.update(this.clock.getDelta());
    }
    this.webGLRenderer.setClearColor(0xf5f542); // 背景色

    this.webGLRenderer.setRenderTarget(this.renderTarget);
    this.webGLRenderer.render(this.offScene, this.offCamera);

    // console.log("this.mat.uniforms = ", this.mat.uniforms.uResolution);

    // this.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    // this.uniforms.uMouse.value = [0, 0]; // マウス座標
    // this.uniforms.uTexture0.value = this.renderTarget.texture;

    this.webGLRenderer.setRenderTarget(null); // レンダーターゲットを解除します

  }
  onResize() {
    //
  }

  onRaf() {
    this._render();
    this.webGLRenderer.render(this.offScene, this.offCamera);
    // this.stage.renderer.setClearColor(0x000000); // 背景色(今回は無くてもいい)
    // this.stage.renderer.render(scene, camera); // ベース用のシーンとカメラをセットしてディスプレイ(canvas)に描き込みます
  
  }
}