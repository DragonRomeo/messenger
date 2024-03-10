import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import style from './Search.module.scss';
import { useState } from 'react';
import { db } from '../../../../firebase';

export const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);

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

  return (
    <div className={style.search}>
      <div className={style.search_form}>
        <input
          type='text'
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className={style.user_chat}>
          <img src={user?.photoURL} alt='avatar' />
          <div className={style.user_chat_info}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
