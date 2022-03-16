import { Container } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CustomPagination from '../Pagination/CustomPagination';
import Product from './Product';

const Products = ({ cat, filters, sort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [formateProducts, setFormateProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = useCallback(
    async (currentPage) => {
      const res = await axios.get(
        cat
          ? `http://3.16.73.177:9080/public/products/size/12/page/${currentPage}?category=${cat}`
          : 'http://3.16.73.177:9080/public/products/size/12/page/0?category=01',
        {
          crossDomain: true,
        }
      );
      setProducts(res.data.content);
    },
    [cat]
  );

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage, getProducts]);

  const handlePageChange = (e) => {
    setCurrentPage(e.target.innerText);
  };

  useEffect(() => {
    try {
      cat &&
        setFormateProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
    } catch (err) {}
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'asc') {
      setFilteredProducts((prev) => {
        const asc = prev.sort((a, b) => {
          if (a.precio > b.precio) return 1;
          if (a.precio < b.precio) return -1;
          return 0;
        });
        // console.table(
        //   'asc',
        //   asc.map((a) => a.precio)
        // );
        return asc;
      });
    } else {
      setFilteredProducts((prev) => {
        const desc = prev.sort((a, b) => {
          if (a.precio > b.precio) return -1;
          if (a.precio < b.precio) return 1;
          return 0;
        });
        // console.table(
        //   'desc',
        //   desc.map((a) => a.precio)
        // );
        return desc;
      });
    }
  }, [sort, products, filters]);

  const newProducts = useMemo(() => {
    if (sort === 'asc') {
      const asc = formateProducts.sort((a, b) => {
        if (a.precio > b.precio) return 1;
        if (a.precio < b.precio) return -1;
        return 0;
      });
      return asc;
    }

    if (sort === 'desc') {
      const desc = formateProducts.sort((a, b) => {
        if (a.precio > b.precio) return -1;
        if (a.precio < b.precio) return 1;
        return 0;
      });
      return desc;
    }

    return formateProducts;
  }, [formateProducts, sort]);

  return (
    <div>
      <Container>
        <div>
          <Contenitrice>
            {newProducts.map((item) => (
              <Product item={item} key={Math.random()} />
            ))}
          </Contenitrice>
        </div>
        <div className='ImpaginAzione'>
          <CustomPagination
            handlePageChange={handlePageChange}
            page={currentPage}
          />
        </div>
      </Container>
    </div>
  );
};

const Contenitrice = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 11rem));
  gap: 1.3rem;
  justify-content: flex-end;

  @media only screen and (max-width: 1920px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 11rem));
    gap: 1.3rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 1150px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 15rem));
    gap: 0.5rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 1056px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 13rem));
    gap: 0.5rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 10rem));
    gap: 0.5rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 10rem));
    gap: 0.5rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 905px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 9rem));
    gap: 0.2rem;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 887px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 15rem));
    gap: 0.1rem;
    justify-content: center;
  }

  @media only screen and (max-width: 859px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 13rem));
    gap: 0rem;
    justify-content: center;
  }

  @media only screen and (max-width: 859px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 13rem));
    gap: 0rem;
    justify-content: center;
  }

  @media only screen and (max-width: 719px) {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 12rem));
    gap: 0rem;
    justify-content: center;
  }

  @media only screen and (max-width: 447px) {
    grid-template-columns: repeat(auto-fit, minmax(11rem, 10rem));
    gap: 0rem;
    justify-content: center;
  }

  @media only screen and (max-width: 383px) {
    grid-template-columns: repeat(auto-fit, minmax(11rem, 9rem));
    gap: 0rem;
    justify-content: center;
  }

  @media only screen and (max-width: 351px) {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 7rem));
    gap: 0rem;
    justify-content: center;
  }
`;

export default Products;
