import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./publications.scss";
import ExtractRichText from "../../molecules/ExtractRichText";

const HeroSection = ({ data, children }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(
      document?.getElementById("subtitle")?.innerText?.split("")?.length
    );
  });
  return (
    <Container className="general-container p-0">
      <div className="ct-container-hero-box-l">
        <div className="eyebrow">
          <p className="eyebrow-title">
            {data?.relationships?.field_product_tags?.name?.toUpperCase() ||
              "PUBLICATIONS"}
          </p>
          {data?.field_published && (
            <>
              <span className="eyebrow-divider"></span>
              <p className="eyebrow-date">
                {data?.field_published?.toUpperCase()}
              </p>
            </>
          )}
        </div>
        <div>
          {data?.title && (
            <h1 className="ct-container-hero-title">{data?.title}</h1>
          )}
          {data?.field_subtitle?.value && (
            <div id="sub-title" className="ct-container-hero-sub-title">
              <ExtractRichText
                richText={data?.field_subtitle?.value?.toUpperCase()}
              ></ExtractRichText>
            </div>
          )}
          {(data?.relationships?.field_document?.url ||
            data?.relationships?.field_other_publications[0]?.url ||
            data?.field_secondary_cta?.url) && (
            <div className="ct-container-hero-button">
              {data?.field_document?.description && (
                <div className="me-3 mb-3">
                  <a
                    href={data?.relationships?.field_document?.url}
                    className="btn btn-disasterPacificBlue"
                  >
                    {data?.field_document?.description}
                  </a>
                </div>
              )}
              <div>
                {(data?.relationships?.field_other_publications?.[0]?.url ||
                  data?.field_secondary_cta?.url) && (
                  <a
                    target="_blank"
                    href={
                      data?.relationships?.field_other_publications?.[0]?.url ||
                      data?.field_secondary_cta?.url
                    }
                    className="btn btn-white"
                  >
                    {data?.field_other_publications?.[0]?.description ||
                      data?.field_secondary_cta?.title}
                  </a>
                )}
              </div>
            </div>
          )}
          <div className="hr-y"></div>
          <div>
            <div className={`hero-body ${count > 650 ? "" : "d-flex"} `}>
              {data?.relationships?.field_image?.url && (
                <div
                  className={`hero-body-image ${count > 650 ? "f-left" : ""}`}
                >
                  <img
                    loading="lazy"
                    className="w-100 object-fit-cover"
                    src={data?.relationships?.field_image?.url}
                    alt="image"
                  />
                </div>
              )}
              <div id="subtitle" className="ct-container-body">
                <ExtractRichText
                  richText={data?.body?.processed}
                ></ExtractRichText>
              </div>
            </div>

            {children && children}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
