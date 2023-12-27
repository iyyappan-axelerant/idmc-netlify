import React from "react";
import "./contentReference.scss";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

function ContentReferenceCard(props) {
  const {
    title,
    imageURL,
    eyebrowText,
    authorDetails,
    linkTo,
    type,
    introText,
  } = props;

  let tagsToConsider = ["field_theme", "field_region", "field_country"];

  let allTags = [];
  for (let tag in props) {
    if (tagsToConsider?.includes(tag) && props[tag]) {
      if (props[tag][0] && props[tag][0]?.name) {
        allTags.push(props[tag][0]?.name);
      }
    }
  }

  return (
    <div className="content-card">
      <a
        href={linkTo || "/"}
        target={eyebrowText == "shorthand" ? "_blank" : "_self"}
        className="content-card__link"
      >
        <>
          <div className="content-card__img-wrapper">
            {imageURL ? (
              <GatsbyImage
                loading="lazy"
                image={getImage(imageURL)}
                className="content-card__img"
              />
            ) : (
              <img loading="lazy" src="/alternate-idmc.png" className="content-card__img" />
            )}

            {eyebrowText && (
              <p className="content-card__eyebrow boxed-eyebrow-pattens-blue">
                {eyebrowText}
              </p>
            )}
          </div>

          {title && <h6>{title}</h6>}

          {/* Only one author details for now */}
          {authorDetails && (
            <div className="author-data">
              {authorDetails[0]?.relationships?.field_author_image && (
                <GatsbyImage
                  loading="lazy"
                  className="me-2"
                  image={getImage(
                    authorDetails[0]?.relationships?.field_author_image
                      ?.relationships?.field_media_image?.gatsbyImage
                  )}
                />
              )}
              <p>{authorDetails[0]?.name}</p>
            </div>
          )}

          {allTags && allTags.length > 0 && (
            <p className="tags-wrapper__tag">{allTags.join("  |  ")}</p>
          )}
          {introText && (
            <div
              className="content-card__summary"
              dangerouslySetInnerHTML={{ __html: introText?.value }}
            ></div>
          )}
        </>
      </a>
    </div>
  );
}

export default ContentReferenceCard;
