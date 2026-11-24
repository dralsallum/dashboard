import { Link } from "react-router-dom";
import styled from "styled-components";

// FluentFox Theme
const theme = {
  primary: "#2D5A4F",
  primaryHover: "#24483F",
  primaryLight: "rgba(45, 90, 79, 0.12)",
  background: "#F5F7FA",
  white: "#FFFFFF",
  text: "#333333",
};

export const SignContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.background};
  padding: 1rem;
  direction: rtl;
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: ${theme.white};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const LoginSignHeader = styled.h1`
  font-size: 1.75rem;
  color: ${theme.primary};
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const LoginSignSubHeader = styled.label`
  display: block;
  font-size: 0.9rem;
  color: ${theme.text};
  margin-bottom: 0.25rem;
  margin-top: 1rem;
`;

export const LoginSignInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 0.75rem;
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
  font-weight: 600;
  color: ${theme.white};
  background-color: ${theme.primary};
  border: none;
  border-radius: 6px;
  transition:
    background-color 0.2s,
    transform 0.1s;

  &:hover:not(:disabled) {
    background-color: ${theme.primaryHover};
    transform: translateY(-1px);
    cursor: pointer;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
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
  font-weight: 600;
  color: ${theme.primary};
  background-color: transparent;
  border: 2px solid ${theme.primary};
  border-radius: 6px;
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.1s;

  &:hover {
    background-color: ${theme.primary};
    color: ${theme.white};
    transform: translateY(-1px);
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.primaryLight};
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid ${theme.white};
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
  line-height: 1.6;
  margin: 1.5rem 0 0.5rem;
  text-align: center;
  font-weight: 600;

  a {
    color: ${theme.primary};
    text-decoration: underline;

    &:hover {
      color: ${theme.primaryHover};
    }
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.primary};
  margin-top: 0.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
