import { Router } from 'express';

import Cars from '../models/Cars';
import CarService from '../services/Cars';
import CarController from '../controllers/Car';

const carModel = new Cars();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const route = Router();

route.route('/:id')
  .get((req, res) => carController.readOne(req, res))
  .put((req, res) => carController.update(req, res))
  .delete((req, res) => carController.delete(req, res));

route.route('/')
  .get((req, res) => carController.read(req, res))
  .post((req, res) => carController.create(req, res));

export default route;