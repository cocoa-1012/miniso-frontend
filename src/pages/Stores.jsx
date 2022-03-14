import React from "react";
import classes from "./TheNew.module.css";

const Stores = () => {
  return (
    <section>
      <div className={classes.Container}>
        <div className={classes.ImgContainer}>
          <img
            className={classes.Image}
            src='./img/section_images/web-tiendas.png'
            alt=''
          />
        </div>
      </div>
      <h1>Tiendas</h1>
    </section>
  );
};

export default Stores;
