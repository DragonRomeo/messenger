import { Message } from '../Message/Message';
import style from './Messages.module.scss';

export const Messages = () => {
  return (
    <div className={style.messages}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};
