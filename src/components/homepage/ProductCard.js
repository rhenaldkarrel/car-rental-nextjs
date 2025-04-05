import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toRupiah } from '@/lib/utils';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { RentForm } from './RentForm';

export default function ProductCard({
	day_rate,
	car_id,
	image,
	month_rate,
	name,
}) {
	return (
		<Card className='w-[300px] group relative space-y-4 overflow-hidden'>
			<figure className='group-hover:opacity-90'>
				<img
					className='aspect-square w-full object-cover'
					src={image}
					width={300}
					height={500}
					alt={name}
				/>
			</figure>
			<CardContent className='px-4 py-0'>
				<div className='flex flex-col'>
					<div>
						<h3 className='text-lg'>{name}</h3>
					</div>
					<p className='text-lg font-semibold'>{toRupiah(month_rate)}/month</p>
					<p className='text-lg font-semibold'>{toRupiah(day_rate)}/day</p>
				</div>
			</CardContent>
			<Dialog>
				<DialogTrigger asChild className='justify-center'>
					<CardFooter className='p-0 border-t cursor-pointer'>
						<PlusIcon className='size-4 me-1' /> Reserve
					</CardFooter>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rent {name} </DialogTitle>
					</DialogHeader>
					<RentForm
						name={name}
						day_rate={day_rate}
						month_rate={month_rate}
						car_id={car_id}
						image={image}
					/>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
