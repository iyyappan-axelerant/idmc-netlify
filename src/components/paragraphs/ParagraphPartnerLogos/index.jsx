import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./partnerLogos.scss";
import { graphql } from "gatsby";

export const ParagraphPartnerLogos = ({ node }) => {
  const { field_with_thanks_title, relationships } = node;

  return (
    <div className="partner-logo mb-5">
      <Container className="general-container">
        <Row className="row-gap-3">
          <h2 className="my-5 partner-logo__title">{field_with_thanks_title}</h2>
          {relationships?.field_partner_logo?.map((logo) => {
            return (
              <>
                <Col xs="12" md="6" xl="3">
                  <div className="partner-logo__card">
                    <GatsbyImage loading="lazy" image={getImage(logo)} />
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphPartnerLogos on paragraph__with_thanks {
    id
    relationships {
      field_partner_logo {
        gatsbyImage(width: 325, fit: COVER, placeholder: BLURRED)
      }
    }
    field_with_thanks_title
  }
`;

export default ParagraphPartnerLogos;
