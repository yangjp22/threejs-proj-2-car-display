// 汽车模型
import * as THREE from "three";
import { gsap } from "gsap";

import { BaseModel } from "@/model/baseModels";
import { MySprite } from "@/model/MySprite";
import { ClickHandler } from "@/utils/ClickHandler";


export class Car extends BaseModel {
    init() {
        this.scene.add(this.model);

        // 车内每个小组件对象
        this.carComp = {
            body: {
                main: {  // 车身
                    name: "g_Body",
                    model: {}  // 车身小物体对象
                },
                roof: {  // 车顶
                    name: "g_Body_SUB2_Carpaint_0",
                    model: {}
                },
                leftDoor: {  // 车左门
                    name: "polymsh5_SUB0_Carpaint_0",
                    model: {},
                    mark: [
                        {
                            name: "sprite",
                            url: "images/sprite.png",
                            position: [0, -10, -40],
                            scale: [10, 10, 10],
                        }
                    ]
                },
                rightDoor: {  // 车右门
                    name: "GEO_DOOR_RR_SUB0_Carpaint_0",
                    model: {},
                    mark: [
                        {
                            name: "sprite",
                            url: "images/sprite.png",
                            position: [-5, -20, 35],
                            scale: [10, 10, 10],
                        }
                    ]
                }
            }
        }

        Object.values(this.carComp.body).forEach(obj => {
            const target = this.model.getObjectByName(obj.name);
            obj.model = target;
        })

        this.modifyCarBody();
        this.createDoorSprite();
    }

    // 修改车身，重新赋予材质
    modifyCarBody() {
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff9900,
            roughness: 0.5,
            metalness: 1,
            clearcoat: 1,
            clearcoatRoughness: 0
        })

        // 赋予到每一个组件上面
        Object.values(this.carComp.body).forEach(obj => {
            obj.model.material = bodyMaterial;
        })
    }

    // 给两个车门创建精灵物体
    createDoorSprite() {
        const markList = [this.carComp.body.leftDoor, this.carComp.body.rightDoor];

        // 遍历创建精灵物体
        markList.forEach(obj => {
            // 给车门所有热点标记遍历一个个生成附加的物体
            obj.mark.forEach(markObj => {
                // 为数据对象生成精灵物体，并添加到小物体模型上
                if (markObj.name === "sprite") {
                    const sprite = new MySprite(markObj);
                    obj.model.add(sprite);

                    // 为精灵物体进行射线交互的绑定
                    ClickHandler.getInstance().addMesh(sprite, clickThreeObject => {
                        const targetDoor = clickThreeObject;  // 父级物体对象（车门）
                        console.log(targetDoor);
                        if (!targetDoor.userData.isOpen) {  // 当前门是关闭状态
                            this.setDoorAnimation(targetDoor, { x: Math.PI / 3 });
                            targetDoor.userData.isOpen = true;
                        } else {
                            this.setDoorAnimation(targetDoor, { x: 0 });
                            targetDoor.userData.isOpen = false;
                        }
                    })
                }
            })
        })
    }

    setDoorAnimation(mesh, obj) {
        gsap.to(mesh.rotation, {
            x: obj.x,
            duration: 1,
            eash: "powerl.in"
        })
    }
}