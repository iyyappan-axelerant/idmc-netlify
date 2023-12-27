import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { usePreHeaderQuery } from "../../../queries/usePreHeader";
import { useMainHeader } from "../../../queries/useMainHeader";
import { useSocialMedia } from "../../../queries/useSocialMediaLinks";
import PreHeader from "./PreHeader";
import NavbarToggle from "./NavbarToggle";
import { generateMenu } from "../../atoms/GenerateMenuTree";
import { Link } from "gatsby";
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [headerData, setHeaderData] = useState({
    siteLogo: [],
    preHeaderLinksData: {
      navigationLinks: [],
      socialMediaLinks: [],
    },
    mainHeaderData: [],
  });

  const data = useSocialMedia();
  const queryData = usePreHeaderQuery();
  const queryHeaderData = useMainHeader();

  useEffect(() => {
    setHeaderData({
      siteLogo:
        queryData?.blockContentPageFooter?.relationships?.field_header_logo,
      preHeaderLinksData: {
        socialMediaLinks:
          data?.blockContentSocialMediaLinks?.field_links?.platform_values,
        navigationLinks: queryData?.allMenuLinkContentPreHeaderMenu.edges,
      },
      mainHeaderData: queryHeaderData?.allMenuLinkContentMain,
    });
  }, []);
  const searchLink = generateMenu(headerData?.mainHeaderData, "main", "object");

  return (
    <Navbar expand="lg" className="navbar max-width-set">
      <Container fluid className="p-md-none p-0">
        {headerData?.siteLogo && (
          <Navbar.Brand className="navbar-brand" href="/">
            <img
              loading="lazy"
              className="navbar-header-logo"
              src={headerData.siteLogo?.relationships?.field_media_svg?.url}
              width={
                headerData.siteLogo?.relationships?.field_media_svg?.width
              }
              height={
                headerData.siteLogo?.relationships?.field_media_svg?.height
              }
              alt={headerData?.siteLogo?.thumbnail?.alt}
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          as={NavbarToggle}
          className="navbar-toggle"
          aria-controls="basic-navbar-nav"
        >
          <div className="align-self-baseline d-flex d-lg-none d-xl-none">
            {searchLink?.map((item, id) => {
              if (item?.link?.options?.attributes?.class[0] === "search-icon") {
                return (
                  <Link
                    key={id}
                    className="navbar-toggle-search"
                    to={item?.link?.url}
                  >
                    <i className="bi bi-search"></i>
                  </Link>
                );
              }
            })}
            <div className="divider-v">
              <span className="vr"></span>
            </div>
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse className="navbar-collapse " id="basic-navbar-nav">
          <Nav className="w-100">
            <Container fluid="md" className="preHeader-link p-0  h-100">
              <div className="d-mob">
                <MegaMenu
                  preHeaderLinksData={headerData?.preHeaderLinksData}
                  mainHeaderData={headerData?.mainHeaderData}
                ></MegaMenu>
              </div>

              <div className="d-desk">
                <PreHeader
                  preHeaderLinksData={headerData?.preHeaderLinksData}
                ></PreHeader>
                <MegaMenu
                  mainHeaderData={headerData?.mainHeaderData}
                ></MegaMenu>
              </div>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
