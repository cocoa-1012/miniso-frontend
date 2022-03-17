import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProduct, updateCart } from '../../redux/cartRedux';
import { categories } from './../../data';
import './Cart.css';
import classes from './Cart.module.css';
import {
  BarraId,
  Bottom,
  Contenitrice,
  Details,
  Hr,
  Image,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductDetail,
  ProductId,
  ProductName,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Title,
  Top,
  Wrapper,
} from './Cart.styled';

const Cart = () => {
  //const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  let username = localStorage.getItem('username');
  if (!username) {
  }
  let token = JSON.parse(localStorage.getItem('user'))?.access_token;
  let api = `http://3.16.73.177:9080/private/cart/find?userName=${username}`;

  var res = '';
  const [fetchedData, setFetchedData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(api, {
        widthCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchedData(data);
      setCartData(data.data.body);
      setProductList(data.data.body.itemsDtos);
      getTotal(data.data.body.itemsDtos);
    };
    getData();
  }, []);

  const getSubTotal = (data) => {
    const cartSubTotal = data.reduce(
      (tot, item) => tot + item.amount * item.price,
      0
    );
    //alert('--- cartTotalItems: '+cartTotalItems);
    //dispatch(updateCart({ ...data, quantity: cartTotalItems }));
  };

  const getTotal = (data) => {
    const cartTotalItems = data.reduce(
      (counter, item) => counter + item.amount,
      0
    );
    dispatch(updateCart({ ...data, quantity: cartTotalItems }));
  };

  const handleClick = (codigo, barra, productId) => {
    let prod = {
      codigo: codigo,
      barra: barra,
    };
    dispatch(removeProduct({ ...prod, quantity }));

    const newList = productList.filter((item) => item.id !== productId);
    setProductList(newList);
    getTotal(newList);
  };

  const randomCatId = () => {
    const randomNo = Math.floor(Math.random() * categories.length);
    return categories[randomNo].cat;
  };

  if (cartData) {
    return (
      <Container>
        <Contenitrice>
          <Wrapper>
            <Title>Tu Canasta</Title>
            <Top>
              <Link
                to={`/productoslista/${randomCatId()}`}
                className={classes.link}
              >
                <button className={classes.bTnProperty}>
                  Seguir Comprando
                </button>
              </Link>
              {/*<TopTexts>
              <TopText>Canasta de compras(2)</TopText>
              <TopText>Tu lista (0)</TopText>
            </TopTexts>*/}
              {/*<button className={classes.TopbTnRightProperty} type='filled'>
              Pagar Ahora
          </button>*/}
            </Top>
            <Bottom>
              <Info>
                {productList
                  ? productList.map((product) => (
                      <Product id={product.id}>
                        <ProductDetail>
                          <Image src={product.url + '-1.jpg'} />
                          <Details>
                            <ProductName>
                              <b>Producto:</b>
                              {product.descripcion}
                            </ProductName>
                            <ProductId>
                              <b>Código:</b>
                              {product.codeInt}
                            </ProductId>
                            <BarraId>
                              <b>Barra:</b>
                              {product.codeBarrra}
                            </BarraId>
                            {/*<ProductColor color='black' />
                      <ProductSize>
                        <b>Size:</b>37.5
              </ProductSize>*/}
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <a
                            className='btn-floating btn-fb mx-1'
                            onClick={() =>
                              handleClick(
                                product.codeInt,
                                product.codeBarrra,
                                product.id
                              )
                            }
                          >
                            <i className='fa-solid fa-trash TrashIcon'></i>
                          </a>
                          <ProductAmountContainer>
                            {/*<Add />*/}
                            <ProductAmount>{product.amount}</ProductAmount>
                            {/*<Remove />*/}
                          </ProductAmountContainer>
                          <ProductPrice>Q. {product.total} </ProductPrice>
                        </PriceDetail>
                      </Product>
                    ))
                  : ''}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>RESUMEN DE PEDIDO</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>
                    Q. {cartData ? cartData.granTotal : '0.00'}
                  </SummaryItemPrice>
                </SummaryItem>

                <SummaryItem type='total'>
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    Q. {cartData ? cartData.granTotalDiscount : '0.00'}
                  </SummaryItemPrice>
                </SummaryItem>
                <Link to='/payment' className={classes.link2}>
                  <button className={classes.bTnProperty}>Comprar Ahora</button>
                </Link>
              </Summary>
            </Bottom>
          </Wrapper>
        </Contenitrice>
        <br />
        <br />
        <br />
      </Container>
    );
  }
  return null;
};
export default Cart;
