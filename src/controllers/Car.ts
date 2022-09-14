import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  protected _carService: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._carService = service;
  }

  // public async read(_req: Request, res: Response<ICar[]>) {
  //   const getAll = await this._carService.read();
  //   return res.status(200).json(getAll);
  // }

  // public async readOne(req: Request, res: Response<ICar | null>) {
  //   const getOne = await this._carService.readOne(req.params.id);
  //   return res.status(201).json(getOne);
  // }

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._carService.create(req.body);
    return res.status(201).json(created);
  }

  // public async update(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const updated = await this._carService.update(id, req.body);
  //   return res.status(201).json(updated);
  // }

  // public async delete(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const deleted = await this._carService.delete(id);
  //   return res.status(201).json(deleted);
  // }
}