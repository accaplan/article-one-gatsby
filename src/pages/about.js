import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout/Layout"
import SEO from '../components/seo'

const BlockContent = require('@sanity/block-content-to-react')

const About = props => {
  const data = useStaticQuery(graphql`
      {
        allSanitySiteSettings {
          edges {
            node {
              about {
                _key
                _type
                style
                list
                sanityChildren {
                  _key
                  _type
                  text
                  marks
                }
              }
              address {
                _key
                _type
                style
                list
                sanityChildren {
                  _key
                  _type
                  text
                }
              }
              description
              facebook
              instagram
              phone
              returns {
                _key
                _type
                style
                list
                sanityChildren {
                  _key
                  _type
                  text
                }
              }
              shipping {
                _key
                _type
                style
                list
                sanityChildren {
                  _key
                  _type
                  text
                }
              }
            }
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
              {data.allSanitySiteSettings.edges[0].node.about && (
                <BlockContent blocks={data.allSanitySiteSettings.edges[0].node.about} />
              )}
            </div>

          </section>
          <section class='about-ao'>
            <div class="about-row">
              <p class='key'>Shop</p>
              {data.allSanitySiteSettings.edges[0].node.address && (<div class="value">
                <BlockContent blocks={data.allSanitySiteSettings.edges[0].node.address}/>
              </div>)}
            </div>
            <div class="about-row">
              <p class='key'>Contact</p>
              <div class="value">
                <p><a href="mailto:info@articleoneeyewear.com">info@articleoneeyewear.com</a> </p>
              </div>
            </div>
            <div class="about-row">
              <p class="key">Phone</p>
              <div class="value">
                {data.allSanitySiteSettings.edges[0].node.phone && (
                  <p><a href={`tel:${data.allSanitySiteSettings.edges[0].node.phone.trim()}`}>{data.allSanitySiteSettings.edges[0].node.phone.trim()}</a></p>
                )}
              </div>
            </div>
            <div class="about-row">
              <p class='key'>Instagram</p>
              <div class="value">
                {data.allSanitySiteSettings.edges[0].node.instagram && (
                  <a href={`https://www.instagram.com/${data.allSanitySiteSettings.edges[0].node.instagram}`} target={'_blank'} rel={'noopenner noreferrer'}>@{data.allSanitySiteSettings.edges[0].node.instagram}</a>
                )}
              </div>
            </div>
            <div class="about-row">
              <p class='key'>Facebook</p>
              <div class="value">
                {data.allSanitySiteSettings.edges[0].node.facebook && (
                  <a href={data.allSanitySiteSettings.edges[0].node.facebook}>Facebook</a>
                )}
              </div>
            </div>
            <div class="about-row">
              <p class='key'>Shipping Information</p>
              <div class="value">
                {data.allSanitySiteSettings.edges[0].node.shipping && (
                  <BlockContent blocks={data.allSanitySiteSettings.edges[0].node.shipping} />
                )}
              </div>
            </div>
            <div class="about-row">
              <p class='key'>Returns & Exchanges</p>
              <div class="value">
                {data.allSanitySiteSettings.edges[0].node.returns && (
                  <BlockContent blocks={data.allSanitySiteSettings.edges[0].node.returns} />
                )}
              </div>
            </div>
          </section>

          
        </main>

    </Layout>
  )
}


export default About