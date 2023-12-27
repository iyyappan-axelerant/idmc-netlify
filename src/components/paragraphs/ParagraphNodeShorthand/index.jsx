import React from "react";
import { graphql } from "gatsby";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";

export const ParagraphNodeShorthand = ({ node }) => {
  return (
    <ContentReferenceCard
      title={node.title}
      imageURL={node?.relationships?.field_image?.gatsbyImage}
      eyebrowText={node?.relationships?.field_product_tags?.name || "Shorthand"}
      authorDetails={node?.relationships?.field_authors}
      field_country={node?.relationships?.field_country}
      field_theme={node?.relationships?.field_theme}
      linkTo={node?.field_iframe_url}
      type="Shorthand"
    />
  );
};

export const fragment = graphql`
  fragment ParagraphNodeShorthand on node__shorthand {
    title
    field_iframe_url
    relationships {
      field_region {
        name
      }
      field_product_tags {
        name
      }
      field_country {
        name
      }
      field_authors {
        name
      }
    }
  }
`;

export default ParagraphNodeShorthand;
