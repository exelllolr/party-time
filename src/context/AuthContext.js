import React, { createContext, useState, useEffect } from 'react';
import { getUser, logoutUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            setUser(userData);
        };
        fetchUser();
    }, []);

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
