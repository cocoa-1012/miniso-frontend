import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MultiItemCarousel.css";
//import { multiData } from "../../../data";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Container } from "@mui/material";
import classes from "./MultiItemCarousel.module.css";
import axios from "axios";

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "blue", fontSize: "25px" }} />
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "blue", fontSize: "25px" }} />
    </div>
  );
};

const MultiItemCarousel = () => {
  const [state, setState] = React.useState(false);

  const [slides, setSlides] = useState([]);
  let url =
    "http://3.16.73.177:9080/public/products/carrusel?carrusel=CARRUSEL1";

  useEffect(() => {
    getSlides();
  }, []);

  const getSlides = async () => {
    const res = await axios.get(url, {
      crossDomain: true,
    });
    setSlides(res.data.body);
  };

  return (
    <Container>
      <div className='Wrapper'>
        <div style={{ margin: "30px" }}>
          <h1>Ofertas</h1>
          <Slider
            prevArrow={<PreviousBtn />}
            nextArrow={<NextBtn />}
            slidesToShow={4}
            infinite={false}
            slidesToScroll={4}
          >
            {slides.map((slide) => (
              <Card slide={slide} />
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

const Card = ({ slide }) => {
  const imagen = slide.url;

  return (
    <div style={{ textAlign: "center" }}>
      <Link
        to={`/product/${slide.productosPkDto.codInt}/${slide.productosPkDto.barra}`}
        style={{
          textDecoration: "none",
        }}
      >
        <img
          className='multi_image'
          src={imagen + "-1.jpg"}
          alt=''
          style={{
            width: "100%",
            height: "190px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />
        <p className={classes.Description}>{slide.descripcion}</p>
        <p className={classes.Price}>Q.{slide.precio}</p>
        {/*<p style={{ fontSize: "14px", padding: "5px 0", color: "gray" }}>
        Up To $ 5000.00 off on HDFC
    </p>*/}
      </Link>
    </div>
  );
};

export default MultiItemCarousel;
