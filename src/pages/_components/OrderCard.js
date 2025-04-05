import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toRupiah } from '@/lib/utils';
import { SkeletonCard } from './SkeletonCard';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Orders } from '@/services/orders';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { RentForm } from './RentForm';

export default function OrderCard({
	car_id,
	order_date,
	pickup_date,
	dropoff_date,
	pickup_location,
	dropoff_location,
	id,
	name,
	image,
	month_rate,
	day_rate,
}) {
	const { deleteOrder } = Orders();

	const onDelete = async () => {
		try {
			const response = await deleteOrder(id);

			if (response.status === 200) {
				toast('Success to delete order', {
					onAutoClose: () => location.reload(),
				});
			}
		} catch (err) {
			toast('Error Deleting Order!');
		}
	};

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
						<h3 className='text-lg'>{name ?? '-'}</h3>
					</div>
					<p className='text-lg font-semibold'>{toRupiah(month_rate)}/month</p>
					<p className='text-lg font-semibold'>{toRupiah(day_rate)}/day</p>
				</div>
				<div className='space-y-4'>
					<p>Order Date : {order_date}</p>
					<div>
						<p>Pickup Date : {pickup_date}</p>
						<p>Pickup Location : {pickup_location}</p>
					</div>
					<div>
						<p>Dropoff Date : {dropoff_date}</p>
						<p>Dropoff Location : {dropoff_location}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex gap-2'>
					<Dialog>
						<DialogTrigger asChild className='justify-center'>
							<Button>Edit</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Rent {name} </DialogTitle>
							</DialogHeader>
							<RentForm
								isEdit
								car_id={car_id}
								name={name}
								day_rate={day_rate}
								month_rate={month_rate}
								id={id}
								image={image}
								pickup_date={pickup_date}
								dropoff_date={dropoff_date}
								pickup_location={pickup_location}
								dropoff_location={dropoff_location}
							/>
						</DialogContent>
					</Dialog>
					<AlertDialog>
						<AlertDialogTrigger>
							<Button variant='destructive'>Delete</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your order.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardFooter>
		</Card>
	);
}
