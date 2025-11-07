import styled from "styled-components";

export const BenefitsContainer = styled.section`
  background: linear-gradient(180deg, #fff0bb 0%, #fffaed 100%);
  padding: 40px 16px 40px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 40px 16px 30px;
    min-height: auto;
  }
`;

export const BenefitsWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

export const BenefitsHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: #2c2c2c;
  margin-bottom: 80px;
  direction: rtl;
  font-family: "Cairo", "Segoe UI", Tahoma, sans-serif;

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 60px;
    line-height: 1.4;
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media screen and (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 80px;
  }

  @media screen and (max-width: 480px) {
    gap: 70px;
  }
`;

export const BenefitCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 120px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  min-height: 320px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media screen and (max-width: 480px) {
    padding: 100px 20px 28px 20px;
    min-height: 280px;
    border-radius: 12px;
  }
`;

export const IconWrapper = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 480px) {
    width: 140px;
    height: 140px;
    top: -50px;
  }
`;

export const DoctorIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ReviewIcon = styled.div`
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CalendarIcon = styled.div`
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  color: #2c2c2c;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 280px;
  flex-grow: 1;
  direction: rtl;
  font-family: "Cairo", "Segoe UI", Tahoma, sans-serif;

  @media screen and (max-width: 480px) {
    margin-bottom: 24px;
    line-height: 1.7;
  }
`;

export const BenefitButton = styled.button`
  background: transparent;
  border: 2px solid #2c2c2c;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  color: #2c2c2c;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  direction: rtl;
  font-family: "Cairo", "Segoe UI", Tahoma, sans-serif;
  white-space: nowrap;

  &:hover {
    background: #2c2c2c;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 480px) {
    padding: 10px 24px;
    font-size: 0.95rem;
    width: 100%;
    max-width: 200px;
  }
`;
