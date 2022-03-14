import React from "react";
import styled from "styled-components";
import Product from "./Product";
//import { popularProducts } from "../../../data";
import { useEffect, useState } from "react";
import CustomPagination from "../Pagination/CustomPagination";
import axios from "axios";
import { Container } from "@mui/material";

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

const Products = ({ cat, filters, sort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const getProducts = async (currentPage) => {
    const res = await axios.get(
      cat
        ? `http://3.16.73.177:9080/public/products/size/12/page/${currentPage}?category=${cat}`
        : "http://3.16.73.177:9080/public/products/size/12/page/0?category=01",
      {
        crossDomain: true,
      }
    );
    setProducts(res.data.content);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.target.innerText);
  };

  useEffect(() => {
    try {
      cat &&
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
    } catch (err) {}
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      //    setFilteredProducts((prev) =>
      //     [...prev].sort((a, b) => a.createdAt - b.createdAt)
      //  );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.precio - b.precio)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.precio - a.precio)
      );
    }
  }, [sort]);

  return (
    <div>
      <Container>
        <div>
          <Contenitrice>
            {" "}
            {filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
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

export default Products;
