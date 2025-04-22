// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType>({
    userId: null,
    setUserId: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("id"));

    const updateUserId = (id: string | null) => {
        setUserId(id);
        if (id) localStorage.setItem("id", id);
        else localStorage.removeItem("id");
    };

    return (
        <UserContext.Provider value={{ userId, setUserId: updateUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);