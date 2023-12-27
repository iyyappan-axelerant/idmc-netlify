import * as React from "react"
import './iconYoutube.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-yt-primary",
  "secondary": "icon-yt-secondary",
  "white": "icon-yt-white",
  "gray": "icon-yt-gray",
}

const sizes = {
  xs: 15,
  sm: 20,
  md: 25,
  lg: 28
}
const IconYoutube = ({variant, size = 'md', color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizes[size]}
      preserveAspectRatio="xMidYMid meet"
      height={17}
      viewBox="0 0 25 17"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path
        d="M23.112 1.79c-.629-1.13-1.31-1.338-2.7-1.417C19.025.28 15.536.238 12.513.238c-3.022 0-6.519.04-7.908.133-1.389.094-2.07.287-2.704 1.419C1.267 2.922.924 4.863.924 8.286v.012c0 3.409.333 5.368.98 6.485.649 1.118 1.317 1.335 2.703 1.431 1.386.096 4.878.13 7.908.13 3.03 0 6.512-.048 7.901-.128 1.389-.092 2.072-.3 2.7-1.43.653-1.118.983-3.077.983-6.486v-.013c-.002-3.424-.332-5.369-.987-6.497ZM9.614 12.683V3.9l7.242 4.392-7.242 4.393Z"
      />
    </svg>
  )
}
export default IconYoutube
