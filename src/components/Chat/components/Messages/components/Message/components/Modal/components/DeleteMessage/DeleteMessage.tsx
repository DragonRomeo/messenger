import { DocumentData, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../../../../../../../../../models/selectors/selectors';
import { db } from '../../../../../../../../../../firebase';

interface Props {
  style: string;
  message: DocumentData;
}

export const DeleteMessage: FC<Props> = ({ style, message }) => {
  const chatID = useSelector(selectors.chatID);

  const handleDelete = async () => {
    if (!chatID) {
      return;
    }

    new Promise((resolve) => {
      //This will delete this object on firestore
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
    });
  };

  return (
    <div className={style} onClick={handleDelete}>
      Delete Message
    </div>
  );
};
