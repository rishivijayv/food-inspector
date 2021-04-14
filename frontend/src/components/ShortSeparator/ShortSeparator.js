import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    separator: {
        border: '2px solid white',
        width: '150px',
        borderRadius: '10px',
    },
});

function ShortSeparator() {

    const classes = useStyles();

    return (
        <Fade in={true} style={{ transitionDelay:'500ms'}}>
            <hr className={classes.separator} />
        </Fade>
    );
}

export default ShortSeparator;