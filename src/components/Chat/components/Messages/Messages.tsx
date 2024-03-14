import { useSelector } from 'react-redux';
import { Message } from './components/Message/Message';
import style from './Messages.module.scss';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { selectors } from '../../../../models/selectors/selectors';

export const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | null>(null);
  const chatID = useSelector(selectors.chatID);

  useEffect(() => {
    if (!chatID) {
      return;
    }
    const unSub = onSnapshot(doc(db, 'chats', chatID), (doc) => {
      doc.exists() &&
        setMessages(
          doc
            .data()
            .messages.sort(
              (a: { date: number }, b: { date: number }) => a.date - b.date
            )
        );
    });
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
