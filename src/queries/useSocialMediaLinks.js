import { useStaticQuery, graphql } from "gatsby";

export const useSocialMedia = () => {
  const socialMediaLinks = useStaticQuery(graphql`
    query {
      blockContentSocialMediaLinks {
        id
        info
        field_links {
          platform_values {
            facebook {
              value
            }
            linkedin {
              value
            }
            twitter {
              value
            }
            youtube {
              value
            }
          }
        }
      }
    }
  `);

  return socialMediaLinks;
};
