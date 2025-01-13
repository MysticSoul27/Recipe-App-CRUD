import React, { useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { deleteRecipeVideo, saveTriedRecipeVideoAPI } from '../services/allAPIs';



const VideoCard = ({ recipeVideoData, setDeleteResponseFromVideoCardtoView, insideCategory }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        handleShow()
    }

    const handleCheckbox = async (isChecked, recipeVideoDetails) => {
        console.log('inside checkbox handling');
        console.log('Check box value', isChecked, recipeVideoDetails);
        const { caption, youtubeLink ,imgURL} = recipeVideoDetails
        if (isChecked) {
            const triedRecipeDetails = {
                caption: caption,
                youtubeLink: youtubeLink,
                imgURL:imgURL,
                description: ''
            }
            try {
                const result = await saveTriedRecipeVideoAPI(triedRecipeDetails)
                console.log(result);
                if (result.status >= 200 && result.status < 300) {
                    alert('Video saved as tried recipe')
                } else {
                    alert('video saving to tried recipe failed')
                }

            } catch (error) {
                console.log(error);

            }
        }

    }

    const handleDeleteRecipeVideo = async (recipeVideoId) => {
        console.log('inside recipe video id', recipeVideoId);

        try {
            const result = await deleteRecipeVideo(recipeVideoId)
            console.log(result);
            if (result.status >= 200 && result.status < 300) {
                alert("Video deleted successfully.")
                setDeleteResponseFromVideoCardtoView(result)
            }

        } catch (error) {
            console.log(error);

        }
    }

    const videoCardDragStarted = (e, dragVideoDetails) => {
        console.log("Dragged video Id:", dragVideoDetails?.id);

        //data of dragged video has to be transfered by dataTransfer property and setData method
        e.dataTransfer.setData("videoDetails", JSON.stringify(dragVideoDetails))
    }

    return (
        <>
            {/* uploaded videos view */}
            <Card draggable={true} onDragStart={e => videoCardDragStarted(e, recipeVideoData)} style={{ width: '13rem' }} className='border border-1'>
                <Card.Img className='p-1' onClick={handleClick} variant="top" src={recipeVideoData.imgURL} />
                <Card.Body>
                    <Card.Title className='text-center' style={{ fontSize: '14px' }}>{recipeVideoData.caption}</Card.Title>
                    <Card.Text>

                        {
                            !insideCategory && <div className='p-1 d-flex justify-content-between align-items-center my-1'>

                                {/* tried recipe or not */}
                                <Form>
                                    {['checkbox'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check // prettier-ignore
                                                type={type}
                                                id={`default-${type}`}
                                                label='Tried Recipe'
                                                onChange={e => handleCheckbox(e.target.checked, recipeVideoData)}
                                            />

                                        </div>
                                    ))}
                                </Form>
                                <Button onClick={() => handleDeleteRecipeVideo(recipeVideoData?.id)}><i className="fa-solid fa-trash text-danger"></i></Button>
                            </div>

                        }
                    </Card.Text>
                </Card.Body>
            </Card>


            {/* modal for video playing */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{recipeVideoData.caption}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='p-1'>
                        <iframe width="100%" height="500px" src={`${recipeVideoData?.videoLink}?autoplay=1`} title="LegPuff #shorts" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='bg-danger' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VideoCard