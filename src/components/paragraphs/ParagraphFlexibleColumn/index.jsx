import React from "react";
import { graphql } from "gatsby";
import {getParagraph} from "../../../utils/paragraphHelpers";
import './flexibleColumn.scss';

const colMap = {
  1: '',
  2: 'col-md-12 col-lg-6',
  3: 'col-md-12 col-lg-4',
  4: 'col-md-6 col-lg-3',
}
export const ParagraphFlexibleColumn = ({ node }) => {
  const paragraphs = node?.relationships?.field_column_item?.map(getParagraph);
  const length = paragraphs?.length;

  if(length === 0) return null;

  return (
    <div className={`flexible-column container general-container my-5rem flexible-column-${length}`}>
      {
        Boolean(node?.field_component_title) && (
          <h1 className="flexible-column-title">{node?.field_component_title}</h1>
        )
      }
      <div className="row">
        {paragraphs?.map((p) => (<div className={`col-xs-12 mb-4 ${colMap[length]}`}>{p}</div>))}
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphFlexibleColumn on paragraph__flexible_column {
    id
    field_component_title,
    relationships {
      field_column_item {
        type: __typename
        ...ParagraphMediaBlendContentBlock
        ...ParagraphGenericAccordion
      }
    }
  }
`;