import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    ingredientListItem: {
        color: 'white'
    },
    ingredientAvatar: {
        backgroundColor: '#2D882D'
    }
})

function Ingredient({ name, probability }){

    const classes = useStyles()

    const renderText = `${name} (${probability * 100}%)`

    return (
        <ListItem className={classes.ingredientListItem}>
            <ListItemAvatar>
                <Avatar className={classes.ingredientAvatar}>
                    <FastfoodIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={renderText} />
        </ListItem>
    )

}

export default Ingredient