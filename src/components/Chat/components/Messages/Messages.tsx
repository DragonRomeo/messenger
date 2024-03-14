import { useSelector } from 'react-redux';
import { Message } from './components/Message/Message';
import style from './Messages.module.scss';
import { IRootState } from '../../../../store';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';

export const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | null>(null);

  //Do i need separate module for this selector if this will repeat?
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

  useEffect(() => {
    if (!chatID) {
      return;
    }
    const unSub = onSnapshot(doc(db, 'chats', chatID), (doc) => {
      //Add sorting by date before put in state
      doc.exists() &&
        setMessages(doc.data().messages.sort((a: { date: number; }, b: { date: number; }) => a.date - b.date));
      // console.log('messages', doc.exists() && doc.data().messages);
    });

    console.log('messages', messages);

    return () => {
      unSub();
    };
  }, [chatID]);

  return (
    <div className={style.messages}>
      {messages &&
        messages.map((mess: DocumentData) => (
          <Message key={mess.id} message={mess} />
        ))}
    </div>
  );
};
