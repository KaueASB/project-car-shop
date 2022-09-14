import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'model/brand is required',
    invalid_type_error: 'model/brand must be a string',
  }).min(3, { message: 'model/brand must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).gte(1900, { message: 'Year must be greater than or equal to 1900' })
    .lte(2022, { message: 'Year must be lesss than or equal to 2022' }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean().optional(),
  buyValue: z.number().int().positive(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;
