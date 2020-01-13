import "three/OBJLoader";
import "three/MTLLoader";
import "three/OrbitControls";
import vertexShader from '../shader/vertexShader.vert';
import fragmentShader from '../shader/fragmentShader.frag';

let scene = new THREE.Scene()
 
let mtlLoader = new THREE.OBJLoader();
 
let objLoader = new THREE.OBJLoader();


let material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

document.addEventListener('DOMContentLoaded', function() {

    /* camera(カメラ)の作成 */
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000 );
     
    /* renderer(レンダラー)の作成　*/
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( 'container' ).appendChild( renderer.domElement );
     
    // /* Light(ライト)の設定 */
    // var ambientLight = new THREE.AmbientLight( 0xCCCCCC, 2 );
    // scene.add( ambientLight );

    var pointLight = new THREE.PointLight(0xFFFFFF, 0.9, 1000);
    pointLight.position.set(100, 0, 200);
    scene.add(pointLight);


    /* camera(カメラ)の位置設定　*/
    camera.position.z = 100;
     
    /* camera(カメラ)をマウス操作する設定　*/   
    var controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    tick();

    objLoader.load(
      'assets/model_obj/face.obj',
      function ( object ) {

        // objをObject3Dで包む  
        var obj = new THREE.Object3D();
        obj.scale.set(10, 10, 10);   // 縮尺の初期化
        obj.rotation.set(20, 0, 0); // 角度の初期化
        obj.position.set(0, 0, 0); // 位置の初期化
        obj.add(object);

        scene.add(obj);  
        // 箱を作成
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material2 = new THREE.MeshPhongMaterial({color: 0x42B8C9});
        const box = new THREE.Mesh(geometry, material2);
        box.position.z = 40;
        box.scale.set(10, 10, 10);
        scene.add(box);    
      }
    )

    
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }


}