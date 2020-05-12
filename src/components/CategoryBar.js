import React, { useState } from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import Arrow from "../images/arrow-forward.svg"

const CategoryBar = styled.nav`
  border-bottom: 1px solid;
  display: flex;
  position: sticky;
  top: 0;
`

const Category = styled.button`
  border: none;
  border-right: 1px solid;
  flex: 1;
  padding: 15px;
  margin: 0;
  cursor: pointer;

  &:last-of-type {
    border: none;
  }
  &:focus {
    outline: 1px solid transparent;
  }

  &.current {
    text-decoration: underline;
    background-color: black;
    color: white;
  }
`

const MobileCategories = styled.section`
  position: relative;
`

const MobileCategoryHeader = styled.header`
  border-bottom: 1px solid;
  &.open {
    border-bottom: 1px solid lightgrey;
  }
`

const MobileHeaderTitle = styled.button`
  padding: 10px 15px;
  border: 0;
  background-color: transparent;
  &:focus {
    outline: 1px solid transparent;
  }
`

const CurrentCategory = styled.span`
  font-family: "TimesDot-Regular";
  font-size: 16px;
  border-bottom: 1px solid;
`

const MobileCategoryList = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
  border-bottom: 1px solid;
  left: 0;
  right: 0;
  background-color: white;
`

const MobileCategoryListItem = styled.li`
  padding: 10px 15px;
  font-size: 16px;
  font-family: "TimesDot-Regular";
`

const MobileFilterArrow = styled.img`
  height: 0.9em;
  width: auto;
  display: inline;
  vertical-align: middle;
  margin-left: 5px;
  transform: rotate(90deg);

  &.open {
    transform: rotate(-90deg);
  }
`

const CategoryBarComponent = ({ categories, currentCategory, onClick }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })
  const [mobileExpand, setMobileExpand] = useState(false)

  return (
    <>
      {isTabletOrMobile ? (
        <MobileCategories>
          <MobileCategoryHeader
            onClick={() => setMobileExpand(!mobileExpand)}
            className={mobileExpand && "open"}
          >
            <MobileHeaderTitle>
              Currently Viewing{" "}
              <CurrentCategory>
                {currentCategory.title === "All"
                  ? "All Stories"
                  : currentCategory.title}
              </CurrentCategory>
              <MobileFilterArrow
                src={Arrow}
                className={mobileExpand && "open"}
              />
            </MobileHeaderTitle>
          </MobileCategoryHeader>
          {mobileExpand && (
            <MobileCategoryList>
              {categories.map((cat, index) => (
                <MobileCategoryListItem
                  onClick={() => {
                    setMobileExpand(false)
                    onClick(cat.title)
                  }}
                  key={index}
                >
                  {cat.title}
                </MobileCategoryListItem>
              ))}
            </MobileCategoryList>
          )}
        </MobileCategories>
      ) : (
        <CategoryBar>
          {categories.map((cat, index) => (
            <Category
              onClick={() => onClick(cat.title)}
              key={index}
              className={cat.title === currentCategory.title && "current"}
            >
              {cat.title}
            </Category>
          ))}
        </CategoryBar>
      )}
    </>
  )
}

export default CategoryBarComponent
