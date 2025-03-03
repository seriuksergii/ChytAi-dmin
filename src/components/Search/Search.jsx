import { IoSearchSharp } from 'react-icons/io5';
import './Search.scss';
import PropTypes from 'prop-types';

const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Пошук..."
        className="searchInput"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="searchButton" onClick={onSearch}>
        <IoSearchSharp className="searchIcon" />
      </button>
    </div>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Search;
