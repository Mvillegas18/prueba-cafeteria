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

	if (product === undefined) {
		res.status(404).json({ message: 'Producto no encontrado' });
	}

	res.json(product);
});

// POST /api/products

route.post('/products', (req, res) => {
	const { nombre, referencia, precio, peso, categoria, stock, fechaCreacion } =
		req.body;

	if (
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
		id: products.length + 1,
		nombre,
		referencia,
		precio,
		peso,
		categoria,
		stock,
		fechaCreacion: new Date().toISOString(),
	};

	products.push(newProduct);

	res.status(201).json(newProduct);
});

// PUT /api/products/:id

route.put('/products/:id', (req, res) => {
	const { id } = req.params;

	const { nombre, referencia, precio, peso, categoria, stock } = req.body;

	const productToUpdate = products.findIndex(
		(product) => product.id === Number(id)
	);

	if (productToUpdate === -1) {
		return res.status(404).json({ message: 'Producto no encontrado' });
	}

	const updatedProduct = {
		...products[productToUpdate],
		...(nombre && { nombre }),
		...(referencia && { referencia }),
		...(precio && { precio }),
		...(peso && { peso }),
		...(categoria && { categoria }),
		...(stock && { stock }),
	};

	products[productToUpdate] = updatedProduct;

	res.status(200).json(updatedProduct);
});

// DELETE /api/products/:id

route.delete('/products/:id', (req, res) => {
	const { id } = req.params;

	const productToEliminated = products.findIndex(
		(product) => product.id === Number(id)
	);

	if (productToEliminated === -1) {
		res.status(400).json({ message: 'El producto no existe' });
	} else {
		products.splice(productToEliminated, 1);
		res.status(200).json({ message: 'Producto eliminado' });
	}
});
