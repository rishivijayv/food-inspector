import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    ingredientList: {
        maxWidth: '360px',
        backgroundColor: '#2D882D',
        marginTop: '36px',
        marginLeft: '10px'
    }
})

function IngredientList({ items }){

    const classes = useStyles()

    let durationMs = 600 
    const feededItems = items.map(item => {
        durationMs += 150
        return (
            <Fade in={true} style={{ transitionDelay: `${durationMs}ms` }}>
                <div>
                    {item}
                </div>
            </Fade>
        );
    })

    return (
        <List className={classes.ingredientList}>
            {feededItems}
        </List>
    )

}

export default IngredientList