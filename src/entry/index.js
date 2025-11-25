// 初始化 three.js 基础环境
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

import { loadManager } from "@/model/loadManager";
import { City } from "@/model/City";
import { Car } from "@/model/Car";
import { MyLight } from "@/effect/MyLight";
import { MySky } from "@/effect/MySky";


export let scene, camera, renderer, controls;

// 此次是将3D场景渲染到一个容器下面
const app = document.querySelector("#app");

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    camera = new THREE.PerspectiveCamera(75, app.clientWidth / app.clientHeight, 0.1, 1000);
    camera.position.set(3, 1.5, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(app.clientWidth, app.clientHeight);
    renderer.shadowMap.enabled = true;

    app.appendChild(renderer.domElement);

    // 加载汽车模型
    loadManager("glb/mclaren.glb", (model) => {
        model.traverse(obj => {
            obj.castShadow = true;
        });
        new Car(model, scene, camera, controls);
        new MyLight(scene);
        new MySky(scene);
    });
}


function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);
}


function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);
}


function resizeRender() {
    app.addEventListener("resize", () => {
        renderer.setSize(app.clientWidth, app.clientHeight);
        camera.aspect = app.clientWidth / app.clientHeight;
        camera.updateProjectionMatrix();
    })
}


function renderLoop() {
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(renderLoop);
}


function start() {
    init();
    createControls();
    createAxesHelper();
    resizeRender();
    renderLoop();
}

start();