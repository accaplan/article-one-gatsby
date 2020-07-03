exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
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
            name
            title
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
            _key
            _type
            layout
            image {
              asset {
                url
                fluid {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
          introText
          credits {
            url
            title
            name
          }
          body {
            ... on SanityBodyText {
              _key
              _type
              textContent {
                _key
                _type
                list
                style
              }
            }
            ... on SanityFullBleedPhoto {
              _key
              _type
              imageCaption
              image {
                asset {
                  url
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
            ... on SanityInlinePhoto {
              _key
              _type
              imageCaption
              image {
                asset {
                  url
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
            ... on SanityPullQuote {
              _key
              _type
              quote {
                _key
                _type
                list
                style
              }
            }
            ... on SanityTwoPhotoMedium {
              _key
              _type
              images {
                imageCaption
                image {
                  _type
                  _key
                  asset {
                    url
                    fluid {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
                _type
                _key
              }
            }
            ... on SanityTwoPhotoWide {
              _key
              _type
              images {
                imageCaption
                image {
                  asset {
                    url
                    fluid {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
            }
            ... on SanityExternalVideo {
              _key
              _type
              videoUrl
            }
            ... on SanityVideoFile {
              _key
              _type
              url {
                asset {
                  url
                }
              }
            }
            ... on SanityPlaylist {
              _key
              _type
              audioUrl
              title
              cover {
                asset {
                  url
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
          }
          _rawBody(resolveReferences: { maxDepth: 100 })
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
