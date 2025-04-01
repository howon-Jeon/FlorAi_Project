import React from 'react'
import MainHeader from '../components/MainHeader'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import IntroBox from '../components/IntroBox'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div>
      <MainHeader></MainHeader>
      <Banner></Banner>
      <IntroBox></IntroBox>
      <Footer></Footer>
      <Navbar></Navbar>
    </div>
  )
}

export default Main