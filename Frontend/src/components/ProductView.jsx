import { useEffect, useState } from 'react';

export const ProductView = () => {
	const [productList, setProductList] = useState([]);

	const getProducts = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/products');
			const data = await response.json();

			setProductList(data);
		} catch (error) {
			console.log('Error: ', error.message);
		}
	};

	const postProduct = async () => {};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className='mt-4'>
			<h2 className='text-lg font-semibold mb-4'>Lista de Productos</h2>
			<table className='table-auto w-full bg-white shadow-md rounded-lg'>
				<thead className='bg-gray-200'>
					<tr>
						<th className='px-4 py-2'>ID</th>
						<th className='px-4 py-2'>Nombre</th>
						<th className='px-4 py-2'>Precio</th>
						<th className='px-4 py-2'>Stock</th>
						<th className='px-4 py-2'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{productList.map((product) => (
						<tr key={product.id}>
							<td className='border px-4 py-2'>{product.id}</td>
							<td className='border px-4 py-2'>{product.nombre}</td>
							<td className='border px-4 py-2'>{product.precio}</td>
							<td className='border px-4 py-2'>{product.stock}</td>
							<td className='border px-4 py-2'>
								<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'>
									Editar
								</button>
								<button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
