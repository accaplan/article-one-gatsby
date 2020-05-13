import React, { useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import Img from "gatsby-image"
import BlockContent from "@sanity/block-content-to-react"

const PostWrapper = styled.main``

const PostIntroSection = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const PostIntro = styled.aside`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  text-align: center;

  @media (min-width: 1024px) {
    padding: 20px;
    width: 50%;
    text-align: left;
  }
`

const PostIntroHero = styled.aside`
  width: 100%;
  @media (min-width: 1024px) {
    width: 50%;
  }
`

const PostTitle = styled.h1`
  font-size: 2em;
  text-transform: uppercase;
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    font-size: 3em;
    padding-right: 20px;
    margin-bottom: 40px;
  }

  @media (min-width: 1400px) {
    font-size: 4em;
  }

  @media (min-width: 1800px) {
    font-size: 5em;
  }
`

const PostSubTitle = styled.h2`
  font-size: 1.5em;
  font-family: "TimesNow-Regular";

  @media (min-width: 1024px) {
    font-size: 2em;
    padding-right: 20px;
    margin-bottom: 20px;
  }

  @media (min-width: 1400px) {
    font-size: 3em;
    margin-bottom: 40px;
  }

  @media (min-width: 1800px) {
    font-size: 3.5em;
  }
`

const PostByline = styled.p``

const BylineName = styled.span`
  font-family: "TimesNow-Regular";
  font-size: 1.125rem;
`

const PostBodyWrapper = styled.main`
  padding: 15px;

  @media (min-width: 1024px) {
    padding: 0;
  }
`

const IntroText = styled(BlockContent)``

const BodyText = styled(BlockContent)``

const ImageCaption = styled.figcaption``

const FullBleedImage = styled.figure``

const InlineImage = styled(FullBleedImage)``

const TwoPhotoWide = styled.aside``

const TwoPhotoMedium = styled(TwoPhotoWide)``

const BlogPost = ({ pageContext }) => {
  const serializeSections = section => {
    switch (section._type) {
      case "introText":
        const blocks = pageContext._rawBody.find(
          item => item._key === section._key
        )
        return <IntroText blocks={blocks.intro} />
      case "fullBleedPhoto":
        return (
          <FullBleedImage>
            <Img fluid={section.image.asset.fluid} />
            {section.imageCaption && (
              <ImageCaption>{section.imageCaption}</ImageCaption>
            )}
          </FullBleedImage>
        )
      case "bodyText":
        const textBlocks = pageContext._rawBody.find(
          item => item._key === section._key
        )
        return <BodyText blocks={textBlocks.textContent} />
      case "inlinePhoto":
        return (
          <InlineImage>
            <Img fluid={section.image.asset.fluid} />
            {section.imageCaption && (
              <ImageCaption>{section.imageCaption}</ImageCaption>
            )}
          </InlineImage>
        )
      case "twoPhotoMedium":
        return (
          <TwoPhotoMedium>
            {section.images.map((img, index) => {
              return (
                <React.Fragment key={index}>
                  <Img fluid={img.image.asset.fluid} />
                  {img.imageCaption && (
                    <ImageCaption>{img.imageCaption}</ImageCaption>
                  )}
                </React.Fragment>
              )
            })}
          </TwoPhotoMedium>
        )
      case "twoPhotoWide":
        debugger
        return

      default:
        break
    }
  }

  console.log(pageContext)
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <PostWrapper>
        <PostIntroSection>
          <PostIntro>
            <PostTitle>{pageContext.title}</PostTitle>

            {pageContext.subhead && (
              <PostSubTitle>{pageContext.subhead}</PostSubTitle>
            )}

            {pageContext.byline.length &&
              pageContext.byline.map((item, index) => (
                <PostByline key={index}>
                  {item.title}: <BylineName>{item.name}</BylineName>
                </PostByline>
              ))}
          </PostIntro>
          <PostIntroHero>
            {pageContext.heroImage && (
              <Img fluid={pageContext.heroImage.asset.fluid} />
            )}
          </PostIntroHero>
        </PostIntroSection>
        <PostBodyWrapper>
          {pageContext.body.map(section => serializeSections(section))}
        </PostBodyWrapper>
      </PostWrapper>
    </Layout>
  )
}
export default BlogPost
