/* eslint-disable react/no-unescaped-entities */
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const usersCart = {
    'Yair': [
        { product: 'Shirt', price: '$10' },
        { product: 'Socks', price: '$20' },
        { product: 'Sandals', price: '$30' }
    ],
    'Lucas': [
        { product: 'Hat', price: '$40' },
        { product: 'Belt', price: '$50' },
        { product: 'Shoes', price: '$60' },
        { product: 'Tuxedo', price: '$70' }
    ]
};






const Cart = () => {
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/Users`, {
                    withCredentials: true
                });
                if (response.status === 401) {
                    navigate('/login');
                }
            }
            catch (error) {
                console.error("Error on CheckLogin function ", error);
            }
        }
        checkLogin();

        const user = new URLSearchParams(location.search).get('user');

        if (location.pathname === '/cart' && user === 'Lucas') {
            
            solveLab();
        }
    }, [navigate, location.pathname, location.search]);



    const solveLab = async () => {
        console.log('lab solved');

        
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/Users/solveLab`, 
              {Name: "IDORLab1"},  
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

    const user = new URLSearchParams(location.search).get('user');

    if (!['Yair', 'Lucas'].includes(user)) {
        return <h1>404</h1>; // Render 404 if the user is not Yair or Lucas
    }

    const items = usersCart[user] || []; // Get the items for the user or an empty array if the user does not exist

    return (
        <div>
            <h1>{user}'s Cart</h1>
            <ul>
                {items.map((item, index) => <li key={index}>{item.product} - {item.price}</li>)}
            </ul>
        </div>
    );
};

export default Cart;