import React, { useEffect } from "react"
import PropTypes from "prop-types"

import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useStaticQuery, graphql } from "gatsby"
import 'reset-css'
import './Layout.scss'

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
        <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
