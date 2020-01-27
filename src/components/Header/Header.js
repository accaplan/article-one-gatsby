import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './Header.scss'

const Header = props => {
	
	return (
		<header className='header'>
			<div className="header-navigation">
				<div className='logo'>
				<Link to='/'>Article One</Link>
				</div>
				<nav className='header-links'>
				<Link to='/search' className='hide-mobile' id='search-link'>Search </Link>
				<Link to='/cart' id='cart-link' className='cart-link'>
					Cart (0)
				</Link>
				</nav>
			</div>
		</header>
	)
	  
	
}

export default Header
