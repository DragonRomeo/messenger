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
  /* I should replace this 2 state (start & end) for 1 when I start refactoring.*/
  const [startDate, setStartData] = useState<string | null>(null);
  const [endDate, setEndData] = useState<string | null>(null);
  const [userFilterName, setUserFilterName] = useState('');

  const user = useSelector((state: IRootState) => state.chat.user);
  const chatOwner = useSelector((state: IRootState) => state.auth.authData);

  const handleSwitchFilter = () => {
    setIsShowFilter((prevState) => !prevState);
  };

  const handleSwitchUser = () => {
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
                <div
                  className={style.close_filter}
                  onClick={handleSwitchFilter}
                ></div>
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
              <button className={style.filter} onClick={handleSwitchFilter}>
                <img src={date_filter_icon} alt='date_filter' />
              </button>
            )}

            {isShowUserFilter ? (
              <div className={style.user_filter_container}>
                <div
                  className={style.user_filter}
                  onClick={() => {
                    user.displayName && setUserFilterName(user.displayName);
                    handleSwitchUser();
                  }}
                >
                  <img src={user?.photoURL} alt='user_icon' />
                  <span>{user?.displayName}</span>
                </div>
                <div
                  className={style.user_filter}
                  onClick={() => {
                    chatOwner.displayName &&
                      setUserFilterName(chatOwner.displayName);
                    handleSwitchUser();
                  }}
                >
                  <img src={chatOwner?.photoURL} alt='chatOwner_icon' />
                  <span>{chatOwner?.displayName}</span>
                </div>
                <div
                  className={`${style.close_filter} ${style.close_filter_2}`}
                  onClick={handleSwitchUser}
                ></div>
              </div>
            ) : (
              <button className={style.filter} onClick={handleSwitchUser}>
                <img src={user_filter_icon} alt='user_filter' />
              </button>
            )}
          </div>
        )}
      </div>

      <Messages
        startDate={startDate}
        endDate={endDate}
        userFilterName={userFilterName}
      />
      <Input />
    </div>
  );
};
