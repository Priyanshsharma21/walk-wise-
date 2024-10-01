import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productShowcase } from "@/constants";

const Product = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {productShowcase.map((product) => (
          <div key={product.id} className="product-slide">
            <div className="product-img-wrapper">
              <img
                src={product.img}
                alt={product.title}
                className="product-img"
              />
              <div className="product-title-background">
                <h2>{product.title}</h2>
              </div>
            </div>
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Product;
