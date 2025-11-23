import React from "react";
import {
  AllCategoriesContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  CategoriesGrid,
  CategoryCard,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
  BackButton,
} from "./AllCategories.elements";
import PrimaryCare from "../../assets/primaryCare.png";
import Dentist from "../../assets/dentist.png";
import ObGyn from "../../assets/obgyn.png";
import Dermatologist from "../../assets/dermatologist.png";
import Psychiatrist from "../../assets/psychiatrist.png";
import EyeDoctor from "../../assets/eyeDoctor.png";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const navigate = useNavigate();

  const allSpecialties = [
    {
      name: "طبيب اسرة",
      icon: PrimaryCare,
      dir: "/reservation/طبيب اسرة",
      description: "الرعاية الصحية الشاملة لجميع أفراد الأسرة",
    },
    {
      name: "طبيب أسنان",
      icon: Dentist,
      dir: "/reservation/dentist",
      description: "العناية بصحة الفم والأسنان",
    },
    {
      name: "طبيب جلدية",
      icon: Dermatologist,
      dir: "/reservation/طبيب جلدية",
      description: "علاج الأمراض الجلدية والتجميل",
    },
    {
      name: "طبيب نفسي",
      icon: Psychiatrist,
      dir: "/reservation/طبيب نفسي",
      description: "الصحة النفسية والعلاج السلوكي",
    },
    {
      name: "طبيب تجميل",
      icon: EyeDoctor,
      dir: "/reservation/طبيب تجميل",
      description: "الجراحة التجميلية والإجراءات التجميلية",
    },
    {
      name: "طبيب نساء وولادة",
      icon: ObGyn,
      dir: "/reservation/طبيب نساء وولادة",
      description: "صحة المرأة والحمل والولادة",
    },
    {
      name: "طبيب عيون",
      icon: EyeDoctor,
      dir: "/reservation/طبيب عيون",
      description: "فحص النظر وعلاج أمراض العيون",
    },
    {
      name: "طبيب قلب",
      icon: PrimaryCare,
      dir: "/reservation/طبيب قلب",
      description: "أمراض القلب والأوعية الدموية",
    },
    {
      name: "طبيب عظام",
      icon: PrimaryCare,
      dir: "/reservation/طبيب عظام",
      description: "جراحة العظام والمفاصل",
    },
    {
      name: "طبيب أطفال",
      icon: PrimaryCare,
      dir: "/reservation/طبيب أطفال",
      description: "الرعاية الصحية للأطفال والرضع",
    },
    {
      name: "طبيب أنف وأذن وحنجرة",
      icon: PrimaryCare,
      dir: "/reservation/طبيب أنف وأذن وحنجرة",
      description: "علاج أمراض الأنف والأذن والحنجرة",
    },
    {
      name: "طبيب مسالك بولية",
      icon: PrimaryCare,
      dir: "/reservation/طبيب مسالك بولية",
      description: "أمراض الجهاز البولي والتناسلي",
    },
    {
      name: "طبيب جهاز هضمي",
      icon: PrimaryCare,
      dir: "/reservation/طبيب جهاز هضمي",
      description: "أمراض الجهاز الهضمي والكبد",
    },
    {
      name: "طبيب أعصاب",
      icon: PrimaryCare,
      dir: "/reservation/طبيب أعصاب",
      description: "أمراض الجهاز العصبي والدماغ",
    },
    {
      name: "طبيب باطنة",
      icon: PrimaryCare,
      dir: "/reservation/طبيب باطنة",
      description: "الأمراض الباطنية والمزمنة",
    },
    {
      name: "طبيب تغذية",
      icon: PrimaryCare,
      dir: "/reservation/طبيب تغذية",
      description: "التغذية العلاجية وإدارة الوزن",
    },
    {
      name: "طبيب غدد صماء",
      icon: PrimaryCare,
      dir: "/reservation/طبيب غدد صماء",
      description: "أمراض الغدد والهرمونات",
    },
    {
      name: "طبيب روماتيزم",
      icon: PrimaryCare,
      dir: "/reservation/طبيب روماتيزم",
      description: "أمراض المفاصل والروماتيزم",
    },
    {
      name: "طبيب علاج طبيعي",
      icon: PrimaryCare,
      dir: "/reservation/طبيب علاج طبيعي",
      description: "العلاج الطبيعي والتأهيل",
    },
    {
      name: "طبيب أورام",
      icon: PrimaryCare,
      dir: "/reservation/طبيب أورام",
      description: "علاج السرطان والأورام",
    },
  ];

  const handleNavigate = (nav) => navigate(nav);
  const handleBack = () => navigate(-1);

  return (
    <AllCategoriesContainer>
      <PageHeader>
        <PageTitle>جميع التخصصات الطبية</PageTitle>
        <PageSubtitle>اختر التخصص المناسب لاحتياجاتك الصحية</PageSubtitle>
      </PageHeader>

      <CategoriesGrid>
        {allSpecialties.map((specialty, index) => (
          <CategoryCard
            key={index}
            onClick={() => handleNavigate(specialty.dir)}
          >
            <CategoryIcon src={specialty.icon} alt={specialty.name} />
            <CategoryName>{specialty.name}</CategoryName>
            <CategoryDescription>{specialty.description}</CategoryDescription>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </AllCategoriesContainer>
  );
};

export default AllCategories;
