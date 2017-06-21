import clone from 'lodash/clone';

export class Assets {

  tiles = {};

  async initialize() {
    await this.loadTiles();
  }

  async loadTiles() {
    (async (context) => {
      let keys = context.keys();
      for (let path of keys) {
        let assetName = path.replace(/(.\/)/g, '').replace(/(\.js)/, '');
        path = path.replace(/(.\/)/g, '');
        console.log(path);
        this.tiles[assetName] = require(`./tiles/${path}`).default;
      }
      console.warn(this.tiles);
    })(require.context('../assets/tiles', true, /\.js/));
  }

  use(asset) {
    asset = clone(asset);
    if (typeof asset.sprite === 'function') {
      asset.sprite = asset.sprite();
    }
    return asset;
  }
}

export default new Assets();
