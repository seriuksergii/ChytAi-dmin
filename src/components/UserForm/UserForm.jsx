import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { create_user, update_user } from '../../api/auth';
import './UserForm.scss';

const UserForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = user
        ? await update_user(user.id, formData)
        : await create_user(formData);
      if (response) {
        onSuccess();
      }
    } catch (error) {
      console.error('Помилка при збереженні користувача:', error);
    }
  };
  return (
    <>
      <div className="user-form-overlay" onClick={onCancel}></div>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Імя:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Прізвище:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Адміністратор:
          <input
            type="checkbox"
            name="is_staff"
            checked={formData.is_staff}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          disabled={
            !formData.first_name || !formData.last_name || !formData.email
          }
        >
          {user ? 'Оновити' : 'Створити'}
        </button>
        <button type="button" onClick={onCancel}>
          Скасувати
        </button>
      </form>
    </>
  );
}  

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    is_staff: PropTypes.bool,
  }),
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserForm;
