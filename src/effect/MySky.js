// 背景天空类
import * as THREE from "three";


export class MySky {
    constructor(scene) {
        this.scene = scene;
        this.nowMesh = [];   // 记录当前背景的物体对象列表

        this.init();
    }

    // 初始化天空
    init() {
        // 默认 - 先创建室内展厅的背景环境
        this.createInDoor()
    }

    // 室内
    createInDoor() {
        // 球体
        const sphereGeo = new THREE.SphereGeometry(10, 32, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x42454c,
            side: THREE.DoubleSide
        });
        const sphere = new THREE.Mesh(sphereGeo, material);
        this.scene.add(sphere);

        this.nowMesh.push(sphere);

        // 地面
        const planeGeo = new THREE.CircleGeometry(10, 32);
        const standardMaterial = new THREE.MeshStandardMaterial({
            color: 0x42454c,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeo, standardMaterial);

        plane.rotation.set(-Math.PI / 2, 0, 0);
        this.scene.add(plane);
        this.nowMesh.push(plane);
    }
}