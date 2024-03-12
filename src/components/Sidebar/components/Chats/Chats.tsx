import style from './Chats.module.scss';
import style2 from '../Search/Search.module.scss';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { addChatData } from '../../../../store/chatsSlice';

export const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => state.auth.authData);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());

        return () => {
          unsub();
        };
      });
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // console.log(chats && Object.entries(chats));
  return (
    <div className={style.chats}>
      {chats &&
        Object.entries(chats)?.map((chat) => (
          <div
            className={style2.user_chat}
            key={chat[0]}
            onClick={() => {
              return dispatch(addChatData(chat[1].userInfo));
            }}
          >
            <img src={chat[1].userInfo.photoURL} alt='avatar' />
            <div className={style2.user_chat_info}>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].userInfo.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
