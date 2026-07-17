import React from 'react';
import NoteItem from './NoteItem';
import '../styles/NotesList.css';

const NotesList = ({ notes, onEdit, onDelete, isLoading, error }) => {
  if (isLoading) {
    return <div className="notes-list-container"><p className="loading-message">Loading notes...</p></div>;
  }

  if (error) {
    return <div className="notes-list-container"><p className="error-message">Error: {error}</p></div>;
  }

  if (notes.length === 0) {
    return (
      <div className="notes-list-container">
        <p className="empty-message">No notes yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="notes-list-container">
      <h2 className="notes-list-title">Your Notes</h2>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
