import express from 'express';
import { products } from './datos.js';

export const route = express.Router();

// GET /api/products

route.get('/products', (req, res) => {
	try {
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// GET por id/api/products/:id

route.get('/products/:id', (req, res) => {
	const { id } = req.params;
	const product = products.find((product) => product.id === Number(id));

	res.json(product);
});

// POST /api/products

route.post('/products', (req, res) => {
	const {
		id,
		nombre,
		referencia,
		precio,
		peso,
		categoria,
		stock,
		fechaCreacion,
	} = req.body;

	if (
		!id ||
		!nombre ||
		!referencia ||
		!precio ||
		!peso ||
		!categoria ||
		!stock ||
		!fechaCreacion
	) {
		return res
			.status(400)
			.json({ message: 'Todos los campos son obligatorios' });
	}

	const newProduct = {
		id,
		nombre,
		referencia,
		precio,
		peso,
		categoria,
		stock,
		fechaCreacion,
	};

	products.push(newProduct);

	res.status(201).json(newProduct);
});

// PUT /api/products/:id

route.put('/products', (req, res) => {
	res.status(200).json('Producto creado con exito!!');
});
