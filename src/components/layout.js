import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "../scss/custom.scss";
import "../scss/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterWrapper from "./organisms/Footer";
import Header from "./organisms/Header";

const Layout = ({ children }) => {
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
    <main>
      <Header />
      {children}
      <FooterWrapper preFooter={data.preFooter} />
    </main>
  );
};

export default Layout;
