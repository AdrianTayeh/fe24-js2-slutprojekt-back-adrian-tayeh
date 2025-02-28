import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});