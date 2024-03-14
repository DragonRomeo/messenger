import {
  DocumentData,
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

  const handleSend = async () => {
    if (!chatID) {
      return;
    }
    const editedText = 'Edited text la la la';

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

  return (
    <div className={style} onClick={handleSend}>
      Edit message
    </div>
  );
};
