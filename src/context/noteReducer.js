import { ADD_NOTE, NEW_NOTE, GET_NOTES, SELECT_NOTE, UPDATE_NOTES, DELETE_NOTE } from './types';

export default (state, action) => {
    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case SELECT_NOTE:
            return {
                ...state,
                selectedNote: action.payload,
            };
        case NEW_NOTE:
            return {
                ...state,
                isAddingNote: !state.isAddingNote,
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };
        case UPDATE_NOTES:
            return {
                ...state,
                notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload : note)),
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
                selectedNote: null,
            };
        default:
            return state;
    }
};
