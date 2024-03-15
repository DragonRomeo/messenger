import { DocumentData } from 'firebase/firestore';
import style from './Modal.module.scss';
import { DeleteMessage } from './components/DeleteMessage/DeleteMessage';
import { EditMessage } from './components/EditMessage/EditMessage';
import { FC, useState } from 'react';

interface Props {
  message: DocumentData;
  closeModal: () => void;
}

export const Modal: FC<Props> = ({ message, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);

  const closeDeleteMessages = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div className={style.modal}>
      <div className={style.closeModal} onClick={handleClick}></div>
      <div className={style.modal_container}>
        <EditMessage
          message={message}
          closeDeleteMessages={closeDeleteMessages}
          style={style}
        />
        {!isEdit && (
          <DeleteMessage message={message} style={style.modal_message} />
        )}
      </div>
    </div>
  );
};
