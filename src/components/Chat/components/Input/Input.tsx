import { useSelector } from 'react-redux';
import style from './Input.module.scss';
import { IRootState } from '../../../../store';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const currentUser = useSelector((state: IRootState) => state.auth.authData);
  const chatID = useSelector((state: IRootState) => {
    if (!state?.chat?.user?.uid) {
      return null;
    }
    console.log('state.auth.authData.uid', state.auth.authData.uid);
    console.log('state.chat.user.uid', state.chat.user.uid);
    const result =
      state.auth.authData.uid > state.chat.user.uid
        ? state.auth.authData.uid + state.chat.user.uid
        : state.chat.user.uid + state.auth.authData.uid;

    return result;
  });
  console.log('chatID input', chatID);

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
  };

  return (
    <div className={style.input}>
      <input
        type='text'
        placeholder='Write a message'
        onChange={(e) => setText(e.target.value)}
      />
      <div className={style.send}>
        <button className={style.send_button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
