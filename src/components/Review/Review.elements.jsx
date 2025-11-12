import styled from "styled-components";

export const ReWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-in-out;
  background: #fff;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ReviewContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 95%;
  }
`;

export const ReviewHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const ReviewTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-family: "Cairo", sans-serif;
`;

export const ReviewSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  font-family: "Cairo", sans-serif;
`;

export const StarRatingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

export const StarIcon = styled.span`
  font-size: 48px;
  color: ${(props) => (props.filled ? "#fbbc04" : "#E0E0E0")};
  transition: color 0.2s ease;
  text-shadow: ${(props) =>
    props.filled ? "0 2px 4px rgba(255, 215, 0, 0.3)" : "none"};

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export const RatingText = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #fbbc04;
  margin: 0 0 24px 0;
  min-height: 27px;
  font-family: "Cairo", sans-serif;
`;

export const FeedbackSection = styled.div`
  margin-bottom: 24px;
`;

export const FeedbackLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: right;
  font-family: "Cairo", sans-serif;
`;

export const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Cairo", sans-serif;
  resize: vertical;
  transition: border-color 0.3s ease;
  direction: rtl;
  text-align: right;
  background: #fff;
  color: #000;

  &:focus {
    outline: none;
    border-color: #fbbc04;
  }

  &::placeholder {
    color: #999;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #fbbc04;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Cairo", sans-serif;

  &:hover:not(:disabled) {
    background: #ffdd1cff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(75, 144, 242, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Cairo", sans-serif;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
  border: 1px solid #fcc;
  font-family: "Cairo", sans-serif;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;

  .icon {
    width: 80px;
    height: 80px;
    background: #4caf50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 48px;
    color: white;
    animation: successPop 0.5s ease-out;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
    font-family: "Cairo", sans-serif;
  }

  .message {
    font-size: 16px;
    color: #666;
    font-family: "Cairo", sans-serif;
  }

  @keyframes successPop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
