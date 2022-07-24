import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Feature1 from './components/Feature1';
import Feature2 from './components/Feature2';
import Home from './components/Home';
import Roles from './components/Roles';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/roles" element={<Roles />}></Route>
              <Route path="/feature1/:id" element={<Feature1 />} />
              <Route path="/feature2/:id" element={<Feature2 />} />
              <Route path="*" element={<Navigate to="/" replace />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
