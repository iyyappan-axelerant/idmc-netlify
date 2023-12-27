import { useStaticQuery, graphql } from "gatsby";

export const useTaxonomies = () => {
  const allTaxonomies = useStaticQuery(graphql`
    query {
      allTaxonomyTermRegion {
        edges {
          node {
            name
            id
          }
        }
      }
      allTaxonomyTermCountry {
        edges {
          node {
            name
            id
          }
        }
      }
      allTaxonomyTermTheme {
        edges {
          node {
            name
            id
          }
        }
      }

      allTaxonomyTermProductTags {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `);

  return allTaxonomies;
};
