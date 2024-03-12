import style from './Message.module.scss';

export const Message = ({ message }) => {
  console.log('message props: ', message);
  return (
    <div className={`${style.message} ${style.owner}`}>
      <div className={style.message_info}>
        <img
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
        <span>just now</span>
      </div>
      <div className={style.message_content}>
        <p>hello</p>
      </div>
    </div>
  );
};
