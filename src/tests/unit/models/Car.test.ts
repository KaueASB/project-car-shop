import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Model } from 'mongoose';
import CarsModel from '../../../models/Cars';
import { carMock, carMockWithId } from '../../mocks/Cars';

describe('Test model Cars', () => {
  const carModel = new CarsModel()

  beforeEach(async () => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);

      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.eq(carMockWithId)
    });
    
  })

});