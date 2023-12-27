import { graphql } from "gatsby";
import { useEffect, useCallback } from "react";
import * as React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"

export const AridMap = ({ data }) => {
    // Keep the function reference
    const setWindowParams = useCallback(() => {
        const mapjsTag = document.createElement('script')
        // given the js/main.js file is put in the static folder
        mapjsTag.src = withPrefix('maps/idu.js')
        
        document.body.appendChild(mapjsTag)
      },[data])
    
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
        <script src={withPrefix("maps/amcharts/plugins/export/export.min.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/dataloader/dataloader.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/responsive/responsive.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/export/libs/fabric.js/fabric.min.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/export/libs/FileSaver.js/FileSaver.min.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/export/libs/jszip/jszip.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/export/libs/pdfmake/pdfmake.min.js")}></script>
        <script src={withPrefix("maps/libs/pdfmake/0.1.36/vfs_fonts.js")}></script>
        <script src={withPrefix("maps/amcharts/plugins/export/libs/xlsx/xlsx.js")}></script>
        <script src={withPrefix("maps/idmcscript/roundnumber.js")}></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <script src={withPrefix("maps/wowinit.js")}></script>
        <link rel="stylesheet" href={withPrefix("/maps/amcharts/plugins/export/export.css")} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"/>
        <link rel="stylesheet" href={withPrefix("maps/assets/myf_2019.css")}></link>
        <style type="text/css">
          {
            `
            @import url('https://fonts.googleapis.com/css?family=Roboto');
            #globaltooltip {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1000005;
              opacity: 0;
              margin-top: 20px;
              background: #000;
              color: #fff;
              border-radius: 3px;
              padding: 10px;
              }
            #globaltooltip.showIt {
                opacity: 1;
              font-family: roboto, sans-serif;
              }
              #globaltooltip .name {
                font-weight: bold;
              }
              #globaltooltip .disaster {
                color: #0d93d2!important
              }
              #globaltooltip .conflict {
                color: #ef7d00!important
              }
              .wow .map-wrapper {
                position: relative;
              }
              .wow .map-wrapper-item {
                height: auto;
              }
            `
          }
        </style>
      </Helmet>
        <Container className="general-container my-5rem px-2 p-md-0">
            <div class="bs_grid container">
                <div class="row">
                <div class="wow zoomIn container" align="center">
                    <figcaption><span>Hover over the map to see country data</span></figcaption>
                    <div class="map-wrapper">
                        <embed class="map-wrapper-item" type="image/svg+xml" src={withPrefix("/maps/assets/arid.svg")} width="100%" height="700" />
                            <div id="globaltooltip">
                            <p><span class="name"></span><br/>
                            <span class="disaster"></span>
                            <span class="colon"></span>
                            <span class="conflict"></span>
                            </p>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
        </Container>
      </>
    );
  };