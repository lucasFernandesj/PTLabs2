/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IDORLab1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [showHint, setShowHint] = useState(false);
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
        checkLogin(); 
        checkLab();
    }, []); 

    if (isLoading) {
        return <div>Loading...</div>; // Or replace with a loading spinner
    }

    async function checkLab() {
        console.log("CheckLab function");
        var labName = "IDORLab1";
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
                    console.log("This lab have been solved");
                } else {
                    //document.querySelector('.labIsCompleted').innerText = "Lab yet to be solved"
                    console.log("This lab have NOT been solved");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'Yair' && password === 'Tufeld') {
            navigate(`/cart?user=${username}`);
        }
    };

    const displayHint = () => {
        if (showHint === true) {
            setShowHint(false);
        } else {
            setShowHint(true);
        }
        
    }

    return (
        <>
            <h1>IDORLab1</h1>
            <h3>{labIsCompleted}</h3>
            <p>Log in with the username Yair and the password Tufeld in order to access your account and then go to your cart<br />
                See that your name is displayed on the URL, if the server is not checking who is makig the request, you might be able to access someone else's cart by cahnging your name in the URL to somebody else.<br />



            </p>
            <div>
                <button onClick={displayHint}>Hint</button>
                {showHint && (
                    <div className="hint">
                        <p>Log in as the user Yair and check that you are redirected to your cart at the URL /cart?user=Yair</p>
                        <p>Maybe the backend is not checking if indeed Yair is making the request for Yair's cart, if it isn't, Yair might be able to send a GET request to someone else's cart and to get a response!</p>
                        <p>Try a few names that possibly return legit users of this same app, such as Oxana, Peter, Lucas, Patrick, Jason ...</p>
                        <p>This is a matter of brute forcing/User enumerating</p>
                    </div>
                )}

            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>
        </>
    );
};

export default IDORLab1;
