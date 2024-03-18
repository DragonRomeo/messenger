import { useSelector } from 'react-redux';
import { Message } from './components/Message/Message';
import style from './Messages.module.scss';
import { FC, useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { selectors } from '../../../../models/selectors/selectors';

interface Props {
  startDate: string | null;
  endDate: string | null;
}

export const Messages: FC<Props> = ({ startDate, endDate }) => {
  const [messages, setMessages] = useState<DocumentData | null>(null);
  const chatID = useSelector(selectors.chatID);

  const filterByDate = () => {
    if (!messages || !startDate || !endDate) {
      return;
    }
    const filter = messages.filter((msg: DocumentData) => {
      const start = new Date(Date.parse(startDate)).toLocaleDateString();
      const end = new Date(Date.parse(endDate)).toLocaleDateString();
      const msgDate = new Date(msg.date.seconds * 1000).toLocaleDateString();

      return msgDate >= start && msgDate <= end;
    });
    console.log('filter', filter);
    return filter;
  };
  const filter = filterByDate();

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
  console.log('messages', messages);

  return (
    <div className={style.messages}>
      {messages &&
        messages.map((mess: DocumentData) => (
          <Message key={mess.id} message={mess} />
        ))}
    </div>
  );
};
