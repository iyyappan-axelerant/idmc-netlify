import React from "react";
import { graphql } from "gatsby";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";

export const ParagraphNodeCountryProfile = ({ node }) => {
  return (
    <ContentReferenceCard
      title={node.title}
      imageURL={node?.relationships?.field_image?.gatsbyImage}
      eyebrowText={node?.relationships?.field_product_tags?.name || "Country Profile"}
      authorDetails={node?.relationships?.field_authors}
      field_country={node?.relationships?.field_country}
      field_theme={node?.relationships?.field_theme}
      linkTo={node?.field_iframe_url}
      type="Country Profile"
    />
  );
};

export const fragment = graphql`
  fragment ParagraphNodeCountryProfile on node__country_profile {
    title
  }
`;

export default ParagraphNodeCountryProfile;
