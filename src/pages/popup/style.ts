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
export const LoadingText = styled.div`
  span {
    display: inline-block;
    margin: 0 -0.05em;
    animation: loadingText 0.7s infinite;
    @for $i from 1 through 6 {
      &:nth-child(#{$i + 1}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
  @keyframes loadingText {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }
`;
