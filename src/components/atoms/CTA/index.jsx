import classNames from "classnames";
import React from "react";

function CTA({
  variant,
  href,
  title,
  target,
  extraClasses,
  parentClass,
  iconRight,
}) {
  let ctaClasses = classNames(
    "btn",
    { "white-link": variant == "whiteUnderline" },
    extraClasses
  );

  const RegularButtonCTA = () => {
    return (
      <a
        href={href ? href : "/"}
        target={target ? target : "_blank"}
        className={ctaClasses}
      >
        {title}
        {iconRight}
      </a>
    );
  };

  const WhiteUnderlineCTA = () => {
    return (
      <div className={parentClass}>
        <a
          href={href ? href : "/"}
          target={target ? target : "_blank"}
          className={ctaClasses}
        >
          {title}
        </a>
        {iconRight}
      </div>
    );
  };

  const currentLinkVariant = {
    "regular-btn-cta": <RegularButtonCTA />,
    whiteUnderline: <WhiteUnderlineCTA />,
  }[variant];

  return <>{currentLinkVariant}</>;
}

export default CTA;
