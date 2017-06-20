import Render from 'core/render/render';
import { Noise } from 'noisejs';
import 'resources/scss/main.scss';

import { IsometricCamera } from 'core/camera/camera';
import engine from 'core/engine/engine';
import Player from 'components/entities/player';

import World from 'components/world/world';

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
    this.addPlayerCharacter();
    this.addMouseListener();
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

  addMouseListener() {
    this.render.onEvent('mousemove', ({ x, y }) => {
      if (typeof this.world.tiles[x] !== 'undefined') {
        if (typeof this.world.tiles[x][y] !== 'undefined') {
          this.mouseTile = {
            x, y
          };
        }
      }
    })
  }

  addPlayerCharacter() {
    this.world.entities[30][30] = new Player(30, 30);
  }

  /**
   * Start game
   * - register main game loop
   * - register every frame action
   */
  startGame() {
    console.warn(this.world.entities);
    engine.onHeartbeat(() => {
      this.render.renderClear();

      this.world.fluids.map((o) => {
        o.map((fluidTile) => {
          this.render.renderFluid(fluidTile);
        })
      });

      this.world.tiles.map((o) => {
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

      this.world.objects.map((o) => {
        o.map((object) => {
          this.render.renderObject({
            texture: 'layer1',
            sprite: object.sprite,
            x: object.x,
            y: object.y
          })
        });
      });

      this.world.entities.map((o) => {
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

