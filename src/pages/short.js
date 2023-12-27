import { graphql } from "gatsby";
import { useEffect, useCallback } from "react";
import * as React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"

const CountryProfileMap = ({ data }) => {
    // Keep the function reference
    const setWindowParams = useCallback(() => {
        const mapjsTag = document.createElement('script')
        // given the js/main.js file is put in the static folder
        mapjsTag.src = withPrefix('maps/databasemap.js')
        
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
            #mapdiv_id{
              height: 480px;
              display: inline-block;
              width: 80%;
            }
            `
          }
        </style>
      </Helmet>
      <Layout>
        <Container className="external-article-container">
          <Row>
            <Col>              
                <div class="row">
                    <div id="mapdiv_id" class="containter"></div>
                </div>
            </Col>
          </Row>
        </Container>
      </Layout>
      </>
    );
  };


export default CountryProfileMap;