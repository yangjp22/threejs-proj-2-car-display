// 城市类
import { BaseModel } from "@/model/BaseModels.js";


export class City extends BaseModel {
    init() {
        this.scene.add(this.model);
    }
}

