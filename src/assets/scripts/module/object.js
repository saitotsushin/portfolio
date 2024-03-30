import { LoadingManager } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';


export default class Object {
  constructor(stage) {
    this.color = '#fff';
    this.stage = stage;
  }

  init() {
    // 3Dモデルの読み込み
    const stage = this.stage;

    const manager = new LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader()); // DDSローダーの準備
    
    // MTLファイルの読み込み
    new MTLLoader(manager).load(
      '/assets/images/10778_Toilet_V2.mtl',
      // ロード完了時の処理
      function (materials) {
        materials.preload();
        // OBJファイルの読み込み
        new OBJLoader(manager)
          .setMaterials(materials) // マテリアルの指定
          .load(
            '/assets/images/10778_Toilet_V2.obj', 
            // ロード完了時の処理
            function (object) {
              stage.scene.add(object);
              console.log('読み込み完了', object);
              object.position.x = 0;
              object.position.y = 0;
              object.position.z = 30;
            });
      },
    );
  }

  _render() {
    //
  }
  onResize() {
    //
  }

  onRaf() {
    this._render();
  }
}