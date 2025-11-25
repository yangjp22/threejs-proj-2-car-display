// 专门产生精灵物体类
import * as TRHEE from "three";


export class MySprite {
    constructor({ name, url, position, scale }) {
        const texture = (new TRHEE.TextureLoader()).load(url);
        const spriteMaterial = new TRHEE.SpriteMaterial({
            map: texture
        });
        const sprite = new TRHEE.Sprite(spriteMaterial);
        sprite.name = name;
        sprite.position.set(...position);
        sprite.scale.set(...scale);

        return sprite;
    }
}