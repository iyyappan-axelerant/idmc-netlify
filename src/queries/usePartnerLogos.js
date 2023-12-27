import { useStaticQuery, graphql } from "gatsby";

export const usePartnerLogos = () => {
  const partnerLogosQuery = useStaticQuery(graphql`
    query {
      allParagraphWithThanks {
        edges {
          node {
            field_with_thanks_title
            relationships {
              field_partner_logo {
                gatsbyImage(width: 325, fit: COVER, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  `);
  return partnerLogosQuery;
};
