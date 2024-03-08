import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
