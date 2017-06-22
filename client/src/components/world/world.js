import NPC from 'components/entities/npc';
import assets from 'assets/assets';

export default class World {

  constructor(seed) {
    this.seed = seed;
    this._createGrid();
    this._createFluids();
    this._createTiles();
    this._createObjects();
    // this._createEntities();
    this._tempCreateLake();
  }

  _createGrid() {
    this.grid = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.grid[x] === 'undefined') {
        this.grid[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.grid[x][y] = [];
      }
    }
  }

  _createFluids() {
    for (let x = 0; x < 60; x++) {
      for(let y = 0; y < 60; y++) {
        this.grid[x][y].push(assets.use(assets.tiles.water))
      }
    }
  }

  _createTiles() {
    for (let x = 0; x < 60; x++) {
      for(let y = 0; y < 60; y++) {
        this.grid[x][y].push(assets.use(assets.tiles.grass, {
          location: { x, y }
        }))
      }
    }
  }

  _createObjects() {
    let mod = 2;
    for (let x = 0; x < 60; x++) {
      for(let y = 0; y < 60; y++) {
        if (this.seed.perlin2(x / mod, y / mod) > 0.55) {
          this.grid[x][y].push(assets.use(assets.objects.tree, {
            location: { x, y }
          }))
        }
      }
    }
  }

  _createEntities() {
    let mod = 2;
    for (let x = 0; x < 60; x++) {
      for(let y = 0; y < 60; y++) {
        if (this.seed.perlin2(x / mod, y / mod) > 0.65) {
          this.grid[x][y].push({
            location: { x, y },
            asset: new NPC(x, y)
          });
        }
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
      spriteLocation: 'lines.bottomRight'
    });

    // right top
    //                *
    //           *    =
    //      *         =
    // * ==============
    let rightTop = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'lines.rightTop'
    });

    let topLeft = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'lines.topLeft'
    });

    let topRight = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'lines.topRight'
    });

    // right top with top left corner
    // * = = =
    //    *  =
    //       *
    //    *  =
    // * = = =
    let rightTopWithTopLeft = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'corners.rightTopWithTopLeft'
    });

    // bottom right with right top corner
    // *       *
    // = *   * =
    // = = * = =
    let bottomRightWithRightTop = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'corners.bottomRightWithRightTop'
    });

    let leftBottomWithTopLeft = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'corners.leftBottomWithTopLeft'
    });

    let leftBottomWithBottomRight = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'corners.leftBottomWithBottomRight'
    });

    let innerCornersLeft = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'innerCorners.left'
    });

    let blank = assets.use(assets.tiles['water-holes'], {
      spriteLocation: 'blank',
      location: { x: 29, y: 26 }
    });

    this.grid[29][26][1] = bottomRight;
    this.grid[30][26][1] = bottomRight;
    this.grid[31][26][1] = bottomRight;
    this.grid[32][26][1] = bottomRightWithRightTop;
    this.grid[32][25][1] = rightTop;
    this.grid[32][24][1] = rightTop;
    this.grid[32][23][1] = rightTopWithTopLeft;
    this.grid[31][23][1] = topLeft;
    this.grid[30][23][1] = topLeft;
    this.grid[29][23][1] = topLeft;
    this.grid[28][23][1] = innerCornersLeft;
    this.grid[28][22][1] = rightTop;
    this.grid[28][21][1] = rightTopWithTopLeft;
    this.grid[27][21][1] = topLeft;
    this.grid[26][21][1] = topLeft;
    this.grid[25][21][1] = topLeft;
    this.grid[24][21][1] = leftBottomWithTopLeft;
    this.grid[24][22][1] = topRight;
    this.grid[24][23][1] = topRight;
    this.grid[24][24][1] = topRight;
    this.grid[24][25][1] = topRight;
    this.grid[24][26][1] = leftBottomWithBottomRight;
    this.grid[25][26][1] = bottomRight;
    this.grid[26][26][1] = bottomRight;
    this.grid[27][26][1] = bottomRight;
    this.grid[28][26][1] = bottomRight;
    // fill
    this.grid[25][25][1] = blank;
    this.grid[26][25][1] = blank;
    this.grid[27][25][1] = blank;
    this.grid[28][25][1] = blank;
    this.grid[29][25][1] = blank;
    this.grid[30][25][1] = blank;
    this.grid[31][25][1] = blank;
    // fill
    this.grid[25][24][1] = blank;
    this.grid[26][24][1] = blank;
    this.grid[27][24][1] = blank;
    this.grid[28][24][1] = blank;
    this.grid[29][24][1] = blank;
    this.grid[30][24][1] = blank;
    this.grid[31][24][1] = blank;
    // fill
    this.grid[25][23][1] = blank;
    this.grid[26][23][1] = blank;
    this.grid[27][23][1] = blank;
    // fill
    this.grid[25][22][1] = blank;
    this.grid[26][22][1] = blank;
    this.grid[27][22][1] = blank;
  }
}
