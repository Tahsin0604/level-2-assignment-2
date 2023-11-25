import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './modules/users.route';
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.get('/', (req: Request, res: Response) => {
  res.send(`use -> /api/users`);
});

export default app;
