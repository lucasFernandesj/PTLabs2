
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
import AuthenticationLabs from './Components/Labs/AuthenticationLabs/AuthenticationLabs';
import AuthenticationLab1 from './Components/Labs/AuthenticationLabs/AuthenticationLab1';
import AuthenticationLab2 from './Components/Labs/AuthenticationLabs/AuthenticationLab2';
import AuthenticationLab3 from './Components/Labs/AuthenticationLabs/AuthenticationLab3';
import DirectoryTraversalLabs from './Components/Labs/DirectoryTraversalLabs/DirectoryTraversalLabs';
import DirectoryTraversalLab1 from './Components/Labs/DirectoryTraversalLabs/DirectoryTraversalLab1';
import APILabs from './Components/Labs/APILabs/APILabs';
import APILab1 from './Components/Labs/APILabs/APILab1';
import APILab2 from './Components/Labs/APILabs/APILab2';
import EmailServer from './Components/Labs/APILabs/EmailServer';


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
                        <Route path="/AuthenticationLabs/*" element={<AuthenticationLabs />} />  {/*added /* after console warning*/}
                        <Route path="/AuthenticationLab1" element={<AuthenticationLab1 />} />
                        <Route path="/AuthenticationLab2" element={<AuthenticationLab2 />} />
                        <Route path="/AuthenticationLab3" element={<AuthenticationLab3 />} />
                        <Route path="/DirectoryTraversalLabs" element={<DirectoryTraversalLabs />} />
                        <Route path="/DirectoryTraversalLab1" element={<DirectoryTraversalLab1 />} />
                        <Route path="/APILabs" element={<APILabs />} />
                        <Route path="/APILab1" element={<APILab1 />} />
                        <Route path="/APILab2" element={<APILab2 />} />
                        <Route path="/EmailServer" element={<EmailServer />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
