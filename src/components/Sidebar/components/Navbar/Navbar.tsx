import { signOut } from 'firebase/auth';
import style from './Navbar.module.scss';
import { auth } from '../../../../firebase';
import { useDataContext } from '../../../../context/context';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store';

export const Navbar = () => {
  // const { currentUser } = useDataContext();
  const currentUser = useSelector((state: IRootState) => state.auth.authData);
  console.log('currentUser', currentUser);

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
