import React from "react";

import AuthService from "../../../services/auth.service";
import classes from "./Profile.module.css";

const Profile = () => {
  // const currentUser = AuthService.getCurrentUser();
  const currentUsername = AuthService.getCurrentUsername();

  return (
    <div className='container'>
      <h1 className={classes.Title}>Hola Bienvenido a Miniso</h1>
      {/*<header className='jumbotron'>
        <h3>
          <strong>Nombre de Usuario{currentUsername}</strong> Profile
        </h3>
  </header>*/}
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>*/}
    </div>
  );
};

export default Profile;
