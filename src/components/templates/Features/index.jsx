import { graphql } from "gatsby";
import React from "react";
import Seo from "../../atoms/seo";
import Layout from "../../layout";
import "./Features.scss";

const Features = ({ data }) => {
  return (
    <Layout>
      <iframe
        className="features-iframe"
        src={data?.nodeIframe?.field_iframe_url}
        title={data?.nodeIframe?.title}
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        width="100%"
        height="100%"
        seamless="seamless"
      ></iframe>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    nodeIframe(id: { eq: $id }) {
      id
      path {
        alias
      }
      title
      field_iframe_url
    }
  }
`;

export default Features;

export const Head = ({ data }) => <Seo title={data?.nodeIframe?.title} />;
