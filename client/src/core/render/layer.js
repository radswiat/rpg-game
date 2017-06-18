export default class Layer {

  constructor(layerName) {
    this.layer = document.getElementById(layerName);
    this._setLayerAutoSizes();
  }

  enableSmooth() {
    this.layer.getContext('2d').imageSmoothingEnabled = true;
  }

  ctx() {
    return this.layer.getContext('2d');
  }

  _setLayerAutoSizes() {
    this.layer.width = window.innerWidth;
    this.layer.height = window.innerHeight;
  }
}
