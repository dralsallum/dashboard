import { useState } from "react";
import styled, { keyframes } from "styled-components";
import homeIcon from "../../assets/home.png";
import ordersIcon from "../../assets/orders.png";
import tagIcon from "../../assets/tag.png";
import customersIcon from "../../assets/customers.png";
import customersImage from "../../assets/customerImage.svg";
import contentImage from "../../assets/content.svg";
import discountImage from "../../assets/discount.svg";
import marketingIcon from "../../assets/marketing.png";
import discountsIcon from "../../assets/discount.png";
import contentIcon from "../../assets/content.png";
import filterIcon from "../../assets/filter.png";
import marketsIcon from "../../assets/markets.png";
import analyticsIcon from "../../assets/analytics.png";
import storeIcon from "../../assets/store.png";
import plusIcon from "../../assets/plus.png";
import plusGrayIcon from "../../assets/plusGray.png";
import productsItem from "../../assets/products.svg";
import copyIcon from "../../assets/copy.png";
import crossIcon from "../../assets/cross.png";
import arrowDown from "../../assets/arrowDown.png";
import penIcon from "../../assets/pen.png";
import upDownIcon from "../../assets/upDown.png";
import domesticIcon from "../../assets/domestic.png";
import internationalIcon from "../../assets/international.png";
import paypalIcon from "../../assets/paypal.svg";
import ordersImage from "../../assets/order.png";
import visaIcon from "../../assets/visa.svg";
import madaIcon from "../../assets/mada.jpg";
import settingIcon from "../../assets/setting.png";
import Cup from "../../assets/cup.webp";
import Shoes from "../../assets/shoes.webp";
import Board from "../../assets/board.png";
import Board2 from "../../assets/board2.png";
import Board3 from "../../assets/board3.png";
import Chair from "../../assets/chair.webp";
import logo from "../../assets/drslallum.png";

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

const MaFirst = styled.div`
  background-color: #f1f1f1;
  color: #000;
  overflow: hidden;
  height: 100vh;
  position: relative;
  direction: rtl;

  @media screen and (max-width: 768px) {
  }
`;

const MaSec = styled.div``;

const MaAll = styled.div`
  background-color: rgba(26, 26, 26, 1);
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const ContentSection = styled.div`
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const MainCon = styled.div`
  display: flex;
  background-color: rgba(26, 26, 26, 1);
  width: 100%;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const LogoCon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
  position: fixed;
  top: 0;
  right: 0;
  width: 15rem;
  background-color: rgba(26, 26, 26, 1);
  z-index: 200;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

const LogoSubCon = styled.div`
  z-index: 1;
  cursor: pointer;
  white-space: nowrap;
`;

const LogoImg = styled.img`
  filter: grayscale(0%);
  cursor: pointer;
  transition: transform 0.2s, filter 0.3s;
  width: 5rem;
  height: 1.8rem;
`;

const NavCon = styled.div``;

const MainSubCon = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const StartCon = styled.div`
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

const StartDiv = styled.div`
  padding: 2rem;
  min-height: 100%;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const StartSub = styled.div`
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

const StartRe = styled.div`
  width: calc(100vw - 15rem - 0 - 0 - 0);
  transition: width var(--p-motion-duration-250) var(--p-motion-ease);
  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

const StartSa = styled.div`
  padding: 0 1rem;
  max-width: calc(41.375rem + 20rem + 1rem);
  margin: 0px auto;

  @media screen and (max-width: 768px) {
  }
`;

const StartWa = styled.div`
  padding: 0.5rem 0;

  @media screen and (max-width: 768px) {
  }
`;

const StartLa = styled.div`
  margin-block-start: -1.25rem;
  margin-block-end: initial;
  margin-inline-start: initial;
  margin-inline-end: initial;

  @media screen and (max-width: 768px) {
  }
`;

const StartTop = styled.div`
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

const TopUl = styled.ul`
  box-sizing: content-box;
  max-width: 49.75rem;
  margin: 0 auto;
  list-style-type: none;

  @media screen and (max-width: 768px) {
  }
`;

const TopLi = styled.li`
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const TopStart = styled.div`
  color: rgba(227, 227, 227, 1);
  background-color: #1c2122;
  border-radius: 12px;
  padding: 10px;
  @media screen and (max-width: 768px) {
  }
`;

const TopRe = styled.div`
  color: rgba(227, 227, 227, 1);

  @media screen and (max-width: 768px) {
  }
`;

const TopAt = styled.a`
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

  @media screen and (max-width: 768px) {
  }
`;

const TopSelect = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0rem;
  line-height: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

const TopFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
  }
`;

const TopToo = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

const TopSpan = styled.span`
  font-size: 0.9rem;
  letter-spacing: 0;
  color: #fff;
  font-weight: 450;
  @media screen and (max-width: 768px) {
  }
`;

const TopSp = styled.span`
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  @media screen and (max-width: 768px) {
  }
`;

const TopImg = styled.img`
  width: 25px;
  height: 25px;
  @media screen and (max-width: 768px) {
  }
`;

const TopBtn = styled.button`
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

const TopRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;

  @media screen and (max-width: 768px) {
  }
`;

const TopMore = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
  }
`;

const NavLeft = styled.div`
  position: fixed;
  top: 3.5rem;
  right: 0;
  width: 15rem;
  height: 100vh;
  z-index: 100;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
  }
`;

const NavMain = styled.div`
  display: flex;
  align-items: stretch;
  outline: none;
  width: 100%;
  height: 100%;
  color: #000;
  background-color: #ebebeb;
  border-top-left-radius: 0rem;
  border-top-right-radius: 0.75rem;

  @media screen and (max-width: 768px) {
    position: relative;
    height: auto;
  }
`;

const NavSubMain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
  }
`;

const NavStart = styled.div`
  border-top-left-radius: 0;
  margin-top: 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3.5rem);

  @media screen and (max-width: 768px) {
    margin-top: 0;
    height: auto;
  }
`;

const NavRe = styled.div`
  flex: 1;
  padding: 0.75rem 1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0.75rem;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background-color: #ebebeb;
  scrollbar-width: thin;
  scrollbar-color: rgba(200, 200, 200, 0.5) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.5);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 200, 200, 0.8);
  }

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 1rem;
    overflow: visible;
  }
`;

const ListUl = styled.ul`
  flex: 1 0 auto;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
  }
`;

const ListLi = styled.li`
  padding-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const ListDiv = styled.div`
  padding: 0 calc(0.75rem - 0);

  @media screen and (max-width: 768px) {
  }
`;

const ListBtn = styled.button`
  outline: 0.0625rem solid transparent;
  color: rgba(97, 97, 97, 1);
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const ListSpan = styled.span`
  color: rgba(97, 97, 97, 1);
  text-transform: none;
  font-weight: 600;
`;

const SectionDiv = styled.div`
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const SectionUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 768px) {
  }
`;

const SectionLi = styled.li`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  font-weight: 600;
  color: #000;

  @media screen and (max-width: 768px) {
  }
`;

const SectionAt = styled.button`
  color: #4a4a4a;
  outline: 0.0625rem solid transparent;
  border-radius: 0.5rem;
  display: flex;
  flex-grow: 1;
  align-items: center;
  max-width: 100%;
  padding: 0 0.5rem 0 0.25rem;
  margin: 0;
  background: none;
  border: none;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  text-decoration: none;
  text-align: right;
  appearance: none;
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
    background-color: #fafafa;
    color: rgba(48, 48, 48, 1);
    text-decoration: none;
  }

  &:hover {
    background-color: #fafafa;
    color: rgba(48, 48, 48, 1);
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
  }
`;

const SectionIcon = styled.img`
  flex-shrink: 0;
  align-self: flex-start;
  width: 1.1rem;
  height: 1.1rem;
  margin: 0.25rem 0 0.25rem 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

const StoreSec = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StoreItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const StoreLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const StoreIconImg = styled.img`
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
`;

const StoreLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(97, 97, 97, 1);
`;

const MidWr = styled.div`
  box-sizing: content-box;
  max-width: 49.75rem;
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  margin: 0 auto;
`;

const MidCo = styled.div`
  margin-bottom: 1rem;
`;

const MidUl = styled.ul`
  padding: 0;
  list-style: none;
`;

const MidDiv = styled.div`
  box-sizing: content-box;
  max-width: 49.75rem;
  padding: 0;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const MidStart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem 0;
`;

const MidSe = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: 8px;
`;

const MidThi = styled.div`
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

const MidLa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem;
`;

const MidTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const ChWr = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;
`;

const ChCo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem 0;
`;

const ChHe = styled.h1`
  letter-spacing: 0rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
  text-align: inherit;
`;

const ChBtn = styled.button`
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

const ChSpan = styled.span`
  margin: -0.125rem 0;
  display: inline-flex;
  align-items: center;
`;

const ChImg = styled.img`
  width: 15px;
  height: 15px;
`;

const MidMid = styled.div`
  transition-delay: 0ms;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  max-height: none;
  overflow: visible;
  padding-top: 0px;
  padding-bottom: 0px;
  transition-property: max-height;
`;

const StoWr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  gap: 1rem 0;
`;

const StoTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
`;

const StoBot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
`;

const StoMap = styled.div`
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

const StoBtn = styled.button`
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
`;

const StoSpan = styled.span`
  font-weight: 550;
  font-size: 0.75rem;
  letter-spacing: 0rem;
  line-height: 1rem;
  margin: 0;
  text-align: inherit;
`;

const StoreBot = styled.div`
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

const StoreTop = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StoreHe = styled.h3`
  letter-spacing: 0rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
`;

const StoreMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

const StoreEx = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const StoreBtn = styled.button`
  display: flex;
  all: unset;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const StoreDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
`;

const StoreSp = styled.span`
  font-size: 0.8125rem;
`;

const StoreImg = styled.img`
  display: block;
  height: 1.5rem;
  max-width: ${(props) => props.widthMax || "2.5rem"};
  box-shadow: ${(props) =>
    props.BoxShadow || "0 0 0.25rem 0 rgba(0, 0, 0, 0.17)"};
  border-radius: 0.25rem;
`;
const SiteWr = styled.div`
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

const SiteMid = styled.div`
  padding: 1rem;
  z-index: 520;
  position: relative;
`;

const SiteDes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

const SiteBo = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  z-index: 520;
  position: relative;
`;

const SiteWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SiteSp = styled.span`
  font-size: 0.8125rem;
  letter-spacing: 0rem;
  line-height: 1.25rem;
  font-weight: 600;
`;

const SiteSpa = styled.span`
  font-size: 0.8125rem;
  letter-spacing: 0rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgba(97, 97, 97, 1);
`;

const SiteAt = styled.a`
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

const SiteBtn = styled.button`
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

const SiteDiv = styled.div`
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
    props.background
      ? props.background
      : `linear-gradient(
          180deg,
          rgba(48, 48, 48, 0) 63.53%,
          rgba(255, 255, 255, 0.15) 100%
        ), rgba(48, 48, 48, 1)`};

  border: ${(props) => props.border || "none"};
  border-radius: 0.5rem;

  box-shadow: ${(props) =>
    props.boxShadow
      ? props.boxShadow
      : `0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset,
         0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset,
         0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset`};

  color: ${(props) => props.color || "rgba(255, 255, 255, 1)"};
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

const SiteEx = styled.div`
  margin-bottom: 15rem;
`;

const SiteFir = styled.div`
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

const SiteSec = styled.div`
  z-index: 510;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6.0625rem;
  pointer-events: none;
`;

const SiteThi = styled.div`
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
const SiteSubThi = styled.div`
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
const SiteSuThi = styled.div`
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
const SiteSThi = styled.div`
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

const SiteSubImg = styled.img`
  width: 12.5rem;
  height: 11.25rem;
  user-select: none;
  pointer-events: none;
  object-fit: contain;
`;

const SiteFou = styled.div`
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

const CircleFi = styled.div`
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

const CircleSe = styled.div`
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

const CircleThi = styled.div`
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

const CircleFou = styled.div`
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

const CircleFiv = styled.div`
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

const CircleSi = styled.div`
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

const OreWr = styled.div`
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

const OreCon = styled.div`
  transition: width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);

  height: 100%;

  @media screen and (max-width: 768px) {
  }
`;

const OreSubCon = styled.div`
  max-width: none;

  @media screen and (max-width: 768px) {
  }
`;

const OreTop = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

const OreSubTop = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: normal;
  min-height: 1.75rem;
  min-width: 0;
  flex-wrap: nowrap;

  @media screen and (max-width: 768px) {
  }
`;

const OreSu = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  width: inherit;
  overflow: hidden;

  @media screen and (max-width: 768px) {
  }
`;

const OreDivImg = styled.div`
  padding: 0.25rem;
  border-radius: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

const OreHeDiv = styled.div`
  margin-inline-start: calc(0.125rem * -1);
  padding-inline-start: 0;

  @media screen and (max-width: 768px) {
  }
`;

const OreHe = styled.h1`
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

const OreImg = styled.img`
  width: 20px;
  height: 20px;

  @media screen and (max-width: 768px) {
  }
`;

const OreTopRight = styled.div`
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
const OreTopRi = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
  }
`;
const OreTopFi = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

const OreSubFi = styled.div`
  flex: 0 0 auto;

  @media screen and (max-width: 768px) {
  }
`;

const OreSubBtn = styled.button`
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
const OreSubImg = styled.img`
  width: 15px;
  height: 15px;

  @media screen and (max-width: 768px) {
  }
`;
const OreSpan = styled.span`
  display: inline-flex;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;
const OreSpa = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0rem;
  font-weight: 550;
  margin: 0;
  text-align: inherit;

  @media screen and (max-width: 768px) {
  }
`;
const OreMid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(1rem * -1);
  margin-left: calc(1rem * -1);

  @media screen and (max-width: 768px) {
  }
`;
const OreMidSub = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 1 1 100%;
  min-width: 51%;

  @media screen and (max-width: 768px) {
  }
`;
const OreMidSu = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: initial;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 4rem;

  @media screen and (max-width: 768px) {
  }
`;
const OreFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: initial;

  @media screen and (max-width: 768px) {
  }
`;

const CenterTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

const CenterTopImg = styled.img`
  width: 200px;
  height: 200px;
  transition: opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 100;

  @media screen and (max-width: 768px) {
  }
`;

const CenterBot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

const CenterBotBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

const CenterBotBtn = styled.button`
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

const CenterBotSp = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;

const CenSp = styled.span`
  font-size: 0.9rem;
  letter-spacing: 0rem;
  font-weight: 500;
  text-align: center;

  @media screen and (max-width: 768px) {
  }
`;

const CenDivMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;

  @media screen and (max-width: 768px) {
  }
`;

const CenDiv = styled.div`
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
const CenDivSp = styled.span`
  font-size: 1rem;
  letter-spacing: 0rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

const OreBot = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: 1rem;
  margin-left: 1rem;
  flex: 1 1 100%;

  @media screen and (max-width: 768px) {
  }
`;

const OreBotSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.25rem;
  width: auto;

  @media screen and (max-width: 768px) {
  }
`;

const OreBotBtn = styled.button`
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

const OreBotPa = styled.p`
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

const OreBotSpa = styled.span`
  font-size: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

const ProWr = styled.div`
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

const ProCon = styled.div`
  transition: width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: calc(100vw - 15rem - 0px - 0px - 0);
  @media screen and (max-width: 768px) {
  }
`;

const ProStart = styled.div`
  padding: 0 1rem;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
  }
`;
const ProSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
  margin-top: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;
const ProDiv = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
  }
`;

const ProTop = styled.div`
  height: auto !important;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;
const ProTopSt = styled.div`
  border-bottom: 0.0625rem solid rgba(227, 227, 227, 1);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: rgba(255, 255, 255, 1);

  @media screen and (max-width: 768px) {
  }
`;
const ProTopFl = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 768px) {
  }
`;
const ProTopLe = styled.div`
  flex: 1 1;
  height: 2.75rem;

  @media screen and (max-width: 768px) {
  }
`;

const ProTopLef = styled.div`
  transition: opacity 150ms cubic-bezier(0.25, 0.1, 0.25, 1);
  opacity: 1;
  padding: 5px;

  @media screen and (max-width: 768px) {
  }
`;

const ProTopLeft = styled.div`
  position: relative;
  display: flex;
  padding-right: 0.5rem;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;
const ProTopLeftTo = styled.div`
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

const ProTopLeftBtn = styled.button`
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

const ProTopLeftSp = styled.span`
  font-size: 0.85rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
  }
`;
const ProTopRightTo = styled.div`
  position: relative;
  right: 0;
  top: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
  }
`;

const ProTopPlus = styled.div`
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

const ProPlus = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

const ProUpDow = styled.img`
  width: 15px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

const ProFilter = styled.img`
  width: 25px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;
const ProTopRi = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0.375rem 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

const ProTopRiDiv = styled.div`
  display: block;
  unicode-bidi: isolate;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

const ProTopRiBtn = styled.button`
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

const ProBot = styled.div`
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

const ProBo = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
  }
`;

const ProBott = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: initial;
  gap: initial, initial, initial, 0.25rem;
  @media screen and (max-width: 768px) {
  }
`;

const ProBottHe = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;

const ProBottPa = styled.p`
  font-size: 0.85rem;
  font-weight: 450;

  @media screen and (max-width: 768px) {
  }
`;

const ProBottDiv = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

const ProBottSp = styled.span`
  font-size: 0.75rem;
  font-weight: 550;
  @media screen and (max-width: 768px) {
  }
`;

const ProBottBtn = styled.button`
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

const ProMid = styled.div`
  padding: 2rem;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const ProMidSub = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 768px) {
  }
`;

const ProMidStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

const ProMidTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;

  @media screen and (max-width: 768px) {
  }
`;

const ProMidImg = styled.img`
  overflow-clip-margin: content-box;
  overflow: clip;

  @media screen and (max-width: 768px) {
  }
`;

const ProMidHe = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

const ProMidPa = styled.p`
  font-size: 1rem;
  font-weight: 450;
  @media screen and (max-width: 768px) {
  }
`;

const ProBtnWr = styled.div`
  padding: 10px 10px 0 0;

  @media screen and (max-width: 768px) {
  }
`;

const ProBtnFl = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 768px) {
  }
`;

const ProBtnLe = styled.button`
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

const ProBtnSp = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
  }
`;
const ProBtnRi = styled.button`
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
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("المنتجات");
  const Pages = [
    { text: "الرئيسية", icon: homeIcon },
    { text: "الطلبات", icon: ordersIcon },
    { text: "المنتجات", icon: tagIcon },
    { text: "العملاء", icon: customersIcon },
    { text: "التسويق", icon: marketingIcon },
    { text: "الخصومات", icon: discountsIcon },
    { text: "المحتوى", icon: contentIcon },
    { text: "الأسواق", icon: marketsIcon },
    { text: "التحليلات", icon: analyticsIcon },
  ];

  const handleTab = (item) => {
    setActiveTab(item);
  };

  const Sales = [
    { text: "قنوات البيع", subText: "المتجر الإلكتروني", icon: storeIcon },
    { text: "التطبيقات", subText: "إضافة", icon: plusIcon },
  ];

  const ImgArray1 = [
    { text: "", icon: paypalIcon },
    { text: "", icon: visaIcon },
    { text: "", icon: madaIcon },
  ];
  const ImgArray2 = [
    { text: "", icon: domesticIcon },
    { text: "", icon: internationalIcon },
  ];
  const ImgArray3 = [{ text: "f8u1iq-av.myshopify.com", icon: copyIcon }];

  const renderContent = () => {
    const StoreMapped = ({
      title,
      btnText,
      arrayText,
      subText,
      widthText,
      boxText,
    }) => {
      return (
        <StoMap>
          <StoreTop>
            <StoreHe>{title}</StoreHe>
          </StoreTop>
          <StoreMid>
            <StoreEx>
              {arrayText.map((item, index) => {
                return (
                  <StoreBtn key={index}>
                    <StoreDiv>
                      <StoreSp>{item.text}</StoreSp>
                      <StoreImg
                        widthMax={widthText}
                        BoxShadow={boxText}
                        src={item.icon}
                        alt=""
                      />
                    </StoreDiv>
                  </StoreBtn>
                );
              })}
            </StoreEx>
          </StoreMid>
          <StoreBot>
            <StoBtn href="">
              <StoSpan>{btnText}</StoSpan>
            </StoBtn>
          </StoreBot>
        </StoMap>
      );
    };

    const SiteMapped = ({ imgFirst, imgSec, imgThi, priBtn, secBtn }) => {
      return (
        <SiteWr>
          <SiteFir></SiteFir>
          <SiteSec></SiteSec>
          <SiteThi>
            <SiteSuThi>
              <SiteSubImg src={imgFirst} alt="Shoes" />
            </SiteSuThi>
            <SiteSubThi>
              <SiteSubImg src={imgSec} alt="Cup" />
            </SiteSubThi>
            <SiteSThi>
              <SiteSubImg src={imgThi} alt="Chair" />
            </SiteSThi>
          </SiteThi>
          <SiteFou>
            <CircleFi>
              <CircleSe>
                <CircleThi>
                  <CircleFou>
                    <CircleFiv>
                      <CircleSi></CircleSi>
                    </CircleFiv>
                  </CircleFou>
                </CircleThi>
              </CircleSe>
            </CircleFi>
          </SiteFou>
          <SiteMid>
            <SiteEx></SiteEx>
            <SiteDes>
              <SiteSp>أضف منتجك الأول</SiteSp>
              <SiteWrap>
                <SiteSpa>ابدأ بإضافة منتج وبعض التفاصيل الأساسية.</SiteSpa>
                <SiteSpa>
                  <SiteAt href="">ابدأ بمنتج نموذجي</SiteAt>
                </SiteSpa>
              </SiteWrap>
            </SiteDes>
          </SiteMid>
          <SiteBo>
            <SiteDiv>
              <SiteBtn>
                <SiteSp>{priBtn}</SiteSp>
              </SiteBtn>
            </SiteDiv>
            <SiteDiv
              background="rgba(255, 255, 255, 0.1)"
              boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)"
              color="rgba(48, 48, 48, 1)"
              border="1px solid rgba(0, 0, 0, 0.1)"
            >
              <SiteBtn>
                <SiteSp>{secBtn}</SiteSp>
              </SiteBtn>
            </SiteDiv>
          </SiteBo>
        </SiteWr>
      );
    };

    const ProductProps = ({
      title,
      subTitle,
      imgSrc,
      heText,
      paraText,
      firBtn,
      secBtn,
      exFir,
      exSec,
      exBtn,
      imgSvg,
    }) => {
      return (
        <ProWr>
          <ProCon>
            <ProStart>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={imgSrc} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe>{title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                </OreSubTop>
              </OreTop>
              <ProSub>
                <ProDiv>
                  <ProTop>
                    <ProTopSt>
                      <ProTopFl>
                        <ProTopLe>
                          <ProTopLef>
                            <ProTopLeft>
                              <ProTopLeftTo>
                                <ProTopLeftBtn>
                                  <ProTopLeftSp>{subTitle}</ProTopLeftSp>
                                </ProTopLeftBtn>
                              </ProTopLeftTo>
                              <ProTopRightTo>
                                <ProTopPlus>
                                  <ProPlus src={plusGrayIcon} alt="" />
                                </ProTopPlus>
                              </ProTopRightTo>
                            </ProTopLeft>
                          </ProTopLef>
                        </ProTopLe>
                        <ProTopRi>
                          <span>
                            <ProTopRiDiv>
                              <ProTopRiBtn>
                                <ProFilter src={filterIcon} alt="" />
                              </ProTopRiBtn>
                            </ProTopRiDiv>
                          </span>
                          <ProTopRiDiv>
                            <ProTopRiBtn>
                              <ProUpDow src={upDownIcon} alt="" />
                            </ProTopRiBtn>
                          </ProTopRiDiv>
                        </ProTopRi>
                      </ProTopFl>
                    </ProTopSt>
                  </ProTop>
                  <ProMid>
                    <ProMidSub>
                      <ProMidStart>
                        <ProMidTop>
                          <ProMidHe>{heText}</ProMidHe>
                          <ProMidPa>{paraText}</ProMidPa>
                          <ProBtnWr>
                            <ProBtnFl>
                              <ProBtnLe>
                                <ProBtnSp>{firBtn}</ProBtnSp>
                              </ProBtnLe>
                              <ProBtnRi>
                                <ProBtnSp>{secBtn}</ProBtnSp>
                              </ProBtnRi>
                            </ProBtnFl>
                          </ProBtnWr>
                        </ProMidTop>
                        <ProMidImg src={imgSvg} alt="" />
                      </ProMidStart>
                    </ProMidSub>
                  </ProMid>
                  <ProBot>
                    <ProBo>
                      <ProBott>
                        <ProBottHe>{exFir}</ProBottHe>
                        <ProBottPa>{exSec}</ProBottPa>
                        <ProBottDiv>
                          <ProBottBtn>
                            <ProBottSp>{exBtn}</ProBottSp>
                          </ProBottBtn>
                        </ProBottDiv>
                      </ProBott>
                    </ProBo>
                  </ProBot>
                </ProDiv>
              </ProSub>
            </ProStart>
          </ProCon>
        </ProWr>
      );
    };

    const OrderProps = ({
      title,
      subTitle,
      imgSrc,
      heText,
      paraText,
      firBtn,
      imgImg,
      exFir,
      exSec,
      imgSvg,
    }) => {
      return (
        <OreWr>
          <OreCon>
            <OreSubCon>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={imgSrc} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe> {title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                  <OreTopRight>
                    <OreTopRi>
                      <OreTopFi>
                        <OreSubFi>
                          <OreSubBtn>
                            <OreSpa>{subTitle}</OreSpa>
                            <OreSpan>
                              <OreSubImg src={imgSvg} alt="" />
                            </OreSpan>
                          </OreSubBtn>
                        </OreSubFi>
                      </OreTopFi>
                    </OreTopRi>
                  </OreTopRight>
                </OreSubTop>
              </OreTop>
              <OreMid>
                <OreMidSub>
                  <OreMidSu>
                    <OreFlex>
                      <CenterTop>
                        <CenterTopImg src={imgImg} alt="" />
                      </CenterTop>
                      <CenterBot>
                        <CenDivMain>
                          <CenDiv>
                            <CenDivSp>{heText}</CenDivSp>
                          </CenDiv>
                          <CenSp>{paraText}</CenSp>
                        </CenDivMain>
                        <CenterBotBtnDiv>
                          <CenterBotBtn>
                            <CenterBotSp>{firBtn}</CenterBotSp>
                          </CenterBotBtn>
                        </CenterBotBtnDiv>
                      </CenterBot>
                    </OreFlex>
                  </OreMidSu>
                </OreMidSub>
              </OreMid>
              <OreBot>
                <OreBotSub>
                  <OreBotPa>{exFir}</OreBotPa>
                  <OreBotSpa>
                    <OreBotBtn>{exSec}</OreBotBtn>
                  </OreBotSpa>
                </OreBotSub>
              </OreBot>
            </OreSubCon>
          </OreCon>
        </OreWr>
      );
    };

    switch (activeTab) {
      case "الرئيسية":
        return (
          <StartSub>
            <StartRe>
              <StartSa>
                <StartWa>
                  <StartLa>
                    <StartTop>
                      <div></div>
                    </StartTop>
                    <TopUl>
                      <TopLi>
                        <TopStart>
                          <TopRe>
                            <TopFlex>
                              <TopToo>
                                <div>
                                  <TopMore>
                                    <TopSpan>
                                      <span>
                                        "اختر خطة واحصل على 3 أشهر مقابل 1 ريال
                                        شهريًا
                                      </span>
                                    </TopSpan>
                                  </TopMore>
                                </div>
                                <TopAt href="">
                                  <TopSelect>اختار الخطة</TopSelect>
                                </TopAt>
                              </TopToo>
                              <div>
                                <TopRight>
                                  <TopBtn>
                                    <TopSp>
                                      <TopImg src={crossIcon} alt="" />
                                    </TopSp>
                                  </TopBtn>
                                </TopRight>
                              </div>
                            </TopFlex>
                          </TopRe>
                        </TopStart>
                      </TopLi>
                    </TopUl>
                    <MidWr>
                      <MidCo>
                        <MidUl>
                          <MidDiv>
                            <MidStart>
                              <MidSe>
                                <MidThi>
                                  <MidLa>
                                    <MidTop>
                                      <ChWr>
                                        <ChCo>
                                          <ChHe>غير اسم المتجر</ChHe>
                                          <ChBtn href="">
                                            <ChSpan>
                                              <ChImg src={penIcon} alt="" />
                                            </ChSpan>
                                          </ChBtn>
                                        </ChCo>
                                      </ChWr>
                                    </MidTop>
                                    <MidMid>
                                      <StoWr>
                                        <StoTop>
                                          <SiteMapped
                                            imgFirst={Board}
                                            imgSec={Board2}
                                            imgThi={Board3}
                                            priBtn="تصفح المواقع"
                                            secBtn="اصنع"
                                          />
                                          <SiteMapped
                                            imgFirst={Cup}
                                            imgSec={Shoes}
                                            imgThi={Chair}
                                            priBtn="اضافة المنتجات "
                                            secBtn="استيراد"
                                          />
                                        </StoTop>
                                        <StoBot>
                                          <StoreMapped
                                            title={"أضف طرق الدفع"}
                                            btnText={"تفعيل"}
                                            arrayText={ImgArray1}
                                            widthText={"5rem"}
                                          />
                                          <StoreMapped
                                            title={"راجع أسعار الشحن الخاصة بك"}
                                            btnText={"مراجعة"}
                                            arrayText={ImgArray2}
                                            widthText={"4.5rem"}
                                          />
                                          <StoreMapped
                                            title={"خصص نطاقك"}
                                            btnText={"تخصيص"}
                                            arrayText={ImgArray3}
                                            widthText={"1.5rem"}
                                            boxText={"transparent"}
                                          />
                                        </StoBot>
                                      </StoWr>
                                    </MidMid>
                                  </MidLa>
                                </MidThi>
                              </MidSe>
                            </MidStart>
                          </MidDiv>
                        </MidUl>
                      </MidCo>
                    </MidWr>
                  </StartLa>
                </StartWa>
              </StartSa>
            </StartRe>
          </StartSub>
        );
      case "الطلبات":
        return (
          <>
            <OrderProps
              title="الطلبات"
              subTitle="خيارات اكثر"
              heText="ستظهر طلباتك هنا"
              paraText="للحصول على الطلبات وقبول المدفوعات من العملاء، تحتاج إلى اختيار خطة. سيتم فرض رسوم الخطة عليك فقط بعد انتهاء الفترة التجريبية المجانية"
              firBtn="اختار الخطة"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={ordersImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "المنتجات":
        return (
          <ProductProps
            title="المنتجات"
            subTitle="الكل"
            heText="أضف منتجاتك"
            paraText="ابدأ بتجهيز متجرك بمنتجات سيحبها عملاؤك"
            firBtn="اضافة منتج"
            secBtn="استورد"
            exFir="ابحث عن منتجات لبيعها"
            exSec="اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه"
            exBtn="تصفح تطبيقات توريد المنتجات"
            imgSrc={ordersIcon}
            imgSvg={productsItem}
          />
        );
      case "العملاء":
        return (
          <ProductProps
            title="العملاء"
            subTitle="الكل"
            heText="كل ما يتعلق بالعملاء في مكان واحد"
            paraText="قم بإدارة تفاصيل العملاء، واطّلع على سجل طلباتهم، وقم بتقسيمهم إلى مجموعات"
            firBtn="اضافة عميل"
            secBtn="استيراد العملاء"
            exFir="احصل على عملاء من خلال التطبيقات"
            exSec="نمِّ قائمة عملائك من خلال إضافة نموذج لجمع بيانات العملاء إلى متجرك وحملاتك التسويقية."
            exBtn="اطّلع على التطبيقات الموصى بها"
            imgSrc={tagIcon}
            imgSvg={customersImage}
          />
        );
      case "التسويق":
        return (
          <>
            <div></div>
            <div></div>
          </>
        );
      case "الخصومات":
        return (
          <>
            <OrderProps
              title="الخصومات"
              subTitle="خيارات اكثر"
              heText="إدارة الخصومات والعروض الترويجية"
              paraText="أضف رموز خصم وخصومات تلقائية تُطبق عند إتمام الدفع. يمكنك أيضًا استخدام الخصومات مع الأسعار المقارنة."
              firBtn="انشاء خصومات"
              exFir="اعرف المزيد عن"
              exSec="الخصومات"
              imgSrc={discountsIcon}
              imgImg={discountImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "المحتوى":
        return (
          <>
            <OrderProps
              title="المحتوى"
              subTitle="خيارات اكثر"
              heText="بسّط عملية إنشاء المحتوى باستخدام الكائنات الوصفية"
              paraText="تتيح لك الكائنات الوصفية تجميع الحقول وربطها بمختلف أجزاء متجرك. استخدمها لإنشاء محتوى مخصص أو هياكل بيانات خاصة بك"
              firBtn="اضافة تعديف"
              exFir="اعرف المزيد عن"
              exSec="المحتوى"
              imgSrc={contentIcon}
              imgImg={contentImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "الأسواق":
        return (
          <>
            <div></div>
            <div></div>
          </>
        );
      case "التحليلات":
        return (
          <>
            <div></div>
            <div></div>
          </>
        );
    }
  };

  return (
    <MaFirst>
      <MaSec>
        <MaAll>
          <ContentSection>
            <MainCon>
              <LogoCon>
                <LogoSubCon>
                  <LogoImg src={logo} alt="" />
                </LogoSubCon>
              </LogoCon>
              <NavCon></NavCon>
              <MainSubCon>
                <NavLeft>
                  <NavMain>
                    <NavSubMain>
                      <NavStart>
                        <NavRe>
                          <SectionDiv>
                            <SectionUl>
                              {Pages.map((item, index) => {
                                return (
                                  <SectionLi key={index}>
                                    <SectionAt
                                      onClick={() => handleTab(item.text)}
                                    >
                                      <SectionIcon src={item.icon} />
                                      <span>{item.text}</span>
                                    </SectionAt>
                                  </SectionLi>
                                );
                              })}
                            </SectionUl>
                          </SectionDiv>
                          <ListUl>
                            {Sales.map((item, index) => {
                              return (
                                <ListLi key={index}>
                                  <ListDiv>
                                    <ListBtn>
                                      <ListSpan>{item.text}</ListSpan>
                                      <span>.</span>
                                    </ListBtn>
                                  </ListDiv>
                                  <StoreSec>
                                    <StoreItem>
                                      <StoreLink href="">
                                        <StoreIconImg
                                          src={item.icon}
                                          alt="Online Store"
                                        />
                                        <StoreLabel>{item.subText}</StoreLabel>
                                      </StoreLink>
                                    </StoreItem>
                                  </StoreSec>
                                </ListLi>
                              );
                            })}
                          </ListUl>

                          <StoreSec>
                            <StoreItem>
                              <StoreLink href="">
                                <StoreIconImg
                                  src={settingIcon}
                                  alt="Online Store"
                                />
                                <StoreLabel>الاعدادات</StoreLabel>
                              </StoreLink>
                            </StoreItem>
                          </StoreSec>
                        </NavRe>
                      </NavStart>
                    </NavSubMain>
                  </NavMain>
                </NavLeft>
                <StartCon>
                  <StartDiv>{renderContent()}</StartDiv>
                </StartCon>
              </MainSubCon>
            </MainCon>
          </ContentSection>
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Dashboard;
