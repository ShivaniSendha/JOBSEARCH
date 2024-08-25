import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // login ke baad user set karne ka function
    const login = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};
