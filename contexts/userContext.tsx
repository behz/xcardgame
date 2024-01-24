'use client'
import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client'

// Define the shape of the context
interface UserContextType {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>; 
}

// Creating the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for using the User context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

// UserProvider component props type
interface UserProviderProps {
    children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    const supabase = createClient()


    useEffect(() => {
        async function getUserId() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && !user.id) { 
                console.log('User has not yet joined');
                return; 
            };
            
            setUserId(user!.id || null);
        }
        getUserId();
    }, []);

    // The value that will be supplied to the descendants
    const value = { userId, setUserId};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
