import axios from 'axios';

const BASE_URL = 'https://toread.onrender.com/';
const LOGIN_URL = `${BASE_URL}moderator/auth/login/`;
const USERS_URL = `${BASE_URL}moderator/users/`;
const CATEGORIES_URL = `${BASE_URL}moderator/categories/`;
const SCRAPPERS_URL = `${BASE_URL}moderator/scrappers/`;
const BOOKS_URL = `${BASE_URL}moderator/books/`;
const REGISTER_URL = `${BASE_URL}register/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const NOTES_URL = `${BASE_URL}moderator/notes/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });

    if (response.data && response.data.access) {
      localStorage.setItem('token', response.data.access);
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const get_books = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token not found');

    const response = await axios.get(BOOKS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('API Response:', response.data);

    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return [];
  }
};

export const get_scrappers = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token not found');

    const response = await axios.get(SCRAPPERS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('API Response:', response.data);

    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error('Failed to fetch scrappers:', error);
    return [];
  }
};

export const get_categories = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token not found');

    const response = await axios.get(CATEGORIES_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('API Response:', response.data);

    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
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
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token not found');

    const response = await axios.get(USERS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('API Response:', response.data);

    return Array.isArray(response.data.results) ? response.data.results : [];
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
