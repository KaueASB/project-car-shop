import { Router } from 'express';

import Cars from '../models/Cars';
import CarService from '../services/Cars';
import CarController from '../controllers/Car';

const carModel = new Cars();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const route = Router();

route.post('/', (req, res) => carController.create(req, res));

export default route;