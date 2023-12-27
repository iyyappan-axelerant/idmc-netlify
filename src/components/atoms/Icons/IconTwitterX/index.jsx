import * as React from "react"
import './iconTwitterX.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-twitterx-primary",
  "secondary": "icon-twitterx-secondary",
  "white": "icon-twitterx-white",
  "gray": "icon-twitterx-gray",
}

const sizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18
}
const IconTwitterX = ({variant, size = "md", color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizes[size]}
      preserveAspectRatio="xMidYMid meet"
      height={16}
      viewBox="0 0 16 16"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
    </svg>
  )
}
export default IconTwitterX
