import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import { Cars } from '@/services/cars';
import ProductCard from './_components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Orders } from '@/services/orders';
import OrderCard from './_components/OrderCard';
import { toast } from 'sonner';

export default function Home() {
	const { getCars } = Cars();
	const { getOrders } = Orders();

	const [cars, setCars] = React.useState([]);
	const [orders, setOrders] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				const cars = await getCars();
				setCars(cars);
			} catch (err) {
				toast(err?.message || 'Error occurs.');
			}
		})();
	}, []);

	React.useEffect(() => {
		(async () => {
			try {
				const orders = await getOrders();
				setOrders(orders);
			} catch (err) {
				toast(err?.message || 'Error occurs.');
			}
		})();
	}, []);

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<header>
					<h1 className='text-3xl text-center font-semibold'>Car Rental</h1>
				</header>
				<nav className='w-full'>
					<Tabs defaultValue='cars' className='w-full'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='cars'>Cars</TabsTrigger>
							<TabsTrigger value='orders'>Orders</TabsTrigger>
						</TabsList>
						<TabsContent value='cars'>
							<section>
								<ul className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols gap-4'>
									{cars.map((i) => (
										<li key={i.id}>
											<ProductCard car_id={i.id} {...i} />
										</li>
									))}
								</ul>
							</section>
						</TabsContent>
						<TabsContent value='orders'>
							<section>
								<ul className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols gap-4'>
									{orders.map((i) => (
										<li key={i.id}>
											<OrderCard {...i} />
										</li>
									))}
								</ul>
							</section>
						</TabsContent>
					</Tabs>
				</nav>
			</main>
		</div>
	);
}
