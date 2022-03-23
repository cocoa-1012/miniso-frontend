import axios from 'axios';
import $ from 'jquery';

const API_URL = `http://3.16.73.177:9080`;

const register = (
  userName,
  hashPass,
  names,
  lastName,
  email,
  nit,
  dui,
  phone,
  address
) => {
  // return axios.post(API_URL + "/public/users/register", {
  return axios.post('/api/public/users/register', {
    // username,
    // email,|
    // password,
    userName,
    hashPass,
    names,
    lastName,
    email,
    nit,
    dui,
    phone,
    address,
  });
};

const login = (username, password) => {
  const grant_type = 'password';
  localStorage.setItem('username', username);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    auth: {
      username: 'ReactMinisoApp',
      password: 'R3@l1z3m1n1z0',
    },
    withCredentials: true,
    crossDomain: true,
  };

  return axios
    .post(
      API_URL + '/oauth/token',
      //   "/api/oauth/token",
      $.param({
        username,
        password,
        grant_type,
      }),
      config
    )
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('username');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getCurrentUsername = () => {
  return localStorage.getItem('username');
};
const data = { register, login, logout, getCurrentUser, getCurrentUsername };
export default data;
