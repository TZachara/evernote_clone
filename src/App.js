import React from 'react';
import './App.css';
import NoteState from './context/NoteState';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

function App() {
    return (
        <div className='app-container'>
            <NoteState>
                <Sidebar></Sidebar>
                <Editor></Editor>
            </NoteState>
        </div>
    );
}

export default App;
