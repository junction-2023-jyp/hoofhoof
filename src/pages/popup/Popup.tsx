import React, { useState, useEffect } from 'react';

import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import styled from 'styled-components';

const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const getAuthToken = () => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError) {
        console.log('Error getting auth token:', chrome.runtime.lastError.message);
        return;
      }

      setToken(token);
    });
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <StSection>
      <div>
        <h1>Chrome Extension with React and TypeScript</h1>
        {token ? <div>Token: {token}</div> : <button onClick={getAuthToken}>Get Auth Token</button>}
      </div>
    </StSection>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

const StSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
