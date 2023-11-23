import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './modules/users.route';
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
// app.get('/', (req: Request, res: Response) => {
//   res.send(`Hello World! `);
// });

export default app;
