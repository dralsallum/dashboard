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

  const main = ["رعاية طبية منزلية", "زيارة العيادة"];
  const cities = ["الرياض", "جدة", "الدمام"];

  const handleSearch = () => {
    const major = specialty.trim() || "all";
    const params = new URLSearchParams();

    if (location.trim()) {
      const locationParts = location.split(",").map((part) => part.trim());
      if (locationParts.length >= 2) {
        params.set("city", locationParts[0]);
        params.set("country", locationParts[1]);
      } else if (locationParts.length === 1) {
        params.set("city", locationParts[0]);
      }
    }

    const queryString = params.toString();
    const path = queryString
      ? `/reservation/${encodeURIComponent(major)}?${queryString}`
      : `/reservation/${encodeURIComponent(major)}`;

    navigate(path);
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
              <Label htmlFor="search-input">بحث</Label>
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
                <option value="">اختر التخصص</option>
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
              <span>ابحث عن رعاية صحية</span>
            </FindButton>
          </SearchContainer>
        </ContentWrapper>
      </Container>
    </ArWrapper>
  );
};

export default Search;
