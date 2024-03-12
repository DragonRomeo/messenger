import { useSelector } from 'react-redux';
import { Message } from './components/Message/Message';
import style from './Messages.module.scss';
import { IRootState } from '../../../../store';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';

export const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | null>(null);

  const chatID = useSelector((state: IRootState) => {
    if (!state?.chat?.user?.uid) {
      return null;
    }

    const result =
      state.auth.authData.uid > state.chat.user.uid
        ? state.auth.authData.uid + state.chat.user.uid
        : state.chat.user.uid + state.auth.authData;

    return result;
  });
  console.log('chatID', chatID);

  useEffect(() => {
    if (!chatID) {
      return;
    }
    const unSub = onSnapshot(doc(db, 'chats', chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatID]);

  console.log('messages ', messages);

  return (
    <div className={style.messages}>
      {messages &&
        messages.map((mess) => <Message key={mess.id} message={mess} />)}
    </div>
  );
};
