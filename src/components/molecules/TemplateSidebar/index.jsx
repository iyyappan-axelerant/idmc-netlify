import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const TemplateSidebar = ({ data, tagTitle }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [clickSet, setClickSet] = useState("Click me");
  const [customTag, setCustomTag] = useState([]);
  const url = typeof window !== "undefined" ? window?.location?.pathname : "";
  const [tagsCount, setTagsCount] = useState(0);

  let tagsToConsider = ["field_theme", "field_region", "field_country"];

  const handleTags = (tag) => {
    let allTags = [];
    for (let t in tag) {
      if (tagsToConsider?.includes(t)) {
        if (tag?.[t]?.length > 0) {
          allTags = [...allTags, ...tag?.[t]];
        }
        if (t === "field_region" && tag?.[t] !== null) {
          allTags?.push(tag?.[t]);
        }
      }
    }
    setCustomTag(allTags);
  };
  useEffect(() => {
    handleTags(data?.relationships);
  }, [showAllTags]);

  return (
    <Container className="general-container w-auto p-0">
      <div className="ct-container-hero-box-r">
        <div>
          <div className="hr"></div>
          <div className="share-icons">
            <span className="">Share</span>
            <LinkedinShareButton
              title={data?.title}
              url={`${process.env.GATSBY_URL}${url}`}
            >
              <img loading="lazy" src="/linkedin.svg" alt="" />
            </LinkedinShareButton>
            <TwitterShareButton
              title={data?.title}
              url={`${process.env.GATSBY_URL}${url}`}
            >
              <img loading="lazy" src="/twitterx.svg" alt="" />
            </TwitterShareButton>
            <FacebookShareButton
              title={data?.title}
              url={`${process.env.GATSBY_URL}${url}`}
            >
              <img loading="lazy" src="/facebook.svg" alt="" />
            </FacebookShareButton>
            <EmailShareButton
              subject={data?.title}
              url={`${process.env.GATSBY_URL}${url}`}
            >
              <img loading="lazy" src="/mail.svg" alt="" />
            </EmailShareButton>
            <OverlayTrigger overlay={<Tooltip>{clickSet}</Tooltip>}>
              <div
                className="react-share__ShareButton"
                onClick={() => {
                  navigator?.clipboard?.writeText(
                    `https://www.main-bvxea6i-cdvwbfnfklw7q.us-2.platformsh.site${window?.location?.pathname}`
                  );
                  setClickSet("Copied!!");
                }}
              >
                <img loading="lazy" src="/link.svg" alt="" />
              </div>
            </OverlayTrigger>
          </div>
          <div className="hr"></div>
        </div>
        {data?.relationships?.field_sidebar?.field_links?.length > 0 && (
          <div className="quick-nav">
            <div>
              {data?.relationships?.field_sidebar?.field_component_title?.toUpperCase()}
            </div>
            <div>
              <ul className="quick-nav">
                {data?.relationships?.field_sidebar?.field_links?.map(
                  (item, key) => {
                    return (
                      <li key={key} className="quick-nav-list">
                        <a href={item?.url ? item?.url : ""} target="_blank">
                          {item?.title}
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            <div className="hr"></div>
          </div>
        )}
        {customTag?.length > 0 && (
          <div>
            <h6 className="tags-title">{tagTitle}</h6>
            <div className="tags">
              {customTag?.map((item, key) => {
                return (
                  <>
                    {key < 4 && !showAllTags && (
                      <a
                        key={key}
                        href="https://www.internal-displacement.org/search"
                        target="_blank"
                      >
                        {item?.name}
                      </a>
                    )}
                    {showAllTags && (
                      <a
                        key={key}
                        href="https://www.internal-displacement.org/search"
                        target="_blank"
                      >
                        {item?.name}
                      </a>
                    )}
                  </>
                );
              })}
            </div>
            {customTag?.length > 4 && (
              <div
                className="tags-view"
                onClick={() => setShowAllTags(!showAllTags)}
              >
                {showAllTags ? "Less Tags" : "View all tags"}
                <img loading="lazy" src={"/blue-arrow-underline.svg"} alt="" />
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default TemplateSidebar;
