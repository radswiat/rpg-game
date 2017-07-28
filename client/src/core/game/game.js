import engine from 'core/engine/engine';

export class Game {

  setWorld(world) {
    this.world = world;
  }

  setEntities(entities) {
    this.entities = entities;
  }

  setRender(render) {
    this.render = render;
  }

  start() {
    engine.onHeartbeat(() => {
      this.render.renderClear();
      this.render.renderWorld(this.world);
      this.render.renderEntities(this.entities);
    });
  }
}

export default new Game();
