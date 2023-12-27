import { graphql } from "gatsby";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getParagraph } from "../../../utils/paragraphHelpers";
import ExtractRichText from "../../molecules/ExtractRichText";
import "./ParagraphTabComponent.scss";

export const ParagraphTabComponent = ({ node }) => {
  const paragraphs = node?.relationships?.field_tab_item?.map((item) => {
    return getParagraph(item?.relationships?.field_tab_content?.[0]);
  });
  const [value, setValue] = useState(
    node?.relationships?.field_tab_item?.[0]?.field_tab_title
  );
  const [tabValue, setTabValue] = useState(null);
  console.log(tabValue, "TT");
  return (
    <div>
      <Container className="general-container space-x">
        <h2 className="color-regalBlue">{node?.field_tab_component_title}</h2>
        <div>
          <ExtractRichText
            richText={node?.field_tab_description?.value}
          ></ExtractRichText>
        </div>
      </Container>
      <div className="tabs">
        <Tabs
          defaultActiveKey={
            node?.relationships?.field_tab_item?.[0]?.field_tab_title
          }
          id="uncontrolled-tab-example"
          className="mb-4"
          onSelect={(k) => {
            setValue(k);
            setTabValue(k);
          }}
        >
          {node?.relationships?.field_tab_item?.map((item, key) => {
            if (
              item?.relationships?.field_tab_content?.[0]?.type ===
              "paragraph__iframe_referer"
            ) {
              return (
                <Tab
                  key={key}
                  eventKey={item?.field_tab_title}
                  title={item?.field_tab_title}
                >
                  <Container className="general-container space-x">
                    {item?.relationships?.field_tab_content?.map(
                      (item, key) => {
                        return (
                          <iframe
                            key={key}
                            src={item?.field_iframe_link}
                            width="100%"
                            height="727px"
                            seamless="seamless"
                            scrolling="no"
                          ></iframe>
                        );
                      }
                    )}
                  </Container>
                </Tab>
              );
            } else {
              return (
                <Tab
                  key={key}
                  eventKey={item?.field_tab_title}
                  title={item?.field_tab_title}
                >
                  {paragraphs ? (
                    <div key={key} className="tabs-paragraph">
                      {paragraphs}
                    </div>
                  ) : null}
                </Tab>
              );
            }
          })}
        </Tabs>
      </div>
      <div className="country-dropdown">
        <Container className="general-container p-0">
          <Form.Select
            onChange={(e) => {
              setValue(e?.target?.value);
            }}
            bsPrefix="select select-wrapper btn"
          >
            {node?.relationships?.field_tab_item?.map((item, key) => {
              if (tabValue === null) {
                return (
                  <option key={key} value={item?.field_tab_title}>
                    {item?.field_tab_title}
                  </option>
                );
              } else
                return (
                  <option
                    selected={tabValue === value ? true : false}
                    key={key}
                    value={item?.field_tab_title}
                  >
                    {item?.field_tab_title}
                  </option>
                );
            })}
          </Form.Select>
        </Container>
        {node?.relationships?.field_tab_item?.map((item, key) => {
          if (
            item?.relationships?.field_tab_content?.[0]?.type ===
            "paragraph__iframe_referer"
          ) {
            return (
              <>
                {value === item?.field_tab_title && (
                  <Container className="general-container space-x">
                    {item?.relationships?.field_tab_content?.map(
                      (item, key) => {
                        return (
                          <iframe
                            key={key}
                            src={item?.field_iframe_link}
                            width="100%"
                            height="727px"
                            seamless="seamless"
                            scrolling="no"
                          ></iframe>
                        );
                      }
                    )}
                  </Container>
                )}
              </>
            );
          } else {
            return (
              <>
                {value === item?.field_tab_title && (
                  <div>
                    {paragraphs ? (
                      <div key={key} className="tabs-paragraph">
                        {paragraphs}
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphTabComponent on paragraph__tab_component {
    field_tab_component_title
    field_tab_description {
      value
    }
    relationships {
      field_tab_item {
        field_tab_title
        relationships {
          field_tab_content {
            type: __typename
            ... on paragraph__iframe_referer {
              field_iframe_link
            }
            ...ParagraphParagraphTextBlock
          }
        }
      }
    }
  }
`;

export default ParagraphTabComponent;
