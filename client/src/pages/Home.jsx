import React from 'react'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Timings from "../components/Timings";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Testimonials from '../components/Testimonials';

export const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Services/>
    <WhyUs/>
    <Timings/>
    <Testimonials/>
    <CTA/>
    <Footer/>
    </>
  )
}
