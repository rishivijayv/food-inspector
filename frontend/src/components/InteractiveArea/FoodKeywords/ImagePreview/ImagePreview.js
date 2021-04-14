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

    const src = image ? URL.createObjectURL(image) : null
    const alt = image ? image.name : null

    return <img className={classes.imagePreview} src={src} alt={alt} />

}

export default ImagePreview