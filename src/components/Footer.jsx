import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div style={{ backgroundColor: "black" }} className='p-4'>
        <div className='d-flex justify-content-around flex-wrap p-3 gap-5'>
          {/* intro */}
          <div className='p-1 text-white' style={{ fontSize: '13px' }}>
            <h5><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}><i className="fa-solid fa-utensils me-2"></i>Recipe Nest</Link></h5>
            <p>Crafted with passion and dedication by the<br /> Recipe Nest team, with contributions from<br /> our amazing community of food enthusiasts.</p>
            <p>Currently running version 1.0.0.</p>
          </div>
          {/* Links */}
          <div className='p-1' style={{ fontSize: '13px' }}>
            <h5 className='text-white'>Links</h5>
            <p><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link></p>
            <p><Link to={'/triedrecipe'} style={{ textDecoration: 'none', color: 'white' }}>Tried Recipes</Link></p>
            <p><Link to={'/video'} style={{ textDecoration: 'none', color: 'white' }}>Videos</Link></p>
          </div>
          {/* social media */}
          <div className='p-1' style={{ fontSize: '20px' }}>
            <h5 className='text-white'>Stay Connected</h5>
            <div className='d-flex align-items-center justify-content-between p-2'>
              <a href='https://www.facebook.com/' target='_blank'><i className="fa-brands fa-facebook text-white"></i></a>
              <a href='https://www.instagram.com/accounts/login/?hl=en' target='_blank'><i className="fa-brands fa-instagram text-white"></i></a>
              <a href='https://api.linkedin.com/login' target='_blank'><i className="fa-brands fa-linkedin text-white"></i></a>
              <a href='https://x.com/i/flow/login' target='_blank'><i className="fa-brands fa-x-twitter text-white"></i></a>
            </div>
          </div>
          {/* contact */}
          <div className='p-1' style={{ fontSize: '13px' }}>
            <h5 className='text-white'>Contact</h5>
            <p className='text-white'>We’d love to hear from you! Whether you<br/> have a question, feedback, or just want to<br/> say hello, feel free to reach out to<br/> us:

              Email: support@recipemaster.com</p>
          </div>
        </div>
        <div className='p-1'  style={{ fontSize: '13px' }}>
          <p className='text-white text-center'>&copy; 2024 Recipe Nest. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default Footer