import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { saveVideoAPI } from '../services/allAPIs'




const Add = ({setRecipeVideoresponseFromVideo}) => {

    const [invalidYoutubeLink, setInvalidYoutubeLink] = useState(false)

    const [videoDetails, setVideoDetils] = useState({
        caption: '',
        imgURL: '',
        videoLink: '',
        youtubeLink: ''
    })
    console.log(videoDetails);
    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const extractEmbeddCodeFormLink = (userVideoLink)=>{ //long videos
        if(userVideoLink.includes('https://www.youtube.com/watch?v=')){
            console.log(userVideoLink.split("v=")[1].slice(0, 11))
            const videoId = userVideoLink.split("v=")[1].slice(0, 11)
            setInvalidYoutubeLink(false)
            setVideoDetils({...videoDetails,videoLink:`https://www.youtube.com/embed/${videoId}`,youtubeLink: userVideoLink})

        }else if(userVideoLink.includes('https://www.youtube.com/shorts/')){  //shorts videos
            console.log(userVideoLink.split("shorts/")[1].slice(0,11));
            const embedId = userVideoLink.split("shorts/")[1].slice(0,11)
            setInvalidYoutubeLink(false)
            setVideoDetils({...videoDetails,videoLink:`https://www.youtube.com/embed/${embedId}`,youtubeLink: userVideoLink})
            
        }else{
            setInvalidYoutubeLink(true)
            setVideoDetils({...videoDetails,videoLink: ''})
        }
    }

    const handleUploadVideo = async ()=>{
        const {caption,imgURL,videoLink} = videoDetails
        if(caption && imgURL && videoLink){
            try{
                const result = await saveVideoAPI(videoDetails)
                console.log(result);
                if(result.status>=200 && result.status<300){
                    alert('Video uploaded successfully.....')
                    handleClose()
                    //as result changes on each upload it sets the response 
                    setRecipeVideoresponseFromVideo(result)
                }else{
                    alert('Video upload failed')
                }
            }catch(error){
                console.log(error);
            }
        }else{
            alert('Please fill the form completely!!!....')
        }
    }


    return (
        <>
            <div className='text-center my-3 d-flex justify-content-around align-items-center p-1'>
                <h5 className='fw-bold shadow p-2' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Upload a Video<Button className='ms-3 bg-black' onClick={handleShow}><i className="fa-solid fa-upload"></i></Button></h5>
                <Link style={{textDecoration: 'none',textShadow: '2px 2px 8px rgb(1, 1, 1)'}} className='fw-bold' to={'/triedrecipe'}>Tried Recipe</Link>
            </div>

            {/* modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>Video details of recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='p-1'>
                        <FloatingLabel
                            controlId="Caption"
                            label="Recipe Caption"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Recipe Caption" onChange={e=>setVideoDetils({...videoDetails, caption: e.target.value})}/>
                        </FloatingLabel>
                    </div>
                    <div className='p-1'>
                        <FloatingLabel
                            controlId="ImageUrl"
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Image URL" onChange={e=>setVideoDetils({...videoDetails, imgURL: e.target.value})}/>
                        </FloatingLabel>
                    </div>
                    <div className='p-1'>
                        <FloatingLabel
                            controlId="youtubeLink"
                            label="Recipe Video Link"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Recipe Video Link" onChange={e=>extractEmbeddCodeFormLink(e.target.value)}/>
                        </FloatingLabel>
                        {
                            invalidYoutubeLink && <div className='p-2 text-danger fw-bold fs-5' style={{textShadow: '2px 2px 8px rgb(1, 1, 1)'}}>*Invalid Youtube Link please provide a valid one.</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='bg-danger' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ backgroundColor: 'green' }} variant="primary" onClick={handleUploadVideo}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add