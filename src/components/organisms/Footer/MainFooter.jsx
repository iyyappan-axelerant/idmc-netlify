import React from "react";
import { useMainFooter } from "../../../queries/useMainFooter";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import Text from "../../atoms/Text";
import Menu from "../../atoms/GenerateMenuTree";

function MainFooter({}) {
  const mainFooterQuery = useMainFooter();

  const { preText, copyRight, footerLinks, field_start_year } =
    mainFooterQuery?.blockContentPageFooter;

  const { field_idmc_logo, field_nrc_logo } =
    mainFooterQuery?.blockContentPageFooter?.relationships;

  const idmcLogo = field_idmc_logo?.relationships?.field_media_svg;
  const nrcLogo = field_nrc_logo?.relationships?.field_media_svg;

  const currentDate = new Date();

  return (
    <div className="main-footer">
      <Container className="general-container">
        <Row>
          {idmcLogo && (
            <img
              loading="lazy"
              src={idmcLogo?.url}
              width={idmcLogo?.width}
              height={idmcLogo?.height}
              alt={nrcLogo?.alt ? nrcLogo?.alt : "idmc-logo"}
              className="idmc-logo"
            />
          )}
        </Row>

        <Row>
          <Col xs={12} md={6} xl={12} className="main-footer__menu-wrapper">
            <Menu
              className="main-footer__menu"
              menuName="footer"
              queryResult={mainFooterQuery?.allMenuLinkContentFooter}
            />
          </Col>

          <Col xs={12} md={6} xl={12}>
            <Row className="main-footer__bottom">
              <Col xs={12} xl={4} className="align-self-end">
                {footerLinks?.map((link, i) => {
                  return (
                    <Link
                      to={link?.url}
                      className={`${link?.options?.attributes?.class} footer-links small-text`}
                      key={i}
                    >
                      {link?.title}
                    </Link>
                  );
                })}
              </Col>

              <Col xs={12} xl={4}>
                {preText && (
                  <div className="nrc-logo-wrapper">
                    <Text
                      variant="small-text"
                      text={preText}
                      extraClasses="text-white me-2 me-xl-3"
                    />
                    {nrcLogo && (
                      <img
                        loading="lazy"
                        src={nrcLogo?.url}
                        width={nrcLogo?.width}
                        height={nrcLogo?.height}
                        className="nrc-logo"
                        alt={nrcLogo?.alt ? nrcLogo?.alt : "nrc-logo"}
                      />
                    )}
                  </div>
                )}
              </Col>
              <Col xs={12} xl={4} className="align-self-end">
                {copyRight && (
                  <Text
                    variant="small-text"
                    text={`${field_start_year}-${currentDate?.getFullYear()} ${copyRight}`}
                    extraClasses="text-white"
                    iconLeft={<i className="bi bi-c-circle copyright-icon"></i>}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainFooter;
