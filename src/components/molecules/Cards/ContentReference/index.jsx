import React from "react";
import "./contentReference.scss";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import Author from "../../Author";
import { formatDate } from "../../../../hooks/formatDate";

function ContentReferenceCard(props) {
  const {
    title,
    imageURL,
    imageType,
    eyebrowText,
    authorDetails,
    linkTo,
    type,
    introText,
  } = props;

  let tagsToConsider = ["field_theme", "field_region", "field_country"];

  let allTags = [];
  for (let tag in props) {
    if (tagsToConsider?.includes(tag)) {
      if (props?.[tag]?.length > 0) {
        allTags = [...allTags, props?.[tag]?.[0]?.name];
      }
      if (tag === "field_region" && props?.[tag]?.name) {
        allTags?.push(props?.[tag]?.name);
      }
    }
  }

  const formattedDate = formatDate(props?.fieldPublished);

  return (
    <div className="content-card">
      <a
        href={linkTo || "/"}
        target={eyebrowText == "shorthand" ? "_blank" : "_self"}
        className="content-card__link"
      >
        <>
          <div className="content-card__img-wrapper">
            {imageType && imageType == "url" ? (
              <img src={imageURL} className="content-card__img" />
            ) : imageURL ? (
              <GatsbyImage
                loading="lazy"
                image={getImage(imageURL)}
                className="content-card__img"
              />
            ) : (
              <img
                loading="lazy"
                src="/alternate-idmc.png"
                className="content-card__img"
              />
            )}

            {eyebrowText && (
              <p className="content-card__eyebrow boxed-eyebrow-pattens-blue">
                {eyebrowText}
              </p>
            )}
          </div>

          {title && <h6>{title}</h6>}

          {/* Only one author details for now */}
          {authorDetails && authorDetails?.[0]?.name && (
              <Author
                name={authorDetails?.[0]?.name}
                image={
                  authorDetails?.[0]?.relationships?.field_author_image
                    ?.relationships?.field_media_image?.gatsbyImage
                }
              />
          )}
          <div className="event-date">
            {props?.fieldPublished && !props?.fieldEventPlace && (
              <p>{formattedDate}</p>
            )}
            {props?.fieldPublished && props?.fieldEventPlace && (
              <p className="event-date__place">
                {formattedDate}
                {"  |  "}
                {props?.fieldEventPlace}
              </p>
            )}
            <p>{props?.fieldTimeFrame}</p>
          </div>
          {allTags && allTags.length > 0 && (
            <p className="tags-wrapper__tag">{allTags?.join("  |  ")}</p>
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
