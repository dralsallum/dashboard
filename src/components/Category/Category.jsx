import React from "react";
import {
  CategoryContainer,
  CategoryHeader,
  CategoryTitle,
  CategorySubtitle,
  InsuranceSection,
  InsuranceGrid,
  InsuranceCard,
  InsuranceLogo,
  AddInsuranceButton,
  SeeAllLink,
  SpecialtiesSection,
  SpecialtiesTitle,
  SpecialtiesGrid,
  SpecialtyCard,
  SpecialtyIcon,
  SpecialtyName,
} from "./Category.elements";
import PrimaryCare from "../../assets/primaryCare.png";
import Dentist from "../../assets/dentist.png";
import ObGyn from "../../assets/obgyn.png";
import Dermatologist from "../../assets/dermatologist.png";
import Psychiatrist from "../../assets/psychiatrist.png";
import EyeDoctor from "../../assets/eyeDoctor.png";

// Import insurance logos
import AetnaLogo from "../../assets/aetna.png";
import CignaLogo from "../../assets/cigna.png";

import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const insuranceProviders = [
    { name: "أيتنا", logo: AetnaLogo },
    { name: "سيجنا", logo: CignaLogo },
    { name: "يونايتد هيلث كير", logo: AetnaLogo },
    { name: "ميديكير", logo: AetnaLogo },
    { name: "بلو كروس بلو شيلد", logo: AetnaLogo },
  ];

  const specialties = [
    {
      name: "الرعاية الأولية",
      icon: PrimaryCare,
      dir: "/reservation/primaryCare",
    },
    { name: "طبيب أسنان", icon: Dentist, dir: "/reservation/dentist" },
    { name: "طبيب نساء وولادة", icon: ObGyn, dir: "/reservation/ObGyn" },
    {
      name: "طبيب جلدية",
      icon: Dermatologist,
      dir: "/reservation/Dermatologist",
    },
    { name: "طبيب نفسي", icon: Psychiatrist, dir: "/reservation/Psychiatrist" },
    { name: "طبيب عيون", icon: EyeDoctor, dir: "/reservation/EyeDoctor" },
  ];

  const handleNavigate = (nav) => navigate(nav);

  return (
    <CategoryContainer>
      <SpecialtiesSection>
        <SpecialtiesTitle>التخصصات الأكثر بحثاً</SpecialtiesTitle>
        <SpecialtiesGrid>
          {specialties.map((specialty, index) => (
            <SpecialtyCard
              key={index}
              onClick={() => handleNavigate(specialty.dir)}
            >
              <SpecialtyIcon src={specialty.icon} alt={specialty.name} />
              <SpecialtyName>{specialty.name}</SpecialtyName>
            </SpecialtyCard>
          ))}
        </SpecialtiesGrid>
      </SpecialtiesSection>
      <CategoryHeader>
        <CategoryTitle>
          ابحث عن طبيب ضمن شبكة التأمين من بين أكثر من 1000 خطة تأمينية
        </CategoryTitle>
        <CategorySubtitle>
          أضف تأمينك لمشاهدة أطباء الرعاية الأولية ضمن الشبكة
        </CategorySubtitle>
      </CategoryHeader>

      <InsuranceSection>
        <InsuranceGrid>
          {insuranceProviders.map((provider, index) => (
            <InsuranceCard key={index}>
              <InsuranceLogo src={provider.logo} alt={provider.name} />
            </InsuranceCard>
          ))}
          <SeeAllLink>عرض الكل (1,000+)</SeeAllLink>
        </InsuranceGrid>
        <AddInsuranceButton>أضف تغطيتك التأمينية</AddInsuranceButton>
      </InsuranceSection>
    </CategoryContainer>
  );
};

export default Category;
