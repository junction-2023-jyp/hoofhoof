import { useState, useEffect } from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Category, GmailList, GmailListMessage } from '@root/src/gmail';
import { http } from '@root/src/libs/axios';

import styled from 'styled-components';
import { SearchQuery } from '@root/src/libs/buildQuery';

const Popup = () => {
  const [mailList, setMailList] = useState<GmailListMessage[]>([]);

  const [startDate, setStartDate] = useState<Date>(new Date(0));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [categories, setcategories] = useState<Category[]>(['promotions', 'social']);
  const [isUnread, setIsUnread] = useState<boolean>(true);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [isImportant, setIsImportant] = useState<boolean>(false);

  // category:promotions OR category:social
  /**
   * Manage Authentication
   */
  const getAuthToken = () => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError) {
        console.log('Error getting auth token:', chrome.runtime.lastError.message);
        return;
      }
      console.log('token', token);
      http.interceptors.request.use(config => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      });
    });
  };
  useEffect(() => {
    getAuthToken();
  }, []);

  /**
   * Event Handlers
   */
  const handleClickGetList = async () => {
    let nextPageToken = null;
    let allMails = [];

    const query = new SearchQuery({
      startDate,
      endDate,
      categories,
      isUnread,
      isStarred,
      isImportant,
    });
    // TODO: 쿼리 파라미터 넣기
    console.log('>>', query.buildQuery());

    try {
      setMailList([]);
      do {
        const res = await http.get<GmailList>('/messages', {
          params: {
            maxResults: 500,
            q: query.buildQuery(),
            pageToken: nextPageToken,
          },
        });

        const messages = res.data.messages;
        console.log('messages', messages);
        if (messages) {
          allMails = [...allMails, ...messages];
        }

        nextPageToken = res.data.nextPageToken;
      } while (nextPageToken);
      setMailList(allMails);
      // TODO: MailList를 UI에 보여주기?
    } catch (error) {
      console.error('Error fetching mails:', error);
    }
  };

  const handleClickCleanUp = async () => {
    const MAX_BATCH_SIZE = 1000;
    const removeIds = mailList.map(mail => mail.id);
    console.log('removeIds', removeIds);

    try {
      for (let i = 0; i < removeIds.length; i += MAX_BATCH_SIZE) {
        const batch = removeIds.slice(i, i + MAX_BATCH_SIZE);
        // batchDelete API 호출
        await http.post('/messages/batchDelete', { ids: batch });
      }
      console.log('모든 메일 삭제 완료');
    } catch (error) {
      console.error('Error during batch delete:', error);
    }
  };

  return (
    <StSection
      className="App"
      style={{
        backgroundColor: '#fff',
      }}>
      <div>
        <h1>HOOF x2</h1>
        {/* {mailList.map((mail: GmailMessage) => (
          <p key={mail.id}>{mail.id}</p>
        ))} */}
        <br />
        <button onClick={handleClickGetList}>Get Mailing List</button>
        <button onClick={handleClickCleanUp}>Delete Mail</button>
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
