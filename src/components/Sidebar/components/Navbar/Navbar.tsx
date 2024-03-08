import { signOut } from 'firebase/auth';
import style from './Navbar.module.scss';
import { auth } from '../../../../firebase';

export const Navbar = () => {
  return (
    <div className={style.navbar}>
      <span className={style.logo}>Relex Chat</span>
      <div className={style.user}>
        <img
          src='https://images.unsplash.com/photo-1708890628348-b36b599ae3b3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
        <span>John</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
