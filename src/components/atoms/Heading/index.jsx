import classNames from "classnames";
import React from "react";

function Heading({ title, variant, extraClasses }) {
  let size = 1;
  switch (variant) {
    case "h6":
      size = 6;
      break;

    case "h5":
      size = 5;
      break;
    case "h4":
      size = 4;
      break;
    case "h3":
      size = 3;
      break;
    case "h2":
      size = 2;
      break;
    case "h1":
      size = 1;
      break;
    default:
      size = 1;
  }

  let headingClasses = classNames({}, extraClasses);

  const Tag = `h${size}`;

  return <Tag className={headingClasses}>{title}</Tag>;
}
export default Heading;
