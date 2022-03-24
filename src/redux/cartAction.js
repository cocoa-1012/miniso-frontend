import axios from 'axios';
import { addProduct, removeProduct } from './cartRedux';
export const addProductToCart = (product, quantity) => (dispatch) => {
  const { barra, codInt } = product.productosPkDto;
  let username = localStorage.getItem('username');
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  let api = `http://3.16.73.177:9080/private/cart/add?userName=${username}`;
  //   let api = `/api/private/cart/add?userName=${username}`;
  let reqData = {
    codInt,
    barra,
    cantidad: quantity,
  };

  axios({
    method: 'post',
    url: api,
    widthCredentials: true,
    crossdomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: reqData,
  })
    .then(() => {
      dispatch(addProduct({ ...product, amount: quantity }));
    })
    .catch((error) => {
      console.log('....' + error.message);
    });
};

export const removeProductFromCart = (codInt, barra) => (dispatch) => {
  let username = localStorage.getItem('username');
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  let api = `http://3.16.73.177:9080/private/cart/add?userName=${username}`;
  //   let api = `/api/private/cart/add?userName=${username}`;
  let reqData = {
    codInt,
    barra,
    cantidad: 0,
  };

  axios({
    method: 'post',
    url: api,
    widthCredentials: true,
    crossdomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: reqData,
  })
    .then(() => dispatch(removeProduct({ codInt, barra })))
    .catch((error) => {
      console.log(error.response);
    });
};
export const updateCartFromServer = (codInt, barra) => (dispatch) => {
  let username = localStorage.getItem('username');
  let token = JSON.parse(localStorage.getItem('user'))?.access_token;
  const api = `http://3.16.73.177:9080/private/cart/find?userName=${username}`;
  //   let api = `/api/private/cart/find?userName=${username}`;

  axios
    .get(api, {
      widthCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const items = res.data;
      console.log(items);
    });
};
