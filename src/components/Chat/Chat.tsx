import { Input } from './components/Input/Input';
import { Messages } from './components/Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';

export const Chat = () => {
  //Write a selector for sumID
  const user = useSelector((state: IRootState) => state.chat.user);
  console.log(user);

  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>{user?.displayName}</span>
        <div className={style.chat_icons}></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
