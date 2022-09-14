import { Request, Response } from 'express';

import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/TypeErrors';
import { ICar } from '../../../interfaces/ICar';

import CarsModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import CarController from '../../../controllers/Car';
import { carMock, carMockWithId } from '../../mocks/Cars';

describe('Test Controller Cars', () => {
  const carModel = new CarsModel()
  const carService = new CarService(carModel)
  const carController = new CarController(carService)

  const req = {} as Request
  const res = {} as Response

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  
  afterEach(() => {
    sinon.restore();
  })
  

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(carService, 'create').resolves(carMockWithId);

      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  })
});