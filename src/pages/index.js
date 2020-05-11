import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
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
          subhead
        }
      }
      allSanityCategory {
        nodes {
          title
        }
      }
    }
  `)

  const [allPosts] = useState(data.allSanityPost.nodes)
  const [allCategories] = useState(
    data.allSanityCategory.nodes.concat({ title: "All" })
  )
  const [currentCategory] = useState({ title: "All" })
  const [currentPosts] = useState(null)

  debugger

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
