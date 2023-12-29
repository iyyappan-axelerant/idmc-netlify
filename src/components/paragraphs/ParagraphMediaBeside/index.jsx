import React from "react";
import "./paraMediaBeside.scss";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import ExtractRichText from "../../molecules/ExtractRichText";
import classNames from "classnames";
import { getContrastColor } from "../../../utils/miscUtils";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import HeadingTitle from "../../atoms/HeadingTitle";

export const ParagraphMediaBeside = ({ node }) => {
  const {
    field_title_tag,
    field_heading,
    field_body,
    field_background_color,
    field_image_credit,
    field_caption,
  } = node;

  const { field_card_image, field_cta_link } = node?.relationships ?? {};

  let mediaBesideClasses = classNames(
    "media-beside mb-5",
    field_background_color ? `bg-clr-${field_background_color}` : "",
    `color-${getContrastColor(field_background_color)}`
  );

  return (
    <div className={mediaBesideClasses}>
      <div className="media-beside__content container general-container">
        <HeadingTitle tag={field_title_tag}>{field_heading}</HeadingTitle>
        <ExtractRichText richText={field_body?.value} />
        <div className="mt-5 cta-wrapper">
          {field_cta_link?.map((cta) => {
            return (
              <>
                {
                  !!cta?.field_link?.url ? (
                    <Link className={`btn btn-${cta?.field_cta_colour}`} to={cta?.field_link?.url}>
                      {cta?.field_link?.title}
                    </Link>
                  ) : (
                    <Link className={`btn btn-${cta?.field_cta_colour}`}>
                      {cta?.field_link?.title}
                    </Link>
                  )
                }
              </>
            );
          })}
        </div>
      </div>
      <div className="media-beside__image-container">
        <GatsbyImage
          loading="lazy"
          image={getImage(
            field_card_image?.relationships?.field_media_image?.gatsbyImage
          )}
        />
        <div className="captions-wrapper fst-italic">
          {field_caption && <ExtractRichText richText={field_caption?.value} />}
          {field_image_credit && <p>{field_image_credit}</p>}
        </div>
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphMediaBeside on paragraph__media_beside_content_block {
    field_body {
      value
    }
    field_title_tag
    field_heading
    field_background_color
    field_caption {
      value
    }
    field_image_credit
    relationships {
      field_card_image {
        relationships {
          field_media_image {
            gatsbyImage(width: 1500)
          }
        }
      }
      field_cta_link {
        field_cta_colour
        field_link {
          url
          title
        }
      }
    }
  }
`;

export default ParagraphMediaBeside;
