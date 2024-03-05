import { Chat } from '../../components/Chat/Chat';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import style from './Home.module.scss';

export const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.container}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
