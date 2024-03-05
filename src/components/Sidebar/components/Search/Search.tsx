import style from './Search.module.scss';

export const Search = () => {
  return (
    <div className={style.search}>
      <div className={style.search_form}>
        <input type='text' placeholder='Find a user' />
      </div>
      <div className={style.user_chat}>
        <img
          src='https://images.unsplash.com/photo-1708448152962-08e08e297e41?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
        <div className={style.user_chat_info}>
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};
