import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab } from '../Utils.jsx'; // Import the checkLogin function



const AuthenticationLab3 = () => {
    const navigate = useNavigate();
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [isLoading, setIsLoading] = useState(true);
    const [modal1hidden, setModal1Hidden] = useState(true);
    const [modal2hidden, setModal2Hidden] = useState(true);
    const [modal3hidden, setModal3Hidden] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userIsLogedIn, setUserIsLogedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkLogin(navigate, setIsLoading);
                checkLab(setLabIsCompleted);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

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



        
            const handleDownload = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/passwordsList`); // Assuming your API endpoint is '/api/download'
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Passwords.txt';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } catch (error) {
                    console.error('Error downloading file:', error);
                }
    };


    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/AuthenticationLab3LogIn`,
                data: { UserName: username, Password: password },
                withCredentials: true
            });
            if (response.data.labSolved) { 
                
                solveLab("AuthenticationLab3");
            }
            setUserIsLogedIn(response.data);

        }
        catch (error) {
            console.error(error);
        }
        
    };

        if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>AuthenticationLab3</h1>
            <h2>App prone to Brute Force Attacks</h2>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Task 1</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            If your app doesn't implement strong password setting policies, your users might chose to use weak passwords that are easy to brute force, such as "12345" or "qwerty"<br />
                            Never trust your users to implement strong passwords by themselves, rather you should imposo onto them the obligation to do so<br/>

                            <button id="hideModal1Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask2ModalBtn" onClick={(event) => showTaskModal(event)}>Task 2</button><br />
            {!modal2hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            Download the text file bellow, it is a list of common bruteforceable passwords:<br />
                            <button onClick={handleDownload}>Download File</button><br />


                            <button id="hideModal2Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask3ModalBtn" onClick={(event) => showTaskModal(event)}>Task 3</button><br />
            {!modal3hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Perform a Brute Force Attack using Burp Suite</h3>
                            Open Burp Suite<br />
                            On the Log in formn bellow, try to log in with the credentials "Gidi" - "password" , intercept the request and send it to the intruder<br />
                            On the Object being Sent, highlight the "password" variable with your mouse and click on the "Add" button on the right side<br />
                            Go to the <b>Payloads</b> tab, on "Payload settings" , click on "Load..." and select the Passwords.txt file that you downloaded<br />
                            Click on the the orange "Start attack" button<br />
                            Check if you could get a response with status code 200 and if yes, what was the password that you tried on that occasion<br />
                            Log in with the credentials to solve the lab

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
            <br />
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
    )
}


export default AuthenticationLab3