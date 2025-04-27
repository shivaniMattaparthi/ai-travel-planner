import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[40px] text-center mt-16'
      ><span className='text-[#f56551]'>Discover your Next Adventure With AI:</span> Personalized Itenaries with Your Fingertips </h1>
      <p className='text-xl text-gray-500 text-center'>Your personali trip planner and travel curator, 
        creating custom itenaries tailored to your interests and budgets</p>
        <Link to ={'/create-trip'}>
        <Button>Get Started, It's Free</Button>
        </Link>
    </div>
  )
}

export default Hero