import styled from "styled-components";

export const CategoryContainer = styled.div`
  width: 100%;
  background: #fff;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  direction: rtl;
  text-align: right;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const CategoryHeader = styled.div`
  margin-bottom: 40px;
`;

export const CategoryTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const CategorySubtitle = styled.p`
  font-size: 16px;
  color: #666;
  font-weight: 400;
  margin: 0;
`;

export const InsuranceSection = styled.div``;

export const InsuranceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InsuranceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;

  &:hover {
    border-color: #c0c0c0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    min-height: 100px;
  }

  span {
    font-size: 14px;
    color: #333;
    text-align: center;
    margin-top: 8px;
  }
`;

export const InsuranceLogo = styled.img`
  width: 180px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

export const AddInsuranceButton = styled.button`
  padding: 16px 32px;
  border: 1px solid #333;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s ease;
  display: inline-block;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SeeAllLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  min-height: 120px;

  &:hover {
    color: #000;
  }
`;

export const SpecialtiesSection = styled.div`
  margin: 40px 0 40px 0;

  @media (max-width: 768px) {
    margin: 0px 0 50px 0;
  }
`;

export const SpecialtiesTitle = styled.h2`
  font-size: 38px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 26px;
  @media (max-width: 768px) {
    font-size: 34px;
    margin-bottom: 18px;
  }
`;

export const SpecialtiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const SpecialtyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #fff0bb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  flex: 1 1 180px;
  max-width: calc(25% - 15px);
  border: 1px solid #ebdcab;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
    min-width: calc(50% - 10px);
    padding: 0;
  }
`;

export const SpecialtyIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 20px;
  background: white;
  border-radius: 50%;
  padding: 5px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

export const SpecialtyName = styled.div`
  font-size: 22px;
  color: #1a1a1a;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
