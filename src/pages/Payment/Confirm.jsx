import React, { Component } from "react";
import "./Form.css";
import "./Confirm.css";
import axios from "axios";

export class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  continue = (e) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        e.preventDefault();
        this.confirmPayment().then(() => {
          this.setState({ loading: false });
        });
      }
    );
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  confirmPayment = async () => {
    const {
      values: { cardname, cardnumber, codigo, date },
    } = this.props;

    let username = localStorage.getItem("username");
    let token = JSON.parse(localStorage.getItem("user")).access_token;

    var config = {
      method: "post",
      url: `http://3.16.73.177:9080/private/cart/end?userName=${username}`,
      headers: { Authorization: `Bearer ${token}`, crossDomain: true },
      data: {
        nombre: cardname,
        numCart: cardnumber,
        cvv: codigo,
        fechaExpira: date,
        ip: "192.168.211.88",
      },
    };

    console.log(config);
    const respuesta = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        alert("Error al realizar el pago");
        console.log(error);
      });

    console.log(respuesta);
    if (respuesta != undefined && respuesta.ok == true) {
      this.props.nextStep();
    }
  };

  render() {
    const {
      values: { cardname, cardnumber, codigo, date },
    } = this.props;

    return (
      <div className='form-container'>
        <h3 className='mb-5 text-center'>Confirmar Datos</h3>
        <ul class='list-group'>
          <li class='list-group-item'>
            Nombre del titular de la tarjeta: {cardname}
          </li>
          <li class='list-group-item'>Numero de Tarjeta: {cardnumber}</li>
          <li class='list-group-item'>Código de Seguridad (CVV): {codigo}</li>
          <li class='list-group-item'>Fecha de Expiración: {date}</li>
          {/*<li class='list-group-item'>Name: {name}</li>
          <li class='list-group-item'>Email: {email} </li>
          <li class='list-group-item'>Phone Number: {phone}</li>
          <li class='list-group-item'>Password: {password}</li>
          <li class='list-group-item'>
            Facebook URL: <a href={facebook}>{facebook}</a>
          </li>
          <li class='list-group-item'>
            Twitter URL: <a href={twitter}>{twitter}</a>
          </li>
          <li class='list-group-item'>
            Github URL: <a href={github}>{github}</a>
    </li>*/}
        </ul>
        <br />
        <div className='text-center'>
          {this.state.loading && (
            <span className='spinner-border spinner-border-lg'></span>
          )}
        </div>
        <div className='row'>
          <div className='col-6'>
            <button className='btn2' onClick={this.back}>
              Atrás
            </button>
          </div>
          <div className='col-6 confirmButton'>
            <button
              className='btn1'
              onClick={this.continue}
              disabled={this.state.loading}
            >
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
