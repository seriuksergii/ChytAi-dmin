import axios from 'axios';

const BASE_URL = 'https://toread.onrender.com/';
const LOGIN_URL = `${BASE_URL}moderator/auth/login/`;
const USERS_URL = `${BASE_URL}moderator/users/`;
const REGISTER_URL = `${BASE_URL}register/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const NOTES_URL = `${BASE_URL}todos/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const get_notes = async () => {
  try {
    const response = await axios.get(NOTES_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return [];
  }
};

export const get_users = async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(REGISTER_URL, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
};

export const authenticated_user = async () => {
  try {
    const response = await axios.get(AUTHENTICATED_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to get authenticated user:', error);
    return null;
  }
};
