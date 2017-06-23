import { loadImage } from 'core/utils/utils';

import Layer from './layer';

export default class Render {

  textures = {};

  constructor() {
    this.initialize();
  }

  /**
   * Initialize render ( async )
   * @public
   * @returns {Promise.<void>}
   */
  async initialize() {
    this._initializeLayers();
    await this._initializeTextures();
  }

  /**
   * Initialize render layers
   * - background
   * - entities
   * - foreground
   */
  _initializeLayers() {
    let background = new Layer('background');
    background.enableSmooth();
    let objects = new Layer('objects');
    objects.enableSmooth();
    let foreground = new Layer('foreground');
    foreground.enableSmooth();
    this.layers = {
      background: background.ctx(),
      objects: objects.ctx(),
      foreground: foreground.ctx()
    };
  }

  /**
   * Initialize/load all textures
   * @returns {Promise}
   */
  async _initializeTextures() {
    return this._loadAllTextures();
  }

  async _loadAllTextures() {
    const allTextures = (async (context) => {
      let keys = context.keys();
      let textures = {};
      for (let texture of keys) {
        let img = await loadImage(`resources/${texture}`);
        textures[texture.match(/(([A-Za-z0-9])+)(\.png)$/)[1]] = img;
      }
      return textures;
    })(require.context('../../resources', true, /\.png/));
    this.textures = await allTextures;
  }

  renderClear() {

  }

  renderWorld(world) {
    world.map((arr, x) => {
      arr.map((tile, y) => {
        this.renderTile(tile, x, y)
      })
    })
  }

  renderTile({ texture, spriteLocation, spriteSize, location }, x, y) {
    this.layers.background.drawImage(
      this.textures[texture],
      ...spriteLocation,
      ...spriteSize,
      ...[x * spriteSize[0], y * spriteSize[1]],
      ...spriteSize
    );
  }

}
