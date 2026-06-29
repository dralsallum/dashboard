import React from "react";
import styled, { keyframes } from "styled-components";
import video1 from "../../assets/hims.mp4";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Root: warm dark-brown, fills viewport ─────────────────────────── */
const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 1200px;
  overflow: hidden;
  background: #3b2a18;
  direction: rtl;

  @media screen and (max-width: 768px) {
    min-height: 800px;
  }
`;

/*
  Diagonal light-beam overlay — mirrored for RTL (origin from top-left).
*/
const LightBeam = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: conic-gradient(
    from 325deg at 10% 0%,
    transparent 0deg,
    rgba(220, 185, 120, 0.18) 12deg,
    rgba(220, 185, 120, 0.1) 22deg,
    transparent 34deg
  );
  pointer-events: none;
`;

/* ─── Video: centered in the page, behind text ──────────────────────── */
const BgVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 2;
`;

/* ─── Headline — pinned near top, above video ───────────────────────── */
const TopText = styled.div`
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  padding: 0 24px;
  animation: ${fadeUp} 0.75s ease both;
`;

const H1 = styled.h1`
  margin: 0;
  font-family: "Cairo", "Tajawal", "Arial", sans-serif;
  font-size: clamp(1.9rem, 4.2vw, 3.4rem);
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0;
  color: #f5efe6;
`;

const GoldLine = styled.span`
  display: block;
  color: #d4a12a;
  font-weight: 300;
`;

/* ─── Bottom copy + CTA — pinned near bottom, above video ───────────── */
const BottomText = styled.div`
  position: absolute;
  bottom: 7%;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  padding: 0 24px;
  animation: ${fadeUp} 0.85s 0.15s ease both;
`;

const Body = styled.p`
  margin: 0 0 22px;
  font-family: "Cairo", "Tajawal", "Arial", sans-serif;
  font-size: clamp(0.88rem, 1.35vw, 1.05rem);
  font-weight: 400;
  line-height: 1.9;
  color: rgba(245, 235, 218, 0.88);
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;

  strong {
    color: #d4a12a;
    font-weight: 600;
  }
`;

const CTA = styled.button`
  display: inline-block;
  padding: 11px 34px;
  border-radius: 50px;
  border: none;
  background: #e8d8bc;
  color: #2a1a08;
  font-family: "Cairo", "Tajawal", "Arial", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: #f0e4cc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* ─── Component ─────────────────────────────────────────────────────── */
const Medications = () => (
  <Section>
    {/* warm background already set on Section */}

    {/* diagonal light beam — decorative, z=1 */}
    <LightBeam />

    {/* medication video fills the frame, floats behind text, z=2 */}
    <BgVideo src={video1} autoPlay loop muted playsInline aria-hidden="true" />

    {/* headline pinned TOP, z=10 — video floats behind */}
    <TopText>
      <H1>
        أدويتك في متناول يدك
        <GoldLine>في كل وقت وفي كل مكان</GoldLine>
      </H1>
    </TopText>

    {/* body + CTA pinned BOTTOM, z=10 — video floats behind */}
    <BottomText>
      <Body>
        تتبّع جرعاتك، وسجل ادويتك، وتواصل مع طبيبك — كل ذلك من مكان{" "}
        <strong>واحد</strong> وبكل سهولة.
      </Body>
      <CTA>ابدأ الآن</CTA>
    </BottomText>
  </Section>
);

export default Medications;
