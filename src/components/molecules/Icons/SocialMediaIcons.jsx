import React from "react";
import { getURL } from "../../../hooks/getURL";
import IconTwitterX from "../../atoms/Icons/IconTwitterX";
import IconLinkedin from "../../atoms/Icons/IconLinkedin";
import IconYoutube from "../../atoms/Icons/IconYoutube";
import IconFacebook from "../../atoms/Icons/IconFacebook";

function SocialMediaIcons({ platformValues, color, size, variant, target }) {

  const icon = {
    'twitter': <IconTwitterX color={color} size={size}/>,
    'linkedin': <IconLinkedin color={color} size={size}/>,
    'youtube': <IconYoutube color={color} size={size}/>,
    'facebook': <IconFacebook color={color} size={size}/>,
  }

  return (
    <>
      {platformValues &&
        Object.entries(platformValues).map(([key, value], ind) => {
          if(!value?.value) return null;

          return (
            <a
              className={variant}
              href={`${getURL(key)}${value?.value}`}
              key={ind}
              target={target ? target : "_blank"}
            >
              {Object.keys(icon).indexOf(key) >=0 && icon[key]}
            </a>
          );
        })}
    </>
  );
}

export default SocialMediaIcons;
