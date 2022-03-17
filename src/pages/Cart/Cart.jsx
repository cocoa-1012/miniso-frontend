import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { removeProduct, updateCart } from '../../redux/cartRedux';
import './Cart.css';
import classes from './Cart.module.css';

const Contenitrice = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
`;

{
  /*const TopButton = styled.button`
  padding: 10px;
  font-family: inherit;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  background-color: #e71425;
  color: #ffffff;
  border: 2px solid #e71425;
  border-radius: 10px;
  transition: background 200ms ease-in, color 200ms ease-in;

  &:hover {
    background-color: transparent;
    border: 2px solid #e71425;
    color: #000000;
    cursor: pointer;
  }
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;*/
}

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;
const BarraId = styled.span``;
/*const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;*/

//const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

{
  /*const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-family: inherit;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  background-color: #e71425;
  color: #ffffff;
  border: 2px solid #e71425;
  border-radius: 10px;
  transition: background 200ms ease-in, color 200ms ease-in;

  &:hover {
    background-color: transparent;
    border: 2px solid #e71425;
    color: #000000;
    cursor: pointer;
  }
`;*/
}

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

  if (cartData) {
    return (
      <Container>
        <Contenitrice>
          <Wrapper>
            <Title>Tu Canasta</Title>
            <Top>
              <Link to='/' className={classes.link}>
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
                <SummaryItem>
                  <SummaryItemText>Precio estimado de Envío</SummaryItemText>
                  <SummaryItemPrice>Q. 0.00</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Descuento de Envío</SummaryItemText>
                  <SummaryItemPrice>Q. 0.00</SummaryItemPrice>
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
  } else {
    return '';
  }
};
export default Cart;
