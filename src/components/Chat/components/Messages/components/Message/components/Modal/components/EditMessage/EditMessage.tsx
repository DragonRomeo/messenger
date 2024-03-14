import {
  DocumentData,
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { FC } from 'react';
import { db } from '../../../../../../../../../../firebase';
import { useSelector } from 'react-redux';
import { selectors } from '../../../../../../../../../../models/selectors/selectors';

interface Props {
  style: string;
  message: DocumentData;
}

export const EditMessage: FC<Props> = ({ style, message }) => {
  const chatID = useSelector(selectors.chatID);
  console.log('chatID', chatID);

  const handleClick = () => {
    console.log('редактировать сообщение');
    console.log('this message', message);
    handleSend();
  };

  const handleSend = async () => {
    if (!chatID) {
      return;
    }

    const editedText = 'Edited text la la la';

    //STEP 1: Copy the message obj
    const cloneMessage = {};
    Object.assign(cloneMessage, message);
    console.log('message origin', message);
    console.log('cloneMessage ', cloneMessage);

    const promise = new Promise((resolve, reject) => {
      //STEP 2: delete this object on firestore
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
      console.log('async 1');
    }).then(() => {
      //STEP 3: add this object clone with new text field
      updateDoc(doc(db, 'chats', chatID), {
        messages: arrayUnion({
          id: cloneMessage.id,
          text: editedText,
          senderId: cloneMessage.senderId,
          date: cloneMessage.date,
        }),
      });
      console.log('async 2');
    });
  };

  return (
    <div className={style} onClick={handleClick}>
      Edit message
    </div>
  );
};
