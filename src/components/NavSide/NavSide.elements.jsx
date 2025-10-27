import styled from "styled-components";

export const NavLeft = styled.div`
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

export const NavMain = styled.div`
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

export const NavSubMain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
  }
`;

export const NavStart = styled.div`
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

export const NavRe = styled.div`
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

export const ListUl = styled.ul`
  flex: 1 0 auto;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const ListLi = styled.li`
  padding-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const ListDiv = styled.div`
  padding: 0 calc(0.75rem - 0);

  @media screen and (max-width: 768px) {
  }
`;

export const ListBtn = styled.div`
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
  outline: none;
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const ListSpan = styled.span`
  color: rgba(97, 97, 97, 1);
  text-transform: none;
  font-weight: 600;
`;

export const SectionDiv = styled.div`
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

export const SectionUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 768px) {
  }
`;

export const SectionLi = styled.li`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  font-weight: 600;
  color: #000;

  @media screen and (max-width: 768px) {
  }
`;

export const SectionAt = styled.button`
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

export const SectionIcon = styled.img`
  flex-shrink: 0;
  align-self: flex-start;
  width: 1.1rem;
  height: 1.1rem;
  margin: 0.25rem 0 0.25rem 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const StoreSec = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StoreItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  display: flex;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StoreLink = styled.button`
  color: #4a4a4a;
  outline: 0.0625rem solid transparent;
  border-radius: 0.5rem;
  display: flex;
  flex-grow: 1;
  align-items: center;
  max-width: 100%;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
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
`;

export const StoreIconImg = styled.img`
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
`;

export const StoreLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(97, 97, 97, 1);
`;

export const TogWr = styled.div`
  flex-basis: 100%;
  margin-left: 0;
  overflow-x: visible;
`;

export const TogCon = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  max-height: none;
  overflow: visible;
`;

export const TogUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 0.5rem;
`;

export const TogLi = styled.li`
  opacity: 1;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

export const TogDiv = styled.div`
  padding: 0 calc(0.75rem - 0px) 0 0.75rem;
  width: 100%;
`;

export const TogStart = styled.div`
  border-top: 0;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  border-radius: 0.5rem;
`;

export const TogBtn = styled.button`
  all: unset;
  appearance: none;
  background: none;
  border: none;
  font-size: inherit;
  line-height: inherit;
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  max-width: 100%;
  padding: 0 0.25rem 0 0.5rem;
  margin: 0;
  color: rgba(48, 48, 48, 1);
  text-decoration: none;
  text-align: left;
  padding-right: calc(1rem + 0.25rem);
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
  width: 100%;

  /* Selected state styling */
  ${(props) =>
    props.$isSelected &&
    `
    background-color: #fafafa;
    color: #1976d2;
    font-weight: bold;
  `}

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#fafafa" : "#f5f5f5")};
  }
`;

export const TogBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TogBtnSp = styled.span`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 450;
  color: rgba(97, 97, 97, 1);
  margin: 0;
  text-align: inherit;
`;
