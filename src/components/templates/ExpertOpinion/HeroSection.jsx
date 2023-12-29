import React from "react";
import { Container } from "react-bootstrap";
import ExtractRichText from "../../molecules/ExtractRichText";
import Author from "../../molecules/Author";

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
          <p className="eyebrow-date">{data?.field_published?.toUpperCase()}</p>
        </div>
        <div>
          {data?.title && (
            <h1 className="ct-container-hero-title">{data?.title}</h1>
          )}
          {data?.field_blog_intro?.value && (
            <div id="sub-title" className="ct-container-hero-sub-title">
              <ExtractRichText
                richText={data?.field_blog_intro?.value?.toUpperCase()}
              ></ExtractRichText>
            </div>
          )}
          {data?.field_subtitle?.value && !data?.field_blog_intro?.value && (
            <div id="sub-title" className="ct-container-hero-sub-title">
              <ExtractRichText
                richText={data?.field_subtitle?.value?.toUpperCase()}
              ></ExtractRichText>
            </div>
          )}

          <div
            className={`hero-author ${
              data?.relationships?.field_authors?.length > 0
                ? "hero-author-divider"
                : "hero-author-divide"
            } `}
          >
            {data?.relationships?.field_authors?.map((item, key) => {
              return (
                <>
                  <div key={key} className="my-1 me-1">
                    <a className="hero-author-body" href={item?.path?.alias}>
                      <Author
                        name={item?.name}
                        designation={item?.field_designation}
                        image={item?.relationships?.field_author_image?.relationships?.field_media_image}
                        nameClasses="hero-author-title"
                        designationClasses="hero-author-designation"
                      />
                    </a>
                    {key < data?.relationships?.field_authors?.length - 1 && (
                      <div className="divide"></div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div>
            {data?.body?.value && (
              <div
                className="ct-container-body"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.value,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
