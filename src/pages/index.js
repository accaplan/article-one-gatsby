import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import styled from "styled-components"

const PostsWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
`

const PostLink = styled.article`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  @media (min-width: 1024px) {
    &:nth-of-type(5n + 1),
    &:nth-of-type(5n + 2) {
      width: 50%;
      border-bottom: 1px solid;
    }
    &:nth-of-type(5n + 3),
    &:nth-of-type(5n + 4),
    &:nth-of-type(5n + 5) {
      width: 33.3%;
      border-bottom: 1px solid;
    }
    &:nth-of-type(5n + 1) {
      border-right: 1px solid;
    }
    &:nth-of-type(5n + 3),
    &:nth-of-type(5n + 4) {
      border-right: 1px solid;
    }
  }
`

const Thumbnail = styled.section``

const PostInfo = styled.section``

const Title = styled.h2``

const Subtitle = styled.h3``

const PostCategory = styled.p``

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
  const [currentPosts] = useState(data.allSanityPost.nodes)

  // debugger

  return (
    <Layout>
      <SEO title="Home" />

      <PostsWrapper>
        {currentPosts &&
          currentPosts.map(post => {
            return (
              <PostLink key={post.id}>
                <Link to={`/${post.slug.current}`}>
                  <Thumbnail>
                    <Img fluid={post.thumbnail.asset.fluid} />
                  </Thumbnail>
                  <PostInfo>
                    <Title>{post.title}</Title>
                    <Subtitle>{post.subhead}</Subtitle>
                    <PostCategory>{post.category[0].title}</PostCategory>
                  </PostInfo>
                </Link>
              </PostLink>
            )
          })}
      </PostsWrapper>
    </Layout>
  )
}

export default IndexPage
