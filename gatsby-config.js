require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: "IDMC - Internal Displacement Monitorning Centre",
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`],
          quality: 50,
          placeholder: "blurred",
          breakpoints: [768, 992, 1200, 1400],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/, // See below to configure properly
        },
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_URL,
        apiBase: `api`, // optional, defaults to `jsonapi`
        skipFileDownloads: true,
        fastBuilds: true,
        requestTimeoutMS: 100000,
        concurrentAPIRequests: 20,
      },
    },

    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodePage {
              edges {
                node {
                  id
                  title
                  node_type {
                    drupal_internal__target_id
                  }
                  relationships {
                    field_theme {
                      name
                      id
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: ["id", "title", "type", "field_theme"],

        normalizer: ({ data }) =>
          data.allNodePage.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type:
              edge?.node?.node_type?.drupal_internal__target_id || "Basic Page",
            field_theme: edge?.node?.relationships?.field_theme,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "publications",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodePublications(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  node_type {
                    drupal_internal__target_id
                  }
                  fields {
                    slug
                  }
                  field_published
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                      drupal_internal__tid
                    }
                    field_region {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                    field_image {
                      url
                      gatsbyImage(width: 500, height: 300)
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_published",
          "field_country",
          "field_region",
          "field_theme",
          "field_image",
          "field_product_tags",
          "slug",
        ],

        normalizer: ({ data }) =>
          data.allNodePublications.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_theme: edge?.node?.relationships?.field_theme,
            field_image: edge?.node?.relationships?.field_image,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
            slug: edge?.node?.fields,
            field_published: edge?.node?.field_published,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "expertopinions",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeExpertOpinion(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  field_published
                  node_type {
                    drupal_internal__target_id
                  }
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                      drupal_internal__tid
                    }
                    field_region {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                    field_authors {
                      name
                      id
                      relationships {
                        field_author_image {
                          relationships {
                            field_media_image {
                              gatsbyImage(width: 58, height: 58)
                            }
                          }
                        }
                      }
                    }
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_country",
          "field_region",
          "field_theme",
          "field_product_tags",
          "field_authors",
          "slug",
          "field_published",
        ],

        normalizer: ({ data }) =>
          data.allNodeExpertOpinion.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_theme: edge?.node?.relationships?.field_theme,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
            field_authors: edge?.node?.relationships?.field_authors,
            slug: edge?.node?.fields,
            field_published: edge?.node?.field_published,
          })),
      },
    },

    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "shorthand",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeShorthand(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  field_published
                  field_iframe_url
                  node_type {
                    drupal_internal__target_id
                  }
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                      drupal_internal__tid
                    }
                    field_region {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_country",
          "field_region",
          "field_theme",
          "slug",
          "field_published",
        ],

        normalizer: ({ data }) =>
          data.allNodeShorthand.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_theme: edge?.node?.relationships?.field_theme,
            slug: edge?.node?.field_iframe_url,
            field_published: edge?.node?.field_published,
          })),
      },
    },

    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "events",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeEvents(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  node_type {
                    drupal_internal__target_id
                  }
                  field_published
                  field_event_place
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                      drupal_internal__tid
                    }
                    field_region {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                    field_image {
                      url
                      gatsbyImage(width: 500, height: 300)
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_published",
          "field_event_place",
          "field_country",
          "field_region",
          "field_theme",
          "field_image",
          "field_product_tags",
        ],

        normalizer: ({ data }) =>
          data.allNodeEvents.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            field_published:  edge?.node?.field_published,
            field_event_place: edge?.node?.field_event_place,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_theme: edge?.node?.relationships?.field_theme,
            field_image: edge?.node?.relationships?.field_image,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
          })),
      },
    },

    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "partnerSpotlight",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodePartnerSpotlight(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  field_published
                  node_type {
                    drupal_internal__target_id
                  }
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                    }
                    field_metatag_image {
                      url
                      gatsbyImage(width: 500, height: 300)
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_theme",
          "field_image",
          "field_product_tags",
          "field_published",
        ],

        normalizer: ({ data }) =>
          data.allNodePartnerSpotlight.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_theme: edge?.node?.relationships?.field_theme,
            field_image: edge?.node?.relationships?.field_metatag_image,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
            field_published: edge?.node?.field_published,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "goodPractice",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeGoodPractice(sort: { changed: DESC }) {
              edges {
                node {
                  id
                  title
                  node_type {
                    drupal_internal__target_id
                  }
                  fields {
                    slug
                  }
                  field_time_frame
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                    }
                    field_authors {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                    field_region {
                      name
                      id
                    }
                    field_gp_thumbnail_image {
                      relationships {
                        field_media_image {
                          url
                          gatsbyImage(width: 500, height: 500)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_time_frame",
          "field_theme",
          "field_image",
          "field_product_tags",
          "field_region",
          "field_country",
          "field_authors",
          "slug",
        ],

        normalizer: ({ data }) =>
          data.allNodeGoodPractice.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_theme: edge?.node?.relationships?.field_theme,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_authors: edge?.node?.relationships?.field_authors,
            slug: edge?.node?.fields,
            field_image:
              edge?.node?.relationships?.field_gp_thumbnail_image?.relationships
                ?.field_media_image,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
            field_time_frame: edge?.node?.field_time_frame,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "featuresIframe",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeIframe {
              edges {
                node {
                  id
                  title
                  field_published
                  node_type {
                    drupal_internal__target_id
                  }
                  fields {
                    slug
                  }
                  relationships {
                    field_product_tags {
                      name
                      id
                    }
                    field_theme {
                      name
                      id
                    }
                    field_authors {
                      name
                      id
                    }
                    field_country {
                      name
                      id
                    }
                    field_region {
                      name
                      id
                    }
                    field_image {
                      url
                      gatsbyImage(width: 10)
                    }
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: [
          "id",
          "title",
          "type",
          "field_theme",
          "field_image",
          "field_product_tags",
          "field_region",
          "field_country",
          "field_authors",
          "slug",
          "field_published",
        ],

        normalizer: ({ data }) =>
          data.allNodeIframe.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            field_theme: edge?.node?.relationships?.field_theme,
            field_country: edge?.node?.relationships?.field_country,
            field_region: edge?.node?.relationships?.field_region,
            field_authors: edge?.node?.relationships?.field_authors,
            slug: edge?.node?.fields,
            field_image:
              edge?.node?.relationships?.field_gp_thumbnail_image?.relationships
                ?.field_media_image,
            field_product_tags: edge?.node?.relationships?.field_product_tags,
            field_published: edge?.node?.field_published,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "countryProfile",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allNodeCountryProfile {
              edges {
                node {
                  title
                  id
                  relationships {
                    field_cover_image {
                      gatsbyImage(width: 10)
                      url
                    }
                  }
                  node_type {
                    drupal_internal__target_id
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,

        ref: "id",
        index: ["title"],
        store: ["id", "title", "type", "slug", "field_image"],

        normalizer: ({ data }) =>
          data.allNodeCountryProfile.edges.map((edge) => ({
            id: edge?.node.id,
            title: edge?.node.title,
            type: edge?.node?.node_type?.drupal_internal__target_id,
            slug: edge?.node?.fields,
            field_image: edge?.node?.relationships?.field_cover_image,
          })),
      },
    },
  ],
};
