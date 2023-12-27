import classNames from "classnames";
import React from "react";
import Text from "../Text";

function Eyebrow({ variant, text, extraClasses }) {
  let eyebrowClasses = classNames(
    {
      "boxed-eyebrow boxed-eyebrow-blue": variant == "boxedBlue",
      "boxed-eyebrow boxed-eyebrow-dark": variant == "boxedDark",
    },
    extraClasses
  );
  const PrimaryEyebrow = () => {
    return <Text text={text ? text : ""} variant="blueUppercase" />;
  };
  const BoxedEyebrow = () => {
    return (
      <div className={eyebrowClasses}>
        <Text text={text ? text : ""} variant="" extraClasses="text-uppercase" />
      </div>
    );
  };

  const currentEyebrowVariant = {
    primary: <PrimaryEyebrow />,
    boxedDark: <BoxedEyebrow />,
    boxedBlue: <BoxedEyebrow />,
  }[variant];

  return <div>{currentEyebrowVariant}</div>;
}

export default Eyebrow;
