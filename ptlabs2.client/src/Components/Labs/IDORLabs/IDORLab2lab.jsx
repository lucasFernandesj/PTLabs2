/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { solveLab } from './solveLab';


const IDORLab2lab = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [email, setEmail] = useState('Avi@vulnerable.com')
    const [isLoading, setIsLoading] = useState(true);
    const [hintIsOpen, setHintIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            console.log("Check log in function  IDORLab1.jsx");
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/Users`, {
                    withCredentials: true
                });
            }
            catch (error) {
                console.error("Error on CheckLogin function ", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
            finally {
                setIsLoading(false);
            }
        }
        checkLogin();
        
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or replace with a loading spinner
    }


    const showHint = () => {
        if (hintIsOpen) {
            setHintIsOpen(false)
        } else {
            setHintIsOpen(true)
        }
    }


    const showChangeEmailModal = () => {
        console.log("change email");
        if (modalIsOpen) {
            setModalIsOpen(false)
        } else {
            setModalIsOpen(true)
        }
    }

    const changeEmail = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        setEmail(email);
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/changeEmail`, { name: "Avi", Email: email }, { withCredentials: true });
            console.log(response.data); // logs the response data
            if (response.data.name !== "Avi") {
                solveLab("IDORLab2");;
            }
        } catch (error) {
            console.error(error); // logs any error that occurred during the request
        }
    };

    //const solveLab = async () => {
    //    console.log('lab solved');


    //    try {
    //        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/Users/solveLab`,
    //            { Name: "IDORLab2" },
    //            {
    //                withCredentials: true
    //            });

    //        if (!response.ok) {
    //            if (response.status === 404) {
    //                throw new Error('Not found');
    //            } else if (response.status === 500) {
    //                throw new Error('Server error');
    //            } else {
    //                throw new Error(`HTTP error! status: ${response.status}`);
    //            }
    //        }

    //        const data = response.data;
    //        console.log(data);
    //    } catch (error) {
    //        console.error('There was a problem with the fetch operation: ' + error.message);
    //    }


    //}

    return (
        <>
            <h1>IDORLab2lab</h1>
            Hello Avi,<br/>

            Email : { email } <button onClick={showChangeEmailModal}>Change Email</button>
            {modalIsOpen &&
                <form onSubmit={changeEmail }>
                <input type="email" name="email" placeholder="New Email"/>
                 <input type="submit"/>   
                </form> 
            
            }<br/><br/>
            <button onClick={showHint}>Hint</button>
            {hintIsOpen &&
                <div>
                    <ul>
                        <li>Open this broswer on Burp Suite and turn intercept On</li>
                        <li>Click on Change Email, enter a different email and click on Submit</li>
                        <li>On Burp, you will see a POST request to <i>/api/Vulnerable/changeEmail</i> </li>
                        <li>Change the <b>Name</b> on the object that you are sending to another user, like Tuvia for example and forward the request</li>
                        <li>Since the server doesn't do any kind of checking to see who is sending the request, you have just been able to change the user Tuvia's Email even though you are loged in as Avi</li>
                        <li>This is extremelly dangerous, in a real world scenario, an attacker could change another user's email to his and start getting Emails from this app like he is the legit user and like that he could receive for example an Email with personal data or an Email with a request to change his password</li>
                    </ul>
                    <br />

                </div>    
            
            
            }
            
        </>
    )
}


export default IDORLab2lab