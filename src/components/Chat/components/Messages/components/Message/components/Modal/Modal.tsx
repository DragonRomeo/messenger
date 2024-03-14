import { DocumentData } from 'firebase/firestore';
import style from './Modal.module.scss';
import { DeleteMessage } from './components/DeleteMessage/DeleteMessage';
import { EditMessage } from './components/EditMessage/EditMessage';
import { FC } from 'react';

interface Props {
  message: DocumentData;
}

export const Modal: FC<Props> = ({ message }) => {
  return (
    <div className={style.modal_container}>
      <EditMessage message={message} style={style.modal_message} />
      <DeleteMessage message={message} style={style.modal_message} />
    </div>
  );
};
