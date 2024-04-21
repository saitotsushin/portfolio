import {
    TextureLoader, ShaderMaterial, Vector2,
    WebGLRenderer, OrthographicCamera, Scene,
    PlaneGeometry,Mesh} from 'three';

import vertexSource from '../shaders/vertexshader.vert';
import fragmentSource from '../shaders/fragmentshader.frag';

export default class LoadTexture {
  constructor(stage) {
    this.stage = stage;

    this.mouse = new Vector2(0.5, 0.5);
    this.targetPercent = 1.0;
    this.imageArr = [];
    const canvasImages = document.querySelectorAll('.canvas-img');
    canvasImages.forEach(imgElement => {
      this.loadImg(imgElement);
    });
  }
  loadImg(elem) {
    const imgElement = elem.querySelector("img");
    const w = imgElement.width;
    const h = imgElement.height;    
    
    const textureObj = new TextureObject();

    this.imageArr.push(textureObj);

    // レンダラーを作成
    textureObj.renderer = new WebGLRenderer();
    textureObj.renderer.setSize(w, h);// 描画サイズ
    textureObj.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

    elem.appendChild(textureObj.renderer.domElement);
  
    // カメラを作成（背景シェーダーだけならパースいらないので、OrthographicCameraをつかう）
    textureObj.camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1);

    // シーンを作成
    textureObj.scene = new Scene();

    // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
    const geo = new PlaneGeometry(2, 2, 1, 1);

    const loader = new TextureLoader();// テクスチャローダーを作成
    const texture = loader.load('../assets/images/images.jpg');// テクスチャ読み込み

    // uniform変数を定義
    textureObj.uniforms = {
      uAspect: {
        value: w / h
      },
      uTime: {
        value: 0.0
      },
      uMouse: {
        value: new Vector2(0.5, 0.5)
      },
      uPercent: {
        value: this.targetPercent
      },
      uFixAspect: {
        value: h / w
      },
      uTex: {
        value: texture
      }
    };

    // uniform変数とシェーダーソースを渡してマテリアルを作成
    const mat = new ShaderMaterial({
      uniforms: textureObj.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource
    });

    var mesh = new Mesh(geo, mat);

    // メッシュをシーンに追加
    textureObj.scene.add(mesh);

    // 描画ループ開始
    textureObj.render();
  }
  scrolled(y) {
    this.imageArr.forEach(obj => {
      // 各オブジェクトに対する操作を行う
      if (y > 0) {
        obj.targetPercent = y * -1;
      } else {
        obj.targetPercent = y;
      }
    });
  }
};

class TextureObject {
  constructor() {
    this.w = 0;
    this.h = 0;
    this.uniforms = "";
    // マウス座標
    this.mouse = new Vector2(0.5, 0.5);
    this.targetPercent = 1.0;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.addEventListeners();
  }
  addEventListeners() {
    window.addEventListener('mousedown', e => {
      this.mousePressed(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', e => {
      this.mouseReleased(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', e => {
      this.mouseMoved(e.clientX, e.clientY);
    });
  }
  mouseMoved(x, y) {
    this.mouse.x = x / this.w;
    this.mouse.y = 1.0 - (y / this.h);
  }
  mousePressed(x, y) {
    this.mouseMoved(x, y);
    this.targetPercent = 0;// マウスを押したら進捗度の目標値を大きく
  }
  mouseReleased(x, y) {
    this.mouseMoved(x, y);
    this.targetPercent = 1;// マウスを押したら進捗度の目標値をデフォルト値に
  }
  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => { this.render(); });

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000;

    // シェーダーに渡す時間を更新
    this.uniforms.uTime.value = sec;

    // シェーダーに渡すマウスを更新
    this.uniforms.uMouse.value.lerp(this.mouse, 0.2);

    // シェーダーに渡す進捗度を更新
    this.uniforms.uPercent.value += (this.targetPercent - this.uniforms.uPercent.value) * 0.1;

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

}