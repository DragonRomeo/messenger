import { onAuthStateChanged, signOut } from 'firebase/auth';
import style from './Navbar.module.scss';
import { auth } from '../../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { IAuth, addAuthData } from '../../../../store/authSlice';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<IAuth | null>(null);
  const dispatch = useDispatch();
  const currentUserRedux = useSelector(
    (state: IRootState) => state.auth.authData
  );
  console.log('reduxUser', currentUser);

  useEffect(() => {
    /*Check FAQ on docs for this part of code */
    if (currentUser && !currentUser.displayName) {
      const getUnsub = () => {
        const unsub = onAuthStateChanged(auth, (user) => {
          dispatch(
            addAuthData({
              displayName: user?.displayName,
              photoURL: user?.photoURL,
              uid: user?.uid,
            })
          );
          console.log(user);
        });

        return () => {
          unsub();
        };
      };
      getUnsub();
    }

    setCurrentUser(currentUserRedux);
  }, [currentUserRedux, currentUser, dispatch]);

  return (
    <div className={style.navbar}>
      <div className={style.user}>
        {currentUser?.photoURL && (
          <img src={currentUser?.photoURL} alt='avatar' />
        )}
        <span>{currentUser?.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
