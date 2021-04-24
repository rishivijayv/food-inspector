import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    imagePreview: {
        width: '400px',
        height: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingRight: '10px',
    },
})

function ImagePreview({ image }){

    const classes = useStyles()

    const alt = image ? image.name : null

    return <img className={classes.imagePreview} src={image} alt={alt} />

}

export default ImagePreview