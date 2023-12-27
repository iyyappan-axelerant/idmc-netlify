import React from "react";
import { ParagraphParagraphTextBlock } from "../components/paragraphs/ParagraphParagraphTextBlock";
import { ParagraphHeaderImage } from "../components/paragraphs/ParagraphHeaderImage";
import { ParagraphLinks } from "../components/paragraphs/ParagraphLinks";
import { ParagraphQuoteBlock } from "../components/paragraphs/ParagraphQuoteBlock";
import { ParagraphDepartmentBlockPeople } from "../components/paragraphs/ParagraphDepartmentBlockPeople";
import { ParagraphPartnerLogos } from "../components/paragraphs/ParagraphPartnerLogos";
import { ParagraphKeyPublications } from "../components/paragraphs/ParagraphKeyPublications";
import { ParagraphNodeExpertOpinion } from "../components/paragraphs/ParagraphNodeExpertOpinion";
import { ParagraphNodeMediaCentre } from "../components/paragraphs/ParagraphNodeMediaCentre";
import { ParagraphSlideShowContentBlock } from "../components/paragraphs/ParagraphSlideShowContentBlock";
import { ParagraphTextWithBackgroundImage } from "../components/paragraphs/ParagraphTextWithBackgroundImage";
import { ParagraphFlexibleColumn } from "../components/paragraphs/ParagraphFlexibleColumn";
import { ParagraphMediaBlendContentBlock } from "../components/paragraphs/ParagraphMediaBlendContentBlock";
import { ParagraphLargeSliderContentBlock } from "../components/paragraphs/ParagraphLargeSliderContentBlock";
import { ParagraphLatestFeaturedContentBlock } from "../components/paragraphs/ParagraphLatestFeaturedContentBlock";
import { ParagraphNodePublication } from "../components/paragraphs/ParagraphNodePublication";
import { ParagraphMediaBeside } from "../components/paragraphs/ParagraphMediaBeside";
import { ParagraphNodeShorthand } from "../components/paragraphs/ParagraphNodeShorthand";
import { ParagraphCarouselSlider } from "../components/paragraphs/ParagraphCarouselSlider";
import { ParagraphGenericAccordion } from "../components/paragraphs/ParagraphGenericAccordion";
import ParagraphTabComponent from "../components/paragraphs/ParagraphTabComponent";
import { ParagraphCountryMap } from "../components/paragraphs/ParagraphCountryMap";

const components = {
  paragraph__paragraph_text_block: ParagraphParagraphTextBlock,
  paragraph__paragraph_header_image: ParagraphHeaderImage,
  paragraph__links: ParagraphLinks,
  paragraph__quote1: ParagraphQuoteBlock,
  paragraph__department_block_people: ParagraphDepartmentBlockPeople,
  paragraph__with_thanks: ParagraphPartnerLogos,
  paragraph__key_publications: ParagraphKeyPublications,
  node__expert_opinion: ParagraphNodeExpertOpinion,
  node__media_centre: ParagraphNodeMediaCentre,
  paragraph__slideshow: ParagraphSlideShowContentBlock,
  paragraph__text_with_background_image: ParagraphTextWithBackgroundImage,
  paragraph__flexible_column: ParagraphFlexibleColumn,
  paragraph__media_blend_content_block: ParagraphMediaBlendContentBlock,
  paragraph__large_slider_content_block: ParagraphLargeSliderContentBlock,
  paragraph__latest_report_content_block: ParagraphLatestFeaturedContentBlock,
  node__publications: ParagraphNodePublication,
  paragraph__media_beside_content_block: ParagraphMediaBeside,
  node__shorthand: ParagraphNodeShorthand,
  paragraph__carousel_slider: ParagraphCarouselSlider,
  paragraph__generic_accordion: ParagraphGenericAccordion,
  paragraph__tab_component: ParagraphTabComponent,
  paragraph__countries_map_paragraph: ParagraphCountryMap,
};

export const getParagraph = (node) => {
  if (components.hasOwnProperty(node.type || node.publicationType)) {
    const ParagraphComponent = components[node.type || node.publicationType];
    return <ParagraphComponent key={node.id} node={node} />;
  }
  return;
};
