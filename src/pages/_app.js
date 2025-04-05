import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { Fragment } from 'react';

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Component {...pageProps} />
			<Toaster />
		</Fragment>
	);
}
