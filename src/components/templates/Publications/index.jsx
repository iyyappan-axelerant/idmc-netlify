import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import TemplateLayout from "../../molecules/TemplateLayout";
import TemplateSidebar from "../../molecules/TemplateSidebar";
import HeroSection from "./HeroSection";
import { getImage } from "gatsby-plugin-image";
import ContentReferenceCard from "../../molecules/Cards/ContentReference";
import { Container, Row, Col } from "react-bootstrap";

const Publications = ({ data }) => {
  const image = getImage(
    data?.nodePublications?.relationships?.field_header_image?.relationships
      ?.field_media_image
  );

  const { field_theme } = data?.nodePublications?.relationships;

  const [allData, setAllData] = useState();

  useEffect(() => {
    if (window) {
      setAllData(window?.__FLEXSEARCH__?.en?.store);
    }
  }, []);

  let results = [];
  let types = [
    "publications",
    "events",
    "shorthand",
    "partner_spotlight",
    "expert_opinion",
    "media_center",
    "database_page",
  ];

  let filteredTheme = [];

  allData?.map((data) => {
    data?.node?.theme?.filter((theme) => {
      if (
        theme.drupal_internal__target_id == field_theme[0].drupal_internal__tid
      ) {
        filteredTheme.push(data);
      }
    });
  });

  types.map((type) => {
    let i = 0;

    filteredTheme.map((data) => {
      if (i < 1) {
        if (data.node.type == type) {
          results.push(data);
          i++;
        }
      }
    });
  });

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
        <>
          <Container className="my-5">
            <h2 className="mb-5">Related Content</h2>

            <Row>
              {results?.map((result) => (
                <Col xs={12} md={6} xl={4}>
                  <ContentReferenceCard
                    title={result?.node.title}
                    imageURL={
                      result?.node?.relationships?.field_image?.gatsbyImage
                    }
                    eyebrowText={
                      result?.node?.relationships?.field_product_tags?.name
                    }
                    authorDetails={result?.node?.relationships?.field_authors}
                    field_theme={result?.node?.relationships?.field_theme}
                    field_region={result?.node?.relationships?.field_region}
                    field_country={result?.node?.relationships?.field_country}
                    linkTo={result?.node?.url}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      </TemplateLayout>
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
          drupal_internal__tid
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
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.nodePublications?.title}
    image={data?.nodePublications?.relationships?.field_metatag_image?.url}
  />
);
