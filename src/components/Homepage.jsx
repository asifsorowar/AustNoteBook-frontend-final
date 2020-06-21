import React from "react";
import _ from "lodash";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
} from "../sliderImages";

const Homepage = () => {
  const images = [
    { image: image1, alt: "image1" },
    { image: image2, alt: "image2" },
    { image: image3, alt: "image3" },
    { image: image4, alt: "image4" },
    { image: image6, alt: "image6" },
    { image: image7, alt: "image7" },
    { image: image8, alt: "image8" },
    { image: image9, alt: "image9" },
    { image: image10, alt: "image10" },
  ];

  return (
    <div className="row h-100 w-100 justify-content-center align-items-center p-0 m-0">
      <div
        id="carouselExampleIndicators"
        className="carousel slide col-lg-10 col-11"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          {_.range(1, images.length + 1).map((i) => (
            <li
              data-target="#carouselExampleIndicators"
              key={i}
              data-slide-to={i}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={image5} className="d-block w-100" alt="image5" />
          </div>
          {images.map((image) => (
            <div className="carousel-item" key={image.image}>
              <img
                src={image.image}
                className="d-block w-100"
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
