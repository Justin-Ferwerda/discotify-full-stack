// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebase } from '../client';
import { checkUser, registerUser } from '../auth';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const date = () => {
    let now = new Date();
    const offset = now.getTimezoneOffset();
    now = new Date(now.getTime() - (offset * 60 * 1000));
    return now.toISOString().split('T')[0];
  };

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((gamerInfo) => {
      setUser({ fbUser: oAuthUser, ...gamerInfo });
    }),
    [oAuthUser],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        await checkUser(fbUser.uid).then(async (userInfo) => {
          let userObj = {};
          if ('null' in userInfo) {
            const userCreate = {
              uid: fbUser.uid,
              name: fbUser.displayName,
              image: fbUser.photoURL,
              memberSince: date(),
            };
            await registerUser(userCreate).then((userObject) => {
              userObj = userObject;
            });
          } else {
            userObj = userInfo;
          }
          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      updateUser,
      userLoading: user === null || oAuthUser === null,
    }),
    [user, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
