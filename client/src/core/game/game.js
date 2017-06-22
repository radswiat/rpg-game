import engine from 'core/engine/engine';

export class Game {

  setWorld(world) {
    this.world = world;
    this._setWalkableGrid();
  }

  setCamera(camera) {
    this.camera = camera;
  }

  setRender(render) {
    this.render = render;
  }

  _setWalkableGrid() {
    this.walkableGrid = this.world.grid.map((o) => {
      return o.map((tile) => {
        let walkable = true;
        // if all walkable, set as walkable
        tile.map((object) => {
          if (!object.walkable) {
            walkable = false;
          }
        });
        return walkable;
      });
    });
    console.error('walkable');
    console.warn(this.walkableGrid);
  }

  addMouseListener() {
    // this.render.onEvent('mousemove', ({ x, y }) => {
    //   if (typeof this.world.tiles[x] !== 'undefined') {
    //     if (typeof this.world.tiles[x][y] !== 'undefined') {
    //       this.mouseTile = {
    //         x, y
    //       };
    //     }
    //   }
    // })
  }

  canMove(x, y) {
    return this.walkableGrid[x][y];
  }

  start() {
    this.addMouseListener();
    engine.onHeartbeat(() => {
      this.render.renderClear();
      this.render.renderWorld(this.world, this.mouseTile);
    });
  }
}

export default new Game();
