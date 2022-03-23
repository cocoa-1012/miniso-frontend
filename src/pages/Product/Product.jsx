//import styled from "styled-components";
import { Add, Remove } from '@mui/icons-material';
import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../redux/cartAction';
import classes from './Product.module.css';
//import sushi2 from "../../assets/card/sushi2.jpeg";
//import sushi3 from "../../assets/card/sushi3.jpeg";

const Product = () => {
  const location = useLocation();
  const pk = location.pathname.split('/')[2];
  const barra = location.pathname.split('/')[3];

  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [thumbsRefList, setThumbsRefList] = React.useState([]);
  const [indexPhoto, setIndexPhoto] = useState(2);

  const photos = [
    `${product.url}-1.jpg`,
    `${product.url}-2.jpg`,
    `${product.url}-3.jpg`,

    /* sushi2,
    sushi3,*/
  ];

  useEffect(
    () => {
      const getProduct = async () => {
        try {
          const res = await axios.get(
            pk && barra
              ? `http://3.16.73.177:9080/public/products/pk?codeInt=${pk}&barra=${barra}`
              : // `/api/public/products/pk?codeInt=${pk}&barra=${barra}`
                ''
          );

          setProduct(res.data.body);
        } catch {}
      };
      getProduct();
      setIndexPhoto(0);
    },
    [pk],
    [barra]
  );

  /*  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + pk);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);*/
  /*
  const state = (index) => ({
    index:index
  });
*/
  const handleQuantity = (type) => {
    let qty = parseInt(quantity);
    setQuantity(type === 'dec' ? qty - 1 : qty + 1);
  };

  const handleTab = (index) => {
    setIndexPhoto(index);
    const images = thumbsRefList.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace('active', '');
    }
    images[index].className = 'active';
  };

  const handleClick = () => {
    toast.success('Product added to cart');
    dispatch(addProductToCart(product, quantity));
  };

  const componentDidMount = () => {
    const { index } = this.state;
    thumbsRefList.current.children[index].className = 'active';
  };

  return (
    <Container>
      <div className={classes.Contenitrice}>
        <div className={classes.Wrapper}>
          <div className={classes.ImgContainer}>
            <img className={classes.Image} src={photos[indexPhoto]} />
          </div>
          <div className={classes.InfoContainer}>
            <div className={classes.Row}>
              <h4 className={classes.Title}>{product.descripcion}</h4>

              {/*<span className={classes.PriceD}>Q{product.precio}</span>*/}
            </div>
            <hr style={{ color: '#999999', height: '1px' }} />
            <span className={classes.Price}>Q {product.precio}</span>
            {/*<p>{item.content}</p>*/}
            <hr style={{ color: '#999999', height: '1px' }} />
            {/*         <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color='black' />
              <FilterColor color='darkblue' />
              <FilterColor color='gray' />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
</FilterContainer>*/}
            <div className={classes.AddContainer}>
              <div className={classes.AmountContainer}>
                <Remove
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => handleQuantity('dec')}
                />
                <span className={classes.Amount}>{quantity}</span>
                <Add
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleQuantity('inc')}
                />
              </div>
            </div>
            <div className={classes.Thumb} ref={thumbsRefList}>
              {photos.map((img, index) => (
                <img
                  src={img}
                  alt=''
                  key={index}
                  onClick={() => handleTab(index)}
                />
              ))}
            </div>
            <button className={classes.bTnProperty} onClick={handleClick}>
              Agregar a Carrito
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Product;
