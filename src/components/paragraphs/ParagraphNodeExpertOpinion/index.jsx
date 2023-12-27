import React from "react";
import { graphql } from "gatsby";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";

export const ParagraphNodeExpertOpinion = ({ node }) => {
  return (
    <ContentReferenceCard
      title={node.title}
      imageURL={node?.relationships?.field_image?.gatsbyImage}
      eyebrowText={node?.relationships?.field_product_tags?.name}
      authorDetails={node?.relationships?.field_authors}
      field_theme={node?.relationships?.field_theme}
      field_region={node?.relationships?.field_region}
      field_country={node?.relationships?.field_country}
      linkTo={node?.fields?.slug}
    />
  );
};

export const fragment = graphql`
  fragment ParagraphNodeExpertOpinion on node__expert_opinion {
    title
    fields {
      slug
    }
    relationships {
      field_image {
        url
        gatsbyImage(width: 500, height: 300)
      }
      field_authors {
        name
        relationships {
          field_author_image {
            relationships {
              field_media_image {
                url
                gatsbyImage(width: 50)
              }
            }
          }
        }
      }
      field_country {
        name
      }
      field_product_tags {
        name
      }
      field_theme {
        name
      }
      field_region {
        name
      }
    }
  }
`;

export default ParagraphNodeExpertOpinion;
