import { createContext } from 'react';

export const AppContext = createContext();

export const MyContext= ({ children }) => {
    return (
        <AppContext.Provider value={{}}> 
            {children}
        </AppContext.Provider>
    )
}
