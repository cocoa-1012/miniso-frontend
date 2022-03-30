import { Container } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { categories } from '../../../data';
import CategoryItem from './CategoryItem';

const Categories = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>Nuestras Categorías</h1>
        </Title>
        <CategoriesWrapper>
          {categories.map((item) => (
            <CategoryItem item={item} key={item.id} />
          ))}
        </CategoriesWrapper>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  padding-top: 50px;
`;

const Title = styled.div`
  padding-left: 30px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 640px) {
    padding-left: 80px;
    padding-right: 80px;
    overflow-y: hidden;
  }

  @media only screen and (max-width: 540px) {
    padding-left: 20px;
    padding-right: 20px;
    overflow-y: hidden;
  }
`;
export default Categories;
