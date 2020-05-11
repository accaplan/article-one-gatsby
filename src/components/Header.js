import React, { useState } from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"

const HeaderWrapper = styled.header`
  border-bottom: 1px solid;
`

const DesktopHeaderWrapper = styled.nav`
  padding: 13px 25px;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.h1``

const Nav = styled.nav``

const Link = styled.a`
  text-transform: uppercase;
  margin-left: 25px;
  &:first-of-type {
    margin: 0;
  }
`

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false)

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  const home = "https://www.articleoneeyewear.com"

  const links = [
    {
      link: "https://articleoneeyewear.com/collections/sun",
      title: "Sun",
    },
    {
      link: "https://articleoneeyewear.com/collections/optical",
      title: "Optical",
    },
    {
      link: "https://articleoneeyewear.com/collections/ao-active",
      title: "Active",
    },
    {
      link: "https://articleoneeyewear.com/products/article-one-gift-card",
      title: "Gift Card",
    },
    {
      link: "https://articleoneeyewear.com/pages/labor-of-love",
      title: "Factories",
    },
    {
      link: "https://articleoneeyewear.com/pages/find-us",
      title: "Find Us",
    },
  ]
  return (
    <HeaderWrapper>
      {isTabletOrMobile ? (
        ""
      ) : (
        <DesktopHeaderWrapper>
          <Logo>
            <Link href={home}>Article One</Link>
          </Logo>
          <Nav>
            {links.map((item, index) => (
              <Link href={item.link} key={index}>
                {item.title}
              </Link>
            ))}
          </Nav>
        </DesktopHeaderWrapper>
      )}
    </HeaderWrapper>
  )
}

export default Header
