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
    { name: "الرعاية الأولية", icon: PrimaryCare, dir: "/upload" },
    { name: "طبيب أسنان", icon: Dentist, dir: "/admin" },
    { name: "طبيب نساء وولادة", icon: ObGyn, dir: "/" },
    { name: "طبيب جلدية", icon: Dermatologist, dir: "/" },
    { name: "طبيب نفسي", icon: Psychiatrist, dir: "/" },
    { name: "طبيب عيون", icon: EyeDoctor, dir: "/" },
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
