import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/TypeErrors';
import { ICar } from '../../../interfaces/ICar';

import CarsModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import { carMock, carMockWithId } from '../../mocks/Cars';

describe('Test Service Cars', () => {
  const carModel = new CarsModel()
  const carService = new CarService(carModel)

  beforeEach(async () => {
    sinon.restore();
  });
  

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.eq(carMockWithId)
    });

    it('Failure created', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);

      let err: any;

      try {
        await carService.create({});
        
      } catch (error) {
        err = error
      }

      expect(err).to.be.instanceOf(ZodError)
    });
  })
  
});