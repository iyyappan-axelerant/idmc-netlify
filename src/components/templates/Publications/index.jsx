import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import TemplateLayout from "../../molecules/TemplateLayout";
import TemplateSidebar from "../../molecules/TemplateSidebar";
import HeroSection from "./HeroSection";
import RelatedContent from "./RelatedContent";

const Publications = ({ data }) => {
  const image = getImage(
    data?.nodePublications?.relationships?.field_header_image?.relationships
      ?.field_media_image
  );

  return (
    <Layout>
      <TemplateLayout image={image}>
        <div
          className={`ct-container-hero-section ${
            image ? "hero-section-m-image" : "hero-section-m-blue"
          }`}
        >
          {data?.nodePublications && (
            <>
              <HeroSection data={data?.nodePublications}></HeroSection>
              <TemplateSidebar
                data={data?.nodePublications}
                tagTitle={"TAGS AND CATEGORIES OF THIS PAGE"}
              ></TemplateSidebar>
            </>
          )}
        </div>
      </TemplateLayout>
      <RelatedContent
        data={data}
        theme={data?.nodePublications?.relationships?.field_theme}
      ></RelatedContent>
    </Layout>
  );
};

export default Publications;

export const pageQuery = graphql`
  query ($id: String!) {
    nodePublications(id: { eq: $id }) {
      node_type {
        drupal_internal__target_id
      }
      id
      path {
        alias
      }
      title
      field_secondary_cta {
        title
        url
      }
      field_published(formatString: "DD MMMM YYYY")
      body {
        format
        processed
        summary
        value
      }
      path {
        alias
      }
      title
      field_document {
        description
        display
        links {
          help {
            href
            meta {
              about
            }
          }
        }
      }
      field_subtitle {
        value
      }
      field_other_publications {
        description
      }
      relationships {
        field_document {
          uri {
            url
          }
          url
        }
        field_header_image {
          relationships {
            field_media_image {
              gatsbyImage(width: 1640, height: 600)
            }
          }
        }
        field_product_tags {
          name
        }
        field_theme {
          name
          id
        }
        field_region {
          name
        }
        field_country {
          name
        }
        field_image {
          url
        }
        field_other_publications {
          uri {
            url
          }
          url
        }
        field_sidebar {
          field_component_title
          field_links {
            title
            url
          }
        }
        field_metatag_image {
          url
        }
      }
    }
    localSearchPublications {
      store
    }
    localSearchExpertopinions {
      store
    }
    localSearchShorthand {
      store
    }
    localSearchEvents {
      store
    }
    localSearchPartnerSpotlight {
      store
    }
    localSearchGoodPractice {
      store
    }
    localSearchContentTypes {
      store
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.nodePublications?.title}
    image={data?.nodePublications?.relationships?.field_metatag_image?.url}
  />
);
