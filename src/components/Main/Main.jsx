import { useState } from 'react';
import Categories from '../Categories/Categories';
import Scrappers from '../Scrappers/Scrappers';
import Users from '../Users/Users';
import './Main.scss';
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import BookList from '../BookList/BookList';
import BookDetail from '../BookDetail/BookDetail';

const Main = ({ activeTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Пошук виконано для:', searchQuery);
  };

  return (
    <div className="main__container">
      <div className="topbar">
        <div className="search-container">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="user">
          <img src="/user-icon.png" alt="user" />
        </div>
      </div>

      {activeTab === 'users' && <Users searchQuery={searchQuery} />}
      {activeTab === 'categories' && <Categories searchQuery={searchQuery} />}
      {activeTab === 'scrappers' && <Scrappers searchQuery={searchQuery} />}
      {activeTab === 'books' && <BookList searchQuery={searchQuery} />}
      {activeTab === 'books/:id' && <BookDetail searchQuery={searchQuery} />}
    </div>
  );
};

Main.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Main;
