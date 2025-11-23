import styled from "styled-components";

export const AllCategoriesContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px 60px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  direction: rtl;
  text-align: right;
  min-height: 100vh;
  background: #fafafa;

  @media (max-width: 768px) {
    padding: 60px 20px 40px;
  }
`;

export const BackButton = styled.button`
  padding: 12px 24px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 30px;
  font-weight: 400;

  &:hover {
    background: #f5f5f5;
    border-color: #c0c0c0;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 12px;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 20px;
  color: #666;
  font-weight: 400;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 24px;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  min-height: 240px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #c0c0c0;
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    min-height: 200px;
  }
`;

export const CategoryIcon = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 20px;
  background: #fff0bb;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #ebdcab;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-bottom: 16px;
  }
`;

export const CategoryName = styled.h3`
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 8px;
  }
`;

export const CategoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.4;
  }
`;
