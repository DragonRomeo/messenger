import style from './Register.module.scss';
import image from '../../assets/icons/image_icon.png';

export const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0]);
  };

  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <span className={style.logo}>Relex messenger</span>
        <span className={style.title}>Register</span>
        <form onSubmit={handleSubmit} className={style.form} action=''>
          <input type='text' placeholder='display name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file'>
            <img src={image} width='25px' alt='upload image icon' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>Do you have an account? Login </p>
      </div>
    </div>
  );
};
