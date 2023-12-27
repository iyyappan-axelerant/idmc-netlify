import * as React from "react"
import './iconChevronRight.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-chevron-right-primary",
  "secondary": "icon-chevron-right-secondary",
  "white": "icon-chevron-right-white",
  "gray": "icon-chevron-right-gray",
}


const sizes = {
  xs: 9,
  sm: 11,
  md: 14,
  lg: 20
}
const IconChevronRight = ({variant, size = "sm", color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={sizes[size]}
      width={sizes[size]}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 6 11"
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path
        fillRule="evenodd"
        d="M.242 10.017a.504.504 0 0 0 .71 0l4.151-4.132a.975.975 0 0 0 .295-.707 1.001 1.001 0 0 0-.295-.706L.922.31A.507.507 0 0 0 .217.305.488.488 0 0 0 .064.66a.5.5 0 0 0 .148.357l3.827 3.808a.488.488 0 0 1 .147.354.5.5 0 0 1-.147.353L.242 9.311a.488.488 0 0 0-.147.353.5.5 0 0 0 .147.353Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default IconChevronRight
