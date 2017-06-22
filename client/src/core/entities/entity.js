import engine from 'core/engine/engine';
import { every } from 'core/utils/utils';
import game from 'core/game/game';

export default class Entities {

  isWalkingSequence = false;
  walkSequence = 0;
  isWalking = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.texture = this.constructor.texture;
    this.spriteLocation = this.constructor.spriteLocation;
    this.spriteSize = this.constructor.spriteSize;
    this.spriteFix = this.constructor.spriteFix;
    engine.onHeartbeat(this._walk.bind(this));
  }

  _walk() {
    if (this.isWalking) {
      this._executeWalkSequence();
    }
  }

  _executeWalkSequence() {
    // if sequence in progress,
    // don't start new one
    if (this.isWalkingSequence) {
      return;
    }

    let isWalkingX = this.isWalkingX;
    let isWalkingY = this.isWalkingY;

    // collision check
    // can entity move into new location ?
    if (!game.canMove(this.x - ( 1 * isWalkingX), this.y - ( 1 * isWalkingY))) {
      return;
    }

    this.isWalkingSequence = true;

    let animationType = this.animationType;

    engine.tillEnd((tick) => {
      if (every(2, tick)) {
        if (this.walkSequence > 6) {
          this.walkSequence = 0;
          this.isWalkingSequence = false;
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return true;
        }
        this.x = this.x - ( (1 / 7) * isWalkingX);
        this.y = this.y - ( (1 / 7) * isWalkingY);
        this.spriteLocation = this.constructor.animationStates[animationType][this.walkSequence];
        this.walkSequence++;
      }
    });
  }

}
