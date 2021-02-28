import React, { useContext, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/SidebarItem';
import NoteContext from '../context/noteContext';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Sidebar = ({ classes }) => {
    const [newNote, setNewNote] = useState({
        title: '',
        body: '',
        id: null,
    });

    const handleTitleChange = (e) => {
        setNewNote({
            title: e.target.value || '',
            body: '',
            id: null,
        });
    };

    const handleSubmit = async () => {
        await addNote(newNote);
        setNewNote(null);
        toggleAddingNote();
    };

    const noteContext = useContext(NoteContext);

    const { notes, isAddingNote, getNotes, selectNote, addNote, toggleAddingNote, selectedNote } = noteContext;

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    return (
        <div className={classes.sidebarContainer}>
            <Button onClick={toggleAddingNote} className={classes.newNoteBtn}>
                {isAddingNote ? 'Cancel' : 'New Note'}
            </Button>
            {isAddingNote ? (
                <div>
                    <input
                        type='text'
                        className={classes.newNoteInput}
                        placeholder='Enter note title'
                        onKeyUp={handleTitleChange}
                        required
                    ></input>
                    <Button className={classes.newNoteSubmitBtn} onClick={handleSubmit}>
                        Submit Note
                    </Button>
                </div>
            ) : null}
            {notes && (
                <List>
                    {notes.map((_note, _index) => {
                        return (
                            <div key={_index} onClick={() => selectNote(_note)}>
                                <SidebarItem
                                    note={_note}
                                    isSelected={selectedNote && _note.id === selectedNote.id}
                                ></SidebarItem>
                                <Divider></Divider>
                            </div>
                        );
                    })}
                </List>
            )}
        </div>
    );
};

export default withStyles(styles)(Sidebar);
