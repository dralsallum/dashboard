import React from "react";
import {
  BenefitsContainer,
  BenefitsWrapper,
  BenefitsHeading,
  BenefitsGrid,
  BenefitCard,
  IconWrapper,
  BenefitTitle,
  BenefitButton,
  DoctorIcon,
  CalendarIcon,
} from "./Benefits.elements";
import DocFir from "../../assets/docFir.png";
import DocSec from "../../assets/docSec.svg";
import DocThi from "../../assets/docThi.svg";

const Benefits = () => {
  return (
    <BenefitsContainer>
      <BenefitsWrapper>
        <BenefitsHeading>دعنا نجد لك طبيبًا يفهمك</BenefitsHeading>

        <BenefitsGrid>
          <BenefitCard>
            <IconWrapper>
              <DoctorIcon src={DocFir} alt="تصفح الأطباء" />
            </IconWrapper>
            <BenefitTitle>تصفح مقدمي الخدمة الذين يقبلون تأمينك</BenefitTitle>
            <BenefitButton>عرض التخصصات</BenefitButton>
          </BenefitCard>

          <BenefitCard>
            <IconWrapper>
              <DoctorIcon src={DocSec} alt="قراءة التقييمات" />
            </IconWrapper>
            <BenefitTitle>اقرأ تقييمات المستخدمين</BenefitTitle>
            <BenefitButton>عرض مقدمي الخدمة</BenefitButton>
          </BenefitCard>

          <BenefitCard>
            <IconWrapper>
              <CalendarIcon>
                <DoctorIcon src={DocThi} alt="حجز موعد" />
              </CalendarIcon>
            </IconWrapper>
            <BenefitTitle>احجز موعدًا اليوم عبر الإنترنت</BenefitTitle>
            <BenefitButton>عرض المواعيد المتاحة</BenefitButton>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsWrapper>
    </BenefitsContainer>
  );
};

export default Benefits;
