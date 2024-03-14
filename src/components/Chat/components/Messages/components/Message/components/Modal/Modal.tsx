import style from './Modal.module.scss';
import { DeleteMessage } from './components/DeleteMessage/DeleteMessage';
import { EditMessage } from './components/EditMessage/EditMessage';

export const Modal = () => {
  return (
    <div className={style.modal_container}>
      <EditMessage style={style.modal_message} />
      <DeleteMessage style={style.modal_message} />
    </div>
  );
};
