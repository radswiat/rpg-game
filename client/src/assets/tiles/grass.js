import { randomRange } from '../helpers';
import { getSpriteByIndex } from 'core/helpers/sprites';

export default {
  walkable: true,
  layer: 'background',
  texture: 'layer0',
  sprites: {
    size: [64, 32],
    location: () => getSpriteByIndex(randomRange(408, 420))
  }
}
