import { useEffect, useState, useCallback } from 'react';
import './Users.scss';
import { get_users, delete_user } from '../../api/auth';
import { MdDelete, MdEdit } from 'react-icons/md';
import Loader from '../Loader/Loader';
import UserForm from '../UserForm/UserForm';
import PropTypes from 'prop-types';
import Pagination from '../Pagination/Pagination';

const Users = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { users, total } = await get_users(
        currentPage,
        usersPerPage,
        searchQuery
      );
      setUsers(users);
      setTotalUsers(total);
    } catch (error) {
      console.error('Помилка при завантаженні користувачів:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, usersPerPage, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      const success = await delete_user(id);
      if (success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    }
  }, []);

  const handleEdit = useCallback((user) => {
    setEditingUser(user);
    setShowForm(true);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="users-container">
      <div className="users-card">
        <div className="card-header">
          <h2>Користувачі</h2>
        </div>

        {showForm ? (
          <UserForm
            user={editingUser}
            onSuccess={() => {
              setShowForm(false);
              fetchUsers();
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Імя</th>
                  <th>Прізвище</th>
                  <th>Email</th>
                  <th>Статус</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`status ${
                            user.is_staff ? 'admin' : 'user'
                          }`}
                        >
                          {user.is_staff ? 'Адміністратор' : 'Користувач'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(user)}
                          className="edit-user-button"
                        >
                          <MdEdit style={{ fontSize: 20, color: '#e9b10a' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="delete-user-button"
                        >
                          <MdDelete style={{ fontSize: 20, color: 'red' }} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Немає користувачів</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

Users.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default Users;
