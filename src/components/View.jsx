import React, { useEffect, useState } from 'react'
import { getAllRecipeVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPIs';
import VideoCard from './VideoCard';
import img0 from '../assets/oops.png'


const View = ({recipeVideoresponseFromVideo,deleteResponseFromVideoCardtoView,setDeleteResponseFromVideoCardtoView,deleteResponseFromCategory,setDeleteVideoResponseFromCategory}) => {

  const [allRecipeVideos, setAllRecipeVideos] = useState([])



  useEffect(() => {
    getAllRecipeVideos()
  }, [recipeVideoresponseFromVideo,deleteResponseFromVideoCardtoView,deleteResponseFromCategory])




  const getAllRecipeVideos = async () => {
    try {
      const result = await getAllRecipeVideosAPI()
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        console.log(result.data);
        setAllRecipeVideos(result.data)
      } else {
        console.log('API call failed!!!..');

      }
    } catch (error) {
      console.log(error);
    }
  }


  const dragOverView = (e)=>{
    e.preventDefault()
  }

  const categoryVideoDropOnView =async (e)=>{
    console.log('inside category video drop on view');
    const {dragVideo,category} = JSON.parse(e.dataTransfer.getData('dargData'))
    console.log(dragVideo,category);
    //update category 
    const updatedCategoryVideoList = category?.allVideos?.filter(item=>item.id!=dragVideo?.id)
    const updateCategory = {...category,allVideos: updatedCategoryVideoList}
    console.log('updated category',updateCategory);
    //api call for updation
    const result = await updateCategoryAPI(updateCategory)
    console.log('result after update of allVideos array',result);
    //response tranferred between category and view
    setDeleteVideoResponseFromCategory(result)
    //api to update drpped video to view
    const resultDrop = await saveVideoAPI(dragVideo)
    console.log('api update after drrop',resultDrop);
    //update videos in view
    getAllRecipeVideos()
  }


  return (
    <>
      <div className='mt-5 p-2'>
        <h2 className='my-3 text-center' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Uploaded Recipes</h2>
        {/* uploaded videos */}
        <div className='d-flex justify-content-center align-items-center gap-4 my-4 flex-wrap' droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDropOnView(e)}>
          {
            allRecipeVideos?.length > 0 ?
              allRecipeVideos?.map(video => (
                <div key={video?.id}>
                  <VideoCard recipeVideoData={video} setDeleteResponseFromVideoCardtoView={setDeleteResponseFromVideoCardtoView}/>
                </div>
              ))

              :
              <div className='p-3'>
                <h6 className='text-danger fs-3 text-center' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>No videos uploaded!!!...</h6>
                <div className='p-2'><img className='img-fluid' src={img0} alt="no image" /></div>
              </div>
          }
        </div>

      </div>


    </>
  )
}

export default View