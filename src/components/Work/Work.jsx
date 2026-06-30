import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import {
  MapPin,
  FlaskConical,
  Video,
  Home,
  Syringe,
  Stethoscope,
  ClipboardCheck,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Design tokens (matches Health.jsx) ──────────────────────────── */
const PRIMARY = "#2D5A4E";
const PRIMARY_DARK = "#1f3f36";
const BG_SECTION = "#f0f5f3";
const CARD_BG = "#ddeae5";
const CARD_BG_ALT = "#ffffff";
const HEADING_COLOR = "#1a2e27";
const MUTED = "#5a7a70";
const DIVIDER = "#aac4bb";
const SHADOW = "rgba(45, 90, 78, 0.18)";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
`;

/* ─── Animations ───────────────────────────────────────────────────── */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.85); }
  65%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

/* ─── Layout ───────────────────────────────────────────────────────── */
const Section = styled.section`
  background: ${BG_SECTION};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 24px;
  font-family: "Tajawal", sans-serif;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

const Eyebrow = styled.span`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  color: ${PRIMARY};
  background: ${CARD_BG};
  padding: 6px 18px;
  border-radius: 999px;
  margin-bottom: 18px;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards;
`;

const Heading = styled.h1`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 46px;
  color: ${HEADING_COLOR};
  margin: 0 0 14px;
  text-align: center;
  letter-spacing: 0.3px;

  em {
    font-style: italic;
    color: ${PRIMARY};
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const SubHeading = styled.p`
  font-size: 17px;
  color: ${MUTED};
  text-align: center;
  max-width: 560px;
  line-height: 1.8;
  margin: 0 0 40px;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

/* ─── Tabs ─────────────────────────────────────────────────────────── */
const TabRow = styled.div`
  display: flex;
  gap: 10px;
  background: ${CARD_BG_ALT};
  padding: 6px;
  border-radius: 999px;
  margin-bottom: 48px;
  box-shadow: 0 4px 18px ${SHADOW};

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Tab = styled.button`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
  padding: 12px 26px;
  border-radius: 999px;
  background: ${(p) => (p.$active ? PRIMARY : "transparent")};
  color: ${(p) => (p.$active ? "#ffffff" : MUTED)};
  transition:
    background 0.25s ease,
    color 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: ${(p) => (p.$active ? PRIMARY : "#eef5f2")};
  }

  @media (max-width: 480px) {
    flex: 1;
    padding: 12px 10px;
    font-size: 13px;
  }
`;

/* ─── Steps grid ───────────────────────────────────────────────────── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  width: 100%;
  max-width: 1080px;
  margin-bottom: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
`;

const Card = styled.div`
  background: ${CARD_BG_ALT};
  border-radius: 20px;
  padding: 34px 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 18px ${SHADOW};
  opacity: 0;
  ${(p) =>
    p.$visible &&
    css`
      animation: ${slideUp} 0.6s ease forwards;
      animation-delay: ${p.$delay || 0}s;
    `}
`;

const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${CARD_BG};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PRIMARY};
  margin-bottom: 18px;
`;

const StepNum = styled.span`
  font-family: "Tajawal", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${PRIMARY};
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const CardTitle = styled.h3`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 21px;
  color: ${HEADING_COLOR};
  margin: 0 0 10px;
`;

const CardSub = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${MUTED};
  margin: 0;
`;

/* ─── Conditions chips (home care track) ──────────────────────────── */
const ConditionsWrap = styled.div`
  width: 100%;
  max-width: 1080px;
  background: ${CARD_BG_ALT};
  border-radius: 20px;
  padding: 28px 30px;
  margin-bottom: 28px;
  box-shadow: 0 4px 18px ${SHADOW};
  opacity: 0;
  ${(p) =>
    p.$visible &&
    css`
      animation: ${fadeIn} 0.6s ease forwards;
      animation-delay: 0.5s;
    `}
`;

const ConditionsLabel = styled.p`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: ${HEADING_COLOR};
  margin: 0 0 16px;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${BG_SECTION};
  border: 1px solid ${DIVIDER};
  color: ${PRIMARY_DARK};
  font-size: 14px;
  font-weight: 500;
  padding: 9px 16px;
  border-radius: 999px;
  opacity: 0;
  ${(p) =>
    p.$visible &&
    css`
      animation: ${popIn} 0.4s ease forwards;
      animation-delay: ${p.$delay || 0}s;
    `}
`;

/* ─── Buttons ──────────────────────────────────────────────────────── */
const BtnRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const BtnPrimary = styled.button`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  background: ${PRIMARY};
  border: none;
  border-radius: 999px;
  padding: 15px 34px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    background 0.25s ease,
    transform 0.15s ease;

  &:hover {
    background: ${PRIMARY_DARK};
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    justify-content: center;
    padding: 15px 0;
  }
`;

const BtnOutline = styled.button`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${PRIMARY};
  background: transparent;
  border: 1.5px solid ${PRIMARY};
  border-radius: 999px;
  padding: 15px 34px;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: ${CARD_BG};
  }

  @media (max-width: 480px) {
    padding: 15px 0;
  }
`;

/* ─── Content data ─────────────────────────────────────────────────── */
const checkupSteps = [
  {
    icon: <ClipboardCheck size={24} />,
    title: "احجز موعدك",
    desc: "تحجز موعد الفحص السنوي خلال دقائق من التطبيق، وتختار الباقة المناسبة لحالتك.",
  },
  {
    icon: <MapPin size={24} />,
    title: "توجّه لأقرب مختبر",
    desc: "تذهب إلى أقرب مختبر شريك من موقعك لسحب عينة الدم، دون الحاجة لحجز دور أو انتظار طويل.",
  },
  {
    icon: <Video size={24} />,
    title: "اتصال فيديو مع الطبيب",
    desc: "بعد جاهزية النتائج، يتواصل معك الطبيب عبر مكالمة فيديو لشرح النتائج والخطوات التالية.",
  },
];

const homeCareSteps = [
  {
    icon: <Stethoscope size={24} />,
    title: "تواصل وتقييم الحالة",
    desc: "تخبرنا بحالة المريض واحتياجاته، ونحدد نوع الرعاية والتجهيزات اللازمة قبل الزيارة.",
  },
  {
    icon: <Home size={24} />,
    title: "زيارة منزلية متخصصة",
    desc: "يصل الكادر التمريضي إلى منزلك بالمعدات الكاملة لتقديم الرعاية المطلوبة بأمان وراحة.",
  },
  {
    icon: <Syringe size={24} />,
    title: "متابعة دورية",
    desc: "نضع جدول زيارات متابعة حسب الحالة لضمان استمرارية الرعاية وتغيير المستلزمات عند الحاجة.",
  },
];

const conditions = [
  "تركيب وتغيير قسطرة فولي",
  "أنبوب أنفي معدي (NGT)",
  "فحص دوري وعلامات حيوية",
  "العناية بالجروح والتضميد",
  "حقن ووريد منزلي",
];

/* ─── Hook: trigger animation on scroll into view ─────────────────── */
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ─── Component ────────────────────────────────────────────────────── */
const Work = () => {
  const [activeTab, setActiveTab] = useState("checkup"); // "checkup" | "homecare"
  const [ref, visible] = useInView();
  const navigate = useNavigate();

  const steps = activeTab === "checkup" ? checkupSteps : homeCareSteps;

  const handleNavigate = (e) => {
    navigate(e);
  };

  return (
    <>
      <GlobalStyle />
      <Section ref={ref}>
        <Eyebrow>كيف تعمل خدماتنا</Eyebrow>
        <Heading>
          رعايتك تبدأ <em>بثلاث خطوات</em> بسيطة
        </Heading>
        <SubHeading>
          سواء كنت بحاجة لفحصك السنوي أو لرعاية منزلية متخصصة، صممنا الرحلة
          لتكون واضحة وسريعة من البداية حتى المتابعة.
        </SubHeading>

        <TabRow>
          <Tab
            $active={activeTab === "checkup"}
            onClick={() => setActiveTab("checkup")}
          >
            الفحص السنوي
          </Tab>
          <Tab
            $active={activeTab === "homecare"}
            onClick={() => setActiveTab("homecare")}
          >
            الرعاية المنزلية
          </Tab>
        </TabRow>

        <Grid key={activeTab}>
          {steps.map((step, i) => (
            <Card key={step.title} $visible={visible} $delay={i * 0.15}>
              <IconBox>{step.icon}</IconBox>
              <StepNum>{`٠${i + 1}`}</StepNum>
              <CardTitle>{step.title}</CardTitle>
              <CardSub>{step.desc}</CardSub>
            </Card>
          ))}
        </Grid>

        {activeTab === "homecare" && (
          <ConditionsWrap $visible={visible}>
            <ConditionsLabel>حالات تشملها الرعاية المنزلية</ConditionsLabel>
            <ChipRow>
              {conditions.map((c, i) => (
                <Chip key={c} $visible={visible} $delay={0.6 + i * 0.08}>
                  {c}
                </Chip>
              ))}
            </ChipRow>
          </ConditionsWrap>
        )}

        <BtnRow>
          <BtnPrimary onClick={() => handleNavigate("/recommendation")}>
            {activeTab === "checkup" ? "احجز فحصك الآن" : "اطلب رعاية منزلية"}
            <ArrowLeft size={18} />
          </BtnPrimary>
          <BtnOutline onClick={() => handleNavigate("/contact")}>
            تحدث مع فريقنا
          </BtnOutline>
        </BtnRow>
      </Section>
    </>
  );
};

export default Work;
