import { z } from 'zod';

const orderSchema = z.object({
  id: z.string(),
  customer_name: z.string(),
  status: z.enum(['Pending', 'Cancelled', 'Completed']),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const metadataSchema = z.object({
  currentPage: z.number().int(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const getOrderListSchema = z.object({
  data: z.object({
    orders: z.array(orderSchema),
    metadata: metadataSchema,
  }),
  message: z.string(),
  success: z.boolean(),
});
