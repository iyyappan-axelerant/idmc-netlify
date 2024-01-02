import React from "react";
import { graphql } from "gatsby";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";

export const ParagraphNodePartnerSpotlight = ({ node }) => {
  return (
    <ContentReferenceCard
      title={node.title}
      imageURL={node?.relationships?.field_metatag_image?.gatsbyImage}
      eyebrowText={node?.relationships?.field_product_tags?.name || "Spotlight"}
      field_theme={node?.relationships?.field_theme}
      field_region={node?.relationships?.field_region}
      linkTo={node?.fields?.slug}
    />
  );
};

export const fragment = graphql`
  fragment ParagraphNodePartnerSpotlight on node__partner_spotlight {
    title
    fields {
      slug
    }
    relationships {
      field_metatag_image {
        url
        gatsbyImage(width: 500, height: 300)
      }
      field_product_tags {
        name
      }
      field_theme {
        name
      }
    }
  }
`;

export default ParagraphNodePartnerSpotlight;
