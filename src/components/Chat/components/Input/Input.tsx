import { useSelector } from 'react-redux';
import style from './Input.module.scss';
import { IRootState } from '../../../../store';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebase';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const Input = () => {
  const [text, setText] = useState('');

  const currentUser = useSelector((state: IRootState) => state.auth.authData);
  const secondUser = useSelector((state: IRootState) => state.chat.user);

  const chatID = useSelector((state: IRootState) => {
    if (!state?.chat?.user?.uid) {
      return null;
    }
    const result =
      state.auth.authData.uid > state.chat.user.uid
        ? state.auth.authData.uid + state.chat.user.uid
        : state.chat.user.uid + state.auth.authData.uid;

    return result;
  });

  const handleSend = async () => {
    if (!chatID) {
      return;
    }
    await updateDoc(doc(db, 'chats', chatID), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [chatID + '.lastMessage']: {
        text,
      },
      [chatID + '.date']: serverTimestamp(),
    });

    secondUser?.uid &&
      (await updateDoc(doc(db, 'userChats', secondUser.uid), {
        [chatID + '.lastMessage']: {
          text,
        },
        [chatID + '.date']: serverTimestamp(),
      }));

    setText('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={style.input}>
      <input
        type='text'
        placeholder='Write a message'
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      <div className={style.send}>
        <button className={style.send_button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
