const BASE_URL = 'https://movies-backend-5b0k.onrender.com/api';

// Auth API calls
export const registerUser = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: 'include',
  });
  return res.json();
};

// Movies API calls
export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    credentials: 'include',
  });
  return res.json();
};

export const createMovie = async (movieData) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(movieData),
  });
  return res.json();
};

export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(movieData),
  });
  return res.json();
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
};
