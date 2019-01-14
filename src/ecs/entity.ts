import { ExplosionModel, RectangularModel, StarAnimation } from "./Component";
import Vec2 from "../math/vector/Vec2";

export type ComponentName = keyof Entity;

export default interface Entity {
  ID: string;
  hasChanged: boolean;
  //movement
  moves?: boolean;
  position?: Vec2;
  velocity?: Vec2;
  maxVelocity?: number;
  acceleration?: Vec2;
  maxAcceleration?: number;
  // world ends
  keepInWorld?: boolean;
  wrapAroundWorld?: boolean;
  //render
  rectModel?: RectangularModel;
  //mouse follower
  mouseFollower?: boolean;
  //explosion
  explosion?: boolean;
  explosionVelocity?: number;
  explosionRadius?: number;
  explosionModel?: ExplosionModel;
  explodes?: boolean;
  // stars
  starAnimation?: StarAnimation;
  //debug
  debugCirclePoint?: number[];

}
