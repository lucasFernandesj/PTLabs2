import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { checkLogin, checkLab, solveLab, useNavigation, useLabCompletion, useModal, useUserAuthentication } from '../Utils.jsx';
//import EmailServer from './EmailServer.jsx';


const EmailServer = () => {
    const navigate = useNavigate();
    const { labIsCompleted, setLabIsCompleted, isLoading, setIsLoading } = useLabCompletion();
    const { modal1hidden, modal2hidden, modal3hidden, modal4hidden, modal5hidden, modalSummaryHidden, setModalSummaryHidden, showTaskModal, hideModal } = useModal();
    const { username, setUsername, password, setPassword, userIsLoggedIn, setUserIsLoggedIn } = useUserAuthentication();
    const [data, setData] = useState(false);
    const [email, setEmail] = useState("");

    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(true);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpList, setOtpList] = useState([]);

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
        const retrievedOTPs = getCookie('forgotPasswordOTPs');
        if (retrievedOTPs) {
            setOtpList(retrievedOTPs);
        }

    }, []);
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

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <h1>EmailServer</h1>
            <h1>Hello Test!</h1>
            <>
                <h1>EmailServer</h1>
                {otpList.length > 0 ? (
                    <ul>
                        {otpList.map((otp, index) => (
                            <li key={index}>Your OTP for resetting your password is: {otp}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Your inbox is empty</p>
                )}
            </>
        </>
    )
}

export default EmailServer;