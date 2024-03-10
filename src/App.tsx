import { FC, useEffect, useState } from 'react';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { DataContext } from './context/context';

interface Props {
  children: JSX.Element;
}

function App() {
  //maybe will need to add "{}" in useState for init state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const ProtectedRoute: FC<Props> = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login'></Navigate>;
    }
    return children;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <DataContext.Provider value={{ currentUser }}>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Route>
        </Routes>
      </DataContext.Provider>
    </>
  );
}

export default App;
