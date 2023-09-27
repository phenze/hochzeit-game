import { Assets } from 'pixi.js';

export class Loader {
    constructor(config) {
        // this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    loadAssets = async () => {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                const texture = await Assets.load(asset.data.default);
                this.resources[key] = texture
            }
        }
    }

    preload() {


        return new Promise(async (resolve) => {
            await this.loadAssets()
            resolve();
            // this.loader.load((loader, resources) => {
            //     this.resources = resources;
            // });
        });
    }
}