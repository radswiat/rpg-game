import engine from 'core/engine/engine';
import { every } from 'core/utils/utils';

class Water {

  texture = 'layer0';
  sprite = 368;
  sequence = 0;

  constructor() {
    engine.onHeartbeat((tick) => {
      if (!every(2, tick)) {
        return;
      }
      if (this.sequence > 39) {
        this.sequence = 0;
      }
      this.sprite = this.animationStates[this.sequence];
      this.sequence ++;
    })
  }

  animationStates = [
    368, 369, 370, 371, 372, 373, 374, 375, 376, 377,
    378, 379, 380, 381, 382, 383, 384, 385, 386, 387,
    388, 389, 390, 391, 392, 393, 394, 395, 396, 397,
    398, 399, 400, 401, 402, 403, 404, 405, 406, 407
  ];
}

export default new Water();
