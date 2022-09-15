import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/TypeErrors';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async read(): Promise<T[]> {
    const getAll = this._model.find();
    return getAll;
  }
  
  public async readOne(id:string):Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const getOne = this._model.findOne({ _id: id });
    return getOne;
  }
  
  public async create(obj:T):Promise<T> {
    const created = this._model.create({ ...obj });
    return created;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);

    const updated = await this._model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    
    return updated as T;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);

    const deleted = await this._model.findByIdAndUpdate({ _id: id });

    return deleted as T;
  }
}

export default MongoModel;