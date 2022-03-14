import React, { Component } from "react";
import "./Form.css";
//import axios from "axios";

export class AccountSetup extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, inputChange } = this.props;

    return (
      <div className='form-container'>
        <h3 className='mb-5 text-center'>Datos de Pago</h3>
        <div className='form.group'>
          <label htmlFor='cardname'>Nombre del titular de la tarjeta</label>
          <input
            type='text'
            className='form-control'
            name='cardname'
            onChange={inputChange("cardname")}
            value={values.cardname}
          />
        </div>
        <div className='form.group'>
          <label htmlFor='cardnumber'>Número de Tarjeta</label>
          <input
            type='text'
            className='form-control'
            name='cardnumber'
            onChange={inputChange("cardnumber")}
            value={values.cardnumber}
          />
        </div>
        <div className='form.group'>
          <label htmlFor='codigo'>Código de Seguridad (CVV)</label>
          <input
            type='password'
            className='form-control'
            name='codigo'
            onChange={inputChange("codigo")}
            value={values.codigo}
          />
        </div>
        <div className='form.group'>
          <label htmlFor='date'>Fecha de Expiración</label>
          <input
            type='text'
            className='form-control'
            name='date'
            placeholder='mm/yy'
            onChange={inputChange("date")}
            value={values.date}
          />
        </div>
        <br />
        <div className='text-right'>
          <button className='bTnProperty' onClick={this.continue}>
            Continuar
          </button>
        </div>
      </div>
    );
  }
}

export default AccountSetup;
