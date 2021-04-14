import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  titleBox: {
    width: '100%',
    minHeight: '80px',
    textAlign: 'center'
  },
  title: {
      color: 'white',
  }
});



function Title(props){
    const classes = useStyles();
    return (
        <Fade in={true} style={{ transitionDelay:'300ms'}}>
            <Box className={classes.titleBox}>
                <Typography variant="h2" className={classes.title}>
                    {props.text}
                </Typography>
            </Box>
        </Fade>
    );
}

export default Title;

