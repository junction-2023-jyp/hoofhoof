import styled from 'styled-components';

interface ContainerProps {
  checked: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  stroke: ${props => (props.checked ? null : '#AE7FEA')};
  stroke-width: 1px;

  border-radius: 2px;
  background-color: ${props => (props.checked ? '#AE7FEA' : '#fff')};
  cursor: pointer;
`;
