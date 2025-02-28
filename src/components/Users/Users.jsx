import { useEffect, useState } from 'react';
import './Users.scss';
import { get_users, delete_user } from '../../api/auth';
import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdDelete,
  MdEdit,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';
import Loader from '../Loader/Loader';
import UserForm from '../UserForm/UserForm';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { users, total } = await get_users(currentPage, usersPerPage);
      setUsers(users);
      setTotalUsers(total);
    } catch (error) {
      console.error('Помилка при завантаженні користувачів:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, usersPerPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      const success = await delete_user(id);
      if (success) fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const visiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="users-container">
      <div className="users-card">
        <div className="card-header">
          <h2>Користувачі</h2>
          <button onClick={handleCreate} className="create-user-button">
            <MdAdd /> Додати користувача
          </button>
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
                          <MdEdit style={{ fontSize: 20, color: '#e9b10a', marginRight: '10px' }} />
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

            <div className="pagination">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <MdFirstPage />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <MdArrowBack />
              </button>
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <button
                  key={page}
                  className={`page-button ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <MdArrowForward />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <MdLastPage />
              </button>
              <span className="total-pages">з {totalPages}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
