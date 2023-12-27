import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import TemplateLayout from "../../molecules/TemplateLayout";
import TemplateSidebar from "../../molecules/TemplateSidebar";
import "./ExpertOpinion.scss";
import HeroSection from "./HeroSection";
import { getParagraph } from "../../../utils/paragraphHelpers";

const ExtpertOpinion = ({ data }) => {
  const paragraphs =
    data?.nodeExpertOpinion?.relationships?.field_components?.map(getParagraph);
  const image = getImage(
    data?.nodeExpertOpinion?.nodeExpertOpinion?.relationships?.field_image
  );
  return (
    <Layout>
      <TemplateLayout image={image}>
        <div
          className={`ct-container-hero-section ${
            image ? "hero-section-m-image" : "hero-section-m-blue"
          }`}
        >
          {data?.nodeExpertOpinion && (
            <>
              <HeroSection data={data?.nodeExpertOpinion}></HeroSection>
              <TemplateSidebar
                data={data?.nodeExpertOpinion}
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

export default ExtpertOpinion;

export const pageQuery = graphql`
  query ($id: String!) {
    nodeExpertOpinion(id: { eq: $id }) {
      body {
        format
        processed
        summary
        value
      }
      title
      path {
        alias
      }
      field_published(formatString: "DD MMMM YYYY")
      moderation_state
      relationships {
        field_authors {
          path {
            alias
          }
          name
          field_designation
          relationships {
            field_author_image {
              relationships {
                field_media_image {
                  gatsbyImage(width: 58, height: 58, placeholder: BLURRED)
                }
              }
              field_media_image {
                alt
              }
            }
          }
        }
        field_image {
          gatsbyImage(width: 1640, height: 600)
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
        field_country {
          name
        }
        field_sidebar {
          field_component_title
          field_links {
            title
            url
          }
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
      }
      field_image {
        alt
        title
      }
      field_blog_intro {
        format
        processed
        value
      }
      field_subtitle {
        format
        processed
        value
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.nodeExpertOpinion?.title}
    image={data?.nodeExpertOpinion?.relationships?.field_metatag_image?.url}
  />
);
