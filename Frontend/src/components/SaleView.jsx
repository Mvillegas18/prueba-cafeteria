import { useEffect, useState } from 'react';

export const SaleView = () => {
	const [saleList, setSaleList] = useState([]);

	const getSale = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/sales/');

			if (!response.ok) {
				throw new Error('Repuesta invalida');
			}
			const data = await response.json();

			setSaleList(data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getSale();
	}, []);

	return (
		<>
			<div className='mt-4'>
				<div>
					<h2 className='text-lg font-semibold mb-4'>Productos disponibles</h2>
				</div>
				<table className='table-auto w-full bg-white shadow-md rounded-lg'>
					<thead className='bg-gray-200'>
						<tr>
							<th className='px-4 py-2'>ID</th>
							<th className='px-4 py-2'>IdProducto</th>
							<th className='px-4 py-2'>Precio</th>
							<th className='px-4 py-2'>Fecha</th>
						</tr>
					</thead>
					<tbody>
						{saleList.map((sale) => (
							<tr key={sale.id}>
								<td className='border px-4 py-2'>{sale.id}</td>
								<td className='border px-4 py-2'>{sale.idProduct}</td>
								<td className='border px-4 py-2'>{sale.amount}</td>
								<td className='border px-4 py-2'>{sale.fecha}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
