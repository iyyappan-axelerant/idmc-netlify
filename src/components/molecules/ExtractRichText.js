import * as React from "react";
import parse from "html-react-parser";
import { useFileFile } from "../../hooks/useFileFile";

export const ExtractRichText = ({ richText, extraClasses }) => {
  let edges = useFileFile();
  let body = '';
  if (richText) {
    body = extractImage(edges, richText, extraClasses);
  }

  return <>{body}</>;
};

function extractImage(result, body, extraClasses) {
  let body_elements = parse(body, {
    transform: function transform(node) {
      if (node.type === "img") {
        let uuid = node.props["data-entity-uuid"];
        let i = 0;
        for (i = 0; i < result.length; i++) {
          if (result[i].node.drupal_id === uuid) {
            return (
              <img
                key={i}
                loading="lazy"
                className={extraClasses}
                alt={node?.props?.alt}
                src={`${process.env.DRUPAL_URL}${node?.props?.src}`}
              />
            );
          }
        }
      }
      return node;
    },
  });

  return body_elements;
}

export default ExtractRichText;
