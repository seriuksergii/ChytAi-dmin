import Categories from '../Categories/Categories';
import Scrappers from '../Scrappers/Scrappers';
import Users from '../Users/Users';
import './Main.scss';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';


const Main = ({ activeTab }) => {
  return (
    <div className="main__container">
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
          <img src="/user-icon.png" alt="user" />
        </div>
      </div>

      {activeTab === 'users' && <Users />}
      {activeTab === 'categories' && <Categories />}
      {activeTab === 'scrappers' && <Scrappers />}
     
    </div>
  );
};
Main.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Main;
