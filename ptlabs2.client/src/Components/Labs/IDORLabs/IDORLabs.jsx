/* eslint-disable no-unused-vars */
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import IDORLab1 from './IDORLab1';
import IDORLab2 from './IDORLab2';
import IDORLab3 from './IDORLab3';

const IDORLabs = () => {


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

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
        checkLogin(); // Call the function inside useEffect
    }, []); // Empty array means this useEffect will run once when the component mounts

    if (isLoading) {
        return <div>Loading...</div>; // Or replace with a loading spinner
    }




    return (
        <div>
            <h1>IDOR Labs</h1>
            <p>Insecure Direct Object References (IDOR) vulnerabilities occur when an application provides direct access to objects based on user-supplied input. In a React application, this might happen when the state of a component or a route parameter is manipulated directly with user input.</p><br />
            <p>
                In this example, we will see how can an React app display data that the current user should not have access to.<br />
                Think about an Ecommerce website that after you are logged in, you can have access to your cart by clicking on the "My cart" button and it takes you the URL https://shop/?user=Lucas&?cartId=3<br />
                The App <b>must</b> check if whoever is making the GET request to the endpoint ?user=Lucas&?cartId=3 is indeed the authorized user Lucas, otherwise any authorized user, or even worst, any unauthorized visitor at all, will be able to see the items in the cart of the user Lucas<br />
                The same can happen for an Email Inbox, Bank Account information or private data held by an app of any kind<br />
            </p>

            <Link to="/IDORLabs/IDORLab1">IDOR Lab 1</Link><br />
            <Link to="/IDORLabs/IDORLab2">IDOR Lab 2</Link><br />
            <Link to="/IDORLabs/IDORLab3">IDOR Lab 3</Link><br />

            <h2>Open in a New tab</h2>
            <a href="/IDORLabs/IDORLab1" target="_blank" rel="noopener noreferrer">IDOR Lab 1</a><br />
            <a href="/IDORLabs/IDORLab2" target="_blank" rel="noopener noreferrer">IDOR Lab 2</a><br />
            <a href="/IDORLabs/IDORLab3" target="_blank" rel="noopener noreferrer">IDOR Lab 3</a><br />



            <Routes>
                <Route path="/IDORLabs/IDORLab1" component={IDORLab1} />
                <Route path="/IDORLabs/IDORLab2" component={IDORLab2} />
                <Route path="/IDORLabs/IDORLab3" component={IDORLab3} />
            </Routes>

        </div>
    )

};

export default IDORLabs;