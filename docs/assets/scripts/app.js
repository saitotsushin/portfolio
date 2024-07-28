/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/app.js":
/*!***********************************!*\
  !*** ./src/assets/scripts/app.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_stage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/stage */ "./src/assets/scripts/module/stage.js");
/* harmony import */ var _module_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/object */ "./src/assets/scripts/module/object.js");
// import Sphere from './module/sphere';

 // import Scroll from './module/scroll';
// import LoadTexture from './module/loadTexture';

var face;
var stage = new _module_stage__WEBPACK_IMPORTED_MODULE_0__.default();
stage.init(); // const sphere = new Sphere(stage);
// sphere.init();

var object = new _module_object__WEBPACK_IMPORTED_MODULE_1__.default(stage);
object.init(); // const scroll = new Scroll(stage);
// const loadTexture = new LoadTexture(stage);
// loadTexture.render();
// scroll.scrolled(window.scrollY);

window.addEventListener('scroll', function (e) {// scroll.scrolled(window.scrollY);
  // loadTexture.scrolled(window.scrollY);
});
window.addEventListener("resize", function () {
  sphere.onResize();
  stage.onResize();
});

var _raf = function _raf() {
  window.requestAnimationFrame(function () {
    _raf(); // sphere.onRaf();


    object.onRaf();
    stage.onRaf();
  });
};

_raf();

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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var _Object = /*#__PURE__*/function () {
  function Object(stage) {
    _classCallCheck(this, Object);

    this.color = '#fff';
    this.stage = stage;
    this.mixer = "";
    this.clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
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
      uResolution: {
        value: [0, 0]
      },
      // ウィンドウの幅と高さ
      uMouse: {
        value: [-100.0, -100.0]
      },
      // マウス座標
      uTexture0: {
        value: null
      } // テクスチャ

    };
  }

  _createClass(Object, [{
    key: "init",
    value: function init() {
      // 3Dモデルの読み込み
      var stage = this.stage; // GLTFLoaderを作成

      var gltfLoader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader();
      var face = this.face; // let mixer = this.mixer;

      this.webGLRenderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
      document.getElementById("screen").appendChild(this.webGLRenderer.domElement);
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      this.renderTarget = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderTarget(window.innerWidth, window.innerHeight); // 頂点シェーダー

      var vertexShader = "\n      varying vec2 vUv;\n      void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 1.0);\n      }\n    "; // フラグメントシェーダー

      var fragmentShader = "\n      //\u53C2\u8003: https://blog.design-nkt.com/osyare-glsl2/\n      uniform vec2 uResolution; // \u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u5E45\u3068\u9AD8\u3055\n      uniform vec2 uMouse; // \u30DE\u30A6\u30B9\u5EA7\u6A19\n      uniform sampler2D t1; // \u30AA\u30D5\u30B9\u30AF\u30EA\u30FC\u30F3(\u30E1\u30E2\u30EA)\u306B\u63CF\u304D\u8FBC\u3093\u3060\u30C6\u30AF\u30B9\u30C1\u30E3\n      varying vec2 vUv; // \u30C6\u30AF\u30B9\u30C1\u30E3\u5EA7\u6A19\n\n      void main(void) {\n\n        // \u8272\u3092\u3064\u3051\u308B\u30D4\u30AF\u30BB\u30EB\u306E\u5EA7\u6A19\u3092\u6B63\u898F\u5316(-1~1)\u3057\u307E\u3059\n        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);\n\n        // \u30E2\u30B6\u30A4\u30AF\u4FC2\u6570\u3092\u4F5C\u308A\u307E\u3059\n        float mosaic = (1.0 - step(0.3, length(p - uMouse))) * max(uResolution.x, uResolution.y) + 50.0;\n\n        // \u30E2\u30B6\u30A4\u30AF\u4FC2\u6570\u3092\u4F7F\u3063\u3066\u30C6\u30AF\u30B9\u30C1\u30E3\u5EA7\u6A19\u3092\u5909\u63DB\u3057\u307E\u3059(\u3053\u3053\u3067\u30E2\u30B6\u30A4\u30AF\u52A0\u5DE5\u3092\u3057\u3066\u3044\u307E\u3059)\n        // vec2 uv = vec2(0.0, 0.0);\n        vec2 uv = floor(vUv * 200.0) / 200.0;\n\n        // \u30C6\u30AF\u30B9\u30C1\u30E3\u304B\u3089\u8272\u3092\u53D6\u308A\u51FA\u3057\u3066\u30D4\u30AF\u30BB\u30EB\u306E\u8272\u3068\u3057\u307E\u3059\n        gl_FragColor = texture(t1, uv);\n        \n      }\n    "; // ベースとなるシーンには板ポリ１枚だけしかありません
      // シェーダーを使うのでShaderMaterialを使います

      var geo = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(2, 2); // 板ポリをウィンドウぴったりにするために２×２

      this.mat = new three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial({
        vertexShader: vertexShader,
        // 頂点シェーダー
        fragmentShader: fragmentShader,
        uniforms: this.uniforms
      });
      var plane = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geo, this.mat);
      plane.position.set(0, 0, 1);

      var _this = this;

      this.offScene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
      this.offCamera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.offCamera.position.set(0, 0, 5);
      var ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xaaaaaa);
      this.offScene.add(ambientLight);
      var directionalLight = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(-1, 2, 2);
      this.offScene.add(directionalLight);
      var _offScene = this.offScene;
      this.postScene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
      this.postCamera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.postCamera.position.set(0, 0, 5);
      var postGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneBufferGeometry(2, 2);
      var postMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial({
        vertexShader: vertexShader,
        // 頂点シェーダー
        fragmentShader: fragmentShader,
        uniforms: {
          t1: {
            type: "t",
            value: this.renderTarget.texture
          },
          uResolution: {
            value: [window.innerWidth, window.innerHeight]
          },
          // ウィンドウの幅と高さ
          uMouse: {
            value: [0, 0]
          } // マウス座標  

        }
      });
      var postMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(postGeometry, postMaterial);
      postMesh.position.set(0, 0, 1);
      this.postScene.add(postMesh); // glbファイルを読み込み、シーンに追加

      gltfLoader.load('../assets/images/face.glb', function (gltf) {
        stage.scene.add(gltf.scene);
        stage.face = gltf.scene;

        _this._animation(gltf);

        var _face_clone = gltf.scene.clone();

        _this.face_clone = _face_clone;

        _face_clone.position.set(1, 0, 0);

        _offScene.add(_face_clone);
      }, undefined, function (error) {
        console.error(error);
      });
    }
  }, {
    key: "_setMesh",
    value: function _setMesh() {}
  }, {
    key: "_animation",
    value: function _animation(_gltf) {
      var animations = _gltf.animations;

      if (animations && animations.length) {
        console.log("anime");
        this.mixer = new three__WEBPACK_IMPORTED_MODULE_1__.AnimationMixer(_gltf.scene); //全てのAnimation Clipに対して

        for (var i = 0; i < animations.length; i++) {
          var animation = animations[i]; //Animation Actionを生成

          var action = this.mixer.clipAction(animation); //アニメーションを再生

          action.play();
        }
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      if (this.mixer) {
        console.log("_ren");
        this.mixer.update(this.clock.getDelta());
      } // this.webGLRenderer.setRenderTarget(null); // レンダーターゲットを解除します

    }
  }, {
    key: "onResize",
    value: function onResize() {//
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();

      this.webGLRenderer.setClearColor(0xf5f542); // 背景色

      this.webGLRenderer.setRenderTarget(this.renderTarget);
      this.webGLRenderer.render(this.offScene, this.offCamera);
      this.webGLRenderer.setRenderTarget(null);
      this.webGLRenderer.render(this.postScene, this.postCamera);
    }
  }]);

  return Object;
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