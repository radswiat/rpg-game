import Render from 'core/render/render';
import { IsometricCamera } from 'core/camera/camera';
import Engine from 'core/engine/engine';
import { Noise } from 'noisejs';
import 'resources/scss/main.scss';

/**
 * Main game class
 */
class Game {

  /**
   * Game static constructor
   * @param gameSeed
   */
  static createGame(gameSeed) {
    new Game(gameSeed);
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
    this.engine = new Engine();
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
    this.createWorld();
    this.createObjects();
    this.createEntities();
  }

  /**
   * Create world
   * - create world grid
   */
  createWorld() {
    this.world = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.world[x] === 'undefined') {
        this.world[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.world[x][y] = {
          texture: 'layer0',
          sprite: Math.random() * (420 - 408) + 408,
          x,
          y
        }
      }
    }
  }

  /**
   * Place objects on the grid
   * - like trees ...
   */
  createObjects() {
    let mod = 2;
    this.objects = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.objects[x] === 'undefined') {
        this.objects[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        if (this.seed.perlin2(x / mod, y / mod) > 0.55) {
          this.objects[x][y] = {
            texture: 'layer1',
            sprite: this.seed.perlin2(x / mod + 10, y / mod + 10) < -0.12 ? 0 : 1,
            x,
            y
          }
        }
      }
    }
  }

  createEntities() {}

  /**
   * Start game
   * - register main game loop
   * - register every frame action
   */
  startGame() {
    this.engine.onHeartbeat(() => {
      this.render.renderClear();
      this.world.map((o) => {
        o.map((l) => {
          this.render.renderTile({
            texture: l.texture,
            sprite: l.sprite,
            x: l.x,
            y: l.y
          });
        })
      });

      this.objects.map((o) => {
        o.map((object) => {
          this.render.renderObject({
            texture: 'layer1',
            sprite: object.sprite,
            x: object.x,
            y: object.y
          })
        });
      });
    });
  }
}

if(module.hot) {
  Game.createGame(51);
  module.hot.accept();
}

