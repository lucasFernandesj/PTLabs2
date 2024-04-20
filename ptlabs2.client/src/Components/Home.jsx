import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import IDORLabs from './Components/Labs/IDORLabs/IDORLabs.jsx';

function Home() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/Users`, {

                    withCredentials: true
                });

                if (response.status === 200) {
                    setUser(response.data);
                   //console.log("Success");
                  // console.log(response.data);
                    var name = response.data.email.split("@")[0];
                    setName(name);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const logOut = async () => {
        console.log("log out");
        try {
            await axios.post(`${import.meta.env.VITE_APP_BACKEND}/Users/logout`, { withCredentials: true });
        }
        catch (e) {
            console.error(e);
        }
        setUser(null);
        navigate('/login');
    }


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            
            <p>Hello {name}</p>
            <button onClick={logOut}>Log Out</button>
            <br />
            <div>
                <h2>Labs</h2>
                <a href="/Labs/xssLabs/xssLabs.html">XXS Labs</a><br />
                <Link to="/IDORLabs">IDOR Labs</Link><br />
                <Link to="/AuthenticationLabs">Authentication Labs</Link><br />

            </div>
            
        </div>
    );
}

export default Home;
