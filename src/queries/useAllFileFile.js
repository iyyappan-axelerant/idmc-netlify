import { useStaticQuery, graphql } from "gatsby";

export const useAllFileFile = () => {
  const allFileFileQuery = useStaticQuery(graphql`
    query {
      allFileFile {
        edges {
          node {
            id
            drupal_id
            drupal_internal__fid
          }
        }
      }
    }
  `);

  return allFileFileQuery;
};
