import {
  ArWrapper,
  Container,
  ContentWrapper,
  Heading,
  SearchContainer,
  InputGroup,
  Label,
  Input,
  FindButton,
  ImageWrapper,
  HandIllustration,
  OrangeHand,
  GreenArm,
  MedicalCard,
  YellowBlob,
  SearchIcon,
  TopWrapper,
  TopImg,
} from "./Search.elelments";
import Hands from "../../assets/hands.png";
import { Search as SearchIconSVG } from "lucide-react";

const Search = () => {
  return (
    <ArWrapper>
      <Container>
        <ContentWrapper>
          <TopWrapper>
            <Heading>
              صحتك تبدأ بخطوة احجز <br />
              مع طبيبك في ثواني
            </Heading>
            <TopImg src={Hands} alt="رسم توضيحي ليدين تحملان بطاقة طبية" />
          </TopWrapper>

          <SearchContainer role="search">
            <InputGroup>
              <Label htmlFor="search-input">بحث</Label>
              <Input
                id="search-input"
                type="text"
                placeholder="اسم التخصص"
                aria-label="ابحث عن حالة، إجراء أو طبيب"
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="location-input">الموقع</Label>
              <Input
                id="location-input"
                type="text"
                placeholder="الرياض، السعودية"
                aria-label="أدخل الموقع"
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="insurance-input">إضافة التأمين</Label>
              <Input
                id="insurance-input"
                type="text"
                placeholder="شركة التأمين والخطة"
                aria-label="أدخل معلومات التأمين"
              />
            </InputGroup>

            <FindButton aria-label="ابحث عن الرعاية الصحية بالمعايير المحددة">
              <SearchIconSVG size={20} />
              <span> ابحث عن رعاية صحية</span>
            </FindButton>
          </SearchContainer>
        </ContentWrapper>
      </Container>
    </ArWrapper>
  );
};

export default Search;
