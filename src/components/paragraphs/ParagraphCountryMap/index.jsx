import React from "react";
import { graphql } from "gatsby";
import { DatabaseMap } from "../../maps/DatabaseMap";
import { AridMap } from "../../maps/AridMap";
import { DatabaseMapAAD } from "../../maps/DatabaseMapAAD";
import { Myf2020GlobalMap } from "../../maps/Myf2020GlobalMap";
import { Myf2020Top10Map } from "../../maps/Myf2020Top10Map";

export const ParagraphCountryMap = ({ node }) => {
  const countryMap = {
    "database-map": <DatabaseMap />,
    arid: <AridMap />,
    "database-map-aad": <DatabaseMapAAD />,
    "myf_2020-globalmap": <Myf2020GlobalMap />,
    "myf_2020-top10": <Myf2020Top10Map />,
  }[node.field_map_type];

  return <>{countryMap}</>;
};

export const fragment = graphql`
  fragment ParagraphCountryMap on paragraph__countries_map_paragraph {
    field_map_type
    id
  }
`;
