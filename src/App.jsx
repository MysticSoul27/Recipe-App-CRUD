import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Video from './pages/Video'
import TriedRecipe from './pages/TriedReceipe'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
      {/* header */}
      <Header/>
      {/* path setting */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/video' element={<Video/>} />
        <Route path='/triedrecipe' element={<TriedRecipe/>} />
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
