import { useEffect, useCallback } from "react";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";

export const DatabaseMapAAD = ({ data }) => {
  // Keep the function reference
  const setWindowParams = useCallback(() => {
    const mapjsTag = document.createElement("script");
    // given the js/main.js file is put in the static folder
    mapjsTag.src = withPrefix("maps/databasemap-aad.js");

    document.body.appendChild(mapjsTag);
  }, [data]);

  useEffect(() => {
    setWindowParams();
  }, [setWindowParams]);

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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/1.9.3/countUp.min.js"
          type="text/javascript"
        ></script>
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
            .select-country-on-map {
                width: 225px;
                height: 36px;
                border-radius:  0;
                -webkit-appearance: none;
                text-align-last: center;
                background: #333132;
                color: #ffffff;
                font-family: Lato;
                  font-size: 18px;
                  background: url("{{ '/' ~ active_theme_path() ~ '/images/down-arrow.svg' }}") 96% / 15% no-repeat;
                /*background: url("/themes/idmc/images/down-arrow.svg") 96% / 15% no-repeat;*/
                background-size: auto;
            }
            .div-select-country-on-map {
                position: inherit !important;
            }
            .div-select-country-on-map .select2-container .select2-selection--single, .select2-container--default .select2-selection--single .select2-selection__arrow  {
                margin-top:1px
            }
            .database-map-aad-container .row1 {
                text-align: center;
                background: #333132;
            }
            .database-map-aad-container .row1 h2 {
                color: #fff;
            }
            .database-map-aad-container .row1 #mapdiv_id {
                height: 480px;
                display: inline-block;
                width: 80%;
            }
            .database-map-aad-container .row1 #select {
                padding-top:20px
            }
            .database-map-aad-container .row2 .container {
                padding-bottom:30px
            }
            #aadspecific .float-left {
                float: left;
            }
            `}
        </style>
      </Helmet>
      <Container className="database-map-aad-container">
        <div class="row row1">
          <h2>
            Explore the likelihood of future displacement around the world
          </h2>
          <div id="mapdiv_id" class="containter"></div>
          <div id="select"></div>
          <p>&nbsp;</p>
        </div>
        <div class="row row2">
          <div class="container">
            <div id="aadresult">
              <h3 id="aadtitle"></h3>
              <div id="test"></div>
              <div class="row">
                <div class="container" id="aadspecific"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
