import z from 'zod';
import { IdSchema } from './id';

export const CompanySchema = z.object({
    _id: IdSchema.optional(),
    name: z.string().min(2).max(100),
    site: z.string().min(2).max(100),
    size: z.string().min(2).max(50),
    country: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
})