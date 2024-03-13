import { useSelector } from 'react-redux';
import style from './Message.module.scss';
import { IRootState } from '../../../../../../store';
import { useEffect, useRef } from 'react';

export const Message = ({ message }) => {
  //TODO: I need separate file for selectors.
  const currentUser = useSelector((state: IRootState) => state.auth.authData);
  const secondUser = useSelector((state: IRootState) => state.chat.user);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={
        message.senderId === currentUser.uid
          ? `${style.message} ${style.owner}`
          : `${style.message}`
      }
    >
      <div className={style.message_info}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : secondUser?.photoURL
          }
          alt=''
        />
        <span>just now</span>
      </div>
      <div className={style.message_content}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};
