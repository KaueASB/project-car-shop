import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = VehicleZodSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),  
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number positive and integer',
  }).positive().int()
    .lte(2500, { message: 'engineCapacity must be less than or equal to 2500' }),
}));

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
