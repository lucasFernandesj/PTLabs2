import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                
                const response = await axios.get('https://localhost:7134/Users', {

                    withCredentials: true
                });

                if (response.status === 200) {
                    setUser(response.data);
                    console.log("Success");
                    console.log(response.data);
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
    //const getName = async (user) => {
    //    let email = user.email;
    //    let name = email.split('@')[0];
    //    return name
    //}

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
                <a href="/Labs/xxsLabs/xxsLabs.html">XXS Labs</a>

            </div>
            
        </div>
    );
}

export default Home;
