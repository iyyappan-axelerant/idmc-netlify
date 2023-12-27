import React from "react";
import { graphql } from "gatsby";
import { Container } from "react-bootstrap";
import "./ParagraphCarouselSlider.scss";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";
import Slider from "react-slick";

const HandlePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`arrow ${className}`} onClick={onClick}>
      <img src="/prev-arrow.svg" alt="" />
    </div>
  );
};

const HandleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`arrow ${className} me-2`} onClick={onClick}>
      <img loading="lazy" src="/next-arrow.svg" alt="" />
    </div>
  );
};

export const ParagraphCarouselSlider = ({ node }) => {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    infinite: true,
    prevArrow: <HandlePrevArrow />,
    nextArrow: <HandleNextArrow />,
    touchMove: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          touchMove: true,
        },
      },
    ],
  };
  return (
    <>
      <Container className="general-container pb-5 mb-4 ">
        <h2 className="carousel-title px-2">{node?.field_component_title}</h2>
        <Slider className="" {...settings}>
          {node?.relationships?.field_carousel_item?.map((item, key) => {
            return (
              <div key={key}>
                <ContentReferenceCard
                  title={item?.field_heading}
                  linkTo={item?.field_link?.url}
                  imageURL={
                    item?.relationships?.field_card_image?.relationships
                      ?.field_media_image?.gatsbyImage
                  }
                  eyebrowText={item?.relationships?.field_product_tag?.name}
                  introText={item?.field_summary}
                />
              </div>
            );
          })}
        </Slider>
      </Container>
    </>
  );
};

export const fragment = graphql`
  fragment ParagraphCarouselSlider on paragraph__carousel_slider {
    field_component_title
    relationships {
      field_carousel_item {
        field_heading
        field_summary {
          value
        }
        relationships {
          field_card_image {
            relationships {
              field_media_image {
                gatsbyImage(width: 380, height: 360)
              }
            }
          }
          field_product_tag {
            name
          }
        }
        field_link {
          url
        }
      }
    }
  }
`;
