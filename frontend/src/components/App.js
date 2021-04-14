// React imports
import React from 'react';
import { render } from 'react-dom';

// My imports
import Title from './Title/Title';
import ShortSeparator from './ShortSeparator/ShortSeparator';
import InteractiveArea from './InteractiveArea/InteractiveArea';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    background: "#2D882D",
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    position: 'fixed',
  },
});

function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Title text="The Food Inspector" />
      <ShortSeparator />
      <InteractiveArea />
    </Box>
  )
}

export default App;