import { FC } from 'react';

interface Props {
  style: string;
}

export const EditMessage: FC<Props> = ({ style }) => {
  const handleClick = () => {
    console.log('редактировать сообщение');
  };

  return (
    <div className={style} onClick={handleClick}>
      Edit message
    </div>
  );
};
