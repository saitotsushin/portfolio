import {
  LoadingManager, AnimationMixer, Clock, LoopOnce, LoopPingPong, LoopRepeat,
  RawShaderMaterial,
  Mesh,
  Color,
  SphereBufferGeometry
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from "gsap";

import vertexShader from '../shaders/vertexshader.vert';
import fragmentShader from '../shaders/fragmentshader.frag';

export default class Object {
  constructor(stage) {
    this.color = '#fff';
    this.stage = stage;
    this.mixer = "";
    this.clock = new Clock();
  }

  init() {
    // 3Dモデルの読み込み
    const stage = this.stage;
    // GLTFLoaderを作成
    var gltfLoader = new GLTFLoader();
    var face = this.face;

    // let mixer = this.mixer;

    let _this = this;

    // glbファイルを読み込み、シーンに追加
    gltfLoader.load(
        '../assets/images/face.glb',
        function (gltf) {
          stage.scene.add(gltf.scene);
          stage.face = gltf.scene;
          _this._animation(gltf);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
    // this._setMesh();
    /*OBJファイルの場合

    const manager = new LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader()); // DDSローダーの準備
    
    // MTLファイルの読み込み
    new MTLLoader(manager).load(
      '../assets/images/face.mtl',
      // ロード完了時の処理
      function (materials) {
        materials.preload();
        // OBJファイルの読み込み
        new OBJLoader(manager)
          .setMaterials(materials) // マテリアルの指定
          .load(
            '../assets/images/face.obj', 
            // ロード完了時の処理
            function (object) {
              stage.scene.add(object);
              console.log('読み込み完了', object);
              object.position.x = 0;
              object.position.y = 0;
              object.position.z = 0;
            });
      },
    );
    */
  }
  _setMesh() {
    const geometry = new SphereBufferGeometry(0.20, 32, 32);
    const material = new RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_scale: { type: "f", value: 1.5 },
        u_color: { type: "v3", value: new Color(this.color) },
      },
    });
    this.mesh = new Mesh(geometry, material);
    this.stage.scene.add(this.mesh);

    // gsap.to(this.mesh.material.uniforms.u_scale, {
    //   duration: 1.0,
    //   ease: 'none',
    //   value: 1.0,
    // })
  }
  _animation(_gltf) {
    // _gltf.scene.scale.set(0.3, 0.3, 0.3);
    // _gltf.scene.rotation.set(0, 10, 0);
    // gsap.to(_gltf.scene.rotation, { y: 0, duration: 1,ease: "bounce.out"});
    // gsap.to(_gltf.scene.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "bounce.out" });
    
    const animations = _gltf.animations;
    if (animations && animations.length) {

      // console.log("this.mixer", this.mixer);

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
    //
    // TODO  requestAnimationFrame(_render);
    // this.stage.renderer.render(this.stage.scene, this.stage.camera);
    // requestAnimationFrame(_render);
    
    
    //Animation Mixerを実行
    if (this.mixer) {
        this.mixer.update(this.clock.getDelta());
    }
  }
  onResize() {
    //
  }

  onRaf() {
    this._render();
  }
}