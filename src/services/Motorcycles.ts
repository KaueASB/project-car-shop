import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

import { ErrorTypes } from '../errors/TypeErrors';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;
  
  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async read(): Promise<IMotorcycle[]> {
    const getAll = await this._motorcycle.read();
    return getAll;
  }

  public async readOne(id:string):Promise<IMotorcycle> {
    const getOne = await this._motorcycle.readOne(id);
    if (!getOne) throw new Error(ErrorTypes.NotFound);
    return getOne;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
  
    const motorcyclesCreated = this._motorcycle.create(parsed.data);
    return motorcyclesCreated;
  }

  public async update(id: string, obj: unknown): Promise<IMotorcycle | null> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const motorcyclesUpdated = await this._motorcycle.update(id, parsed.data);
    if (!motorcyclesUpdated) throw new Error(ErrorTypes.NotFound);

    return motorcyclesUpdated;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const motorcyclesDeleted = await this._motorcycle.delete(id);
    if (!motorcyclesDeleted) throw new Error(ErrorTypes.NotFound);
  
    return motorcyclesDeleted;
  }
}
