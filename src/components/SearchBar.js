import React, { useState } from "react"
import styled from "styled-components"
import ArrowForward from "../images/arrow-forward.svg"

const MobileForm = styled.form``

const SearchFormWrapper = styled.section`
  border-bottom: 1px solid #222;
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  transition: transform 0.2s ease;
  left: 0;
  right: 0;
  z-index: -1;
  background: #fff;

  &.open {
    transform: translateY(0);
    display: block;
  }
`

const SearchForm = styled.form`
  font-size: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  padding: 10px 25px;
  border: none;
  width: 100%;
  color: inherit;
  &:focus {
    outline: 1px solid transparent;
  }
`

const SearchButton = styled.button`
  padding: 10px 25px;
  background: #fff;
  border: none;
  cursor: pointer;
  &:focus {
    outline: 1px solid transparent;
  }
`

const ArrowImg = styled.img`
  height: 1em;
  width: auto;
`

const SearchBar = ({ size, open }) => {
  const handleSearch = event => {
    event.preventDefault()
    const searchTerm = event.currentTarget.search.value

    if (searchTerm.length) {
      window.location = `https://www.articleoneeyewear.com/search?q=${searchTerm}`
    }
  }
  return (
    <>
      {size === "mobile" ? (
        <MobileForm></MobileForm>
      ) : (
        <SearchFormWrapper className={open ? "open" : ""}>
          <SearchForm onSubmit={handleSearch}>
            <Input type="text" placeholder="Search" name="search" />
            <SearchButton type="submit">
              <ArrowImg src={ArrowForward} />
            </SearchButton>
          </SearchForm>
        </SearchFormWrapper>
      )}
    </>
  )
}

export default SearchBar
