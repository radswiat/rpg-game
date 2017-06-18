export default class Camera {

  _x = 0;
  _y = 0;

  constructor() {
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  handleCoordsLocation(x, y) {
    return [(x * 32) + this.x, (y * 15) + this.y];
  }

  reverseX = false;
  reverseY = false;

  showcase() {
    if (this.x < 1200 && !this.reverseX) {
      this._x += 8;
    } else if(this.y < 600 && !this.reverseY) {
      this._y += 5;
      this.reverseX = true;
    } else if (this.x > 0) {
      this._x -= 8;
      this.reverseY = true;
    } else if (this.y > 0) {
      this._y -= 5;
    } else {
      this.reverseX = false;
      this.reverseY = false;
    }

  }
}
