import React from "react";

const HeadingTitle = ({tag, children, extraClasses}) => {
  if(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'].indexOf(tag) === -1){
    return (<h1 className={extraClasses}>{children}</h1>)
  }
  return (
    <>
      {
        {
          H1: <h1 className={extraClasses}>{children}</h1>,
          H2: <h2 className={extraClasses}>{children}</h2>,
          H3: <h3 className={extraClasses}>{children}</h3>,
          H4: <h4 className={extraClasses}>{children}</h4>,
          H5: <h5 className={extraClasses}>{children}</h5>,
          H6: <h6 className={extraClasses}>{children}</h6>,
          P: <p className={extraClasses}>{children}</p>,
        }[tag]
      }
    </>
  )
}

export default HeadingTitle;