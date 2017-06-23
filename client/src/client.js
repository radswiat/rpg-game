import Render from 'core/render/render';
import { Noise } from 'noisejs';
import 'resources/scss/main.scss';
import game from 'core/game/game';
import { getSpriteByIndex } from 'core/helpers/sprites';

/**
 * Main game class
 */
class App {

  /**
   * Game static constructor
   * @param gameSeed
   */
  static createGame(gameSeed) {
    new App(gameSeed);
  }

  constructor(seed) {
    this.seed = new Noise(seed);
    this.initialize();
  }

  async initialize() {
    await this.initializeComponents();
    this.initializeWorld();
    this.startGame();
  }

  /**
   * Initialize game core components
   * @returns {Promise.<void>}
   */
  async initializeComponents() {
    this.render = new Render();
    await this.render.initialize();
  }

  /**
   * Initialize world
   * - world
   * - objects
   * - entities
   */
  initializeWorld() {
    this.grid = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.grid[x] === 'undefined') {
        this.grid[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.grid[x][y] = {
          texture: 'indoor',
          spriteLocation: [40, 0],
          spriteSize: [40, 40]
        }
      }
    }
  }

  /**
   * Start game
   * - register main game loop
   * - register every frame action
   */
  startGame() {
    game.setWorld(this.grid);
    game.setRender(this.render);
    game.start();
  }

}

if(module.hot) {
  App.createGame(51);
  module.hot.accept();
}

//
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
//   ]
