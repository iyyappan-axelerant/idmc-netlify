import { useStaticQuery, graphql } from "gatsby";
import React, { useEffect } from "react";

export const usePrefooter = () => {
  let preFooterQuery;

  preFooterQuery = useStaticQuery(graphql`
    query {
      blockContentPageFooter {
        newsletter: field_newsletter {
          value
        }
        followIDMC: field_follow_idmc {
          value
        }
        getInTouch: field_get_in_touch {
          value
        }
        subscribeCTA: field_subscribe_cta {
          title
          url
        }
      }
    }
  `);

  return preFooterQuery;
};
