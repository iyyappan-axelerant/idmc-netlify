import { useStaticQuery, graphql } from "gatsby";

export const usePreHeaderQuery = () => {
  const preHeader = useStaticQuery(graphql`
    query {
      allMenuLinkContentPreHeaderMenu {
        edges {
          node {
            menu_name
            link {
              title
              url
            }
            title
          }
        }
      }
      blockContentPageFooter {
        relationships {
          field_header_logo {
            relationships {
              field_media_svg {
                url
              }
            }
            thumbnail {
              alt
            }
          }
        }
      }
    }
  `);
  return preHeader;
};
