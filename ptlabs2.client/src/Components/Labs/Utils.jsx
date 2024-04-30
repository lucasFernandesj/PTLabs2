import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
};

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

export const checkLab = async (setLabIsCompleted) => {
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
};

export const useNavigation = () => {
    const navigate = useNavigate();
    return navigate;
};

export const useLabCompletion = () => {
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [isLoading, setIsLoading] = useState(true);
    return { labIsCompleted, setLabIsCompleted, isLoading, setIsLoading };
};

export const useModal = () => {
    const [modal1hidden, setModal1Hidden] = useState(true);
    const [modal2hidden, setModal2Hidden] = useState(true);
    const [modal3hidden, setModal3Hidden] = useState(true);
    const [modal4hidden, setModal4Hidden] = useState(true);
    const [modal5hidden, setModal5Hidden] = useState(true);
    const [modalSummaryHidden, setModalSummaryHidden] = useState(true);

    const showTaskModal = (event) => {
        switch (event.target.id) {
            case "showTask1ModalBtn":
                setModal1Hidden(false);
                break;
            case "showTask2ModalBtn":
                setModal2Hidden(false);
                break;
            case "showTask3ModalBtn":
                setModal3Hidden(false);
                break;
            case "summary":
                setModalSummaryHidden(false);
                break;
            case "showTask4ModalBtn":
                setModal4Hidden(false);
                break;
            case "showTask5ModalBtn":
                setModal5Hidden(false);
                break;
            default:
                // Handle other cases if necessary
                break;
        }
    };

    const hideModal = (event) => {
        switch (event.target.id) {
            case "hideModal1Btn":
                setModal1Hidden(true);
                break;
            case "hideModal2Btn":
                setModal2Hidden(true);
                break;
            case "hideModal3Btn":
                setModal3Hidden(true);
                break;
            case "summary":
                setModalSummaryHidden(true);
                break;
            case "hideModal4Btn":
                setModal4Hidden(true);
                break;
            case "hideModal5Btn":
                setModal5Hidden(true);
                break;
            default:
                // Handle other cases if necessary
                break;
        }
    };

    return { modal1hidden, modal2hidden, modal3hidden, modal4hidden,modal5hidden,showTaskModal, hideModal, modalSummaryHidden };
};

export const useUserAuthentication = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    return { username, setUsername, password, setPassword, userIsLoggedIn, setUserIsLoggedIn };
};
