import { Container } from '@mui/material';
import React from 'react';
import classes from './Collections.module.css';

const Collections = () => {
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.LogoContainer}>
          <div className={classes.logo}>
            <img src='/img/brand/marvel.svg' alt='MINISO' />
          </div>
          <div className={classes.logo}>
            <img
              src='/img/brand/walt-disney-logo-png-symbol-2-Transparent-Images.png'
              alt='MINISO'
            />
          </div>
          <div className={classes.logo}>
            <img src='/img/brand/the-avengers.svg' alt='MINISO' />
          </div>
          <div className={classes.logo}>
            <img src='/img/brand/Plazasesamologo.svg' alt='MINISO' />
          </div>
          <div className={classes.logo}>
            <img src='/img/brand/We_Bare_Bears_wordmark.svg' alt='MINISO' />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collections;
