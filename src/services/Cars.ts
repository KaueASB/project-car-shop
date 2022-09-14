import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

import { ErrorTypes } from '../errors/TypeErrors';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(id:string):Promise<ICar> {
    const car = await this._car.readOne(id);
    if (!car) throw new Error(ErrorTypes.NotFound);
    return car;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
  
    const carCreated = this._car.create(parsed.data);
    return carCreated;
  }

  public async update(id: string, obj: unknown): Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    
    const carUpdated = this._car.update(id, parsed.data);
    if (!carUpdated) throw new Error(ErrorTypes.NotFound);

    return carUpdated;
  }

  public async delete(id: string): Promise<ICar | null> {
    const carDeleted = this._car.delete(id);
    if (!carDeleted) throw new Error(ErrorTypes.NotFound);
  
    return carDeleted;
  }
}
