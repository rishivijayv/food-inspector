import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    buttonBox: {
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
})

function AppButtons({ toRender }){

    const classes = useStyles()

    return (
        <Fade in={true} style={{ transitionDelay:'700ms'}}>
            <Box className={classes.buttonBox}>
                { toRender }
            </Box>
        </Fade>
    )
}

export default AppButtons