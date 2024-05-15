import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, useNavigation, useLabCompletion, useModal, useUserAuthentication } from '../Utils.jsx';
//import EmailServer from './EmailServer.jsx';


const APILab2 = () => {

    const navigate = useNavigate();
    const { labIsCompleted, setLabIsCompleted, isLoading, setIsLoading } = useLabCompletion();
    const { modal1hidden, modal2hidden, modal3hidden, modal4hidden, modal5hidden, modalSummaryHidden, setModalSummaryHidden, showTaskModal, hideModal } = useModal();
    const { username, setUsername, password, setPassword, userIsLoggedIn, setUserIsLoggedIn } = useUserAuthentication();
    const [data, setData] = useState(false);
    const [email, setEmail] = useState("");
    
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [testLoggedIn, setTestLoggedIn] = useState(false);
    const [johnLoggedIn, setJohnLoggedIn] = useState(false);



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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleSubmitLogIn = (e) => {
        e.preventDefault();


        if (email.trim() === "test@test.com") {

        if (password === localStorage.getItem('tnp')) {
            setJohnLoggedIn(false)
            setTestLoggedIn(true);
            alert('Test logged in')
        } else {
            alert('Wrong credentials')
        }
        } else if (email.trim() === "john@test.com") {
            if (password === localStorage.getItem('jnp')) {
                setTestLoggedIn(false);
                setJohnLoggedIn(true)
                alert('John logged in')
            } else {
                alert('Wrong credentials')
            }
        
           
        }
    }


    const handleSubmitForgotPassword = (e) => {
        e.preventDefault();
        setShowForgotPasswordForm(false);
        if (email === "test@test.com") {
            const otp = generateOTP();

            // Get existing OTPs from cookie or initialize an empty array
            const existingOTPs = getCookie('forgotPasswordOTPs') || [];

            // Add the new OTP to the beginning of the array
            existingOTPs.unshift(otp);

            // Set cookie with OTPs and expiration time
            setCookie('forgotPasswordOTPs', JSON.stringify(existingOTPs), 2); // 2 minutes expiration
        } else if (email === "john@test.com") {
            let randomNumber = Math.random();
            let scaledNumber = randomNumber * 10;
            let roundedNumber = Math.round(scaledNumber);
           //alert(roundedNumber)
            localStorage.setItem('johnsOTP', roundedNumber)
            
        } else {
            return;
        }
        


        
    }

 

    // Function to generate a random OTP
    function generateOTP() {
        let otp = '';
        for (let i = 0; i < 1; i++) {
            otp += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
        }
        return otp;
    }

    // Function to set cookie with expiration time
    function setCookie(name, value, minutesToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (minutesToExpire * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    // Function to get cookie value
    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return JSON.parse(cookieValue);
            }
        }
        return null;
    }

    function parseCookies() {
        let cookies = {};
        document.cookie.split(';').forEach(function (cookie) {
            let parts = cookie.split('=');
            cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
        });
        return cookies;
    }

    const handleSubmitChangePassword = async(e) => {
        e.preventDefault();
        
        setShowForgotPasswordForm(true);
        if (email === 'test@test.com') {
            try {
                let cookies = parseCookies();

                // Retrieve the array from cookies
                let forgotPasswordOTPsString = cookies['forgotPasswordOTPs'];

                // Parse the array from its string representation
                let forgotPasswordOTPs = JSON.parse(forgotPasswordOTPsString);

                // Get the first element of the array
                let lastOtpSent = forgotPasswordOTPs[0];
                let obj = { Email: email, Otp: otp, LastOTPSent: lastOtpSent, NewPassword: newPassword }
                //console.log("obj ", obj)
                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_APP_BACKEND}/api/APIOWASP/ChangePasswordAPILab2`,
                    data: obj,
                    withCredentials: true
                });

                console.log('ChangePasswordAPILab2 ', response.data);
                //If it's successfulll, set the new password for test
                console.log(response.data)
                localStorage.setItem('tnp', response.data.newPassword);


            } catch (error) {
                console.error(error)
            }
        } else if (email === 'john@test.com') {
            try {
                //let johnsOTP = localStorage.getItem("johnsOTP");
                let obj = { Email: email, Otp: otp, NewPassword: newPassword }
                console.log("obj ", obj)
                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_APP_BACKEND}/api/APIOWASP/ChangePasswordAPILab2`,
                    data: obj,
                    withCredentials: true
                });

                console.log('ChangePasswordAPILab2 ', response.data);
                //If it's successfulll, set the new password for john
                console.log('johns new password: ', response.data.newPassword)
                localStorage.setItem('jnp', response.data.newPassword);


            } catch (error) {
                console.error(error)
            }
        }

    }

    const submitFlag = () => {
        let flag = prompt("Enter the flag");
        if (flag === "3467") {
            solveLab("APILab2");
            alert("Congratulations, you solved the lab!")
        } else {
            alert("Try Again")
        }
    }


    return(
        <>
            <h1>APILab2</h1>
            <h3>{labIsCompleted}</h3>
            <h1>Broken Authentication</h1>
            <button id="showTask1ModalBtn" onClick={(event) => showTaskModal(event)}>Task 1</button><br />
            {!modal1hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            In this Lab we are going to try to Brute Force a poorly configured "Forgot Password" functionality of a web app<br />
                            On the log in Form bellow, click on the "forgot password" password button<br />
                            A pop-up will show up asking for your Email address, enter test@test.com and go to your <Link to="/EmailServer" target="_blank">EmailServer</Link> to retreive it<br />
                            Now go back to the "Forgot Password" Prompt and enter the OTP that you received on your Email to set up a new Password<br />
                            <br />
                            Go to Burp or OWASP ZAP and analyze the trajectory that you have made, check the request that you have sent in order to reset your password<br />
                            You will see that there is a request where you sent the OTP, the Email to change and the new password that you want<mark><b>REWRITE IT TO DISPLAY THE ACTUAL REQUEST THAT IS MADE</b></mark><br />
                            Let's assume that you know the Email address of another user, what if you could forge a Forgot Password Mail with a valid OTP to be created and sent to a victim and them to brute Force that value in order to change the victim's password to one of your choice?<br />
                            Trigger the Forgot Password event again, this time enter the Email of john@test.com<br />
                            On the Pop-up to change your password, enter the Email john@test.com, the password that you want and a random number then send the request<br />
                            Grab that request on Burp and send it to the Intruder, Add the value of the OTP to the Attack and on the payloads tab, enter a list of Numbers from 0 to 10 and start the attack<br />
                            If you receive a 200 OK response, try to log in to John's account using his Email and the password that you chose to Log in as him<br />
                            On OWASP ZAP, Grab the request and send it to the Fuzzer, Add the value of the OTP to the attack and at the Payloads, enter a list of numbers from 0 to 10 and start the attack<br />
                            If you receive a 200 OK response, try to log in to John's account using his Email and the password that you chose to Log in as him<br />
                            Submit the ammount of money that John has on his account in order to solve the lab<br/>
                           
                            

                            <button id="hideModal1Btn" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}
            <button id="showTask2ModalBtn" onClick={() => submitFlag()}>Submit Flag</button><br />
           


            <button id="summary" onClick={(event) => showTaskModal(event)}>Summary</button><br />
            {!modalSummaryHidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            <p>
                                When developing a "Forget Password" functionality, always certify that a limited number of attempts to send a reset password request must be implemented and that the OTP code sent is not easily brute forceable<br />
                                Always be careful in a situation where you must develop your own "Forgot Password" system, if you don't absolutely must develop a system from 0, .NET Identity provide out of the box safe functionalities to do so<br/>
                            </p>

                            <button id="summary" onClick={(event) => hideModal(event)}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

            <hr></hr>

            <>
                {johnLoggedIn && (
                    // Content for John logged in
                    <div>
                                        <div>John is logged in</div>
                    <h1>Hello John!</h1>
                        <h3>You have US$3467 on your account</h3>
                        <button onClick={() => setJohnLoggedIn(false)}>Log Out</button>
                    </div>

                )}
                {testLoggedIn && (
                    // Content for Test logged in
                    <div>
                                        <div>Test is logged in</div>
                                        <h1>Hello Test!</h1>
                        <h3>You have US$5892 on your account</h3>
                        <button onClick={() => setTestLoggedIn(false)}>Log Out</button>
                    </div>

                )}
                {!johnLoggedIn && !testLoggedIn && (
                    // Default content
                    <div>
                                        <form onSubmit={handleSubmitLogIn}>
                        <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                        <input type="Password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        <input type="submit" value="Log In" />
                    </form>
                    <button id="showTask2ModalBtn" onClick={(event) => showTaskModal(event)}>Forgot Password?</button><br />
                    </div>

                )}
                
                {!modal2hidden && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <div className="modal-content">
                                {showForgotPasswordForm ? (
                                    // Content for Forgot Password form
                                    <form onSubmit={handleSubmitForgotPassword}>
                                        <input type="text" placeholder="Enter your Email" onChange={(event) => setEmail(event.target.value)} />
                                        <input type="submit" value="Send code to your Email" />
                                    </form>
                                ) : (
                                    // Content for Change Password form
                                    <div>
                                        <form onSubmit={handleSubmitChangePassword}>
                                            <input type="text" placeholder="Enter your Email" />
                                            <input type="text" placeholder="Enter your OTP" onChange={(event) => setOtp(event.target.value)} />
                                            <input type="text" placeholder="Enter your New Password" onChange={(event) => setNewPassword(event.target.value)} />
                                            <input type="submit" value="Change Password" />
                                        </form>
                                        <button onClick={() => setShowForgotPasswordForm(true)}>Back</button>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                )}
            </>
            
            {!modal2hidden && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            {showForgotPasswordForm && (
                                <form onSubmit={handleSubmitForgotPassword}>
                                    <input type="text" placeholder="Enter your Email" onChange={(event) => setEmail(event.target.value)} />
                                    <input type="submit" value="Send code to your Email" />
                                </form>
                            )}

                            {!showForgotPasswordForm && (
                                <div>
                                                                <form onSubmit={handleSubmitChangePassword}>
                                    <input type="text" placeholder="Enter your Email"  />
                                    <input type="text" placeholder="Enter your OTP" onChange={(event) => setOtp(event.target.value)} />
                                    <input type="text" placeholder="Enter your New Password" onChange={(event) => setNewPassword(event.target.value)} />
                                    <input type="submit" value="Change Password" />
                                    </form>
                                    <button onClick={() => setShowForgotPasswordForm(true)}>Back</button>
                                </div>

                            )}
                            

                            <button id="hideModal2Btn" onClick={(event) => { hideModal(event);  }}>Hide</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default APILab2;