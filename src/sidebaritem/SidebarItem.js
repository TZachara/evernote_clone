import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers/helpers';
import NoteContext from '../context/noteContext';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const SidebarItem = ({ classes, note, isSelected }) => {
    const noteContext = useContext(NoteContext);
    const { deleteNote } = noteContext;

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete note ${note.title}?`)) {
            deleteNote(note);
        }
    };
    return (
        <div>
            <ListItem className={(classes.listItem, isSelected ? classes.selected : null)} alignItems='flex-start'>
                <div className={classes.textSection}>
                    <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0, 30) + '...')}
                    ></ListItemText>
                </div>
                <DeleteIcon className={classes.deleteIcon} onClick={handleDelete}></DeleteIcon>
            </ListItem>
        </div>
    );
};

export default withStyles(styles)(SidebarItem);
