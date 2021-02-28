import React, { useReducer } from 'react';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';
import { ADD_NOTE, NEW_NOTE, GET_NOTES, SELECT_NOTE, UPDATE_NOTES, DELETE_NOTE } from './types';
import firebase from 'firebase';

const NoteState = (props) => {
    const initialState = {
        selectedNote: null,
        notes: null,
        isAddingNote: false,
    };

    const toggleAddingNote = () => {
        dispatch({ type: NEW_NOTE });
    };

    const getNotes = async () => {
        const snapshot = await firebase.firestore().collection('notes').get();
        const notes = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        dispatch({ type: GET_NOTES, payload: notes });
    };

    const selectNote = async (note) => {
        dispatch({ type: SELECT_NOTE, payload: note });
    };

    const updateNote = async (note) => {
        await firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .update({ title: note.title, body: note.body, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        dispatch({ type: UPDATE_NOTES, payload: note });
    };

    const addNote = async (note) => {
        const doc = await firebase
            .firestore()
            .collection('notes')
            .add({ title: note.title, body: note.body, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
        note = { ...note, id: doc.id };
        dispatch({ type: ADD_NOTE, payload: note });
    };

    const deleteNote = async (note) => {
        await firebase.firestore().collection('notes').doc(note.id).delete();
        dispatch({ type: DELETE_NOTE, payload: note });
    };

    const [state, dispatch] = useReducer(noteReducer, initialState);

    return (
        <NoteContext.Provider
            value={{
                notes: state.notes,
                isAddingNote: state.isAddingNote,
                selectedNote: state.selectedNote,
                getNotes,
                selectNote,
                updateNote,
                addNote,
                deleteNote,
                toggleAddingNote,
            }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
