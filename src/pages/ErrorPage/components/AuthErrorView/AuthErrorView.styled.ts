import styled from 'styled-components';
import BgError from '@src/assets/images/bg-errors.jpg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50vw;
  padding: 5vh 2vw;
  margin: 30vh auto 30px;
`;

export const Code = styled.h1`
  margin: 0;
  font-size: 48px;
  line-height: 1.2;
  color: #228be6;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 48px;
  line-height: 1.2;
  color: #228be6;
`;

export const Background = styled.div`
  margin: auto;
  background: url(${BgError}) center / contain no-repeat;
  transition: background-image 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  &::after {
    content: '';
    background-color: rgba(255 255 255 / 50%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const FooterLink = styled(Link)`
  padding-bottom: 3px;
  border-bottom: 1px solid #54aa59;
  color: #54aa59;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #c4dd52;
  }
`;
