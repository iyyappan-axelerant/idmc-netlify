import React from "react";
import { Container } from "react-bootstrap";
import ExtractRichText from "../../molecules/ExtractRichText";

const HeroSection = ({ data }) => {
  return (
    <Container className="general-container p-0">
      <div className="ct-container-hero-box-l">
        <div className="eyebrow">
          {data?.relationships?.field_product_tags?.name && (
            <p className="eyebrow-title">
              {data?.relationships?.field_product_tags?.name?.toUpperCase()}
            </p>
          )}
          {data?.relationships?.field_product_tags?.name &&
            data?.field_published && <span className="eyebrow-divider"></span>}
          {data?.field_published && (
            <p className="eyebrow-date">
              {data?.field_published?.toUpperCase()}
            </p>
          )}
          {data?.field_event_place && (
            <p className="eyebrow-place">
              <span className="eyebrow-hyphen">&nbsp;-</span>{" "}
              {data?.field_event_place?.toUpperCase()}
            </p>
          )}
        </div>
        <div>
          {data?.title && (
            <div className="ct-container-hero-title">{data?.title}</div>
          )}
          {data?.field_subtitle?.value && (
            <div className="ct-container-hero-sub-title">
              <ExtractRichText
                richText={data?.field_subtitle?.value?.toUpperCase()}
              ></ExtractRichText>
            </div>
          )}
          <div className="hr mb-4"></div>
          <div>
            {data?.body?.value && (
              <div className="ct-container-body">
                <ExtractRichText richText={data?.body?.value}></ExtractRichText>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
