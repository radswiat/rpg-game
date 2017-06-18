import { loadImage } from 'core/utils/utils';
import spritesHelper from 'core/helpers/sprites';

import Layer from './layer';

export default class Render {

  textures = {};

  constructor({ camera }) {
    this.camera = camera;
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
    let entities = new Layer('entities');
    entities.enableSmooth();
    let foreground = new Layer('foreground');
    foreground.enableSmooth();
    this.layers = {
      background: background.ctx(),
      entities: entities.ctx(),
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
    this.layers.background.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  renderTile({texture, sprite, x, y}) {
    let spriteLocation = spritesHelper.getLocation(sprite);
    this.layers.background.drawImage(
      this.textures[texture],
      spriteLocation[0],
      spriteLocation[1],
      64,
      32,
      ...this.camera.handleCoordsLocation(x, y),
      64,
      32
    );
  }

  renderObject({texture, sprite, x, y}) {
    let spriteLocation;
    let spriteSize;
    if (sprite === 0) {
      spriteLocation = [412, 0];
      spriteSize = [168, 207];
    } else {
      spriteLocation = [580, 0];
      spriteSize = [150, 207];
    }
    this.layers.background.drawImage(
      this.textures[texture],
      ...spriteLocation,
      ...spriteSize,
      ...this.camera.handleCoordsLocation(x, y),
      ...spriteSize,
    );
  }
}
