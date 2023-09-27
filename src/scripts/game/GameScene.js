import * as Matter from 'matter-js';
import { LabelScore } from "./LabelScore";
import { LevelScore } from "./LevelScore";
import { HochzeitScore } from "./HochzeitScore";
import { App } from '../system/App';
import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { Platforms } from "./Platforms";
import { Button } from './Button';

import { GameData } from './GameData';

import isMobile from 'ismobilejs';

export class GameScene extends Scene {


    create() {
        this.createBackground();
        this.createHero();
        this.createPlatforms();
        this.setEvents();
        // //[13]
        this.createUI();
        // Add the 'keydown' event listener to our document
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        this.createButtons();
        //[/13]
    }

    onKeyDown(key) {
        // W Key is 87
        // Up arrow is 87
        if (key.keyCode === 87 || key.keyCode === 38) {
            this.hero.startJump()
        }

        // S Key is 83
        // Down arrow is 40
        if (key.keyCode === 83 || key.keyCode === 40) {

        }

        // A Key is 65
        // Left arrow is 37
        if (key.keyCode === 65 || key.keyCode === 37) {
            this.hero.moveX(false)
        }

        // D Key is 68
        // Right arrow is 39
        if (key.keyCode === 68 || key.keyCode === 39) {
            // If the D key or the Right arrow is pressed, move the player to the right.
            this.hero.moveX(true)
        }
    }
    //[13]
    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {

            if (GameData.currentLevel === 1 && this.hero.score === App.config.level.level1) {
                GameData.currentLevel++;
                this.hero.score = 0;
                this.levelScore.renderLevel(GameData.currentLevel);
            }
            if (GameData.currentLevel === 2 && this.hero.score === App.config.level.level2) {
                GameData.currentLevel++;
                this.hero.score = 0;
                this.levelScore.renderLevel(GameData.currentLevel);
            }
            if (GameData.currentLevel === 3 && this.hero.score === App.config.level.level3) {
                this.platfroms.destroyAllDiamonds();
                GameData.currentLevel++;
                this.hero.score = 0;
                this.levelScore.renderLevel(GameData.currentLevel);

            }
            if (GameData.currentLevel === 4 && this.hero.score === 2) {
                GameData.currentLevel++;
                GameData.gameFinished = true;
                this.platfroms.stopMovement();
            }
            this.labelScore.renderScore(this.hero.score);
        });

        this.levelScore = new LevelScore();
        this.container.addChild(this.levelScore);

        this.hochzeitScore = new HochzeitScore();
        this.container.addChild(this.hochzeitScore);
    }
    //[13]

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            if (!this.platfroms.movementStarted) {
                this.platfroms.startMovement()
            }
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);

        this.container.interactive = true;
        // this.container.on("pointerdown", () => {
        //     console.log('pointerdown')
        //     // this.hero.startJump();
        // });

        // [14]
        this.hero.sprite.once("die", () => {
            if (!GameData.gameFinished) {
                GameData.gameFinished = false;
                GameData.currentLevel = 1;
                App.scenes.start("Game");
            }
        });
        // [/14]
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createButtons() {
        if (isMobile(window.navigator).any) {
            this.buttons = new Button(this.hero);
            this.container.addChild(this.buttons.container);
        }
    }

    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

    update(dt) {
        this.bg.update(dt);
        this.platfroms.update(dt);
        this.hochzeitScore.update()
    }

    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.platfroms.destroy();
        this.labelScore.destroy();
        this.levelScore.destroy();
        this.hochzeitScore.destroy();
    }
}