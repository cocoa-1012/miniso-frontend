import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeProductFromCart,
  updateCartFromServer,
} from '../../redux/cartAction';
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
  const { total } = useSelector((state) => state.cart);

  const cartProductsList = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  let username = localStorage.getItem('username');
  if (!username) {
  }

  useEffect(() => {
    dispatch(updateCartFromServer());
  }, [dispatch]);

  const handleClick = (codInt, barra) => {
    dispatch(removeProductFromCart(codInt, barra));
  };

  const randomCatId = () => {
    const randomNo = Math.floor(Math.random() * categories.length);
    return categories[randomNo].cat;
  };

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
              <button className={classes.bTnProperty}>Seguir Comprando</button>
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
              {cartProductsList.length > 0 ? (
                cartProductsList.map((product) => (
                  <Product id={product.id} key={Math.random()}>
                    <ProductDetail>
                      <Image src={product.url + '-1.jpg'} />
                      <Details>
                        <ProductName>
                          <b>Producto:</b>
                          {product.descripcion}
                        </ProductName>
                        <ProductId>
                          <b>Código: </b>
                          {product.productosPkDto.codInt}
                        </ProductId>
                        <BarraId>
                          <b>Barra: </b>
                          {product.productosPkDto.barra}
                        </BarraId>
                        {/*<ProductColor color='black' />
                      <ProductSize>
                        <b>Size:</b>37.5
              </ProductSize>*/}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <p
                        className='btn-floating btn-fb mx-1'
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(
                            product.productosPkDto.codInt,
                            product.productosPkDto.barra,
                            product.id
                          );
                        }}
                      >
                        <i className='fa-solid fa-trash TrashIcon'></i>
                      </p>
                      <ProductAmountContainer>
                        {/*<Add />*/}
                        <ProductAmount>{product.amount}</ProductAmount>
                        {/*<Remove />*/}
                      </ProductAmountContainer>
                      <ProductPrice>Q. {product.precio}</ProductPrice>
                    </PriceDetail>
                  </Product>
                ))
              ) : (
                <h2>Cart is empty</h2>
              )}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>RESUMEN DE PEDIDO</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Q. {total}</SummaryItemPrice>
              </SummaryItem>

              <SummaryItem type='total'>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Q. {total}</SummaryItemPrice>
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
};
export default Cart;

/*
3,4,8 9.5 ,13,14

*/
