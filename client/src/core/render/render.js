import { loadImage } from 'core/utils/utils';
import spritesHelper from 'core/helpers/sprites';

import Layer from './layer';

export default class Render {

  textures = {};

  constructor({ camera }) {
    this.camera = camera;
    this.initialize();
    this._mouseMoveEvents();
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

  _mouseMoveEvents() {
    document.onmousemove = ({ clientX, clientY }) => {
      let x, y, _x, _y;

      x = clientX ;
      y = clientY ;

      x = x - this.camera.x;
      y = y - this.camera.y;

      _x = (2 * y + x) / 2;
      _y = (2 * y - x) / 2;

      _x = ( _x / 64 ) * 2 ;
      _y = ( _y / 31 ) ;

      _x = Math.round(_x);
      _y = Math.round(_y);

      if (this.events['mousemove']) {
        for (let event of this.events['mousemove']) {
          if (typeof event === 'function') {
            event({ x: _x, y: _y})
          }
        }
      }
    }
  }

  onEvent(eventName, cb) {
    if (typeof this.events === 'undefined') {
      this.events = {};
    }
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [];
    }
    this.events[eventName].push(cb);
  }

  renderClear() {
    this.layers.background.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.layers.entities.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.layers.foreground.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  renderTile({texture, sprite, x, y, highlight}) {
    let spriteLocation = spritesHelper.getLocation(sprite);

    if (highlight) {
      spriteLocation = [455, 368];
    }

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

    // debugging
    let dLocations = this.camera.handleCoordsLocation(x, y);
    this.layers.background.fillText(`${x}:${y}`, dLocations[0] -10, dLocations[1] + 3);
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

  renderEntity({texture, spriteLocation, spriteSize, x, y}) {
    this.layers.entities.drawImage(
      this.textures[texture],
      ...spriteLocation,
      ...spriteSize,
      ...this.camera.handleCoordsLocation(x, y),
      ...spriteSize,
    );
  }
}
