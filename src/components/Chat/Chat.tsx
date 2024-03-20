import { Input } from './components/Input/Input';
import { Messages } from './components/Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Filters } from './components/Filters/Filters';

export const Chat = () => {
  const user = useSelector((state: IRootState) => state.chat.user);

  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>{user?.displayName}</span>
        <Filters />
      </div>

      <Messages />
      <Input />
    </div>
  );
};
