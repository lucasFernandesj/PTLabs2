import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, useNavigation, useLabCompletion, useModal, useUserAuthentication } from '../Utils.jsx';

const APILab1 = () => {

    const navigate = useNavigate();
    const { labIsCompleted, setLabIsCompleted, isLoading, setIsLoading } = useLabCompletion();
    const { modal1hidden, modal2hidden, modal3hidden, modal4hidden, modal5hidden, showTaskModal, hideModal } = useModal();
    const { username, setUsername, password, setPassword, userIsLoggedIn, setUserIsLoggedIn } = useUserAuthentication();
    const [data, setData] = useState(false);


    const fetchEliTickets = async (ticketsAccountID) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/APIOWASP/fetchEliTickets?ticketsAccountID=${ticketsAccountID}`);
            setData(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
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
        fetchEliTickets(2);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

 

    const submitAnswer = () => {
        let answer = prompt("Submit your answer");
        console.log(answer);
    }
    return (
        <>
            <h1>API Lab 1</h1>
            <h3>{labIsCompleted}</h3>
            <h2>BOLA - Broken Level Authorization </h2>
            <h3>Modifying parameters of the request to retreive information that you shouldn't have access to</h3>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Task 1</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            Some developers build APIs just thinking that the API shoul receive a request, process it and respond to the user<br />
                            With this inb mind, the developer might forget to chek who is making the request, if who is making the request have authorization to access certain data and so forth<br>
                            We will see an example of an API that receives a request, fetches relevant data from a database and returns it to the user not caring about who is making the request and if it should receive the data that they are requesting for</br>
                            On the Demo App bellow, you can see a landing page, go to the tickets tab to view your open tickets<br />
                            Once you open the pop-up to see your tickets, you are making a request to the backend to retreive your data<br />
                            Intercept that request on Burp Suite and send it to the repeater,you will notice that there is a parameter ?ticketsAccountID=id<br />
                            If the developer didn't implement checks on the back end to verify that only the user that owns the tickets can see them, you may be able to see someone else's tickets by changing the value of ?ticketsAccountID<br />
                            Send that request to the intruder, wrap the ID inside the $$ and go to the payloads tab<br />
                            On Payload type, select Numbers<br />
                            Enter -- From: 0 , To: 10<br />
                            Click on start attack<br />
                            Check for the responses of each request, maybe you will find one that exists and returns a value<br/>
                            
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
                            Noticed anything different?<br />
                            Is there any request that does in fact returns data?<br />
                            If yes, submit it's user's ID to solve the lab<br/><br/>
                            <button onClick={submitAnswer }>Submit Answer</button>
                            <button id="hideModal2Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask3ModalBtn" onClick={(event) => showTaskModal(event)}>Summary</button><br />
            {!modal3hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            When developing an API in ASP.NET, always use the [Authorize] header so that only authenticated users can consume that endpoint<br>
                            Inside each endpoint that returns data, make sure to check the claims of the user through their JWT and only return data that belongs to that user<br/>                            </br>
                            <button id="hideModal3Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <hr></hr>
            <div>
                <h3>Hello Eli</h3>
                Orders:
                <button id="showTask4ModalBtn" onClick={(event) => showTaskModal(event)}>Display Orders</button><br />
                {!modal4hidden && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <div className="modal-content">
                                Order #25467:
                                Status : Delivered
                                <ul>
                                    <li>CISCO router</li>
                                    <li>Samsung Monitor</li>
                                   
                                </ul>
                                Order #25326:
                                Status : Delivered
                                <ul>
                                    <li>White Shirt</li>
                                    <li>Black Pants</li>

                                </ul>
                                <button id="hideModal4Btn" onClick={(event) => hideModal(event)}>Hide</button>
                            </div>
                        </div>
                    </div>
                )}
                Tickets
                <button id="showTask5ModalBtn" onClick={(event) => showTaskModal(event)}>Display Tickets</button><br />
                {!modal5hidden && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <div className="modal-content">
                                {data && ( 
                                    <div>
                                        {data.title && <h1>{data.title}</h1>} 
                                        {data.body && <p>{data.body}</p>} 
                                    </div>
                                )}
                                <button id="hideModal5Btn" onClick={(event) => hideModal(event)}>Hide</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            TODO: Implement function and endpoint to submit the correct answer
        </>
    )
}

export default APILab1