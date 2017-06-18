export default class IsometricCamera {

  constructor({x, y}) {
    this._x = x || 0;
    this._y = y || 0;
    this.userCameraControls();
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  static toIso(x, y) {
    let _x = x - y;
    let _y = ( x+ y );
    return {x : (_x * 64 / 2), y: (_y * 31 / 2)};
  }

  handleCoordsLocation(_x, _y) {
    let {x, y} = IsometricCamera.toIso(_x, _y);
    return [x + this.x, y + this.y];
  }

  userCameraControls() {
    document.onkeydown = (e) => {
      e = e || window.event;

      if (e.keyCode == '38') {
        // up arrow
        this._y += 10;
      }
      else if (e.keyCode == '40') {
        this._y -= 10;
      }
      else if (e.keyCode == '37') {
        this._x += 10;
      }
      else if (e.keyCode == '39') {
        this._x -= 10;
      }
    }
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
