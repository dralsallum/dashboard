import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Avatar from "../../assets/avatar.png";

const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const bubbleAppear = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 999999;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 15px;
  animation: ${slideUp} 0.6s ease-out;
  direction: rtl;
`;

const SpeechBubble = styled.div`
  background-color: white;
  border: 2px solid rgb(77 79 70);
  border-radius: 16px;
  padding: 16px 20px;
  max-width: 280px;
  position: relative;
  box-shadow: 4px 4px 0px rgb(77 79 70 / 0.2);
  animation: ${bubbleAppear} 0.4s ease-out 0.3s backwards;

  &::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: -12px; /* Changed from right to left */
    width: 0;
    height: 0;
    border-right: 12px solid white; /* Changed from border-left to border-right */
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 15px;
    left: -16px; /* Changed from right to left */
    width: 0;
    height: 0;
    border-right: 14px solid rgb(77 79 70); /* Changed from border-left to border-right */
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
  }
`;

const BubbleText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgb(77 79 70);
  font-weight: 500;
  font-family: "Cairo", "Tajawal", sans-serif;
  text-align: right;
`;

const CharacterContainer = styled.div`
  position: relative;
  animation: ${bounce} 2s ease-in-out infinite;
  animation-delay: 0.8s;
`;

const Character = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgb(255 230 109);
  border: 3px solid rgb(77 79 70);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 4px 4px 0px rgb(77 79 70 / 0.2);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
const CharacterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgb(77 79 70);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(50 52 45);
  }
`;

const CharacterPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "👋 مرحباً! انقر على أي أيقونة لاستكشاف ميزاتنا!",
    "✨ اسحب وأفلت الأيقونات لتنظيم سطح المكتب!",
    "📚 تفقد الوثائق والموارد على اليسار!",
    "💡 تحتاج مساعدة؟ انقر على 'اطرح سؤالاً' أو 'تحدث مع موظف'!",
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible, messages.length]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCharacterClick = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
  };

  if (!isVisible) return null;

  return (
    <PopupWrapper>
      <CharacterContainer>
        <CloseButton onClick={handleClose}>×</CloseButton>
        <Character onClick={handleCharacterClick}>
          <CharacterImg src={Avatar} alt="" />
        </Character>
      </CharacterContainer>
      <SpeechBubble>
        <BubbleText>{messages[currentMessageIndex]}</BubbleText>
      </SpeechBubble>
    </PopupWrapper>
  );
};

export default CharacterPopup;
