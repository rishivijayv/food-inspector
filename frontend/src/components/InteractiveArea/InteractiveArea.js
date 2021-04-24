import { useState, useEffect } from 'react';
import axios from 'axios';

// My imports
import Description from './Description/Description';
import AppButtons from './AppButtons/AppButtons';
import FoodKeywords from './FoodKeywords/FoodKeywords';

// Material UI imports
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';
import RestoreIcon from '@material-ui/icons/Restore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        top: '50%',
        backgroundColor: 'white',
        color: '#2D882D',
        fontWeight: 'bold',
        marginLeft: '15px'
    },
});

// Initial state of the variable tracking the response from the server
const initResponseState = {
    data: null,
    error: null
}

/**
 * Creates the POST request to the server to retrieve keywords of food image and returns the data obtained.
 * Throws an error if the request failed for any reason
 * @param {Function} setImageSubmitted 
 * @param {Object} image 
 * @returns Keywords associated with the image. Throws an error if request failed for any reason
 */
async function getKeywords(setImageSubmitted, image){
    setImageSubmitted(true)

    const formData = new FormData()

    formData.append(
        "foodImage",
        image,
        image.name
    )
    let keywords = null

    try {
        keywords = await axios.post("api/keywords/", formData)
        return keywords.data.data    
    } catch(err) {
        throw new Error(err)
    }

}

/**
 * Retrieves the keywords associated with the food image and sets the response state appropriately
 * @param {Object} stateSetters 
 * @param {Object} state 
 */
async function retrieveKeywords(stateSetters, state){
    let keywords = null
    try {
        keywords = await getKeywords(stateSetters.setImageSubmitted, state.imageFile)
        stateSetters.setResponse({
            data: keywords,
            error: null
        })
    } catch(err) {
        // Could not get required keywords because of server error
        stateSetters.setResponse({
            data: null,
            error: err
        })
    }
}

/**
 * Updates the buttons displayed on the page based on whether a food image was uploaded or submitted (or both)
 * @param {Object} state
 * @param {Object} stateSetters
 * @param {Object} classes 
 * @returns An array representing the buttons to be displayed on the page
 */
function buttonsOnImageChange(state, stateSetters, classes){

    const uploadButton = <Button variant="contained"
                            startIcon={<PhotoCamera />}
                            className={classes.button}
                            component="label"
                            key="food-upload-button"> 
                                Upload
                                <input accept="image/*" type="file"  
                                    onChange={(e) => updateImageState(stateSetters, true, e.target.files[0])}
                                    hidden/>
                        </Button>

    const submitButton = <Button variant="contained"
                                startIcon={<PublishIcon />}
                                className={classes.button}
                                key="food-submit-button"
                                onClick={(e) => retrieveKeywords(stateSetters, state)}>
                                    Submit
                        </Button>

    const restoreButton = <Button variant="contained"
                            startIcon={<RestoreIcon />}
                            className={classes.button}
                            key="restore-state-button"
                            onClick={() => { updateImageState(stateSetters, false, null) }}> Restore </Button>

    const buttonsToRender = []

    executeAtState(state,
        () => { buttonsToRender.push(uploadButton) },
        () => { buttonsToRender.push(submitButton, restoreButton) },
        () => {},
        () => { buttonsToRender.push(restoreButton) },
        () => { buttonsToRender.push(restoreButton) } 
    )

    return buttonsToRender


}

/**
 * Returns the description text for the application based on the state variables.
 * Note that 
 * @param {Object} state 
 * @returns The description to be displayed to the user
 */
function getDescriptionText(state){
    let description = ""

    executeAtState(state,
        () => { description = "Upload a picture of a food item and find out what the inspector thinks about it!"},
        () => { description = "Preview your image before submitting" },
        () => { description = "Dissecting the food..." },
        () => { description = "Here are some keywords associated with the food with their probabilities!" },
        () => { description = "Something went wrong. Please Restore and try again." } 
    )

    return description
}

/**
 * Runs a function provided for each state when the application is in that state
 * @param {Object} state 
 * @param {Function} imageUpload 
 * @param {Function} beforeSubmit 
 * @param {Function} afterSubmit 
 * @param {Function} afterResponse 
 * @param {Function} onFailure 
 */
function executeAtState(state, imageUpload, beforeSubmit, afterSubmit, afterResponse, onFailure){

    switch(true){
        case !state.imageUploaded:
            imageUpload()
            break
        case state.imageUploaded && !state.imageSubmitted:
            beforeSubmit()
            break
        case state.imageSubmitted && !state.response.data && !state.response.error:
            // Waiting for response from server
            afterSubmit()
            break
        case state.response.data != null:
            // Successful response form server
            afterResponse()
            break
        default:
            // Here, we got an error from the server
            onFailure()
    }

}

/**
 * Sets or resets the status of the buttons on the page or whether a preview image is to be displayed
 * based on the parameters
 * @param {Object} stateSetters
 * @param {boolean} imageUploaded
 * @param {Object} image 
 */
function updateImageState(stateSetters, imageUploaded, image){
    stateSetters.setImageUploaded(imageUploaded)
    stateSetters.setImageFile(image)
    stateSetters.setImageSubmitted(false)
    stateSetters.setResponse(initResponseState)
}

function InteractiveArea(){
    const [imageUploaded, setImageUploaded] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageSubmitted, setImageSubmitted] = useState(false)
    const [response, setResponse] = useState(initResponseState)

    const state = { imageUploaded, imageFile, imagePreview, imageSubmitted, response }
    const stateSetters = { setImageUploaded, setImageFile, setImagePreview, setImageSubmitted, setResponse }

    useEffect(() => {
        if(!(imageFile instanceof File)){
            return
        }

        const objectUrl = URL.createObjectURL(imageFile)
        setImagePreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imageFile])

    const classes = useStyles(imageSubmitted)

    const buttonsToRender = buttonsOnImageChange(state, stateSetters, classes)

    const descriptionText = getDescriptionText(state)

    const renderLoading = !response.data && !response.error && imageSubmitted

    return (
        <div>
            <Description renderLoading={renderLoading} text={descriptionText} />
            <AppButtons toRender={buttonsToRender} />
            <FoodKeywords imageUploaded={imageUploaded} imagePreview={imagePreview} keywords={response.data} />
        </div>
    );
}


export default InteractiveArea;