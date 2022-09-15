import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Model } from 'mongoose';
import CarsModel from '../../../models/Cars';
import { carMock, carMockWithId, listCarsMockWithId } from '../../mocks/Cars';
import { ErrorTypes } from '../../../errors/TypeErrors';

describe('Test model Cars', () => {
  const carModel = new CarsModel()

  beforeEach(async () => {
    sinon.restore()
  });

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);

      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.eq(carMockWithId)
    });    
  })

  describe('should list all cars', () => {
    it('successfully list cars', async () => {
      sinon.stub(Model, 'find').resolves(listCarsMockWithId);

      const listCars = await carModel.read()
      expect(listCars).to.be.deep.eq(listCarsMockWithId)
      expect(listCars).to.be.an('array')
    }); 
    
    it('should list an empty array if there are no cars', async () => {
      sinon.stub(Model, 'find').resolves([]);

      const listCars = await carModel.read()
      expect(listCars).to.be.length(0)
      expect(listCars).to.be.an('array')
    });
  })

  describe('should list one car', () => {
    it('successfully list one car', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);

      const getOne = await carModel.readOne('62cf1fc6498565d94eba52cd')
      expect(getOne).to.be.deep.eq(carMockWithId)
      expect(getOne).to.be.haveOwnProperty('_id')
      expect(getOne).to.be.an('object')
    }); 
    
    it('should fail if id is invalid', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
      let error: any;

      try {
        await carModel.readOne('invalidIdsnfkjd123');
      } catch (errCatch: any) {
        error = errCatch;
      }

      expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
    });
  })
  
});