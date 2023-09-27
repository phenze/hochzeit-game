import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { GameData } from './GameData';
// [10]
import { Diamond } from './Diamond';
import isMobile from 'ismobilejs';
import { Ring } from './Ring';

// [/10]

export class Platform {
    constructor(rows, cols, x, createDiamonds) {
        // [10]
        this.diamonds = [];
        // [/10]

        this.rows = rows;
        this.cols = cols;

        this.tileSize = App.sprite("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;

        this.createContainer(x);
        this.createTiles();

        this.dx = 0;
        this.createBody();
        if (createDiamonds)
            this.createDiamonds();
    }

    // [10]
    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            // && this.diamonds.length === 0
            this.maxDiamonds = 0;
            if (GameData.currentLevel === 1) {
                this.maxDiamonds = 3;
            } else if (GameData.currentLevel === 2) {
                this.maxDiamonds = 2;
            } else if (GameData.currentLevel === 3 || GameData.currentLevel === 4) {
                this.maxDiamonds = 1;
            }
            if (Math.random() < App.config.diamonds.chance && this.diamonds.length < this.maxDiamonds) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    destroyAllDiamonds() {
        this.diamonds.forEach(diamond => diamond.destroy());
    }

    createDiamond(x, y) {
        var tmp;
        if (GameData.currentLevel === 4) {
            tmp = new Ring(x, y);
        } else {
            tmp = new Diamond(x, y);
        }
        this.container.addChild(tmp.sprite);
        tmp.createBody();
        this.diamonds.push(tmp);
    }
    // [/10]

    createBody() {
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, { friction: 0, isStatic: true });
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        if (isMobile(window.navigator).any) {
            const spriteUp = App.sprite("button_up");
            this.container.y = window.innerHeight - this.height - spriteUp.height;
        } else {
            this.container.y = window.innerHeight - this.height;
        }
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile"
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }


    // 06
    move() {
        this.dx = App.config.platforms.moveSpeed;
        if (GameData.currentLevel === 2) {
            this.dx = App.config.platforms.moveSpeedLevel2;
        }
        if (GameData.currentLevel === 3 || GameData.currentLevel === 4) {
            this.dx = App.config.platforms.moveSpeedLevel3;
        }
        if (this.body) {
            Matter.Body.setPosition(this.body, { x: this.body.position.x + this.dx, y: this.body.position.y });
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }

    destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.container.destroy();
    }
}