import React, { useEffect, useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap'
import { deleteTriedRecipe, getAllTriedRecipeVideosAPI, upDateTriedRecipeDescription } from '../services/allAPIs'
import { Link } from 'react-router-dom'



const TriedRecipe = () => {

  const [triedRecipe, setTriedRecipe] = useState([])
  console.log('Data stored to tried recipe after fetching',triedRecipe);

  const [editingDescription, setEditingDescription] = useState(null) //tracking which recipe is being edited
  const [descriptionText, setDescriptionText] = useState('')


  useEffect(() => {
    getAllTriedRecipeVideos()
  }, [])

  const getAllTriedRecipeVideos = async () => {
    try {
      const result = await getAllTriedRecipeVideosAPI()
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        console.log('Inside tried fetching all data',result.data);
        setTriedRecipe(result.data)

      } else {
        console.log('API call failed');

      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleAccordionToggle = (itemId) => {
    setActiveAccordion(itemId === activeAccordion ? null : itemId)
  }

  const handleEditDescription = (id, description)=>{
    setEditingDescription(id)
    setDescriptionText(description || '')
  }

  const handleSubmitDescription =async (itemId)=>{
    //api call for updating description
    console.log(itemId);
    const itemToUpdate = triedRecipe.find(item=>item.id==itemId) //item being updated is obtained
    console.log(`Item updated:${itemToUpdate}`);
    
    const updatedItem = {...itemToUpdate,description: descriptionText} //item updated with description
    try {
      const result = await upDateTriedRecipeDescription(itemId,updatedItem)
      console.log(result);
      if(result.status>=200 && result.status<300){
        alert('Description updated successfully...')
        setTriedRecipe(prev=>prev.map(item=>item.id==itemId?updatedItem:item)) //tried recepie updated with updaed recipe
        setEditingDescription(null) //exit edit mode
      }else{
        console.log('API call failed');
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleTriedRecipeDelete = async (itemId) =>{
    try {
      const result = await deleteTriedRecipe(itemId)
      if(result.status>=200 && result.status<300){
        console.log('response after deleting',result.data);
        getAllTriedRecipeVideos()
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div style={{ paddingTop: '100px' }}>
        <div className='p-2 my-5'>
          <div className='d-flex justify-content-between align-items-center container p-3'>
            <h3 className='my-3 text-center' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Cooked Recipes</h3>
            <div>
              <Link to={'/video'} style={{ textDecoration: 'none',textShadow: '2px 2px 8px rgb(1, 1, 1)' }}>Recipe Videos</Link>
            </div>
          </div>
          <div style={{ padding: '3rem' }} className='container'>
            {/* accordion */}
            {
              triedRecipe?.length > 0 ?
                triedRecipe?.map(item => (
                  <div key={item?.id}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen className='border border-1 shadow mb-3'>
                      <Accordion.Item eventKey={item?.id}>
                        <Accordion.Header className='fw-bold' >{item?.caption}</Accordion.Header>
                        <Accordion.Body>
                          <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title: {item?.caption}</h6>
                            <Button onClick={()=>handleTriedRecipeDelete(item?.id)}><i className="fa-solid fa-trash text-danger"></i></Button>
                          </div>
                          <div>
                            <div className='p-2 my-2'>
                              <img className='img-fluid rounded' src={item?.imgURL} alt="image" style={{width: '200px'}}/>
                            </div>
                            <p><span className='fw-bold'>Video Link:</span> <a href={item?.youtubeLink} target='_blank'>{item?.youtubeLink}</a></p>
                            <div className='d-flex justify-content-between align-items-center my-2'>
                              <h6>Description</h6>
                              {/* edit button */}
                              <Button onClick={() => handleEditDescription(item?.id, item?.description)}><i className="fa-regular fa-pen-to-square"></i></Button>
                            </div>
                            {/* textarea */}
                            {
                              editingDescription === item?.id ? (<Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                  <Form.Label>Enter your expereince with recipe</Form.Label>
                                  <Form.Control as="textarea" rows={3} value={descriptionText} onChange={(e)=>setDescriptionText(e.target.value)}/>
                                </Form.Group>
                                <Button className='bg-primary text-white' onClick={()=>handleSubmitDescription(item?.id)}>Submit</Button>
                              </Form>)
                                : (
                                  <div>
                                    <p>{item?.description || 'No description available'}</p>
                                  </div>)
                            }

                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))
                :
                <div className='p-2'>
                  <h6 className='text-center text-danger'>No recipes tried Yet..!!!</h6>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TriedRecipe