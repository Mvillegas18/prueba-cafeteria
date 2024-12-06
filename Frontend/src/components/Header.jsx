import { useState } from 'react';

import { ProductView } from './ProductView';
import { SaleView } from './SaleView';

export const Header = () => {
	const [isProductView, setIsProductView] = useState(true);

	return (
		<div className='min-h-screen bg-gray-100 p-4'>
			<header className='flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg'>
				<h1 className='text-xl font-bold'>Gestion de inventario: Cafeteria</h1>
				<div>
					<button
						className='mr-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition duration-300'
						onClick={() => setIsProductView(true)}>
						Productos
					</button>
					<button
						className='px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 hover:shadow-lg transition duration-300'
						onClick={() => setIsProductView(() => false)}>
						Ventas
					</button>
				</div>
			</header>

			{isProductView ? <ProductView /> : <SaleView />}
		</div>
	);
};
