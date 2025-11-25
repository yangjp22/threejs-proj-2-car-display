import { camera } from "@/entry";
import { ClickHandler } from "@/utils/ClickHandler";


// 初始化这个单例模式，一旦实例化之后，只会存在一个实例
ClickHandler.getInstance().init(camera);

