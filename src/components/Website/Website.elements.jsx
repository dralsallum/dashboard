import styled, { keyframes, css } from "styled-components";
export const Increase = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  direction: rtl;
  color: #444;
  background: #f7f2e6;
  font-size: 1.2rem;
  font-weight: 600;
  min-height: 100dvh;
`;

export const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(246, 224, 94, 0.2);
  border-radius: 4px;
  overflow: hidden;

  position: relative;
`;

export const LoadingSp = styled.span`
  margin-bottom: 12px;
`;

export const LoadingBarFill = styled.div`
  height: 100%;
  background-color: #f6e05e;
  border-radius: 4px;
  animation: ${Increase} 3s ease-out forwards;
  width: 0%;
`;

/* ---------- لوحة الألوان ---------- */
export const C = {
  cream: "#F7F2E6",
  yellow: "#F6E05E",
  yellowBorder: "#F2CF5C",
  ink900: "#111827",
  ink700: "#374151",
  ink600: "#4B5563",
  ink500: "#6B7280",
  ink400: "#9CA3AF",
  line: "#E5E7EB",
  card: "#FFFFFF",
};

/* ---------- إطار الهاتف ---------- */
export const Phone = styled.div`
  min-height: 100dvh;
  background: ${C.cream};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const PhoneInner = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${C.cream};
  padding-bottom: 116px;
  -webkit-overflow-scrolling: touch;
  direction: rtl;
  text-align: right;
`;

/* ---------- بطاقة ومقاطع ---------- */
export const Card = styled.div`
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin: 16px 12px 0;
`;

export const Section = styled.div`
  padding: 16px;
  & + & {
    border-top: 1px solid ${C.line};
  }
`;

export const SectionHeader = styled(Section)`
  border-bottom: 1px solid ${C.line};
  color: ${C.ink900};
`;

/* ---------- صف الترويسة (الصورة + الاسم) ---------- */
export const HeaderRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 12px 0;
  margin: 12px 0 0 0;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  object-fit: cover;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${C.ink900};
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
  word-break: break-word;
`;

export const Subtle = styled.div`
  color: ${C.ink500};
  font-size: 14px;
  margin-top: 2px;
`;

export const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${C.ink500};
  font-size: 14px;
  margin-top: 2px;
`;

export const Tiny = styled.div`
  color: ${C.ink500};
`;

/* ---------- عناصر عامة ---------- */
export const Row = styled.div`
  display: flex;
  gap: ${(p) => p.$gap || 0}px;
  align-items: ${(p) => p.$align || "stretch"};
`;

export const Grow = styled.div`
  flex: 1;
`;

export const Heading20 = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${C.ink900};
`;

export const P = styled.p`
  margin: 0;
  color: ${(p) => p.$color || C.ink600};
  font-size: ${(p) => p.$size || 14}px;
  line-height: 1.7;
`;

export const LinkText = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 14px;
  color: ${C.ink900};
  text-decoration: underline;
  cursor: pointer;
`;

/* ---------- التبويبات ---------- */
export const TabsBar = styled.div`
  display: flex;
  gap: 24px;
  padding: 6px 16px 0;
  margin: 8px 12px 0;
  border-bottom: 1px solid ${C.line};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 12px 0;
  font-size: 14px;
  color: ${(p) => (p.$active ? C.ink900 : C.ink500)};
  position: relative;
  flex: 0 0 auto;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(p) => (p.$active ? C.ink900 : "transparent")};
  }

  &:focus {
    outline: none;
  }
`;

/* ---------- التقييم ---------- */
export const Big = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: ${C.ink900};
`;

export const Stars = styled.div`
  display: flex;
  gap: 4px;
  color: #f6c81e;
`;

/* ---------- حقول الإدخال ---------- */
export const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${C.ink900};
`;

export const SelectWrap = styled.div`
  position: relative;
`;

export const Select = styled.select`
  appearance: none;
  width: 100%;
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;

  &::placeholder {
    color: ${C.ink400};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

export const Toggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid ${C.line};
  border-radius: 8px;
  overflow: hidden;
`;

export const ToggleBtn = styled.button`
  padding: 12px;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  cursor: pointer;

  ${(p) =>
    p.$active
      ? css`
          background: ${C.ink900};
          color: #fff;
        `
      : css`
          background: #fff;
          color: ${C.ink900};
        `}
`;

/* ---------- التوافر ---------- */
export const AvailBlock = styled.div`
  display: grid;
  gap: 12px;
`;

export const DayHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${C.ink900};
  margin-top: 4px;
`;

export const TimesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (min-width: 380px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TimeBtn = styled.button`
  padding: 10px 0;
  border-radius: 10px;
  border: 2px solid ${(p) => (p.$selected ? C.ink900 : C.yellowBorder)};
  background: ${(p) => (p.$selected ? "#fff" : C.yellow)};
  color: ${C.ink900};
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$selected ? "#fff" : C.yellowBorder)};
    transform: translateY(-2px);
  }
`;

export const MoreBtn = styled(TimeBtn)`
  background: ${C.yellow};
  border-style: dashed;
`;

export const OutlineBtn = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  background: #fff;
  border: 1px solid ${C.ink900};
  border-radius: 10px;
  font-weight: 700;
  color: ${C.ink900};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${C.ink900};
    color: #fff;
  }
`;

/* ---------- Patient Info Form ---------- */
export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${C.ink900};
  margin-bottom: 6px;
`;

export const FormInput = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};
  box-sizing: border-box;

  &::placeholder {
    color: ${C.ink400};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

export const BackBtn = styled.button`
  background: transparent;
  border: none;
  color: ${C.ink900};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: ${C.ink700};
  }
`;

export const AppointmentSummary = styled.div`
  background: ${C.cream};
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: ${C.ink700};
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

/* ---------- Payment Method Cards ---------- */
export const PaymentMethodCard = styled.button`
  width: 100%;
  background: #fff;
  border: 2px solid ${(p) => (p.$selected ? C.ink900 : C.line)};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: right;
  margin-bottom: 12px;

  &:hover {
    border-color: ${C.ink900};
    transform: translateY(-2px);
  }
`;

export const PaymentMethodTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${C.ink900};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaymentMethodDesc = styled.div`
  font-size: 14px;
  color: ${C.ink600};
  line-height: 1.5;
`;

export const PriceHighlight = styled.div`
  background: ${C.yellow};
  border: 2px solid ${C.yellowBorder};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

export const PriceAmount = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${C.ink900};
  margin-bottom: 4px;
`;

export const PriceLabel = styled.div`
  font-size: 14px;
  color: ${C.ink700};
`;

/* ---------- تخطيطات مساعدة ---------- */
export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Spacer16 = styled.div`
  height: 16px;
`;

/* ---------- شريط الحجز السفلي ---------- */
export const BottomBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${C.yellow};
  border-top: 1px solid ${C.yellowBorder};
  padding: 4px;
  display: flex;
  justify-content: center;
  z-index: 40;
`;

export const BookBtn = styled.button`
  width: 100%;
  max-width: 420px;
  background: ${C.yellow};
  color: ${C.ink900};
  font-weight: 800;
  font-size: 17px;
  padding: 14px 16px;
  border: 2px solid ${C.ink900};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${C.yellowBorder};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const KPI = styled.div`
  font-size: ${(p) => p.$size || 18}px;
  font-weight: ${(p) => (p.$bold ? 700 : 600)};
  color: ${C.ink900};
  margin-top: ${(p) => p.$mt || 0}px;
`;

export const LocImg = styled.img`
  width: 14px;
  height: 14px;
  opacity: 0.8;
  margin: 0 0 0 2px;
  padding: 0;
`;

export const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  color: #2e7d32;
  font-family: "system-ui", sans-serif;
  background-color: #f8fff8;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

export const SuccessIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

export const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 12px 0;
`;

export const SuccessMessage = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin: 0;
`;

export const SuccessBtn = styled.button`
  background-color: #f7e05e;
  color: white;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0 0 0;

  &:hover {
    background-color: #ffdf2dff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
  }
`;

export const InsuranceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

export const InsuranceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const InsuranceLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const InsuranceName = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
`;

export const CardPad = styled.div`
  padding: 10px;
`;

export const SeeMoreLink = styled.a`
  display: inline-block;
  font-size: 16px;
  color: #1a1a1a;
  text-decoration: underline;
  margin: 24px 0;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export const CheckCoverageButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  background: white;
  border: 1.5px solid #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const FaqContainer = styled.div`
  margin: 0 auto;
  padding: 10px;
  font-family: Arial, sans-serif;
  direction: rtl;
`;

export const FaqItem = styled.div`
  margin-bottom: 40px;
`;

export const FaqQuestion = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #1a1a1a;
  line-height: 1.4;
`;

export const FaqAnswer = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a;
  margin: 0;
`;

export const DocExpertiseContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
`;

export const DocExpertiseDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 40px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
`;

export const DocExpertiseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const DocExpertiseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #f0f0f0;

  &:first-child {
    padding-top: 0;
  }
`;

export const DocExpertiseCheckmark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  color: #666666;
  font-size: 20px;

  &::before {
    content: "✓";
  }
`;

export const DocExpertiseItemText = styled.span`
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 400;
  margin: 0 4px 0 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
`;

export const ReviewCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  direction: rtl;
  font-family: "Cairo", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const ReviewTitle = styled.h2`
  font-size: 26px;
  font-weight: 500;
  color: #5f6368;
  margin: 0 0 10px 0;
`;

export const ReviewSubtitle = styled.p`
  font-size: 16px;
  color: #5f6368;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

export const ReviewMetricsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ReviewMetricSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewMetricLabel = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 12px 0;
`;

export const ReviewRatingLarge = styled.div`
  font-size: 46px;
  font-weight: 300;
  color: #202124;
  margin: 0 0 8px 0;
  line-height: 1;
`;

export const ReviewStarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
`;

export const ReviewStar = styled.span`
  color: ${(props) => (props.filled ? "#fbbc04" : "#e0e0e0")};
  font-size: 20px;
`;

export const ReviewRatingText = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: #202124;
  margin-right: 8px;
`;

export const ReviewTrustNote = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  color: #5f6368;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const ReviewLink = styled.a`
  color: #1a73e8;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #1557b0;
  }
`;

export const ReviewControlsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ReviewSelect = styled.select`
  padding: 12px 40px 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  color: #202124;
  cursor: pointer;
  min-width: 150px;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

export const ReviewSearchContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const ReviewSearchIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #5f6368;
  font-size: 20px;
`;

export const ReviewSearchInput = styled.input`
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  direction: rtl;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }

  &::placeholder {
    color: #9aa0a6;
  }
`;

export const ReviewItemContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ReviewItemStars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
`;

export const ReviewItemStar = styled.span`
  color: ${(props) => (props.filled ? "#fbbc04" : "#e0e0e0")};
  font-size: 20px;
`;

export const ReviewItemMeta = styled.div`
  font-size: 14px;
  color: #5f6368;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReviewItemText = styled.p`
  font-size: 14px;
  color: #202124;
  line-height: 1.6;
  margin: 12px 0 0 0;
`;

export const RateFlex = styled.div`
  display: flex;
`;
