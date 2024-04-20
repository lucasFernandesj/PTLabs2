import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailCreate, setEmailCreate] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    //const [user, setUser] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;



    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/Users/isLoggedIn`, {
                    withCredentials: true
                });

               // console.log(response);
                if (response.data === "isAuthenticated") {
                    
                    navigate('/home');
                    
                }
            } catch (e) {
                console.log("Error in isLoggedIn function ", e)
            }
        }
        isLoggedIn();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/login?useCookies=true`, { email, password }, { withCredentials: true });

            if (response.status === 200) {
                console.log("Success");
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const createUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/register`, { email:emailCreate, password:passwordCreate });
            if (response.status == 200) {
                console.log("success");
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    console.log("'test5@test.com' 'Test1!'");
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <br />
            <hr />
            <h3>Create User</h3>
            <form onSubmit={createUser}>
                <input type="email" value={emailCreate} onChange={(e) => setEmailCreate(e.target.value)} placeholder="Email Create User" required />
                <input type="password" value={passwordCreate} onChange={(e) =>setPasswordCreate(e.target.value)} placeholder="Password CreateUser" required />
                <button type="submit">Create User</button>
            </form>
        </div>

    );
}

export default Login;
