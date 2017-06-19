export class Engine {

  actions = [];
  then = 0;
  fpsInterval = 1000 / 30;

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
    let timestamp = new Date().getTime();
    for (let action of this.actions) {
      action(timestamp);
    }
    this._shouldEngineTick();
  }

  /**
   * Execute CB as often as possible using requestAnimationFrame
   * @param cb
   */
  onHeartbeat(cb) {
    this.actions.push(cb);
  }
}

export default new Engine();
