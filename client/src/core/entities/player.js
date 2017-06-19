import Entity from './entity';
import engine from 'core/engine/engine';
var inputs = require('game-inputs')( window )

export default class Player extends Entity {
  texture = 'playerbody';
  spriteLocation = [160, 285];
  spriteSize = [34, 56];

  // states/
  isWalking = false;
  direction = null;
  walkSequence = 0;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.bindControls();
    engine.onHeartbeat(this._walk.bind(this));
  }

  bindControls() {
    inputs.bind( 'move-up',   'W', '<up>' );
    inputs.down.on('move-up', () => {
      this.isWalking = true;
      this.isWalkingX = 1;
      this.isWalkingY = 1;
    });
    inputs.up.on('move-up', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-down',   'S', '<down>' );
    inputs.down.on('move-down', () => {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = -1;
    });
    inputs.up.on('move-down', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-right',   'D', '<right>' );
    inputs.down.on('move-right', () => {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = 1;
    });
    inputs.up.on('move-right', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-left',   'A', '<left>' );
    inputs.down.on('move-left', () => {
      this.isWalking = true;
      this.isWalkingX = 1;
      this.isWalkingY = -1;
    });
    inputs.up.on('move-left', () => {
      this.isWalking = false;
    });
  }

  _walk() {
    if (this.isWalking) {
      this.x = this.x - ( 1 * this.isWalkingX);
      this.y = this.y - ( 1 * this.isWalkingY);
      this._walkAnimate();
    }
  }

  _walkAnimate() {
    if (this.walkSequence >= 7) {
      this.walkSequence = 0;
    }
    this.spriteLocation = this.animationStates.walkRight[this.walkSequence];
    this.spriteLocation = this.animationStates.walkRight[this.walkSequence];
    this.walkSequence++;
  }

  getAnimationFrame(row, number) {

  }

  animationStates = {
    walkRight: [[159, 284], [824, 284], [864, 284],[7, 343], [44, 343], [84, 343], [122, 343]],
  }
}
