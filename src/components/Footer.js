import React, { useState } from "react"
import styled from "styled-components"
import addToMailchimp from "gatsby-plugin-mailchimp"

const Footer = styled.footer`
  background-color: #93a685;

  position: relative;
  line-height: 1.5;
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
`

const FooterBlock = styled.section`
  width: 100%;
  border-bottom: 1px solid;
  box-sizing: border-box;
  padding: 15px;

  &:first-of-type {
    border-top: 1px solid;
    margin-top: -1px;
  }

  &:last-of-type {
    border: 0;
    padding: 15px 15px 75px;
  }

  @media (min-width: 1024px) {
    padding: 25px 25px 75px;
    width: 25%;
    border-right: 1px solid;
    border-top: 1px solid;
    margin-top: -1px;
    &:last-of-type {
      border: 0;
      border-top: 1px solid;
      padding: 25px 25px 75px;
    }
  }
`

const NewsletterBlock = styled(FooterBlock)``

const FooterTitle = styled.h4`
  text-transform: uppercase;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const Address = styled.p``

const LinkList = styled.ul``

const Link = styled.li``

const SiteCredits = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 20px;
  left: 15px;
  right: 15px;
  font-size: 11px;

  @media (min-width: 1024px) {
    left: 20px;
    right: 20px;
  }
`

const Copyright = styled.small``

const BuenaSuerte = styled.small`
  a {
    text-decoration: underline;
  }
`

const Form = styled.form``

const FieldSet = styled.fieldset`
  position: relative;
  margin-top: 5px;
`

const Input = styled.input`
  background-color: transparent;
  border: 1px solid;
  padding: 10px;
  width: calc(100% - 22px);

  &::placeholder {
    color: grey;
  }

  &:focus {
    outline: 1px solid transparent;
  }

  @media (min-width: 1024px) {
    width: calc(100% - 20px);
  }
`

const SubmitButton = styled.button`
  position: absolute;
  right: 10px;
  margin: 0;
  padding: 0;
  bottom: 12.5px;
  background-color: transparent;
  border: 0;
  &:focus {
    outline: 1px solid transparent;
  }
`

const Response = styled.p`
  margin-top: 10px;
`

const Circle = styled.div`
  border: 1px solid;
  background-color: transparent;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`

const FooterComponent = () => {
  const [mailChimpResponse, setMailChimpResponse] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    const email = event.target.email.value

    addToMailchimp(email).then(response => {
      if (response.result === "error") {
        const responeMessage = response.msg.includes("is already subscribed")
          ? "It looks like you are already subscribed to our newsletter, thanks!"
          : "Uh oh. Something went wrong. Please try again later."
        setMailChimpResponse({
          result: "error",
          message: responeMessage,
        })
      } else if (response.result === "success") {
        setMailChimpResponse({
          result: "success",
          message: "Thanks for subscribing!",
        })
      }
    })
  }

  return (
    <Footer>
      <FooterBlock>
        <FooterTitle>Article One Eyewear</FooterTitle>
        <Address>130 E 2nd Street, Suite 104</Address>
        <Address>Flint, MI</Address>
        <Address>
          <a href="tel:+18107683795">+1 (810) 768-3795</a>
        </Address>
      </FooterBlock>

      <FooterBlock>
        <FooterTitle>About</FooterTitle>
        <LinkList>
          <Link>
            <a href="https://articleoneeyewear.com/pages/about">About</a>
          </Link>
          <Link>
            <a href="https://articleoneeyewear.com/pages/about">
              Returns & Warranty
            </a>
          </Link>
          <Link>
            <a href="https://articleoneeyewear.com/pages/find-us">
              Find a Retailer
            </a>
          </Link>
        </LinkList>
      </FooterBlock>

      <FooterBlock>
        <FooterTitle>Connect</FooterTitle>
        <LinkList>
          <Link>
            <a href="https://articleoneeyewear.com/pages/about">Contact</a>
          </Link>
          <Link>
            <a href="https://www.instagram.com/articleone/" target="_blank">
              Instagram
            </a>
          </Link>
          <Link>
            <a
              href="https://www.facebook.com/articleoneeyewear/"
              target="_blank"
            >
              {" "}
              Facebook
            </a>
          </Link>
          <Link>
            <a href="mailto:info@articleoneeyewear.com">Email</a>
          </Link>
        </LinkList>
      </FooterBlock>

      <NewsletterBlock>
        <FooterTitle>Newsletter</FooterTitle>
        <Form onSubmit={handleSubmit}>
          <p>Just the good stuff. And not too much of it.</p>
          <FieldSet>
            <Input
              type="email"
              name="email"
              placeholder="Join our newsletter"
            />
            <SubmitButton type="submit">
              <Circle />
            </SubmitButton>
          </FieldSet>

          {mailChimpResponse && (
            <Response className={mailChimpResponse.result}>
              {mailChimpResponse.message}
            </Response>
          )}
        </Form>
      </NewsletterBlock>

      <SiteCredits>
        <Copyright>© {new Date().getFullYear()} Article One</Copyright>
        <BuenaSuerte>
          Site by{" "}
          <a href="https://www.buena-suerte.studio" target="_blank" rel="">
            Buena Suerte
          </a>
        </BuenaSuerte>
      </SiteCredits>
    </Footer>
  )
}

export default FooterComponent
