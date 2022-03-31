import { Container } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Products from '../../components/layout/Products/Products';
import ProductsBanner from '../../components/layout/Products/ProductsBanner';
import {
  Bottom,
  Contenitrice,
  FilterContainer,
  FilterContainerResponsive,
  Info,
  Option,
  Select1,
  Select2,
  Sortby,
  Summary,
  Top,
  TopTexts,
  Wrapper,
} from './ProductList.styled';

const imageBaseUrl = 'https://minisobbs.s3.us-east-2.amazonaws.com/Zoho-admin';

const images = {
  '01': imageBaseUrl + '/fragancias+-+banner.png',
  '02': imageBaseUrl + '/cosmeticos+-+banner.png',
  '03': imageBaseUrl + '/cuidado+-+banner.png',
  '04': imageBaseUrl + '/accesorios-banner.png',
  10: imageBaseUrl + '/vida+-+banner.png',
  12: imageBaseUrl + '/libreria+-+banner.png',
  13: imageBaseUrl + '/jueguetes+-+banner.png',
  14: imageBaseUrl + '/electronicos-banner.png',
  15: imageBaseUrl + '/textil+-+banner.png',
  16: imageBaseUrl + '/bolsas+-+banner.png',
};
const ProductList = () => {
  const { category: cat } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  let history = useHistory();
  useEffect(() => {
    console.log({ cat });
  }, [cat]);

  const handleFilters = async (event) => {
    const value = event.target.value;
    try {
      history.push(`/productoslista/${value}`);
      //   history.go(`/productoslista/${value}`);
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
    // const catUrl = '/api/public/categories/first';
    const res = await axios.get(catUrl, {
      crossDomain: true,
    });
    // console.log('TTT', res.data.body);
    setCategories(res.data.body);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [image, setImage] = useState('');

  useEffect(() => setImage(images[cat]), [cat]);

  return (
    <>
      <ProductsBanner image={image} />
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
                  <Option value='newest'>Ordenar </Option>
                  <Option Option value='desc'>
                    Precio más alto
                  </Option>
                  <Option value='asc'>Precio más bajo</Option>
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
