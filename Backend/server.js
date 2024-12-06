import express from 'express';
import { route } from './appProducts.js';
import { routeSales } from './appSales.js';

const app = express();

app.use(express.json());

app.use('/api/products', route);
app.use('/api/sales', routeSales);

const PORT = process.env.PORT ?? 5173;
app.listen(PORT, () => {
	console.log(`Servidor en: http://localhost:${PORT}`);
});
