import { setupCounter } from './counter.js'
import barba from '@barba/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


window.addEventListener("DOMContentLoaded", initThree);

function initThree() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  // const canvasElement = document.getElementById('myCanvas');

  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  // #canvas-containerにレンダラーのcanvasを追加
  const canvasElement = document.getElementById("myCanvas");
  canvasElement.appendChild(renderer.domElement);

  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(3, width / height, 1, 100);
  camera.position.set(0, 0, 100);
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 環境光源を作成
  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.5;
  scene.add(ambientLight);

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.intensity = 1;
  directionalLight.position.set(1, 3, 1);
  scene.add(directionalLight);

  /*追加テスト
  // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
  const geo = new THREE.BoxGeometry(1, 1, 1);

  // マテリアルを作成
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });

  // ジオメトリとマテリアルからメッシュを作成
  let mesh = new THREE.Mesh(geo, mat);

    // メッシュをシーンに追加
  scene.add(mesh);
  */
  
  // 3Dモデルの読み込み
  const objLoader = new OBJLoader();
  objLoader.load(
    './assets/images/model_obj/face.obj',
    function (obj) {
      scene.add(obj);
      console.log('読み込み', obj);
      obj.position.x = 0;
      obj.position.y = 0;
    },
  );

  tick();

  function tick() {
    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }
}

barba.init({
  // schema: {
  //   prefix: 'data-custom',
  //   wrapper: 'wrap'
  // },
  transitions: [{
    name: 'default-transition',
    leave() {
      // create your stunning leave animation here
    },
    enter() {
      // create your amazing enter animation here
    }
  }]
});
