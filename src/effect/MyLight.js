// 光对象
import * as THREE from "three";


export class MyLight {
    constructor(scene) {
        this.scene = scene;  // 光所在的场景

        // 平行光的坐标位置
        this.dirPosLight = [
            [0, 5, 10],
            [-10, 5, 0],
            [0, 5, -10],
            [10, 5, 0]
        ]

        this.createCarDL();
    }

    // 给汽车创建平行光
    createCarDL() {
        this.dirPosLight.forEach(pos => {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(...pos);

            this.scene.add(directionalLight);
        })
    }
}