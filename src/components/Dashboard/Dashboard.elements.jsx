import styled, { keyframes } from "styled-components";

export const BillingContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const BillingHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const BillingExtra = styled.div`
  display: flex;
  gap: 8px;
`;

export const BillingFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const BillingFilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const BillingFilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.active ? "#111827" : "#f3f4f6")};
  color: ${(props) => (props.active ? "white" : "#374151")};

  &:hover {
    background: ${(props) => (props.active ? "#111827" : "#e5e7eb")};
  }

  &:focus {
    outline: none;
  }
`;

export const BillingActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const BillingActionButton = styled.button`
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9fafb;
    border: 1px solid #b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

// New Grid-based table container
export const BillingTableContainer = styled.div`
  overflow-x: auto;
  min-height: 400px;
`;

export const BillingTable = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr 1fr;
  min-width: 1000px;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    grid-template-columns: 48px 120px 150px 120px 200px 120px 100px 120px 120px;
  }
`;

export const BillingTableHead = styled.div`
  display: contents;
`;

export const BillingTableRow = styled.div`
  display: contents;
  cursor: pointer;

  &:hover > * {
    background: #f9fafb;
  }
`;

export const BillingTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    if (props.align === "right") return "flex-end";
    if (props.align === "center") return "center";
    return "flex-start";
  }};
  padding: 16px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const BillingTableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    if (props.align === "right") return "flex-end";
    if (props.align === "center") return "center";
    return "flex-start";
  }};
  padding: 16px 12px;
  font-size: 14px;
  color: ${(props) => props.color || "#111827"};
  font-weight: ${(props) => props.weight || "normal"};
  font-family: ${(props) => (props.mono ? "monospace" : "inherit")};
  min-height: 60px;
  transition: background-color 0.2s;
  border-bottom: 1px solid #e5e7eb;

  /* Handle text overflow */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BillingTableBody = styled.div`
  display: contents;
`;

export const BillingCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;

  &:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }
`;

export const BillingStatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;

  ${({ status }) => {
    switch (status) {
      case "مكتملة":
      case "completed":
        return `
          background: #d4edda;
          color: #155724;
        `;
      case "قيد المراجعة":
      case "pending":
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case "ملغية":
      case "cancelled":
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: #e2e3e5;
          color: #495057;
        `;
    }
  }}
`;

export const BillingPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fafafa;
`;

export const BillingPaginationButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &: focus {
    outline: none;
  }

  svg {
    stroke: currentColor;
    fill: none;
  }
`;

// Loading state component
export const BillingLoadingRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6b7280;
  font-size: 16px;
`;

const productRotation = keyframes`
  0%, 30% {
    opacity: 1;
    transform: scale(1);
  }
  33.33%, 96.66% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const MaFirst = styled.div`
  background-color: #f1f1f1;
  color: #000;
  overflow: hidden;
  height: 100vh;
  position: relative;
  direction: rtl;

  @media screen and (max-width: 768px) {
  }
`;

export const MaSec = styled.div``;

export const MaAll = styled.div`
  background-color: rgba(26, 26, 26, 1);
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const ContentSection = styled.div`
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const MainCon = styled.div`
  display: flex;
  background-color: rgba(26, 26, 26, 1);
  width: 100%;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const LogoCon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background-color: rgba(26, 26, 26, 1);
  z-index: 516;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

export const LogoGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns:
    1fr minmax(0, calc(40rem))
    1fr;
  overflow: clip;
  height: 3.5rem;
  align-items: flex-start;
`;

export const LogoDiv = styled.div`
  position: relative;
  display: flex;
  height: 3.5rem;
`;

export const LogoSubDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
`;

export const SearchWr = styled.div`
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: clip;
  max-width: calc(40rem + 0.875rem * 2);
  padding: 0 0.875rem;
  margin: 0 calc(0.875rem * -1);
`;

export const SearchCon = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
`;

export const SearchSu = styled.div`
  flex: 1 1;
  overflow: hidden;
  width: 100%;
`;

export const SearchSub = styled.div`
  width: 100%;
`;

export const SearchRe = styled.div`
  position: relative;
  max-height: 2.25rem;
  border-radius: 0.75rem;
  background: rgba(48, 48, 48, 1);
`;

export const SearchBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  min-width: 2.25rem;
  cursor: pointer;
  background: none;
  border-radius: 0.75rem;
  border: none;
  width: 100%;
  color: rgba(181, 181, 181, 1);
  appearance: none;
  margin: 0;
  padding: 0;
  width: 100%;
  color: rgba(181, 181, 181, 1);
`;

export const InputWr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const InputCon = styled.div`
  display: flex;
  place-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

export const InputSp = styled.span`
  display: flex;
  margin-right: auto;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;

export const InputKbd = styled.kbd`
  box-shadow: none;
  line-height: 1rem;
  padding: 0.125rem 0.25rem;
  font-size: 0.75rem;
  height: 1.25rem;
  min-width: 1.25rem;
  display: inline-flex;
  justify-content: center;
  margin: 0 0.125rem 0.125rem;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.25rem;
  color: rgba(181, 181, 181, 1);
  font-weight: 550;
  text-align: center;
  user-select: none;
`;

export const LogoImg = styled.img`
  filter: grayscale(0%);
  cursor: pointer;
  transition: transform 0.2s, filter 0.3s;
  width: 5rem;
  height: 1.8rem;
`;

export const NavCon = styled.div``;

export const MainSubCon = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const StartCon = styled.div`
  flex: 1;
  background-color: #f1f1f1;
  border-top-right-radius: 0rem;
  border-top-left-radius: 0.75rem;
  margin-top: 3.5rem;
  margin-right: 15rem;
  height: calc(100vh - 3.5rem);
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-top: 0;
    height: auto;
    min-height: calc(100vh - 3.5rem);
  }
`;

export const StartDiv = styled.div`
  padding: 2rem;
  min-height: 100%;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StartSub = styled.div`
  opacity: 1;
  transition: opacity 50ms;
  border-radius: 0.75rem;
  position: relative;
  padding-bottom: 0;
  min-width: 0px;
  max-width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const StartRe = styled.div`
  width: calc(100vw - 15rem - 0 - 0 - 0);
  transition: width var(--p-motion-duration-250) var(--p-motion-ease);
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const StartSa = styled.div`
  padding: 0 1rem;
  max-width: calc(41.375rem + 20rem + 1rem);
  margin: 0px auto;

  @media screen and (max-width: 768px) {
  }
`;

export const StartWa = styled.div`
  padding: 0.5rem 0;

  @media screen and (max-width: 768px) {
  }
`;

export const StartLa = styled.div`
  margin-block-start: -1.25rem;
  margin-block-end: initial;
  margin-inline-start: initial;
  margin-inline-end: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const StartTop = styled.div`
  box-sizing: content-box;
  max-width: 49.75rem;
  padding: 0;
  margin: 0 auto;
  background-color: transparent;
  padding-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const TopUl = styled.ul`
  box-sizing: content-box;
  max-width: 49.75rem;
  margin: 0 auto;
  list-style-type: none;

  @media screen and (max-width: 768px) {
  }
`;

export const TopLi = styled.li`
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const TopStart = styled.div`
  color: rgba(227, 227, 227, 1);
  background-color: #1c2122;
  border-radius: 12px;
  padding: 10px;
  @media screen and (max-width: 768px) {
  }
`;

export const TopRe = styled.div`
  color: rgba(227, 227, 227, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const TopAt = styled.button`
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  font-weight: 450;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const TopSelect = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0rem;
  line-height: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const TopFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
  }
`;

export const TopToo = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const TopSpan = styled.span`
  font-size: 0.9rem;
  letter-spacing: 0;
  color: #fff;
  font-weight: 450;
  @media screen and (max-width: 768px) {
  }
`;

export const TopSp = styled.span`
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  @media screen and (max-width: 768px) {
  }
`;

export const TopImg = styled.img`
  width: 25px;
  height: 25px;
  @media screen and (max-width: 768px) {
  }
`;

export const TopBtn = styled.button`
  background: none;
  border-color: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: calc(0.5rem * -1);
  color: rgba(255, 255, 255, 1);
  outline: none;
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const TopRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;

  @media screen and (max-width: 768px) {
  }
`;

export const TopMore = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
  }
`;

export const MidWr = styled.div`
  box-sizing: content-box;
  max-width: 49.75rem;
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  margin: 0 auto;
`;

export const MidCo = styled.div`
  margin-bottom: 1rem;
`;

export const MidUl = styled.ul`
  padding: 0;
  list-style: none;
`;

export const MidDiv = styled.div`
  box-sizing: content-box;
  max-width: 49.75rem;
  padding: 0;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const MidStart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem 0;
`;

export const MidSe = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: 8px;
`;

export const MidThi = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 8px;
`;

export const MidLa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem;
`;

export const MidTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ChWr = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const ChCo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem 0;
`;

export const ChHe = styled.h1`
  letter-spacing: 0rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
  text-align: inherit;
`;

export const ChBtn = styled.button`
  margin: 0;
  min-height: 1.25rem;
  min-width: 1.25rem;
  justify-content: center;
  text-align: center;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0rem 0rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  box-shadow: transparent;
  color: inherit;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const ChSpan = styled.span`
  margin: -0.125rem 0;
  display: inline-flex;
  align-items: center;
`;

export const ChImg = styled.img`
  width: 15px;
  height: 15px;
`;

export const MidMid = styled.div`
  transition-delay: 0ms;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  max-height: none;
  overflow: visible;
  padding-top: 0px;
  padding-bottom: 0px;
  transition-property: max-height;
`;

export const StoWr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem 0;
`;

export const StoTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
`;

export const StoBot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
`;

export const StoMap = styled.div`
  grid-column: span 1;
  grid-row: 1 / -1;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  padding: 1rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0.75rem;
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);
  align-items: start;
`;

export const StoBtn = styled.button`
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: none;
  }
`;

export const StoSpan = styled.span`
  font-weight: 550;
  font-size: 0.75rem;
  letter-spacing: 0rem;
  line-height: 1rem;
  margin: 0;
  text-align: inherit;
`;

export const StoreBot = styled.div`
  background-color: initial;
  box-shadow: initial;
  border-end-start-radius: initial;
  border-end-end-radius: initial;
  border-start-end-radius: initial;
  border-color: initial;
  border-style: initial;
  border-block-start-width: 0;
  border-block-end-width: 0;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  color: inherit;
  min-height: initial;
  min-width: initial;
  outline-color: initial;
  outline-style: none;
  outline-width: 0;
  overflow-x: visible;
  overflow-y: visible;
  width: initial;
`;

export const StoreTop = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StoreHe = styled.h3`
  letter-spacing: 0rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
`;

export const StoreMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

export const StoreEx = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const StoreBtn = styled.button`
  display: flex;
  all: unset;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const StoreDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
`;

export const StoreSp = styled.span`
  font-size: 0.8125rem;
`;

export const StoreImg = styled.img`
  display: block;
  height: 1.5rem;
  max-width: ${(props) => props.widthMax || "2.5rem"};
  box-shadow: ${(props) =>
    props.boxShadow || "0 0 0.25rem 0 rgba(0, 0, 0, 0.17)"};
  border-radius: 0.25rem;
`;
export const SiteWr = styled.div`
  grid-column: span 1;
  grid-row: 1 / -1;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  padding: 0rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0.75rem;
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
`;

export const SiteMid = styled.div`
  padding: 1rem;
  z-index: 520;
  position: relative;
`;

export const SiteDes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

export const SiteBo = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  z-index: 520;
  position: relative;
`;

export const SiteWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SiteSp = styled.span`
  font-size: 0.8125rem;
  letter-spacing: 0rem;
  line-height: 1.25rem;
  font-weight: 600;
`;

export const SiteSpa = styled.span`
  font-size: 0.8125rem;
  letter-spacing: 0rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgba(97, 97, 97, 1);
`;

export const SiteAt = styled.a`
  font-size: 0.8125rem;
  letter-spacing: 0rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #458fff;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

export const SiteBtn = styled.button`
  all: unset;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const SiteDiv = styled.div`
  justify-content: center;
  text-align: center;
  min-height: 2rem;
  min-width: 2rem;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  flex: 1;

  background: ${(props) =>
    props.$background
      ? props.$background
      : `linear-gradient(
    180deg,
    rgba(48, 48, 48, 0) 63.53%,
    rgba(255, 255, 255, 0.15) 100%
  ), rgba(48, 48, 48, 1)`};

  border: ${(props) => props.$border || "none"};
  border-radius: 0.5rem;

  box-shadow: ${(props) =>
    props.$boxShadow
      ? props.$boxShadow
      : `0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset,
    0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset,
    0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset`};

  color: ${(props) => props.$color || "rgba(255, 255, 255, 1)"};
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SiteEx = styled.div`
  margin-bottom: 15rem;
`;

export const SiteFir = styled.div`
  z-index: 510;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 1) 65.98%
  );
  position: absolute;
  bottom: 5.9375rem;
  left: 0;
  right: 0;
  height: 6.0625rem;
  pointer-events: none;
`;

export const SiteSec = styled.div`
  z-index: 510;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6.0625rem;
  pointer-events: none;
`;

export const SiteThi = styled.div`
  --size: 50rem;
  position: absolute;
  z-index: 100;
  top: 40%;
  left: 50%;
  display: grid;
  overflow: hidden;
  width: 50rem;
  padding: calc(50rem / 20);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1;
`;

// First product - shows first (0s delay)
export const SiteSubThi = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  grid-area: 1 / 1;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${productRotation} 12s infinite ease-in-out;
  animation-delay: 0s;
  opacity: 1;
`;

// Second product - shows second (2s delay)
export const SiteSuThi = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  grid-area: 1 / 1;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${productRotation} 12s infinite ease-in-out;
  animation-delay: 4s;
  opacity: 0;
`;

// Third product - shows third (4s delay)
export const SiteSThi = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  grid-area: 1 / 1;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${productRotation} 12s infinite ease-in-out;
  animation-delay: 8s;
  opacity: 0;
`;

export const SiteSubImg = styled.img`
  width: 12.5rem;
  height: 11.25rem;
  user-select: none;
  pointer-events: none;
  object-fit: contain;
`;

export const SiteFou = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26.25rem;
  height: 26.25rem;
  background: #458fff0d;
`;

export const CircleFi = styled.div`
  width: 26.25rem;
  height: 26.25rem;
  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 0.4;
`;

export const CircleSe = styled.div`
  width: 23.75rem;
  height: 23.75rem;
  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 0.6;
`;

export const CircleThi = styled.div`
  width: 21.25rem;
  height: 21.25rem;
  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 1;
`;

export const CircleFou = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 1;
`;

export const CircleFiv = styled.div`
  width: 16.25rem;
  height: 16.25rem;

  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 1;
`;

export const CircleSi = styled.div`
  width: 13.75rem;
  height: 13.75rem;
  background: #ffffff1a;
  border-radius: 624.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid rgba(69, 143, 255, 1);
  transition: all 0.3s ease-out;
  overflow: hidden;
  opacity: 1;
`;

export const OreWr = styled.div`
  opacity: 1;
  transition: opacity 50ms;
  border-radius: 0.75rem;
  position: relative;
  min-width: 0;
  max-width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const OreCon = styled.div`
  transition: width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSubCon = styled.div`
  max-width: none;

  @media screen and (max-width: 768px) {
  }
`;

export const OreTop = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSubTop = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: normal;
  min-height: 1.75rem;
  min-width: 0;
  flex-wrap: nowrap;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSu = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  width: inherit;
  overflow: hidden;

  @media screen and (max-width: 768px) {
  }
`;

export const OreDivImg = styled.div`
  padding: 0.25rem;
  border-radius: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreHeDiv = styled.div`
  margin-inline-start: calc(0.125rem * -1);
  padding-inline-start: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const OreHe = styled.h1`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: rgba(48, 48, 48, 1);
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;

export const OreImg = styled.img`
  width: 20px;
  height: 20px;

  @media screen and (max-width: 768px) {
  }
`;

export const OreTopRight = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  align-self: flex-start;
  justify-content: flex-end;
  margin-left: 1rem;
  white-space: nowrap;
  max-width: 50%;

  @media screen and (max-width: 768px) {
  }
`;
export const OreTopRi = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
  }
`;

export const OreTopFi = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSubFi = styled.div`
  flex: 0 0 auto;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSubBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.75rem;
  color: rgba(48, 48, 48, 1);
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;
  all: unset;
  border: none !important;
  position: relative;
  background: rgba(227, 227, 227, 1) !important;
  box-shadow: none !important;
  border: none;
  border-radius: 0.5rem !important;
  min-height: 1.75rem;
  align-items: center;
  text-align: center;
  padding: 0.25rem 0.75rem;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const MarketBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  color: rgba(48, 48, 48, 1);
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;
  all: unset;
  border: none !important;
  position: relative;
  background: rgba(227, 227, 227, 1) !important;
  box-shadow: none !important;
  border: none;
  border-radius: 0.5rem !important;
  min-height: 1.75rem;
  align-items: center;
  text-align: center;
  padding: 0.15rem 0.75rem;
  justify-content: center;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const MarketSubBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  color: #fff;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;
  all: unset;
  border: none !important;
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(48, 48, 48, 0) 63.53%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    rgba(48, 48, 48, 1);
  box-shadow: none !important;
  border: none;
  border-radius: 0.5rem !important;
  min-height: 1.75rem;
  align-items: center;
  text-align: center;
  padding: 0.15rem 0.75rem;
  justify-content: center;
  margin-right: 0.8rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const MarketDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const OreSubImg = styled.img`
  width: 15px;
  height: 15px;

  @media screen and (max-width: 768px) {
  }
`;

export const RepSubImg = styled.img`
  width: 13px;
  height: 13px;

  @media screen and (max-width: 768px) {
  }
`;
export const OreSpan = styled.span`
  display: inline-flex;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;
export const OreSpa = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0rem;
  font-weight: 550;
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;

export const MarkSp = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0rem;
  font-weight: 600;
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;

export const MarkSpa = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0rem;
  font-weight: 600;
  margin: 0;
  text-align: inherit;
  color: #fff;

  @media screen and (max-width: 768px) {
  }
`;
export const OreMid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(1rem * -1);
  margin-left: calc(1rem * -1);
  padding: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreMidSub = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 1 1 100%;
  min-width: 51%;

  @media screen and (max-width: 768px) {
  }
`;
export const OreMidSu = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: initial;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 4rem;

  @media screen and (max-width: 768px) {
  }
`;
export const OreFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const CenterTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const CenterTopImg = styled.img`
  width: 200px;
  height: 200px;
  transition: opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 100;

  @media screen and (max-width: 768px) {
  }
`;

export const CenterBot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const CenterBotBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

export const CenterBotBtn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  margin-top: 0.5rem;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(
      180deg,
      rgba(48, 48, 48, 0) 63.53%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    rgba(48, 48, 48, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0.5rem;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const CenterBotSp = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;

export const CenSp = styled.span`
  font-size: 0.9rem;
  letter-spacing: 0rem;
  font-weight: 500;
  text-align: center;

  @media screen and (max-width: 768px) {
  }
`;

export const CenDivMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;

  @media screen and (max-width: 768px) {
  }
`;

export const CenDiv = styled.div`
  font-size: 1rem;
  letter-spacing: 0rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;

  @media screen and (max-width: 768px) {
  }
`;
export const CenDivSp = styled.span`
  font-size: 1rem;
  letter-spacing: 0rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const OreBot = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 1 1 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const OreBotSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.25rem;
  width: auto;

  @media screen and (max-width: 768px) {
  }
`;

export const OreBotBtn = styled.button`
  appearance: none;
  display: inline;
  text-align: inherit;
  padding: 0;
  background: none;
  border: 0;
  color: rgba(0, 91, 211, 1);
  text-decoration: underline;
  cursor: pointer;
  touch-action: manipulation;
  margin-right: 3px;
  font-size: 0.75rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const OreBotPa = styled.p`
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreBotSpa = styled.span`
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ProWr = styled.div`
  opacity: 1;
  transition: opacity 50ms;
  border-radius: 0.75rem;
  position: relative;
  padding-bottom: 0px;
  flex: 1 1;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const ProCon = styled.div`
  transition: width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: calc(100vw - 15rem - 0px - 0px - 0);
  @media screen and (max-width: 768px) {
  }
`;

export const ProStart = styled.div`
  padding: 0 1rem;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
  }
`;
export const ProSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  margin-top: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;
export const ProDiv = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTop = styled.div`
  height: auto !important;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;
export const ProTopSt = styled.div`
  border-bottom: 0.0625rem solid rgba(227, 227, 227, 1);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: rgba(255, 255, 255, 1);

  @media screen and (max-width: 768px) {
  }
`;
export const ProTopFl = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 768px) {
  }
`;
export const ProTopLe = styled.div`
  flex: 1 1;
  height: 2.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTopLef = styled.div`
  transition: opacity 150ms cubic-bezier(0.25, 0.1, 0.25, 1);
  opacity: 1;
  padding: 5px;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTopLeft = styled.div`
  position: relative;
  display: flex;
  padding-right: 0.5rem;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;
export const ProTopLeftTo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0;
  list-style: none;
  gap: 0.25rem;
  padding: 0.25rem;
  flex-wrap: wrap;
  align-items: stretch;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTopLeftBtn = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 0;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(181, 181, 181, 1);
  border-radius: 0.5rem;
  text-decoration: none;
  width: 100%;
  height: 1.75rem;
  min-width: 100%;
  margin-top: 0.0625rem;
  margin-bottom: calc(0.0625rem * -1);
  outline: none;
  text-align: center;
  white-space: nowrap;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const ProTopLeftSp = styled.span`
  font-size: 0.85rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
  }
`;
export const ProTopRightTo = styled.div`
  position: relative;
  right: 0;
  top: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTopPlus = styled.div`
  cursor: default;
  color: rgba(181, 181, 181, 1);
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 2rem;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: transparent;
  text-decoration: none;
  height: 1.75rem;
  min-width: 100%;
  margin-top: 0.0625rem;
  margin-bottom: calc(0.0625rem * -1);
  outline: none;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
  }
`;

export const ProPlus = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const ProUpDow = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const ProFilter = styled.img`
  width: 20px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const ArrowDir = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;
export const ProTopRi = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0.375rem 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ProTopRiDiv = styled.div`
  display: block;
  unicode-bidi: isolate;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const ProTopRiBtn = styled.button`
  display: flex;
  outline: 0;
  position: relative;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(181, 181, 181, 1);
  box-shadow: none;
  user-select: none;
  pointer-events: none;
  all: unset;
  box-sizing: border-box;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.25rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const ProBot = styled.div`
  background-color: rgba(247, 247, 247, 1);
  box-shadow: initial;
  border-color: initial;
  border-style: initial;
  border-block-start-width: 0;
  border-block-end-width: 0;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  color: #000#;
  min-height: initial;
  min-width: initial;
  max-width: initial;
  outline-color: initial;
  outline-style: initial;
  overflow-x: initial;
  overflow-y: initial;
  width: initial;
  padding: 2rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MarketBot = styled.div`
  background-color: rgba(248, 247, 255, 1);
  box-shadow: initial;
  border-color: initial;
  border-style: initial;
  border-block-start-width: 0;
  border-block-end-width: 0;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  color: #000#;
  min-height: initial;
  min-width: initial;
  max-width: initial;
  outline-color: initial;
  outline-style: initial;
  overflow-x: initial;
  overflow-y: initial;
  width: initial;
  padding: 2rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBo = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBott = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: initial, initial, initial, 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const ProBottHe = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;

export const ProBottPa = styled.p`
  font-size: 0.85rem;
  font-weight: 450;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBottDiv = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBottSp = styled.span`
  font-size: 0.75rem;
  font-weight: 550;
  @media screen and (max-width: 768px) {
  }
`;

export const ProBottBtn = styled.button`
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const ProMid = styled.div`
  padding: 2rem;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ProMidSub = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const ProMidStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const ProMidTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const ProMidImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;

  @media screen and (max-width: 768px) {
  }
`;

export const ProMidHe = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const ProMidPa = styled.p`
  font-size: 1rem;
  font-weight: 450;
  @media screen and (max-width: 768px) {
  }
`;

export const AbaMidPa = styled.p`
  font-size: 1.1rem;
  font-weight: 450;
  @media screen and (max-width: 768px) {
  }
`;

export const ProBtnWr = styled.div`
  padding: 10px 10px 0 0;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBtnFl = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 768px) {
  }
`;

export const ProBtnLe = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 1.75rem;
  min-height: 1.75rem;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(
      180deg,
      rgba(48, 48, 48, 0) 63.53%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    rgba(48, 48, 48, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset,
    0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset,
    0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  margin-left: 12px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const ProBtnSp = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;
export const ProBtnRi = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 1.75rem;
  min-height: 1.75rem;
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const InputSpan = styled.span`
  display: flex;
  margin-block: 0.0625rem;
  margin-inline: 0.0625rem calc(0.25rem - 0.0625rem);
  pointer-events: none;
  @media screen and (max-width: 768px) {
  }
`;

export const InputImg = styled.img`
  width: 18px;
  height: 18px;
  @media screen and (max-width: 768px) {
  }
`;

export const InputSpa = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifWr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifCon = styled.div`
  margin-left: 0.5rem;
  z-index: 1;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifSub = styled.div`
  z-index: 1;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifStore = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  min-width: 2.25rem;
  cursor: pointer;
  background: none;
  border-radius: 0.75rem;
  border: none;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifBtnDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

export const NotDiv = styled.div`
  background: rgba(37, 232, 43, 1);
  color: rgba(3, 61, 5, 1);
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  margin-left: 5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const NotSpan = styled.span`
  font-size: 0.7rem;

  @media screen and (max-width: 768px) {
  }
`;

export const NotSp = styled.span`
  font-size: 0.75rem;
  font-weight: 550;

  @media screen and (max-width: 768px) {
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  flex-direction: column;
`;
export const ModalClose = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
export const ModalImg = styled.img`
  width: 50px;
`;

export const ModalContainer = styled.div`
  background: #fff; /* white card */
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  text-align: center;
`;

export const StoreInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #007bff;
  color: #fff;
  &:hover {
    background: #0056b3;
  }
`;

export const MarketTop = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const MarketTopBtn = styled.button`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.25rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
`;

export const MarketMid = styled.div`
  display: flex;
  justify-content: center;
`;

export const MarketMidImg = styled.img`
  width: 15px;
  height: 15px;
`;

export const SearWr = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  font-size: 0.8125rem;
  border-style: solid;
  border-color: rgba(138, 138, 138, 1);
  border-width: 0.04125rem;
  border-radius: 0.5rem;
  letter-spacing: initial;
  width: 100%;
`;

export const SearCon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  font-size: 0.8125rem;
  border-style: solid;
  border-color: rgba(138, 138, 138, 1);
  border-width: 0.04125rem;
  border-radius: 0.5rem;
  letter-spacing: initial;
  width: 100%;
`;

export const SearLe = styled.div`
  margin-right: 0.5rem;
  margin-right: 0.25rem;
  font-size: 0.8125rem;
  pointer-events: none;
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  color: rgba(97, 97, 97, 1);
  user-select: none;
`;

export const SearLeImg = styled.img`
  width: 18px;
  height: 18px;
`;

export const SearLeIn = styled.input`
  display: flex;
  outline-offset: 0;
  min-height: 1.75rem;
  padding-block: 0.125rem;
  border: none;
  padding-left: 0;
  font-size: 0.8125rem;
  flex: 1 1;
  width: 100%;
  min-width: 0;
  caret-color: rgba(48, 48, 48, 1);
  padding: 0.375rem 0.75rem;
  background: none;
  appearance: none;
  color: rgba(48, 48, 48, 1);
  align-items: center;
  font-weight: 450;
  position: relative;
  z-index: 20;
  width: 100%;
`;

export const SearSha = styled.div`
  outline-offset: 0;
  min-height: 1.75rem;
  padding-block: 0.125rem;
  border: none;
  border-radius: 0.5rem;
  pointer-events: none;
  position: relative;
  z-index: 10;
  background-color: rgba(253, 253, 253, 1);
`;

export const MarkMid = styled.div`
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
`;

export const MarkTable = styled.table`
  width: 100%;
  min-width: 100%;
  border-collapse: collapse;
`;

export const MarkTabHe = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;

  border-spacing: 2px;
`;

export const MarkTabBod = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const BodyBod = styled.tr`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const MarkTabTr = styled.tr`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
`;

export const MarkTh = styled.th`
  position: sticky;
  left: 0;
  z-index: 29;
  position: sticky;
  padding: 0.5rem 0.375rem;
  padding-right: 1rem;
  background-color: rgba(247, 247, 247, 1);
  text-align: left;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  white-space: nowrap;
  border: 0;
`;

export const MarkBtnWr = styled.div`
  text-align: left;
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text-secondary);
  font-size: var(--p-font-size-300);
  white-space: nowrap;
`;
export const MarkBtnCon = styled.div`
  display: flex;
`;

export const MarkBtn = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  outline: 0;
  position: relative;
`;

export const MarkBtnSp = styled.span`
  font-size: 0.875rem;
  font-weight: 550;
`;

export const MarkTw = styled.th`
  padding: 0.5rem 0.375rem;
  text-align: right;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  white-space: nowrap;
  border: 0;
  background-color: rgba(247, 247, 247, 1);
`;

export const MarkTwDiv = styled.div`
  padding-right: 0;
`;

export const BodyWr = styled.tr`
  border-top: 0.0625rem solid rgba(227, 227, 227, 1);
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  padding: 0.375rem;
`;

export const BodyTh = styled.td`
  position: sticky;
  left: 0;
  z-index: 29;
  position: sticky;
  padding: 0.5rem 0.375rem;
  padding-right: 1rem;
  background-color: ${(props) => props.background || "rgba(255, 255, 255, 1)"};
  text-align: left;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  white-space: nowrap;
  border: 0;
`;

export const BodyBtnWr = styled.div`
  text-align: left;
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text-secondary);
  font-size: var(--p-font-size-300);
  white-space: nowrap;
`;
export const BodyBtnCon = styled.div`
  display: flex;
`;

export const BodyBtn = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  outline: 0;
  position: relative;
`;

export const BodyBtnSp = styled.span`
  font-size: 0.875rem;
  font-weight: 550;
`;

export const BodyTw = styled.td`
  padding: 0.5rem 0.375rem;
  text-align: right;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  white-space: nowrap;
  border: 0;
  background-color: ${(props) => props.background || "rgba(255, 255, 255, 1)"};
  width: 100%;
`;

export const BodyTwDiv = styled.div`
  padding-right: 0;
`;

export const BodyBtSp = styled.span`
  font-size: 0.875rem;
  font-weight: 550;
  margin-left: 0.4rem;
`;

export const BodyImg = styled.img`
  width: 15px;
  height: 15px;
`;

export const BodyBot = styled.tr`
  background-color: rgba(248, 247, 255, 1);
  cursor: pointer;
  border-top: 0.0625rem solid rgba(235, 235, 235, 1);
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
  text-indent: initial;
  border-spacing: 2px;
  @media screen and (max-width: 768px) {
  }
`;

export const BodyRiBtn = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
  color: rgba(97, 97, 97, 1);
  font-size: 0.75rem;
  outline: 0;
  position: relative;
`;

export const BodyRiBtnSp = styled.span`
  font-size: 0.875rem;
  font-weight: 550;
  color: rgba(87, 0, 209, 1);
`;

export const BodyRiBtnSpa = styled.span`
  font-size: 0.875rem;
  font-weight: 550;
  color: rgba(0, 91, 211, 1);
`;

export const RepBtn = styled.button`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(
      180deg,
      rgba(48, 48, 48, 0) 63.53%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    rgba(48, 48, 48, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset,
    0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset,
    0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const RepExBtn = styled.button`
  all: unset;
  height: calc(1.5rem + 0.25rem);
  width: calc(1.5rem + 0.25rem);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  background: rgba(227, 227, 227, 1);
  border: none;
  border-radius: 0.5rem;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const RepSub = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepDiv = styled.div`
  flex: 0 0 auto;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBot = styled.div`
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepDate = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.6rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepTod = styled.div`
  position: relative;
  display: flex;
  @media screen and (max-width: 768px) {
  }
`;

export const RepTodBtn = styled.button`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  padding-left: calc(0.75rem * 0.5);
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepTodSp = styled.span`
  font-size: 0.85rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const RepMain = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepTop = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepTopDiv = styled.div`
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const RepTopSta = styled.div`
  height: 2954px;
  min-height: calc(100vh - 275px);
  position: relative;
  transition: height 0.2s ease;

  @media screen and (max-width: 768px) {
  }
`;

export const RepSec = styled.div`
  width: 221px;
  height: 74px;
  position: absolute;
  transform: ${(props) => props.transformLoc || "translate(0px, 0px)"};
  transition: none;

  @media screen and (max-width: 768px) {
  }
`;

export const RepSecFi = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const RepSecBtn = styled.button`
  background: unset;
  border: unset;
  text-align: unset;
  color: unset;
  text-decoration: unset;
  display: block;
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBtnDiv = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  border-radius: 0.5rem;
  text-align: unset;
  color: unset;
  cursor: pointer;
  font-size: 0.8125rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBtnSec = styled.div`
  height: 100%;
  padding: 0 2rem 1rem 2rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBtnFl = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepFl = styled.div`
  @media screen and (max-width: 768px) {
  }
`;

export const RepFlex = styled.div`
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  min-height: 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
  }
`;

export const RepFlTop = styled.div`
  padding: 1rem 0 1rem 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportWr = styled.div`
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  min-height: 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportLine = styled.div`
  width: 100%;
  max-width: 5rem;
  min-width: 0;
  align-items: end;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportLin = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 0.75rem;
  background: transparent;
  padding: 0px;
  border-radius: 0px;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportLi = styled.div`
  height: 100%;
  min-height: 20px;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportLiFi = styled.div`
  display: flex;
  flex-direction: column;
  height: 20px;
  width: 80px;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportImg = styled.img`
  height: 20px;
  width: 20px;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportText = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportTe = styled.div`
  min-width: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportPa = styled.p`
  font-size: 0.875rem;
  color: rgba(48, 48, 48, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
  }
`;

export const ReportTex = styled.div`
  display: flex;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBott = styled.div`
  position: absolute;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBotPa = styled.p`
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const RepBotto = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.25rem;
  width: auto;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalWr = styled.div`
  width: 615px;
  height: 389px;
  position: absolute;
  transform: translate(153px, 110px);

  @media screen and (max-width: 768px) {
  }
`;

export const AnalCon = styled.div`
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalSub = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalMain = styled.div`
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  border-radius: initial;
  overflow: clip;
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalPad = styled.div`
  height: 100%;
  padding: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalFl = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTop = styled.div`
  display: block;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopBtn = styled.button`
  background: unset;
  border: unset;
  text-align: unset;
  color: unset;
  text-decoration: unset;
  display: block;
  height: 100%;
  padding: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopPad = styled.div`
  padding-inline-end: initial, initial, initial, 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopFl = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopGr = styled.div`
  flex-grow: 1;
  min-width: 0;
  min-height: 1.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopGrBtn = styled.button`
  padding: 0;
  margin-left: 0;
  display: inline-block;
  align-items: center;
  text-align: left;
  max-width: 100%;
  cursor: pointer;
  border: none;
  background: transparent;
  color: unset;
  vertical-align: top;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalTopGrHe = styled.h2`
  font-size: 0.8125rem;
  color: rgba(48, 48, 48, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;

export const AnalGrSp = styled.span`
  border-bottom: 0.125rem dotted rgba(204, 204, 204, 1);
  border-color: rgba(204, 204, 204, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const BreakWr = styled.div`
  width: 299px;
  height: 389px;
  position: absolute;
  transform: translate(480px, 110px);

  @media screen and (max-width: 768px) {
  }
`;

export const BreakCon = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: var(--p-space-400);
  flex-grow: 1;
  min-height: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakSub = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakRe = styled.div`
  scrollbar-width: thin;
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 0.25rem;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(247, 247, 247, 1);
  gap: 0.75rem;
  flex-grow: 1;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakLiSp = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakLiSpan = styled.span`
  display: flex;
  flex: none;
  margin-left: auto;
  gap: 0.5rem;
  overflow: hidden;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
  }
`;

export const BreakLiBtn = styled.button`
  text-decoration: none;
  appearance: none;
  display: inline;
  text-align: inherit;
  padding: 0;
  background: none;
  border: 0;
  font-size: 0.8125rem;
  font-weight: inherit;
  color: rgba(0, 91, 211, 1);
  cursor: pointer;
  touch-action: manipulation;
  @media screen and (max-width: 768px) {
  }
`;

export const BreakPrice = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8125rem;
  @media screen and (max-width: 768px) {
  }
`;

export const GraphWr = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  min-height: 0;
  @media screen and (max-width: 768px) {
  }
`;

export const GraphTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const GraphTopCon = styled.div`
  min-width: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const GraphTopPa = styled.p`
  font-size: 1.25rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const GraphBot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const GraphBotWr = styled.div`
  background: transparent;
  padding: 0px;
  border-radius: 0px;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const GraphBotCon = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100px;
  @media screen and (max-width: 768px) {
  }
`;

export const GraphBotSt = styled.div`
  display: flex;
  flex-direction: column;
  height: 289px;
  width: 583px;

  @media screen and (max-width: 768px) {
  }
`;

export const GraWr = styled.div`
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  margin: 16px 4px 0px;
  flex-flow: row;

  @media screen and (max-width: 768px) {
  }
`;

export const GraBtn = styled.button`
  all: unset;
  padding: 0.375rem 0;
  outline: none;
  border: none;
  border-radius: 0.125rem;
  display: flex;
  background: none;
  opacity: 1;
  transition: opacity 100ms;
  padding-left: 0px;
  padding-right: 8px;
  gap: 6px;
  max-width: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const GraBtnImgCon = styled.span`
  height: 12px;
  width: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const GraSp = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.1875rem;
  line-height: 1rem;
  margin: -0.125rem 0;
  white-space: nowrap;
  min-width: 0;
  color: rgb(112, 112, 123);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 11px;

  @media screen and (max-width: 768px) {
  }
`;

export const GraBtnImg = styled.img`
  height: 12px;
  width: 12px;

  @media screen and (max-width: 768px) {
  }
`;

export const AllStart = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #ffffff;
  padding: 20px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        to bottom,
        transparent 0%,
        transparent calc(25% - 1px),
        #f0f0f0 25%,
        #f0f0f0 calc(25% + 1px),
        transparent calc(25% + 1px)
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        transparent calc(50% - 1px),
        #f0f0f0 50%,
        #f0f0f0 calc(50% + 1px),
        transparent calc(50% + 1px)
      ),
      linear-gradient(
        to bottom,
        transparent 0%,
        transparent calc(75% - 1px),
        #f0f0f0 75%,
        #f0f0f0 calc(75% + 1px),
        transparent calc(75% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(12.5% - 1px),
        #f0f0f0 12.5%,
        #f0f0f0 calc(12.5% + 1px),
        transparent calc(12.5% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(25% - 1px),
        #f0f0f0 25%,
        #f0f0f0 calc(25% + 1px),
        transparent calc(25% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(37.5% - 1px),
        #f0f0f0 37.5%,
        #f0f0f0 calc(37.5% + 1px),
        transparent calc(37.5% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(50% - 1px),
        #f0f0f0 50%,
        #f0f0f0 calc(50% + 1px),
        transparent calc(50% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(62.5% - 1px),
        #f0f0f0 62.5%,
        #f0f0f0 calc(62.5% + 1px),
        transparent calc(62.5% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(75% - 1px),
        #f0f0f0 75%,
        #f0f0f0 calc(75% + 1px),
        transparent calc(75% + 1px)
      ),
      linear-gradient(
        to right,
        transparent 0%,
        transparent calc(87.5% - 1px),
        #f0f0f0 87.5%,
        #f0f0f0 calc(87.5% + 1px),
        transparent calc(87.5% + 1px)
      );
    z-index: 1;
  }

  @media screen and (max-width: 768px) {
    padding: 15px 0;
  }
`;

/* Chart line component */
export const ChartLine = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #4a90e2 0%, #4a90e2 100%);
  z-index: 3;

  /* Chart line path for Jun 27, 2025 (solid line) */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #4a90e2;
    border-radius: 1px;
  }

  /* Chart line path for Jun 26, 2025 (dotted line) */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      to right,
      #cccccc 0px,
      #cccccc 4px,
      transparent 4px,
      transparent 8px
    );
    border-radius: 1px;
  }

  @media screen and (max-width: 768px) {
    bottom: 25px;
  }
`;

/* X-axis labels container */
export const XAxisLabels = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 11px;
  color: #999;
  z-index: 2;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0 5px;
  }
`;

/* Individual X-axis label */
export const XAxisLabel = styled.span`
  flex: 1;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

export const YAxisLabels = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 40px;
  width: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 11px;
  color: #999;
  z-index: 2;

  @media screen and (max-width: 768px) {
    left: -35px;
    width: 30px;
    font-size: 10px;
  }
`;

export const YAxisLabel = styled.span`
  display: block;
  text-align: right;
  line-height: 1;
`;

export const AdWr = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
`;

export const AdGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: initial;
`;

export const AdSec = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  border-radius: 0.5rem;
`;

export const AdPad = styled.div`
  padding: 1rem;
`;

export const AdTop = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const AdTopSp = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: 0;
  position: relative;
  border-bottom: 0.125rem dotted rgba(227, 227, 227, 1);
`;

export const AdTopSpan = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  margin: 0;
  text-align: inherit;
`;

export const AdTopBtn = styled.button`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0 0;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  box-shadow: transparent;
  color: rgba(0, 91, 211, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  margin: 0;
  min-height: 1.25rem;
  min-width: 1.25rem;
  outline: 0;
  position: relative;
  justify-content: center;
  text-align: center;
`;

export const AdMid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-block: 0;
  gap: 0.5rem;
  min-height: 2rem;
  justify-content: flex-start;
`;

export const AdBot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const AdBotWr = styled.div`
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  margin: 1rem calc(1rem * -1);
  display: flex;
  margin-bottom: 0.75rem;
`;

export const AdBotCon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: Inter, -apple-system, "system-ui", San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  font-size: 0.75rem;
`;

export const AdBotSub = styled.div`
  height: 100%;
  width: 100%;
  min-height: 40px;
`;

export const AdBotRe = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 286px;
  border-bottom: 0.1px solid #00b2ff;
`;

export const CampWr = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  border-radius: 0.5rem;
`;

export const CampCon = styled.div`
  padding: 2rem;
`;

export const CampCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

export const CampFl = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
`;

export const CampFlImg = styled.img`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
`;

export const CampFlTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 0.25rem;
`;

export const CampFlHe = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const CampFlDiv = styled.div``;

export const CampFlPa = styled.p`
  font-size: 1rem;
  font-weight: 450;
  line-height: 1rem;
`;

export const CampBtnWr = styled.div`
  margin-top: 1rem;
`;

export const CampBtnCon = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;
`;

export const CampBtnBtn = styled.button`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  color: rgba(48, 48, 48, 1);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
`;

export const CampBtnSp = styled.span`
  font-size: 1.1rem;
  font-weight: 550;
`;

export const OverlayRedirect = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
  z-index: 9999;
`;

export const ModalRedirect = styled.div`
  background: #fff;
  padding: 24px 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MessageRedirect = styled.div`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SubMessageRedirect = styled.div`
  color: #777;
  margin-bottom: 16px;
`;

export const ButtonRedirect = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  z-index: 999999;
  transition: background 0.3s ease;
  &:hover {
    background-color: #000;
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem;
`;

export const MainContentArea = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const TopHeaderSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const HeaderFlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin: 0;
`;

export const SaveButton = styled.button`
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
`;

export const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const WhiteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
`;

export const CardHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
`;

export const TwoFieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: ${(props) => props.$marginBottom || "1rem"};
`;

export const InputFieldWrapper = styled.div`
  margin-bottom: ${(props) => props.$marginBottom || "0"};
`;

export const FieldLabel = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #4f4f4f;
`;

export const ProfileImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const ProfileImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
`;

export const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageUploadArea = styled.div`
  flex: 1;
`;

export const UploadLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  border: 2px dashed #d1d5db;
`;

export const UploadHintText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const SmallFieldLabel = styled.label`
  font-size: 0.875rem;
  color: #6b7280;
  display: block;
  margin-bottom: 0.25rem;
`;

export const SelectDropdown = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #4f4f4f;
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #4f4f4f;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  background: #4f4f4f;
`;

export const CheckboxText = styled.span`
  font-weight: ${(props) => (props.$bold ? 700 : 400)};
`;

export const NumberInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #4f4f4f;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HolidayInputRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const DateInputWrapper = styled.div`
  flex: 1;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #4f4f4f;
`;

export const DescriptionInputWrapper = styled.div`
  flex: 2;
`;

export const AddButton = styled.button`
  align-self: flex-end;
  padding: 0.75rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HolidayListSection = styled.div`
  margin-top: 1rem;
`;

export const HolidayListTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

export const HolidayItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const HolidayItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

export const HolidayInfo = styled.div``;

export const HolidayName = styled.span`
  font-weight: 700;
`;

export const HolidayDate = styled.span`
  color: #6b7280;
  margin-right: 1rem;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const RightColumnSticky = styled.div`
  position: sticky;
  top: 2rem;
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const PhonePreviewFrame = styled.div`
  background: #f9fafb;
  border-radius: 20px;
  padding: 1rem;
  max-height: 700px;
  overflow-y: auto;
`;

export const PreviewSection = styled.div`
  padding: ${(props) => props.$padding || "8px 12px"};
`;

export const PreviewTitle = styled.h2`
  font-weight: 900;
  font-size: 24px;
  margin: 8px 0;
`;

export const DoctorInfoRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const DoctorAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  object-fit: cover;
`;

export const DoctorDetails = styled.div``;

export const DoctorName = styled.div`
  font-weight: 900;
`;

export const DoctorSpecialty = styled.div`
  color: #6b7280;
`;

export const RatingRow = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ScheduleHeading = styled.div`
  font-weight: 900;
  margin: 6px 0;
`;

export const ReasonBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReasonText = styled.div`
  font-weight: 700;
`;

export const FeeBox = styled.div`
  margin-top: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
`;

export const NoWorkDaysAlert = styled.div`
  color: #ef4444;
  padding: 1rem;
  text-align: center;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  background: #fff1f2;
  font-weight: 700;
`;

export const DateSlotSection = styled.div`
  margin-top: 12px;
`;

export const DateTitle = styled.div`
  font-weight: 900;
  margin-top: 6px;
`;

export const NoSlotsMessage = styled.div`
  margin-top: 8px;
  padding: 8px 10px;
  border: 1px dashed #e5e7eb;
  border-radius: 10px;
  color: #6b7280;
  font-weight: 700;
`;

export const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
`;

export const TimeSlotButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 900;
  outline: ${(props) => (props.$selected ? "3px solid #1d4ed8" : "none")};
  cursor: pointer;
`;
