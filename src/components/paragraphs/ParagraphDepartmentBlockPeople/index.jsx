import React, { useState } from "react";
import { graphql } from "gatsby";
import Modal from "react-bootstrap/Modal";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SocialMediaIcons from "../../molecules/Icons/SocialMediaIcons";
import IconEmail from "../../atoms/Icons/IconEmail";
import IconChevronRight from "../../atoms/Icons/IconChevronRight";
import "./deptBlockPeople.scss";

export const ParagraphDepartmentBlockPeople = ({ node }) => {
  const [detail, setDetail] = useState({ open: false, data: null });

  const handleShowDetails = (ev, i) => {
    ev.preventDefault();
    setDetail({ open: true, data: i });
  };

  const {
    field_depatment_people_title,
    relationships: { field_department_peoples },
  } = node;

  return (
    <div className="dept-people">
      <div className="container general-container">
        <h2 className="dept-people-header">{field_depatment_people_title}</h2>
        <div className="row">
          {field_department_peoples?.map((item, index) => (
            <div key={index} className="col-lg-4 col-sm-6 col-xs-12">
              <div className="dept-people-card">
                <GatsbyImage
                  loading="lazy"
                  className="dept-people-card-img"
                  image={getImage(
                    item?.relationships?.field_department_people_icon
                  )}
                  alt={item?.field_department_people_name}
                />
                <h3 className="dept-people-card-title">
                  {item?.field_department_people_name}
                </h3>
                <p className="dept-people-card-info">
                  {item?.field_department_people_title}
                </p>

                <div className="dept-people-card-footer">
                  <div className="dept-people-card-social-icons">
                    {item?.field_department_people_email && (
                      <a
                        className="dept-people-card-social-icons"
                        href={`mailto:${item?.field_department_people_email}`}
                        target="_blank"
                      >
                        <IconEmail color="secondary" />
                      </a>
                    )}

                    <SocialMediaIcons
                      color="secondary"
                      variant="dept-people-card-social-icons"
                      platformValues={
                        item?.field_social_profile_links?.platform_values
                      }
                    />
                  </div>
                  <a
                    className="dept-people-btn-icon"
                    href="#"
                    role="button"
                    onClick={(ev) => handleShowDetails(ev, item)}
                  >
                    <span>See Bio</span>
                    <IconChevronRight color="secondary" noHover />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        backdropClassName="dept-people-modal-backdrop"
        className="dept-people-modal"
        scrollable
        size="xl"
        fullscreen="sm-down"
        centered
        show={detail?.open}
        onHide={() => setDetail({ ...detail, open: false })}
      >
        <Modal.Header closeButton className="dept-people-modal-header">
          <div className="dept-people-modal-header-inner">
            <div>
              <GatsbyImage
                loading="lazy"
                className="dept-people-modal-img"
                image={getImage(
                  detail?.data?.relationships?.field_department_people_icon
                )}
                alt={detail?.data?.field_department_people_name}
              />
            </div>
            <div className="dept-people-modal-header-right">
              <h2 className="dept-people-modal-title">
                {detail?.data?.field_department_people_name}
              </h2>
              <h4 className="dept-people-modal-info">
                {detail?.data?.field_department_people_title}
              </h4>
              <div className="dept-people-modal-social-icons">
                {detail?.data?.field_department_people_email && (
                  <a
                    className="dept-people-modal-social-icons"
                    href={`mailto:${detail?.data?.field_department_people_email}`}
                    target="_blank"
                  >
                    <IconEmail color="secondary" />
                  </a>
                )}
                <SocialMediaIcons
                  color="secondary"
                  variant="dept-people-modal-social-icons"
                  platformValues={
                    detail?.data?.field_social_profile_links?.platform_values
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="dept-people-modal-body">
          <div
            dangerouslySetInnerHTML={{
              __html: detail?.data?.field_people_read_more_expand?.processed,
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphDepartmentBlockPeople on paragraph__department_block_people {
    id
    field_depatment_people_title
    relationships {
      field_department_peoples {
        relationships {
          field_department_people_icon {
            gatsbyImage(width: 200)
          }
        }
        field_department_people_name
        field_department_people_title
        field_people_read_more_expand {
          format
          processed
          value
        }
        field_department_people_email
        field_social_profile_links {
          platform_values {
            linkedin {
              value
            }
            twitter {
              value
            }
            youtube {
              value
            }
          }
        }
      }
    }
  }
`;

export default ParagraphDepartmentBlockPeople;
