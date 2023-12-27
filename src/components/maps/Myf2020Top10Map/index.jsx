import { useEffect, useCallback } from "react";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";

export const Myf2020Top10Map = ({ data }) => {
  return (
    <>
      <Helmet>
        <script src={withPrefix("maps/amcharts/amcharts.js")}></script>
        <script src={withPrefix("maps/ammap/ammap.js")}></script>
        <script src={withPrefix("maps/amcharts/xy.js")}></script>
        <script src={withPrefix("maps/amcharts/serial.js")}></script>
        <script src={withPrefix("maps/amcharts/themes/light.js")}></script>
        <script
          src={withPrefix("maps/amcharts/plugins/export/export.min.js")}
        ></script>
        <script
          src={withPrefix("maps/amcharts/plugins/dataloader/dataloader.js")}
        ></script>
        <script
          src={withPrefix("maps/amcharts/plugins/responsive/responsive.js")}
        ></script>
        <script
          src={withPrefix(
            "maps/amcharts/plugins/export/libs/fabric.js/fabric.min.js"
          )}
        ></script>
        <script
          src={withPrefix(
            "maps/amcharts/plugins/export/libs/FileSaver.js/FileSaver.min.js"
          )}
        ></script>
        <script
          src={withPrefix("maps/amcharts/plugins/export/libs/jszip/jszip.js")}
        ></script>
        <script
          src={withPrefix(
            "maps/amcharts/plugins/export/libs/pdfmake/pdfmake.min.js"
          )}
        ></script>
        <script
          src={withPrefix("maps/libs/pdfmake/0.1.36/vfs_fonts.js")}
        ></script>
        <script
          src={withPrefix("maps/amcharts/plugins/export/libs/xlsx/xlsx.js")}
        ></script>
        <script src={withPrefix("maps/idmcscript/roundnumber.js")}></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/1.9.3/countUp.min.js"></script>
        <script src={withPrefix("maps/wowinit.js")}></script>
        <link
          rel="stylesheet"
          href={withPrefix("/maps/amcharts/plugins/export/export.css")}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
        />
        <link
          rel="stylesheet"
          href={withPrefix("maps/assets/myf_2019.css")}
        ></link>
        <style type="text/css">
          {`
            .myf2020-top10-map-container .container{
                height: auto;
                margin-bottom:3em
            }
            `}
        </style>
      </Helmet>
      <Container className="myf2020-top10-map-container">
        <Row>
          <div class="wow zoomIn container" align="center">
            <figcaption>
              <span>
                You can interact with this infographic to see in-depth data
              </span>
            </figcaption>
            <embed
              type="image/svg+xml"
              src="/maps/assets/my2020-conflicts_disasters.svg"
              width="100%"
              height="700"
            />
          </div>
        </Row>
      </Container>
    </>
  );
};
