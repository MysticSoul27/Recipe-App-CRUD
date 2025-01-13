import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { deleteCategoryDetails, deleteRecipeVideo, getAllCateoryAPI, saveCategoryTypesAPI, updateCategoryAPI } from '../services/allAPIs';
import VideoCard from './VideoCard';



const Category = ({ setDeleteResponseFromCategory ,deleteVideoResponseFromCategory}) => {

  const [categoryRecipeDetails, setCategoryRecipeDetails] = useState([])

  const [categoryType, setCategoryType] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllCategory()
  }, [deleteVideoResponseFromCategory])

  const handleSaveCategoryType = async () => {
    if (categoryType) {
      const categorydetails = { categoryType, allVideos: [] }
      try {
        const result = await saveCategoryTypesAPI(categorydetails)
        console.log("response after saving data to category", result);
        alert('Category created')
        getAllCategory()
        handleClose()

      } catch (error) {
        console.log(error);

      }
    } else {
      alert('Enter a category name')
    }
  }

  const getAllCategory = async () => {
    try {
      const result = await getAllCateoryAPI()
      console.log('response from category API', result);
      if (result.status >= 200 && result.status < 300) {
        console.log(result.data);
        setCategoryRecipeDetails(result.data)
      } else {
        console.log("API call failed");
      }

    } catch (error) {
      console.log(error);

    }
  }

  console.log("Categories: ", categoryRecipeDetails);

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryDetails(id)
      getAllCategory()
    } catch (error) {
      console.log(error);

    }
  }

  const dragOverCategory = (e) => {
    e.preventDefault()
  }

  const videoCardDroppedOverCategory = async (e, category) => {
    console.log('category details:', category);
    //get the video data thet has been transferred from video card by get data
    const recipeVideoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
    console.log('dragged video details', recipeVideoDetails);

    category.allVideos.push(recipeVideoDetails)
    console.log('dropped video details',category);
    //api to update the category
    const response = await updateCategoryAPI(category)
    console.log(response);
    
    getAllCategory()
    const result = await deleteRecipeVideo(recipeVideoDetails?.id)
    setDeleteResponseFromCategory(result)
  }

  const CategoryVideoDragStarted = (e,video,category) =>{
    console.log('Video drag id from category:',video?.id);
    //data tranfer
    let dragData = {dragVideo:video,category}
    e.dataTransfer.setData('dargData',JSON.stringify(dragData))
  }


  return (
    <>
      <div className='p-1 my-4'>
        <div className='d-flex justify-content-center align-items-center gap-3'>
          <h2 className='my-2 text-center' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Recipe Types</h2>
          <Button onClick={handleShow}><i className="fa-solid fa-plus"></i></Button>
        </div>
        <div className='p-2 mt-5'>
          {/* create category and add items */}
          {
            categoryRecipeDetails?.length > 0 ?
              categoryRecipeDetails?.map(category => (
                <div droppable='true' onDragOver={dragOverCategory} onDrop={(e) => videoCardDroppedOverCategory(e, category)} key={categoryRecipeDetails?.id} className='border border-1 container p-2 my-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h5>{category?.categoryType}</h5>
                    <Button onClick={() => handleDeleteCategory(category?.id)}><i className="fa-solid fa-trash text-danger"></i></Button>
                  </div>
                  {/* video dropped */}
                  <div className='row p-1'>
                    {
                      category?.allVideos?.length>0 && 
                        category?.allVideos?.map(video=>(
                          <div key={video?.id} className='col' draggable={true} onDragStart={e=>CategoryVideoDragStarted(e,video,category)}>
                            {/* video */}
                            <VideoCard recipeVideoData={video} insideCategory={true}/>
                          </div>
                        ))
                    }
                  </div>
                </div>
              ))
              :
              <div className='p-1'><h6 className='text-danger text-center fs-5'>No categories created</h6></div>

          }
        </div>
      </div>

      {/* modal for creating category */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Type of Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='p-1'>
            <FloatingLabel
              controlId="category"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Category Name" onChange={e => setCategoryType(e.target.value)} />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-primary text-white' variant="secondary" onClick={handleSaveCategoryType}>
            Add
          </Button>
          <Button className='bg-danger text-white' variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category