import React from 'react';
import NoteList from './components/NoteList';

const App: React.FC = () => {
  return (
    <div id="app">
      <h1>Google Keep Clone</h1>
      <NoteList />
    </div>
  );
};

export default App;
