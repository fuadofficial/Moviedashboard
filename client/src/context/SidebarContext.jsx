import { createContext, useState } from 'react';

export const SidebarContext = createContext();

// eslint-disable-next-line react/prop-types
export const SidebarProvider = ({ children }) => {
    const [isMinimized, setIsMinimized] = useState(true);

    const toggleSidebar = () => {
        setIsMinimized(prevState => !prevState);
    };

    const sidebarMinimize = () => {
        setIsMinimized(true)
    }

    return (
        <SidebarContext.Provider value={{ isMinimized, setIsMinimized, toggleSidebar,sidebarMinimize }}>
            {children}
        </SidebarContext.Provider>
    );
};
