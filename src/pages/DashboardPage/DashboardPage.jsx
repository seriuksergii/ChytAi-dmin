import './DashboardPage.scss';
import Navigation from '../../components/Navigation/Navigation';
// import RecentOrders from '../../components/RecentOrders/RecentOrders';
// import RecentCustomers from '../../components/RecentCustomers/RecentCustomers';
import { IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import Main from '../../components/Main/Main';

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <Navigation />
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <IoMenuOutline />
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <IoSearchOutline />
            </label>
          </div>
          <div className="user">
            <FaUserCircle
              size={32}
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className="details">
          {/* <RecentOrders />
          <RecentCustomers /> */}
        </div>
      </div>
      <Main />
    </div>
  );
};

export default DashboardPage;
