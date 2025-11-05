import React, { useState, useEffect } from "react";
import {
  ArCon,
  ArCont,
  ArImg,
  ArPa,
  ArSp,
  ArSub,
  ArWra,
  AtAA,
  AtImg,
  AtWr,
  ButLe,
  ButRi,
  ButSp,
  ButWr,
  DotLi,
  DotWr,
} from "./Phone.elements";
import Appstore from "../../assets/appstore.png";
import Googlestore from "../../assets/googlePlay.png";

const Phone = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const articles = [
    {
      text: "احجز موعدك في ثوانٍ",
      subText:
        "من الأطباء إلى صالونات التجميل والاستشارات، احجز موعدك بكل سهولة وفي أي وقت.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/appointment1.png",
    },
    {
      text: "كل خدماتك في مكان واحد",
      subText:
        "تصفح، اختر، واحجز من خلال منصة واحدة تجمع أفضل مقدمي الخدمات حولك.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/appointment2.png",
    },
    {
      text: "بدون مكالمات أو انتظار",
      subText:
        "وفر وقتك واحجز مباشرة عبر التطبيق مع تأكيد فوري للمواعيد وإشعارات تذكير.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/appointment3.png",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + articles.length) % articles.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ArWra>
      <ArCon>
        <ArSub>
          {articles.map((article, index) => (
            <ArCont
              key={index}
              style={{ display: currentIndex === index ? "flex" : "none" }}
            >
              <ArPa>
                {article.text}
                <br />
                <br />
                <ArSp>{article.subText}</ArSp>
              </ArPa>
              <ArImg src={article.imgSrc} alt="عرض المواعيد" />
            </ArCont>
          ))}
        </ArSub>
      </ArCon>

      <ButWr>
        <ButLe onClick={handlePrevious}>
          <ButSp>‹</ButSp>
        </ButLe>
        <ButRi onClick={handleNext}>
          <ButSp>›</ButSp>
        </ButRi>
      </ButWr>

      <DotWr>
        {articles.map((_, index) => (
          <DotLi
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              background: currentIndex === index ? "#ff7143" : "#d6d6ea",
            }}
          />
        ))}
      </DotWr>

      <AtWr>
        <AtAA href="">
          <AtImg src={Appstore} alt="App Store" />
        </AtAA>
        <AtAA href="">
          <AtImg src={Googlestore} alt="Google Play" />
        </AtAA>
      </AtWr>
    </ArWra>
  );
};

export default Phone;
