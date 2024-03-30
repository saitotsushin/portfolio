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



var stage = new _module_stage__WEBPACK_IMPORTED_MODULE_1__.default();
stage.init();
var sphere = new _module_sphere__WEBPACK_IMPORTED_MODULE_0__.default(stage); // sphere.init();

var object = new _module_object__WEBPACK_IMPORTED_MODULE_2__.default(stage);
object.init();
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

/***/ "./src/assets/scripts/module/object.js":
/*!*********************************************!*\
  !*** ./src/assets/scripts/module/object.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _Object)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_DDSLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/DDSLoader.js */ "./node_modules/three/examples/jsm/loaders/DDSLoader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var _Object = /*#__PURE__*/function () {
  function Object(stage) {
    _classCallCheck(this, Object);

    this.color = '#fff';
    this.stage = stage;
  }

  _createClass(Object, [{
    key: "init",
    value: function init() {
      // 3Dモデルの読み込み
      var stage = this.stage;
      var manager = new three__WEBPACK_IMPORTED_MODULE_3__.LoadingManager();
      manager.addHandler(/\.dds$/i, new three_examples_jsm_loaders_DDSLoader_js__WEBPACK_IMPORTED_MODULE_2__.DDSLoader()); // DDSローダーの準備
      // MTLファイルの読み込み

      new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__.MTLLoader(manager).load('/assets/images/10778_Toilet_V2.mtl', // ロード完了時の処理
      function (materials) {
        materials.preload(); // OBJファイルの読み込み

        new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_0__.OBJLoader(manager).setMaterials(materials) // マテリアルの指定
        .load('/assets/images/10778_Toilet_V2.obj', // ロード完了時の処理
        function (object) {
          stage.scene.add(object);
          console.log('読み込み完了', object);
          object.position.x = 0;
          object.position.y = 0;
          object.position.z = 30;
        });
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

  return Object;
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

    this.renderParam = {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.cameraParam = {
      fov: 45,
      near: 0.1,
      far: 100,
      lookAt: new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 100.0
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

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      this.camera.aspect = windowWidth / windowHeight;
      this.camera.fov = this.cameraParam.fov;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(windowWidth, windowHeight);
      var directionalLight = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
      directionalLight.position.set(-1, 1, 1).normalize();
      this.scene.add(directionalLight);
      var ambientLight = new three__WEBPACK_IMPORTED_MODULE_2__.AmbientLight(0xffffff);
      ambientLight.intensity = 0.5;
      this.scene.add(ambientLight);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n#define GLSLIFY 1\n\nuniform vec3 u_color;\n\nvoid main() {\n    gl_FragColor = vec4(u_color, 1.0);\n}");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nattribute vec3 position;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float u_scale;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main() {\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * u_scale, 1.0 );\n}");

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