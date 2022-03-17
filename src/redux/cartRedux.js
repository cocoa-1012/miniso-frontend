import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartQty = localStorage.getItem('cartQty');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: cartQty ? cartQty : 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let producto = action.payload.productosPkDto.codInt;
      let barra = action.payload.productosPkDto.barra;
      let cantidad = parseInt(action.payload.quantity);

      const addIt = PostAddProduct(producto, barra, cantidad);
      if (addIt) {
        state.quantity = parseInt(state.quantity) + cantidad;
        state.products.push(cantidad);
        state.total += action.payload.precio * cantidad;
      }
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

const PostAddProduct = async (producto, barra, cantidad) => {
  let itWasAdded = false;
  let username = localStorage.getItem('username');
  let token = JSON.parse(localStorage.getItem('user')).access_token;
  // let api = `http://3.16.73.177:9080/private/cart/add?userName=${username}`;
  let api = `/api/private/cart/add?userName=${username}`;
  let reqData = {
    codInt: producto,
    barra: barra,
    cantidad: cantidad,
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
