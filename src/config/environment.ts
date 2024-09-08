import * as dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const environmentSchema = z.object({
  APP_NAME: z.string(),
  NODE_ENV: z.string(),
  PORT: z.string(),
});

export const environment = environmentSchema.parse(process.env);
