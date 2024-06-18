import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [dialogState, setDialogState] = useState({
    createNotesDialog: false,
    deleteNotesDialog: false,
  });
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  const handleCreateDialog = (state) => {
    setDialogState({ ...dialogState, createNotesDialog: state });
  };

  const handleDeleteDialog = (state) => {
    setDialogState({ ...dialogState, deleteNotesDialog: state });
  };

  const handleAddNotes = (note) => {
    setNotes([...notes, note]);
    toast.success('Notes Added Successfully!');
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    toast.success('Notes Updated Successfully!');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Notes Deleted Successfully!');
  };

  const handleSearch = (input) => {
    setSearchInput(input);
  };

  const handleChangePage = (page) => {
    setPagination({ ...pagination, page });
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setPagination({ ...pagination, rowsPerPage, page: 0 });
  };

  const handleStatus = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, status: !note.status } : note));
    toast.success('Status Updated!');
  };

  return (
    <NotesContext.Provider value={{
      notes,
      dialogState,
      searchInput,
      pagination,
      handleCreateDialog,
      handleDeleteDialog,
      handleAddNotes,
      handleUpdateNote,
      handleDeleteNote,
      handleSearch,
      handleChangePage,
      handleChangeRowsPerPage,
      handleStatus
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
