import { useStaticQuery, graphql } from "gatsby";

export const useMainHeader = () => {
  const mainHeaderQuery = useStaticQuery(graphql`
    query {
      allMenuLinkContentMain(sort: { weight: ASC }) {
        edges {
          node {
            enabled
            title
            expanded
            external
            langcode
            weight
            link {
              url
              options {
                attributes {
                  class
                }
              }
            }
            drupal_parent_menu_item
            bundle {
              drupal_internal__target_id
            }
            drupal_id
            menu_name
            field_teaser_title
            relationships {
              field_product_tags {
                name
              }
              field_teaser_image {
                relationships {
                  field_media_image {
                    url
                  }
                }
              }
            }
            field_teaser_cta {
              title
              url
              options {
                attributes {
                  class
                }
              }
            }
          }
        }
      }
    }
  `);

  return mainHeaderQuery;
};
