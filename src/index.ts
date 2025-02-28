import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import membersRouter from './routes/membersRouter.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', tasksRouter);
app.use('/', membersRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});