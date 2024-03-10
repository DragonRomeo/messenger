import style from './Input.module.scss';

export const Input = () => {
  return (
    <div className={style.input}>
      <input type='text' placeholder='Write a message' />
      <div className={style.send}>
        <button className={style.send_button}>Send</button>
      </div>
    </div>
  );
};
