import clone from 'lodash/clone';
import get from 'lodash/get';

export class Assets {

  tiles = {};

  async initialize() {
    await this.loadTiles();
  }

  /**
   * Load tiles
   * - uses webpack to find all files
   * @returns {Promise.<void>}
   */
  async loadTiles() {
    (async (context) => {
      let keys = context.keys();
      for (let path of keys) {
        let assetName = path.replace(/(.\/)/g, '').replace(/(\.js)/, '');
        path = path.replace(/(.\/)/g, '');
        this.tiles[assetName] = require(`./tiles/${path}`).default;
      }
      console.warn(this.tiles);
    })(require.context('../assets/tiles', true, /\.js/));
  }

  /**
   * Asset has to be assigne through .use method,
   * - make a copy
   * - execute in asset methods
   * @param asset
   * @returns {*}
   */
  use(asset, params = {}) {
    asset = clone(asset);
    if (typeof asset.sprite === 'function') {
      asset.sprite = asset.sprite();
    }

    if (params.sprites) {
      asset.sprite = get(asset.sprites, params.sprites);
    }

    return asset;
  }
}

export default new Assets();
