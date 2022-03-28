import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const images = [
  'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600',
  'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1525612/pexels-photo-1525612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/534757/pexels-photo-534757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/771883/pexels-photo-771883.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1557547/pexels-photo-1557547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/529621/pexels-photo-529621.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/7837/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

const BannerWrapper = styled.div`
  height: 100vh;
  background: ${(props) => 'url(' + props.image + ')'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center center;
`;

const ProductsBanner = () => {
  const [image, setImage] = useState(
    'https://minisobbs.s3.us-east-2.amazonaws.com/Zoho-admin/Accesorios-de-belleza.png'
  );
  const { category } = useParams();
  useEffect(() => {
    const no = Math.floor(Math.random() * images.length);
    console.log(images[no]);
  }, [category]);
  return <BannerWrapper image={image} className=''></BannerWrapper>;
};

export default ProductsBanner;
