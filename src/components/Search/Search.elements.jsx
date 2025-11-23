import styled from "styled-components";

export const ArWrapper = styled.section`
  width: 100%;
  min-height: 500px;
  background: #fdfaee;
  padding: 2rem 0 2rem 0;
  position: relative;
  overflow: hidden;
  direction: rtl;
  text-align: right;

  @media screen and (max-width: 968px) {
    padding: 0.5rem 0 1rem 0;
    min-height: 480px;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;

  @media screen and (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
`;

export const Heading = styled.h1`
  font-size: 60px;
  font-weight: 500;
  color: #2d3748;
  line-height: 1.15;
  padding: 2rem;
  letter-spacing: -0.5px;

  @media screen and (max-width: 968px) {
    font-size: 30px;
    padding: 0 1.8rem 0.5rem 1.8rem;
    margin: 0.2rem 0 0.2rem 0;
  }
`;

export const SearchContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.12);
  padding: 28px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 2rem;

  @media screen and (max-width: 968px) {
    margin: 0 1rem;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: ${(props) => props.$textColor || "#2d3748"};
  font-family: inherit;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: #a0aec0;
  }

  /* Style for the placeholder option */
  option:first-child {
    color: ${(props) => props.$placeholderColor || "#a0aebf"};
  }

  /* Style for selected values */
  &:not(:placeholder-shown) {
    color: ${(props) =>
      props.value && props.value !== props.$placeholderText
        ? props.$textColor || "#2d3748"
        : props.$placeholderColor || "#a0aebf"};
  }

  &:focus {
    border-color: #ffd52b;
  }

  @media screen and (max-width: 968px) {
    border: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 2px;
    box-shadow: none;
  }
`;

export const FindButton = styled.button`
  background: #ffd52b;
  color: #2d3748;
  border: none;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(255, 213, 43, 0.3);

  @media screen and (max-width: 968px) {
    width: 100%;
  }

  &:hover:not(:disabled) {
    background: #ffc800;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255, 213, 43, 0.45);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(255, 213, 43, 0.3);
  }

  &:focus-visible {
    outline: 2px solid #2d3748;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 400px;
  max-width: 600px;

  @media screen and (max-width: 968px) {
    max-width: 100%;
    min-height: 350px;
  }
`;

export const YellowBlob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: #ffd52b;
  border-radius: 50% 50% 0 50%;
  top: -80px;
  right: -100px;
  z-index: 1;
  transform: rotate(35deg);
  box-shadow: 0 10px 40px rgba(255, 213, 43, 0.25);

  @media screen and (max-width: 968px) {
    width: 400px;
    height: 400px;
    right: -50px;
  }
`;

export const HandIllustration = styled.div`
  position: relative;
  z-index: 2;
  width: 400px;
  height: 350px;

  @media screen and (max-width: 968px) {
    width: 350px;
    height: 300px;
  }
`;

export const GreenArm = styled.div`
  position: absolute;
  bottom: 0;
  left: 50px;
  width: 200px;
  height: 180px;
  background: linear-gradient(135deg, #6dd5b4 0%, #5ac4a5 100%);
  clip-path: polygon(20% 100%, 25% 50%, 40% 20%, 60% 0%, 75% 20%, 80% 100%);
  transform: rotate(-15deg);
  z-index: 2;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(109, 213, 180, 0.3);

  @media screen and (max-width: 968px) {
    width: 180px;
    height: 160px;
  }
`;

export const MedicalCard = styled.div`
  position: absolute;
  top: 80px;
  left: 150px;
  width: 140px;
  height: 90px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 20px;
  gap: 15px;
  z-index: 3;
  transform: rotate(-5deg);
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: rotate(-5deg) translateY(0px);
    }
    50% {
      transform: rotate(-5deg) translateY(-10px);
    }
  }

  .cross {
    font-size: 36px;
    font-weight: 300;
    color: #6dd5b4;
    line-height: 1;
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    justify-content: center;

    span {
      height: 3px;
      background: #e2e8f0;
      border-radius: 2px;
      display: block;

      &:nth-child(1) {
        width: 100%;
      }

      &:nth-child(2) {
        width: 80%;
      }

      &:nth-child(3) {
        width: 60%;
      }
    }
  }

  @media screen and (max-width: 968px) {
    width: 120px;
    height: 80px;
    padding: 16px;
    left: 130px;
  }
`;

export const OrangeHand = styled.div`
  position: absolute;
  top: 40px;
  right: 50px;
  width: 180px;
  height: 200px;
  z-index: 4;
  filter: drop-shadow(0 4px 12px rgba(255, 119, 68, 0.25));

  &::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 120px;
    background: linear-gradient(135deg, #ff9966 0%, #ff7744 100%);
    border-radius: 50% 50% 50% 20%;
    top: 0;
    right: 0;
    transform: rotate(-20deg);
  }

  &::after {
    content: "";
    position: absolute;
    width: 35px;
    height: 70px;
    background: linear-gradient(135deg, #ff9966 0%, #ff7744 100%);
    border-radius: 20px 20px 15px 15px;
    top: 35px;
    right: 15px;
    transform: rotate(-30deg);
  }

  /* Fingers */
  span:nth-child(1),
  span:nth-child(2),
  span:nth-child(3),
  span:nth-child(4) {
    position: absolute;
    background: linear-gradient(135deg, #ff9966 0%, #ff7744 100%);
    border-radius: 15px;
  }

  @media screen and (max-width: 968px) {
    width: 160px;
    height: 180px;
    right: 40px;
  }
`;

export const SearchIcon = styled.span`
  font-size: 20px;
  line-height: 1;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:focus {
    outline: none;
  }
`;

export const TopImg = styled.img`
  object-fit: contain;
  width: 100%;
  max-width: 500px;
  height: auto;

  @media screen and (max-width: 968px) {
    display: none;
  }
`;
