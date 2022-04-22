import React, { useState } from 'react';
import styled from 'styled-components';
import AddressForm from './AddressForm';
import classes from './Profile.module.css';

const Profile = () => {
  const [formShow, setFromShow] = useState(false);
  return (
    <div className='container'>
      <h1 className={classes.Title}>Hola Bienvenido a Miniso</h1>
      <div className='text-center'>
        <Button onClick={() => setFromShow((prev) => !prev)}>
          Crear una Dirección
        </Button>
      </div>
      {formShow && <AddressForm setFromShow={setFromShow} />}
    </div>
  );
};

export default Profile;

const Button = styled.button`
  padding: 0.5rem;
  font-family: inherit;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  margin-top: 0;
  background-color: #e71425;
  color: #ffffff;
  border: 2px solid #e71425;
  border-radius: 4px;
  transition: background 200ms ease-in, color 200ms ease-in;

  &:hover {
    background-color: transparent;
    border: 2px solid #e71425;
    color: #e71425;
    cursor: pointer;
  }
`;
