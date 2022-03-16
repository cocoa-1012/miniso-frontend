import { Container } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Products from '../../components/layout/Products/Products';
import ProductsBanner from '../../components/layout/Products/ProductsBanner';

const Contenitrice = styled.div``;

const Wrapper = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

  @media only screen and (max-width: 887px) {
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

/*const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 350px;
`;*/

const Sortby = styled.div`
  width: 15%;
`;

const TopTexts = styled.div``;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  max-width: 196px;
  height: 55vh;

  @media only screen and (max-width: 1920px) {
  }

  @media only screen and (max-width: 1048px) {
  }

  @media only screen and (max-width: 960px) {
  }

  @media only screen and (max-width: 887px) {
    display: none;
  }

  @media only screen and (max-width: 778px) {
  }

  @media only screen and (max-width: 640px) {
  }
`;

const FilterContainer = styled.div`
  justify-content: space-between;

  @media only screen and (max-width: 1920px) {
  }

  @media only screen and (max-width: 1048px) {
  }

  @media only screen and (max-width: 960px) {
  }

  @media only screen and (max-width: 887px) {
    display: none;
  }

  @media only screen and (max-width: 778px) {
  }

  @media only screen and (max-width: 640px) {
  }
`;

const FilterContainerResponsive = styled.div`
  display: none;

  @media only screen and (max-width: 887px) {
    display: flex;
    flex: 1;
    width: 50%;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
`;

const Select1 = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 12px;

  @media only screen and (max-width: 1920px) {
  }

  @media only screen and (max-width: 1048px) {
  }

  @media only screen and (max-width: 960px) {
  }

  @media only screen and (max-width: 887px) {
    width: 50%;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 12px;
  }

  @media only screen and (max-width: 778px) {
  }

  @media only screen and (max-width: 671px) {
    max-width: 30%;
    margin-left: 100px;
    margin-bottom: 20px;
    font-size: 9px;
  }

  @media only screen and (max-width: 599px) {
    max-width: 30%;
    margin-left: 50px;
    margin-bottom: 20px;
    font-size: 9px;
  }

  @media only screen and (max-width: 483px) {
    max-width: 30%;
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 9px;
  }
`;
const Select2 = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 12px;

  @media only screen and (max-width: 1920px) {
  }

  @media only screen and (max-width: 1048px) {
  }

  @media only screen and (max-width: 960px) {
  }

  @media only screen and (max-width: 887px) {
    width: 100%;
    margin-left: -100px;
    margin-bottom: 25px;
    font-size: 12px;
  }

  @media only screen and (max-width: 719px) {
    width: 100%;
    margin-left: -50px;
    margin-bottom: 25px;
    font-size: 12px;
  }

  @media only screen and (max-width: 671px) {
    width: 100%;
    margin-left: -140px;
    margin-bottom: 30px;
    font-size: 10px;
  }

  @media only screen and (max-width: 599px) {
    max-width: 100%;
    margin-left: -100px;
    margin-bottom: 30px;
    font-size: 9px;
  }

  @media only screen and (max-width: 483px) {
    max-width: 100%;
    margin-left: -80px;
    margin-bottom: 32px;
    font-size: 9px;
  }

  @media only screen and (max-width: 431px) {
    max-width: 100%;
    margin-left: -80px;
    margin-bottom: 32px;
    font-size: 9px;
  }

  @media only screen and (max-width: 351px) {
    max-width: 100%;
    margin-left: -80px;
    margin-bottom: 32px;
    font-size: 9px;
  }
`;

const Option = styled.option``;

/*const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: black;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;*/

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  let history = useHistory();

  const handleFilters = async (event) => {
    const value = event.target.value;
    try {
      history.push(`/productoslista/${value}`);
      history.go(`/productoslista/${value}`);
    } catch (err) {
      console.log('- - - - - err: ', err);
    }
    /*
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
      */
  };

  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    const catUrl = 'http://3.16.73.177:9080/public/categories/first';
    const res = await axios.get(catUrl, {
      crossDomain: true,
    });
    // console.log('TTT', res.data.body);
    setCategories(res.data.body);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <ProductsBanner />
      <Container>
        <Contenitrice>
          <Wrapper>
            <br />
            <br />
            <p></p>
            <Top>
              {/*<TopButton>CONTINUE SHOPPING</TopButton>*/}
              <TopTexts>{/*<TopText>No. Resultados</TopText>*/}</TopTexts>
              <FilterContainerResponsive>
                <Select1 value={cat} name='categoría' onChange={handleFilters}>
                  {' '}
                  {categories.map((category) => (
                    <Option value={category.codCatUno} key={category.codCatUno}>
                      {category.descripcion}
                    </Option>
                  ))}
                </Select1>
                {/*<Select name='size' onChange={handleFilters}>
                <Option disabled>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                </Select>*/}
              </FilterContainerResponsive>
              <Sortby>
                <Select2 onChange={(e) => setSort(e.target.value)}>
                  <Option value='newest'>Ordenar / Newest</Option>
                  <Option Option value='desc'>
                    Precio más alto / Desc
                  </Option>
                  <Option value='asc'>Precio más bajo / asc</Option>
                </Select2>
              </Sortby>
            </Top>
            <Bottom>
              <Summary>
                <br />
                <h4>Filtrar por:</h4>
                <br />
                {/*<Button>Reiniciar</Button>*/}
                <FilterContainer>
                  <Select1
                    value={cat}
                    name='categoría'
                    onChange={handleFilters}
                  >
                    {' '}
                    {categories.map((category) => (
                      <Option
                        value={category.codCatUno}
                        key={category.codCatUno}
                      >
                        {category.descripcion}
                      </Option>
                    ))}
                  </Select1>
                  {/*<Select name='size' onChange={handleFilters}>
                <Option disabled>Size</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                </Select>*/}
                </FilterContainer>
              </Summary>
              <Info>
                <Products cat={cat} filters={filters} sort={sort} />
              </Info>
            </Bottom>
          </Wrapper>
        </Contenitrice>
      </Container>
    </>
  );
};

export default ProductList;
