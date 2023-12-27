import * as React from "react"
import './iconArrowRight.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-arrow-right-primary",
  "secondary": "icon-arrow-right-secondary",
  "white": "icon-arrow-right-white",
  "gray": "icon-arrow-right-gray",
}
const IconArrowRight = ({variant, color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={8}
      fill="none"
      className={classNames(variant, 'align-icon-arrow-right', {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path strokeWidth={2} d="M0 7h17.666l-8.5-6" />
    </svg>
  )
}
export default IconArrowRight
