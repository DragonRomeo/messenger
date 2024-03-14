import { DocumentData } from 'firebase/firestore';
import { FC } from 'react';

interface Props {
  style: string;
  message: DocumentData;
}

export const DeleteMessage: FC<Props> = ({ style }) => {
  return <div className={style}>Delete Message</div>;
};
