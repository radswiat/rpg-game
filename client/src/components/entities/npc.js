import Entity from 'core/entities/entity';
const inputs = require('game-inputs')( window );
import engine from 'core/engine/engine';
import { every } from 'core/utils/utils';

export default class NPC extends Entity {

  // texture used by entity
  static texture = 'playerbody2';

  // sprite location ( png coords )
  static spriteLocation = [154, 283];

  // sprite size ( render size )
  static spriteSize = [36, 56];

  // sprite fix ( render align )
  static spriteFix = [15, 0];

  // animation states
  static animationStates = {
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
  };

  constructor(x, y) {
    super(x, y);
    engine.onHeartbeat(this.applyRandomWalk.bind(this));
  }

  applyRandomWalk(tick) {
    if (!every(50, tick)) {
      return;
    }
    let random = Math.round(Math.random() * (5 - 1) + 1);
    if (random === 5) {
      this.isWalking = true;
      this.isWalkingX = 1;
      this.isWalkingY = 1;
      this.animationType = 'walkUp';
      super._walk();
    } else if (random === 4) {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = -1;
      this.animationType = 'walkDown';
      super._walk();
    } else if (random === 3) {
      this.isWalking = true;
      this.isWalkingX = -1;
      this.isWalkingY = 1;
      this.animationType = 'walkRight';
      super._walk();
    } else if (random === 2) {
      this.isWalking = true;
      this.isWalkingX = 1;
      this.isWalkingY = -1;
      this.animationType = 'walkLeft';
      super._walk();
    } else if (random === 1) {
    }
  }
}
