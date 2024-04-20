//import AuthenticationLab1 from './AuthenticationLab1'
import { Routes, Route, Link } from 'react-router-dom';
const AuthenticationLabs = () => {
   
    return (
        <>
            <h1>AuthenticationLabs</h1>
            <Link to="/AuthenticationLab1">AuthenticationLab1</Link><br/>
            <Link to="/AuthenticationLab2">AuthenticationLab2</Link><br />
            <Link to="/AuthenticationLab3">AuthenticationLab3</Link><br />
        </>
    )
}

export default AuthenticationLabs