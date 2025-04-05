import axios from 'axios';

const BASE_URL =
	'https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders';

export const Orders = () => {
	const getOrders = async () => {
		try {
			const response = await axios.get(BASE_URL);

			if (response.status !== 200) {
				throw new Error('Error Getting Orders Data!');
			}

			return response.data;
		} catch (err) {
			Promise.reject(err);
		}
	};

	const createOrder = async (payload) => {
		try {
			const response = await axios.post(BASE_URL, payload);

			if (response.status !== 201) {
				throw new Error('Error Creating Order!');
			}

			return response;
		} catch (err) {
			Promise.reject(err);
		}
	};

	const updateOrder = async (id, payload) => {
		try {
			const response = await axios.put(`${BASE_URL}/${id}`, payload);

			if (response.status !== 200) {
				throw new Error('Error Updating Order!');
			}

			return response;
		} catch (err) {
			Promise.reject(err);
		}
	};

	const deleteOrder = async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/${id}`);

			if (response.status !== 200) {
				throw new Error('Error Deleting Order!');
			}

			return response;
		} catch (err) {
			Promise.reject(err);
		}
	};

	return {
		getOrders,
		createOrder,
		deleteOrder,
		updateOrder,
	};
};
