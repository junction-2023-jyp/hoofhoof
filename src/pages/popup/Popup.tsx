import React, { useState, useEffect } from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const getAuthToken = () => {
    console.log('들어옴');
    chrome.identity.getAuthToken({ interactive: true }, token => {
      console.log();
      if (chrome.runtime.lastError) {
        console.log('Error getting auth token:', chrome.runtime.lastError.message);
        return;
      }

      setToken(token);
      console.log('Access Token:', token);
      console.log('끝남1');
      // Optionally: Use the token to get the user's email or other information
      fetchUserInformation(token);
    });
    console.log('끝남2');
  };

  const fetchUserInformation = (authToken: string) => {
    console.log(`Use this token for authenticated requests: ${authToken}`);
    setUserEmail('user@example.com'); // Replace with actual API call logic
  };
  useEffect(() => {
    console.log('token', token);
  }, [token]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' && '#0281dc', marginBottom: '10px' }}>
          Learn React!
        </a>
        <button
          style={{
            backgroundColor: theme === 'light' ? '#fff' : '#000',
            color: theme === 'light' ? '#000' : '#fff',
          }}
          onClick={exampleThemeStorage.toggle}>
          Toggle theme
        </button>
      </header>
      <div>
        <h1>Chrome Extension with React and TypeScript</h1>
        {token ? (
          <div>
            <p>Token: {token}</p>
            <p>Email: {userEmail}</p>
          </div>
        ) : (
          <button onClick={getAuthToken}>Get Auth Token</button>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
