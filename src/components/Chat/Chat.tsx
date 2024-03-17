import { Input } from './components/Input/Input';
import { Messages } from './components/Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useState } from 'react';
import icon from '../../assets/icons/icon_filter.png';

export const Chat = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  //Write a selector for sumID
  const user = useSelector((state: IRootState) => state.chat.user);

  const handleClick = () => {
    setIsShowFilter((prevState) => !prevState);
  };

  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>{user?.displayName}</span>
        {isShowFilter ? (
          <div className={style.chat_icons}>
            <div className={style.close_filter} onClick={handleClick}></div>
            <div className={style.date_container}>
              <span>Start</span>
              <input type='date' />
            </div>
            <div className={style.date_container}>
              <span>End</span>
              <input type='date' />
            </div>
          </div>
        ) : (
          <button className={style.filter} onClick={handleClick}>
            <img src={icon} alt='filter' />
          </button>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};
