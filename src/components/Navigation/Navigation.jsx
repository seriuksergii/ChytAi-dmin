import { useState } from 'react';
import './Navigation.scss';
import {
  FaHome,
  FaUserFriends,
  FaComments,
  FaQuestionCircle,
  FaCog,
  FaLock,
  FaSignOutAlt,
} from 'react-icons/fa';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const nav = useNavigate();

  const navItems = [
    { id: 'home', icon: <FaHome />, title: 'Адмін панель' },
    { id: 'customers', icon: <FaUserFriends />, title: 'Клієнти' },
    { id: 'messages', icon: <FaComments />, title: 'Повідомлення' },
    { id: 'help', icon: <FaQuestionCircle />, title: 'Довідка' },
    { id: 'settings', icon: <FaCog />, title: 'Налаштування' },
    { id: 'password', icon: <FaLock />, title: 'Пароль' },
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
            className={activeIndex === index ? 'hovered' : ''}
            onClick={item.id === 'signout' ? handleLogout : null}
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

export default Navigation;
