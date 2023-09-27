import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Button {
    constructor(hero) {
        this.hero = hero
        this.container = new PIXI.Container();
        this.createSprite();
    }


    createSprite() {
        const spriteUp = App.sprite("button_up");

        spriteUp.x = window.innerWidth / 3.0; // sprite.width * i;
        spriteUp.y = window.innerHeight - spriteUp.height;
        spriteUp.cursor = 'pointer';
        // sprite.height = window.innerHeight;
        spriteUp.width = window.innerWidth / 3.0;
        this.container.addChild(spriteUp);

        spriteUp.interactive = true;
        spriteUp.on("pointerdown", (event) => {
            this.hero.startJump()
        });

        const spriteLeft = App.sprite("button_left");

        spriteLeft.x = 0; // sprite.width * i;
        spriteLeft.y = window.innerHeight - spriteLeft.height;
        spriteLeft.cursor = 'pointer';
        // sprite.height = window.innerHeight;
        spriteLeft.width = window.innerWidth / 3.0;
        this.container.addChild(spriteLeft);

        spriteLeft.interactive = true;
        spriteLeft.on("pointerdown", (event) => {
            this.hero.moveX(false)
        });

        const spriteRight = App.sprite("button_right");

        spriteRight.x = window.innerWidth / 3.0 * 2.0; // sprite.width * i;
        spriteRight.y = window.innerHeight - spriteRight.height;
        spriteRight.cursor = 'pointer';
        // sprite.height = window.innerHeight;
        spriteRight.width = window.innerWidth / 3.0;
        this.container.addChild(spriteRight);

        spriteRight.interactive = true;
        spriteRight.on("pointerdown", (event) => {
            this.hero.moveX(true)
        });



    }

}