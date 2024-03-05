import { Chats } from './components/Chats/Chats';
import { Navbar } from './components/Navbar/Navbar';
import { Search } from './components/Search/Search';
import style from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
