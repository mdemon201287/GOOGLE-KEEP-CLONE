import React from 'react';

interface NoteItemProps {
  note: {
    id: number;
    title: string;
    body: string;
    done: boolean;
  };
  onDelete?: (id: number) => void;
  onEdit?: (note: { id: number; title: string; body: string; done: boolean }) => void;
  onToggleDone?: (id: number) => void;
  onRestore?: (id: number) => void;
  onPermanentDelete?: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
  onEdit,
  onToggleDone,
  onRestore,
  onPermanentDelete,
}) => {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow">
      <h3 className="mb-2 text-lg font-bold">{note.title}</h3>
      <p className="mb-2">{note.body}</p>
      <div className="flex justify-end space-x-2">
        {onToggleDone && (
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={() => onToggleDone(note.id)}
          >
            {note.done ? 'Undone' : '✔️'}
          </button>
        )}
        {onEdit && (
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        )}
        {onRestore && (
          <button
            className="px-4 py-2 text-white bg-yellow-500 rounded"
            onClick={() => onRestore(note.id)}
          >
            Restore
          </button>
        )}
        {onPermanentDelete && (
          <button
            className="px-4 py-2 text-white bg-red-800 rounded"
            onClick={() => onPermanentDelete(note.id)}
          >
            Permanent Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
