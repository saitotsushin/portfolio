/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/app.js":
/*!***********************************!*\
  !*** ./src/assets/scripts/app.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_sphere__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/sphere */ "./src/assets/scripts/module/sphere.js");
/* harmony import */ var _module_stage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/stage */ "./src/assets/scripts/module/stage.js");
/* harmony import */ var _module_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/object */ "./src/assets/scripts/module/object.js");
/* harmony import */ var _module_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/scroll */ "./src/assets/scripts/module/scroll.js");
/* harmony import */ var _module_loadTexture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/loadTexture */ "./src/assets/scripts/module/loadTexture.js");





var face;
var stage = new _module_stage__WEBPACK_IMPORTED_MODULE_1__.default();
stage.init();
var sphere = new _module_sphere__WEBPACK_IMPORTED_MODULE_0__.default(stage); // sphere.init();

var object = new _module_object__WEBPACK_IMPORTED_MODULE_2__.default(stage);
object.init();
var scroll = new _module_scroll__WEBPACK_IMPORTED_MODULE_3__.default(stage);
var loadTexture = new _module_loadTexture__WEBPACK_IMPORTED_MODULE_4__.default(stage); // loadTexture.render();

scroll.scrolled(window.scrollY);
window.addEventListener('scroll', function (e) {
  scroll.scrolled(window.scrollY);
  loadTexture.scrolled(window.scrollY);
});
window.addEventListener("resize", function () {
  sphere.onResize();
  stage.onResize();
});

var _raf = function _raf() {
  window.requestAnimationFrame(function () {
    _raf();

    sphere.onRaf();
    object.onRaf();
    stage.onRaf();
  });
};

_raf();

/***/ }),

/***/ "./src/assets/scripts/module/loadTexture.js":
/*!**************************************************!*\
  !*** ./src/assets/scripts/module/loadTexture.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadTexture)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/vertexshader.vert */ "./src/assets/scripts/shaders/vertexshader.vert");
/* harmony import */ var _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/fragmentshader.frag */ "./src/assets/scripts/shaders/fragmentshader.frag");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var LoadTexture = /*#__PURE__*/function () {
  function LoadTexture(stage) {
    var _this = this;

    _classCallCheck(this, LoadTexture);

    this.stage = stage;
    this.mouse = new three__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5);
    this.targetPercent = 1.0;
    this.imageArr = [];
    var canvasImages = document.querySelectorAll('.canvas-img');
    canvasImages.forEach(function (imgElement) {
      _this.loadImg(imgElement);
    });
  }

  _createClass(LoadTexture, [{
    key: "loadImg",
    value: function loadImg(elem) {
      var imgElement = elem.querySelector("img");
      var w = imgElement.width;
      var h = imgElement.height;
      var textureObj = new TextureObject();
      this.imageArr.push(textureObj); // レンダラーを作成

      textureObj.renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
      textureObj.renderer.setSize(w, h); // 描画サイズ

      textureObj.renderer.setPixelRatio(window.devicePixelRatio); // ピクセル比

      elem.appendChild(textureObj.renderer.domElement); // カメラを作成（背景シェーダーだけならパースいらないので、OrthographicCameraをつかう）

      textureObj.camera = new three__WEBPACK_IMPORTED_MODULE_2__.OrthographicCamera(-1, 1, 1, -1, 0, -1); // シーンを作成

      textureObj.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene(); // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）

      var geo = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(2, 2, 1, 1);
      var loader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader(); // テクスチャローダーを作成

      var texture = loader.load('../assets/images/images.jpg'); // テクスチャ読み込み
      // uniform変数を定義

      textureObj.uniforms = {
        uAspect: {
          value: w / h
        },
        uTime: {
          value: 0.0
        },
        uMouse: {
          value: new three__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5)
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
      }; // uniform変数とシェーダーソースを渡してマテリアルを作成

      var mat = new three__WEBPACK_IMPORTED_MODULE_2__.ShaderMaterial({
        uniforms: textureObj.uniforms,
        vertexShader: _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_0__.default,
        fragmentShader: _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_1__.default
      });
      var mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geo, mat); // メッシュをシーンに追加

      textureObj.scene.add(mesh); // 描画ループ開始

      textureObj.render();
    }
  }, {
    key: "scrolled",
    value: function scrolled(y) {
      this.imageArr.forEach(function (obj) {
        // 各オブジェクトに対する操作を行う
        if (y > 0) {
          obj.targetPercent = y * -1;
        } else {
          obj.targetPercent = y;
        }
      });
    }
  }]);

  return LoadTexture;
}();


;

var TextureObject = /*#__PURE__*/function () {
  function TextureObject() {
    _classCallCheck(this, TextureObject);

    this.w = 0;
    this.h = 0;
    this.uniforms = ""; // マウス座標

    this.mouse = new three__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5);
    this.targetPercent = 1.0;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.addEventListeners();
  }

  _createClass(TextureObject, [{
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      window.addEventListener('mousedown', function (e) {
        _this2.mousePressed(e.clientX, e.clientY);
      });
      window.addEventListener('mouseup', function (e) {
        _this2.mouseReleased(e.clientX, e.clientY);
      });
      window.addEventListener('mousemove', function (e) {
        _this2.mouseMoved(e.clientX, e.clientY);
      });
    }
  }, {
    key: "mouseMoved",
    value: function mouseMoved(x, y) {
      this.mouse.x = x / this.w;
      this.mouse.y = 1.0 - y / this.h;
    }
  }, {
    key: "mousePressed",
    value: function mousePressed(x, y) {
      this.mouseMoved(x, y);
      this.targetPercent = 0; // マウスを押したら進捗度の目標値を大きく
    }
  }, {
    key: "mouseReleased",
    value: function mouseReleased(x, y) {
      this.mouseMoved(x, y);
      this.targetPercent = 1; // マウスを押したら進捗度の目標値をデフォルト値に
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // 次のフレームを要求
      requestAnimationFrame(function () {
        _this3.render();
      }); // ミリ秒から秒に変換

      var sec = performance.now() / 1000; // シェーダーに渡す時間を更新

      this.uniforms.uTime.value = sec; // シェーダーに渡すマウスを更新

      this.uniforms.uMouse.value.lerp(this.mouse, 0.2); // シェーダーに渡す進捗度を更新

      this.uniforms.uPercent.value += (this.targetPercent - this.uniforms.uPercent.value) * 0.1; // 画面に表示

      this.renderer.render(this.scene, this.camera);
    }
  }]);

  return TextureObject;
}();

/***/ }),

/***/ "./src/assets/scripts/module/object.js":
/*!*********************************************!*\
  !*** ./src/assets/scripts/module/object.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _Object)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_DDSLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/DDSLoader.js */ "./node_modules/three/examples/jsm/loaders/DDSLoader.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shaders/vertexshader.vert */ "./src/assets/scripts/shaders/vertexshader.vert");
/* harmony import */ var _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shaders/fragmentshader.frag */ "./src/assets/scripts/shaders/fragmentshader.frag");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }










var _Object = /*#__PURE__*/function () {
  function Object(stage) {
    _classCallCheck(this, Object);

    this.color = '#fff';
    this.stage = stage;
    this.mixer = "";
    this.clock = new three__WEBPACK_IMPORTED_MODULE_6__.Clock();
  }

  _createClass(Object, [{
    key: "init",
    value: function init() {
      // 3Dモデルの読み込み
      var stage = this.stage; // GLTFLoaderを作成

      var gltfLoader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__.GLTFLoader();
      var face = this.face; // let mixer = this.mixer;

      var _this = this; // glbファイルを読み込み、シーンに追加


      gltfLoader.load('../assets/images/face.glb', function (gltf) {
        stage.scene.add(gltf.scene);
        stage.face = gltf.scene;

        _this._animation(gltf);
      }, undefined, function (error) {
        console.error(error);
      }); // this._setMesh();

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
  }, {
    key: "_setMesh",
    value: function _setMesh() {
      var geometry = new three__WEBPACK_IMPORTED_MODULE_6__.SphereBufferGeometry(0.20, 32, 32);
      var material = new three__WEBPACK_IMPORTED_MODULE_6__.RawShaderMaterial({
        vertexShader: _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_4__.default,
        fragmentShader: _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_5__.default,
        uniforms: {
          u_scale: {
            type: "f",
            value: 1.5
          },
          u_color: {
            type: "v3",
            value: new three__WEBPACK_IMPORTED_MODULE_6__.Color(this.color)
          }
        }
      });
      this.mesh = new three__WEBPACK_IMPORTED_MODULE_6__.Mesh(geometry, material);
      this.stage.scene.add(this.mesh); // gsap.to(this.mesh.material.uniforms.u_scale, {
      //   duration: 1.0,
      //   ease: 'none',
      //   value: 1.0,
      // })
    }
  }, {
    key: "_animation",
    value: function _animation(_gltf) {
      // _gltf.scene.scale.set(0.3, 0.3, 0.3);
      // _gltf.scene.rotation.set(0, 10, 0);
      // gsap.to(_gltf.scene.rotation, { y: 0, duration: 1,ease: "bounce.out"});
      // gsap.to(_gltf.scene.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "bounce.out" });
      var animations = _gltf.animations;

      if (animations && animations.length) {
        // console.log("this.mixer", this.mixer);
        //Animation Mixerインスタンスを生成
        this.mixer = new three__WEBPACK_IMPORTED_MODULE_6__.AnimationMixer(_gltf.scene); //全てのAnimation Clipに対して

        for (var i = 0; i < animations.length; i++) {
          var animation = animations[i]; //Animation Actionを生成

          var action = this.mixer.clipAction(animation); //ループ設定（1回のみ）

          action.setLoop(three__WEBPACK_IMPORTED_MODULE_6__.LoopPingPong); //アニメーションの最後のフレームでアニメーションが終了

          action.clampWhenFinished = true; //アニメーションを再生

          action.play();
        }
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      //
      // TODO  requestAnimationFrame(_render);
      // this.stage.renderer.render(this.stage.scene, this.stage.camera);
      // requestAnimationFrame(_render);
      //Animation Mixerを実行
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta());
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {//
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();
    }
  }]);

  return Object;
}();



/***/ }),

/***/ "./src/assets/scripts/module/scroll.js":
/*!*********************************************!*\
  !*** ./src/assets/scripts/module/scroll.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scroll)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scroll = /*#__PURE__*/function () {
  function Scroll(stage) {
    _classCallCheck(this, Scroll);

    this.scrollY = 0;
    this.stage = stage;
  }

  _createClass(Scroll, [{
    key: "scrolled",
    value: function scrolled(y) {
      // console.log("scrollY",this.scrollY);
      this.scrollY = y;
      console.log("stage=", this.stage.face);

      if (this.stage.face) {
        // this.stage.face.position.y = this.scrollY * 0.01;     
        this.stage.face.rotation.y = this.scrollY * 0.01; // this.stage.face.scale.set(
        //     this.scrollY * 0.01,
        //     this.scrollY * 0.01,
        //     1
        // );
      }
    }
  }]);

  return Scroll;
}();



/***/ }),

/***/ "./src/assets/scripts/module/sphere.js":
/*!*********************************************!*\
  !*** ./src/assets/scripts/module/sphere.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sphere)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/vertexshader.vert */ "./src/assets/scripts/shaders/vertexshader.vert");
/* harmony import */ var _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/fragmentshader.frag */ "./src/assets/scripts/shaders/fragmentshader.frag");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var Sphere = /*#__PURE__*/function () {
  function Sphere(stage) {
    _classCallCheck(this, Sphere);

    this.color = '#fff';
    this.stage = stage;
  }

  _createClass(Sphere, [{
    key: "init",
    value: function init() {
      this._setMesh();

      this._setDev();
    }
  }, {
    key: "_setMesh",
    value: function _setMesh() {
      var geometry = new three__WEBPACK_IMPORTED_MODULE_3__.SphereBufferGeometry(0.20, 32, 32);
      var material = new three__WEBPACK_IMPORTED_MODULE_3__.RawShaderMaterial({
        vertexShader: _shaders_vertexshader_vert__WEBPACK_IMPORTED_MODULE_1__.default,
        fragmentShader: _shaders_fragmentshader_frag__WEBPACK_IMPORTED_MODULE_2__.default,
        uniforms: {
          u_scale: {
            type: "f",
            value: 1.5
          },
          u_color: {
            type: "v3",
            value: new three__WEBPACK_IMPORTED_MODULE_3__.Color(this.color)
          }
        }
      });
      this.mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
      this.stage.scene.add(this.mesh);
      gsap__WEBPACK_IMPORTED_MODULE_4__.gsap.to(this.mesh.material.uniforms.u_scale, {
        duration: 1.0,
        ease: 'none',
        value: 1.0
      });
    }
  }, {
    key: "_setDev",
    value: function _setDev() {
      var _this = this;

      var parameter = {
        color: this.color
      };
      var gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__.GUI();
      gui.addColor(parameter, "color").name("color").onChange(function (value) {
        _this.mesh.material.uniforms.u_color.value = new three__WEBPACK_IMPORTED_MODULE_3__.Color(value);
      });
    }
  }, {
    key: "_render",
    value: function _render() {//
    }
  }, {
    key: "onResize",
    value: function onResize() {//
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();
    }
  }]);

  return Sphere;
}();



/***/ }),

/***/ "./src/assets/scripts/module/stage.js":
/*!********************************************!*\
  !*** ./src/assets/scripts/module/stage.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stage)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stats-js */ "./node_modules/stats-js/build/stats.min.js");
/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stats_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_orbitcontrols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three-orbitcontrols */ "./node_modules/three-orbitcontrols/OrbitControls.js");
/* harmony import */ var three_orbitcontrols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_orbitcontrols__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Stage = /*#__PURE__*/function () {
  function Stage() {
    _classCallCheck(this, Stage);

    // IDが"js-webgl-area"の要素を取得
    this.webglArea = document.getElementById('js-webgl-area');
    this.renderParam = {
      clearColor: 0xCCCCCC,
      width: this.webglArea.offsetWidth,
      height: this.webglArea.offsetHeight
    };
    this.cameraParam = {
      fov: 50,
      //カメラの垂直方向の視野角
      near: 0.1,
      //カメラが描画するオブジェクトの最小距離
      far: 100,
      //カメラが描画するオブジェクトの最大距離
      lookAt: new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 4
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.isInitialized = false;
    this.orbitcontrols = null;
    this.stats = null;
    this.isDev = false;
  }

  _createClass(Stage, [{
    key: "init",
    value: function init() {
      this._setScene();

      this._setRender();

      this._setCamera();

      this._setDev();
    }
  }, {
    key: "_setScene",
    value: function _setScene() {
      this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
    }
  }, {
    key: "_setRender",
    value: function _setRender() {
      this.renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(this.renderParam.clearColor));
      this.renderer.setSize(this.renderParam.width, this.renderParam.height);
      this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_2__.sRGBEncoding;
      this.renderer.gammaOutput = true;
      this.renderer.toneMapping = three__WEBPACK_IMPORTED_MODULE_2__.ACESFilmicToneMapping;
      var wrapper = document.querySelector("#webgl");
      wrapper.appendChild(this.renderer.domElement);
    }
  }, {
    key: "_setCamera",
    value: function _setCamera() {
      if (!this.isInitialized) {
        this.camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(0, 0, this.cameraParam.near, this.cameraParam.far);
        this.camera.position.set(this.cameraParam.x, this.cameraParam.y, this.cameraParam.z);
        this.camera.lookAt(this.cameraParam.lookAt);
        this.isInitialized = true;
      }

      var windowWidth = this.webglArea.offsetWidth;
      var windowHeight = this.webglArea.offsetHeight;
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

      var directionalLight = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(1, 2, 1).normalize();
      this.scene.add(directionalLight);
      /*
      AmbientLight
      環境光源を実現するクラスです。3D空間全体に均等に光を当てます。一律に明るくしたいときに使う
      */

      var ambientLight = new three__WEBPACK_IMPORTED_MODULE_2__.AmbientLight(0xffffff, 1); //blenderのScene>worldのサーフェスの色に合わせる
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
  }, {
    key: "_setDev",
    value: function _setDev() {
      this.scene.add(new three__WEBPACK_IMPORTED_MODULE_2__.GridHelper(1000, 100));
      this.scene.add(new three__WEBPACK_IMPORTED_MODULE_2__.AxesHelper(100));
      this.orbitcontrols = new (three_orbitcontrols__WEBPACK_IMPORTED_MODULE_1___default())(this.camera, this.renderer.domElement);
      this.orbitcontrols.enableDamping = true;
      this.stats = new (stats_js__WEBPACK_IMPORTED_MODULE_0___default())();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.right = "0px";
      document.getElementById("stats").appendChild(this.stats.domElement);
      this.isDev = true;
    }
  }, {
    key: "_render",
    value: function _render() {
      this.renderer.render(this.scene, this.camera);
      if (this.isDev) this.stats.update();
      if (this.isDev) this.orbitcontrols.update();
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this._setCamera();
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();
    }
  }]);

  return Stage;
}();



/***/ }),

/***/ "./src/assets/stylesheets/app.scss":
/*!*****************************************!*\
  !*** ./src/assets/stylesheets/app.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/scripts/shaders/fragmentshader.frag":
/*!********************************************************!*\
  !*** ./src/assets/scripts/shaders/fragmentshader.frag ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float uPercent;\nuniform sampler2D uTex;\n\nvoid main() {\n  vec2 uv = vUv;\n\n  float moz = uPercent * 0.1;\n\n  if( moz > 0. ) {// 0では割れないので、if文で保護\n    uv = floor( uv / moz ) * moz + ( moz * .5 );\n  }\n\n  vec3 color = texture2D( uTex, uv ).rgb;\n\n  gl_FragColor = vec4( color, 1.0 );\n}");

/***/ }),

/***/ "./src/assets/scripts/shaders/vertexshader.vert":
/*!******************************************************!*\
  !*** ./src/assets/scripts/shaders/vertexshader.vert ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float uFixAspect;\n\nvoid main() {\n  // 余白ができないようにアスペクト補正\n  vUv = uv - .5;\n  vUv.y *= uFixAspect;\n  vUv += .5;\n\n  gl_Position = vec4( position, 1.0 );\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_creativesite_boilerplate"] = self["webpackChunkwebpack_creativesite_boilerplate"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/assets/scripts/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/assets/stylesheets/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map