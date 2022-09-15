import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  protected _motorcycleService: IService<IMotorcycle>;
  constructor(service: IService<IMotorcycle>) {
    this._motorcycleService = service;
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const getAll = await this._motorcycleService.read();
    return res.status(200).json(getAll);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const getOne = await this._motorcycleService.readOne(req.params.id);
    return res.status(200).json(getOne);
  }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const created = await this._motorcycleService.create(req.body);
    return res.status(201).json(created);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await this._motorcycleService.update(id, req.body);
    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._motorcycleService.delete(id);
    return res.sendStatus(204);
  }
}