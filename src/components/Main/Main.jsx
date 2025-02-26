// import Card from '../Card/Card';
// import RecentCustomers from '../RecentCustomers/RecentCustomers';
import RecentOrders from '../RecentOrders/RecentOrders';
import './Main.scss';
import { GoSearch } from 'react-icons/go';

const Main = () => {
  return (
    <div className="main">
      <div className="topbar">
        <div className="search">
          <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search here..."
            />
            <GoSearch className="main__icon" />
          </div>
        </div>
        <div className="user">
          <img src="/src/assets/user-icon.png" alt="user" />
        </div>
      </div>
      {/* <Card /> */}
      <RecentOrders />
      {/* <RecentCustomers /> */}
    </div>
  );
};

export default Main;
