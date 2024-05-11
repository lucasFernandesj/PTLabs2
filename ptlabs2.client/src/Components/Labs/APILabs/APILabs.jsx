import { Routes, Route, Link } from 'react-router-dom';



const APILabs = () => {
    return (
        <>
            <h1>API Labs</h1>
            <Link to="/APILab1">API Lab 1</Link><br />
            <Link to="/APILab2">API Lab 2</Link><br />
        </>
    )
}

export default APILabs;