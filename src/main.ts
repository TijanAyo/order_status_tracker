import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { environment } from './config';
import { ErrorMessage } from './helpers';
import { orderRoute } from './routes';

const app: Express = express();
const PORT = Number(environment.PORT) || 8080;

// Middleware
app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/', orderRoute);

// Ping Route
app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    data: null,
    message: 'Order Status Tracker',
    success: true,
  });
});

// 404 Route Handler (for all undefined routes)
app.all('*', (_req: Request, res: Response) => {
  return res.status(404).json({
    error: ErrorMessage.NOT_FOUND,
    message: 'Route does not exist, check provided endpoint and try again',
    success: false,
  });
});

// Start Server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error(`Failed to start server:`, e.message, e.stack);
    process.exit(1);
  }
};

startServer();

export default app;
