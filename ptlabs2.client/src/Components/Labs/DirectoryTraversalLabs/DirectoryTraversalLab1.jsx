import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, useNavigation, useLabCompletion, useModal, useUserAuthentication } from '../Utils.jsx';

const DirectoryTransversalLab1 = () => {
    const navigate = useNavigate();
    const { labIsCompleted, setLabIsCompleted, isLoading, setIsLoading } = useLabCompletion();
    const { modal1hidden, modal2hidden, modal3hidden, modal4hidden, showTaskModal, hideModal } = useModal();
    const { username, setUsername, password, setPassword, userIsLoggedIn, setUserIsLoggedIn } = useUserAuthentication();
    const [answer, setAnswer] = useState('');

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
        checkLab(setLabIsCompleted);
    }, []);

    const submitAnswer = async () => {
        try {
            const userAnswer = prompt("Enter Answer");
            setAnswer(userAnswer);
            
            const response = await axios({
                method: 'Post',
                url: `${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/DirectoryTraversalLab1Answer`,
                data: { Answer: answer },
                withCredentials: true
            });
            console.log('Response:', response.data);
            if (response.data.isRight) {
                solveLab("DirectoryTraversalLab1");
                checkLab(setLabIsCompleted);
                alert("Congratulations, you solved the lab!")
            }
        } catch (error) {         
            console.error('Error submitting answer:', error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <h1>DirectoryTraversal1</h1>
            <h3>{labIsCompleted}</h3>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Task 1</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            Directory Traversal is basically when the users are able to access a directory that they shouldn't be able to and possibly even accessing directories from the host machine that are not related to the app itself<br />

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

                            On the modal above you will see 2 pictures, open one of them on a new tab<br />
                            The URL is pointing to a path on the application<br />
                            You would have to use Fuzzing methos or a similar approach to discover what are the folders that are available on the app and where, in this case, let's say that you could somehow find out that there is a a folder named "Secret" and document called "secret.txt" inside that folder<br />
                            Reach to that .txt file and submit it's content to solve the lab<br/>

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

                            <img src="/Media/dotnet.png" alt="description" /><br />
                            <img src="/Media/react.png" alt="react" />

                            <button id="hideModal3Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask4ModalBtn" onClick={(event) => showTaskModal(event)}>Hint</button><br />
            {!modal4hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">

                            The folder Secret is at the same level of the folder Media,If you open the dotnet.png on another tab, the URL that you are gonna visit is /Media/dotnet.png<br/>
                            Right now you are inside the Media folder, in order to go up one folder, add <b>../</b> at the end of the URL, then, in order to enter the Secret folder, add <b>/Secret</b> to the end of the URL<br />
                            Lastly, print the contents of secret.txt to the screen by adding <b>/secret.txt</b> to the end of the URL<br />
                            In sumary, visit /Media/dotnet.png/../Secret/secret.txt<br />


                            <button id="hideModal4Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={submitAnswer}>Submit answer</button>

        </>
    )
}

export default DirectoryTransversalLab1;
