import classNames from "classnames";
import React from "react";
import IconArrowRight from "../Icons/IconArrowRight";

function Button(props) {
  const { label, type, variant, extraClasses } = props;

  let buttonClasses = classNames(
    {
      "btn btn-primary": variant === "primary",
      "btn btn-outline-secondary": variant === "secondary",
    },
    extraClasses
  );

  return (
    <button
      type={type}
      className={buttonClasses}
    >
      <span className="flex items-center">
        {label}
        <IconArrowRight color={variant} variant="ms-2"/>
      </span>
    </button>
  );
}

export default Button;
