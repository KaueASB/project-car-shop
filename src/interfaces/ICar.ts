import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const carZodSchema = VehicleZodSchema.merge(z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2, { message: 'doorsQty must be greater than or equal to 2' })
    .lte(4, { message: 'doorsQty must be lesss than or equal to 4' }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2, { message: 'seatsQty must be greater than or equal to 2' })
    .lte(7, { message: 'seatsQty must be lesss than or equal to 7' }),
}));

export type ICar = z.infer<typeof carZodSchema>;
