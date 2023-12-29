import { graphql } from "gatsby";
import React from "react";
import { Container, Row } from "react-bootstrap";
import "./ParagraphTextWithBackgroundImage.scss";
import ExtractRichText from "../../molecules/ExtractRichText";

export const ParagraphTextWithBackgroundImage = ({ node }) => {
  return (
    <div className="bg-container">
      <div
        className="bg-container-image"
        style={{
          backgroundImage: `url(${node?.relationships?.field_twb_background_image?.relationships?.field_media_image?.url})`,
        }}
      >
        <div className="bg-container-setter">
          <Container className="general-container p-0">
            <div className="bg-container-wrapper">
              <p className="bg-container-eyebrow">
                {node?.field_twb_title?.toUpperCase()}
              </p>
              <div className="bg-container-title">
                <ExtractRichText
                  richText={node?.field_twb_sub_title?.value}
                ></ExtractRichText>
              </div>
              {node?.field_twb_body?.value && (
                <div className="bg-container-body">
                  <ExtractRichText
                    richText={node?.field_twb_body?.value}
                  ></ExtractRichText>
                </div>
              )}
                <div className="ct-container-hero-button p-0">
                  {node?.relationships?.field_twb_cta_links?.map(
                    (item, key) => {
                      return (
                        <>
                          {item?.field_link?.title && (
                            <div key={key} className="pe-3 pb-3">
                              <a
                                href={item?.field_link?.url || "#"}
                                target={item?.field_link?.url ? "_blank" : ""}
                                className={`btn btn-${item?.field_cta_colour}`}
                              >
                                {item?.field_link?.title}
                              </a>
                            </div>
                          )}
                        </>
                      );
                    }
                  )}
                </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphTextWithBackgroundImage on paragraph__text_with_background_image {
    id
    field_twb_title
    field_twb_sub_title {
      format
      processed
      value
    }
    relationships {
      field_twb_background_image {
        relationships {
          field_media_image {
            url
          }
        }
      }
      field_twb_cta_links {
        field_link {
          title
          url
        }
        field_cta_colour
      }
    }
    field_twb_body {
      format
      processed
      value
    }
  }
`;
