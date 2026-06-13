import { useState } from "react";
import styled, { keyframes } from "styled-components";

import womanImg from "../../assets/woman.png";
import coupleImg from "../../assets/couple.png";
import boyImg from "../../assets/boy.png";

const cards = [
  {
    id: "individual",
    title: "فردي",
    subtitle: "لنفسي",
    bg: "#3A7A45",
    hover: "#2E6438",
    image: womanImg,
    imageAlt: "امرأة جالسة بهدوء بجانب نبتة",
  },
  {
    id: "couples",
    title: "للأزواج",
    subtitle: "لي ولشريك حياتي",
    bg: "#4A7A9A",
    hover: "#3A6A8A",
    image: coupleImg,
    imageAlt: "شخصان يتعانقان",
  },
  {
    id: "teen",
    title: "للمراهقين",
    subtitle: "لطفلي",
    bg: "#B85A10",
    hover: "#A04A08",
    image: boyImg,
    imageAlt: "مراهق جالس بشكل مريح",
  },
];

/* ── Animations ── */
const bounce = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(5px); }
`;

/* ── Layout ── */
const Page = styled.div`
  min-height: 100vh;
  background: #2d5a3d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px 80px;
  font-family: "Noto Naskh Arabic", "Georgia", "Times New Roman", serif;
  position: relative;
  overflow: hidden;
  direction: rtl;
`;

const TextureOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 60%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 50%
    );
  pointer-events: none;
`;

/* ── Headline & Sub ── */
const Headline = styled.h1`
  color: #ffffff;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  letter-spacing: 0;
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.4;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(15px, 2vw, 18px);
  font-weight: 400;
  margin-bottom: 48px;
  text-align: center;
  letter-spacing: 0;
  font-family: "Noto Naskh Arabic", "Helvetica Neue", Arial, sans-serif;
`;

/* ── Cards Grid ── */
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

/* ── Single Card ── */
const Card = styled.div`
  background: ${({ $bg, $hoverBg, $isHovered, $isSelected }) =>
    $isHovered || $isSelected ? $hoverBg : $bg};
  border-radius: 16px;
  padding: 0;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
  transform: ${({ $isHovered }) =>
    $isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)"};
  box-shadow: ${({ $isSelected, $isHovered }) =>
    $isSelected
      ? "0 0 0 3px rgba(255,255,255,0.5), 0 20px 40px rgba(0,0,0,0.35)"
      : $isHovered
        ? "0 20px 40px rgba(0,0,0,0.3)"
        : "0 8px 24px rgba(0,0,0,0.2)"};
  display: flex;
  flex-direction: column;
  min-height: 300px;
  overflow: hidden;
  position: relative;
`;

/* ── Card Header (text section retains side padding) ── */
const CardHeader = styled.div`
  padding: 28px 28px 8px;
`;

const CardTitle = styled.h2`
  color: #ffffff;
  font-size: 26px;
  font-weight: 400;
  margin: 0 0 10px;
  font-family: "Noto Naskh Arabic", "Georgia", serif;
  letter-spacing: 0;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-family: "Noto Naskh Arabic", "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0;
`;

const ArrowCircle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: ${({ $isHovered }) =>
    $isHovered ? "translateX(-3px)" : "translateX(0)"};
`;

/* ── Card Image — positioned on the LEFT (bottom of column flow) ── */
const CardImage = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 8px;
  height: 200px;
  overflow: hidden;
  width: 100%;
  /* Flip the image horizontally so the figure faces into the card */
  transform: scaleX(-1);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom center;
  display: block;
  transition: transform 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? "scale(1.03)" : "scale(1)")};
`;

/* ── Bottom Wave ── */
const WaveWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  overflow: hidden;
  pointer-events: none;
`;

/* ── Scroll Indicator ── */
const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: ${bounce} 2s infinite;
`;

/* ── Component ── */
export default function TherapySelectionPage() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <Page>
      <TextureOverlay />

      <Headline>أنت تستحق أن تكون سعيداً.</Headline>

      <Subtitle>ما نوع العلاج الذي تبحث عنه؟</Subtitle>

      <CardsGrid>
        {cards.map(({ id, title, subtitle, bg, hover, image, imageAlt }) => {
          const isHovered = hovered === id;
          const isSelected = selected === id;

          return (
            <Card
              key={id}
              $bg={bg}
              $hoverBg={hover}
              $isHovered={isHovered}
              $isSelected={isSelected}
              onClick={() => setSelected(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardMeta>
                  <span>{subtitle}</span>
                  <ArrowCircle $isHovered={isHovered}>
                    {/* Arrow points LEFT for RTL */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 6H2M5 3L2 6L5 9"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </ArrowCircle>
                </CardMeta>
              </CardHeader>

              <CardImage>
                <Img src={image} alt={imageAlt} $isHovered={isHovered} />
              </CardImage>
            </Card>
          );
        })}
      </CardsGrid>

      <WaveWrapper>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40 Q180 0 360 30 Q540 60 720 35 Q900 10 1080 38 Q1260 66 1440 40 L1440 80 L0 80 Z"
            fill="#E8E4D8"
          />
        </svg>
      </WaveWrapper>

      <ScrollIndicator>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 8L11 14L17 8"
            stroke="#2D5A3D"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ScrollIndicator>
    </Page>
  );
}
