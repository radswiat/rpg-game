import Render from 'core/render/render';
import { Noise } from 'noisejs';
import 'resources/scss/main.scss';

import { IsometricCamera } from 'core/camera/camera';
import engine from 'core/engine/engine';
import Player from 'core/entities/player';

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
    this.tiles = [];
    for (let x = 0; x < 60; x++) {
      if (typeof this.tiles[x] === 'undefined') {
        this.tiles[x] = [];
      }
      for(let y = 0; y < 60; y++) {
        this.tiles[x][y] = {
          texture: 'layer0',
          sprite: Math.random() * (420 - 408) + 408,
          x,
          y
        }
      }
    }

    this.render.onEvent('mousemove', ({ x, y }) => {
      if (typeof this.tiles[x] !== 'undefined') {
        if (typeof this.tiles[x][y] !== 'undefined') {
          this.mouseTile = {
            x, y
          };
        }
      }
    })
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

  createEntities() {
    this.entities = [];
    this.entities[30] = [];
    this.entities[30][30] = new Player(30, 30);
  }

  /**
   * Start game
   * - register main game loop
   * - register every frame action
   */
  startGame() {
    engine.onHeartbeat(() => {
      this.render.renderClear();
      this.tiles.map((o) => {
        o.map((tile) => {
          this.render.renderTile({
            texture: tile.texture,
            sprite: tile.sprite,
            x: tile.x,
            y: tile.y
          });
        })
      });

      if (this.mouseTile) {
        this.render.renderMouseCursor(this.mouseTile)
      }

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

      this.entities.map((o) => {
        o.map((entity) => {
          this.render.renderEntity(entity)
        });
      });

    });
  }
}

if(module.hot) {
  Game.createGame(51);
  module.hot.accept();
}

