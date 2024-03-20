import { Input } from './components/Input/Input';
import { Messages } from './components/Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useState } from 'react';
import filter_icon from '../../assets/icons/icon_filter.png';
import back_icon from '../../assets/icons/back_icon.png';
import date_filter_icon from '../../assets/icons/date_icon.png';
import user_filter_icon from '../../assets/icons/user_filter_icon.png';

export const Chat = () => {
  // Component is so big. Need to moved logic with filters in new one
  const [isCloseFilter, setIsCloseFilter] = useState(false);
  const [isCloseDate, setIsCloseDate] = useState(false);
  const [isCloseUser, setIsCloseUser] = useState(false);
  /* I should replace this 2 state (start & end) for 1 when I start refactoring?*/
  const [startDate, setStartData] = useState<string | null>(null);
  const [endDate, setEndData] = useState<string | null>(null);
  const [userFilterName, setUserFilterName] = useState('');

  const user = useSelector((state: IRootState) => state.chat.user);
  const chatOwner = useSelector((state: IRootState) => state.auth.authData);

  const handleSwitchFilter = () => {
    setIsCloseFilter((prevState) => !prevState);
  };

  const handleSwitchDate = () => {
    setIsCloseDate((prevState) => !prevState);
    isCloseUser && setIsCloseUser(false);
  };

  const handleSwitchUser = () => {
    setIsCloseUser((prevState) => !prevState);
    isCloseDate && setIsCloseDate(false);
  };

  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>{user?.displayName}</span>
        {user?.displayName &&
          (isCloseFilter ? (
            <button className={style.filter} onClick={handleSwitchFilter}>
              <img src={filter_icon} alt='filter' />
            </button>
          ) : (
            <div className={style.filters_container}>
              <div
                className={`${style.filter} ${style.filter2}`}
                onClick={handleSwitchFilter}
              >
                <img src={back_icon} alt='back' />
              </div>
              {isCloseDate ? (
                <div className={style.chat_icons}>
                  <div
                    className={style.close_filter}
                    onClick={handleSwitchDate}
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
                <button className={style.filter} onClick={handleSwitchDate}>
                  <img src={date_filter_icon} alt='date_filter' />
                </button>
              )}

              {isCloseUser ? (
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
          ))}
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
