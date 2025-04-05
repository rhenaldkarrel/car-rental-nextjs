import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function toRupiah(number) {
	const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
	const price = `Rp. ${formattedNumber}`;

	return price;
}
