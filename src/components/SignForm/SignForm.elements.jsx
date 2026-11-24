import styled, { keyframes } from "styled-components";

// FluentFox Theme
const theme = {
  primary: "#2D5A4F",
  primaryHover: "#24483F",
  primaryLight: "rgba(45, 90, 79, 0.12)",
  background: "#F5F7FA",
  white: "#FFFFFF",
  text: "#333333",
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SignContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${theme.background};
  direction: rtl;
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 380px;
  background: ${theme.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const LoginSignHeader = styled.h1`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${theme.primary};
  font-weight: 600;
`;

export const LoginSignSubHeader = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: ${theme.text};
`;

export const LoginSignForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginSignInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  background-color: ${theme.white};
  color: #000;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px ${theme.primaryLight};
  }

  &::placeholder {
    color: #999;
  }
`;

export const SignButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${theme.primary};
  color: ${theme.white};
  border: none;
  border-radius: 6px;
  transition:
    background 0.3s,
    opacity 0.3s,
    transform 0.1s;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${theme.primaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

export const RegistarButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  background: transparent;
  color: ${theme.primary};
  border: 2px solid ${theme.primary};
  border-radius: 6px;
  margin-top: 1rem;
  transition:
    background 0.3s,
    color 0.3s,
    transform 0.1s;
  cursor: pointer;

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    border-color: ${theme.primary};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

export const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${theme.white};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LoginSignPara = styled.p`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.6;
  margin-top: 1.25rem;
  text-align: center;

  a {
    color: ${theme.primary};
    text-decoration: underline;

    &:hover {
      color: ${theme.primaryHover};
    }
  }
`;
