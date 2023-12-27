import React from "react";
import { graphql } from "gatsby";
import { getParagraph } from "../../../utils/paragraphHelpers";
import { Col, Container, Row } from "react-bootstrap";
import "./paraKeyPublications.scss";

export const ParagraphKeyPublications = ({ node }) => {
  const paragraphs =
    node?.relationships?.field_key_publication?.map(getParagraph);

  return (
    <>
      {paragraphs && (
        <div
          className={`para-key-publications bg-clr-${node?.field_background_color}`}
        >
          <Container className="general-container">
            <Row className="row-gap-5">
              {paragraphs?.map((paragraph) => {
                return (
                  <Col xs={12} md={6} xl={4}>
                    {paragraph}
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export const fragment = graphql`
  fragment ParagraphKeyPublications on paragraph__key_publications {
    id
    field_background_color
    relationships {
      field_key_publication {
        publicationType: __typename
        ...ParagraphNodeExpertOpinion
        ...ParagraphNodeMediaCentre
        ...ParagraphNodePublication
        ...ParagraphNodeShorthand
      }
    }
  }
`;

export default ParagraphKeyPublications;
