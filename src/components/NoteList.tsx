import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { getNotes } from '../api';

interface Note {
  id: number;
  title: string;
  body: string;
  done: boolean;
}



const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [doneNotes, setDoneNotes] = useState<Note[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData.map((note: Note) => ({ ...note, done: false })));
    };

    fetchNotes();
  }, []);

  const addNote = (note: { id?: number; title: string; body: string }) => {
    if (note.id) {
      setNotes(
        notes.map((n) =>
          n.id === note.id ? { ...n, title: note.title, body: note.body } : n
        )
      );
      setEditingNote(null);
    } else {
      setNotes([
        ...notes,
        { ...note, id: notes.length + 1, done: false },
      ]);
    }
  };

  const deleteNote = (id: number) => {
    const noteToDelete = notes.find((note) => note.id === id) || doneNotes.find((note) => note.id === id);
    if (noteToDelete) {
      setNotes(notes.filter((note) => note.id !== id));
      setDoneNotes(doneNotes.filter((note) => note.id !== id));
      setDeletedNotes([...deletedNotes, noteToDelete]);
    }
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
  };

  const toggleDone = (id: number) => {
    const noteToToggle = notes.find((note) => note.id === id) || doneNotes.find((note) => note.id === id);
    if (noteToToggle) {
      if (noteToToggle.done) {
        noteToToggle.done = false;
        setDoneNotes(doneNotes.filter((note) => note.id !== id));
        setNotes([noteToToggle, ...notes]);
      } else {
        noteToToggle.done = true;
        setNotes(notes.filter((note) => note.id !== id));
        setDoneNotes([noteToToggle, ...doneNotes]);
      }
    }
  };

  const restoreNote = (id: number) => {
    const noteToRestore = deletedNotes.find((note) => note.id === id);
    if (noteToRestore) {
      setDeletedNotes(deletedNotes.filter((note) => note.id !== id));
      setNotes([noteToRestore, ...notes]);
    }
  };

  const permanentDeleteNote = (id: number) => {
    setDeletedNotes(deletedNotes.filter((note) => note.id !== id));
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDoneNotes = doneNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeletedNotes = deletedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search notes by title"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <AddNote
        addNote={addNote}
        editingNote={editingNote}
        onCancelEdit={cancelEdit}
      />
      <div className="flex space-x-4">
        <div className="w-1/3">
          <h2 className="mb-4 text-xl font-bold">Deleted Notes</h2>
          {filteredDeletedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onRestore={restoreNote}
              onPermanentDelete={permanentDeleteNote}
            />
          ))}
        </div>
        <div className="w-1/3">
          <h2 className="mb-4 text-xl font-bold">Notes</h2>
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onEdit={editNote}
              onToggleDone={toggleDone}
            />
          ))}
        </div>
        <div className="w-1/3">
          <h2 className="mb-4 text-xl font-bold">Done Notes</h2>
          {filteredDoneNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onToggleDone={toggleDone}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
