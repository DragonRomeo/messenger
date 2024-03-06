import { Input } from '../Input/Input';
import { Messages } from '../Messages/Messages';
import style from './Chat.module.scss';

export const Chat = () => {
  return (
    <div className={style.chat}>
      <div className={style.chat_info}>
        <span>Jane</span>
        <div className={style.chat_icons}></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
