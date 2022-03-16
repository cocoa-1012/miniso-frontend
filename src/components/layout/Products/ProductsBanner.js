import React from 'react';
import styled from 'styled-components';
const image =
  'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600';
const transparentColor = '#00000037';
const BannerWrapper = styled.div`
  height: 500px;
  background: linear-gradient(${transparentColor}, ${transparentColor}),
    linear-gradient(${transparentColor}, ${transparentColor}), url(${image});
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: bottom center;
`;

const ProductsBanner = () => {
  return (
    <BannerWrapper className=''>
      <h2 style={{ color: '#fff', fontSize: 42 }}>Banner Title</h2>
    </BannerWrapper>
  );
};

export default ProductsBanner;
