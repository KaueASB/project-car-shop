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
}, { versionKey: false });

// https://stackoverflow.com/questions/13699784/mongoose-v-property-hide => versionKey

export default class Cars extends MongoModel<ICar> {
  constructor(model = mongooseModel('Cars', CarsMongooseSchema)) {
    super(model);
  }
}
