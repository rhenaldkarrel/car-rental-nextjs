import axios from 'axios';

const BASE_URL =
	'https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/';

export const Cars = () => {
	const getCars = async () => {
		try {
			const response = await axios.get(BASE_URL);

			if (response.status !== 200) {
				throw new Error('Error Getting Cars Data!');
			}

			return response.data;
		} catch (err) {
			Promise.reject(err);
		}
	};

	return {
		getCars,
	};
};
