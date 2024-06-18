import React from 'react';
import { UserProvider } from './UserContext';
import { NotesProvider } from './NotesContext';

const StoreProvider = ({ children }) => {
  return (
    <UserProvider>
      <NotesProvider>
        {children}
      </NotesProvider>
    </UserProvider>
  );
};

export default StoreProvider;
