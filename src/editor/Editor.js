import React, { useState, useContext, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers/helpers';
import NoteContext from '../context/noteContext';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Editor = ({ classes }) => {
    const noteContext = useContext(NoteContext);
    const { selectedNote, updateNote } = noteContext;
    const [editedNote, setEditedNote] = useState(null);

    const handleNoteChange = (e) => {
        if (selectedNote) setEditedNote({ title: selectedNote.title, id: selectedNote.id, body: e });
    };

    const update = useCallback(
        debounce((editedNote) => {
            updateNote(editedNote);
        }, 1500),
        []
    );

    useEffect(() => {
        if (editedNote) update(editedNote);
    }, [update, editedNote]);

    useEffect(() => {
        console.log('selected note', selectedNote);
        if (selectedNote !== null) {
            setEditedNote(selectedNote);
        } else {
            console.log('eh?');
            setEditedNote(null);
        }
    }, [selectedNote]);

    return (
        <div className={classes.editorContainer}>
            {selectedNote ? (
                <ReactQuill value={(editedNote && editedNote.body) || null} onChange={handleNoteChange} />
            ) : null}
        </div>
    );
};

export default withStyles(styles)(Editor);
