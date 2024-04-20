
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import xssLab1 from './Components/Labs/xssLabs/xssLab1';
import IDORLabs from './Components/Labs/IDORLabs/IDORLabs.jsx';
import IDORLab1 from './Components/Labs/IDORLabs/IDORLab1.jsx';
import IDORLab2 from './Components/Labs/IDORLabs/IDORLab2.jsx';
import IDORLab3 from './Components/Labs/IDORLabs/IDORLab3.jsx';
import Cart from './Components/Labs/IDORLabs/Cart.jsx';
import IDORLab2lab from './Components/Labs/IDORLabs/IDORLab2lab';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/xssLab1" component={xssLab1} />
                        <Route path="/IDORLabs/*" element={<IDORLabs />} />  {/*added /* after console warning*/}
                        <Route path="/IDORLabs/IDORLab1" element={<IDORLab1 />} />
                        <Route path="/IDORLabs/IDORLab2" element={<IDORLab2 />} />
                        <Route path="/IDORLabs/IDORLab3" element={<IDORLab3 />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/IDORLab2lab" element={<IDORLab2lab />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
