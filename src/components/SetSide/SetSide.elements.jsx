import styled from "styled-components";

export const NavLeftCon = styled.div`
  width: 30rem;
  height: 100vh;
  z-index: 100;
  background-color: #f1f1f1;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
  }
`;
export const NavLeft = styled.div`
  display: inline-block;
  width: 18rem;
  margin: 5.5rem 3.5625rem 3rem 0;
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 2rem auto;
  }
`;

export const NavTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  background: rgba(243, 243, 243, 1);
  padding: 0.75rem;
  border: 0.0625rem solid 3px;

  @media screen and (max-width: 768px) {
  }
`;

export const NavTopLe = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;

  @media screen and (max-width: 768px) {
  }
`;

export const NavMain = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.0625rem 0rem 0rem #b5b5b5 inset,
    0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset,
    0rem 0.03125rem 0rem 0.09375rem #fff inset;
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
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
  font-size: 1rem;
  font-weight: 550;

  @media screen and (max-width: 768px) {
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
  margin: 0.75rem 0 0;
  padding: 0 0 0.25rem;
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
  margin: 0 0.5rem 0.5rem 0;

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

  &:focus {
    outline: none;
    box-shadow: none;
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
