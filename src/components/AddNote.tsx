import React, { useState, useEffect } from 'react';

interface AddNoteProps {
  addNote: (note: { id?: number; title: string; body: string }) => void;
  editingNote?: { id: number; title: string; body: string } | null;
  onCancelEdit?: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ addNote, editingNote, onCancelEdit }) => {
  const [title, setTitle] = useState(editingNote?.title || '');
  const [body, setBody] = useState(editingNote?.body || '');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setBody(editingNote.body);
    }
  }, [editingNote]);

  const handleAddNote = () => {
    if (title && body) {
      addNote({
        id: editingNote?.id,
        title,
        body,
      });
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Take a note..."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      ></textarea>
      <button onClick={handleAddNote} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        {editingNote ? 'Update Note' : 'Add Note'}
      </button>
      {editingNote && (
        <button onClick={onCancelEdit} className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
          Cancel
        </button>
      )}
    </div>
  );
};

export default AddNote;
