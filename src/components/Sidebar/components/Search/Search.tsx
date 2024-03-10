import style from './Search.module.scss';
import { useState } from 'react';
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useDataContext } from '../../../../context/context';

export const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);

  const { currentUser } = useDataContext();

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if (currentUser && user) {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, 'chats', combinedId));

        if (!res.exists()) {
          //create a chat in chats collections
          await setDoc(doc(db, 'chats', combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });

          await updateDoc(doc(db, 'userChats', user.uid), {
            [combinedId + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.log(err.message);
      }
      setUser(null);
      setUserName('');
    }
  };

  return (
    <div className={style.search}>
      <div className={style.search_form}>
        <input
          type='text'
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className={style.user_chat} onClick={handleSelect}>
          <img src={user?.photoURL} alt='avatar' />
          <div className={style.user_chat_info}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
