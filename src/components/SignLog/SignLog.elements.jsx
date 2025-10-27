// SignLog.elements.js
import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  padding: 1rem;
  direction: rtl;
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const LoginSignHeader = styled.h1`
  font-size: 1.75rem;
  color: #ff5826;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const LoginSignSubHeader = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.25rem;
  margin-top: 1rem;
`;

export const LoginSignInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fff;
  color: #000;
  &:focus {
    outline: none;
    border-color: #ff5826;
    box-shadow: 0 0 0 2px rgba(41, 70, 182, 0.2);
  }
`;

export const ErrorCon = styled.div`
  color: #d32f2f;
  background: #ffebee;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const SignButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #ff5826;
  border: none;
  border-radius: 6px;
  transition: background-color 0.2s, transform 0.1s;
  &:hover:not(:disabled) {
    background-color: #ff5826;
    transform: translateY(-1px);
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RegistarButton = styled.button`
  margin: 1rem 0 0;
  width: 100%;
  padding: 0.6rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #ff5826;
  background-color: transparent;
  border: 2px solid #ff5826;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, transform 0.1s;

  &:hover {
    background-color: #ff5826;
    color: #fff;
    transform: translateY(-1px);
    cursor: pointer;
    border: 2px solid #ff5826;
  }

  &:focus {
    background-color: #ff5826;
    border: 2px solid #ff5826;
    outline: none;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoginSignPara = styled.p`
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
  margin: 1.5rem 0 0.5rem;
  text-align: center;
  a {
    color: #ff5826;
    text-decoration: underline;
    &:hover {
      color: #ff5826;
    }
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  font-size: 0.85rem;
  color: #ff5826;
  margin-top: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;
