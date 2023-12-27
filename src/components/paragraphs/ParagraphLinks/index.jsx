import React from "react";
import { Link, graphql } from "gatsby";
import classNames from "classnames";

export const ParagraphLinks = ({ node }) => {
  if (!node || !node?.field_link) return null;
  const linkClasses = classNames( "btn", node?.field_cta_colour ? `btn-${node?.field_cta_colour}` : "btn-white");
  return (
    <Link to={node?.field_link?.url} className={linkClasses}>
      {node?.field_link?.title}
    </Link>
  );
};

export const fragment = graphql`
  fragment ParagraphLinks on paragraph__links {
    field_link {
      url
      title
    }
    field_cta_colour
  }
`;

export default ParagraphLinks;
