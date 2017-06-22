import engine from 'core/engine/engine';
import { every } from 'core/utils/utils';
import game from 'core/game/game';

export default class Entities {

  isWalkingSequence = false;
  walkSequence = 0;
  isWalking = false;

  constructor({ location }) {
    this.location = location;
    this.texture = this.constructor.texture;
    this.layer = 'objects';
    this.sprites = this.constructor.sprites;
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
    if (!game.canMove(this.location.x - ( 1 * isWalkingX), this.location.y - ( 1 * isWalkingY))) {
      return;
    }

    this.isWalkingSequence = true;

    let animationType = this.animationType;

    engine.tillEnd((tick) => {
      if (every(2, tick)) {
        if (this.walkSequence > 6) {
          this.walkSequence = 0;
          this.isWalkingSequence = false;
          this.location.x = Math.round(this.location.x);
          this.location.y = Math.round(this.location.y);
          return true;
        }
        this.location.x = this.location.x - ( (1 / 7) * isWalkingX);
        this.location.y = this.location.y - ( (1 / 7) * isWalkingY);
        this.sprites.location = this.constructor.animationStates[animationType][this.walkSequence];
        this.walkSequence++;
      }
    });
  }

}
