import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const find = state.products.find(
        (pr) =>
          pr.productosPkDto.codInt === action.payload.productosPkDto.codInt
      );
      if (find && Object.keys(find).length !== 0) {
        find.amount += action.payload.amount;
      } else {
        state.products.push(action.payload);
      }

      const quantity = state.products
        .map((item) => {
          return item.amount;
        })
        .reduce((acc, curr) => acc + curr, 0);
      const total = state.products
        .map((item) => {
          return item.precio * item.amount;
        })
        .reduce((acc, curr) => acc + curr, 0);

      state.quantity = quantity;
      state.total = total;
    },

    removeProduct: (state, action) => {
      let producto = action.payload.codigo;
      let barra = action.payload.barra;

      const removeIt = PostAddProduct(producto, barra, 0);

      if (removeIt) {
        state.quantity = 0;
        state.products.push(0);
        state.total += 0;
      }
    },

    updateCart: (state, action) => {
      state.quantity = action.payload.quantity;
    },
  },
});

const PostAddProduct = async (codInt, barra, quantity) => {
  let itWasAdded = false;
  let username = localStorage.getItem('username');
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  // let api = `http://3.16.73.177:9080/private/cart/add?userName=${username}`;
  let api = `/api/private/cart/add?userName=${username}`;
  let reqData = {
    codInt,
    barra,
    cantidad: quantity,
  };

  try {
    const response = axios({
      method: 'post',
      url: api,
      widthCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: reqData,
    });
    console.log(response);
    if (response) {
      itWasAdded = true;
    }
  } catch (error) {
    console.log('....' + error.message);
  }

  return itWasAdded;
};

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
