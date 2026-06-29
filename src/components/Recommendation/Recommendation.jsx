// Quiz.jsx
import React, { useState, useEffect, useRef } from "react";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearCart } from "../../redux/cartRedux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Break1 from "../../assets/break1.png";
import Break2 from "../../assets/break2.png";
import Break3 from "../../assets/break3.png";
import Basket from "../../assets/cart.png";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  green: "#234a40",
  greenLight: "#2d5e51",
  greenPale: "#eaf2ef",
  greenBorder: "#c2d9d3",
  text: "#1a1a1a",
  textMuted: "#6b7280",
  bg: "#f9faf8",
  white: "#ffffff",
  cardBorder: "#e2e8e5",
  red: "#dc2626",
};

// ─── GLOBAL ───────────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; }
  *:focus, *:focus-visible, *:focus-within {
    outline: none !important;
    box-shadow: none !important;
  }
`;

// ─── ANIMATIONS ───────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-3px); }
  75%       { transform: translateX(3px); }
`;

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
const Wrapper = styled.div`
  min-height: 100dvh;
  background: ${T.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  direction: rtl;
  font-family: "IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif;
  color: ${T.text};
`;
const Inner = styled.div`
  width: 100%;
  max-width: 780px;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;
const LoadingWrap = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background: ${T.bg};
  color: ${T.textMuted};
  font-family: "IBM Plex Sans Arabic", "Segoe UI", sans-serif;
`;
const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${T.greenBorder};
  border-top-color: ${T.green};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// ─── HEADER ───────────────────────────────────────────────────────────────────
const PageHeader = styled.header`
  width: 100%;
  max-width: 780px;
  padding: 1.1rem 1.25rem 0;
`;
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
const LogoImg = styled.img`
  height: 42px;
  object-fit: contain;
`;
const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${(p) => (p.disabled ? T.cardBorder : T.green)};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  font-family: inherit;
  padding: 0.25rem 0;
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
`;
const BasketWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &.shake {
    animation: ${shake} 0.5s ease-in-out;
  }
`;
const BasketIconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BasketCountBadge = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  background: ${T.red};
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`;
const BasketTotalText = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${T.textMuted};
`;

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
const ProgressTrack = styled.div`
  height: 4px;
  background: ${T.cardBorder};
  border-radius: 9999px;
  overflow: hidden;
`;
const ProgressFill = styled.div`
  height: 100%;
  background: ${T.green};
  border-radius: 9999px;
  width: ${(p) => p.$pct}%;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

// ─── NOTIFICATION ─────────────────────────────────────────────────────────────
const Notif = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${T.green};
  color: #fff;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(35, 74, 64, 0.25);
  z-index: 1000;
  font-size: 0.9rem;
  font-weight: 500;
  animation: ${slideInRight} 0.3s ease;
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    left: 10px;
  }
`;

// ─── STEP WRAP ────────────────────────────────────────────────────────────────
const StepWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 1rem;
  animation: ${fadeUp} 0.35s ease both;
`;
const StepTitle = styled.h1`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.4rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const StepSub = styled.p`
  font-size: 0.95rem;
  color: ${T.textMuted};
  margin-bottom: 1.75rem;
  line-height: 1.5;
`;

// ─── QUIZ ANSWER BUTTONS ──────────────────────────────────────────────────────
const AnsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;
const AnsBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.1rem;
  border: 2px solid ${(p) => (p.$sel ? T.green : T.cardBorder)};
  border-radius: 0.875rem;
  background: ${(p) => (p.$sel ? T.greenPale : T.white)};
  cursor: pointer;
  font-size: 0.975rem;
  font-weight: 500;
  color: ${T.text};
  text-align: right;
  direction: rtl;
  font-family: inherit;
  outline: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`;
const CheckBox = styled.span`
  width: 20px;
  height: 20px;
  border-radius: ${(p) => (p.$round ? "50%" : "5px")};
  border: 2px solid ${(p) => (p.$sel ? T.green : T.cardBorder)};
  background: ${(p) => (p.$sel ? T.green : "transparent")};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s;
  &::after {
    content: ${(p) => (p.$sel ? "'✓'" : "''")};
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
  }
`;
const TextInput = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid ${T.cardBorder};
  border-radius: 0.875rem;
  font-size: 0.975rem;
  background: ${T.white};
  color: ${T.text};
  direction: rtl;
  text-align: right;
  font-family: inherit;
  outline: none;
  &::placeholder {
    color: ${T.textMuted};
  }
`;

// ─── INFO BREAK ───────────────────────────────────────────────────────────────
const InfoCard = styled.div`
  background: ${T.white};
  border: 1px solid ${T.cardBorder};
  border-radius: 1.25rem;
  padding: 1.75rem;
  text-align: right;
  direction: rtl;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;
const InfoCardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${T.green};
  margin-bottom: 1.25rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.2rem;
  }
`;
const InfoCardContent = styled.div`
  color: #333;
  line-height: 1.65;
  p {
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    p {
      margin-bottom: 0.85rem;
      font-size: 0.85rem;
    }
  }
`;
const FactBox = styled.div`
  background: ${T.greenPale};
  border: 1px solid ${T.greenBorder};
  border-right: 4px solid ${T.green};
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-top: 1rem;
  p {
    margin-bottom: 0;
    font-style: italic;
    color: #3d6b5a;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    margin-top: 0rem;
  }
`;
const FactTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${T.green};
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    margin-bottom: 0.25rem;
  }
`;

const InfoImg = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 1.25rem;
  display: block;

  @media (max-width: 480px) {
    margin-top: 0.5rem;
    height: 230px;
  }
`;

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
const ResultTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const ResultLabel = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${T.green};
`;
const CompareBtn = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: ${T.green};
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

// ─── PACKAGES GRID (desktop) ──────────────────────────────────────────────────
const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.875rem;
  direction: rtl;
  @media (max-width: 560px) {
    display: none;
  }
`;

// ─── PACKAGES SLIDER (mobile only) ───────────────────────────────────────────
const SliderOuter = styled.div`
  display: none;
  @media (max-width: 560px) {
    display: block;
    position: relative;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
`;
const SliderTrack = styled.div`
  display: flex;
  flex-direction: row;
  direction: ltr;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 1.5rem 0 1rem;
  gap: 0.75rem;
  &::before,
  &::after {
    content: "";
    flex-shrink: 0;
    width: calc((100% - 75vw) / 2);
  }
`;
const SliderCard = styled.div`
  flex-shrink: 0;
  width: 75vw;
  max-width: 280px;
  scroll-snap-align: center;
  border: 2px solid ${(p) => (p.$selected ? T.green : T.cardBorder)};
  border-radius: 1.25rem;
  background: ${T.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.875rem 1.1rem;
  position: relative;
  cursor: pointer;
  opacity: ${(p) => (p.$selected ? 1 : 0.75)};
  transition:
    opacity 0.25s,
    border-color 0.25s,
    transform 0.25s;
  transform: ${(p) => (p.$selected ? "scale(1)" : "scale(0.96)")};
`;
const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 0.5rem;
`;
const Dot = styled.span`
  width: ${(p) => (p.$active ? "18px" : "6px")};
  height: 6px;
  border-radius: 3px;
  background: ${(p) => (p.$active ? T.green : T.cardBorder)};
  transition:
    width 0.25s,
    background 0.25s;
`;

// ─── SHARED CARD INTERNALS ────────────────────────────────────────────────────
const MostPopularPill = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: ${T.green};
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 999px;
  white-space: nowrap;
  font-family: inherit;
`;
const SelectedMark = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => (p.$visible ? T.green : "transparent")};
  border: 2px solid ${(p) => (p.$visible ? T.green : T.cardBorder)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const SelectedMarkInner = styled.span`
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: ${(p) => (p.$visible ? "block" : "none")};
`;
const PackageImg = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 0.75rem;
`;
const PackageName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${T.text};
  text-align: center;
  margin-bottom: 0.3rem;
`;
const PackageCount = styled.p`
  font-size: 0.82rem;
  color: ${T.textMuted};
  text-align: center;
  margin-bottom: 0.4rem;
`;
const PackagePrice = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${T.text};
  text-align: center;
`;
const PackageCard = styled.div`
  border: 2px solid ${(p) => (p.$selected ? T.green : T.cardBorder)};
  border-radius: 1.25rem;
  background: ${T.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.875rem 1.1rem;
  position: relative;
  cursor: pointer;
`;

// ─── COMPARE / ACCORDION SECTION ──────────────────────────────────────────────
const CompareSection = styled.div`
  margin-top: 1.5rem;
  direction: rtl;
`;
const CompareSub = styled.p`
  font-size: 0.88rem;
  color: ${T.textMuted};
  text-align: center;
  margin-bottom: 1rem;
`;
const AccordionItem = styled.div`
  border: 1px solid ${(p) => (p.$open ? T.green : T.cardBorder)};
  border-radius: 0.875rem;
  margin-bottom: 0.75rem;
  background: ${T.white};
  overflow: hidden;
`;
const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  direction: rtl;
  text-align: right;
`;
const AccordionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
const AccordionName = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${T.text};
`;
const MostPopularTag = styled.span`
  background: ${T.green};
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
`;
const AccordionCount = styled.span`
  font-size: 0.82rem;
  color: ${T.textMuted};
`;
const AccordionChevron = styled.span`
  font-size: 1rem;
  color: ${T.textMuted};
  flex-shrink: 0;
`;
const AccordionBody = styled.div`
  padding: 0 1.1rem 1.1rem;
  border-top: 1px solid ${T.cardBorder};
  direction: rtl;
`;
const AccordionIntro = styled.p`
  font-size: 0.85rem;
  color: ${T.textMuted};
  margin: 0.75rem 0 0.5rem;
  text-align: right;
`;
const MarkerCategory = styled.p`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${T.green};
  margin: 0.75rem 0 0.3rem;
  text-align: right;
`;
const MarkerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem 0.5rem;
`;
const MarkerItem = styled.span`
  font-size: 0.82rem;
  color: ${T.text};
  text-align: right;
  padding: 0.15rem 0;
`;

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
const OrderSummary = styled.div`
  background: ${T.white};
  border: 1px solid ${T.cardBorder};
  border-radius: 1rem;
  padding: 1.25rem;
  margin-top: 1.5rem;
`;
const OrderTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${T.text};
  margin-bottom: 1rem;
`;
const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid ${T.cardBorder};
  &:last-of-type {
    border-bottom: none;
  }
  font-size: 0.9rem;
`;
const OrderTotal = styled.div`
  padding-top: 0.875rem;
  margin-top: 0.875rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${T.green};
  text-align: center;
`;
const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.9rem;
  border: none;
  border-radius: 0.875rem;
  background: ${T.green};
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ─── USER INFO FORM ───────────────────────────────────────────────────────────
const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;
const FieldRow = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.$cols || "1fr"};
  gap: 1rem;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;
const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${T.text};
  text-align: right;
`;
const FormInput = styled.input`
  padding: 0.8rem 1rem;
  border: 1.5px solid ${T.cardBorder};
  border-radius: 0.75rem;
  font-size: 0.95rem;
  background: ${T.white};
  color: ${T.text};
  direction: ${(p) => (p.$ltr ? "ltr" : "rtl")};
  text-align: ${(p) => (p.$ltr ? "left" : "right")};
  font-family: inherit;
  outline: none;
  &::placeholder {
    color: ${T.textMuted};
  }
`;
const PhoneWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border: 1.5px solid ${T.cardBorder};
  border-radius: 0.75rem;
  overflow: hidden;
  background: ${T.white};
`;
const PhonePrefix = styled.span`
  padding: 0.8rem 0.875rem;
  background: ${T.greenPale};
  color: ${T.green};
  font-weight: 700;
  font-size: 0.875rem;
  border-left: 1.5px solid ${T.greenBorder};
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const PhoneInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0.8rem 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  background: transparent;
  color: ${T.text};
  direction: ltr;
  text-align: left;
  &::placeholder {
    color: ${T.textMuted};
  }
`;
const FieldHint = styled.span`
  font-size: 0.72rem;
  color: ${T.textMuted};
  text-align: right;
`;

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = styled.footer`
  width: 100%;
  max-width: 780px;
  padding: 1rem 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;
const ContinueBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.875rem;
  background: ${(p) => (p.disabled ? "#b0c4be" : T.green)};
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  outline: none;
`;
const FooterBackBtn = styled.button`
  background: none;
  border: none;
  color: ${T.textMuted};
  font-size: 0.875rem;
  cursor: pointer;
  font-family: inherit;
`;
const PrivacyNote = styled.p`
  font-size: 0.72rem;
  color: ${T.textMuted};
  text-align: center;
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const questions = [
  {
    id: "sex",
    question: "ما جنسك؟",
    type: "multiple",
    options: ["ذكر", "أنثى"],
  },
  {
    id: "weight",
    question: "بماذا يمكننا مساعدتك؟",
    type: "multiple",
    options: [
      "المساعدة في تحسين القلب والأوعية الدموية",
      "المساعدة في كسب العضلات",
      "المساعدة في فقدان الوزن",
      "المساعدة في كسب الوزن",
    ],
  },
  {
    id: "pastVitamins",
    question: "ما مستوى نشاطك الحالي؟",
    type: "multiple",
    options: [
      "أنا نشط جداً",
      "أنا نشط بشكل معتدل",
      "أنا لست نشطاً جداً",
      "أنا خامل",
    ],
  },
  {
    id: "currentSupplements",
    question: "ما مدى دافعيتك لإجراء تغييرات لتحقيق أهدافك؟",
    type: "multiple",
    options: ["أنا متحمس", "أنا مهتم", "أنا حذر", "أنا لست مستعد"],
  },
  {
    id: "familiarity",
    question: "ما مدى معرفتك بالفيتامينات والمكملات الغذائية؟",
    type: "multiple",
    options: [
      "غير مألوف على الإطلاق",
      "مألوف قليلاً",
      "مألوف بشكل معتدل",
      "مألوف جداً",
    ],
  },
  {
    id: "powders",
    question:
      "هل تستخدم أي مساحيق تكميلية (مثل مخفوقات البروتين أو خلطات المشروبات)؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
  {
    id: "healthGoals",
    question: "أي المجالات تود الحصول على دعم أكثر فيها؟",
    type: "multiple",
    options: [
      "المساءلة",
      "نظام غذائي للإقصاء",
      "التمارين الرياضية",
      "الطب الوظيفي",
      "الأكل البديهي",
      "فحوصات المختبر",
      "التخطيط للوجبات",
      "المغذيات الكبرى الشخصية",
      "العلاقة مع الطعام",
      "النوم",
    ],
    multiSelect: true,
  },
  {
    id: "exerciseTypes",
    question: "ما أنواع التمارين التي تمارسها عادة؟",
    type: "multiple",
    options: [
      "تمارين القلب",
      "تمارين القوة",
      "اليوغا",
      "تمارين عالية الكثافة",
      "أخرى / لا توجد تمارين",
    ],
    multiSelect: true,
  },
  {
    id: "stressLevel",
    question: "كيف تقيم مستوى التوتر المعتاد لديك؟",
    type: "multiple",
    options: ["منخفض", "معتدل", "عالي"],
  },
  {
    id: "sleepHours",
    question: "كم ساعة من النوم تحصل عليها عادة في الليلة؟",
    type: "multiple",
    options: [
      "أقل من 5 ساعات",
      "5-6 ساعات",
      "6-7 ساعات",
      "7-8 ساعات",
      "8+ ساعات",
    ],
  },
  {
    id: "energyLevels",
    question: "كيف تصف مستويات الطاقة اليومية لديك؟",
    type: "multiple",
    options: ["غالباً متعب", "بعض التقلبات", "نشيط بشكل عام"],
  },
  {
    id: "digestiveDiscomfort",
    question: "كم مرة تعاني من عدم الراحة الهضمية (مثل الانتفاخ أو عسر الهضم)؟",
    type: "multiple",
    options: ["نادراً", "أحياناً", "بكثرة"],
  },
  {
    id: "getSick",
    question: "كم مرة تميل للإصابة بالمرض (مثل نزلات البرد في السنة)؟",
    type: "multiple",
    options: ["نادراً (0-1)", "أحياناً (2-3)", "غالباً (4+)"],
  },
  {
    id: "heartConcerns",
    question: "هل لديك أي مخاوف محددة بشأن صحة القلب؟",
    type: "multiple",
    options: [
      "لا توجد",
      "ضغط دم مرتفع",
      "كوليسترول مرتفع",
      "مخاوف أخرى بشأن القلب",
    ],
  },
  {
    id: "focusMemory",
    question: "هل تعاني من صعوبة في التركيز أو الذاكرة؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
  {
    id: "fruitVeggies",
    question: "كم حصة من الفواكه والخضروات تأكل في معظم الأيام؟",
    type: "multiple",
    options: ["0-1", "2-3", "4-5", "6+"],
  },
  {
    id: "fermentedFoods",
    question:
      "كم مرة تأكل الأطعمة المتخمرة (مثل الزبادي أو الكمبوتشا أو الكيمتشي)؟",
    type: "multiple",
    options: ["يومياً", "عدة مرات في الأسبوع", "نادراً", "أبداً"],
  },
  {
    id: "fiber",
    question: "هل تقول أنك تحصل على ما يكفي من الألياف في نظامك الغذائي؟",
    type: "multiple",
    options: ["قليل", "كافي", "عالي"],
  },
  {
    id: "dietPattern",
    question: "هل تتبع أي نظام غذائي أو نمط غذائي معين؟",
    type: "multiple",
    options: [
      "لا توجد",
      "نباتي",
      "نباتي (لا يأكل اللحوم)",
      "باليو",
      "خالي من الغلوتين/سيلياك",
      "أخرى",
    ],
  },
  {
    id: "allergies",
    question: "هل لديك أي حساسية أو حساسيات غذائية؟",
    type: "multiple",
    options: [
      "لا توجد",
      "الألبان",
      "الصويا",
      "الغلوتين",
      "المحار",
      "الرجيد",
      "أخرى",
    ],
    multiSelect: true,
  },
  {
    id: "smoke",
    question: "هل تدخن؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
];

const infoBreaks = [
  {
    title: "العلم الجديد للعمر الطويل",
    content:
      "الطول العمري ليس مجرد وراثة — فالأبحاث تُظهر أن 80٪ من عوامل الشيخوخة تحت سيطرتنا. العلماء اليوم يميّزون بين العمر الزمني والعمر البيولوجي، وكثيرون منا يحملون أجسادًا أصغر أو أكبر بسنوات من أعمارهم الحقيقية.",
    fact: "دراسة نشرتها جامعة هارفارد تتبّعت أكثر من 100,000 شخص لمدة 30 عامًا، ووجدت أن خمسة أنماط سلوكية صحية تُطيل العمر بمعدل ١٢ الى ١٤ سنة إضافية.",
    img: Break1,
  },
  {
    title: "النوم: سلاحك الأقوى ضد الشيخوخة",
    content:
      "خلال النوم العميق، يُفرز الجسم هرمون النمو الذي يُصلح الخلايا التالفة ويُعيد بناءها. قلة النوم ترفع مستويات الكورتيزول والالتهاب، وهما من أبرز محركات الشيخوخة.",
    fact: "الأشخاص الذين ينامون أقل من 6 ساعات ليلياً بانتظام يُظهرون علامات شيخوخة خلوية تعادل أعمارًا تزيد بـ 5-7 سنوات عن نظرائهم الذين ينامون 7-8 ساعات.",
    img: Break2,
  },
  {
    title: "الالتهاب الصامت: العدو الخفي",
    content:
      "الالتهاب المزمن المنخفض الدرجة — الذي لا تشعر به — هو الرابط المشترك بين معظم أمراض الشيخوخة: القلب، السكري، الزهايمر، والسرطان. مراقبة مؤشرات الالتهاب في الدم خطوة أساسية لاكتشافه مبكرًا.",
    fact: "تشير الأبحاث إلى أن خفض مستويات البروتين التفاعلي عالي الحساسية (hsCRP) إلى أقل من 1 ملغ/لتر يرتبط بانخفاض خطر الوفاة المبكرة بنسبة تصل إلى 35٪.",
    img: Break3,
  },
];

// ─── STATIC PACKAGES — always shown regardless of quiz answers ────────────────
const STATIC_PRODUCTS = [
  {
    _id: "pkg-basic",
    tier: "basic",
    name: "الأساسية",
    analysisCount: 37,
    price: 720,
    img: "https://alsallum.s3.eu-north-1.amazonaws.com/labs.png",
    inStock: true,
    category: "annual-checkup",
    mostPopular: false,
  },
  {
    _id: "pkg-plus",
    tier: "plus",
    name: "الشاملة",
    analysisCount: 43,
    price: 1200,
    img: "https://alsallum.s3.eu-north-1.amazonaws.com/labs.png",
    inStock: true,
    category: "annual-checkup",
    mostPopular: true,
  },
  {
    _id: "pkg-premium",
    tier: "premium",
    name: "المتقدمة",
    analysisCount: 51,
    price: 2700,
    img: "https://alsallum.s3.eu-north-1.amazonaws.com/labs.png",
    inStock: true,
    category: "annual-checkup",
    mostPopular: false,
  },
];

// ─── COMPARE TIERS ────────────────────────────────────────────────────────────
const COMPARE_TIERS = [
  {
    id: "basic",
    name: "الأساسية",
    count: 37,
    mostPopular: false,
    intro: null,
    categories: [
      {
        title: "صحة القلب والأوعية",
        items: [
          "الكوليسترول الكلي",
          "LDL",
          "HDL",
          "الدهون الثلاثية",
          "ضغط الدم",
        ],
      },
      {
        title: "صحة الكبد",
        items: ["AST", "ALT", "GGT", "البيليروبين الكلي"],
      },
      {
        title: "صحة الكلى",
        items: [
          "الكرياتينين",
          "اليوريا",
          "حمض اليوريك",
          "الصوديوم",
          "البوتاسيوم",
        ],
      },
      {
        title: "صورة الدم الكاملة",
        items: [
          "خلايا الدم الحمراء",
          "خلايا الدم البيضاء",
          "الهيموغلوبين",
          "الصفائح الدموية",
        ],
      },
    ],
  },
  {
    id: "plus",
    name: "الشاملة",
    count: 43,
    mostPopular: true,
    intro: "إضافةً إلى كل مؤشرات الباقة الأساسية:",
    categories: [
      {
        title: "الغدة الدرقية",
        items: ["TSH", "T3 الحر", "T4 الحر"],
      },
      {
        title: "الفيتامينات والمعادن",
        items: [
          "فيتامين د",
          "فيتامين ب12",
          "الحديد",
          "الفيريتين",
          "المغنيسيوم",
        ],
      },
      {
        title: "السكري والأيض",
        items: ["الجلوكوز الصائم", "HbA1c", "الأنسولين"],
      },
    ],
  },
  {
    id: "premium",
    name: "المتقدمة",
    count: 51,
    mostPopular: false,
    intro: "إضافةً إلى كل مؤشرات الباقة الشاملة:",
    categories: [
      {
        title: "صحة القلب المتقدمة",
        items: ["ليبوبروتين (أ)", "أبوليبوبروتين ب", "hsCRP"],
      },
      {
        title: "المعادن الثقيلة",
        items: ["الرصاص في الدم", "الزئبق في الدم"],
      },
      {
        title: "هرمونات الغدة الدرقية",
        items: [
          "الأجسام المضادة للبيروكسيداز الدرقي",
          "الأجسام المضادة للثيروغلوبولين",
        ],
      },
      {
        title: "الهرمونات",
        items: ["الهرمون اللوتيني", "الهرمون المنبه للجريب", "التستوستيرون"],
      },
    ],
  },
];

// ─── PACKAGE CARD CONTENT (shared between grid & slider) ─────────────────────
const PackageCardContent = ({ product, isSelected }) => (
  <>
    {product.mostPopular && <MostPopularPill>الأكثر اختياراً</MostPopularPill>}
    <SelectedMark $visible={isSelected}>
      <SelectedMarkInner $visible={isSelected}>✓</SelectedMarkInner>
    </SelectedMark>
    <PackageImg
      src={product.img || "https://via.placeholder.com/150"}
      alt={product.name}
    />
    <PackageName>{product.name}</PackageName>
    <PackageCount>{product.analysisCount} تحليلاً</PackageCount>
    <PackagePrice>{product.price.toLocaleString("ar-SA")} ر.س.</PackagePrice>
  </>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Recommendation = () => {
  const buttonRef = useRef();
  const dobRef = useRef();
  const sliderRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flowStep, setFlowStep] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentBreak, setCurrentBreak] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedSingleAnswer, setSelectedSingleAnswer] = useState("");
  const [textInput, setTextInput] = useState("");

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    dob: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  // Products are always the same 3 static tiers — no dynamic fetching
  const products = STATIC_PRODUCTS;
  const [selectedProductId, setSelectedProductId] = useState(
    STATIC_PRODUCTS.find((p) => p.mostPopular)?._id ?? null,
  );

  const [sliderActiveIdx, setSliderActiveIdx] = useState(1); // default: middle = "الشاملة"
  const [showCompare, setShowCompare] = useState(false);
  const [openTiers, setOpenTiers] = useState({});
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [notif, setNotif] = useState("");
  const [shakeBasket, setShakeBasket] = useState(false);

  const basketItems = useSelector((state) => state.cart?.products || []);
  const basketTotal = useSelector((state) => state.cart?.total || 0);
  const basketCount = basketItems.reduce((t, i) => t + (i.quantity || 0), 0);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Scroll slider to centre card (index 1 = "الشاملة") when result screen mounts
  useEffect(() => {
    if (flowStep === "result" && sliderRef.current) {
      requestAnimationFrame(() => {
        const track = sliderRef.current;
        if (!track) return;
        const cards = track.querySelectorAll("[data-slider-card]");
        if (cards[1]) {
          const cardLeft = cards[1].offsetLeft;
          const cardWidth = cards[1].offsetWidth;
          const trackWidth = track.offsetWidth;
          track.scrollLeft = cardLeft - (trackWidth - cardWidth) / 2;
        }
      });
    }
  }, [flowStep]);

  const handleSliderScroll = () => {
    const track = sliderRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("[data-slider-card]");
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0,
      closestDist = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(
        card.offsetLeft + card.offsetWidth / 2 - trackCenter,
      );
      if (dist < closestDist) {
        closestDist = dist;
        closest = idx;
      }
    });
    setSliderActiveIdx(closest);
  };

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(""), 3000);
  };

  const totalQuizSteps = questions.length;
  const progressPct = (() => {
    if (flowStep === "intro") return 0;
    if (flowStep === "result") return 100;
    if (flowStep === "userInfo") return 90;
    return (Object.keys(answers).length / totalQuizSteps) * 85;
  })();

  const currentQ = questions[currentQuestion];
  const isMultiSelect = currentQ?.multiSelect;
  const isTextInput = currentQ?.type === "text";

  const canContinue = () => {
    if (flowStep === "intro" || flowStep === "breakInfo") return true;
    if (flowStep === "quiz") {
      if (isTextInput) return textInput.trim().length > 0;
      if (isMultiSelect) return selectedAnswers.length > 0;
      return selectedSingleAnswer !== "";
    }
    if (flowStep === "userInfo") {
      return (
        userInfo.firstName.trim() &&
        userInfo.lastName.trim() &&
        userInfo.email.trim() &&
        userInfo.phone.trim() &&
        userInfo.idNumber.trim() &&
        userInfo.dob.trim() &&
        userInfo.city.trim()
      );
    }
    return false;
  };

  const canGoBack = () => {
    if (flowStep === "intro" || flowStep === "result") return false;
    return true;
  };

  const goBack = () => {
    if (flowStep === "userInfo" || flowStep === "breakInfo") {
      setFlowStep("quiz");
      return;
    }
    if (flowStep === "quiz") {
      if (currentQuestion === 0) {
        setFlowStep("intro");
        return;
      }
      const prevIdx = currentQuestion - 1;
      setCurrentQuestion(prevIdx);
      const prevQ = questions[prevIdx];
      const saved = answers[prevQ.id];
      if (saved) {
        if (prevQ.multiSelect) setSelectedAnswers(saved);
        else if (prevQ.type === "text") setTextInput(saved);
        else setSelectedSingleAnswer(saved);
      } else {
        setSelectedAnswers([]);
        setSelectedSingleAnswer("");
        setTextInput("");
      }
    }
  };

  const handleContinue = () => {
    if (flowStep === "intro") {
      setFlowStep("quiz");
      return;
    }
    if (flowStep === "breakInfo") {
      setFlowStep("quiz");
      return;
    }
    if (flowStep === "userInfo") {
      // Brief loading animation, then show the static packages
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFlowStep("result");
      }, 1200);
      return;
    }
    if (flowStep === "quiz") {
      let newAnswers;
      if (isTextInput) {
        if (!textInput.trim()) return;
        newAnswers = { ...answers, [currentQ.id]: textInput };
      } else if (isMultiSelect) {
        if (selectedAnswers.length === 0) return;
        newAnswers = { ...answers, [currentQ.id]: selectedAnswers };
      } else {
        if (!selectedSingleAnswer) return;
        newAnswers = { ...answers, [currentQ.id]: selectedSingleAnswer };
      }
      setAnswers(newAnswers);
      setSelectedAnswers([]);
      setSelectedSingleAnswer("");
      setTextInput("");
      const nextQ = currentQuestion + 1;
      if (nextQ >= questions.length) {
        setFlowStep("userInfo");
        return;
      }
      const shouldBreak = nextQ % 3 === 0 && nextQ < questions.length;
      if (shouldBreak) {
        const breakIdx = Math.floor((nextQ - 1) / 3);
        if (breakIdx < infoBreaks.length) {
          setCurrentBreak(breakIdx);
          setFlowStep("breakInfo");
          setCurrentQuestion(nextQ);
          return;
        }
      }
      setCurrentQuestion(nextQ);
    }
  };

  const handleSingleAnswer = (opt) => {
    buttonRef.current?.blur();
    setSelectedSingleAnswer(opt);
  };
  const handleMultiToggle = (opt) => {
    buttonRef.current?.blur();
    setSelectedAnswers((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt],
    );
  };

  const handleSelectProduct = (product) => {
    setSelectedProductId(product._id);
    dispatch(clearCart());
    dispatch(addProduct({ ...product, quantity: 1 }));
    showNotif(`تم اختيار "${product.name}"`);
    setShakeBasket(true);
    setTimeout(() => setShakeBasket(false), 2500);
  };

  const toggleCompareTier = (tierId) => {
    setOpenTiers((prev) => (prev[tierId] ? {} : { [tierId]: true }));
  };

  const submitOrder = async () => {
    if (!selectedProductId) {
      showNotif("يرجى اختيار باقة أولاً");
      return;
    }
    setOrderSubmitting(true);
    try {
      const selectedProduct = products.find((p) => p._id === selectedProductId);
      const orderData = {
        patientData: {
          answers,
          userInfo,
          timestamp: new Date().toISOString(),
          questionnaireCompleted: true,
        },
        products: selectedProduct
          ? [
              {
                productId: selectedProduct._id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
                category: selectedProduct.category,
              },
            ]
          : [],
        orderSummary: {
          totalItems: 1,
          totalAmount: selectedProduct?.price || 0,
          currency: "SAR",
        },
        orderDate: new Date().toISOString(),
        status: "pending",
      };
      const res = await publicRequest.post("/orders", orderData);
      if (res.data) {
        showNotif("تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.");
        setTimeout(
          () =>
            navigate("/outcome", {
              state: { orderId: res.data._id, orderData },
            }),
          2000,
        );
      }
    } catch (err) {
      console.error(err);
      showNotif("حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  if (loading)
    return (
      <LoadingWrap>
        <Spinner />
        <span>جارٍ تحليل إجاباتك...</span>
      </LoadingWrap>
    );

  const showFooter = flowStep !== "result";
  const selectedProduct = products.find((p) => p._id === selectedProductId);

  // Desktop RTL grid: show [premium, plus, basic] left-to-right visually = right-to-left in RTL
  const displayProducts = [...products].reverse();
  // Slider: [basic(0), plus(1), premium(2)] — plus is centre
  const sliderProducts = [...products];

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {notif && <Notif>{notif}</Notif>}

        <PageHeader>
          <HeaderRow>
            <BackBtn
              disabled={!canGoBack()}
              onClick={canGoBack() ? goBack : undefined}
            >
              رجوع
            </BackBtn>
            <LogoImg src={Logo} alt="Logo" />
            <BasketWrap className={shakeBasket ? "shake" : ""}>
              <BasketIconWrap>
                <img
                  src={Basket}
                  alt="cart"
                  style={{ width: 24, height: 24 }}
                />
                {basketCount > 0 && (
                  <BasketCountBadge>
                    {basketCount > 99 ? "99+" : basketCount}
                  </BasketCountBadge>
                )}
              </BasketIconWrap>
              {basketCount > 0 && (
                <BasketTotalText>ريال {basketTotal.toFixed(2)}</BasketTotalText>
              )}
            </BasketWrap>
          </HeaderRow>
          <ProgressTrack>
            <ProgressFill $pct={progressPct} />
          </ProgressTrack>
        </PageHeader>

        <Inner>
          {/* INTRO */}
          {flowStep === "intro" && (
            <StepWrap key="intro">
              <StepTitle>استكشف خطط فقدان الوزن.</StepTitle>
              <StepSub>
                تعرّف على خيارات العلاج بناءً على أهدافك وعاداتك وتاريخك الصحي.
              </StepSub>
            </StepWrap>
          )}

          {/* QUIZ */}
          {flowStep === "quiz" && currentQ && (
            <StepWrap key={`q-${currentQuestion}`}>
              <StepTitle>{currentQ.question}</StepTitle>
              {isTextInput ? (
                <TextInput
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="أدخل إجابتك..."
                />
              ) : (
                <AnsGrid>
                  {currentQ.options.map((opt, i) => {
                    const sel = isMultiSelect
                      ? selectedAnswers.includes(opt)
                      : selectedSingleAnswer === opt;
                    return (
                      <AnsBtn
                        key={i}
                        ref={buttonRef}
                        $sel={sel}
                        onClick={() =>
                          isMultiSelect
                            ? handleMultiToggle(opt)
                            : handleSingleAnswer(opt)
                        }
                      >
                        <span>{opt}</span>
                        <CheckBox $sel={sel} $round={!isMultiSelect} />
                      </AnsBtn>
                    );
                  })}
                </AnsGrid>
              )}
            </StepWrap>
          )}

          {/* BREAK INFO */}
          {flowStep === "breakInfo" && (
            <StepWrap key={`break-${currentBreak}`}>
              <InfoCard>
                <InfoCardTitle>{infoBreaks[currentBreak].title}</InfoCardTitle>
                <InfoCardContent>
                  <p>{infoBreaks[currentBreak].content}</p>
                  <FactBox>
                    <FactTitle>هل تعلم؟</FactTitle>
                    <p>{infoBreaks[currentBreak].fact}</p>
                  </FactBox>
                </InfoCardContent>
                <InfoImg
                  src={infoBreaks[currentBreak].img}
                  alt={infoBreaks[currentBreak].title}
                />
              </InfoCard>
            </StepWrap>
          )}

          {/* USER INFO */}
          {flowStep === "userInfo" && (
            <StepWrap key="userInfo">
              <StepTitle>بياناتك</StepTitle>
              <StepSub>نحتاجها لتجهيز خطتك الصحية وطلب فحصك للمختبر</StepSub>
              <InfoForm>
                <FieldRow $cols="1fr 1fr">
                  <Field>
                    <Label>الاسم الأول</Label>
                    <FormInput
                      type="text"
                      placeholder="محمد"
                      value={userInfo.firstName}
                      onChange={(e) =>
                        setUserInfo((p) => ({
                          ...p,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <Field>
                    <Label>اسم العائلة</Label>
                    <FormInput
                      type="text"
                      placeholder="العتيبي"
                      value={userInfo.lastName}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, lastName: e.target.value }))
                      }
                    />
                  </Field>
                </FieldRow>
                <Field>
                  <Label>البريد الإلكتروني</Label>
                  <FormInput
                    $ltr
                    type="email"
                    placeholder="name@example.com"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </Field>
                <Field>
                  <Label>رقم الجوال</Label>
                  <PhoneWrap>
                    <PhoneInput
                      type="tel"
                      placeholder="5XXXXXXXX"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                    <PhonePrefix>+966</PhonePrefix>
                  </PhoneWrap>
                </Field>
                <FieldRow $cols="1fr 1fr">
                  <Field>
                    <Label>تاريخ الميلاد</Label>
                    <FormInput
                      $ltr
                      type="date"
                      ref={dobRef}
                      value={userInfo.dob}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, dob: e.target.value }))
                      }
                      onClick={() => dobRef.current?.showPicker?.()}
                      style={{ cursor: "pointer" }}
                    />
                  </Field>
                  <Field>
                    <Label>رقم الهوية أو الإقامة</Label>
                    <FormInput
                      $ltr
                      type="text"
                      placeholder="1XXXXXXXXX"
                      value={userInfo.idNumber}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, idNumber: e.target.value }))
                      }
                    />
                    <FieldHint>
                      10 أرقام، يبدأ بـ 1 أو 2، يطلبه المختبر للتحليل
                    </FieldHint>
                  </Field>
                </FieldRow>
                <Field>
                  <Label>مدينتك</Label>
                  <FormInput
                    type="text"
                    placeholder="اختر مدينتك"
                    value={userInfo.city}
                    onChange={(e) =>
                      setUserInfo((p) => ({ ...p, city: e.target.value }))
                    }
                  />
                </Field>
              </InfoForm>
            </StepWrap>
          )}

          {/* RESULT */}
          {flowStep === "result" && (
            <StepWrap key="result">
              <ResultTopRow>
                <ResultLabel>اختر باقة الفحص السنوي</ResultLabel>
                <CompareBtn onClick={() => setShowCompare((v) => !v)}>
                  {showCompare ? "اخفاء المقارنات" : "قارن الباقات"}
                </CompareBtn>
              </ResultTopRow>

              <StepSub style={{ marginBottom: "1rem" }}>
                باقات شاملة للفحوصات السنوية — اختر ما يناسب احتياجاتك الصحية
              </StepSub>

              {/* Desktop grid */}
              <PackagesGrid>
                {displayProducts.map((product) => {
                  const isSelected = selectedProductId === product._id;
                  return (
                    <PackageCard
                      key={product._id}
                      $selected={isSelected}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <PackageCardContent
                        product={product}
                        isSelected={isSelected}
                      />
                    </PackageCard>
                  );
                })}
              </PackagesGrid>

              {/* Mobile slider */}
              <SliderOuter>
                <SliderTrack ref={sliderRef} onScroll={handleSliderScroll}>
                  {sliderProducts.map((product) => {
                    const isSelected = selectedProductId === product._id;
                    return (
                      <SliderCard
                        key={product._id}
                        data-slider-card
                        $selected={isSelected}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <PackageCardContent
                          product={product}
                          isSelected={isSelected}
                        />
                      </SliderCard>
                    );
                  })}
                </SliderTrack>
                <SliderDots>
                  {sliderProducts.map((_, idx) => (
                    <Dot key={idx} $active={sliderActiveIdx === idx} />
                  ))}
                </SliderDots>
              </SliderOuter>

              {/* Compare accordion */}
              {showCompare && (
                <CompareSection>
                  <CompareSub>
                    كل باقة تشمل كل مؤشرات الباقة قبلها وتزيد عليها
                  </CompareSub>
                  {COMPARE_TIERS.map((tier) => {
                    const isOpen = !!openTiers[tier.id];
                    return (
                      <AccordionItem key={tier.id} $open={isOpen}>
                        <AccordionHeader
                          onClick={() => toggleCompareTier(tier.id)}
                        >
                          <AccordionChevron>
                            {isOpen ? "∧" : "∨"}
                          </AccordionChevron>
                          <AccordionRight>
                            <AccordionCount>{tier.count} مؤشراً</AccordionCount>
                            {tier.mostPopular && (
                              <MostPopularTag>الأكثر اختياراً</MostPopularTag>
                            )}
                            <AccordionName>{tier.name}</AccordionName>
                          </AccordionRight>
                        </AccordionHeader>
                        {isOpen && (
                          <AccordionBody>
                            {tier.intro && (
                              <AccordionIntro>{tier.intro}</AccordionIntro>
                            )}
                            {tier.categories.map((cat, ci) => (
                              <div key={ci}>
                                <MarkerCategory>{cat.title}</MarkerCategory>
                                <MarkerRow>
                                  {cat.items.map((item, ii) => (
                                    <MarkerItem key={ii}>{item}</MarkerItem>
                                  ))}
                                </MarkerRow>
                              </div>
                            ))}
                          </AccordionBody>
                        )}
                      </AccordionItem>
                    );
                  })}
                </CompareSection>
              )}

              {/* Order summary */}
              {selectedProduct && (
                <OrderSummary>
                  <OrderTitle>ملخص الطلب</OrderTitle>
                  <OrderItem>
                    <span style={{ color: T.textMuted, fontSize: "0.875rem" }}>
                      {selectedProduct.analysisCount} تحليلاً
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {selectedProduct.name}
                    </span>
                  </OrderItem>
                  <OrderTotal>
                    الإجمالي: {selectedProduct.price.toLocaleString("ar-SA")}{" "}
                    ر.س.
                  </OrderTotal>
                  <SubmitBtn onClick={submitOrder} disabled={orderSubmitting}>
                    {orderSubmitting ? "جارٍ إرسال الطلب..." : "إرسال الطلب"}
                  </SubmitBtn>
                </OrderSummary>
              )}
            </StepWrap>
          )}
        </Inner>

        {/* FOOTER */}
        {showFooter && (
          <Footer>
            <ContinueBtn disabled={!canContinue()} onClick={handleContinue}>
              {flowStep === "userInfo" ? "عرض التوصيات" : "متابعة"}
            </ContinueBtn>
            {flowStep !== "intro" && (
              <FooterBackBtn onClick={goBack}>رجوع</FooterBackBtn>
            )}
            <PrivacyNote>جميع المعلومات التي تشاركها آمنة وسرية.</PrivacyNote>
          </Footer>
        )}
      </Wrapper>
    </>
  );
};

export default Recommendation;
