import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useTaxonomies } from "../queries/useTaxonomies";
import {
  getReactSelectFormattedOptions,
  getIntersectionOf,
  getConcatOf,
  getArrayOfIDs,
} from "../utils/miscUtils";
import TemplateLayout from "../components/molecules/TemplateLayout";
import Form from "react-bootstrap/Form";
import HeroSection from "../components/templates/ExpertOpinion/HeroSection";
import { graphql } from "gatsby";
import ContentReferenceCard from "../components/molecules/Cards/ContentReference";
import ReactPaginate from "react-paginate";

export const Search = ({ data }) => {
  const {
    localSearchPublications,
    localSearchExpertopinions,
    localSearchShorthand,
    localSearchEvents,
    localSearchPartnerSpotlight,
    localSearchGoodPractice,
  } = data;

  useEffect(() => {
    const concats = getConcatOf([
      Object.values(localSearchPublications?.store),
      Object.values(localSearchExpertopinions?.store),
      Object.values(localSearchShorthand?.store),
      Object.values(localSearchEvents?.store),
      Object.values(localSearchPartnerSpotlight?.store),
      Object.values(localSearchGoodPractice?.store),
    ]);

    setAllData(concats);
    setResults(concats);
  }, [data]);

  const [results, setResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedProductTags, setSelectedProductTags] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allData, setAllData] = useState();
  const [allFilters, setAllFilters] = useState();

  const {
    allTaxonomyTermCountry,
    allTaxonomyTermRegion,
    allTaxonomyTermTheme,
    allTaxonomyTermProductTags,
  } = useTaxonomies();

  let regionOptions = getReactSelectFormattedOptions(allTaxonomyTermRegion);
  let countryOptions = getReactSelectFormattedOptions(allTaxonomyTermCountry);
  let themeOptions = getReactSelectFormattedOptions(allTaxonomyTermTheme);
  let productTagsOptions = getReactSelectFormattedOptions(
    allTaxonomyTermProductTags
  );

  const getSearchResults = (e) => {
    e.preventDefault();

    const regexp = new RegExp(searchKeyword, "i");
    let filter = (results.length ? results : allData).filter((x) =>
      regexp.test(x?.title)
    );
    setResults(filter);
  };

  useEffect(() => {
    const arr = [
      selectedProductTags,
      selectedRegions,
      selectedCountries,
      selectedThemes,
    ];
    const newArr = arr.flat();
    setAllFilters(newArr);
  }, [selectedRegions, selectedCountries, selectedThemes, selectedProductTags]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = results?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(results?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % results?.length;

    setItemOffset(newOffset);
  };

  return (
    <Layout>
      <TemplateLayout>
        <HeroSection
          data={{
            title: "Search",
            field_blog_intro: {
              value:
                "The IDMC portal is your content hub and provides comprehensive resources about internal displacement. Featuring a diverse range of resources including reports, expert opinions, events, and good practices, it provides a centralized source of information and analysis. Use the filters or the search below to find the most relevant information for your area of interest",
            },
          }}
        ></HeroSection>
      </TemplateLayout>

      <Container className="my-5rem">
        <Row className="mb-5 row-gap-3">
          <Col xs={12} md={6} lg={4} xl={3}>
            <Select
              options={productTagsOptions}
              isClearable={true}
              className="react-select-container"
              classNamePrefix="react-select"
              name="productTag"
              isMulti
              placeholder="Product Tags"
              onChange={(e) => setSelectedProductTags(e)}
            />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={regionOptions}
              isClearable={true}
              name="region"
              isMulti
              placeholder="Regions"
              onChange={(e) => setSelectedRegions(e)}
            />
          </Col>

          <Col xs={12} md={6} lg={4} xl={3}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={countryOptions}
              isClearable={true}
              name="country"
              placeholder="Countries"
              isMulti
              onChange={(e) => setSelectedCountries(e)}
            />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={themeOptions}
              isClearable={true}
              // controlShouldRenderValue={true}
              name="theme"
              placeholder="Themes"
              isMulti
              onChange={(e) => setSelectedThemes(e)}
            />
          </Col>

          <Col xs={12} md={6} lg={4} xl={3}>
            <Form.Control type="date" placeholder="Published Date" />
          </Col>

          <Col xs={12} md={6} lg={4} xl={1}>
            <button
              className="btn-square-regalBlue"
              onClick={() => {
                let temp = [...allData];

                if (selectedProductTags.length) {
                  temp = allData?.filter((d) => {
                    if (
                      selectedProductTags
                        .map((r) => {
                          return r.value;
                        })
                        .indexOf(d?.field_product_tags?.id) >= 0
                    ) {
                      return d;
                    }
                  });
                }

                if (selectedRegions.length) {
                  temp = allData?.filter((d) => {
                    if (
                      selectedRegions
                        .map((r) => {
                          return r.value;
                        })
                        .indexOf(d?.field_region?.id) >= 0
                    ) {
                      return d;
                    }
                  });
                }

                if (selectedCountries.length) {
                  temp = temp?.filter((d) => {
                    const array = getIntersectionOf(
                      selectedCountries.map((r) => r.value),
                      d?.field_country?.map((country) => country?.id) ?? []
                    );

                    return array?.length >= 1;
                  });
                }

                if (selectedThemes.length) {
                  temp = temp?.filter((d) => {
                    const array = getIntersectionOf(
                      selectedThemes.map((r) => r.value),
                      d?.field_theme?.map((theme) => theme?.id) ?? []
                    );

                    return array?.length >= 1;
                  });
                }

                setResults(temp);
              }}
            >
              Filter
            </button>
          </Col>
          <Col xs={12} md={6} lg={4} xl={4}>
            <form>
              <input
                type="text"
                className="rounded-input me-2"
                placeholder="search"
                value={searchKeyword}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchKeyword(e.target.value);
                }}
              />
              <button
                onClick={(e) => getSearchResults(e)}
                className="btn-square-regalBlue"
              >
                Search
              </button>
            </form>
          </Col>
        </Row>

        {allFilters && (
          <Row className="tags-chip d-flex mb-5 px-2">
            {allFilters?.map((filter) => {
              return <p className="tags-chip__item">{filter?.label}</p>;
            })}
          </Row>
        )}

        {results.length ? (
          <>
            <Row className="results-container">
              <h5>All Searched data - {results?.length}</h5>
              {currentItems?.map((d) => (
                <Col xs={12} md={6} xl={4} className="mb-5">
                  <ContentReferenceCard
                    title={d?.title}
                    imageURL={d?.field_image?.gatsbyImage}
                    eyebrowText={d?.field_product_tags?.name || d?.type}
                    authorDetails={d?.field_authors}
                    field_theme={d?.field_theme}
                    field_region={d?.field_region}
                    field_country={d?.field_country}
                    linkTo={d?.slug?.slug || d?.slug}
                  />
                </Col>
              ))}
            </Row>

            <ReactPaginate
              className="custom-pagination"
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Prev"
              renderOnZeroPageCount={null}
            />
          </>
        ) : (
          <>
            <Row>
              <h5>Sorry couldn't find what you are looking for :(</h5>
            </Row>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Search;

export const pageQuery = graphql`
  query {
    localSearchPublications {
      store
    }
    localSearchExpertopinions {
      store
    }
    localSearchShorthand {
      store
    }
    localSearchEvents {
      store
    }
    localSearchPartnerSpotlight {
      store
    }
    localSearchGoodPractice {
      store
    }
  }
`;
