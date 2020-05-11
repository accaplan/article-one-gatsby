import React from "react"
import Layout from "../components/Layout/Layout"
import styled from "styled-components"

const BlogPost = ({ pageContext }) => {
  return <>{pageContext ? "true" : "false"}</>
}
export default BlogPost
