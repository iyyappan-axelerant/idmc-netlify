import React from "react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import './author.scss';

const Author = ({image, name, nameClasses, designation, designationClasses}) => {
  return (
    <div className="author">
      <div className="author-thumb">
        {
          Boolean(image) ? (
            <GatsbyImage loading="lazy" image={getImage(image)} alt={name}/>
          ) : (
            <img src="/icons/avatar.svg" className="author-thumb-default" alt="avatar"/>
          )
        }
      </div>
      <div>
        {Boolean(name) && <p className={nameClasses}>{name}</p>}
        {Boolean(designation) && <p className={designationClasses}>{designation}</p>}
      </div>
    </div>
  )
}

export default Author;