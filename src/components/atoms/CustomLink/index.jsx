import React from "react";
import Link from "gatsby";
import classNames from "classnames";

function CustomLink({ variant, href, text, onClickFn, target, extraClasses }) {
  let linkClasses = classNames({});
  let textClasses = classNames({});

  const RegularAnchor = () => {
    return (
      <a href={href ? href : "/"} target={target ? target : "_blank"}>
        {text}
      </a>
    );
  };

  const InternalLink = () => {
    return <Link to={href}>{text}</Link>;
  };

  const currentLinkVariant = {
    "same-tab": <InternalLink />,
    "new-tab": <RegularAnchor />,

    "": <RegularAnchor />,
  }[variant];

  return <>{currentLinkVariant}</>;
}

export default CustomLink;
