// https://www.figma.com/file/lz9lLpFHMxHm2odnwM3R0z/gpt3?node-id=0%3A1&t=VUb3wkk1zqLYlHGe-0
// Add extension by 
// (1) Select the Extension Icon, Search for es7 snippets
// (2) Then download then install ES7 React/Redux/GraphQL/React-Native snippet
// (3) Now my VSCode can have the following feature, by typing rafce, to genereate a compoment template
//     rafce:  React Arrow Function Export Component

import React from 'react'

// We can do the following two lines for import becuse we have defined index.js under both compoments and containers
import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers'
import { CTA, Brand, Navbar } from './components'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>         {/* Note that above gradient__bg is only for Navbar and Header */}
      <Brand />
      <WhatGPT3 />   {/* Both <WhatGPT3> and <Features> use <Feature> */}
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  )
}

export default App
