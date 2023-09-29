import * as PIXI from "pixi.js";

import { ProgressBar } from '@pixi/ui';
import { Graphics } from '@pixi/graphics';

import { App } from "../system/App";

import { TextMetrics } from 'pixi.js';
import anime from 'animejs/lib/anime.es.js';


export class LeckerliBarometer extends ProgressBar {

    args = {
        fillColor: '#21B18C',
        borderColor: '#1B9576',
        backgroundColor: '#FF7F50',
        value: 50,
        height: 35,
        radius: 25,
        border: 3,
        animate: true,
        vertical: false
    };

    initDone = false;

    constructor() {
        super();

    }

    updatePercent(percent) {
        anime({
            targets: this,
            progress: percent * 100,
            easing: 'easeOutCubic',
            round: 1,
            duration: 250,
            update: function () {
            }
        });
    }


    update(levelScore) {
        if (!this.initDone && window.innerWidth > 0) {
            const textMetrics = TextMetrics.measureText(levelScore.text, levelScore.style);


            this.x = textMetrics.width + 50;

            const width = Math.ceil(window.innerWidth - this.x - 30);
            this.innerView.y = 15;

            const bg = new Graphics()
                .beginFill(this.args.borderColor)
                .drawRoundedRect(0, 0, width, this.args.height, this.args.radius)
                .beginFill(this.args.backgroundColor)
                .drawRoundedRect(
                    this.args.border,
                    this.args.border,
                    width - (this.args.border * 2),
                    this.args.height - (this.args.border * 2), this.args.radius);

            const fill = new Graphics()
                .beginFill(this.args.borderColor)
                .drawRoundedRect(0, 0, width, this.args.height, this.args.radius)
                .beginFill(this.args.fillColor)
                .drawRoundedRect(
                    this.args.border,
                    this.args.border,
                    width - - (this.args.border * 2),
                    this.args.height - (this.args.border * 2), this.args.radius);

            this.init(
                {
                    bg: bg,
                    fill: fill,
                    progress: 0
                }
            )
            this.initDone = true;

            this.percentText = new PIXI.Text();
            this.percentText.text = 'Leckerlie-Meter';
            this.percentText.style = App.config.hochzeit.style;
            this.percentText.style.fontSize = 20;
            this.innerView.addChild(this.percentText);
            const textMetricsPercent = TextMetrics.measureText(this.percentText.text, this.percentText.style);
            this.percentText.x = this.innerView.width / 2.0 - textMetricsPercent.width / 2.0;
            this.percentText.y = this.innerView.height / 2.0 - textMetricsPercent.height / 2.0;
        }
    }
}