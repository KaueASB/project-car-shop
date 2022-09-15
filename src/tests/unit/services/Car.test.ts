import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/TypeErrors';
import { ICar } from '../../../interfaces/ICar';

import CarsModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import { carMock, carMockUpdated, carMockWithId, listCarsMockWithId } from '../../mocks/Cars';

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

  describe('List all cars', () => {
    it('successfully list cars', async () => {
      sinon.stub(carModel, 'read').resolves(listCarsMockWithId);

      const listCars = await carService.read()
      expect(listCars).to.be.deep.eq(listCarsMockWithId)
      expect(listCars).to.be.an('array')
    }); 
    
    it('should list an empty array if there are no cars', async () => {
      sinon.stub(carModel, 'read').resolves([]);

      const listCars = await carService.read()
      expect(listCars).to.be.length(0)
      expect(listCars).to.be.an('array')
    });
  })

  describe('List a car', () => {
    it('successfully list one car', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);

      const getOne = await carService.readOne('62cf1fc6498565d94eba52cd')
      expect(getOne).to.be.deep.eq(carMockWithId)
      expect(getOne).to.be.haveOwnProperty('_id')
      expect(getOne).to.be.an('object')
    }); 

    it('should fail if car not found', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);
      let error: any;

      try {
        await carService.readOne(carMockWithId._id);
      } catch (errCatch: any) {
        error = errCatch;
      }

      expect(error.message).to.be.eq(ErrorTypes.NotFound);
    });
  })

  describe('Update a car', () => {
    it('successfully update one car', async () => {
      sinon.stub(carModel, 'update').resolves(carMockUpdated);

      const getOne = await carService.update(carMockWithId._id, carMock)
      expect(getOne).to.be.deep.eq(carMockUpdated)
      expect(getOne).to.be.haveOwnProperty('_id')
      expect(getOne).to.be.an('object')
    }); 

    it('should fail if the body is not sent correctly', async () => {
      sinon.stub(carModel, 'update').resolves(carMockUpdated);

      const { model, ...rest  } = carMock
      let error: any;

      try {
        await carService.update(carMockWithId._id, rest);
      } catch (errCatch: any) {
        error = errCatch;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('should fail if the ID is not valid', async () => {
      sinon.stub(carModel, 'update').resolves(null);

      let error: any;

      try {
        await carService.update('1561618dsadf', carMock);
      } catch (errCatch: any) {
        error = errCatch;
      }

      expect(error.message).to.be.eq(ErrorTypes.NotFound);
    });
  })

  describe('Delete a car', () => {
    it('successfully delete one car', async () => {
      sinon.stub(carModel, 'delete').resolves(listCarsMockWithId[0]);
      const idDeleted = listCarsMockWithId[0]._id;

      const carDeleted = await carService.delete(idDeleted)
      const filtered = listCarsMockWithId.filter((item) => item._id !== idDeleted)
      const verify = filtered.some((item) => item._id === idDeleted)

      expect(carDeleted).to.be.deep.eq(carMockWithId)
      expect(verify).to.be.false
    });

    it('should fail if ID not found', async () => {
      sinon.stub(carModel, 'delete').resolves(null);
      const idDeleted = listCarsMockWithId[0]._id;

      let error: any;

      try {
        await carService.delete(idDeleted);
      } catch (errCatch: any) {
        error = errCatch;
      }

      expect(error.message).to.be.eq(ErrorTypes.NotFound);
    });
  })
});