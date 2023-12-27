import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Row } from "react-bootstrap";

const TemplateLayout = ({ image, children }) => {
  return (
    <div className="temp-container max-width-setter-secondary">
      <Row className="temp-container-hero">
        {image ? (
          <GatsbyImage loading="lazy" className="temp-container-image" image={image} alt="banner-image"></GatsbyImage>
        ) : (
          <div className="temp-container-hero-image"></div>
        )}
        <Row className=" m-0 p-0 ct-container-hero">{children}</Row>
      </Row>
    </div>
  );
};

export default TemplateLayout;
