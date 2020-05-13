exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: "null" } } }) {
        nodes {
          id
          category {
            id
            title
          }
          title
          slug {
            current
          }
          subhead
          byline {
            title
            name
          }
          thumbnail {
            asset {
              fluid {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
              url
            }
          }
          heroImage {
            asset {
              fluid {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
              url
            }
          }
          body {
            ... on SanityBodyText {
              _key
              _type
              textContent {
                _key
                _type
                style
                list
                sanityChildren {
                  text
                  marks
                  _type
                  _key
                }
              }
            }
            ... on SanityFullBleedPhoto {
              _key
              _type
              imageCaption
              image {
                asset {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                  url
                }
              }
            }
            ... on SanityInlinePhoto {
              _key
              _type
              imageCaption
              image {
                asset {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                  url
                }
              }
            }
            ... on SanityIntroText {
              _key
              _type
              intro {
                _key
                _type
                style
                list
              }
            }
            ... on SanityTwoPhotoWide {
              _key
              _type
              images {
                imageCaption
                image {
                  asset {
                    fluid {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                    url
                  }
                }
              }
            }
            ... on SanityTwoPhotoMedium {
              _key
              _type
              images {
                imageCaption
                image {
                  asset {
                    fluid {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                    url
                  }
                }
              }
            }
          }
          credits {
            name
            title
            _key
          }
          _rawBody
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allSanityPost.nodes || []

  posts.forEach((post, index) => {
    const path = `/${post.slug.current}`
    createPage({
      path,
      component: require.resolve("./src/templates/post.js"),
      context: post,
    })
  })
}
