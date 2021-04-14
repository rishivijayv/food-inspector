import IngredientList from './IngredientList/IngredientList';
import Ingredient from './Ingredient/Ingredient';
import ImagePreview from './ImagePreview/ImagePreview'

import { makeStyles } from "@material-ui/core/styles";
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles({
    imageContainer: {
        display: 'flex',
        marginTop: '20px',
        whiteSpace: 'nowrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '700px',
        transition: 'transform 300ms'
    },
    imageContainerAnimate: {
        transform: 'translate(-110px, 0)'
    },
    contentContainer: {
        width: '100%',
        height: '100%'
    },
    verticalLine: {
        marginLeft: '30px',
        marginTop: '46px',
        width: '1px',
        backgroundColor: 'white',
        height: '18em'
    },
})

/**
 * Return a list of keywords to render provided the names of the keywords
 * @param {Array} keywords 
 * @param {Object} classes 
 * @returns Components rendering the lists, or null if keywords have not been recieved yet
 */
 function getKeywordsListToRender(keywords){
    if(keywords == null){
        return null
    }

    const keywordItems = []
    for(const keyword in keywords.keywords){
        keywordItems.push(<Ingredient name={keyword} probability={keywords.keywords[keyword]}/>)
    }

    // const listItems = keywords.map(ingredient => <Ingredient name={ingredient} />)

    return <IngredientList items={keywordItems} />
}

function FoodKeywords({ imageUploaded, imagePreview, keywords }){

    const classes = useStyles()

    const keywordsListToRender = getKeywordsListToRender(keywords)

    return (
        <div className={classes.contentContainer}>
            <div className={keywordsListToRender ? classes.imageContainerAnimate+' '+classes.imageContainer : classes.imageContainer}>
                { imageUploaded  ? <ImagePreview image={imagePreview}/> : null }
                { keywordsListToRender ? <Fade in={true} style={{ transitionDelay: '400ms' }}><hr id="vertical-line" className={classes.verticalLine} /></Fade> : null}
                { keywordsListToRender }
            </div>
        </div>
    )
}

export default FoodKeywords