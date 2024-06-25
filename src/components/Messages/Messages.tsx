import { useSelector } from 'react-redux';
import { Message } from '../Message/Message';
import style from './Messages.module.scss';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { selectors } from '../../models/selectors/selectors';
import { IRootState } from '../../common/types/slice';

export const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | null>(null);
  const chatID = useSelector(selectors.chatID);
  const startDate = useSelector(
    (state: IRootState) => state.filters.filtersData.startDate
  );
  const endDate = useSelector(
    (state: IRootState) => state.filters.filtersData.endDate
  );
  const userFilterName = useSelector(
    (state: IRootState) => state.filters.filtersData.userFilterName
  );

  const filterByDate = (array: DocumentData | null) => {
    if (!array || !startDate || !endDate) {
      return;
    }
    const filter = array.filter((msg: DocumentData) => {
      const start = new Date(Date.parse(startDate)).toLocaleDateString();
      const end = new Date(Date.parse(endDate)).toLocaleDateString();
      const msgDate = new Date(msg.date.seconds * 1000).toLocaleDateString();

      return msgDate >= start && msgDate <= end;
    });
    return filter;
  };
  const dateFilter = filterByDate(messages);

  const filterByUser = (array: DocumentData | null) => {
    if (!array || !userFilterName) {
      return;
    }
    const filter = array.filter(
      (msg: DocumentData) => msg.name === userFilterName
    );
    return filter;
  };
  const userFilter = filterByUser(messages);

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

  let currMessages = messages;
  if (dateFilter) currMessages = dateFilter;
  if (userFilter) currMessages = userFilter;
  if (dateFilter && userFilter) currMessages = filterByDate(userFilter);

  return (
    <div className={style.messages}>
      {currMessages &&
        currMessages.map((mess: DocumentData) => (
          <Message key={mess.id} message={mess} />
        ))}
    </div>
  );
};
