import React, { useState } from 'react'
import View from '../components/View';
import Add from '../components/Add';
import Category from '../components/Category';



const Video = () => {

  //state ligting for sending response to view as category drag video send to view
  const [deleteVideoResponseFromCategory,setDeleteVideoResponseFromCategory] = useState('')

  //state lifting for add component data to videocard
  const [deleteResponseFromCategory, setDeleteResponseFromCategory] = useState('')

  //state lifting for video updation as soon as added to server tehn response also in view
  const [recipeVideoresponseFromVideo,setRecipeVideoresponseFromVideo] = useState('')

  //state lifting for delete video responses
  const [deleteResponseFromVideoCardtoView, setDeleteResponseFromVideoCardtoView] = useState('')



  return (
    <>
      <div style={{ paddingTop: '100px' }}>
        <div className='p-2 my-4'>
          <Add setRecipeVideoresponseFromVideo={setRecipeVideoresponseFromVideo}/>
          <div className='row mx-0'>
            <div className='col mt-2'><View recipeVideoresponseFromVideo={recipeVideoresponseFromVideo} setDeleteResponseFromVideoCardtoView={setDeleteResponseFromVideoCardtoView} deleteResponseFromVideoCardtoView={deleteResponseFromVideoCardtoView} deleteResponseFromCategory={deleteResponseFromCategory} setDeleteVideoResponseFromCategory={setDeleteVideoResponseFromCategory}/></div>
            <div className='col mt-5'><Category setDeleteResponseFromCategory={setDeleteResponseFromCategory} deleteVideoResponseFromCategory={deleteVideoResponseFromCategory}/></div>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default Video