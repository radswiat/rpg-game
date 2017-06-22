import WaterTile from 'components/tiles/water';
import NPC from 'components/entities/npc';
import assets from 'assets/assets';

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
          location: { x, y},
          asset: assets.use(assets.tiles.grass)
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
            location: { x, y},
            asset: {
              texture: 'layer1',
              sprite: this.seed.perlin2(x / mod + 10, y / mod + 10) < -0.12 ? 0 : 1,
            }
          }
        }
      }
    }
  }

  _createEntities() {
    let mod = 2;
    this.entities = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.entities[x] === 'undefined') {
        this.entities[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        if (this.seed.perlin2(x / mod, y / mod) > 0.65) {
          //this.entities[x][y] = new NPC(x, y);
        }
      }
    }
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
    // bottom right
    // *
    // =    *
    // =         *
    // ============== *
    let bottomRight = assets.use(assets.tiles['water-holes'], {
      sprites: 'lines.bottomRight'
    });

    // right top
    //                *
    //           *    =
    //      *         =
    // * ==============
    let rightTop = assets.use(assets.tiles['water-holes'], {
      sprites: 'lines.rightTop'
    });

    let topLeft = assets.use(assets.tiles['water-holes'], {
      sprites: 'lines.topLeft'
    });

    let topRight = assets.use(assets.tiles['water-holes'], {
      sprites: 'lines.topRight'
    });

    // right top with top left corner
    // * = = =
    //    *  =
    //       *
    //    *  =
    // * = = =
    let rightTopWithTopLeft = assets.use(assets.tiles['water-holes'], {
      sprites: 'corners.rightTopWithTopLeft'
    });

    // bottom right with right top corner
    // *       *
    // = *   * =
    // = = * = =
    let bottomRightWithRightTop = assets.use(assets.tiles['water-holes'], {
      sprites: 'corners.bottomRightWithRightTop'
    });

    let leftBottomWithTopLeft = assets.use(assets.tiles['water-holes'], {
      sprites: 'corners.leftBottomWithTopLeft'
    });

    let leftBottomWithBottomRight = assets.use(assets.tiles['water-holes'], {
      sprites: 'corners.leftBottomWithBottomRight'
    });

    let innerCornersLeft = assets.use(assets.tiles['water-holes'], {
      sprites: 'innerCorners.left'
    });

    let blank = assets.use(assets.tiles['water-holes'], {
      sprites: 'blank'
    });

    this.tiles[29][26].asset = bottomRight;
    this.tiles[30][26].asset = bottomRight;
    this.tiles[31][26].asset = bottomRight;
    this.tiles[32][26].asset = bottomRightWithRightTop;
    this.tiles[32][25].asset = rightTop;
    this.tiles[32][24].asset = rightTop;
    this.tiles[32][23].asset = rightTopWithTopLeft;
    this.tiles[31][23].asset = topLeft;
    this.tiles[30][23].asset = topLeft;
    this.tiles[29][23].asset = topLeft;
    this.tiles[28][23].asset = innerCornersLeft
    this.tiles[28][22].asset = rightTop;
    this.tiles[28][21].asset = rightTopWithTopLeft;
    this.tiles[27][21].asset = topLeft;
    this.tiles[26][21].asset = topLeft;
    this.tiles[25][21].asset = topLeft;
    this.tiles[24][21].asset = leftBottomWithTopLeft;
    this.tiles[24][22].asset = topRight;
    this.tiles[24][23].asset = topRight;
    this.tiles[24][24].asset = topRight;
    this.tiles[24][25].asset = topRight;
    this.tiles[24][26].asset = leftBottomWithBottomRight;
    this.tiles[25][26].asset = bottomRight;
    this.tiles[26][26].asset = bottomRight;
    this.tiles[27][26].asset = bottomRight;
    this.tiles[28][26].asset = bottomRight;
    // fill
    this.tiles[25][25].asset = blank;
    this.tiles[26][25].asset = blank;
    this.tiles[27][25].asset = blank;
    this.tiles[28][25].asset = blank;
    this.tiles[29][25].asset = blank;
    this.tiles[30][25].asset = blank;
    this.tiles[31][25].asset = blank;
    // fill
    this.tiles[25][24].asset = blank;
    this.tiles[26][24].asset = blank;
    this.tiles[27][24].asset = blank;
    this.tiles[28][24].asset = blank;
    this.tiles[29][24].asset = blank;
    this.tiles[30][24].asset = blank;
    this.tiles[31][24].asset = blank;
    // fill
    this.tiles[25][23].asset = blank;
    this.tiles[26][23].asset = blank;
    this.tiles[27][23].asset = blank;
    // fill
    this.tiles[25][22].asset = blank;
    this.tiles[26][22].asset = blank;
    this.tiles[27][22].asset = blank;
  }
}
