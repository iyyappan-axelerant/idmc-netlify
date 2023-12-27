import { graphql } from "gatsby";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../layout";
import Seo from "../../atoms/seo";
import './ExternalArticle.scss'

const ExternalArticle = ({ data }) => {
  return (
    <Layout>
      <Container className="external-article-container">
        <Row>
          <Col>
            <h1>{data?.nodeExternalArticle?.title}</h1>
            {data?.nodeExternalArticle?.field_publisher && (
              <p>Submitted by {data?.nodeExternalArticle?.field_publisher}</p>
            )}
            <b>Published date</b>
            <p>{data?.nodeExternalArticle?.field_published}</p>
            <b>External url</b>
            <br />
            <a
              className="hover-text-color"
              href={data?.nodeExternalArticle?.field_url?.uri}
              target="_blank"
            >
              {data?.nodeExternalArticle?.field_url?.title}
            </a>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ExternalArticle;

export const pageQuery = graphql`
  query ($id: String!) {
    nodeExternalArticle(id: { eq: $id }) {
      id
      path {
        alias
      }
      title
      field_url {
        title
        uri
      }
      field_published(formatString: "ddd, DD/MM/YYYY - hh:mm")
      field_publisher
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={data?.nodeExternalArticle?.title} />
);
