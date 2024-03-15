import {
  DocumentData,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { FC, useState } from 'react';
import { db } from '../../../../../../../../../../firebase';
import { useSelector } from 'react-redux';
import { selectors } from '../../../../../../../../../../models/selectors/selectors';

interface Props {
  style: string;
  message: DocumentData;
  callback: () => void;
  editedText: null | string;
}

export const EditMessage: FC<Props> = ({ style, message }) => {
  const [text, setText] = useState<string>('');
  const [isInputOpen, setIsInputOpen] = useState(false);

  const chatID = useSelector(selectors.chatID);

  const handleClick = () => {
    console.log('handleClick');
    setIsInputOpen((prevState) => !prevState);
  };

  const handleSend = async (editedText: string) => {
    if (!chatID) {
      return;
    }
    new Promise((resolve) => {
      //STEP 1: delete this object on firestore
      resolve(
        updateDoc(doc(db, 'chats', chatID), {
          messages: arrayRemove({
            id: message.id,
            text: message.text,
            senderId: message.senderId,
            date: message.date,
          }),
        })
      );
    }).then(() => {
      //STEP 2: add this object clone with new text field
      updateDoc(doc(db, 'chats', chatID), {
        messages: arrayUnion({
          id: message.id,
          text: editedText,
          senderId: message.senderId,
          date: message.date,
        }),
      });
    });
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSend(text);
    }
  };

  return (
    <>
      {!isInputOpen ? (
        <div className={style} onClick={handleClick}>
          Edit message
        </div>
      ) : (
        <input
          type='text'
          placeholder='edit text here'
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
        />
      )}
    </>
  );
};
