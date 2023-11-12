import { useState, useEffect, useRef } from 'react';
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
import useStorage from '@root/src/shared/hooks/useStorage';
import hoofDataStorage from '@root/src/shared/storages/hoofDataStorage';

const Popup = () => {
  // TODO: nahee: hoofdata.deletedMailCount 를 사용해서 삭제된 메일 개수를 표시하시면 됩니다.
  const hoofData = useStorage(hoofDataStorage);
  const [mailList, setMailList] = useState<GmailListMessage[]>([]);
  const [token, setToken] = useState(null);
  // Type
  const [isPromotion, setIsPromotion] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  // Status
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isUnread, setIsUnread] = useState<boolean | null>(true);
  const [isStarred, setIsStarred] = useState<boolean | null>(false);
  const [isImportant, setIsImportant] = useState<boolean | null>(false);
  // Duration
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
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
    setEndDate(new Date());
  }, [token]);

  useEffect(() => {
    handleChangeSearchQuery();
  }, [isPromotion, isSocial, startDate, endDate, isUnread, isStarred, isImportant]);

  useEffect(() => {
    // TODO: Nahee님 hoofData.deletedMailCount로 잘 가져오는거 확인했습니다
    // alert(hoofData.deletedMailCount);
  }, [hoofData]);

  /**
   * Event Handlers
   */
  const handleChangeSearchQuery = async () => {
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
    console.log('>>', query.buildQuery());

    setOpenLoadingModal(true);
    try {
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
      hoofDataStorage.increaseDeletedMailCount(removeIds.length);
      // TODO: Nahee님 정리 끝나면 Result Page 띄우시면 됩니다

      handleFinalModal();
      window.close();
    } catch (error) {
      console.error('Error during batch delete:', error);
    }
  };
  const handleClickStartDate = () => {
    const { current: startDate } = startDateRef;
    if (startDate) {
      startDate.click();
    }
  };
  const handleClickEndDate = () => {
    const { current: endDate } = endDateRef;
    if (endDate) {
      endDate.click();
    }
  };
  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 필드의 값을 Date 객체로 변환하여 상태를 업데이트합니다.
    setStartDate(new Date(event.target.value));
  };
  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 필드의 값을 Date 객체로 변환하여 상태를 업데이트합니다.
    setEndDate(new Date(event.target.value));
  };

  const handleFinalModal = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTabId = tabs[0].id;
      if (currentTabId) {
        chrome.tabs.sendMessage(currentTabId, { action: 'open_modal' });
      }
    });
  };

  // useEffect(() => {
  //   handleFinalModal();
  // }, []);

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
          {/* <button style={{ color: 'white' }} onClick={handleFinalModal}>
            Open Modal
          </button> */}
          <S.OptionTitle>Type</S.OptionTitle>
          <S.OptionContent>
            <S.OptionContentItem onClick={handleClickIsPromotion}>
              <CheckBox checked={isPromotion} onClick={handleClickIsPromotion} />
              <span>promotion</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsSocial}>
              <CheckBox checked={isSocial} onClick={handleClickIsSocial} />
              <span>social</span>
            </S.OptionContentItem>
          </S.OptionContent>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.OptionTitle>Status</S.OptionTitle>
          <S.OptionContent>
            <S.OptionContentItem onClick={handleClickIsUnread}>
              <CheckBox checked={isUnread} onClick={handleClickIsUnread} />
              <span>unread</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsUnread}>
              <CheckBox checked={!isUnread} onClick={handleClickIsUnread} />
              <span>read</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsUnread}>
              <CheckBox checked={null} onClick={handleClickIsUnread} />
              <span>both</span>
            </S.OptionContentItem>
          </S.OptionContent>
          <S.OptionDivider />
          <S.OptionContent>
            <S.OptionContentItem onClick={handleClickIsImportant}>
              <CheckBox checked={!isImportant} onClick={handleClickIsImportant} />
              <span>not important</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsImportant}>
              <CheckBox checked={isImportant} onClick={handleClickIsImportant} />
              <span>important</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsImportant}>
              <CheckBox checked={null} onClick={handleClickIsImportant} />
              <span>both</span>
            </S.OptionContentItem>
          </S.OptionContent>
          <S.OptionDivider />
          <S.OptionContent>
            <S.OptionContentItem onClick={handleClickIsStarred}>
              <CheckBox checked={!isStarred} onClick={handleClickIsStarred} />
              <span>not starred</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsStarred}>
              <CheckBox checked={isStarred} onClick={handleClickIsStarred} />
              <span>starred</span>
            </S.OptionContentItem>
            <S.OptionContentItem onClick={handleClickIsStarred}>
              <CheckBox checked={null} onClick={handleClickIsStarred} />
              <span>both</span>
            </S.OptionContentItem>
          </S.OptionContent>
        </S.OptionContainer>
        <S.OptionContainer>
          <S.OptionTitle>
            Duration
            <p>Clear all email between the two dates</p>
          </S.OptionTitle>
          <S.DateWrapper>
            <S.DateContainer isBlank={startDate === null} onClick={handleClickStartDate}>
              {startDate ? startDate.toISOString().split('T')[0] : 'Big Bang'}
              <S.DateInput ref={startDateRef} type="date" onChange={handleChangeStartDate} />
            </S.DateContainer>
            <S.DateContainer onClick={handleClickEndDate}>
              {endDate ? endDate.toISOString().split('T')[0] : null}
              <S.DateInput ref={endDateRef} type="date" onChange={handleChangeEndDate} />
            </S.DateContainer>
          </S.DateWrapper>
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
