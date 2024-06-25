import { Input } from '../Input/Input';
import { Messages } from '../Messages/Messages';
import style from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../../common/types/slice';
import { Filters } from '../Filters/Filters';

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
