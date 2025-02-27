import { useEffect, useState } from 'react';
import './Users.scss';
import { get_users } from '../../api/auth';
import { MdArrowBack, MdArrowForward } from 'react-icons/md'; 
import Loader from '../Loader/Loader';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await get_users();
        setUsers(usersData);
      } catch (error) {
        console.error('Помилка при завантаженні користувачів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="users-container">
      <div className="users-card">
        <div className="card-header">
          <h2>Користувачі</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td>Імя</td>
              <td>Прізвище</td>
              <td>Email</td>
              <td>Статус</td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`status ${user.is_staff ? 'admin' : 'user'}`}
                    >
                      {user.is_staff ? 'Адміністратор' : 'Користувач'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Немає користувачів</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdArrowBack />
          </button>
          <span>
            Сторінка {currentPage} з {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
