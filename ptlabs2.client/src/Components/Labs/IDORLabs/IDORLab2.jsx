/* eslint-disable no-unused-vars */
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const IDORLab2 = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Avi' && password === 'HD') {
            navigate(`/IDORLab2lab`);
        }
    }

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
        var labName = "IDORLab2";
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

    return (
        <>
            <h1>IDORLab2</h1>
            <p>In the last Lab you could access someone else's information and read it.<br />
                If developers are not cautious and check who is making the HTTP Requests for each user, an user might be able to read other user's daa<br />
                Something even worse would be if an user could be able to <b>change</b> other's user data and to perform requests on behalf of other users<br />
                To solve this lab, log in with the username Avi and password HD and change your email, then change the email of the user Tuvia<br />

            </p>
            <form onSubmit={ handleSubmit}>
                <input type="text" placeholder="Username" onChange={(event)=>setUsername(event.target.value) } /><br />
                <input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value) } /><br />
                <button type="submit">Log in</button>
                
            </form>
        </>
    )
}

export default IDORLab2