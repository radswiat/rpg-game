import clone from 'lodash/cloneDeep';
import get from 'lodash/get';
import { getSpriteByIndex } from 'core/helpers/sprites';
import engine from 'core/engine/engine';
import Tile from './tile';

export class Assets {

  tiles = {};
  objects = {};

  async initialize() {
    await this._loadTiles();
    await this._loadObjects();
  }

  /**
   * Asset has to be assigne through .use method,
   * - make a copy
   * - execute in asset methods
   * @param asset
   * @returns {*}
   */
  use(asset, params = {}) {
    if (!asset.singleton) {
      asset = clone(asset);
    } else {
      if (asset.initialized) {
        return asset;
      }
      asset.initialized = true;
    }

    // if sprite location is a function
    if (typeof asset.sprites.location === 'function') {
      asset.sprites.location = asset.sprites.location();
    }

    if (params.location) {
      asset.location = params.location;
    }

    // events
    if (typeof asset.onHeartbeat === 'function') {
      engine.onHeartbeat(asset.onHeartbeat.bind(this, asset));
    }

    if (params.spriteLocation) {
      asset.sprites.location = getSpriteByIndex(
        get(asset.sprites.locations, params.spriteLocation)
      );
      console.warn(asset);
    }

    return new Tile(asset);
  }

  /**
   * Load tiles
   * - uses webpack to find all files
   * @returns {Promise.<void>}
   */
  async _loadTiles() {
    let context = require.context('../assets/tiles', true, /\.js/)
    return this._loadAssets(context, {
      prefix: 'tiles',
      path: 'tiles'
    });
  }

  /**
   * Load tiles
   * - uses webpack to find all files
   * @returns {Promise.<void>}
   */
  async _loadObjects() {
    let context = require.context('../assets/objects', true, /\.js/)
    return this._loadAssets(context, {
      prefix: 'objects',
      path: 'objects'
    });
  }

  /**
   * Load assets
   * @param context
   * @param prefix
   * @param path
   * @returns {Promise.<void>}
   * @private
   */
  async _loadAssets(context, { prefix, path }) {
    let keys = context.keys();
    for (let webpackPath of keys) {
      let assetName = webpackPath.replace(/(.\/)/g, '').replace(/(\.js)/, '');
      webpackPath = webpackPath.replace(/(.\/)/g, '');
      this[prefix][assetName] = require(`./${path}/${webpackPath}`).default;
    }
    console.warn(this[prefix]);
  }

}

export default new Assets();
