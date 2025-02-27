import { useState } from 'react';
import './Navigation.scss';
import { FaUserFriends, FaSignOutAlt, FaBriefcase } from 'react-icons/fa';
import { RiFoldersFill } from 'react-icons/ri';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ activeTab, setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const nav = useNavigate();

  const navItems = [
    {
      id: 'users',
      icon: <FaUserFriends />,
      title: 'Користувачі',
      path: '/users',
    },
    {
      id: 'categories',
      icon: <RiFoldersFill />,
      title: 'Категорії',
      path: '/categories',
    },
    {
      id: 'scrappers',
      icon: <FaBriefcase />,
      title: 'Скрапери',
      path: '/scrappers',
    },
    {
      id: 'books',
      icon: <FaBriefcase />,
      title: 'Книги',
      path: '/books',
    },
    { id: 'signout', icon: <FaSignOutAlt />, title: 'Вийти' },
  ];

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      nav('/login');
    } else {
      alert('Не вдалося вийти з системи. Спробуйте ще раз.');
    }
  };

  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="primary-title">ChitAI</span>
          </a>
        </li>
        {navItems.map((item, index) => (
          <li
            key={item.id}
            onMouseOver={() => handleMouseOver(index)}
            className={`${activeIndex === index ? 'hovered' : ''} ${
              activeTab === item.id ? 'active' : ''
            }`}
            onClick={() => {
              if (item.id === 'signout') {
                handleLogout();
              } else {
                setActiveTab(item.id); // Оновлюємо активну вкладку
              }
            }}
          >
            <a href="#">
              <span className="icon icon-large">{item.icon}</span>
              <span className="title">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Navigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Navigation;