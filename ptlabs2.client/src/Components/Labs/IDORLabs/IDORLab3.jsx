import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, useModal } from '../Utils.jsx'; 


const IDORLab3 = () => {
    const navigate = useNavigate();
    const [labIsCompleted, setLabIsCompleted] = useState('You have yet not completed this lab');
    const [isLoading, setIsLoading] = useState(true);
    const { modal1hidden, modal2hidden, modal3hidden, modal4hidden, modal5hidden, showTaskModal, hideModal, modalSummaryHidden } = useModal(); // Correct variable name

   // const [username, setUsername] = useState('');
   // const [password, setPassword] = useState('');
   // const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [friends, setFriends] = useState(false);
    const [answer, setAnswer] = useState("");


    const fetchFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/friendsListIDORLab3`);
            console.log(response.data);
            setFriends(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
        fetchFriends();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }



    const submitForm = async (event) => {
        event.preventDefault();
        console.log("ANSWER ",answer)
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_APP_BACKEND}/api/Vulnerable/submitAnswerIDORLab3`,
                data: { answer: answer }, // Include the answer field
                withCredentials: true
            });

            if (response.status === 200) {
                alert("Congratulations, you have solved the lab!");
                solveLab("IDORLab3");
                checkLab(setLabIsCompleted);
            } else if (response.status === 400) {
                alert("Wrong, try again");
            }
        } catch (error) {
            alert(JSON.stringify(error.response.data));
            console.log(error);
        }
    }







    return (
        <>
            <h1>IDORLab3</h1>
            <h3>{labIsCompleted}</h3>
            <h3> User information disclosure through poor design</h3>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Rendering Fetched Data</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            In some websites, the client will fetch the backend with a request to retreive the user's data that might be relevant to be shown at that moment, like friends or items in a cart for example<br />
                            If the developers were not cautious, instead of retreiving only the relevant data, they might end up retreiving all of the data of an user, such as credit card number and address or even their password at any request<br />
                            This data might not be shown to you at first glance but there are ways in whitch you could see it<br />
                            Open the modal underneath to see a list of your friends on a certain Social media page, submit Yair's Credit
                            card number to solve the lab<br/>

                            <button id="hideModal1Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask2ModalBtn" onClick={(event) => showTaskModal(event)}>Display friends</button><br />
            {!modal2hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            {friends && (
                                <>
                                    <h2>Friends List</h2>
                                    <ul>
                                        {friends.map((friend, index) => (
                                            <li key={index}>
                                                <strong>Name:</strong> {friend.name}, <strong>Number of Pictures:</strong> {friend.numberOfPictures}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <button id="hideModal2Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask3ModalBtn" onClick={(event) => showTaskModal(event)}>Tip</button><br />
            {!modal3hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            To see all of the data was fetched, open the developer tools<br />
                            Go to the Network tab<br />
                            Select "Fetch/XHR"<br />
                            Look for a request to friendsIDORLab3<br />
                            Go to the Response tab<br />
                            Copy the Credit card Number of Javier and submit it to solve the lab<br/>

                            <button id="hideModal3Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <button id="summary" onClick={(event) => showTaskModal(event)}>Take away</button><br />
            {!modalSummaryHidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            whent developing in ASP.NET, use DTOs to transfer data from the backend to the front end, you dont need to diplay all of the data that you have about an user, create a DTO that contains only the necessary data and send this DTO to the Front end instead of the whole object.<br/>

                            <button id="summary" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            


            <form>
                
                <input type="text" placeholder="Submit answer" onChange={(event) => setAnswer(event.target.value)} />

                <button onClick={(event)=>submitForm(event) }>Submit</button>
            </form>
        </>
    )
}

export default IDORLab3