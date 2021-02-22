import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'profile': {
      return { ...state, profile: action.payload };
    }
    case 'battles': {
      return { ...state, battles: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { profile: null, battles: null });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
};

const useUser = () => [useUserState(), useUserDispatch()];

export {
  UserProvider, useUserState, useUserDispatch, useUser,
};
