import { graphql } from "gatsby";
import React, { useEffect, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../layout";
import { Helmet } from "react-helmet"

const CountryProfile = ({ data }) => {

  // Keep the function reference
  const setWindowParams = useCallback(() => {
    window.page = "country-profile";
    window.iso3 = data.nodeCountryProfile.field_iso3_code;
    window.countryName = data.nodeCountryProfile.title;
  },[data])

  useEffect(() => {
    setWindowParams();
  }, [setWindowParams]);

  return (
    <>
    <Helmet>
      <script defer src={`${process.env.REACT_COMPONENT_DOMAIN}js/runtime.bundle.js`}></script>
      <script defer src={`${process.env.REACT_COMPONENT_DOMAIN}js/main.bundle.js`}></script>
      <link rel="stylesheet" href={`${process.env.REACT_COMPONENT_DOMAIN}css/main.css`}/>
    </Helmet>
    <Layout>
      <Container className="external-article-container">
        <Row>
          <Col>              
            <div id="app-container" ></div>
          </Col>
        </Row>
      </Container>
    </Layout>
    </>
  );
};

export default CountryProfile;

export const pageQuery = graphql`
  query ($id: String!) {
    nodeCountryProfile(id: { eq: $id }) {
        field_iso3_code
        title
    }
  }
`;