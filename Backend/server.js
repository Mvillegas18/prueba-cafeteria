import cors from 'cors';
import express from 'express';
import { route } from './app.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', route);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
	console.log(`Servidor en: http://localhost:${PORT}`);
});
