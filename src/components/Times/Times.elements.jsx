import styled, { keyframes } from "styled-components";

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

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #ffffff;
  direction: rtl;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 20px 40px;
  max-width: 1400px;

  @media (max-width: 768px) {
    padding: 0px;
    overflow-x: hidden;
  }
`;

/* Filters Bar */
export const FiltersBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  z-index: 9999;
  @media (max-width: 768px) {
    flex-wrap: nowrap;

    padding: 16px;
    margin-bottom: 16px;

    /* Hide scrollbar for cleaner look */
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 transparent;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d0d0d0;
      border-radius: 2px;
    }
  }
`;

export const FilterBtn = styled.button`
  padding: 8px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 20px;
  background-color: ${(props) => (props.$active ? "#f5f5f5" : "white")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #000;
  border-color: ${(props) => (props.$active ? "#999" : "#d0d0d0")};
  white-space: nowrap;

  &:hover {
    border-color: #999;
    background-color: #f9f9f9;
  }

  span {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
  }
`;

export const FilterToggle = styled.button`
  padding: 8px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 20px;
  background-color: ${(props) => (props.$active ? "#007aff" : "white")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.$active ? "white" : "#000")};
  border-color: ${(props) => (props.$active ? "#007aff" : "#d0d0d0")};
  white-space: nowrap;

  &:hover {
    border-color: ${(props) => (props.$active ? "#0056b3" : "#999")};
    background-color: ${(props) => (props.$active ? "#0056b3" : "#f9f9f9")};
  }

  input[type="checkbox"] {
    accent-color: white;
    cursor: pointer;
  }

  span {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 9999;
  padding: 8px 0;

  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #d0d0d0 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

export const FilterOption = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #000;
  background-color: ${(props) => (props.$selected ? "#f0f0f0" : "transparent")};
  font-weight: ${(props) => (props.$selected ? "600" : "400")};

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

/* Header Section */
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ProvidersCount = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #333;
`;

export const ArrowBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

/* Care Type Section */
export const CareTypeSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const CareTypeTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a1a1a;
`;

export const CategoriesList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CategoryBtn = styled.button`
  padding: ${(props) => (props.$arrow ? "10px 16px" : "10px 20px")};
  border: 1px solid ${(props) => (props.$selected ? "#007aff" : "#d0d0d0")};
  border-radius: 8px;
  background-color: ${(props) => (props.$selected ? "#007aff" : "white")};
  color: ${(props) => (props.$selected ? "white" : "#000")};
  font-size: ${(props) => (props.$arrow ? "18px" : "14px")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: ${(props) => (props.$selected ? "#007aff" : "#999")};
    background-color: ${(props) => (props.$selected ? "#007aff" : "#f9f9f9")};
  }
`;

/* Provider Card */
export const ProvidersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const ProviderCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 24px;
  background-color: white;
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin: 0 8px;
    border-radius: 8px;
  }
`;

export const ProviderInfo = styled.div`
  display: flex;
  gap: 16px;
  min-width: 380px;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    min-width: auto;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const ProviderAvatar = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 64px;
  height: 64px;

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const AvatarPlaceholder = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

export const VideoBadge = styled.span`
  position: absolute;
  bottom: -2px;
  left: -2px;
  background-color: white;
  border-radius: 50%;
  padding: 3px;
  font-size: 14px;
  border: 2px solid white;
`;

export const ProviderDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProviderHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

export const ProviderName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SponsoredBadge = styled.span`
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 3px;

  span {
    color: #999;
  }
`;

export const ProviderSpecialty = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ProviderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #000;

  span:first-child {
    font-size: 14px;
  }

  .reviews {
    color: #666;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    span:first-child {
      font-size: 13px;
    }
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #333;

  span {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    span {
      font-size: 13px;
    }
  }
`;

export const Badges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export const Badge = styled.span`
  font-size: 12px;
  color: #666;

  &:not(:last-child)::after {
    content: " · ";
    margin-right: 6px;
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

/* Availability Grid */
export const AvailabilityGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    overflow: hidden;
  }
`;

export const AvailabilityRow = styled.div`
  display: flex;
  gap: 6px;

  &.second-row {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for cleaner look */
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 transparent;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d0d0d0;
      border-radius: 2px;
    }
  }
`;

export const AvailabilitySlot = styled.div`
  flex: 1;
  min-width: 65px;
  max-width: 90px;
  border-radius: 8px;
  padding: 8px 6px;
  text-align: center;
  font-size: 11px;
  background-color: ${(props) => (props.$available ? "#fff9c4" : "#f5f5f5")};
  border: 1px solid ${(props) => (props.$available ? "#f9d71c" : "#e0e0e0")};
  color: ${(props) => (props.$available ? "#000" : "#999")};
  transition: all 0.2s;
  cursor: ${(props) => (props.$available ? "pointer" : "default")};

  &:hover {
    ${(props) =>
      props.$available &&
      `
      background-color: #fff59d;
      border-color: #f9a825;
    `}
  }

  @media (max-width: 768px) {
    min-width: 70px;
    max-width: 85px;
    font-size: 10px;
    flex-shrink: 0;
  }
`;

export const DateLabel = styled.div`
  margin-bottom: 5px;
  line-height: 1.2;
  font-weight: 500;

  .calendar-icon {
    font-size: 10px;
    margin-right: 2px;
  }
`;

export const SlotsCount = styled.div`
  line-height: 1.2;

  strong {
    font-size: 15px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 14px;
    }
  }
`;

export const MoreBtn = styled.button`
  min-width: 65px;
  max-width: 90px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: #000;
  padding: 8px 6px;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }

  @media (max-width: 768px) {
    min-width: 70px;
    max-width: 85px;
    font-size: 12px;
    flex-shrink: 0;
  }
`;

/* Map Section */
export const MapSection = styled.div`
  width: 400px;
  background-color: #c8e6c9;
  position: relative;
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 320px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const ExpandMapBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: white;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000000;
  color: #000;
  transition: all 0.2s;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;

  span {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
