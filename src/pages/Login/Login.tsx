import style from '../Register/Register.module.scss';

export const Login = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <span className={style.logo}>Relex messenger</span>
        <span className={style.title}>Register</span>
        <form className={style.form} action=''>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button>Sign in</button>
        </form>
        <p>You don't have an account? Register </p>
      </div>
    </div>
  );
};
