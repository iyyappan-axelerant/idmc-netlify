import { graphql } from "gatsby";
import React from "react";
import { Parallax } from "react-parallax";
import "./paraHeaderImg.scss";

export const ParagraphHeaderImage = ({ node }) => {
  if (!node?.relationships?.field_image?.url) return null;
  return (
    <div className="paragraph-header-img my-5rem">
      {node?.relationships?.field_image?.url && (
        <Parallax
          bgImage={node?.relationships?.field_image?.url}
          strength={500}
        >
          <div
            style={{ height: node?.relationships?.field_image?.height }}
          ></div>
        </Parallax>
      )}

      <div className="captions-wrapper fst-italic">
        {node?.field_image_caption && <p>{node?.field_image_caption}</p>}
        {node?.field_image_credit && <p>{node?.field_image_credit}</p>}
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphParagraphHeaderImage on paragraph__paragraph_header_image {
    id
    relationships {
      field_image {
        height
        url
      }
    }
    field_image_credit
    field_image_caption
  }
`;

export default ParagraphHeaderImage;
