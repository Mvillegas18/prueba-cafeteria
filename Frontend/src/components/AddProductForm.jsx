import { useState } from 'react';

const defaultProduct = {
	name: '',
	price: 0,
	stock: 0,
};

export const AddProductForm = () => {
	const [newProduct, setNewProduct] = useState(defaultProduct);

	// Setear los valores en el estado
	const handleChange = (e) => {
		const { name, value } = e.target;

		setNewProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newProduct.name || newProduct.price <= 0 || newProduct.stock <= 0) {
			alert('Completa los campos correctamente');
		}

		try {
			const response = await fetch('http://localhost:3000/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newProduct),
			});

			if (!response.ok) {
				throw new Error('Error al crear el producto');
			}

			setNewProduct(defaultProduct);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='max-w-md mx-auto p-4 border rounded-md shadow-md'>
			<h2 className='text-xl font-semibold mb-4'>Agregar Producto</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'>
						Nombre del Producto
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={handleChange}
						className='w-full p-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='price'
						className='block text-sm font-medium text-gray-700'>
						Precio
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={handleChange}
						className='w-full p-2 border border-gray-300 rounded-md'
						required
						min='0'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='stock'
						className='block text-sm font-medium text-gray-700'>
						Stock
					</label>
					<input
						type='number'
						id='stock'
						name='stock'
						value={newProduct.stock}
						onChange={handleChange}
						className='w-full p-2 border border-gray-300 rounded-md'
						required
						min='1'
					/>
				</div>

				<button
					type='submit'
					className='w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700'>
					Crear Producto
				</button>
			</form>
		</div>
	);
};
