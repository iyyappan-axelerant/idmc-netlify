import { useStaticQuery, graphql } from "gatsby";

export const useFileFile = () => {
  const { allFileFile } = useStaticQuery(graphql`
    query allFileFile {
      allFileFile {
        edges {
          node {
            drupal_id
            url
          }
        }
      }
    }
  `);

  return allFileFile.edges;
};
