/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions }) => {
  const path = await import("path");
  const { data } = await graphql(`
    query ($gt: Date = "2018-05-30") {
      allNodePublications(sort: { changed: DESC }, filter: {created: {gt: $gt}}) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodeExpertOpinion(limit: 5, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodeIframe(limit: 5, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodePage(limit: 8, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodeCountryProfile(limit: 2, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodeDatabasePage {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodeEvents(limit: 5, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
      allNodePartnerSpotlight(limit: 5, sort: { changed: DESC }) {
        edges {
          node {
            id
            path {
              alias
            }
          }
        }
      }
    }
  `);

  data.allNodePublications.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve(
        "./src/components/templates/Publications/index.jsx"
      ),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodeExpertOpinion.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve(
        "./src/components/templates/ExpertOpinion/index.jsx"
      ),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodeIframe.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve("./src/components/templates/Features/index.jsx"),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodePage.edges.forEach(({ node }) => {
    if (node?.path?.alias) {
      actions.createPage({
        path: node.path.alias === "/home" ? "/" : node?.path?.alias,
        component: path.resolve(
          "./src/components/templates/NodeBasicPage/index.jsx"
        ),
        context: {
          id: node?.id ? node?.id : "",
          pathSlug: node.path.alias,
        },
      });
    }
  });

  data.allNodeCountryProfile.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve(
        "./src/components/templates/CountryProfile/index.jsx"
      ),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodeDatabasePage.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve("./src/components/templates/Database/index.jsx"),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodeEvents.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve("./src/components/templates/Events/index.jsx"),
      context: {
        id: node.id,
      },
    });
  });

  data.allNodePartnerSpotlight.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve(
        "./src/components/templates/PartnerSpotlight/index.jsx"
      ),
      context: {
        id: node.id,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // if (node.internal.type.includes("node__")) {
  if (node?.path?.alias) {
    const slug = `${node?.path?.alias}/`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  // }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    union relatedContent = paragraph__links
    type paragraph__paragraph_text_blockRelationships {
      field_cta_links: [relatedContent] @link(from: "field_cta_links___NODE")
    }
  `;
  createTypes(typeDefs);
};

// Schema customizations for key publications component.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    union contentReferenceUnion =
      node__shorthand
      | node__publications
      | node__partner_spotlight
      | node__media_centre
      | node__iframe
      | node__expert_opinion
      | node__events
      | node__country_profile
      | node__careers

    type paragraph__key_publications implements Node {
      relationships: paragraph__key_publicationsRelationships
    }
    type paragraph__key_publicationsRelationships {
      field_key_publication: [contentReferenceUnion] @link(from: "field_key_publication___NODE")
    }
  `;

  createTypes(typeDefs);
};
