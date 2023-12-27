import { useStaticQuery, graphql } from "gatsby";

export const useMainFooter = () => {
  const mainFooterQuery = useStaticQuery(graphql`
    query {
      blockContentPageFooter {
        preText: field_nrc_logo_pre_text
        copyRight: field_copy_right_text
        footerLinks: field_footer_links {
          title
          url
        }
        field_start_year
        relationships {
          field_idmc_logo {
            relationships {
              field_media_svg {
                url
              }
            }
          }
          field_nrc_logo {
            relationships {
              field_media_svg {
                url
              }
            }
          }
        }
      }

      allMenuLinkContentFooter(sort: { weight: ASC }) {
        edges {
          node {
            title
            link {
              title
              uri
              url
              options {
                attributes {
                  target
                  class
                }
              }
            }
            enabled
            drupal_id
            menu_name
          }
        }
      }
    }
  `);

  return mainFooterQuery;
};
