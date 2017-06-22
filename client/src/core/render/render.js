import { loadImage } from 'core/utils/utils';

import Layer from './layer';

export default class Render {

  textures = {};
  events = {};

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
    this.layers.objects.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.layers.foreground.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  renderWorld(world, mouse) {

    // render fluids
    // world.fluids.map((o) => {
    //   o.map((fluidTile) => {
    //     this.renderFluid(fluidTile);
    //   })
    // });

    // render tiles
    world.grid.map((o, xIndex) => {
      o.map((tiles, yIndex) => {
        tiles.map((object, zIndex) => {
          this.renderTile(object, { x: xIndex, y: yIndex, z: zIndex });
        });
      })
    });

    // render mouse events
    if (mouse) {
      this.renderMouseCursor(mouse)
    }

    // render objects
    // world.objects.map((o) => {
    //   o.map((object) => {
    //     this.renderObject(object)
    //   });
    // });

    // render entities
    // world.objects.map((o) => {
    //   o.map((object) => {
    //     this.renderObjects(object)
    //   });
    // });
  }

  renderTile({ layer, location, texture, sprites }, index) {
    let x = location ? location.x : index.x;
    let y = location ? location.y : index.y;
    this.layers[layer].drawImage(
      this.textures[texture],
      ...sprites.location,
      ...sprites.size,
      ...this.camera.handleCoordsLocation(x, y, sprites.fix),
      ...sprites.size
    );

    // debugging
    // let dLocations = this.camera.handleCoordsLocation(location.x, location.y);
    // this.layers.background.fillText(`${location.x}:${location.y}`, dLocations[0] + 22, dLocations[1] + 18);
  }

  renderEntity({ x, y, texture, layer, sprites }) {
    this.layers[layer].drawImage(
      this.textures[texture],
      ...sprites.location,
      ...sprites.size,
      ...this.camera.handleCoordsLocation(x, y),
      ...sprites.size
    );

    // debugging
    // let dLocations = this.camera.handleCoordsLocation(location.x, location.y);
    // this.layers.background.fillText(`${location.x}:${location.y}`, dLocations[0] + 22, dLocations[1] + 18);
  }

  ___renderEntity({texture, spriteLocation, spriteSize, spriteFix, x, y}) {
    this.layers.entities.drawImage(
      this.textures[texture],
      ...spriteLocation,
      ...spriteSize,
      ...this.camera.handleCoordsLocation(x, y, spriteFix),
      ...spriteSize,
    );

    spriteLocation = [455, 368];
    this.layers.background.drawImage(
      this.textures['layer0'],
      spriteLocation[0],
      spriteLocation[1],
      64,
      32,
      ...this.camera.handleCoordsLocation(x, y),
      64,
      32
    );
  }

  renderMouseCursor({ x, y }) {
    let spriteLocation = [455, 368];
    this.layers.background.drawImage(
      this.textures['layer0'],
      spriteLocation[0],
      spriteLocation[1],
      64,
      32,
      ...this.camera.handleCoordsLocation(x, y),
      64,
      32
    );
  }
}
