import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab } from '../Utils.jsx'; // Import the checkLogin function

const AuthenticationLab2 = () => {
    const navigate = useNavigate();
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [isLoading, setIsLoading] = useState(true);
    const [modal1hidden, setModal1Hidden] = useState(true);
    const [modal2hidden, setModal2Hidden] = useState(true);
    const [modal3hidden, setModal3Hidden] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userIsLogedIn, setUserIsLogedIn] = useState(false);


    const checkWhoIsLoggedIn = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            // console.log("token is null");
            return;
        }
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/logInAuthenticationLab2`,
                data: { token: localStorage.getItem("token") },
                withCredentials: true
            });
            console.log("response ", response.data.labSolved); 
            setUserIsLogedIn(response.data);
            if (response.data.labSolved) { 
               
                solveLab("AuthenticationLab2");
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkLogin(navigate, setIsLoading);
                checkLab(setLabIsCompleted);
                checkWhoIsLoggedIn();
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const showTaskModal = (event) => {
        if (event.target.id === "showTask1ModalBtn") {
            setModal1Hidden(false);
        } else if (event.target.id === "showTask2ModalBtn") {
            setModal2Hidden(false);
        } else if (event.target.id === "showTask3ModalBtn") {
            setModal3Hidden(false);
        }
    };

    const hideModal = (event) => {
        if (event.target.id === "hideModal1Btn") {
            setModal1Hidden(true);
        } else if (event.target.id === "hideModal2Btn") {
            setModal2Hidden(true);
        } else if (event.target.id === "hideModal3Btn") {
            setModal3Hidden(true);
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        if (username === "Ira" && password === "123") {
            localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXJhIn0.h0TXr8lAQV9Vthpl-hLnqBGLQtLhSvkRNdXgZ9zGG7w");
        } else {
            alert("Wrong credentials");
            localStorage.setItem("token", "");
        }
        checkWhoIsLoggedIn();
    };



    return (
        <>
            <h1>AuthenticationLab2</h1>
            <h3>{labIsCompleted}</h3>
            <h2>Weak JWT</h2>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>What are JWTs?</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            JWT or JSON Web Token is a large string divided into 3 parts: Header, Payload, and Signature<br />
                            On the Payload, we are going to find the relevant user's Data that the developer thought that should be present<br />
                            The JWTs are not encrypted, rather they are Base-64 encoded.
                            Some Developers opt for storing the JWT on the LocalStorage or the Cookies of a page<br />

                            <button id="hideModal1Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <button id="showTask2ModalBtn" onClick={(event) => showTaskModal(event)}>Task1</button><br />
            {!modal2hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            On the Log in Form below, Log in with the credentials "Ira" , "123"<br />
                            Look for where the JWT gets stored, maybe it's in the localStorage or the Cookies

                            <button id="hideModal2Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask3ModalBtn" onClick={(event) => showTaskModal(event)}>Task2</button><br />
            {!modal3hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            Copy the value of the token, go to https://jwt.io/ and paste it on the TexArea under the "Encoded" header<br />
                            On the Right Side of the page, under the "Decoded" header, you will see that there are 3 different areas: Header, Payload and Verify Signature<br />
                            On the Payload area, change the name from "Ira" to "Yair" and copy the token<br />
                            Back to the browser, open the developer tools, go to the Application tab and paste over the value of the Token that copied before<br />
                            Refresh the page to access Yair's cart<br/>

                            <button id="hideModal3Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <form>
                <input type="text" placeholder="UserName" onChange={(event) => setUsername(event.target.value)} />
                <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                <button onClick={handleLogIn}>Log in</button>
            </form>

            <div>
                {userIsLogedIn && userIsLogedIn.data && (
                    <div>
                        <h3>Hello {userIsLogedIn.name}</h3>
                        <ul>
                            {/* Use map to iterate over the array and display its items */}
                            {userIsLogedIn.data.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                )}
            </div>


        </>
    );
};

export default AuthenticationLab2;