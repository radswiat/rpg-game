export default class Engine {
  constructor() {

  }

  /**
   * Execute CB as often as possible using requestAnimationFrame
   * @param cb
   */
  onHeartbeat(cb) {
    requestAnimationFrame(() => {
      cb();
      this.onHeartbeat(cb);
    });
  }
}
