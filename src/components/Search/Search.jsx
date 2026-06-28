import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TopWrapper,
  TopImg,
} from "./Search.elements";
import Hands from "../../assets/hands.png";
import { Search as SearchIconSVG } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const main = ["رعاية طبية منزلية"];
  const cities = ["الرياض"];

  const handleSearch = () => {
    navigate("/recommendation");
  };

  return (
    <ArWrapper>
      <Container>
        <ContentWrapper>
          <TopWrapper>
            <Heading>
              صحتك تبدأ بخطوة احجز <br />
              مع طبيبك في دقائق
            </Heading>
            <TopImg src={Hands} alt="رسم توضيحي ليدين تحملان بطاقة طبية" />
          </TopWrapper>

          <SearchContainer role="search">
            <InputGroup>
              <Label htmlFor="search-input">اختر الخدمة</Label>
              <Input
                as="select"
                id="search-input"
                aria-label="اختر الخدمة"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                style={{
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option value="">نوع الخدمة</option>
                {main.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </Input>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="location-input">الموقع</Label>
              <Input
                as="select"
                id="location-input"
                aria-label="اختر المدينة"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Input>
            </InputGroup>

            <FindButton
              onClick={handleSearch}
              aria-label="ابحث عن الرعاية الصحية بالمعايير المحددة"
            >
              <SearchIconSVG size={20} />
              <span>ابدا الان رعايتك الصحية</span>
            </FindButton>
          </SearchContainer>
        </ContentWrapper>
      </Container>
    </ArWrapper>
  );
};

export default Search;
