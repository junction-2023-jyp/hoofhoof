import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 286px;
  background: #3343c2;

  border-radius: 12px;
  text-align: center;
  padding: 30px 0;
  font-family: 'sanchez';
`;
export const Title = styled.h1`
  font-size: 22px;
  line-height: 125%;
  margin: 0;
  margin-bottom: 24px;
`;
export const Description = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  span {
    line-height: 1.5;
    opacity: 0.6;
  }
`;
export const Button = styled.div`
  width: 160px;
  color: #000;
  background: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  border-radius: 60px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    opacity: 0.9;
  }

  transition: all 0.2s ease-in-out;
`;
