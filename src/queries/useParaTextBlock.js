import { useStaticQuery, graphql } from "gatsby";

export const useParaTextBlock = () => {
  const paraTextBlockQuery = useStaticQuery(graphql`
    query {
      allParagraphParagraphTextBlock {
        edges {
          node {
            field_background_color
            field_paragraph_body {
              value
            }
            field_paragraph_title
          }
        }
      }
    }
  `);

  return paraTextBlockQuery;
};
