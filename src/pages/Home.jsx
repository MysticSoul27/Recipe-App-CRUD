import React, { useEffect, useState } from 'react'
import bg from '../assets/bg-recipe-app.jpg'
import { Link } from 'react-router-dom'
import './Home.css'
import tikka from '../assets/Chicken-Tikka.jpg'
import smoothie from '../assets/Smoothie-bowl.jpg'
import pasta from '../assets/pasta.jpg'
import uploadImg from '../assets/upload-video.jpg'
import categories from '../assets/categories.jpg'
import cooking from '../assets/cooking.jpg'
import deleteImg from '../assets/delete-video.png'
import addNotes from '../assets/addnotes.png'
import tasting from '../assets/tasting food.png'



const Home = () => {

  return (
    <>
      <div className='p-2' style={{ width: "100%", minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }} >
        <div style={{ paddingTop: "110px" }} className='text-center'>
          <h1 className='mt-5 p-4 text-white intro-head' style={{ fontFamily: '"Great Vibes", serif', fontSize: "90px", fontWeight: "800", textShadow: '2px 2px 8px rgb(255, 255, 255)' }}>RECIPE NEST</h1>
          <p className='mt-1 p-2' style={{ color: "whitesmoke" }}>"Organize, Explore, and Relive Your Favorite Recipes—All in One Cozy Place!"</p>
          <Link to={'/video'}><button className='btn text-white' style={{ backgroundColor: "green" }}>Explore</button></Link>
        </div>
        <div className='p-2 container d-flex justify-content-center gap-4 flex-wrap align-items-center mt-4'>
          <div style={{ width: '170px', height: "168px" }}><img className='img-fluid rounded shadow' style={{ height: "168px" }} src={tikka} alt="tikka" /></div>
          <div style={{ width: '190px', height: "190px" }}><img className='img-fluid rounded-3 shadow' style={{ height: "190px" }} src={smoothie} alt="smoothie" /></div>
          <div className='p-1 border border-2 border-white' style={{ width: '175px', height: "175px" }}><img className='img-fluid shadow' style={{ height: "165px" }} src={pasta} alt="briyani" /></div>
        </div>
      </div>
      {/* cooking tip */}
      <div className='mt-5 container p-2'>
        <h5 className='fw-bold text-center my-1 fs-3' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Cooking Tip:</h5>
        <p className='p-1 text-center fw-bold my-3' style={{textShadow: '2px 2px 8px rgb(20, 20, 20)'}}>"Always taste your dish as you cook for the best results."</p>
        <div className='p-2 text-center'>
          <img className='img-fluid' src={tasting} alt="" />
        </div>
      </div>
      {/* features */}
      <div className='p-2 my-5'>
        <h4 className='text-center fw-bold fs-2' style={{ textShadow: '2px 2px 8px rgb(0, 0, 0)' }}>Features</h4>
        <div className='p-3 d-flex justify-content-center align-items-center gap-4 flex-wrap'>
          {/* card */}
          <div className='p-3 bg-black rounded-3' style={{ width: '18rem', height: '400px' }}>
            <h6 className='text-center fw-bold text-white'>Upload Videos</h6>
            <div className='p-1 mt-4'>
              <img className='img-fluid' src={uploadImg} alt="recipe" />
            </div>
            <p className='my-4' style={{ fontSize: '14px' }}>Effortlessly upload your favorite recipe videos to create a personalized collection.</p>
          </div>
          {/* feature 2 */}
          <div className='p-3 bg-black rounded-3' style={{ width: '18rem', height: '400px' }}>
            <h6 className='text-center fw-bold text-white'>Create Categories</h6>
            <div className='p-1'>
              <img className='img-fluid' src={categories} alt="recipe" />
            </div>
            <p className='my-1' style={{ fontSize: '14px' }}>Organize your recipes by creating custom categories like Breakfast, Lunch, Dinner, or your own unique tags.</p>
          </div>
          {/* feature 3 */}
          <div className='p-3 bg-black rounded-3' style={{ width: '18rem', height: '400px' }}>
            <h6 className='text-center fw-bold text-white my-2'>View Tried Recipes</h6>
            <div className='p-1 my-3'>
              <img className='img-fluid' src={cooking} alt="recipe" />
            </div>
            <p className='mt-4' style={{ fontSize: '14px' }}>Keep track of recipes you’ve tried, making it easier to revisit your favorites.</p>
          </div>
          {/* feature 4 */}
          <div className='p-3 bg-black rounded-3' style={{ width: '18rem', height: '400px' }}>
            <h6 className='text-center fw-bold text-white'>Delete Videos</h6>
            <div className='p-1'>
              <img className='img-fluid' src={deleteImg} alt="recipe" />
            </div>
            <p className='my-1' style={{ fontSize: '14px' }}>Easily remove recipe videos you no longer need, keeping your collection clean and up-to-date.</p>
          </div>
          {/* feature 5 */}
          <div className='p-3 bg-black rounded-3' style={{ width: '18rem', height: '400px' }}>
            <h6 className='text-center fw-bold text-white'>Add Notes for Tried Recipes</h6>
            <div className='p-1'>
              <img className='img-fluid' src={addNotes} alt="recipe" />
            </div>
            <p className='my-1' style={{ fontSize: '14px' }}>Write and save personal notes or tips about the recipes you’ve tried, helping you perfect them in the future</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home