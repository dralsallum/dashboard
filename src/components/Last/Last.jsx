import React from "react";
import {
  ArAt,
  ArCon,
  ArHe,
  ArImg,
  ArRe,
  ArUl,
  ArWra,
  CoAt,
  CoCon,
  CoDiv,
  CoImg,
  CoIn,
  CoLa,
  CoRe,
  CoSp,
  CoSub,
  CoTe,
  CoWr,
} from "./Last.elements";
import Puzzle from "../../assets/puzzle.png";
import Stress from "../../assets/stress.png";
import Hill from "../../assets/hill.png";

const quizItems = [
  {
    href: "",
    title: "اختبار تحديد الشخصية",
    imgSrc: Puzzle,
    alt: "",
  },
  {
    href: "",
    title: "اختبار تحديد الوظيفة",
    imgSrc: Stress,
    alt: "",
  },
  {
    href: "",
    title: "نوبات الهلع",
    imgSrc: Hill,
    alt: "",
  },
  {
    href: "",
    title: "المواضيع",
    imgSrc: Stress,
    alt: "",
  },
];

const contentItems = [
  {
    text: "كتبه خبراء في الصحة النفسية وصحفيين",
    imgSrc:
      "https://www.verywellmind.com/static/6.6.0/images/health_experts.svg",
    alt: "",
  },
  {
    text: "مراجعة من خبراء الصحة النفسية",
    imgSrc: "https://www.verywellmind.com/static/6.6.0/images/fact-checked.svg",
    alt: "",
  },
  {
    text: "يتم تحديث المحتوى بانتظام",
    imgSrc: "https://www.verywellmind.com/static/6.6.0/images/update.svg",
    alt: "",
  },
];

const Last = () => {
  return (
    <ArWra>
      <ArCon>
        <ArHe>اختبر نفسك</ArHe>
        <ArUl>
          {quizItems.map((item, index) => (
            <ArAt
              key={index}
              href={item.href}
              className={index === quizItems.length - 1 ? "last-item" : ""}
            >
              <ArRe>{item.title}</ArRe>
              <ArImg src={item.imgSrc} alt={item.alt} />
            </ArAt>
          ))}
        </ArUl>
      </ArCon>
      <CoWr>
        <CoTe>وعدنا لك</CoTe>
        <CoCon>
          <CoRe>
            <CoDiv>محتوانا يساعدك في اتخاذ أفضل القرارات لصحتك النفسية.</CoDiv>
            <CoAt href="">
              <CoSp>اقرأ عن عمليتنا</CoSp>
            </CoAt>
          </CoRe>
          {contentItems.map((item, index) => (
            <CoSub key={index}>
              <CoIn>
                <CoLa>{item.text}</CoLa>
                <CoImg src={item.imgSrc} alt={item.alt} />
              </CoIn>
            </CoSub>
          ))}
        </CoCon>
      </CoWr>
    </ArWra>
  );
};

export default Last;
