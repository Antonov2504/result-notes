import styled from 'styled-components';

export const Container = styled.article<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  padding: 5px;
  background-color: ${({ $isActive }) => ($isActive ? '#bee1ff' : 'transparent')};
  border-bottom: 1px solid #cecece;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #bee1ff;
  }
`;

export const Title = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
`;

export const CreatedAt = styled.time`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: #727272;
`;
