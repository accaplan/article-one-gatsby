import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout/Layout"
import CategoryBar from "../components/CategoryBar"
import SEO from "../components/seo"
import styled from "styled-components"

const PostsWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
`

const PostLink = styled.article`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;

  @media (min-width: 1024px) {
    padding: 20px;
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

const PostInfo = styled.section`
  position: relative;
`

const Title = styled.h2`
  text-transform: uppercase;
  padding: 20px 0 10px;
`

const Subtitle = styled.h3`
  font-family: "TimesNow-Regular";
  font-size: 14px;
  line-height: 1.125;
`

const PostCategory = styled.p`
  position: absolute;
  top: 15px;
  right: 0px;
  color: grey;
  font-family: "TimesNow-Regular";
  text-transform: lowercase;
`

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
    data.allSanityCategory.nodes.concat({ title: "All Stories" })
  )
  const [currentCategory, setCurrentCategory] = useState({
    title: "All Stories",
  })
  const [currentPosts, setCurrentPosts] = useState(data.allSanityPost.nodes)

  const filterCategories = value => {
    let newCurrentPosts
    const newCurrentCategory = allCategories.find(cat => cat.title === value)

    if (value === "All Stories") {
      newCurrentPosts = data.allSanityPost.nodes
    } else {
      newCurrentPosts = allPosts.filter(
        post => post.category[0].title === value
      )
    }

    setCurrentPosts(newCurrentPosts)
    setCurrentCategory(newCurrentCategory)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <CategoryBar
        categories={allCategories}
        currentCategory={currentCategory}
        onClick={filterCategories}
      />
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
                    <PostCategory>({post.category[0].title})</PostCategory>
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
