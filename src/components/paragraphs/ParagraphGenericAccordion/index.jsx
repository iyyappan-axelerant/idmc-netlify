import React from "react";
import {graphql} from "gatsby";
import Accordion from 'react-bootstrap/Accordion';
import "./genericAccordion.scss";
import IconChevronRight from "../../atoms/Icons/IconChevronRight";
export const ParagraphGenericAccordion = ({ node }) => {
  const {relationships} = node;
  const {field_generic_accordion_items} = relationships ?? {}
  return (
    <div className="generic-accordion container">
      <Accordion defaultActiveKey="0">
        {
          field_generic_accordion_items?.map((item, index) => (
            <Accordion.Item eventKey={index}>
              <Accordion.Button>
                <p>{item?.field_ptitle}</p>
                <div className="accordion-indicator">
                  <IconChevronRight color="secondary" size="md"/>
                </div>
              </Accordion.Button>
              <Accordion.Body>
                <div dangerouslySetInnerHTML={{__html: item?.field_body?.value}}/>
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphGenericAccordion on paragraph__generic_accordion {
    id
    relationships {
      field_generic_accordion_items {
        field_ptitle
        field_body {
          value
        }
      }
    }
  }
`;