import React from "react";
import { Link } from "gatsby";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleButton from "./ToggleButton";
import { generateMenu } from "../../atoms/GenerateMenuTree";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import IconArrowLongRight from "../../atoms/Icons/IconArrowLongRight";
import PreHeader from "./PreHeader";
import "./header.scss";

const MegaMenu = ({ mainHeaderData, preHeaderLinksData }) => {
  const [selectedParentMenu, setSelectedParentMenu] = useState();
  const [selectedChildMenu, setSelectedChildMenu] = useState();

  const data = generateMenu(mainHeaderData, "main", "object");

  const [toggle, setToggle] = useState("");
  return (
    <div>
      <div className="d-desk">
        <div className="header-link-container">
          {data?.map((item, id) => {
            if (item?.link?.options?.attributes?.class[0] === "search-icon") {
              return (
                <div className="header-link-search h-100" key={id}>
                  <a href={item?.link?.url}>
                    <i className="bi bi-search header-link-search-color"></i>
                  </a>
                </div>
              );
            }
            return (
              <div className="dropdown-header">
                <Dropdown
                  show={item?.title === toggle}
                  key={id}
                  className="dropdown"
                >
                  <Dropdown.Toggle
                    className={`dropdown-toggle-button ${
                      item?.title === toggle ? "dropdown-toggle-bg" : ""
                    }`}
                    as={ToggleButton}
                    onClick={() => {
                      setToggle(item?.title);
                    }}
                  >
                    {item?.title}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Container>
                      <Row>
                        <Col lg={4} xl={4}>
                          <div className="dropdown-teaser">
                            <img
                              loading="lazy"
                              src={
                                item?.relationships?.field_teaser_image
                                  ?.relationships?.field_media_image?.url
                              }
                            />
                            <div className="dropdown-teaser__items">
                              <p className="typo-preHeading-h1 color-disasterPacificBlue text-uppercase">
                                {item?.relationships?.field_product_tags?.name}
                              </p>

                              <h4 className="dropdown-teaser__title font-freight">
                                {item?.field_teaser_title}
                              </h4>

                              <div className="dropdown-teaser__cta">
                                <a
                                  target="_blank"
                                  href={item?.field_teaser_cta?.url}
                                  className="btn white-link btn-inline"
                                >
                                  {item?.field_teaser_cta?.title}
                                </a>
                                <IconArrowLongRight color="white" noHover />
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col lg={8} xl={8}>
                          <Row>
                            <div className="dropdown-cross-icon__wrapper">
                              <h2>{item?.title}</h2>
                              <i
                                className="bi bi-x-lg dropdown-cross-icon"
                                style={{ fontSize: "2rem" }}
                                onClick={() => setToggle("")}
                              ></i>
                            </div>
                            <Row>
                              <div className="b-top-white pb-5 ms-3 w-25"></div>
                            </Row>

                            {item?.children?.map((child, i) => {
                              return (
                                <>
                                  <Col
                                    md={item?.children?.length == 2 ? 6 : 4}
                                    key={i}
                                  >
                                    <div className="kashmir-blue-b-top pb-4"></div>
                                    <p className="typo-heading-teaserBox color-disasterPacificBlue mb-4">
                                      {child.title}
                                    </p>

                                    {child.children.map((grandChild, i) => {
                                      return (
                                        <Dropdown.Item
                                          key={i}
                                          href={grandChild?.link?.url}
                                          className="white-link"
                                        >
                                          {grandChild.title}
                                        </Dropdown.Item>
                                      );
                                    })}
                                  </Col>
                                </>
                              );
                            })}
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-mob mega-menu-mobile">
        {data?.map((item, id) => {
          if (item?.link?.options?.attributes?.class[0] === "search-icon") {
            return null;
          }

          return (
            <>
              {selectedParentMenu || selectedChildMenu ? (
                ""
              ) : (
                <div
                  className="d-flex justify-content-between align-items-center pb-4 cursor-pointer"
                  onClick={() => {
                    setSelectedParentMenu(item);
                  }}
                >
                  <p key={id} className="color-white typo-heading-teaserBox">
                    {item?.title}
                  </p>
                  <img loading="lazy" src={"/blue-arrow-underline.svg"} />
                </div>
              )}
            </>
          );
        })}

        {selectedParentMenu || selectedChildMenu ? (
          ""
        ) : (
          <>
            <div className="kashmir-blue-b-top"></div>
            <PreHeader preHeaderLinksData={preHeaderLinksData} />
          </>
        )}

        {selectedParentMenu && !selectedChildMenu && (
          <>
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => setSelectedParentMenu()}
            >
              <img loading="lazy" src={"/blue-back.svg"} />
              <p className="color-white ps-3">Main menu</p>
            </div>

            <p className="typo-heading-teaserBox color-disasterPacificBlue py-4">
              {selectedParentMenu?.title}
            </p>

            {selectedParentMenu?.children.map((child, i) => {
              return (
                <div
                  className="d-flex align-items-center cursor-pointer"
                  key={i}
                >
                  <p
                    className="dropdown-item white-link"
                    onClick={() => {
                      setSelectedChildMenu(child);
                    }}
                  >
                    {child?.title}
                    <img loading="lazy" src={"/blue-forward.svg"} className="ps-3" />
                  </p>
                </div>
              );
            })}
          </>
        )}

        {selectedChildMenu && (
          <>
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => setSelectedChildMenu()}
            >
              <img loading="lazy" src={"/blue-back.svg"} />
              <p className="color-white ps-3">{selectedParentMenu?.title}</p>
            </div>

            <p className="typo-heading-teaserBox color-disasterPacificBlue py-4">
              {selectedChildMenu?.title}
            </p>

            {selectedChildMenu?.children.map((child, i) => {
              return (
                <Link
                  className="dropdown-item white-link"
                  to={child?.link?.url}
                  key={i}
                >
                  {child?.title}
                  <img loading="lazy" src={"/blue-forward.svg"} className="ps-3" />
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
