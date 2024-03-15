import { useSelector } from 'react-redux';
import style from './Message.module.scss';
import { IRootState } from '../../../../../../store';
import { FC, useEffect, useRef, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { Modal } from './components/Modal/Modal';

interface Props {
  message: DocumentData;
}

export const Message: FC<Props> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  //TODO: I need separate file for selectors.
  const currentUser = useSelector((state: IRootState) => state.auth.authData);
  const secondUser = useSelector((state: IRootState) => state.chat.user);

  const timestamp = message.date;
  const date = new Date(timestamp.seconds * 1000);
  const time = date.toTimeString().slice(0, 5);

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
        <span>{time}</span>
      </div>
      <div
        className={style.message_content}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <p>{message.text}</p>
      </div>
        {isOpen && <Modal message={message} />}
    </div>
  );
};
