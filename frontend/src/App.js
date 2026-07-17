import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './styles/App.css';

const API_URL = 'http://localhost:5001/api/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notes from database
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle create or update note
  const handleSubmit = async (formData) => {
    try {
      if (editingNote) {
        // Update existing note
        const response = await fetch(`${API_URL}/${editingNote._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Failed to update note');
        }
        // Refresh notes list
        await fetchNotes();
        setEditingNote(null);
        alert('Note updated successfully!');
      } else {
        // Create new note
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Failed to create note');
        }
        // Refresh notes list
        await fetchNotes();
        alert('Note created successfully!');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error: ' + err.message);
    }
  };

  // Handle edit note
  const handleEdit = (note) => {
    setEditingNote(note);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete note
  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`${API_URL}/${noteId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        // Refresh notes list
        await fetchNotes();
        alert('Note deleted successfully!');
      } catch (err) {
        console.error('Error deleting note:', err);
        alert('Error: ' + err.message);
      }
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingNote(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📝 My Notes</h1>
          <p className="app-subtitle">Organize your thoughts</p>
        </div>
      </header>

      <main className="app-main">
        <div className="app-content">
          <section className="form-section">
            <NoteForm
              onSubmit={handleSubmit}
              editingNote={editingNote}
              onCancel={handleCancel}
            />
          </section>

          <section className="list-section">
            <NotesList
              notes={notes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
              error={error}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 My Notes App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
