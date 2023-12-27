import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";
import classNames from "classnames";

import "./latestFeaturedContentBlock.scss";

export const ParagraphLatestFeaturedContentBlock = ({ node }) => {
  const {
    field_component_title,
    field_heading,
    field_body,
    field_tags,
    field_link,
    field_published_date,
    field_background_color,
    relationships,
  } = node;

  const mainImage = getImage(
    relationships?.field_card_image?.relationships?.field_media_image
  );

  return (
    <>
      {field_component_title && (
        <div
          className={classNames(
            "latest-feature-content mb-5",
            `bg-clr-${field_background_color}`
          )}
        >
          <div className="container general-container">
            <h2 className="lfc-title text-center">{field_component_title}</h2>

            <div className="lfc-content">
              <div className="lfc-content-image">
                <GatsbyImage loading="lazy" image={mainImage} alt={field_component_title} />
              </div>
              <div className="lfc-content-details">
                <div className="lfc-content-details-meta">
                  <div className="lfc-content-details-meta-type">
                    {relationships?.field_product_tag?.name}
                  </div>
                  <div className="lfc-content-details-meta-published">
                    {field_published_date}
                  </div>
                </div>
                <Link to={field_link?.url}>
                  <h3 className="lfc-content-details-header">
                    {field_heading}
                  </h3>
                </Link>
                <ul className="lfc-content-details-authors">
                  {relationships?.field_author?.map((author) => (
                    <li>
                      <div className="lfc-content-author-thumb">
                        <GatsbyImage
                          loading="lazy"
                          image={getImage(
                            author?.relationships?.field_author_image
                              ?.relationships?.field_media_image
                          )}
                          alt={author?.name}
                        />
                      </div>
                      <div>{author?.name}</div>
                    </li>
                  ))}
                </ul>
                <div
                  className="lfc-content-details-rich-text mb-4"
                  dangerouslySetInnerHTML={{ __html: field_body?.value }}
                />
                <div className="lfc-content-details-tags">
                  {field_tags?.join("  |  ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const fragment = graphql`
  fragment ParagraphLatestFeaturedContentBlock on paragraph__latest_report_content_block {
    id
    field_body {
      value
    }
    field_component_title
    field_heading
    field_link {
      url
    }
    field_published_date
    field_tags
    relationships {
      field_author {
        name
        relationships {
          field_author_image {
            relationships {
              field_media_image {
                gatsbyImage(width: 50)
              }
            }
          }
        }
      }
      field_card_image {
        relationships {
          field_media_image {
            gatsbyImage(width: 500, height: 500)
          }
        }
      }
      field_product_tag {
        name
      }
    }
    field_background_color
  }
`;
