import React from "react";
import PreFooter from "./PreFooter";
import MainFooter from "./MainFooter";

function FooterWrapper({ preFooter }) {
  return (
    <footer className="footer">
      <PreFooter />
      <MainFooter />
    </footer>
  );
}

export default FooterWrapper;
