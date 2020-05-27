import React from "react"
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
    flex-direction: ${props =>
      props.layout === "top-bottom" ? "column" : "row"};
  }
`

const PostIntro = styled.aside`
  width: 100%;
  padding: 50px 15px;
  box-sizing: border-box;
  text-align: center;

  @media (min-width: 1024px) {
    padding: 100px 20px;
    flex: 1;
    text-align: left;

    &.centered {
      text-align: center;

      .subtitle {
        max-width: 50ch;
        padding: 0;
        margin: 0 auto 40px;
      }
    }
  }
`

const PostIntroHero = styled.aside`
  width: 100%;
  @media (min-width: 1024px) {
    flex: 1;
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
  padding: 25px 0px 25px;

  @media (min-width: 1024px) {
    padding: 0;
  }
`

const IntroText = styled.h3`
  font-family: "TimesNow-Regular";
  font-size: 1.75em;
  padding: 25px 20px;

  @media (min-width: 1024px) {
    padding: 75px 20px;
    font-size: 1.75em;
  }

  @media (min-width: 1200px) {
    padding: 100px 20px;
    font-size: 2em;
  }

  @media (min-width: 1600px) {
    padding: 150px 20px;
    font-size: 2.5em;
  }

  @media (min-width: 1800px) {
    font-size: 3em;
  }
`

const BodyText = styled(BlockContent)`
  padding: 25px 15px;
  font-family: "TimesNow-Regular";

  h1,
  h2,
  h3,
  h4,
  strong {
    display: block;
    padding-bottom: 10px;
    font-family: "HelveticaNowText-Bold";
  }

  strong,
  p {
    line-height: 1.3333;
  }

  strong {
    font-size: 15px;
  }

  p {
    font-size: 16px;
  }

  ol {
    list-style: decimal-leading-zero;
    padding: 10px 40px;
    margin-bottom: 1em;
  }

  @media (min-width: 1024px) {
    strong {
      font-size: 18px;
    }

    p {
      font-size: 20px;
    }

    ol {
      padding: 20px 40px 24px;
      font-size: 18px;
    }

    font-size: 1.2307692308em;
    max-width: 700px;
    padding: 0 20px;
    margin: 50px auto;
  }
`

const ImageCaption = styled.figcaption`
  padding: 10px 0 0 20px;
  font-family: "TimesNow-Regular";
`

const FullBleedImage = styled.figure`
  width: 100%;
  padding: 25px 0;

  @media (min-width: 1024px) {
    padding: 100px 0 100px;

    &:first-of-type {
      padding: 0 0 100px;
    }
  }
`

const InlineImage = styled.figure`
  padding: 25px 15px;
  @media (min-width: 1024px) {
    max-width: 700px;
    padding: 50px 20px;
    margin: 0 auto;
  }
`

const TwoPhotoWide = styled.aside`
  display: flex;
  justify-content: space-between;
  padding: 25px 15px;

  @media (min-width: 1024px) {
    padding: 20px;
  }
`

const TwoPhotoMedium = styled(TwoPhotoWide)`
  padding: 25px 15px;
  display: flex;
  flex-direction: column;

  img {
    flex: 1;
    width: 100%;
    margin-bottom: 25px;
    &:last-of-type {
      margin: 0;
    }
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
    max-width: 75%;
    margin: 0 auto;
    flex-direction: row;

    img {
      max-width: calc(50% - 10px);
    }
  }
`

const BlogPost = ({ pageContext }) => {
  const serializeSections = section => {
    switch (section._type) {
      case "fullBleedPhoto":
        return (
          <FullBleedImage key={section._key}>
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
        return <BodyText blocks={textBlocks.textContent} key={section._key} />
      case "inlinePhoto":
        return (
          <InlineImage key={section._key}>
            <Img fluid={section.image.asset.fluid} />
            {section.imageCaption && (
              <ImageCaption>{section.imageCaption}</ImageCaption>
            )}
          </InlineImage>
        )
      case "twoPhotoMedium":
        return (
          <TwoPhotoMedium key={section._key}>
            {section.images.map((img, index) => {
              return (
                <React.Fragment key={index}>
                  <img src={img.image.asset.url} />
                  {img.imageCaption && (
                    <ImageCaption>{img.imageCaption}</ImageCaption>
                  )}
                </React.Fragment>
              )
            })}
          </TwoPhotoMedium>
        )
      case "twoPhotoWide":
        return (
          <TwoPhotoWide key={section._key}>
            {section.images.map((img, index) => {
              return (
                <React.Fragment key={index}>
                  <img src={img.image.asset.url} />
                  {img.imageCaption && (
                    <ImageCaption>{img.imageCaption}</ImageCaption>
                  )}
                </React.Fragment>
              )
            })}
          </TwoPhotoWide>
        )
      default:
        break
    }
  }

  return (
    <Layout>
      <SEO title={pageContext.title} />
      <PostWrapper>
        <PostIntroSection layout={pageContext.heroImage.layout}>
          <PostIntro
            className={
              pageContext.heroImage.layout === "top-bottom" ? "centered" : ""
            }
          >
            <PostTitle>{pageContext.title}</PostTitle>

            {pageContext.subhead && (
              <PostSubTitle className="subtitle">
                {pageContext.subhead}
              </PostSubTitle>
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
              <Img fluid={pageContext.heroImage.image.asset.fluid} />
            )}
          </PostIntroHero>
        </PostIntroSection>
        <PostBodyWrapper>
          {pageContext.introText && (
            <IntroText>{pageContext.introText}</IntroText>
          )}
          {pageContext.body.map(section => serializeSections(section))}
        </PostBodyWrapper>
      </PostWrapper>
    </Layout>
  )
}
export default BlogPost
