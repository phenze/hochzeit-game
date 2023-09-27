import * as PIXI from "pixi.js";
import { App } from "../system/App";

import { TextMetrics } from 'pixi.js';
import { GameData } from "./GameData";

export class HochzeitScore extends PIXI.Container {
    constructor() {
        super();
        this.x = 0;
        this.y = App.config.hochzeit.y;

        this.willMarryText = new PIXI.Text();
        this.willMarryText.text = 'Wir heiraten 👰🏻‍♀️🤵🏻‍♂️ am'
        this.willMarryText.anchor.set(App.config.hochzeit.anchor);
        this.willMarryText.style = App.config.hochzeit.style;
        this.willMarryText.visible = false;
        this.addChild(this.willMarryText)

        this.saveTheDateText = new PIXI.Text();
        this.saveTheDateText.text = 'Save the date!'
        this.saveTheDateText.anchor.set(App.config.hochzeit.anchor);
        this.saveTheDateText.style = App.config.hochzeit.style;
        this.saveTheDateText.visible = false;
        this.addChild(this.saveTheDateText)
        this.saveTheDateText.y = 150;


        this.dateText = new PIXI.Text();
        this.dateText.text = ''
        this.dateText.anchor.set(App.config.hochzeit.anchor);
        this.dateText.style = App.config.hochzeit.style;
        this.dateText.style.fontSize = 55;
        this.addChild(this.dateText)
        this.dateText.y = 70;

    }

    centerText(pixiTextObject) {
        const textMetrics = TextMetrics.measureText(pixiTextObject.text, pixiTextObject.style);
        pixiTextObject.x = window.innerWidth / 2.0 - textMetrics.width / 2.0;
    }

    update() {
        if (GameData.currentLevel === 2) {
            this.dateText.text = '14.'
        } else if (GameData.currentLevel === 3) {
            this.dateText.text = '14.09.'
        } else if (GameData.currentLevel === 4) {
            this.dateText.text = '14.09.2024'
            this.saveTheDateText.visible = true;
            this.willMarryText.visible = true;
        }

        this.centerText(this.willMarryText)
        this.centerText(this.saveTheDateText)
        this.centerText(this.dateText)
    }
}