import axios from 'axios';
import { addProduct } from './cartRedux';
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
