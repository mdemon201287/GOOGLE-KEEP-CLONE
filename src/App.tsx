// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import NoteItem from './components/NoteItem';

const App: React.FC = () => {
  return (
    <Router>
      <div id="app">
        <h1>Google Keep Clone</h1>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/add" element={<AddNote addNote={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/note/:id" element={<NoteItem note={{
            id: 0,
            title: '',
            body: '',
            done: false
          }} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
