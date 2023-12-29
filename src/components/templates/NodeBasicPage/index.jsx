import React from "react";
import Layout from "../../layout";
import { graphql } from "gatsby";
import { getParagraph } from "../../../utils/paragraphHelpers";
import { Container } from "react-bootstrap";
import ExtractRichText from "../../molecules/ExtractRichText";
import Seo from "../../atoms/seo";

function NodePage({ data, pageContext }) {
  const paragraphs = data?.page?.relationships.paragraphs.map(getParagraph);
  const { title, body, field_subtitle } = data?.page;
  const { pathSlug } = pageContext;

  return (
    <Layout>
      {pathSlug !== "/home" && (
        <Container className="general-container">
          {title && <h1 className="text-center my-5rem">{title}</h1>}
          {field_subtitle && (
            <ExtractRichText richText={field_subtitle?.value} />
          )}
        </Container>
      )}

      {paragraphs ? paragraphs : null}
      <Container className="general-container">
        {body && <ExtractRichText richText={body?.value} />}
      </Container>
    </Layout>
  );
}

export default NodePage;

export const pageQuery = graphql`
  query ($id: String!) {
    page: nodePage(id: { eq: $id }) {
      id
      title
      body {
        value
      }
      field_subtitle {
        value
      }
      relationships {
        field_metatag_image {
          url
        }
        field_product_tags {
          name
        }
        paragraphs: field_paragraph {
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
          ...ParagraphTabComponent
          ...ParagraphCountryMap
          ...ParagraphGenericAccordion
        }
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.page?.title}
    image={data?.page?.relationships?.field_metatag_image?.url}
  />
);
