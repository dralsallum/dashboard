import React from "react";
import Html from "../../assets/page.png";
import styled from "styled-components";
import Animals from "../../assets/fun.png";
import Ask from "../../assets/Ask.png";
import Folder from "../../assets/folder.png";
import Calculator from "../../assets/cal.png";
import Demo from "../../assets/demo.png";
import SignUp from "../../assets/signup.png";
import Docs from "../../assets/docs.png";
import Customer from "../../assets/customer.png";
import Human from "../../assets/human.png";
import Ladder from "../../assets/ladder.png";
import Book from "../../assets/book.png";
import Notification from "../../assets/notification.png";
import Trash from "../../assets/trash.png";
import Stores from "../../assets/stores.png";
import TypeWriter from "../../assets/typewriter.png";
import CharacterPopup from "./Characterpopup";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  inset: 0;
  position: fixed;
  direction: rtl;
`;

const Container = styled.div`
  flex-grow: 1;
  position: relative;
`;

const ConFir = styled.div`
  background-color: rgb(225 215 194 / 1);
  inset: 0;
  position: fixed;
`;

const ConSec = styled.div`
  display: block;
`;

const ConSecSub = styled.div`
  background-image: url(https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_bg_light_03a349af5c.png);
  background-size: 100px 100px;
  background-repeat: repeat;
  opacity: 1;
  inset: 0;
  position: absolute;
`;

const ConSecMa = styled.div`
  position: absolute;
  left: 0;
  bottom: 3rem;
`;

const ImgWr = styled.div`
  height: 700px;
  width: 700px;
  display: inline-block;
`;

const ImgMa = styled.img`
  height: auto;
  max-width: 100%;
  display: block;
  vertical-align: middle;
`;

const NavThi = styled.nav`
  z-index: 102332;
`;

const UlWr = styled.ul`
  display: grid;
  opacity: 1;
  margin: 0;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0;
  gap: 0.5rem;
  list-style-type: none;
`;

const LiWr = styled.li`
  display: flex;
  transform: ${(props) =>
    props.transform || "translate3d(4px, 20px, 0px) scale(1, 1)"};
  opacity: 1;
  transform-origin: 50% 50% 0px;
  user-select: none;
  touch-action: none;
  justify-content: center;
  align-items: center;
  width: 7rem;
  z-index: 10;
  position: absolute;
`;

const LiDiv = styled.div`
  cursor: move;
  position: relative;
`;

const LiSec = styled.div`
  display: inline-flex;
  position: relative;
`;

const LiFig = styled.figure`
  margin: 0;
`;

const LiSp = styled.span``;
const LiAt = styled.a`
  display: inline-flex;
  color: rgb(77 79 70);
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
  max-width: 7rem;
  width: auto;
`;
const LiSpan = styled.span`
  position: relative;
`;
const LiImg = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  display: block;
  vertical-align: middle;
`;
const LabFig = styled.figcaption`
  line-height: 1.25;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2px;
  font-family: "Cairo", "Tajawal", sans-serif;
`;
const LabSp = styled.figcaption`
  display: inline-block;
  line-height: 1.375;
  background-color: rgb(225 215 194);
  text-underline-offset: 3px;
  text-decoration-style: dotted;
  padding: 0 0.125 0 0.125;
  border-radius: 2px;
`;

const Desktop = () => {
  const arr = [
    {
      name: "الصفحة الرئيسية",
      img: Html,
      transform: "translate3d(4px, 20px, 0px) scale(1, 1)",
    },
    {
      name: "نظام المنتجات",
      img: Folder,
      transform: "translate3d(4px, 95px, 0px) scale(1, 1)",
    },
    {
      name: "الأسعار",
      img: Calculator,
      transform: "translate3d(4px, 170px, 0px) scale(1, 1)",
    },
    {
      name: "العملاء",
      img: Customer,
      transform: "translate3d(4px, 245px, 0px) scale(1, 1)",
    },
    {
      name: "العرض التوضيحي",
      img: Demo,
      transform: "translate3d(4px, 320px, 0px) scale(1, 1)",
    },
    {
      name: "الوثائق",
      img: Docs,
      transform: "translate3d(4px, 395px, 0px) scale(1, 1)",
    },
    {
      name: "تحدث مع موظف",
      img: Human,
      transform: "translate3d(4px, 470px, 0px) scale(1, 1)",
    },
    {
      name: "اطرح سؤالاً",
      img: Ask,
      transform: "translate3d(4px, 545px, 0px) scale(1, 1)",
    },
    {
      name: "سجل الآن ↗",
      img: SignUp,
      transform: "translate3d(4px, 620px, 0px) scale(1, 1)",
    },
    {
      name: "لماذا وقتنا",
      img: Ladder,
      transform: "translate3d(-1400px, 20px, 0px) scale(1, 1)",
    },
    {
      name: "سجل التغييرات",
      img: Notification,
      transform: "translate3d(-1400px, 95px, 0px) scale(1, 1)",
    },
    {
      name: "دليل الشركة",
      img: Book,
      transform: "translate3d(-1400px, 170px, 0px) scale(1, 1)",
    },
    {
      name: "المتجر",
      img: Stores,
      transform: "translate3d(-1400px, 245px, 0px) scale(1, 1)",
    },
    {
      name: "اعمل معنا",
      img: TypeWriter,
      transform: "translate3d(-1400px, 320px, 0px) scale(1, 1)",
    },
    {
      name: "سلة المهملات",
      img: Trash,
      transform: "translate3d(-1400px, 395px, 0px) scale(1, 1)",
    },
  ];

  return (
    <Wrapper>
      <Container>
        <ConFir />
        <ConSec>
          <ConSecSub />
          <ConSecMa>
            <ImgWr>
              <ImgMa src={Animals} alt="زخرفة الحيوانات" />
            </ImgWr>
          </ConSecMa>
        </ConSec>
        <NavThi>
          <UlWr>
            {arr.map((item, index) => {
              return (
                <LiWr key={index} transform={item.transform}>
                  <LiDiv>
                    <LiSec>
                      <LiFig>
                        <LiSp>
                          <LiAt>
                            <LiSpan></LiSpan>
                            <LiImg src={item.img} alt={item.name} />
                            <LabFig>
                              <LabSp>{item.name}</LabSp>
                            </LabFig>
                          </LiAt>
                        </LiSp>
                      </LiFig>
                    </LiSec>
                  </LiDiv>
                </LiWr>
              );
            })}
          </UlWr>
        </NavThi>
      </Container>
      <CharacterPopup />
    </Wrapper>
  );
};

export default Desktop;
