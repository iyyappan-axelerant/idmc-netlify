import { graphql } from "gatsby";
import React from "react";
import { Container } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ParagraphLargeSliderContentBlock.scss";

export const ParagraphLargeSliderContentBlock = ({ node }) => {
  return (
    <Container className="general-container mb-5 p-0 my-5rem">
      <h2 className="ls">{node?.field_ls_component_title}</h2>
      <div className="ls-slide-wrapper">
        <div className="ls-slide-wrapper-image">
          <img
            loading="lazy"
            className="w-100 h-100 object-fit-cover"
            src={
              node?.relationships?.field_ls_slider_image?.relationships
                ?.field_media_image?.url
            }
            alt="image"
          />
        </div>
        <div
          className={`ls-slide-wrapper-body btn-clr-${node?.field_ls_background_color}`}
        >
          <div>
            <div className="ls-eyebrow">
              {node?.relationships?.field_ls_product_tag?.name?.toUpperCase()}
            </div>
            <h3 className="ls-title"> {node?.field_ls_title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: node?.field_ls_body?.value,
              }}
              className="ls-subtitle"
            ></div>
            <div className="ls-button p-0">
              {node?.relationships?.field_ls_cta_links?.map((item, key) => {
                return (
                  <>
                    {item?.field_link?.title && (
                      <div key={key} className="me-3 mb-3">
                        <a
                          href={item?.field_link?.url}
                          target={"_blank"}
                          className={`btn btn-${item?.field_cta_colour}`}
                        >
                          {item?.field_link?.title}
                        </a>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const fragment = graphql`
  fragment ParagraphLargeSliderContentBlock on paragraph__large_slider_content_block {
    id
    field_ls_component_title
    field_ls_title
    field_ls_background_color
    relationships {
      field_ls_product_tag {
        name
      }
      field_ls_slider_image {
        relationships {
          field_media_image {
            url
          }
        }
      }
      field_ls_cta_links {
        field_link {
          title
          url
        }
        field_cta_colour
      }
    }
    field_ls_body {
      format
      processed
      value
    }
  }
`;
