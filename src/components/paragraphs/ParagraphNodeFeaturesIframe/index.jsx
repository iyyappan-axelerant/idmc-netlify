import React from "react";
import { graphql } from "gatsby";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";

export const ParagraphNodeFeaturesIframe = ({ node }) => {
  return (
    <ContentReferenceCard
      title={node.title}
      imageType="url"
      imageURL={node?.relationships?.field_image?.url}
      eyebrowText={node?.relationships?.field_product_tags?.name || "Feature"}
      field_theme={node?.relationships?.field_theme}
      field_region={node?.relationships?.field_region}
      linkTo={node?.fields?.slug}
    />
  );
};

export const fragment = graphql`
  fragment ParagraphNodeFeaturesIframe on node__iframe {
    title
    fields {
      slug
    }
    relationships {
      field_product_tags {
        name
        id
      }
      field_theme {
        name
        id
      }
      field_authors {
        name
        id
      }
      field_country {
        name
        id
      }
      field_region {
        name
        id
      }
      field_image {
        url
        gatsbyImage(width: 10)
      }
    }
  }
`;

export default ParagraphNodeFeaturesIframe;
