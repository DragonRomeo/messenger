import style from './Chats.module.scss';
import style2 from '../Search/Search.module.scss';

export const Chats = () => {
  return (
    <div className={style.chats}>
      <div className={style2.user_chat}>
        <img
          src='https://images.unsplash.com/photo-1708448152962-08e08e297e41?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
        <div className={style2.user_chat_info}>
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};
