import { graphql } from "gatsby";
import React, { useEffect, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../layout";

const DatabasePage = ({ data }) => {

  return (
    <>
    <Layout>
      <Container className="database-container">
        <Row>
          <Col>      
            <div dangerouslySetInnerHTML={{ __html: data.nodeDatabasePage.body.value }} />
          </Col>
        </Row>
      </Container>
    </Layout>
    </>
  );
};

export default DatabasePage;

export const pageQuery = graphql`
  query ($id: String!) {
    nodeDatabasePage(id: { eq: $id }) {
        title
        body {
          value
        }
    }
  }
`;