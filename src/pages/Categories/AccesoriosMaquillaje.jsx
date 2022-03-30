import Container from '@mui/material/Container';
import React, { useState } from 'react';
import Products from '../../components/layout/Products/Products';
import {
  Bottom,
  Info,
  Option,
  Select,
  Sortby,
  Summary,
  Title,
  Top,
  TopTexts,
  Wrapper,
} from '../styled/AccesoriosMaquillaje.styled';
import classes from './AccesoriosMaquillaje.module.css';

const AccesoriosMaquillaje = () => {
  const [filters /*setFilters*/] = useState({});
  const [sort, setSort] = useState('newest');

  /*  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };*/

  return (
    <div>
      <div className={classes.TopheaderContainer}>
        <div className={classes.ImgContainer}>
          <img
            className={classes.Image}
            src='./img/categories/Accesorios-de-belleza.png'
            alt=''
          />
        </div>
      </div>
      <Container fixed>
        <h1>Accesorios de Belleza</h1>
      </Container>
      <Wrapper>
        <Title>Lista de Productos</Title>
        <p></p>
        <Top>
          {/*<TopButton>CONTINUE SHOPPING</TopButton>*/}
          <TopTexts>{/*<TopText>No. Resultados</TopText>*/}</TopTexts>
          <Sortby>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value='newest'>Ordenar</Option>
              <Option Option value='desc'>
                Precio más alto
              </Option>
              <Option value='asc'>Precio más bajo</Option>
            </Select>
          </Sortby>
        </Top>
        <Bottom>
          <Summary>
            {/*<h1>Filtros</h1>*/}
            {/*<Button>Reiniciar</Button>
            <FilterContainer>
              <Select name='color' onChange={handleFilters}>
                <Option disabled>Color</Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Red</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
              </Select>
              <Select name='size' onChange={handleFilters}>
                <Option disabled>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
              </Select>
            </FilterContainer>*/}
          </Summary>
          <Info>
            <Products cat={'04'} filters={filters} sort={sort} />
          </Info>
        </Bottom>
      </Wrapper>
    </div>
  );
};

export default AccesoriosMaquillaje;
