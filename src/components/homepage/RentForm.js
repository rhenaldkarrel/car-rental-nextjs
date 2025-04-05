import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn, toRupiah } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Orders } from '@/services/orders';

const formSchema = z.object({
	image: z.string(),
	name: z.string(),
	car_id: z.string(),
	order_date: z.string(),
	pickup_date: z.string(),
	pickup_location: z.string().min(1, { message: 'Invalid input' }),
	dropoff_date: z.string(),
	dropoff_location: z.string().min(1, { message: 'Invalid input' }),
	day_rate: z.string(),
	month_rate: z.string(),
});

export function RentForm({
	isEdit = false,
	day_rate,
	id,
	car_id,
	image,
	month_rate,
	name,
	pickup_date,
	dropoff_date,
	pickup_location,
	dropoff_location,
}) {
	const { createOrder, updateOrder } = Orders();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name,
			image,
			car_id,
			order_date: format(new Date(), 'P'),
			pickup_date,
			dropoff_date,
			pickup_location,
			dropoff_location,
			month_rate,
			day_rate,
		},
	});

	const selectedPickupDate = form.watch('pickup_date');
	const selectedDropoffDate = form.watch('dropoff_date');

	const onSubmit = async (values) => {
		try {
			const response = isEdit
				? await updateOrder(id, values)
				: await createOrder(values);

			if ([200, 201].includes(response.status)) {
				toast('Success to create/update order!', {
					onAutoClose: () => location.reload(),
				});
			}
		} catch (err) {
			toast('Failed to create order!');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				{/* Pickup */}
				<div className='flex gap-2 items-start'>
					<FormField
						control={form.control}
						name='pickup_date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Pickup Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? field.value : <span>Pick a date</span>}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={(date) => field.onChange(format(date, 'P'))}
											disabled={(date) =>
												date < new Date('1900-01-01') || selectedDropoffDate
													? date > selectedDropoffDate
													: false
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='pickup_location'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Pickup Location</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter pickup location...'
										className='block'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Dropoff */}
				<div className='flex gap-2 items-start'>
					<FormField
						control={form.control}
						name='dropoff_date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Dropoff Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? field.value : <span>Pick a date</span>}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={(date) => field.onChange(format(date, 'P'))}
											disabled={(date) =>
												date < new Date('1900-01-01') ||
												date < selectedPickupDate
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dropoff_location'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Dropoff Location</FormLabel>
								<FormControl>
									<Input placeholder='Enter dropoff location...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type='submit'>{isEdit ? 'Update' : 'Submit'}</Button>
			</form>
		</Form>
	);
}
