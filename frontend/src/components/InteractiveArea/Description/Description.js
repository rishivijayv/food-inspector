import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    descriptionBox: {
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '65%',
        textAlign: 'center',
    },
    descriptionText: {
        color: 'white',
    },
    progress: {
        color: 'white',
        marginTop: '9px'
    }
});


function Description(props){
    const classes = useStyles();

    return (
        <Fade in={true} style={{ transitionDelay:'700ms'}}>
            <Box className={classes.descriptionBox}>
                <Typography variant="h5" className={classes.descriptionText}>
                    {props.text}
                </Typography>
                { props.renderLoading ? <CircularProgress className={classes.progress}/> : null }
            </Box>
        </Fade>

    );
}

export default Description