import Entity from 'core/entities/entity';
const inputs = require('game-inputs')( window );

export default class Player extends Entity {

  // texture used by entity
  static texture = 'playerbody2';

  static sprites = {
    // sprite location ( png coords )
    location: [154, 283],
    // sprite size ( render size )
    size: [36, 56],
    // sprite fix ( render align )
    fix: [15, -35]
  };

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

  constructor({ location }) {
    super({ location });
    this.bindControls();
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
}
