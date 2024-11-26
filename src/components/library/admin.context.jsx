import {createContext, useState} from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        username: ''
    }
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            username: ''
        }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
}