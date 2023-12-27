import * as React from "react"
import './iconLinkedin.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-linkedin-primary",
  "secondary": "icon-linkedin-secondary",
  "white": "icon-linkedin-white",
  "gray": "icon-linkedin-gray",
}

const sizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18
}
const IconLinkedin = ({variant, size = "md", color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizes[size]}
      preserveAspectRatio="xMidYMid meet"
      height={15}
      viewBox="0 0 16 15"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path d="M4.059 4.855H.854v9.96h3.205v-9.96ZM12.785 4.972c-.034-.011-.067-.023-.102-.032a1.72 1.72 0 0 0-.13-.026 2.842 2.842 0 0 0-.576-.059c-.68.03-1.343.218-1.94.548a4.47 4.47 0 0 0-1.504 1.356V4.855H5.331v9.96h3.205V9.383s2.423-3.41 3.444-.905v6.34h3.204V8.096c0-.716-.237-1.411-.671-1.977a3.193 3.193 0 0 0-1.728-1.147ZM2.265 3.033c.828 0 1.5-.679 1.5-1.516C3.765.679 3.093 0 2.265 0s-1.5.68-1.5 1.517c0 .837.672 1.516 1.5 1.516Z"
      />
    </svg>
  )
}
export default IconLinkedin
