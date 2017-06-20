import Stats from 'core/helpers/stats';

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

export class Engine {

  actions = [];
  temporaryActions = [];
  then = 0;
  fpsInterval = 1000 / 34;
  tickCount = 0;

  constructor() {
    this._tick();
  }

  /**
   * Check if engine should tick/render a frame
   * - limit max frames to 30 frames per second
   * @private
   */
  _shouldEngineTick() {
    requestAnimationFrame(() => {
      let now = Date.now();
      let elapsed = now - this.then;

      if (elapsed > this.fpsInterval) {
        this.then = now;
        this._tick();
        return;
      }

      this._shouldEngineTick();
    });
  }

  /**
   * Make a tick,
   * - render all registered methods
   * @private
   */
  _tick() {
    stats.begin();
    let tickCount = this.tickCount++;
    for (let action of this.actions) {
      action(tickCount);
    }
    for (let [index, action] of this.temporaryActions.entries()) {
      if(action(tickCount)) {
        this.temporaryActions.splice(index, 1);
      }
    }
    stats.end();
    this._shouldEngineTick();
  }

  /**
   * Execute CB as often as possible using requestAnimationFrame
   * @param cb
   */
  onHeartbeat(cb) {
    this.actions.push(cb);
  }

  tillEnd(cb) {
    this.temporaryActions.push(cb);
  }
}

export default new Engine();
