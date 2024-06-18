import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([{
        id: 121212,
        firstname: 'dummyUser',
        lastname: 'lastname',
        email: 'dummyuser@gmail.com',
        number: '7856548512',
        password: 'Asdf@1234'
    }]);
    const [currentUser, setCurrentUser] = useState(null);
    const [updateUserDialog, setUpdateUserDialog] = useState(false);

    const register = (user) => {
        setUsers([...users, user]);
        console.log(users)
    };

    const login = (user) => {
        setCurrentUser(user);
        console.log(user)

    };

    const logout = () => {
        setCurrentUser(null);
    };

    const handleUpdateUser = (updatedUser) => {
        if (currentUser) {
            setCurrentUser({ ...currentUser, ...updatedUser });
            toast.success('Profile Updated Successfully!');
        }
    };

    const handleUpdateUserDialog = (state) => {
        setUpdateUserDialog(state);
    };

    return (
        <UserContext.Provider value={{
            users,
            currentUser,
            updateUserDialog,
            register,
            login,
            logout,
            handleUpdateUser,
            handleUpdateUserDialog,
            setUpdateUserDialog
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
