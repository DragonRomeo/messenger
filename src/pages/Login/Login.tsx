import style from '../Register/Register.module.scss';
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDataContext } from '../../context/context';

export const Login = () => {
  const [error, setError] = useState(false);
  const { currentUser } = useDataContext();
  console.log(currentUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) return;
    e.preventDefault();
    const email = (e.target[0] as HTMLInputElement | null)?.value;
    const password = (e.target[1] as HTMLInputElement | null)?.value;

    if (!email || !password) {
      alert('One of field are empty');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <span className={style.logo}>Relex messenger</span>
        <span className={style.title}>Sign in</span>
        <form onSubmit={handleSubmit} className={style.form} action=''>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button>Sign in</button>
          {error && <span>Error! Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>{' '}
        </p>
      </div>
    </div>
  );
};
