import React, { useState, useEffect, useCallback } from 'react';
import { fetchLoginStatus, fetchUsers, fetchMessage } from './services';
import useInterval from './Interval';
import Nav from './Nav';
import Login from './Login';
import Users from './Users';
import Message from './Message';
import NewMessage from './NewMessage';
import messages from './messages';
import './app.css';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [userListState, setuserListState] = useState([]);
  const [messageState, setMessageState] = useState([]);
  const [error, setError] = useState('');

  const getChats = useCallback(() => {
    getUsers();
    getMessages();
  }, []);

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true,
          username: userInfo.username
        });
        if (userState.isLoggedIn) {
          getChats();
        }
        setError('');
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  }, [getChats, userState.isLoggedIn]);

  const login = username => {
    setUserState({
      isLoggedIn: true,
      username
    });
    getChats();
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  const getUsers = () => {
    fetchUsers()
      .then(usersList => {
        setuserListState(Object.values(usersList));
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  const getMessages = () => {
    fetchMessage()
      .then(messageList => {
        setMessageState(messageList);
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  useInterval(() => {
    if (userState.isLoggedIn) {
      getChats();
    }
  }, 5000);

  let content;

  const checkError = errCode => {
    if (errCode === 'LOGIN_REQUIRED' || errCode === 'LOGIN_UNAUTHORIZED') {
      logout();
    }
  };

  if (userState.isLoggedIn) {
    content = (
      <React.Fragment>
        <NewMessage onAddMessage={getMessages} onError={checkError} />
        <div className="container">
          <Users userList={userListState} />
          <Message messageList={messageState} />
        </div>
      </React.Fragment>
    );
  } else {
    content = <Login onLogin={login} />;
  }

  return (
    <div className="app">
      <Nav user={userState} onLogout={logout} onError={checkError} />
      <p>{error}</p>
      {content}
    </div>
  );
};

export default App;
