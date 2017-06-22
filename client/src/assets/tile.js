import extend from 'lodash/extend';
import clone from 'lodash/cloneDeep';

export default class Tile {
  constructor(asset) {
    extend(this, asset);
  }

  clone() {
    return clone(this);
  }

  setLocation(location) {
    this.location = location;
    return this;
  }
}
