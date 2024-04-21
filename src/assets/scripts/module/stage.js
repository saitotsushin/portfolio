import {
  Scene, PerspectiveCamera, WebGLRenderer, Vector3, GridHelper, AxesHelper, Color,
  AmbientLight, DirectionalLight,PointLight,sRGBEncoding,ACESFilmicToneMapping
} from 'three'
import Stats from 'stats-js';
import OrbitControls from "three-orbitcontrols";



export default class Stage {
  constructor() {
    // IDが"js-webgl-area"の要素を取得
    this.webglArea = document.getElementById('js-webgl-area');

    this.renderParam = {
      clearColor: 0xCCCCCC,
      width: this.webglArea.offsetWidth,
      height: this.webglArea.offsetHeight
    };
    this.cameraParam = {
      fov: 50,//カメラの垂直方向の視野角
      near: 0.1,//カメラが描画するオブジェクトの最小距離
      far: 100,//カメラが描画するオブジェクトの最大距離
      lookAt: new Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 4,
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.isInitialized = false;
    this.orbitcontrols = null;
    this.stats = null;
    this.isDev = false;
  }

  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    this._setDev();
  }

  _setScene() {
    this.scene = new Scene();
  }

  _setRender() {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new Color(this.renderParam.clearColor));
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.gammaOutput = true;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(this.renderer.domElement);

  }

  _setCamera() {
    if (!this.isInitialized) {
      this.camera = new PerspectiveCamera(
        0,
        0,
        this.cameraParam.near,
        this.cameraParam.far
      );

      this.camera.position.set(
        this.cameraParam.x,
        this.cameraParam.y,
        this.cameraParam.z
      );
      this.camera.lookAt(this.cameraParam.lookAt);

      this.isInitialized = true;
    }
    
    const windowWidth = this.webglArea.offsetWidth;
    const windowHeight = this.webglArea.offsetHeight;
    this.camera.aspect = windowWidth / windowHeight;
    this.camera.fov = this.cameraParam.fov;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);

    /*
    DirectionalLight
    特定の方向に放射される光。光源は無限に離れているものとして、そこから発生する光線はすべて平行になります。
    わかりやすい利用例としては、太陽の光です。
    new THREE.DirectionalLight(色, 光の強さ)
    */
    const directionalLight = new DirectionalLight(0xffffff,2);
    directionalLight.position.set(1, 2, 1).normalize();
    this.scene.add(directionalLight);
    /*
    AmbientLight
    環境光源を実現するクラスです。3D空間全体に均等に光を当てます。一律に明るくしたいときに使う
    */
    const ambientLight = new AmbientLight(0xffffff,1);//blenderのScene>worldのサーフェスの色に合わせる
    // ambientLight.intensity = 1;
    this.scene.add(ambientLight);

    /*
    PointLightクラスは単一点からあらゆる方向から放射される光源です。わかりやすい例としては、裸電球です。裸電球は周辺を明るくします。
    点光源を作成
    new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
    */
    // const pointLight = new PointLight(0xFFFFFF, 2, 50, 1.0);
    // this.scene.add(pointLight);
  }

  _setDev() {
    this.scene.add(new GridHelper(1000, 100));
    this.scene.add(new AxesHelper(100));
    this.orbitcontrols = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.orbitcontrols.enableDamping = true;
    this.stats = new Stats();
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.left = "0px";
    this.stats.domElement.style.right = "0px";
    document.getElementById("stats").appendChild(this.stats.domElement);
    this.isDev = true;
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
    if (this.isDev) this.stats.update();
    if (this.isDev) this.orbitcontrols.update();
  }

  onResize() {
    this._setCamera();
  }

  onRaf() {
    this._render();
  }
}