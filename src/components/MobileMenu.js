import React from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import SearchBar from "./SearchBar"

const MobileMenuWrapper = styled.section`
  position: fixed;
  height: 100%;
  width: 100%;
  pointer-events: none;
  top: 0;
  z-index: 99999999;
  background: transparent;
  transition: background 0.25s linear;

  &.open {
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.5);
  }
`
const MobileMenu = styled.aside`
  background: #fff;
  width: 85%;
  position: absolute;
  top: 0;
  height: 100vh;
  transform: translateX(-101%);
  transition: transform 0.25s linear;
  border-right: 1px solid;

  &.open {
    transform: translateX(0);
    pointer-events: auto;
  }
`

const MobileMenuHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid;
`

const LogoLink = styled.a`
  text-transform: uppercase;
`

const CloseButton = styled.button`
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  border: 0;
  &:focus {
    outline: 1px solid transparent;
  }
`

const MobileLinkList = styled.ul`
  font-size: 1.125em;
  margin: 0;
  padding: 0;
  list-style: none;
`

const MobileLink = styled.li`
  border-bottom: 1px solid;
  padding: 15px;

  a {
    color: inherit;
    text-decoration: none;
  }
`

const MobileMenuFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 15px;
  border-top: 1px solid;
`

const FooterTitle = styled.p`
  text-transform: uppercase;
`

const FooterText = styled.p``

const FooterPhone = styled.a`
  color: inherit;
`

const MobileMenuComponent = ({ onClick, open }) => {
  const mobileLinks = [
    { title: "Sun", link: "https://articleoneeyewear.com/collections/sun" },
    {
      title: "Optical",
      link: "https://articleoneeyewear.com/collections/optical",
    },
    {
      title: "Active",
      link: "https://articleoneeyewear.com/collections/ao-active",
    },
    { title: "Contact", link: "https://articleoneeyewear.com/pages/about" },
  ]
  return (
    <MobileMenuWrapper className={open && "open"}>
      <MobileMenu className={open && "open"}>
        <MobileMenuHeader>
          <LogoLink href="https://www.articleoneeyewear.com">
            Article One
          </LogoLink>
          <CloseButton onClick={onClick}>close</CloseButton>
        </MobileMenuHeader>
        <SearchBar size={"mobile"}></SearchBar>
        <MobileLinkList>
          {mobileLinks.map((link, index) => (
            <MobileLink key={index}>
              <a href={link.link}>{link.title}</a>
            </MobileLink>
          ))}
        </MobileLinkList>
        <MobileMenuFooter>
          <FooterTitle>Article One Eyewear</FooterTitle>
          <FooterText>130 E 2nd Street, Suite 104</FooterText>
          <FooterText>Flint, MI</FooterText>
          <FooterPhone href="tel:8107683795">+1 (810) 768-3795</FooterPhone>
        </MobileMenuFooter>
      </MobileMenu>
    </MobileMenuWrapper>
  )
}

export default MobileMenuComponent
