import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "./quoteBlock.scss";
import { Container } from "react-bootstrap";

export const ParagraphQuoteBlock = ({ node }) => {
  const { field_quote_name, field_quote_text, field_quote_pos_org } = node;
  const image = getImage(
    node?.relationships?.field_quote_image?.relationships?.field_media_image
  );

  return (
    <div>
      {field_quote_text?.processed && (
        <Container className="quote-container general-container m-auto my-5rem">
          <img loading="lazy" className="quote-img" src="/icons/quote.svg" alt="quote" />
          <div
            className="quote-content"
            dangerouslySetInnerHTML={{ __html: field_quote_text?.processed }}
          />
          <div className="quote-person">
            {image && (
              <GatsbyImage
                loading="lazy"
                className="quote-person-image"
                image={image}
                alt={field_quote_name}
              />
            )}
            <div>
              {field_quote_name && (
                <h4 className="quote-person-name">{field_quote_name}</h4>
              )}
              {field_quote_pos_org && (
                <p className="quote-person-org">{field_quote_pos_org}</p>
              )}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphQuoteBlock on paragraph__quote1 {
    id
    field_quote_name
    field_quote_pos_org
    field_quote_text {
      processed
    }
    relationships {
      field_quote_image {
        relationships {
          field_media_image {
            gatsbyImage(width: 110)
          }
        }
      }
    }
  }
`;