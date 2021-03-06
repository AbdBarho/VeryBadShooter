import CONFIG from "./Config";
import { getV2, V2 } from "./math/VectorTypes";
import EventManager from "./services/Eventmanager";
import Logger from "./services/Logger";
import Frame from "./Frame";

const { WIDTH, HEIGHT } = CONFIG.CANVAS;

export default class Canvas extends EventManager {
  scale = getV2();
  shift = getV2();
  size = getV2();

  baseSize: V2 = { x: WIDTH, y: HEIGHT };
  aspectRatio: number = WIDTH / HEIGHT;
  private _frame: Frame;

  constructor() {
    super();
    this._frame = new Frame(this);
    document.body.appendChild(this._frame.getBuffer());
    this.fit();
  }

  get frame() {
    return this._frame;
  }

  fit() {
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight;
    let width, height;
    if (Math.min(parentWidth, parentHeight) === parentWidth) {
      height = Math.trunc(Math.min(parentHeight, parentWidth / this.aspectRatio));
      width = Math.trunc(height * this.aspectRatio);
    } else {
      width = Math.trunc(Math.min(parentWidth, parentHeight * this.aspectRatio));
      height = Math.trunc(width / this.aspectRatio);
    }

    const shiftX = Math.trunc((parentWidth - width) / 2)
    const shiftY = Math.trunc((parentHeight - height) / 2);
    const same =
      width === this.size.x && height === this.size.y &&
      shiftX === this.shift.x && shiftY === this.shift.y;

    if (same)
      return;

    Logger.debugState({ width, height });

    this.size.x = width;
    this.size.y = height;

    this.scale = {
      x: this.size.x / this.baseSize.x,
      y: this.size.y / this.baseSize.y
    };

    this.shift.x = shiftX;
    this.shift.y = shiftY;

    this._frame.setDimensions(this.size, this.shift);
    this.trigger("resize", this.size);

  }

  pixelToUnit(x: number, y: number): V2 {
    return {
      x: (x - this.shift.x) / this.scale.x,
      y: (y - this.shift.y) / this.scale.y
    };
  }
}
