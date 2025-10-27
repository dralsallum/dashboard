import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

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

export const DesHtmlImg = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;
export const ScheduleImg = styled.img`
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 768px) {
  }
`;
export const ScheduleDiv = styled.div`
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
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

export const StartDiv = styled.div`
  padding: 2rem;
  min-height: 100%;

  @media screen and (max-width: 768px) {
    padding: 1rem;
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

export const OreForm = styled.form`
  @media screen and (max-width: 768px) {
  }
`;

export const OreCon = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: calc(1rem * -1);
  margin-left: calc(1rem * -1);
  @media screen and (max-width: 768px) {
  }
`;

export const DoneCon = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

export const DoneCard = styled.div`
  width: 100%;

  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0 0.03125rem 0.03125rem 0 rgba(0, 0, 0, 0.04),
    0 0 0 0.0625rem rgba(0, 0, 0, 0.06);
`;

export const DoneHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f855a;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.25rem;
`;

export const DoneBody = styled.div`
  background: white;
  padding: 1rem;
`;

export const DoneLink = styled(Link)`
  font-size: 1rem;
  font-weight: 550;
  line-height: 1.25rem;
  color: #2b6cb0;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export const OreLeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem;
  @media screen and (max-width: 768px) {
  }
`;
export const OreLeRe = styled.div`
  min-width: 13.75rem;
  flex: 1 1;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeSp = styled.span`
  font-size: 1rem;
  font-weight: 550;
  line-height: 1.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreLeSta = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeInDiv = styled.div`
  flex: 1 1 auto;
  min-width: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const OreLeSec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeft = styled.div`
  flex: 2 2 30rem;
  min-width: 51%;
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  color: #000;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeSt = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeDiv = styled.div`
  padding: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeStart = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;
export const OreLeInSub = styled.div`
  line-height: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  font-size: 0.8125rem;
  font-weight: 450;
  border: none;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeInSu = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(253, 253, 253, 1);
  border-style: solid;
  border-color: rgba(138, 138, 138, 1);
  border-width: 0.04125rem;
  pointer-events: none;
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreLeIn = styled.input`
  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  color: rgba(48, 48, 48, 1);
  align-items: center;
  display: flex;
  letter-spacing: initial;
  position: relative;
  z-index: 20;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

export const OreRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 1 1 15rem;
  min-width: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const OreRiTop = styled.div`
  background-color: rgba(255, 255, 255, 1);
  outline: 0.0625rem solid transparent;
  overflow: clip;
  border-radius: 0.75rem;
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 768px) {
  }
`;

export const ManRiTop = styled.div`
  background-color: rgba(255, 255, 255, 1);
  outline: 0.0625rem solid transparent;
  overflow: clip;
  border-radius: 0.75rem;
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);
  padding: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiToTi = styled.div`
  padding: 0.5rem 1rem 0;
  padding-top: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiToHe = styled.h2`
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
  text-align: inherit;
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiBo = styled.div`
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  padding: 0.5rem 1rem;
  padding-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OreRiSeDiv = styled.div`
  position: relative;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiSe = styled.select`
  display: flex;

  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  align-items: center;
  font-weight: 450;
  letter-spacing: initial;
  position: relative;
  z-index: 20;
  color: rgba(48, 48, 48, 1);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const OreRiCon = styled.div`
  line-height: 1.25rem;
  font-size: 0.8125rem;
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  padding: 0.375rem 0.5rem 0.375rem 0.75rem;
  border: none;
  letter-spacing: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const OreRiSpan = styled.span`
  flex: 1 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiSp = styled.span`
  display: inline-flex;
  align-items: center;
  color: rgba(138, 138, 138, 1);
  @media screen and (max-width: 768px) {
  }
`;

export const OreRiImg = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const OreBo = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 2 2 30rem;
  min-width: 51%;
  @media screen and (max-width: 768px) {
  }
`;

export const OreBoCon = styled.div`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const OreBoSub = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  border-top: 0;
  @media screen and (max-width: 768px) {
  }
`;

export const OreBoBtnCon = styled.div`
  display: flex;
  justify-content: end;
  @media screen and (max-width: 768px) {
  }
`;

export const OreBoBtn = styled.button`
  all: unset;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  color: rgba(255, 255, 255, 1);
  user-select: none;
  box-shadow: none;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  touch-action: manipulation;
  background: linear-gradient(
      180deg,
      rgba(48, 48, 48, 0) 63.53%,
      rgba(255, 255, 255, 0.15) 100%
    ),
    rgba(48, 48, 48, 1);
  cursor: pointer;

  @media screen and (max-width: 768px) {
  }
`;

export const OreBoBtnSp = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const DesWr = styled.div`
  position: relative;
  border: 0.04125rem solid rgba(138, 138, 138, 1);
  border-radius: 0.5rem;
  overflow: hidden;

  @media screen and (max-width: 768px) {
  }
`;

export const DesWrap = styled.div`
  border-radius: 0 0 0.5rem 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const DesAreaWr = styled.div`
  height: 150px;

  @media screen and (max-width: 768px) {
  }
`;

export const DesArea = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const DesTextarea = styled.textarea`
  font-size: 0.8125rem;
  line-height: 1.25rem;
  height: 100%;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  color: rgba(48, 48, 48, 1);
  align-items: center;
  display: flex;
  letter-spacing: initial;
  position: relative;
  z-index: 20;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const DesIcWr = styled.div`
  position: relative;
  z-index: 10;
  @media screen and (max-width: 768px) {
  }
`;

export const DesIcCon = styled.div`
  padding: 0.25rem;
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  background: rgba(247, 247, 247, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const DesIcFl = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const DesArr = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const DesDiv = styled.div`
  content: "";
  display: block;
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-left: 0.0625rem solid rgba(204, 204, 204, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const DesBtn = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(74, 74, 74, 1);
  border-radius: 0.25rem;
  font-weight: 550;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  outline: 0;
  position: relative;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 768px) {
  }
`;

export const FontBtn = styled.button`
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(74, 74, 74, 1);
  border-radius: 0.25rem;
  font-weight: 550;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  outline: 0;
  position: relative;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const FontFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media screen and (max-width: 768px) {
  }
`;

export const DesLe = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 100%;
  max-width: 100%;
  min-width: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const DesFir = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  gap: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const DesFirSp = styled.span`
  font-weight: 550;
  font-size: 0.75rem;
  color: rgba(74, 74, 74, 1);
  margin-left: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const DesSec = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  gap: 0.5rem;
  margin-left: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const DesSecWr = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  gap: 0.5rem;
  margin-left: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const DesThi = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

export const MedWr = styled.div`
  min-height: 7.5rem;
  padding: 0.0625rem;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: rgba(253, 253, 253, 1);
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MedCon = styled.div`
  flex: 1 1;
  position: relative;
  @media screen and (max-width: 768px) {
  }
`;

export const MedFl = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const MedStart = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.75rem;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
  }
`;

export const MedBtnCon = styled.div`
  position: relative;
  flex: 1 1 auto;
  text-align: center;
  height: 2.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
  }
`;

export const MedBtn = styled.button`
  all: unset;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  min-height: 1.5rem;
  min-width: 1.5rem;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem 0.5rem;
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
  @media screen and (max-width: 768px) {
  }
`;

export const MedBtnSp = styled.span`
  font-size: 0.85rem;
  font-weight: 550;
  line-height: 1rem;
  color: rgba(97, 97, 97, 1);
  margin: 0;
  text-align: inherit;
  @media screen and (max-width: 768px) {
  }
`;

export const MedPara = styled.p`
  font-size: 0.75rem;
  font-weight: 450;
  line-height: 1rem;
  color: rgba(97, 97, 97, 1);
  margin: 0;
  text-align: inherit;
  @media screen and (max-width: 768px) {
  }
`;

export const MedSel = styled.div`
  position: relative;
  flex: 1 1 auto;
  text-align: center;
  height: 2.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
  }
`;

export const MedBtnSel = styled.button`
  all: unset;
  appearance: none;
  display: inline;
  text-align: inherit;
  padding: 0;
  background: none;
  border: 0;
  font-size: inherit;
  cursor: pointer;
  touch-action: manipulation;
  font-weight: 550;
  text-decoration: none;
  @media screen and (max-width: 768px) {
  }
`;

export const CatWr = styled.div`
  all: unset;
  appearance: none;
  display: inline;
  text-align: inherit;
  padding: 0;
  background: none;
  border: 0;
  font-size: inherit;
  cursor: pointer;
  touch-action: manipulation;
  font-weight: 550;
  text-decoration: none;
  @media screen and (max-width: 768px) {
  }
`;

export const CatPara = styled.p`
  overflow-wrap: anywhere;
  word-break: normal;
  font-size: 0.75rem;
  font-weight: 450;
  line-height: 1rem;
  color: rgba(97, 97, 97, 1);
  margin: 0;
  text-align: inherit;
  margin-top: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const CatCon = styled.div`
  margin: calc(0.1875rem * -1);
  padding: 0.1875rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: transparent;

  @media screen and (max-width: 768px) {
  }
`;

export const CatGrid = styled.div`
  position: relative;
  display: grid;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

export const CatGridTop = styled.div`
  position: relative;
  z-index: 100;
  grid-area: 1 / 1;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const CatSub = styled.div`
  position: relative;
  z-index: 100;
  grid-area: 1 / 1;

  @media screen and (max-width: 768px) {
  }
`;

export const CatSu = styled.div`
  opacity: 1;
  z-index: 400;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  bottom: 0.125rem;
  display: grid;
  width: 2.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const CatSuBtn = styled.div`
  all: unset;
  border: none;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  display: grid;
  place-items: center;
  place-content: center;
  border-radius: 0.375rem;
  outline: 0.125rem solid transparent;
  outline-offset: calc(0.125rem * -1);
  opacity: 0.8;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;

export const ManageBtn = styled.button`
  all: unset;
  justify-content: center;
  text-align: center;
  min-height: 1.75rem;
  min-width: 1.75rem;
  margin: calc(0.375rem * -1) calc(0.75rem * -1);
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.375rem 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  box-shadow: transparent;
  color: rgba(0, 91, 211, 1);
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

export const CatDiv = styled.div`
  display: block;
  unicode-bidi: isolate;

  @media screen and (max-width: 768px) {
  }
`;

export const CatGridBot = styled.div`
  z-index: 400;
  position: relative;
  display: grid;
  align-items: center;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  @media screen and (max-width: 768px) {
  }
`;

export const CatGr = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const CatGri = styled.div`
  flex: 1 1 auto;
  min-width: initial;
  z-index: 20;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const CatInpCon = styled.div`
  line-height: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  font-size: 0.8125rem;
  font-weight: 450;
  border: none;

  @media screen and (max-width: 768px) {
  }
`;

export const CatInp = styled.select`
  display: flex;

  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  align-items: center;
  font-weight: 450;
  letter-spacing: initial;
  position: relative;
  z-index: 20;
  color: rgba(48, 48, 48, 1);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;
export const CatOpt = styled.option`
  color: #000;
  @media screen and (max-width: 768px) {
  }
`;

export const ManageSpan = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1rem;

  margin: 0;
  text-align: inherit;
  @media screen and (max-width: 768px) {
  }
`;

export const ManageDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ManDiv = styled.div`
  display: block;
  unicode-bidi: isolate;

  @media screen and (max-width: 768px) {
  }
`;

export const OnlUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 768px) {
  }
`;

export const OnlLi = styled.li`
  padding-bottom: 0.0625rem;
  margin-bottom: 0.0625rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OnlWr = styled.div`
  display: flex;
  gap: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OnlSub = styled.div`
  display: flex;
  gap: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const OnlBtn = styled.button`
  all: unset;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: 30ch;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(0, 0, 0, 0.06);
  text-align: start;
  text-decoration: none;
  color: rgba(48, 48, 48, 1);
  border: 0.0625rem solid rgba(0, 0, 0, 0);
  padding: 0.5rem 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const OnlSp = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 450;
  color: rgba(48, 48, 48, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeWr = styled.div`
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  padding: 0.5rem 1rem;
  padding-bottom: ${(props) => props.PaddingBottom || "0.5rem"};
  @media screen and (max-width: 768px) {
  }
`;

export const TypeCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeStart = styled.div`
  min-width: 13.75rem;
  flex: 1 1;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeInpWr = styled.div`
  display: contents;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeInpCon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeBox = styled.div`
  font-weight: 450;
  border: none;
  letter-spacing: initial;
  font-size: 0.8125rem;
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeBoxIn = styled.input`
  font-size: 0.8125rem;
  line-height: 1.25rem;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  color: rgba(48, 48, 48, 1);
  align-items: center;
  z-index: 20;

  @media screen and (max-width: 768px) {
  }
`;

export const TypeBoxBo = styled.div`
  border-radius: 0.5rem;
  pointer-events: none;
  border-width: 0.04125rem;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(253, 253, 253, 1);
  border-style: solid;
  border-color: rgba(138, 138, 138, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const PriWr = styled.div`
  margin: 1rem 0;

  @media screen and (max-width: 768px) {
  }
`;

export const PriCon = styled.div`
  border-radius: 0.75rem;
  box-shadow: 0rem 0.3125rem 0.3125rem -0.15625rem rgba(0, 0, 0, 0.03),
    0rem 0.1875rem 0.1875rem -0.09375rem rgba(0, 0, 0, 0.02),
    0rem 0.125rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.02),
    0rem 0.0625rem 0.0625rem -0.03125rem rgba(0, 0, 0, 0.03),
    0rem 0.03125rem 0.03125rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 1);
  outline: 0.0625rem solid transparent;
  overflow: clip;

  @media screen and (max-width: 768px) {
  }
`;

export const PriTop = styled.div`
  padding: 0.5rem 1rem 0;
  padding-top: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const PriTopSp = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;

export const PriMid = styled.div`
  padding: 0.5rem 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const PriMidFl = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaWr = styled.div`
  align-self: flex-start;
  margin-top: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaLa = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaLaSpan = styled.span`
  font-size: 0.85rem;
  font-weight: 550;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaRe = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  margin-left: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaMa = styled.span`
  display: flex;
  align-items: flex-start;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaInp = styled.input`
  position: absolute;
  z-index: 0;
  width: 100%;
  opacity: 1;
  margin: 0;
  border: none;
  outline: none;

  @media screen and (max-width: 768px) {
  }
`;

export const ChaInpCon = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* white background */
  border: 1px solid rgba(138, 138, 138, 1); /* gray border */
  box-shadow: none; /* no inset fill */
  border-radius: 0.25rem;
`;

export const ChaInpWhite = styled.span`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0.125rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
  }
`;

export const PriBot = styled.div`
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-top: 0;
  padding: 0.5rem 1rem;
  padding-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MonWr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MonCon = styled.div`
  min-width: 13.75rem;
  flex: 1 1;

  @media screen and (max-width: 768px) {
  }
`;

export const MonGri = styled.div`
  display: grid;
  gap: 1rem;
  align-items: end;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 768px) {
  }
`;

export const MonCol = styled.div`
  @media screen and (max-width: 768px) {
  }
`;

export const MonTop = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

export const MonLab = styled.label`
  font-size: 0.8125rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotWr = styled.div`
  flex: 1 1 auto;
  min-width: initial;
  z-index: 20;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotFl = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: rgba(48, 48, 48, 1);
  cursor: text;
  font-size: 0.8125rem;
  border-radius: 0.5rem;
  border-width: 0.04125rem;
  border-style: solid;
  border-color: rgba(138, 138, 138, 1);
  letter-spacing: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotTag = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  color: rgba(97, 97, 97, 1);
  user-select: none;
  margin-left: 0.1rem;
  margin-right: 0.375rem;
  font-size: 0.8125rem;
  pointer-events: none;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotSelCon = styled.div`
  position: relative;
  z-index: var(--pc-select-content);
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--pg-control-height);
  padding: 0.375rem 0.5rem 0.375rem 0.75rem;
  font-size: 0.8125rem;
  border: none;
  letter-spacing: initial;

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotSel = styled.select`
  font-size: 0.8125rem;
  letter-spacing: initial;
  position: absolute;
  text-rendering: auto;
  top: 0;
  left: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  appearance: none;
  border: none;
  padding: 0.375rem 0.5rem 0.375rem 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const MoSp = styled.span`
  flex: 1 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
  }
`;

export const MoSpa = styled.span`
  display: inline-flex;
  align-items: center;
  color: rgba(138, 138, 138, 1);

  @media screen and (max-width: 768px) {
  }
`;

export const MonBotIn = styled.input`
  font-size: 0.8125rem;
  caret-color: rgba(48, 48, 48, 1);
  flex: 1 1;
  width: 100%;
  min-width: 0;
  min-height: 2rem;
  padding: 0.375rem 0.75rem;
  background: none;
  border: none;
  appearance: none;
  color: rgba(48, 48, 48, 1);
  align-items: center;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
  }
`;
