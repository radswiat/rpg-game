import { randomRange } from '../helpers';

export default {
  walkable: false,
  texture: 'layer0',
  sprites: {
    blank: 1000,
    lines: {
      bottomRight: 340,
      bottomLeft: 0,
      rightTop: 344,
      rightBottom: 0,
      topLeft: 334,
      topRight: 337,
      leftTop: 0,
      leftBottom: 0
    },
    corners: {
      bottomRightWithRightTop: 346,
      rightTopWithTopLeft: 348,
      leftBottomWithTopLeft: 345,
      leftBottomWithBottomRight: 347
    },
    innerCorners: {
      left: 349
    }
  }
}
