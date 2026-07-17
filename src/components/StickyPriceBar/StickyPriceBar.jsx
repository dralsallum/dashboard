import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StickyPriceBar = ({
  price = "299 ر.س",
  description = "فحص، تحليل، ٥٠٠+ مؤشراً حيوياً",
  buttonText = "ابدأ فحصك",
  onButtonClick,
  showAfter = 400, // px scrolled before the bar appears
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate("/waitlist");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  return (
    <Wrapper dir="rtl" $visible={visible} aria-hidden={!visible}>
      <Inner>
        <Button type="button" onClick={handleClick}>
          {buttonText}
        </Button>

        <TextBlock>
          <Description>{description}</Description>
          <Price>{price}</Price>
        </TextBlock>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: #fffffff2;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
  transition:
    transform 280ms ease,
    opacity 280ms ease;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  transform: translateY(${(props) => (props.$visible ? "0" : "100%")});
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  @media (max-width: 480px) {
    display: block;
  }
`;

const Inner = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`;

const Button = styled.button`
  flex-shrink: 0;
  background-color: #2d5a4e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.4;
`;

const Description = styled.span`
  color: #526660;
  font-size: 12px;
`;

const Price = styled.span`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

export default StickyPriceBar;
