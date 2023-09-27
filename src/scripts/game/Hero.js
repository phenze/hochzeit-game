import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);

        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
        this.score = 0;

        this.speedLimit = 0;
        this.accelRatio = 0.2;
    }

    collectDiamond(diamond) {
        ++this.score;
        //[13]
        this.sprite.emit("score");
        //[/13]
        diamond.destroy();
    }
    //[/12]

    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            this.jump()
            // Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }

    jump(v = -1.0) {
        const vy = this.body.velocity.y;
        const finalV = v * 12;
        Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: finalV });
    }

    moveX(forward) {
        if (forward) {
            const x = this.body.velocity.x;
            const finalX = (this.speedLimit - x) * this.accelRatio + x;
            Matter.Body.setVelocity(this.body, { x: finalX, y: this.body.velocity.y });
        } else {
            const x = this.body.velocity.x;
            const finalX = (-this.speedLimit - x) * this.accelRatio + x;
            Matter.Body.setVelocity(this.body, { x: finalX, y: this.body.velocity.y });
        }
        // var movementAmount = 5
        // Matter.Body.setVelocity(this.body, { x: forward ? movementAmount : -movementAmount, y: -0.1 });
    }

    // [08]
    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
    // [/08]

    createBody() {
        // dont rotate the body
        const options = {
            inertia: Infinity,
        }
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width * 0.8, this.sprite.height, options);
        this.body.restitution = 0;

        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.speedLimit = 15;
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;

        // [14]
        if (this.sprite.y > window.innerHeight || this.sprite.x < 0) {
            this.sprite.emit("die");
        }
        // [/14]
    }

    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("dog"),
            App.res("dog2"),
            App.res("dog3")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.15;
        this.sprite.play();
    }

    destroy() {
        App.app.ticker.remove(this.update, this);
        Matter.World.remove(App.physics.world, this.body);
        this.sprite.destroy();
    }
}