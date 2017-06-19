import WaterTile from 'components/tiles/water';

export default class World {

  constructor(seed) {
    this.seed = seed;
    this._createTiles();
    this._createObjects();
    this._createEntities();
    this._createFluids();
    this._tempCreateLake();
  }

  _createTiles() {
    this.tiles = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.tiles[x] === 'undefined') {
        this.tiles[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.tiles[x][y] = {
          texture: 'layer0',
          sprite: Math.random() * (420 - 408) + 408,
          x,
          y
        }
      }
    }
  }

  _createObjects() {
    let mod = 2;
    this.objects = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.objects[x] === 'undefined') {
        this.objects[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        if (this.seed.perlin2(x / mod, y / mod) > 0.55) {
          this.objects[x][y] = {
            texture: 'layer1',
            sprite: this.seed.perlin2(x / mod + 10, y / mod + 10) < -0.12 ? 0 : 1,
            x,
            y
          }
        }
      }
    }
  }

  _createEntities() {

  }

  _createFluids() {
    this.fluids = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.fluids[x] === 'undefined') {
        this.fluids[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.fluids[x][y] = {
          object: WaterTile,
          x,
          y
        };
      }
    }
  }

  _tempCreateLake() {
    // bottom
    this.tiles[29][26].sprite = 340;
    this.tiles[30][26].sprite = 340;
    this.tiles[31][26].sprite = 340;
    // corner
    this.tiles[32][26].sprite = 346;
    // right
    this.tiles[32][25].sprite = 344;
    this.tiles[32][24].sprite = 344;
    // corner
    this.tiles[32][23].sprite = 348;
    // top
    this.tiles[31][23].sprite = 334;
    this.tiles[30][23].sprite = 334;
    this.tiles[29][23].sprite = 334;
    // inner corner
    this.tiles[28][23].sprite = 349;
    // right
    this.tiles[28][22].sprite = 344;
    // corner
    this.tiles[28][21].sprite = 348;
    // top
    this.tiles[27][21].sprite = 334;
    this.tiles[26][21].sprite = 334;
    this.tiles[25][21].sprite = 334;
    // corner
    this.tiles[24][21].sprite = 345;
    // left-top
    this.tiles[24][22].sprite = 337;
    this.tiles[24][23].sprite = 337;
    this.tiles[24][24].sprite = 337;
    this.tiles[24][25].sprite = 337;
    // corner
    this.tiles[24][26].sprite = 347;
    // bottom
    this.tiles[25][26].sprite = 340;
    this.tiles[26][26].sprite = 340;
    this.tiles[27][26].sprite = 340;
    this.tiles[28][26].sprite = 340;
    // fill
    this.tiles[25][25].sprite = 1000;
    this.tiles[26][25].sprite = 1000;
    this.tiles[27][25].sprite = 1000;
    this.tiles[28][25].sprite = 1000;
    this.tiles[29][25].sprite = 1000;
    this.tiles[30][25].sprite = 1000;
    this.tiles[31][25].sprite = 1000;
    // fill
    this.tiles[25][24].sprite = 1000;
    this.tiles[26][24].sprite = 1000;
    this.tiles[27][24].sprite = 1000;
    this.tiles[28][24].sprite = 1000;
    this.tiles[29][24].sprite = 1000;
    this.tiles[30][24].sprite = 1000;
    this.tiles[31][24].sprite = 1000;
    // fill
    this.tiles[25][23].sprite = 1000;
    this.tiles[26][23].sprite = 1000;
    this.tiles[27][23].sprite = 1000;
    // fill
    this.tiles[25][22].sprite = 1000;
    this.tiles[26][22].sprite = 1000;
    this.tiles[27][22].sprite = 1000;
  }
}
