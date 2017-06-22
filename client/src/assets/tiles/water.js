import { getSpriteByIndex } from 'core/helpers/sprites';
import { every } from 'core/utils/utils';

let sequence = 0;
let direction = 1;

export default {
  walkable: true, // water is under every single tilset! it has to be set as walkable!
  layer: 'background',
  texture: 'layer0',
  singleton: true,
  sprites: {
    size: [64, 32],
    location: getSpriteByIndex(368)
  },
  animation: {
    frames: [
      368, 369, 370, 371, 372, 373, 374, 375, 376, 377,
      378, 379, 380, 381, 382, 383, 384, 385, 386, 387,
      388, 389, 390, 391, 392, 393, 394, 395, 396, 397,
      398, 399, 400, 401, 402, 403, 404, 405, 406, 407
    ]
  },
  onHeartbeat: (asset, tick) => {
    if (!every(2, tick)) {
      return;
    }
    if (sequence > 39) {
      sequence = 0;
    }
    asset.sprites.location = getSpriteByIndex(asset.animation.frames[sequence]);
    sequence += direction;
  }
}
