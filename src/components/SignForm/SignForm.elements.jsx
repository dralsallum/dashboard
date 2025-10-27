// SignForm.styles.js
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SignContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f5f7fa;
  direction: rtl;
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 380px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const LoginSignHeader = styled.h1`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const LoginSignSubHeader = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: #555;
`;

export const LoginSignForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginSignInput = styled.input`
  padding: 0.6rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
  background-color: #fff;
  color: #000;

  &:focus {
    outline: none;
    border-color: #ff5826;
  }
`;

export const SignButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #ff7143;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background 0.3s, opacity 0.3s;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #ff5826;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    background-color: #ff5826;
    border: 2px solid #ff5826;
    outline: none;
  }
`;

export const RegistarButton = styled(SignButton)`
  background: transparent;
  color: #ff5826;
  border: 1px solid #ff5826;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: #ff5826;
    color: #fff;
    border: 1px solid #ff5826;
  }
`;

export const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #ff5826;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const LoginSignPara = styled.p`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  margin-top: 1.25rem;
  text-align: center;

  a {
    color: #ff5826;
    text-decoration: underline;
  }
`;
