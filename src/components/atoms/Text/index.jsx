import React from "react";
import classNames from "classnames";

function Text(props) {
  const { text, extraClasses, variant, color, iconLeft, onClick } = props;
  let textClasses = classNames(
    {
      "md:text-22 xl:text-25 font-proxima italic": variant == "quote",
      "typo-small-text": variant == "small-text",
      "typo-heading-teaserBox": variant == "heading-teaserBox",
    },

    extraClasses
  );

  return (
    <p className={textClasses} onClick={onClick}>
      {iconLeft}
      {text}
    </p>
  );
}

export default Text;
