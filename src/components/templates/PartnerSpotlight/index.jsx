import { graphql } from "gatsby";
import React from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import { Container } from "react-bootstrap";
import { getParagraph } from "../../../utils/paragraphHelpers";
import ExtractRichText from "../../molecules/ExtractRichText";

const PartnerSpotlight = ({ data }) => {
  const paragraphs =
    data?.nodePartnerSpotlight?.relationships?.field_spotlight_content?.map(
      getParagraph
    );
  return (
    <Layout>
      <Container className="general-container">
        {data?.nodePartnerSpotlight?.title && (
          <h1 className="text-center my-5rem">
            {data?.nodePartnerSpotlight?.title}
          </h1>
        )}
        {data?.nodePartnerSpotlight?.field_subtitle && (
          <ExtractRichText
            richText={data?.nodePartnerSpotlight?.field_subtitle?.value}
          />
        )}
      </Container>
      {paragraphs}
    </Layout>
  );
};

export default PartnerSpotlight;

export const pageQuery = graphql`
  query ($id: String!) {
    nodePartnerSpotlight(id: { eq: $id }) {
      title
      field_subtitle {
        value
      }
      relationships {
        field_spotlight_content {
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
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.nodePartnerSpotlight?.title}
    image={data?.nodePartnerSpotlight?.relationships?.field_metatag_image?.url}
  />
);
