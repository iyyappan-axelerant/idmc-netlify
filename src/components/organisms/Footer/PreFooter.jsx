import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSocialMedia } from "../../../queries/useSocialMediaLinks";
import { usePrefooter } from "../../../queries/usePreFooter";
import SocialMediaIcons from "../../molecules/Icons/SocialMediaIcons";
import ExtractRichText from "../../molecules/ExtractRichText";

const PreFooter = () => {
  const socialMediaLinks = useSocialMedia();
  const preFooterData = usePrefooter();

  const { newsletter, followIDMC, getInTouch, subscribeCTA } =
    preFooterData?.blockContentPageFooter;

  const { platform_values } =
    socialMediaLinks?.blockContentSocialMediaLinks?.field_links;

  return (
    <>
      <div className="pre-footer">
        <Container>
          <Row>
            {preFooterData && (
              <>
                <Col xs={12} md={6} xl={4}>
                  <div className="content-wrapper">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: newsletter?.value,
                      }}
                    />

                    {subscribeCTA && (
                      <a
                        href={subscribeCTA?.url || "/"}
                        target={"_blank"}
                        className={`btn mt-4 btn-disasterPacificBlue`}
                      >
                        {subscribeCTA?.title}
                      </a>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={4}>
                  <div className="content-wrapper">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: followIDMC?.value,
                      }}
                    />

                    {platform_values && (
                      <div className="d-flex mt-4">
                        <SocialMediaIcons
                          platformValues={platform_values}
                          color="secondary"
                          variant="white-icon"
                        />
                      </div>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} xl={4}>
                  <div className="content-wrapper">
                    <ExtractRichText
                      richText={getInTouch?.value}
                      extraClasses="me-2"
                    />
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PreFooter;
