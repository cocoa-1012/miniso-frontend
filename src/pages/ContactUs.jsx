import Container from '@mui/material/Container';
import React from 'react';
import ReactHelmet from '../components/Seo/ReactHelmet';
import classes from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <div>
      {/* <div className={classes.TopheaderContainer}>
        <div className={classes.ImgContainer}>
          <img
            className={classes.Image}
            src='./img/section_images/Banner Web 1980x995 1 Lo Nuevo.png'
            alt=''
          />
        </div>
      </div> */}
      <ReactHelmet title='Options' />

      <Container fixed>
        <div className={classes.Wrapper}>
          <h1>Contáctanos</h1>
          <p>
            16 calle 6-72 zona 10
            <br />
            Centro Comercial La Estación
            <br />
            Local N-L22 Primer Nivel.
            <br />
            2445-5689
            <br />
            hola@miniso.com.gt
          </p>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
