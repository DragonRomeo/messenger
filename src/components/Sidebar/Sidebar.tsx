import { Navbar } from '../Navbar/Navbar';
import { Search } from '../Search/Search';
import style from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Navbar />
      <Search />
    </div>
  );
};
