// style.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;

  padding: 0 45px;
  border-radius: 20px;
  width: 822px;
  z-index: 1001;

  background-blend-mode: color-dodge, normal;
  backdrop-filter: blur(40px);

  /* background-image: ; TODO: 모달 배경사진 여기*/
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: black;
  width: 32px;
  height: 32px;
  padding: 0;
  cursor: pointer;
  /* background-image: ; TODO: 모달 닫기 버튼 이미지 여기*/
`;

export const ModalTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalTopTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ModalHeader = styled.h1`
  font-family: Pretendard Variable;
  font-size: 44px;
  font-style: normal;
  color: black;
  margin-top: 34px;
  margin-bottom: 18px;
`;

export const ModalBodyText = styled.p`
  font-family: Sanchez;
  font-size: 22px;
  font-style: normal;
  color: #4d3f3f;
  opacity: 0.6;
  line-height: 134%;
  text-align: left;
  margin: 0;
`;

export const ModalStatsWrap = styled.div`
  display: flex;
  color: black;
  column-gap: 59px;
  margin-top: 50px;
  margin-bottom: 38px;
`;

export const ModalStats = styled.div`
  display: flex;
  column-gap: 14px;
  align-items: center;
`;

export const ModalStatsTitle = styled.p`
  font-family: Pretendard Variable;
  font-size: 16px;
  margin: 0;
`;

export const ModalStatsText = styled.p`
  font-family: Pretendard Variable;
  font-size: 34px;
  margin: 0;
`;

export const ModalImage = styled.image`
  width: 199px;
  height: 199px;
  margin-top: 40px;
  margin-right: 22px;
  background-color: black;
  /* background-image: ; TODO: 모달 일러스트 여기*/
`;

export const ModalDivider = styled.div`
  stroke-width: 1px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 1px;
`;

export const ModalBottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 40px;
`;

export const ModalEquivalentWrap = styled.div`
  display: flex;
  column-gap: 35px;
  color: black;
  align-items: center;
`;

export const ModalEquivalentTitle = styled.p`
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  width: 97px;
  text-align: left;
  height: fit-content;
  margin: 0;
`;

export const ModalEquivalentText = styled.p`
  font-family: Pretendard Variable;
  font-size: 19px;
  text-align: left;
  width: 307px;
  margin: 0;
`;

export const ModalButton = styled.button`
  background-color: black;
  border-radius: 12px;
  width: 190px;
  height: 64px;
  cursor: pointer;
`;
