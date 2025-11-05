import React from "react";
import {
  ArContainerF,
  ArContainerFCon,
  ArContainerFHe,
  ArContainerFPara,
  ArContainerS,
  ArContainerSImg,
  ArSubContainerF,
  ArWrapper,
} from "./Article.elements";
import Girl from "../../assets/girl.png";

const Article = () => {
  return (
    <ArWrapper>
      <ArContainerF>
        <ArSubContainerF>
          <ArContainerFCon>سهولة الحجز في مكان واحد</ArContainerFCon>
          <ArContainerFHe>ابدأ رحلتك نحو تنظيم مواعيدك بسهولة</ArContainerFHe>
          <ArContainerFPara>
            احجز مواعيدك بكل سهولة — سواء كانت لمراجعة طبية، جلسة تجميل، استشارة
            عمل، أو حتى تدريب شخصي.
            <br />
            منصتنا تساعدك على العثور على أفضل المتخصصين في أي مجال، ومقارنة
            الخيارات، وتأكيد الحجز في ثوانٍ.
            <br />
            كل ذلك في مكان واحد، بتجربة بسيطة وسريعة تتيح لك التركيز على ما يهمك
            فعلاً.
            <br />
            انضم إلى آلاف المستخدمين الذين ينظمون وقتهم بثقة، ويستمتعون بتجربة
            حجز سلسة ومريحة كل يوم.
          </ArContainerFPara>
        </ArSubContainerF>
      </ArContainerF>
      <ArContainerS>
        <ArContainerSImg src={Girl} alt="منصة حجز المواعيد" />
      </ArContainerS>
    </ArWrapper>
  );
};

export default Article;
