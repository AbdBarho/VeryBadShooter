import IEntity, { ComponentName } from "../entity";
import ISystem from "./isystem";

export default class System implements ISystem {
  required: ComponentName[];
  entities: { [ID: string]: IEntity } = {};

  /**
   * @param required requried components, if nothing given, the system will not contain any entities
   */
  constructor(required: ComponentName[]) {
    this.required = required;
  }

  private checkCompatibility(entity: IEntity) {
    for (let i = 0, len = this.required.length; i < len; i++)
      if (!(this.required[i] in entity))
        return false;
    return true;
  }

  processCompatibility(entity: IEntity) {
    if (this.required.length === 0)
      return;

    if (this.checkCompatibility(entity))
      this.entities[entity.ID] = entity;
    else
      delete this.entities[entity.ID];
  }

  removeEntity(entityID: string) {
    delete this.entities[entityID];
  }

  update(dt: number) {
    for (let id in this.entities)
      this.updateEntity(this.entities[id], dt);
  }

  updateEntity(entity: IEntity, dt: number) {
    //nothing
  }

  destroy() {
    //nothing
  }
}