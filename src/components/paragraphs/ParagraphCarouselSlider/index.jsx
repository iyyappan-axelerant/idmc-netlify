import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";
import "./ParagraphCarouselSlider.scss";

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

export const ParagraphCarouselSlider = ({ node, data, theme }) => {
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

  const [result, setResult] = useState([]);
  useEffect(() => {
    const newTheme = theme?.map((item) => item?.id);
    const allContentTypes = Object?.values(data?.localSearchContentTypes?.store || {})
      ?.sort(
        (a, b) => new Date(b?.field_published) - new Date(a?.field_published)
      )
      ?.filter((item1) =>
        item1?.field_theme?.some((item2) => newTheme?.includes(item2?.id))
      );

    setResult(allContentTypes);
  }, [data]);

  return (
    <>
      <Container className="general-container pb-5 mb-4 ">
        {node?.field_component_title && (
          <>
            <h2 className="carousel-title px-2">
              {node?.field_component_title}
            </h2>
            <Slider {...settings}>
              {node?.relationships?.field_carousel_item?.map((item, key) => {
                return (
                  <div className="custom-slider" key={key}>
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
          </>
        )}
        {result?.length > 0 && (
          <>
            <h2 className="color-regalBlue px-2">Related articles:</h2>
            <Slider {...settings}>
              {result?.map((item, key) => {
                return (
                  <div className="custom-slider" key={key}>
                    <ContentReferenceCard
                      title={item?.title}
                      imageURL={item?.field_image?.gatsbyImage}
                      eyebrowText={item?.field_product_tags?.name || item?.type}
                      authorDetails={item?.field_authors}
                      fieldPublished={item?.field_published}
                      fieldEventPlace={item?.field_event_place}
                      fieldTimeFrame={item?.field_time_frame}
                      field_theme={item?.field_theme}
                      field_region={item?.field_region}
                      field_country={item?.field_country}
                      linkTo={item?.slug?.slug || item?.slug}
                    />
                  </div>
                );
              })}
            </Slider>
          </>
        )}
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
