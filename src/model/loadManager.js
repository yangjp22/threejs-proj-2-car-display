// 专门加载模型文件的
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// path: 模型文件路径
// successFn: 接收模型对象的加载成功函数
export function loadManager(path, successFn) {
    const loader = new GLTFLoader();
    loader.load(path,
        gltf => {
            successFn(gltf.scene);
        },
        process => {  // 当加载还在进行中的回调函数
            // console.log(process);
        },
        error => {  // 加载失败时的回调函数
            throw new Error(error);
        }
    )
}