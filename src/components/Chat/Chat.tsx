import { Input } from './components/Input/Input';
import { Messages } from './components/Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useState } from 'react';
import date_filter_icon from '../../assets/icons/icon_filter.png';
import user_filter_icon from '../../assets/icons/user_filter_icon.png';

export const Chat = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowUserFilter, setIsShowUserFilter] = useState(false);
  const [startDate, setStartData] = useState<string | null>(null);
  const [endDate, setEndData] = useState<string | null>(null);
  //Write a selector for sumID
  const user = useSelector((state: IRootState) => state.chat.user);

  const handleClick = () => {
    setIsShowFilter((prevState) => !prevState);
  };

  const handleClickUser = () => {
    setIsShowUserFilter((prevState) => !prevState);
  };

  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>{user?.displayName}</span>
        {user?.displayName && (
          <div className={style.filters_container}>
            {isShowFilter ? (
              <div className={style.chat_icons}>
                <div className={style.close_filter} onClick={handleClick}></div>
                <div className={style.date_container}>
                  <span>Start</span>
                  <input
                    type='date'
                    onChange={(e) => setStartData(e.target.value)}
                  />
                </div>
                <div className={style.date_container}>
                  <span>End</span>
                  <input
                    type='date'
                    onChange={(e) => setEndData(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <button className={style.filter} onClick={handleClick}>
                <img src={date_filter_icon} alt='date_filter' />
              </button>
            )}

            {isShowUserFilter ? (
              <></>
            ) : (
              <button className={style.filter} onClick={handleClickUser}>
                <img src={user_filter_icon} alt='user_filter' />
              </button>
            )}
          </div>
        )}
      </div>

      <Messages startDate={startDate} endDate={endDate} />
      <Input />
    </div>
  );
};
