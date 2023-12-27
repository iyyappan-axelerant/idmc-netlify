import React from "react";
import {graphql} from "gatsby";
import classNames from "classnames";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import './mediaBlendContentBlock.scss';

export const ParagraphMediaBlendContentBlock = ({node}) => {
  const {
    field_component_title,
    field_heading,
    field_summary,
    field_caption,
    field_image_credit,
    field_background_color,
    relationships
  } = node;

  const {field_card_image, field_cta_link} = relationships ?? {}

  const hasImage = Boolean(field_card_image?.relationships?.field_media_image)
  const hasContent = Boolean(field_summary)
  const hasCaption = Boolean(field_caption?.proceseed || field_image_credit)
  const blendFull = hasImage && hasContent;

  return (
    <div className="media-blend-root">
      {
        Boolean(field_component_title) && (
          <h1 className="media-blend-title">{field_component_title}</h1>
        )
      }
      <div className={classNames("media-blend", `bg-clr-${field_background_color}`, {"media-blend-full" : blendFull})}>
        {
          hasImage && (
            <div className="media-blend-image">
              <GatsbyImage loading="lazy" className="media-blend-image-gatsby" image={getImage(field_card_image?.relationships?.field_media_image)} alt={field_heading}/>
              {
                hasCaption && (
                  <div className="media-blend-image-caption">
                    <div className="media-blend-image-caption-inner">
                      {Boolean(field_caption?.processed) && (
                        <div className="media-blend-image-caption-info" dangerouslySetInnerHTML={{__html: field_caption?.processed}}/>
                      )}
                      {Boolean(field_image_credit) && <p className="media-blend-image-caption-rights">{field_image_credit}</p>}
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
        {
          hasContent && (
            <div className="media-blend-content">
              <h4>{field_heading}</h4>
              <div dangerouslySetInnerHTML={{__html: field_summary.processed}}/>
              <div className="media-blend-cta">
                {
                  field_cta_link?.map((cta) => (
                    <a
                      href={cta?.field_link?.url || "/"}
                      target={"_blank"}
                      className={`btn btn-${cta?.field_cta_colour}`}
                    >
                      {cta?.field_link?.title}
                    </a>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export const fragment = graphql`
  fragment ParagraphMediaBlendContentBlock on paragraph__media_blend_content_block {
    field_heading
    field_caption {
      processed
    }
    field_image_credit
    field_component_title
    field_summary {
      processed
    }
    field_background_color,
    relationships {
      field_card_image {
        relationships {
          field_media_image {
            gatsbyImage(width: 1200, height: 1200)
          }
        }
      }
      field_cta_link {
        type: __typename
        ...ParagraphLinks
      }
    }
  }
`;
