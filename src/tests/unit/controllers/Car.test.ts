import { Request, Response } from 'express';

import chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import CarsModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import CarController from '../../../controllers/Car';
import { carMock, carMockUpdated, carMockWithId, listCarsMockWithId } from '../../mocks/Cars';

describe('Test Controller Cars', () => {
  const carModel = new CarsModel()
  const carService = new CarService(carModel)
  const carController = new CarController(carService)

  const req = {} as Request
  const res = {} as Response

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
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

  describe('Read all cars', () => {
    it('successfully list cars', async () => {
      sinon.stub(carService, 'read').resolves(listCarsMockWithId);
      
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(listCarsMockWithId)).to.be.true;
    })
  })

  describe('ReadOne car by ID', () => {
    it('successfully return a car', async () => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);
      
      req.params = { id: carMockWithId._id }
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('Update a car by ID', () => {
    it('successfully update a car', async () => {
      sinon.stub(carService, 'update').resolves(carMockUpdated);

      req.params = { id: carMockWithId._id };
      req.body = carMock;
      
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockUpdated)).to.be.true;
    })
  })

  describe('Delete a car by ID', () => {
    it('successfully delete a car', async () => {
      sinon.stub(carService, 'delete').resolves(listCarsMockWithId[0]);

      req.params = { id: listCarsMockWithId[0]._id };
      
      await carController.delete(req, res);

      const statusStub = res.sendStatus as sinon.SinonStub

      expect(statusStub.calledWith(204)).to.be.true;
    })
  })
});