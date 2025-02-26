import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/useAuth';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const loginResult = await loginUser(data.email, data.password);
      if (loginResult) {
        nav('/dashboard'); 
      } else {
        alert('Невірні дані для входу. Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Сталася помилка під час входу. Спробуйте ще раз.');
    }
  };
  

  const handleNavigate = () => {
    nav('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        <h1 className="login-title">ChytAi Admin</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input-group">
            <div className="input-field">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`login-input ${errors.email ? 'input-error' : ''}`}
                {...register('email', {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Невірна email адреса',
                  },
                })}
              />
              <MdEmail className="input-icon" />
            </div>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`login-input ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: "Обов'язкове поле",
                minLength: {
                  value: 6,
                  message: 'Пароль повинен мати більше 6 символів',
                },
              })}
            />
            <FaLock className="input-icon" />

            <div
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-prompt" onClick={handleNavigate}>
          Don’t have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
