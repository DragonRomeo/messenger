import { signOut } from 'firebase/auth';
import style from './Navbar.module.scss';
import { auth } from '../../../../firebase';
import { useDataContext } from '../../../../context/context';

export const Navbar = () => {
  const { currentUser } = useDataContext();

  return (
    <div className={style.navbar}>
      <span className={style.logo}>Relex Chat</span>
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
