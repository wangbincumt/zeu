import BaseCanvas from './base-canvas';
import { COLOR } from './color';
import Utility from './utility';

export default class RoundFan extends BaseCanvas {

  constructor(baseDiv, options) {
    super(baseDiv, 200, 200);

    // Options
    this._fanColor = Utility.has(options, 'fanColor') ? options.fanColor : COLOR.green;
    this._centerColor = Utility.has(options, 'centerColor') ? options.centerColor : '#FFFFFF';
    this._speed = Utility.has(options, 'speed') ? options.speed : 1;
  }

  postConstructor() {
    super.postConstructor();
    this._ctx.globalCompositeOperation = 'destination-over';
  }

  on() {
    this.startAnimation();
  }

  off() {
    this.stopAnimation();
  }

  drawFrame() {
    let now = new Date();
    let angle = Utility.getAngleByDate(this._speed, now);

    this.clearAll();
    this._ctx.save();
    this.scale();

    this._ctx.translate(100, 100);
    this._ctx.rotate(angle);

    this._ctx.strokeStyle = this._centerColor;
    this._ctx.beginPath();
    this._ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    this._ctx.fillStyle = this._centerColor;
    this._ctx.fill();

    this._ctx.beginPath();
    this._ctx.arc(0, 0, 30, 0, 2 * Math.PI);
    this._ctx.fillStyle = this._fanColor;
    this._ctx.fill();

    this._ctx.beginPath();
    this._ctx.arc(0, 0, 35, 0, 2 * Math.PI);
    this._ctx.fillStyle = this._centerColor;
    this._ctx.fill();

    this._ctx.beginPath();
    this._ctx.moveTo(0, 0);

    // Up
    this._ctx.quadraticCurveTo(-60, -80, 0, -90);
    this._ctx.quadraticCurveTo(80, -100, 0, 0);

    // Right
    this._ctx.quadraticCurveTo(80, -60, 90, 0);
    this._ctx.quadraticCurveTo(100, 80, 0, 0);

    // Down
    this._ctx.quadraticCurveTo(60, 80, 0, 90);
    this._ctx.quadraticCurveTo(-80, 100, 0, 0);

    // Left
    this._ctx.quadraticCurveTo(-80, 60, -90, 0);
    this._ctx.quadraticCurveTo(-100, -80, 0, 0);

    this._ctx.fillStyle = this._fanColor;
    this._ctx.fill();
    this._ctx.stroke();

    this._ctx.restore();
  }

  set speed(speed) {
    this._speed = speed;
  }

  get speed() {
    return this._speed;
  }

  set centerColor(color) {
    this._centerColor = color;
  }

  get centerColor() {
    this._centerColor;
  }

  set fanColor(color) {
    this._fanColor = color;
  }

  get fanColor() {
    this._fanColor;
  }
}
