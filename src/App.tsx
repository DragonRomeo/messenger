import { useEffect, useState } from 'react';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { DataContext } from './context/context';
import { useDispatch } from 'react-redux';
import { addAuthData } from './store/authSlice';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      dispatch(
        addAuthData({
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          uid: user?.uid,
        })
      );
    });

    return () => {
      unsub();
    };
  }, [dispatch]);

  return (
    <>
      <DataContext.Provider value={{ currentUser }}>
        <Routes>
          <Route path='/'>
            <Route index element={currentUser ? <Home /> : <Login />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Route>
        </Routes>
      </DataContext.Provider>
    </>
  );
}

export default App;
