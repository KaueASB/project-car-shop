import { model as mongooseModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const CarsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class Cars extends MongoModel<ICar> {
  constructor(model = mongooseModel('Cars', CarsMongooseSchema)) {
    super(model);
  }
}
