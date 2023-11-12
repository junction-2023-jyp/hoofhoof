import { TitleIcon } from '@root/src/assets/icons/title';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100vw;
  display: flex;
  background: #020837;
  color: #fff;
  padding: 24px 0;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 24px;
`;
export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const TitleLogo = styled(TitleIcon)``;
export const TitleHorse = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 14px;
`;
export const OptionDivider = styled.div`
  height: 0.673px;
  background-color: var(--primary-light, #A8B1F3);
  opacity: 0.4;
`;
export const OptionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 16px;

  p {
    font-size: 11px;
    opacity: 0.6;
    line-height: 0.5;
    font-weight: 400;
  }
`;
export const OptionContent = styled.div`
  display: flex;
  gap: 18px;
`;
export const OptionContentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  .total-mail {
    color: #ae7fea;
    font-weight: 600;
  }
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;
export const ClearButton = styled.div`
  color: #fff;
  background: #ae7fea;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  transition: all 0.2s ease-in-out;
`;
export const DateWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;
export const DateContainer = styled.div<{ isBlank?: boolean }>`
  position: relative;
  width: 122px;
  height: 50px;
  background: #161b47;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
`;
export const DateInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;
