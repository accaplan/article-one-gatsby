import React from "react"
import PropTypes from "prop-types"

import Header from "../Header"
import Footer from "../Footer"
import "reset-css"
import "./Layout.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
