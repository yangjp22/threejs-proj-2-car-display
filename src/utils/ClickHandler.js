// 整个 three.js 项目 - 点击事件管理类
import * as THREE from "three";


export class ClickHandler {
    // 单例模式（静态/类方法）：这个类被调用n次也只会产生同一个实例对象
    // 类方法只能由类调用，例如ClickHandler.getInstance()
    static getInstance() {
        if (!this.instance) {
            // 只有运行时：第一次才会进入
            this.instance = new ClickHandler();  // 实例化对象
        }
        return this.instance;
    }

    init(camera) {
        this.camera = camera;
        this.list = [];  // 光线投射交互计算的物体
        this.map = new Map();  // key可以使three.js的物体（与点击要执行的回调函数产生一对一的关系）

        // 光线投射的操作处理
        const rayCaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const app = document.querySelector("#app");

        window.addEventListener("click", evt => {
            pointer.x = (evt.clientX / app.clientWidth) * 2 - 1;
            pointer.y = -(evt.clientY / app.clientHeight) * 2 + 1;

            // 射线追踪
            rayCaster.setFromCamera(pointer, this.camera);
            // 找到此射线线所穿过的物体, 这些物体才会引起交互
            console.log(this.list);
            const list = rayCaster.intersectObjects(this.list);
            console.log(list);

            // 通过交互的物体本身，去map中找到对应要执行的回调函数
            list.forEach(obj => {
                // obj 为射线收集到的对象，obj.object 才是three.js中的mesh物体对象
                console.log(obj.object);
                const fn = this.map.get(obj.object);
                // 回调绑定事件函数体，并回传当前触发的这个 three.js 物体
                fn(obj.object);
            })
        })
    }

    // 传入要点击的物体和对应的函数体
    addMesh(mesh, fn) {
        this.list.push(mesh);
        this.map.set(mesh, fn);
    }
}