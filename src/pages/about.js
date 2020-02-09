import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout/Layout"
import SEO from '../components/seo'

const BlockContent = require('@sanity/block-content-to-react')

const About = props => {
  const data = useStaticQuery(graphql`
    {
      allSanitySiteSettings {
        nodes {
          _rawAbout
          _rawAddress
          _rawLogoImages
          _rawReturns
          _rawShipping
          description
          instagram
          facebook
          phone
          title
        }
      }
    }
  `)

  
  return (
    <Layout>
      <SEO title="About" />
        <header class="section-header">
          <h2>About Article One</h2>
        </header>

        <main class="about-us-page">
          <section class="about-us-content">
            <div class="about-row">
              <p class='key'>Article One</p>
            {data.allSanitySiteSettings.nodes[0]._rawAbout && (<div class="value"> <BlockContent blocks={data.allSanitySiteSettings.nodes[0]._rawAbout} /> </div>)}
            </div>

          </section>

          <section class='about-ao'>
            <div class="about-row">
              <p class='key'>Shop</p>
              {data.allSanitySiteSettings.nodes[0]._rawAddress && (<div class="value"> <BlockContent blocks={data.allSanitySiteSettings.nodes[0]._rawAddress}/> </div>)}
            </div>
            <div class="about-row">
              <p class='key'>Contact</p>
              <div class="value">
                <p><a href="mailto:info@articleoneeyewear.com">info@articleoneeyewear.com</a> </p>
              </div>
            </div>
            <div class="about-row">
              <p class="key">Phone</p>
              {data.allSanitySiteSettings.nodes[0].phone && ( <div class="value"> <p><a href={`tel:${data.allSanitySiteSettings.nodes[0].phone.trim()}`}>{data.allSanitySiteSettings.nodes[0].phone.trim()}</a></p> </div> )}
            </div>
            <div class="about-row">
              <p class='key'>Instagram</p>
              {data.allSanitySiteSettings.nodes[0].instagram && ( <div class="value"> <a href={`https://www.instagram.com/${data.allSanitySiteSettings.nodes[0].instagram}`} target={'_blank'} rel={'noopenner noreferrer'}>@{data.allSanitySiteSettings.nodes[0].instagram}</a> </div> )}
            </div>
            <div class="about-row">
              <p class='key'>Facebook</p>
              <div class="value">
                {data.allSanitySiteSettings.nodes[0].facebook && (
                  <a href={data.allSanitySiteSettings.nodes[0].facebook}>Facebook</a>
                )}
              </div>
            </div>
            <div class="about-row">
              <p class='key'>Shipping Information</p>
                {data.allSanitySiteSettings.nodes[0]._rawShipping && ( <div class="value"> <BlockContent blocks={data.allSanitySiteSettings.nodes[0]._rawShipping} /> </div>
                )}
            </div>
            <div class="about-row">
              <p class='key'>Returns & Exchanges</p>
                {data.allSanitySiteSettings.nodes[0]._rawReturns && ( <div class="value"> <BlockContent blocks={data.allSanitySiteSettings.nodes[0]._rawReturns} /> </div>
                )}
            </div>
          </section>

          
        </main>

    </Layout>
  )
}


export default About