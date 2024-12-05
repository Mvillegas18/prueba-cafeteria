import { Router } from 'express';
import { products } from './datos.js';
import { sales } from './sales.js';

export const routeSales = Router();

routeSales.get('/', (req, res) => {
	return res.json(sales);
});

routeSales.get('/:id', (req, res) => {
	const { id } = req.params;

	const saleFound = sales.find((sale) => sale.id === Number(id));

	if (!saleFound) {
		return res.status(404).json({ message: 'Venta no encontrada' });
	}

	return res.status(200).json(saleFound);
});

routeSales.post('/', (req, res) => {
	const { id, amount } = req.body;

	if (!id || !amount || amount < 1) {
		return res.status(400).json({
			message:
				'ID y cantidad son obligatorios, y la cantidad debe ser mayor a 0',
		});
	}

	const productFound = products.find((product) => product.id === Number(id));

	if (!productFound) {
		return res.status(404).json({ message: 'Producto no encontrado' });
	}

	if (productFound.stock < amount) {
		return res
			.status(400)
			.json({ message: 'Stock insuficiente para realizar la venta' });
	}

	productFound.stock -= amount;

	const venta = {
		id: sales.length + 1,
		idProduct: productFound.id,
		amount,
		fecha: new Date().toISOString(),
	};

	sales.push(venta);

	return res.status(201).json({ message: 'Venta realizada con exito', venta });
});
