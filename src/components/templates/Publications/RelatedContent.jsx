import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";
import "./publications.scss";

const RelatedContent = ({ data, theme }) => {
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
    <>
      {result?.length > 0 && (
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
              {result?.map((item, key) => {
                if (key < 6) {
                  return (
                    <Col key={key} xs={12} md={6} xl={4} className="mb-5">
                      <ContentReferenceCard
                        title={item?.title}
                        imageURL={item?.field_image?.gatsbyImage}
                        eyebrowText={
                          item?.field_product_tags?.name || item?.type
                        }
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
                }
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
                if (key < 6) {
                  return (
                    <div className="custom-slider" key={key}>
                      <ContentReferenceCard
                        title={item?.title}
                        imageURL={item?.field_image?.gatsbyImage}
                        eyebrowText={
                          item?.field_product_tags?.name || item?.type
                        }
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
                }
              })}
            </Slider>
          </div>
        </Container>
      )}
    </>
  );
};

export default RelatedContent;
