import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(() => {
    axios
      .get('http://3.16.73.177:9080/public/categories/first')
      //   .get('/api/public/categories/first')
      .then((res) => {
        setCategories(res.data.body);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => fetchCategories(), [fetchCategories]);

  return (
    <div>
      <footer className='text-white py-4 bg-dark'>
        <div className=''>
          <div className='container text-left text-md-left'>
            <div className='row'>
              <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 mx-auto'>
                <img className='logoFooter' src='/img/logo.png' alt='' />
                <br />
                <br />
                <br />
                {/*                <p className='paraGraph'>
                  Miniso.com.gt Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quaerat facere quae perferendis numquam
                  natus consectetur ad corrupti adipisci eos, ducimus iure fugit
                  delectus, accusantium commodi, error necessitatibus illum
                  provident eaque?
  </p>*/}
              </div>
              {/*END GRID COLUMN*/}
              {/* <hr className="clearfix w-100 d-md-none" />
              <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 mx-auto">
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  Mapa del Sitio
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Link 1</a>
                  </li>
                  <li>
                    <a href="#!">Link 2</a>
                  </li>
                </ul>
              </div> */}
              {/*END GRID COLUMN*/}
              <hr className='clearfix w-100 d-md-none' />
              <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 mx-auto '>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Categorías
                </h5>
                <ul className='category_list'>
                  {categories.map((category) => (
                    <li key={category.codCatUno}>
                      <Link to={`/productoslista/${category.codCatUno}`}>
                        {category.descripcion}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 mx-auto contactDiv'>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Contacto
                </h5>
                <p className='hover-red'>
                  <i className='fas fa-map-marker-alt me-3  '></i>16 calle 6-72
                  zona 10 Centro Comercial La Estación Local N-L22 Primer Nivel.
                </p>
                <p className=' hover-red'>
                  <i className='fas fa-envelope me-3'></i>
                  hola@miniso.com.gt
                </p>
                <p className='hover-red'>
                  <i className='fas fa-phone me-3 hover-red'></i> 2445-5689
                </p>
              </div>
              {/*END GRID COLUMN*/}
              <hr className='clearfix w-100 d-md-none' />
              {/*              <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 mx-auto'>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Mi Cuenta
                </h5>
                <ul className='list-unstyled'>
                  <li>
                    <a href='#!'>Link 1</a>
                  </li>
                  <li>
                    <a href='#!'>Link 2</a>
                  </li>
                </ul>
</div>*/}

              {/*END GRID COLUMN*/}
            </div>
            {/*END ROW*/}
          </div>
          {/*END CONTAINER*/}

          {/*CALL TO ACTION*/}
          {/*          <ul className='list-unstyled list-inline text-center py-2'>
            <li className='list-inline-item'>
              <h5 className='mb-1'>Regístrate Gratis</h5>
            </li>
            <li className='list-inline-item'>
              <a href='#!' className='btn btn-danger btn-rounded'>
                Suscribete!
              </a>
            </li>
</ul>*/}
          {/*CALL TO ACTION*/}

          {/*SOCIAL BUTTONS*/}
          <ul className='list-unstyled list-inline text-center'>
            <li className='list-inline-item'>
              <a
                href='https://www.facebook.com/MinisoGt/'
                target='_blank'
                className='btn-floating btn-fb mx-1'
                rel='noreferrer'
              >
                <i className='fab fa-facebook-f socialMedia'></i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a
                href='https://www.instagram.com/miniso.gt/?hl=en'
                target='_blank'
                className='btn-floating btn-fb mx-1'
                rel='noreferrer'
              >
                <i className='fab fa-instagram socialMedia'> </i>
              </a>
            </li>
          </ul>
          <hr />
          {/*SOCIAL BUTTONS*/}
          {/*COPYRIGHTS*/}
          <br />
          <br />
          <h5 className='text-center'>
            MINISO Guatemala Ⓒ {new Date().getFullYear()} Todos los derechos
            reservados.
          </h5>
          {/*COPYRIGHTS*/}
        </div>
        {/*END FIRST DIV*/}
      </footer>
    </div>
  );
};

export default Footer;
