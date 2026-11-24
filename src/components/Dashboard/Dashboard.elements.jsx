import styled, { css, keyframes } from "styled-components";

/* ============================================================
   Theme
   ============================================================ */

export const theme = {
  primary: "rgb(48, 48, 48)",
  primaryHover: "rgb(26, 26, 26)",
  primarySoft: "rgba(48, 48, 48, 0.3)",
  primaryRing: "rgba(48, 48, 48, 0.15)",
  primaryBorder: "rgba(48, 48, 48, 0.22)",
  primaryTint: "rgba(48, 48, 48, 0.06)",

  shell: "#1a1a1a",
  page: "#f1f1f1",
  surface: "#ffffff",
  surfaceAlt: "#f7f7f7",

  text: "#303030",
  textMuted: "#616161",
  textSubtle: "#8a8a8a",

  border: "#e3e3e3",
  divider: "#ededed",

  success: "#166534",
  successTint: "#dcfce7",
  warning: "#854d0e",
  warningTint: "#fef3c7",
  danger: "#b91c1c",
  dangerTint: "#fee2e2",
  neutral: "#475569",
  neutralTint: "#ededed",

  radius: "12px",
  radiusSm: "8px",
  shadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)",
  headerH: "3.5rem",
  sidebarW: "15rem",
};

const t = theme;

const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${t.primary};
    outline-offset: 2px;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to   { opacity: 1; transform: none; }
`;

const productRotation = keyframes`
  0%, 30%        { opacity: 1; transform: scale(1); }
  33.33%, 96.66% { opacity: 0; transform: scale(0.85); }
  100%           { opacity: 1; transform: scale(1); }
`;

/* ============================================================
   App shell
   ============================================================ */

export const Shell = styled.div`
  direction: rtl;
  height: 100vh;
  overflow: hidden;
  background: ${t.shell};
  color: ${t.text};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export const TopBar = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 516;
  height: ${t.headerH};
  display: grid;
  grid-template-columns: 1fr minmax(0, 40rem) 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0 1.25rem;
  background: ${t.shell};

  @media (max-width: 768px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    padding: 0 0.75rem;
  }
`;

export const Logo = styled.img`
  width: 5rem;
  height: 1.8rem;
  object-fit: contain;
  cursor: pointer;
`;

export const SearchTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.25rem;
  padding: 0 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  background: #303030;
  color: #b5b5b5;
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #3a3a3a;
  }

  ${focusRing}
`;

export const KbdGroup = styled.span`
  display: inline-flex;
  gap: 2px;
  margin-inline-start: auto;
  direction: ltr;
`;

export const Kbd = styled.kbd`
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  display: inline-grid;
  place-items: center;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.08);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const StoreChip = styled.button`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: #e3e3e3;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  ${focusRing}

  @media (max-width: 768px) {
    span:last-child {
      display: none;
    }
  }
`;

export const Avatar = styled.span`
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  background: rgba(37, 232, 43, 1);
  color: rgba(3, 61, 5, 1);
  font-size: 0.7rem;
  font-weight: 700;
`;

export const Body = styled.div`
  display: flex;
  height: 100vh;
  padding-top: ${t.headerH};
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  margin-right: ${t.sidebarW};
  background: ${t.page};
  border-top-left-radius: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-right: 0;
    border-radius: 0;
  }
`;

export const MainInner = styled.div`
  padding: 2rem;
  min-height: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

/* ============================================================
   Layout primitives
   ============================================================ */

export const Page = styled.div`
  width: 100%;
  max-width: ${({ $max = "1200px" }) => $max};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Row = styled.div`
  display: flex;
  align-items: ${({ $align = "center" }) => $align};
  justify-content: ${({ $between }) =>
    $between ? "space-between" : "flex-start"};
  gap: ${({ $gap = "0.5rem" }) => $gap};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  min-width: 0;
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = "1rem" }) => $gap};
  min-width: 0;
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ $gap = "1rem" }) => $gap};
  grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, minmax(0, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(
      ${({ $cols = 3 }) => Math.min($cols, 2)},
      minmax(0, 1fr)
    );
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;

    img {
      margin: 0 auto;
    }
  }
`;

export const Card = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = "0.75rem" }) => $gap};
  padding: ${({ $padding = "1rem" }) => $padding};
  background: ${t.surface};
  border-radius: ${t.radius};
  box-shadow: ${t.shadow};

  ${({ $flush, $overflow }) =>
    $flush &&
    css`
      padding: 0;
      gap: 0;
      overflow: ${$overflow ? "visible" : "hidden"};
    `}
`;

/* ============================================================
   Typography
   ============================================================ */

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: ${t.text};
`;

export const TitleIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: ${({ $size = "1rem" }) => $size};
  font-weight: 700;
  line-height: 1.4;
  color: ${t.text};
`;

export const Text = styled.p`
  margin: 0;
  font-size: ${({ $size = "0.875rem" }) => $size};
  line-height: 1.7;
  color: ${({ $muted }) => ($muted ? t.textMuted : t.text)};
  text-align: ${({ $center }) => ($center ? "center" : "inherit")};
`;

export const CardLabel = styled.span`
  align-self: flex-start;
  padding-bottom: 2px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${t.textMuted};
  border-bottom: 2px dotted ${t.primarySoft};
`;

export const Ellipsis = styled.span`
  display: block;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LinkButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-weight: 600;
  color: ${t.primary};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover {
    color: ${t.primaryHover};
  }

  ${focusRing}
`;

export const Illustration = styled.img`
  display: block;
  width: 100%;
  max-width: ${({ $w = "200px" }) => $w};
  height: auto;
  object-fit: contain;
`;

/* ============================================================
   Buttons
   ============================================================ */

const buttonVariants = {
  primary: css`
    background: ${t.primary};
    border-color: ${t.primary};
    color: #fff;

    &:hover:not(:disabled) {
      background: ${t.primaryHover};
      border-color: ${t.primaryHover};
    }
  `,
  secondary: css`
    background: ${t.surface};
    border-color: ${t.border};
    color: ${t.text};

    &:hover:not(:disabled) {
      background: ${t.primaryTint};
      border-color: ${t.primaryBorder};
      color: ${t.primary};
    }
  `,
  ghost: css`
    background: transparent;
    border-color: transparent;
    color: ${t.textMuted};

    &:hover:not(:disabled) {
      background: ${t.primaryTint};
      color: ${t.primary};
    }
  `,
  danger: css`
    background: ${t.dangerTint};
    border-color: transparent;
    color: ${t.danger};

    &:hover:not(:disabled) {
      filter: brightness(0.96);
    }
  `,
  inverse: css`
    background: #fff;
    border-color: #fff;
    color: ${t.primary};

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.9);
    }
  `,
};

const buttonSizes = {
  sm: { h: "1.75rem", px: "0.625rem", fs: "0.75rem" },
  md: { h: "2rem", px: "0.75rem", fs: "0.8125rem" },
  lg: { h: "2.75rem", px: "1.25rem", fs: "0.9375rem" },
};

export const Button = styled.button`
  ${({ $size = "md", $icon }) => {
    const s = buttonSizes[$size];
    return css`
      height: ${s.h};
      font-size: ${s.fs};
      ${$icon ? `width: ${s.h}; padding: 0;` : `padding: 0 ${s.px};`}
    `;
  }}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border: 1px solid;
  border-radius: ${t.radiusSm};
  font-family: inherit;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ $variant = "secondary" }) => buttonVariants[$variant]}
  ${({ $block }) => $block && "width: 100%;"}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }

  ${focusRing}
`;

export const PlainIconButton = styled.button`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: ${t.radiusSm};
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(127, 127, 127, 0.16);
  }

  ${focusRing}
`;

export const TabChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1.75rem;
  padding: 0 0.75rem;
  border-radius: ${t.radiusSm};
  background: ${t.primaryTint};
  color: ${t.primary};
  font-size: 0.8125rem;
  font-weight: 600;
`;

/* ============================================================
   Status badge
   ============================================================ */

const badgeTones = {
  success: [t.successTint, t.success],
  warning: [t.warningTint, t.warning],
  danger: [t.dangerTint, t.danger],
  neutral: [t.neutralTint, t.neutral],
};

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.5rem;
  padding: 0 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  background: ${({ $tone = "neutral" }) => badgeTones[$tone][0]};
  color: ${({ $tone = "neutral" }) => badgeTones[$tone][1]};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

/* ============================================================
   Modal
   ============================================================ */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.45);
  animation: ${fadeIn} 0.15s ease-out;
`;

export const ModalBox = styled.div`
  direction: rtl;
  width: 100%;
  max-width: ${({ $max = "420px" }) => $max};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: ${t.surface};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  text-align: ${({ $center }) => ($center ? "center" : "start")};
  animation: ${popIn} 0.2s ease-out;
`;

/* ============================================================
   Form controls
   ============================================================ */

const control = css`
  width: 100%;
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid ${t.border};
  border-radius: ${t.radiusSm};
  background: ${t.surface};
  color: ${t.text};
  font: inherit;
  font-size: 0.9375rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${t.textSubtle};
  }

  &:hover {
    border-color: ${t.primaryBorder};
  }

  &:focus {
    outline: none;
    border-color: ${t.primary};
    box-shadow: 0 0 0 3px ${t.primaryRing};
  }
`;

export const Input = styled.input`
  ${control}
`;

export const Select = styled.select`
  ${control}
  cursor: pointer;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
  ${({ $span }) => $span && "grid-column: 1 / -1;"}
`;

export const FieldLabel = styled.span`
  font-size: ${({ $small }) => ($small ? "0.8125rem" : "0.875rem")};
  font-weight: ${({ $small }) => ($small ? 500 : 600)};
  color: ${({ $small }) => ($small ? t.textMuted : t.text)};
`;

export const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: ${t.primary};
    cursor: pointer;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: ${t.primary};
  cursor: pointer;
`;

/* ============================================================
   Home tab
   ============================================================ */

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: ${t.radius};
  background: ${t.primary};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

export const HeroCard = styled(Card)`
  position: relative;
  min-height: 24rem;
  justify-content: flex-end;
  padding: 0;
  overflow: hidden;
`;

export const HeroStage = styled.div`
  position: absolute;
  inset: 0 0 6rem 0;
  display: grid;
  place-items: center;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    width: 26.25rem;
    height: 26.25rem;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle,
      transparent 0 calc(1.25rem - 1px),
      ${t.primarySoft} calc(1.25rem - 1px) 1.25rem
    );
    -webkit-mask-image: radial-gradient(
      circle,
      transparent 6.5rem,
      #000 6.9rem,
      #000 11rem,
      transparent 13.2rem
    );
    mask-image: radial-gradient(
      circle,
      transparent 6.5rem,
      #000 6.9rem,
      #000 11rem,
      transparent 13.2rem
    );
    background-color: ${t.primaryTint};
  }
`;

export const HeroImage = styled.img`
  position: relative;
  z-index: 1;
  grid-area: 1 / 1;
  width: 12.5rem;
  height: 11.25rem;
  object-fit: contain;
  opacity: 0;
  user-select: none;
  animation: ${productRotation} 12s infinite ease-in-out;
  animation-delay: ${({ $delay = 0 }) => $delay}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &:first-of-type {
      opacity: 1;
    }
  }
`;

export const HeroBody = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 4rem 1rem 1rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 40%);
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;

  > * {
    flex: 1;
  }
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 1.75rem;
`;

export const BrandLogo = styled.img`
  display: block;
  height: 1.5rem;
  max-width: ${({ $max = "2.5rem" }) => $max};
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${t.border};
`;

export const DomainPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: ${t.surfaceAlt};
  color: ${t.textMuted};
  font-size: 0.8125rem;
  direction: ltr;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* ============================================================
   Tables
   ============================================================ */

export const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${t.divider};
`;

export const FilterChip = styled.button`
  height: 2rem;
  padding: 0 0.875rem;
  border: 1px solid ${({ $active }) => ($active ? t.primary : t.border)};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? t.primary : t.surface)};
  color: ${({ $active }) => ($active ? "#fff" : t.textMuted)};
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${t.primary};
    color: ${({ $active }) => ($active ? "#fff" : t.primary)};
  }

  ${focusRing}
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  min-height: ${({ $minH = "0" }) => $minH};
`;

export const GridTable = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  min-width: ${({ $minWidth = "1000px" }) => $minWidth};
`;

const cellAlign = ({ $align }) =>
  $align === "center" ? "center" : $align === "end" ? "flex-end" : "flex-start";

export const Th = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: ${cellAlign};
  padding: 0.75rem;
  background: ${t.surfaceAlt};
  border-bottom: 1px solid ${t.border};
  color: ${t.textMuted};
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const Tr = styled.div`
  display: contents;
  cursor: pointer;

  &:hover > * {
    background: ${t.primaryTint};
  }
`;

export const Td = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${cellAlign};
  min-width: 0;
  min-height: 3.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid ${t.divider};
  color: ${t.text};
  font-size: 0.875rem;
  font-weight: ${({ $weight = 400 }) => $weight};
  white-space: nowrap;
  transition: background 0.15s ease;
`;

export const TableMessage = styled.div`
  grid-column: 1 / -1;
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ $error }) => ($error ? t.danger : t.textMuted)};
  font-size: 0.9375rem;
`;

export const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${t.divider};
  border-radius: 0 0 ${t.radius} ${t.radius};
  background: ${t.surfaceAlt};
  color: ${t.textMuted};
  font-size: 0.8125rem;
`;

export const Segmented = styled.div`
  display: inline-flex;
  align-self: flex-start;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 10px;
  background: ${t.surface};
  box-shadow: ${t.shadow};
`;

export const SegmentButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.875rem;
  border: none;
  border-radius: ${t.radiusSm};
  background: ${({ $active }) => ($active ? t.primary : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : t.textMuted)};
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ $active }) => ($active ? t.primary : t.primaryTint)};
    color: ${({ $active }) => ($active ? "#fff" : t.text)};
  }

  ${focusRing}
`;

export const CountPill = styled.span`
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.2)" : t.neutralTint};
  color: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const DetailList = styled.dl`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.5rem 1.25rem;
  margin: 0;
  padding: 1rem;
  border-radius: ${t.radiusSm};
  background: ${t.surfaceAlt};

  dt {
    color: ${t.textMuted};
    font-size: 0.8125rem;
  }

  dd {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  a {
    color: ${t.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th {
    padding: 0.625rem 1rem;
    background: ${t.surfaceAlt};
    border-bottom: 1px solid ${t.border};
    color: ${t.textMuted};
    font-size: 0.8125rem;
    font-weight: 600;
    text-align: start;
    white-space: nowrap;
  }

  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${t.divider};
    white-space: nowrap;
    transition: background 0.15s ease;
  }

  tbody tr:hover td {
    background: ${t.primaryTint};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const SearchField = styled.div`
  position: relative;
  flex: 1;
  min-width: 12rem;

  svg {
    position: absolute;
    top: 50%;
    inset-inline-start: 0.75rem;
    transform: translateY(-50%);
    color: ${t.textSubtle};
    pointer-events: none;
  }

  input {
    ${control}
    height: 2rem;
    padding-inline-start: 2.25rem;
    font-size: 0.8125rem;
  }
`;

/* ============================================================
   Empty / list pages
   ============================================================ */

export const EmptyState = styled(Card)`
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;

  p {
    max-width: 32rem;
  }
`;

export const ListHero = styled.div`
  padding: 2.5rem 2rem;

  @media (max-width: 640px) {
    padding: 2rem 1.25rem;
  }
`;

export const ListPromo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: ${t.surfaceAlt};
  border-top: 1px solid ${t.divider};
`;

/* ============================================================
   Metrics / analytics
   ============================================================ */

export const MetricValue = styled.span`
  font-size: ${({ $big }) => ($big ? "1.5rem" : "1.25rem")};
  font-weight: 700;
  color: ${t.primary};
  font-variant-numeric: tabular-nums;
`;

export const Trend = styled.span`
  width: 20px;
  height: 20px;
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${t.primaryTint};
  color: ${t.textSubtle};
`;

export const Sparkline = styled.svg`
  display: block;
  width: 100%;
  height: 32px;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartArea = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: 220px auto;
  column-gap: 0.75rem;
  row-gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const YLabels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: -0.5em 0;
  color: ${t.textSubtle};
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
`;

export const Plot = styled.div`
  position: relative;
  border-bottom: 1px solid ${t.border};
  background-image: linear-gradient(
    to bottom,
    ${t.divider} 1px,
    transparent 1px
  );
  background-size: 100% 50%;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

export const XLabels = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  color: ${t.textSubtle};
  font-size: 0.75rem;
  white-space: nowrap;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.5rem;
  color: ${t.textMuted};
  font-size: 0.75rem;
`;

export const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  &::before {
    content: "";
    width: 16px;
    border-top: 2px ${({ $dashed }) => ($dashed ? "dashed" : "solid")}
      ${({ $color }) => $color};
  }
`;

export const BreakList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const BreakItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 0.5rem;
  border-bottom: 1px solid ${t.divider};
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  ${({ $total }) =>
    $total &&
    css`
      font-weight: 700;
      color: ${t.primary};
      background: ${t.primaryTint};
      border-radius: ${t.radiusSm};
      border-bottom-color: transparent;
    `}
`;

export const Amount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

/* ============================================================
   Appointment settings (المتجر)
   ============================================================ */

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  align-items: start;
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

export const ProfilePreview = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${t.primaryBorder};
`;

export const ProfilePlaceholder = styled.div`
  width: 88px;
  height: 88px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${t.primaryTint};
  color: ${t.primary};
`;

export const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1.5px dashed ${t.primarySoft};
  border-radius: ${t.radiusSm};
  background: ${t.primaryTint};
  color: ${t.primary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${t.primary};
  }

  input {
    display: none;
  }
`;

export const HolidayRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto;
  align-items: end;
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const HolidayItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${t.divider};
  border-radius: ${t.radiusSm};
  background: ${t.surfaceAlt};
  font-size: 0.875rem;
`;

export const PreviewSticky = styled.div`
  position: sticky;
  top: 0;
`;

export const PhoneFrame = styled.div`
  max-height: 680px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1rem;
  border: 8px solid ${t.text};
  border-radius: 32px;
  background: ${t.surface};
  scrollbar-width: thin;
`;

export const DoctorAvatar = styled.img`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

export const InfoBox = styled.div`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $accent }) => ($accent ? t.primaryBorder : t.border)};
  border-radius: 12px;
  background: ${({ $accent }) => ($accent ? t.primaryTint : t.surface)};
  color: ${({ $accent }) => ($accent ? t.primary : t.text)};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Alert = styled.div`
  padding: 0.875rem;
  border: 1px solid ${t.dangerTint};
  border-radius: 12px;
  background: #fff5f5;
  color: ${t.danger};
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

export const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const Slot = styled.button`
  height: 2.5rem;
  border: 1px solid
    ${({ $selected }) => ($selected ? t.primary : t.primaryBorder)};
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? t.primary : t.surface)};
  color: ${({ $selected }) => ($selected ? "#fff" : t.primary)};
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  direction: ltr;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? t.primaryHover : t.primaryTint};
  }

  ${focusRing}
`;

/* ============================================================
   Customers list (filters, popovers, bulk actions, export)
   ============================================================ */

export const ViewTabs = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem 0;
  border-bottom: 1px solid ${t.divider};
  overflow-x: auto;
  scrollbar-width: none;
`;

export const ViewTab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? t.primary : "transparent")};
  background: none;
  color: ${({ $active }) => ($active ? t.text : t.textMuted)};
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    color: ${t.text};
  }

  ${focusRing}
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${t.divider};
`;

export const BulkBar = styled(FilterBar)`
  min-height: 3.5rem;
  background: ${t.primaryTint};
  font-size: 0.875rem;
`;

export const FilterPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.75rem;
  border: 1px ${({ $active }) => ($active ? "solid" : "dashed")}
    ${({ $active }) => ($active ? t.primary : t.border)};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? t.primaryTint : t.surface)};
  color: ${({ $active }) => ($active ? t.primary : t.textMuted)};
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    border-color: ${t.primary};
    color: ${t.primary};
  }

  ${focusRing}
`;

export const PopoverWrap = styled.div`
  position: relative;
  display: inline-flex;
`;

export const PopoverPanel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  ${({ $align }) =>
    $align === "end" ? "inset-inline-end: 0;" : "inset-inline-start: 0;"}
  z-index: 60;
  min-width: 220px;
  max-height: 320px;
  overflow-y: auto;
  padding: 0.375rem;
  border-radius: ${t.radius};
  background: ${t.surface};
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.14),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  animation: ${popIn} 0.15s ease-out;
`;

export const MenuLabel = styled.div`
  padding: 0.5rem 0.625rem 0.25rem;
  color: ${t.textSubtle};
  font-size: 0.75rem;
  font-weight: 600;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? t.primaryTint : "transparent")};
  color: ${t.text};
  font: inherit;
  font-size: 0.8125rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-align: start;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${t.primaryTint};
  }

  ${focusRing}
`;

export const MenuCheck = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${t.primaryTint};
  }

  input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: ${t.primary};
    cursor: pointer;
  }
`;

export const MenuCount = styled.span`
  margin-inline-start: auto;
  padding-inline-start: 0.5rem;
  color: ${t.textSubtle};
  font-size: 0.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`;

export const MenuEmpty = styled.div`
  padding: 0.75rem;
  color: ${t.textMuted};
  font-size: 0.8125rem;
  text-align: center;
`;

export const MenuFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
  padding: 0.5rem 0.625rem 0.25rem;
  border-top: 1px solid ${t.divider};
  font-size: 0.8125rem;
`;

export const SortHeader = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: none;
  background: none;
  color: ${({ $active }) => ($active ? t.text : "inherit")};
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${t.text};
  }

  ${focusRing}
`;

export const InitialAvatar = styled.span`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${t.primaryTint};
  color: ${t.primary};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const RadioRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${t.border};
  border-radius: ${t.radiusSm};
  font-size: 0.875rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:has(input:checked) {
    border-color: ${t.primary};
    background: ${t.primaryTint};
  }

  input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: ${t.primary};
  }
`;

export const PageSizeSelect = styled.select`
  height: 1.75rem;
  padding: 0 0.5rem;
  border: 1px solid ${t.border};
  border-radius: 6px;
  background: ${t.surface};
  color: ${t.text};
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
`;

/* ============================================================
   Products (list, editor, collections, inventory)
   ============================================================ */

export const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${t.primaryBorder};
  border-radius: ${t.radius};
  background: ${t.surface};
  color: ${t.text};
  font-size: 0.875rem;

  svg {
    flex-shrink: 0;
    color: #f59e0b;
  }
`;

export const Thumb = styled.img`
  width: ${({ $size = 40 }) => $size}px;
  height: ${({ $size = 40 }) => $size}px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: cover;
  background: ${t.surfaceAlt};
  box-shadow: 0 0 0 1px ${t.border};
`;

export const ThumbPlaceholder = styled.span`
  width: ${({ $size = 40 }) => $size}px;
  height: ${({ $size = 40 }) => $size}px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: ${t.surfaceAlt};
  box-shadow: 0 0 0 1px ${t.border};
  color: ${t.textSubtle};
`;

export const StarToggle = styled.button`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ $on }) => ($on ? "#f59e0b" : t.textSubtle)};
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    transform 0.1s ease;

  &:hover:not(:disabled) {
    background: rgba(245, 158, 11, 0.12);
    color: #f59e0b;
  }

  &:active:not(:disabled) {
    transform: scale(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }

  ${focusRing}
`;

export const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  align-items: start;
  gap: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const SubCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${t.border};
  border-radius: ${t.radiusSm};
  background: ${t.surfaceAlt};
`;

export const Textarea = styled.textarea`
  ${control}
  height: auto;
  min-height: 5rem;
  padding: 0.625rem 0.75rem;
  line-height: 1.6;
  resize: vertical;
`;
