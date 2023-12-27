import { Link } from "gatsby";
import React from "react";
import SocialMediaIcons from "../../molecules/Icons/SocialMediaIcons";

const PreHeader = ({ preHeaderLinksData }) => {
  return (
    <div className="preHeader-link-container">
      <div className="preHeader-link-nav">
        {preHeaderLinksData?.navigationLinks?.map((item, index) => (
          <Link key={index} to={item?.node?.link?.url}>
            {item?.node?.title}
          </Link>
        ))}
      </div>
      <div className="divider">
        <span className="vr"></span>
      </div>
      <div className="preHeader-link-social-media">
        {preHeaderLinksData?.socialMediaLinks && (
          <div className="d-flex mt-1">
            <SocialMediaIcons
              platformValues={preHeaderLinksData?.socialMediaLinks}
              variant="regentGrey-icon"
              color="gray"
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreHeader;
