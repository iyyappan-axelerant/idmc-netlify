import * as React from "react"
import './iconEmail.scss'
import classNames from "classnames";

const iconColorClass = {
  "primary": "icon-email-primary",
  "secondary": "icon-email-secondary",
  "white": "icon-email-white",
  "gray": "icon-email-gray",
}
const IconEmail = ({variant, color = "primary", noHover}) => {
  const finalColor = Object.keys(iconColorClass).indexOf(color) >= 0 ? color : 'primary';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={17}
      className={classNames(variant, {'has-hover': !noHover}, iconColorClass[finalColor])}
    >
      <path
        d="m21.238.97-9.12.02L2.996.95h-.004c-1.227 0-2.2 1.043-2.2 2.347V14.22c0 1.304.973 2.346 2.2 2.346H21.25c1.227 0 2.2-1.042 2.2-2.346V3.297c0-1.304-.965-2.326-2.213-2.326Zm-.715 1.61-8.148 6.75-.03.024-.028.028a.384.384 0 0 1-.275.109.367.367 0 0 1-.271-.117l-.027-.028-7.787-6.798 8.16.049 8.406-.016Zm.728 12.377H2.993c-.156 0-.423-.266-.423-.737V3.554l7.89 6.907c.4.402.964.636 1.564.644h.027a2.23 2.23 0 0 0 1.546-.608l8.085-6.705V14.22c-.008.47-.275.736-.43.736Z"/>
    </svg>
  )
}
export default IconEmail
