import * as React from "react"
import './iconArrowLongRight.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-arrow-long-right-primary",
  "secondary": "icon-arrow-long-right-secondary",
  "white": "icon-arrow-long-right-white",
  "gray": "icon-arrow-long-right-gray",
}
const IconArrowLongRight = ({variant, color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={126}
      height={9}
      fill="none"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path strokeWidth={2} d="M.462 7.158h121.82l-8.5-6" />
    </svg>
  )
}
export default IconArrowLongRight
