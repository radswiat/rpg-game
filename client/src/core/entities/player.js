import Entity from './entity';
import engine from 'core/engine/engine';
import { every } from 'core/utils/utils';
var inputs = require('game-inputs')( window );

export default class Player extends Entity {
  texture = 'playerbody2';
  spriteLocation = [154, 283];
  spriteSize = [36, 56];
  spriteFix = [15, 0];

  // states/
  isWalking = false;
  isWalkingSequence = false;
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
      this.animationType = 'walkUp';
    });
    inputs.up.on('move-up', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-down',   'S', '<down>' );
    inputs.down.on('move-down', () => {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = -1;
      this.animationType = 'walkDown';
    });
    inputs.up.on('move-down', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-right',   'D', '<right>' );
    inputs.down.on('move-right', () => {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = 1;
      this.animationType = 'walkRight';
    });
    inputs.up.on('move-right', () => {
      this.isWalking = false;
    });

    inputs.bind( 'move-left',   'A', '<left>' );
    inputs.down.on('move-left', () => {
      this.isWalking = true;
      this.isWalkingX = 1;
      this.isWalkingY = -1;
      this.animationType = 'walkLeft';
    });
    inputs.up.on('move-left', () => {
      this.isWalking = false;
    });
  }

  _walk() {
    if (this.isWalking) {
      this._walkSequence();
    }
  }

  _walkSequence() {
    // if sequence in progress,
    // don't start new one
    if (this.isWalkingSequence) {
      return;
    }
    this.isWalkingSequence = true;

    engine.tillEnd((tick) => {
      if (every(2, tick)) {
        if (this.walkSequence > 6) {
          this.walkSequence = 0;
          this.isWalkingSequence = false;
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return true;
        }
        this.x = this.x - ( (1 / 7) * this.isWalkingX);
        this.y = this.y - ( (1 / 7) * this.isWalkingY);
        this.spriteLocation = this.animationStates[this.animationType][this.walkSequence];
        this.walkSequence++;
      }
    });
  }


  animationStates = {
    walkLeft: [
      [828, 703], [942, 759],
      [161, 703], [121, 703], [77, 703], [32, 703],
      [828, 703]
    ],
    walkRight: [
      [154, 283], [40, 339],
      [821, 283], [861, 283], [905, 283], [950, 283],
      [154, 283]
    ],
    walkUp: [
      [90, 283], [259, 283],
      [293, 283], [327, 283], [360, 283], [393, 283],
      [90, 283]
    ],
    walkDown: [
      [225, 283], [443, 343],
      [476, 343], [506, 343], [539, 343], [604, 343],
      [225, 283]
    ],
  }
}
