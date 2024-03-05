import style from './Register.module.scss';

export const Register = () => {
  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <span className={style.logo}>Relex messenger</span>
        <span className='title'>Register</span>
        <form action=''>
          <input type='text' placeholder='display name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input type='file' />
          <button>Sign up</button>
        </form>
        <p>Do you have an account? Login </p>
      </div>
    </div>
  );
};
