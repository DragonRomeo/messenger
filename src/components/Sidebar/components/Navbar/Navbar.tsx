import { signOut } from 'firebase/auth';
import style from './Navbar.module.scss';
import { auth } from '../../../../firebase';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store';

export const Navbar = () => {
  const currentUser = useSelector((state: IRootState) => state.auth.authData);

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
