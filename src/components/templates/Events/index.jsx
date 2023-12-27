import { graphql } from "gatsby";
import React from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import { getImage } from "gatsby-plugin-image";
import TemplateLayout from "../../molecules/TemplateLayout";
import TemplateSidebar from "../../molecules/TemplateSidebar";
import HeroSection from "./HeroSection";
import { getParagraph } from "../../../utils/paragraphHelpers";

const Events = ({ data }) => {
  const paragraphs =
    data?.nodeEvents?.relationships?.field_components?.map(getParagraph);
  const image = getImage(data?.nodeEvents?.relationships?.field_image);
  return (
    <Layout>
      <TemplateLayout image={image}>
        <div
          className={`ct-container-hero-section ${
            image ? "hero-section-m-image" : "hero-section-m-blue"
          }`}
        >
          {data?.nodeEvents && (
            <>
              <HeroSection data={data?.nodeEvents}></HeroSection>
              <TemplateSidebar
                data={data?.nodeEvents}
                tagTitle={"TOPICS"}
              ></TemplateSidebar>
            </>
          )}
        </div>
      </TemplateLayout>
      <div className="pt-5">{paragraphs}</div>
    </Layout>
  );
};

export default Events;

export const pageQuery = graphql`
  query ($id: String!) {
    nodeEvents(id: { eq: $id }) {
      title
      field_subtitle {
        format
        processed
        value
      }
      body {
        value
      }
      relationships {
        field_image {
          gatsbyImage(width: 1640, height: 600)
        }
        field_product_tags {
          name
        }
        field_authors {
          name
          relationships {
            field_author_image {
              relationships {
                field_media_image {
                  gatsbyImage(width: 200)
                }
              }
            }
          }
          field_designation
        }
        field_theme {
          name
        }
        field_region {
          name
        }
        field_country {
          name
        }
        field_slide_image {
          gatsbyImage(width: 200)
        }
        field_components {
          type: __typename
          ...ParagraphParagraphTextBlock
          ...ParagraphParagraphHeaderImage
          ...ParagraphQuoteBlock
          ...ParagraphDepartmentBlockPeople
          ...ParagraphPartnerLogos
          ...ParagraphKeyPublications
          ...ParagraphTextWithBackgroundImage
          ...ParagraphSlideShowContentBlock
          ...ParagraphFlexibleColumn
          ...ParagraphMediaBlendContentBlock
          ...ParagraphLargeSliderContentBlock
          ...ParagraphLatestFeaturedContentBlock
          ...ParagraphMediaBeside
          ...ParagraphCarouselSlider
        }
        field_metatag_image {
          url
        }
        field_sidebar {
          field_component_title
          field_links {
            title
            url
          }
        }
      }
      field_published(formatString: "DD MMMM YYYY")
      field_published_year
      field_event_place
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.nodeEvents?.title}
    image={data?.nodeEvents?.relationships?.field_metatag_image?.url}
  />
);
