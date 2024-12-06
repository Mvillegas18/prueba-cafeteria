import cors from 'cors';
import express from 'express';

import { route } from './appProducts.js';
import { routeSales } from './appSales.js';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: 'GET,POST,PUT,DELETE',
		allowedHeaders: 'Content-Type,Authorization',
	})
);

app.use('/api/products', route);
app.use('/api/sales', routeSales);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
	console.log(`Servidor en: http://localhost:${PORT}`);
});
