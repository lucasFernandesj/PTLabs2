/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';


export const solveLab = async (labName) => {
    console.log('lab solved');

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/Users/solveLab`,
            { Name: labName },
            {
                withCredentials: true
            });

        if (response.status !== 200) {
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


export const checkLogin = async (navigate, setIsLoading) => {
    console.log("Check login function");
    setIsLoading(true); // Set loading to true before making the request
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/Users`, {
            withCredentials: true
        });
        setIsLoading(false); // Set loading to false after the request completes
        return response.data; // Return data if needed
    } catch (error) {
        console.error("Error on checkLogin function ", error);
        if (error.response && error.response.status === 401) {
            navigate('/login');
        }
        setIsLoading(false); // Set loading to false even if there's an error
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
};


export async function checkLab(setLabIsCompleted) {
    console.log("CheckLab function");
    const fileName = window.location.pathname.split('/').pop(); // Extract the file name from the URL
    const labName = fileName.replace(/\.jsx$/, ''); // Remove the .jsx extension

    try {
        const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_APP_BACKEND}/Users/checkLab`,
            data: {
                Name: labName
            },
            withCredentials: true
        });

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        const data = response.data;
        if (data) {
            if (data === "LabIsCompleted") {
                setLabIsCompleted("Congratulations, you solved the lab!")
                console.log("This lab has been solved");
            } else {
                console.log("This lab has NOT been solved");
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
        
    
