import { model as mongooseModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotorcyclesMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

// https://stackoverflow.com/questions/13699784/mongoose-v-property-hide => versionKey

export default class Motorcycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseModel('Motorcycles', MotorcyclesMongooseSchema)) {
    super(model);
  }
}
