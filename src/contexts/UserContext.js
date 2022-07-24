import React, { createContext, useReducer } from 'react';
import { UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [usersList, dispatch] = useReducer(UserReducer, []);

    return (
        <UserContext.Provider value={{dispatch, usersList}} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;