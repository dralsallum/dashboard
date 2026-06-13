import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import headerImage from "../../assets/header.png";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Arabic:wght@700&family=Noto+Sans+Arabic:wght@400;700&display=swap');
`;

/* ─── Layout ─────────────────────────────────────────────────────────────── */

const Section = styled.section`
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0ece4;
  min-height: 420px;
  overflow: hidden;
  font-family: "Noto Sans Arabic", "Segoe UI", Arial, sans-serif;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 40px 24px;
  }
`;

/* ─── Left (text) side — visually right in LTR, but text-start in RTL ────── */

const TextBlock = styled.div`
  flex: 1;
  max-width: 560px;
  padding-right: 80px;
  padding-left: 0;
  z-index: 1;

  @media (max-width: 768px) {
    padding-right: 0;
    max-width: 100%;
    text-align: right;
  }
`;

const Headline = styled.h1`
  font-family: "Noto Serif Arabic", Georgia, serif;
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  font-weight: 700;
  line-height: 1.12;
  color: #0478ff;
  margin: 0 0 24px;
  letter-spacing: -0.5px;
`;

const SubText = styled.p`
  font-size: 1.05rem;
  color: #2d2d2d;
  margin: 0 0 36px;
  line-height: 1.6;
  max-width: 460px;

  strong {
    font-weight: 700;
    color: #2d2d2d;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: #1a5c4a;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 36px;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
  letter-spacing: 0.2px;

  &:hover {
    background-color: #174d3e;
  }
`;

const FooterLinks = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLink = styled.a`
  font-size: 0.9rem;
  color: #2d2d2d;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;

  &:hover {
    color: #1a6aba;
  }
`;

/* ─── Right (image) side — visually left in LTR, but end in RTL ─────────── */

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 280px;
    margin-bottom: 32px;
  }
`;

const PersonImage = styled.img`
  position: relative;
  z-index: 1;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 0;
  display: block;
  transform: scaleX(-1);
`;

/* ─── Component ──────────────────────────────────────────────────────────── */

const Onemedical = () => {
  return (
    <>
      <GlobalStyle />
      <Section>
        {/* Text block — appears on the right visually in RTL */}
        <TextBlock>
          <Headline>الرعاية الصحية الشاملة أصبحت أقل إيلامًا</Headline>

          <SubText>
            يمكن لأعضاء <strong>Amazon Prime</strong> الآن الاشتراك في One
            Medical بسعر <strong>99 دولارًا / السنة</strong>.
          </SubText>

          <CTAButton href="#">ابدأ الآن</CTAButton>

          <FooterLinks>
            <FooterLink href="#">*تطبق شروط الشراء.</FooterLink>
            <FooterLink href="#">
              هل أنت عضو في One Medical؟ اتبع هذه الخطوات لتطبيق توفيرات Amazon
              Prime.
            </FooterLink>
            <FooterLink href="#">
              هل لديك عضوية برعاية الشركة؟ انقر هنا.
            </FooterLink>
          </FooterLinks>
        </TextBlock>

        {/* Image block — appears on the left visually in RTL */}
        <ImageWrapper>
          <PersonImage src={headerImage} alt="شخص يمسك هاتفًا ذكيًا" />
        </ImageWrapper>
      </Section>
    </>
  );
};

export default Onemedical;
