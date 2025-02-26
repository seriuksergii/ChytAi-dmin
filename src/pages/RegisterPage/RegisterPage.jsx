import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.scss';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(
        data.username,
        data.email,
        data.password,
        data.passwordConfirm
      );
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  const handleNavigate = () => {
    nav('/login');
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Your username here"
              className={errors.username ? 'input-error' : ''}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email here"
              className={errors.email ? 'input-error' : ''}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password here"
              className={errors.password ? 'input-error' : ''}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password here"
              className={errors.passwordConfirm ? 'input-error' : ''}
              {...register('passwordConfirm', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.passwordConfirm && (
              <p className="error-message">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="navigate-text" onClick={handleNavigate}>
          Have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
