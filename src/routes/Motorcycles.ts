import { Router } from 'express';

import Motorcycle from '../models/Motorcycles';
import MotorcycleService from '../services/Motorcycles';
import MotorcycleController from '../controllers/Motorcycles';

const motorcycleModel = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const route = Router();

route.route('/:id')
  .get((req, res) => motorcycleController.readOne(req, res))
  .put((req, res) => motorcycleController.update(req, res))
  .delete((req, res) => motorcycleController.delete(req, res));

route.route('/')
  .get((req, res) => motorcycleController.read(req, res))
  .post((req, res) => motorcycleController.create(req, res));

export default route;