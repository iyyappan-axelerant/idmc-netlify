import * as React from "react"
import './iconFacebook.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-facebook-primary",
  "secondary": "icon-facebook-secondary",
  "white": "icon-facebook-white",
  "gray": "icon-facebook-gray",
}

const sizes = {
  xs: 12,
  sm: 15,
  md: 20,
  lg: 24
}
const IconFacebook = ({variant, size = "md", color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={sizes[size]}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 10 20"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path
        d="M6.157 7.057v-2.37a1.19 1.19 0 0 1 1.19-1.19h1.19V.537h-2.37A3.556 3.556 0 0 0 2.61 4.094v2.963H.231v2.963H2.6v9.482h3.556V10.02h2.37l1.19-2.964-3.56.001Z"
      />
    </svg>
  )
}
export default IconFacebook
