import engine from 'core/engine/engine';

export class Game {

  setWorld(world) {
    this.world = world;
  }

  setRender(render) {
    this.render = render;
  }

  start() {
    engine.onHeartbeat(() => {
      this.render.renderClear();
      this.render.renderWorld(this.world);
    });
  }
}

export default new Game();
