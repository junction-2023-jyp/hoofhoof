import { useState, useEffect } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Category, GmailList, GmailListMessage } from '@root/src/gmail';
import { http } from '@root/src/libs/axios';
import { SearchQuery } from '@root/src/libs/buildQuery';
import * as S from './style';
import CheckBox from '@root/src/components/CheckBox';
import { HorseIcon } from '@root/src/assets/icons/horse';
import { TrashIcon } from '@root/src/assets/icons/trash';
import CleanAlert from '@root/src/components/composition/CleanAlert';
import LoadingModal from '@root/src/components/composition/LoadingModal';
import CleaningModal from '@root/src/components/composition/CleanFinishModal';

const Popup = () => {
  const [mailList, setMailList] = useState<GmailListMessage[]>([]);
  const [token, setToken] = useState(null);
  // Type
  const [isPromotion, setIsPromotion] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  // Status
  const [startDate, setStartDate] = useState<Date>(new Date(0));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isUnread, setIsUnread] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [isImportant, setIsImportant] = useState<boolean>(false);
  // Modal, Alert
  const [openCleanAlert, setOpenCleanAlert] = useState(false);
  const [openCleanFinishModal, setOpenCleanFinishModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);

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
      setToken(token);
      http.interceptors.request.use(config => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      });
    });
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  useEffect(() => {
    handleChangeSearchQuery();
  }, [token]);

  useEffect(() => {
    handleChangeSearchQuery();
  }, [isPromotion, isSocial, startDate, endDate, isUnread, isStarred, isImportant]);

  /**
   * Event Handlers
   */
  const handleChangeSearchQuery = async () => {
    console.log('in!');
    if (!token) {
      console.log('token is null');
      return;
    }
    let nextPageToken = null;
    let allMails = [];

    const query = new SearchQuery({
      isPromotion,
      isSocial,
      startDate,
      endDate,
      isUnread,
      isStarred,
      isImportant,
    });
    // TODO: 쿼리 파라미터 넣기
    console.log('>>', query.buildQuery());

    setOpenLoadingModal(true);
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
        if (messages) {
          allMails = [...allMails, ...messages];
        }

        nextPageToken = res.data.nextPageToken;
      } while (nextPageToken);
      setMailList(allMails);
    } catch (error) {
      console.error('Error fetching mails:', error);
    }
    setOpenLoadingModal(false);
  };
  const handleClickIsPromotion = () => {
    setIsPromotion(!isPromotion);
  };
  const handleClickIsSocial = () => {
    setIsSocial(!isSocial);
  };
  const handleClickIsUnread = () => {
    setIsUnread(!isUnread);
  };
  const handleClickIsStarred = () => {
    setIsStarred(!isStarred);
  };
  const handleClickIsImportant = () => {
    setIsImportant(!isImportant);
  };
  const handleClickClear = () => {
    setOpenCleanAlert(true);
  };
  const handleClickCleanUp = async () => {
    const MAX_BATCH_SIZE = 1000;
    const removeIds = mailList.map(mail => mail.id);
    console.log('removeIds', removeIds);

    setOpenCleanFinishModal(true);
    try {
      for (let i = 0; i < removeIds.length; i += MAX_BATCH_SIZE) {
        const batch = removeIds.slice(i, i + MAX_BATCH_SIZE);
        // batchDelete API 호출
        await http.post('/messages/batchDelete', { ids: batch });
      }
      setOpenCleanFinishModal(false);
      setOpenCleanAlert(false);
      // TODO: Nahee님 정리 끝나면 Result Page 띄우기
    } catch (error) {
      console.error('Error during batch delete:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.TitleContainer>
          <S.TitleLogo />
          <S.TitleHorse>
            <HorseIcon />
          </S.TitleHorse>
        </S.TitleContainer>
        <S.OptionContainer>
          <S.OptionTitle>Type</S.OptionTitle>
          <S.OptionContent>
            <S.OptionContentItem>
              <CheckBox checked={isPromotion} onClick={handleClickIsPromotion} />
              <span>promotion</span>
            </S.OptionContentItem>
            <S.OptionContentItem>
              <CheckBox checked={isSocial} onClick={handleClickIsSocial} />
              <span>social</span>
            </S.OptionContentItem>
          </S.OptionContent>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.OptionTitle>Status</S.OptionTitle>
          <S.OptionContent>
            <S.OptionContentItem>
              <CheckBox checked={isUnread} onClick={handleClickIsUnread} />
              <span>unread</span>
            </S.OptionContentItem>
            <S.OptionContentItem>
              <CheckBox checked={isImportant} onClick={handleClickIsImportant} />
              <span>important</span>
            </S.OptionContentItem>
            <S.OptionContentItem>
              <CheckBox checked={isStarred} onClick={handleClickIsStarred} />
              <span>starred</span>
            </S.OptionContentItem>
          </S.OptionContent>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.OptionTitle>
            Duration
            <p>Clear all email between the two dates</p>
          </S.OptionTitle>
          <S.OptionContent></S.OptionContent>
        </S.OptionContainer>
        <S.Footer>
          <S.OptionContentItem>
            <TrashIcon />
            <span className="total-mail">Total {mailList.length}</span>
          </S.OptionContentItem>
          <S.ClearButton onClick={handleClickClear}>CLEAN</S.ClearButton>
        </S.Footer>
      </S.Container>
      <CleanAlert isOpen={openCleanAlert} setIsOpen={setOpenCleanAlert} onClickConfirm={handleClickCleanUp} />
      <CleaningModal isOpen={openCleanFinishModal} setIsOpen={setOpenCleanFinishModal} />
      <LoadingModal isOpen={openLoadingModal} setIsOpen={setOpenLoadingModal} />
    </S.Wrapper>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> OpenLoadingModal ... </div>), <div> Error Occur </div>);
