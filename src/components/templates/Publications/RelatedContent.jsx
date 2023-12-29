import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./publications.scss";
import { graphql } from "gatsby";
import ExtractRichText from "../../molecules/ExtractRichText";
import { getConcatOf } from "../../../utils/miscUtils";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";
import Slider from "react-slick";

const HeroSection = ({ data }) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const concats = getConcatOf([
      Object.values(data?.localSearchPublications?.store)?.[0] || {},
      Object.values(data?.localSearchExpertopinions?.store)?.[0] || {},
      Object.values(data?.localSearchShorthand?.store)?.[0] || {},
      Object.values(data?.localSearchEvents?.store)?.[0] || {},
      Object.values(data?.localSearchPartnerSpotlight?.store)?.[0] || {},
      Object.values(data?.localSearchGoodPractice?.store)?.[0] || {},
    ]);

    setResult(concats);
  }, [data]);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    touchMove: true,
    dots: true,
  };

  return (
    <Container className="general-container p-0 mb-5">
      <div className="d-related">
        <Row>
          <div>
            <h2 className="mb-5">Related Content</h2>
            <a className="view" href="/search">
              View more
              <img src="/icons/Long_arrow.svg" alt="" />
            </a>
          </div>
          {result?.map((item) => {
            return (
              <Col xs={12} md={6} xl={4} className="mb-5">
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
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="m-related">
        <h2 className="mb-5">Related Content</h2>
        <a className="view" href="/search">
          View more
          <img src="/blue-arrow-underline.svg" alt="" />
        </a>
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
      </div>
    </Container>
  );
};

export default HeroSection;

export const pageQuery = graphql`
  query {
    localSearchPublications {
      store
    }
    localSearchExpertopinions {
      store
    }
    localSearchShorthand {
      store
    }
    localSearchEvents {
      store
    }
    localSearchPartnerSpotlight {
      store
    }
    localSearchGoodPractice {
      store
    }
  }
`;
