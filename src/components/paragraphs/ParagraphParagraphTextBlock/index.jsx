import React from "react";
import "./paraTextBlock.scss";
import classNames from "classnames";
import { graphql } from "gatsby";
import ExtractRichText from "../../molecules/ExtractRichText";
import { getParagraph } from "../../../utils/paragraphHelpers";

export const ParagraphParagraphTextBlock = ({ node }) => {
  const {
    field_background_color,
    field_paragraph_body,
    field_paragraph_title,
    field_width,
  } = node;

  let containerClasses = classNames(
    { "general-container container": field_width == "full" || !field_width },
    { "no-border-radius": field_width == "edge2edge" },

    "paragraph-text-block",
    "my-5rem",

    field_background_color ? `bg-clr-${field_background_color}` : "",

    { "px-2 p-md-0": !field_background_color },
    { "py-0": field_background_color == "white" },
    { "text-white": field_background_color == "regalBlue" }
  );

  const paragraphs = node?.relationships?.field_cta_links?.map(getParagraph);

  return (
    <div className={containerClasses}>
      {field_paragraph_title && (
        <h2 className="mb-4">{field_paragraph_title}</h2>
      )}
      {field_paragraph_body && (
        <ExtractRichText
          richText={field_paragraph_body?.value}
          extraClasses={"w-100"}
        />
      )}

      {paragraphs && paragraphs?.length > 0 && (
        <div className="cta-wrapper">{paragraphs}</div>
      )}
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphParagraphTextBlock on paragraph__paragraph_text_block {
    field_background_color
    id
    field_paragraph_body {
      value
    }
    field_width
    field_paragraph_title
    relationships {
      field_cta_links {
        type: __typename
        ...ParagraphLinks
      }
    }
  }
`;

export default ParagraphParagraphTextBlock;
