import * as PIXI from "pixi.js";
import { App } from "../system/App";

import { TextMetrics } from 'pixi.js';
import { GameData } from "./GameData";

export class HochzeitScore extends PIXI.Container {
    constructor() {
        super();
        this.x = 0;
        var currentY = App.config.hochzeit.y;
        this.y = currentY;


        this.ourNameText = new PIXI.Text();
        this.ourNameText.text = '✨ Leonie & Pasi ✨'
        this.ourNameText.anchor.set(App.config.hochzeit.anchor);
        this.ourNameText.style = App.config.hochzeit.style;
        this.ourNameText.visible = false;
        this.addChild(this.ourNameText)


        this.heartText = new PIXI.Text();
        this.heartText.text = '♥️'
        this.heartText.anchor.set(App.config.hochzeit.anchor);
        this.heartText.style = App.config.hochzeit.style;
        this.heartText.visible = false;
        this.addChild(this.heartText)

        // currentY += 10;

        this.willMarryText = new PIXI.Text();
        this.willMarryText.text = 'Wir heiraten am'
        this.willMarryText.anchor.set(App.config.hochzeit.anchor);
        this.willMarryText.style = App.config.hochzeit.style;
        this.willMarryText.visible = false;
        this.addChild(this.willMarryText)


        this.dateText = new PIXI.Text();
        this.dateText.text = ''
        this.dateText.anchor.set(App.config.hochzeit.anchor);
        this.dateText.style = App.config.hochzeit.style;
        this.dateText.style.fontSize = 55;
        this.addChild(this.dateText)


        this.saveTheDateText = new PIXI.Text();
        this.saveTheDateText.text = 'Save the date!'
        this.saveTheDateText.anchor.set(App.config.hochzeit.anchor);
        this.saveTheDateText.style = App.config.hochzeit.style;
        this.saveTheDateText.visible = false;
        this.addChild(this.saveTheDateText)
    }

    centerText(pixiTextObject) {
        const textMetrics = TextMetrics.measureText(pixiTextObject.text, pixiTextObject.style);
        pixiTextObject.x = window.innerWidth / 2.0 - textMetrics.width / 2.0;
    }

    setFinishedYValues() {
        var currentY = App.config.hochzeit.y;
        this.ourNameText.y = 0;
        currentY += 10;
        this.heartText.y = 55;
        this.willMarryText.y = currentY;
        currentY += 50;
        this.dateText.y = currentY;
        currentY += 70;
        this.saveTheDateText.y = currentY;
    }

    update() {
        if (GameData.currentLevel === 2) {
            this.dateText.text = '14.'
        } else if (GameData.currentLevel === 3) {
            this.dateText.text = '14.09.'
        } else if (GameData.currentLevel === 4) {
            this.dateText.text = '14.09.2024'
        } else if (GameData.currentLevel === 5) {
            this.setFinishedYValues();
            this.saveTheDateText.visible = true;
            this.willMarryText.visible = true;
            this.ourNameText.visible = true;
            this.heartText.visible = true;
        }
        this.centerText(this.heartText)
        this.centerText(this.ourNameText)
        this.centerText(this.willMarryText)
        this.centerText(this.saveTheDateText)
        this.centerText(this.dateText)
    }
}