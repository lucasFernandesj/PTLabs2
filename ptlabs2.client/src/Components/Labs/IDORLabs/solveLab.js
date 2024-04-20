import axios from 'axios';

export const solveLab = async (labName) => {
    console.log('lab solved');

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/Users/solveLab`,
            { Name: labName },
            {
                withCredentials: true
            });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation: ' + error.message);
    }
}