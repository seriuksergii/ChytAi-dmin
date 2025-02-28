import { useState } from 'react';
import Categories from '../Categories/Categories';
import Scrappers from '../Scrappers/Scrappers';
import Users from '../Users/Users';
import './Main.scss';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';

const Main = ({ activeTab }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Стан для пошукового запиту

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Оновлення стану при зміні введення
  };

  return (
    <div className="main__container">
      <div className="topbar">
        <div className="search">
          <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search here..."
              value={searchQuery} // Підключення стану
              onChange={handleSearchChange} // Обробник зміни
            />
            <GoSearch className="main__icon" />
          </div>
        </div>
        <div className="user">
          <img src="/user-icon.png" alt="user" />
        </div>
      </div>

      {activeTab === 'users' && <Users searchQuery={searchQuery} />}
      {activeTab === 'categories' && <Categories searchQuery={searchQuery} />}
      {activeTab === 'scrappers' && <Scrappers searchQuery={searchQuery} />}
    </div>
  );
};

Main.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Main;
