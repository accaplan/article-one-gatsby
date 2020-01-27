import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import Image from "../components/image"
import SEO from "../components/seo"

const About = () => {


  return ( 
    <Layout>
      <SEO 
        title="About"
        description="" />
        <main className='about'>
          <section className='connect'>
              <ul className='contact'>
                <h2 className='title'>Contact</h2>
              </ul>
          </section>
        </main>

    </Layout>
  )
  }

export default About
