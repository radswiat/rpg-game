import Render from 'core/render/render';
import { Noise } from 'noisejs';
import 'resources/scss/main.scss';
import game from 'core/game/game';
import assets from 'assets/assets';

import { IsometricCamera } from 'core/camera/camera';
import Player from 'components/entities/player';
import World from 'components/world/world';


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
    await assets.initialize();
    this.initializeWorld();
    this.addPlayerCharacter();
    this.startGame();
  }

  /**
   * Initialize game core components
   * @returns {Promise.<void>}
   */
  async initializeComponents() {
    this.camera = new IsometricCamera({
      x: 600,
      y: -400
    });

    this.render = new Render({
      camera: this.camera
    });
    await this.render.initialize();
  }

  /**
   * Initialize world
   * - world
   * - objects
   * - entities
   */
  initializeWorld() {
    this.world = new World(this.seed);
  }

  addPlayerCharacter() {
    // this.world.objects[30][30] = new Player(30, 30);
  }

  /**
   * Start game
   * - register main game loop
   * - register every frame action
   */
  startGame() {
    game.setCamera(this.camera);
    game.setRender(this.render);
    game.setWorld(this.world);
    game.start();
  }

}

if(module.hot) {
  App.createGame(51);
  module.hot.accept();
}
