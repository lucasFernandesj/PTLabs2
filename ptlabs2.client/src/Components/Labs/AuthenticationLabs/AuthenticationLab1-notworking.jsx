import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, hideModal, showTaskModal } from '../Utils.jsx'; // Import the necessary functions

const AuthenticationLab1 = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [isLoading, setIsLoading] = useState(true);
    const [modal1hidden, setModal1Hidden] = useState(true)
    const [modal2hidden, setModal2Hidden] = useState(true)
    const [ModalSolveLabHidden, setModalSolveLabHidden] = useState(true)
    const [modalSummaryHidden, setModalSummaryHidden] = useState(true)
    const [loginresponse, setLogInResponse] = useState(false)
    const [currentUsername, setCurrentUsername] = useState("")
    const [usernamesList, setUsernamesList] = useState([]);

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                // Call the checkLogin function
                await checkLogin(navigate, setIsLoading);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLabData();
        checkLab();
    }, []);

    async function checkLab() {
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/logInAuthenticationLab1`,
                data: { UserName: username, Password: password },
                withCredentials: true
            });
            setLogInResponse(response.data)
            console.log(response.data); // Assuming the server returns data
        } catch (error) {
            console.error(error);
        }
    };

    const addUsernameTolist = () => {
        if (currentUsername.trim() === "") {
            return;
        }
        setUsernamesList([...usernamesList, currentUsername]);
        document.querySelector('#setCurrentUsernameInput').value = "";
        setCurrentUsername('');
    }

    const handleDeleteUsername = (index) => {
        const updatedList = [...usernamesList];
        updatedList.splice(index, 1);
        setUsernamesList(updatedList);
    };

    const submitAuthenticationLab1 = () => {
        console.log(usernamesList);
        try {
            return axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/SolveAuthenticationLab1`, { Names: usernamesList }, { withCredentials: true })
                .then(response => {
                    alert(response.data);
                    if (response.data === "All of the names that you entered are registered on the app") {
                        alert("Congratulations, you solved the lab!")
                        solveLab("AuthenticationLab1");
                    } else {
                        alert("try again");
                    }
                    return response;
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <h1>AuthenticationLab1</h1>
            <h3>{labIsCompleted}</h3>
            <h2>User Enumeration through Error responses</h2>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Task 1</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            On the Log in Form below, try to log in with the credentials "admin" + "admin" and see what happens<br />
                            Then Try to log in using the credentials "Davida" + "123" <br />
                            Noticed anything different?<br />
                            <button id="hideModal1Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <button id="showTask2ModalBtn" onClick={(event) => showTaskModal(event)}>Task 2</button><br />
            {!modal2hidden && (
                <div >
                    <div >
                        <div >
                            As you can see, the app itself tells us if the user exists or not and if the user exists,if you have entered the correct password<br />
                            Try to log in with the Usernames and Passwords from the list bellow and enter the usernames that exist on the vault to solve the lab<br />
                            <ul>
                                <li>Maor</li>
                                <li>Mark</li>
                                <li>Lucas</li>
                                <li>Avi</li>
                                <li>Peter</li>
                                <li>Yair</li>
                                <li>Tzion</li>
                                <li>Haim</li>
                                <li>Gidi</li>
                                <li>Tuvia</li>
                                <li>Adi</li>
                                <li>admin</li>
                            </ul>
                            <br /> <button id="hideModal2Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>

                </div>

            )}

            <button id="showTask3ModalBtn" onClick={(event) => showTaskModal(event)}>Final Task</button><br />
            {!ModalSolveLabHidden && (
                <div >
                    <div >
                        <div >
                            <input type="text" placeholder="Enter value" id="setCurrentUsernameInput" onChange={(event) => setCurrentUsername(event.target.value)} /><button onClick={addUsernameTolist}>Add</button><br />
                            <ul>
                                {usernamesList.map((username, index) => (
                                    <li key={index}>
                                        {username}
                                        <button onClick={() => handleDeleteUsername(index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                            <br />
                            <button onClick={submitAuthenticationLab1}>Solve Lab</button>
                            <button id="hideModalSolveLab" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>
            {loginresponse && (
                loginresponse
            )}

            <div>
                <button id="summary" onClick={(event) => showTaskModal(event)}>Summary</button>
                {!modalSummaryHidden && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <div className="modal-content">
                                <p>
                                    When developing a log in page, always return to the user generic error messages such as "Wrong credentials" to both cases of user authentication error(Both if the username or the password are wrong)<br />
                                    If you return an error message for when the username is not registered and another error message for when the password is wrong, an attacker will be able to enumerate the users of your app and on a next stage,
                                    to try to brute force their way into the app<br />
                                </p>
                                <button id="summary" onClick={(event) => hideModal(event)}>Hide</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AuthenticationLab1;