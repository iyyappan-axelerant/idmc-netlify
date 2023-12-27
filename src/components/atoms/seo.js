import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

export const Seo = ({ title, image }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Helmet>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <meta property="og:image:url" content={process.env.DRUPAL_URL} />
      <meta
        property="og:image"
        key="og:image"
        name="image"
        content={
          image
            ? image
            : `${process.env.GATSBY_URL}/alternate-idmc.png`
        }
      />
      <meta property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={process.env.GATSBY_URL} />
      {/* <!--Twitter Essential META Tags --> */}
      <meta property="og:site_name" content="IDMC" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="IDMC" />
      <meta
        property="twitter:image"
        key="twitter:image"
        content={
          image
            ? image
            : `${process.env.GATSBY_URL}/alternate-idmc.png`
        }
      />
      <meta
        property="twitter:url"
        content={process.env.GATSBY_URL}
      />
    </Helmet>
  );
};

export default Seo;
