import styled from "styled-components";
import Header from "../../assets/make.jpg";
import ArrowCurve from "../../assets/arrowCurve.png";
import { Link, useNavigate } from "react-router-dom";

const MaFirst = styled.div`
  background: #f4f9f7;
  padding: 5rem 4rem 5rem 4rem;
  direction: rtl;
  font-family: "Tajawal", "Arial", sans-serif;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const MaSec = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 83rem;
`;

const MaAll = styled.div`
  background-color: #ddeae5;
  border-radius: 1rem;
  padding: 4rem 3.5rem;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ContentSection = styled.div`
  z-index: 1;
  display: flex;
  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainHeading = styled.h1`
  letter-spacing: -0.75px;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 3.2rem;
  line-height: 1.2;
  color: #000;
  text-align: right;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const SubText = styled.p`
  text-wrap: balance;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
  color: #000;
  text-align: right;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  position: relative;
  color: #000;

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const ButtonSubContainer = styled.div`
  flex-flow: wrap;
  align-items: center;
  display: flex;
`;

const ButtonAt = styled(Link)`
  font-size: 1.125rem;
  line-height: 1.55556;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #2d5a4e;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-family: "Tajawal", "Arial", sans-serif;
  text-decoration: none;
  transition: background-color 0.2s;
  box-shadow: 0 4px 4px -4px #1a1a1929;
  border: none;
  cursor: pointer;
  font-weight: 800;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: #fff;
  }

  &:hover {
    background-color: #255048;
  }

  &:focus {
    outline: none;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

const ImgContainer = styled.div`
  z-index: 0;
  align-self: center;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0% 0% 0% 4rem;

  @media screen and (max-width: 768px) {
    position: relative;
    inset: auto;
    margin-top: 0.2rem;
  }
`;

const ArrowImg = styled.img`
  width: 25px;
  position: absolute;
  top: -2.2rem;
  right: -1.9rem;
  transform: scaleX(-1);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StatText = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  position: relative;
  color: #000;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const LeftDiv = styled.div`
  flex-direction: column;
  width: 50%;
  max-width: 450px;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const ImageSection = styled.img`
  width: 44%;
  box-shadow:
    0 24px 56px #1919180a,
    0 12px 28px #19191808,
    0 8px 14px #19191808;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
  min-width: 380px;
  height: 638px;
  inset: 0% auto 0% 4rem;
  max-width: 576px;
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
  vertical-align: middle;
  border: 0;
  object-position: 50% 20%;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    min-width: auto;
    height: 300px;
    inset: auto;
    margin: 1rem 0 0 0;
    object-position: 50% 20%;
  }
`;

const BadgePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(45, 90, 78, 0.12);
  border: 1px solid rgba(45, 90, 78, 0.22);
  border-radius: 999px;
  padding: 0.45rem 1rem 0.45rem 0.75rem;
  font-size: 1rem;
  color: #1a3d31;
  font-family: "Tajawal", "Arial", sans-serif;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.3;
  margin-top: 1.25rem;
`;

const BadgeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #2d5a4e;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  svg {
    display: block;
  }
`;

/* ── Improved ArrowPara ── */
const ArrowPara = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(45, 90, 78, 0.25);
  border-radius: 999px;
  padding: 0.4rem 1rem 0.4rem 0.85rem;
  font-family: "Tajawal", "Arial", sans-serif;
  font-size: 1.05rem;
  color: #1a3d31;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1.4;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    white-space: normal;
    text-align: right;
    border-radius: 12px;
  }
`;

const ArrowParaIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #2d5a4e;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;

const Very = ({ categoryRef }) => {
  const navigation = useNavigate();
  const handleLocation = (e) => {
    e.preventDefault();
    navigation("/recommendation");
  };

  return (
    <MaFirst>
      <MaSec>
        <MaAll>
          <ContentSection>
            <LeftDiv>
              <MainHeading>
                ابدأ بالاطمئنان
                <br />
                قبل ما تحتاج العلاج
              </MainHeading>

              <SubText>
                كل ما تحتاجه لصحتك
                <br />
                احجز موعدك، وابدا فحصك السنوي
                <br />
                بالتحليل في أقرب مختبر لك
              </SubText>

              <ButtonContainer>
                <ButtonSubContainer>
                  <ButtonAt as="button" onClick={handleLocation}>
                    ابدأ الآن
                  </ButtonAt>
                  <ArrowContainer />
                </ButtonSubContainer>
              </ButtonContainer>

              <StatText>
                <ArrowImg src={ArrowCurve} alt="" />
                <ArrowPara>
                  باقات تبدأ من ٧٥٠ ريال، تشمل التحاليل والتوصيات
                </ArrowPara>
              </StatText>
            </LeftDiv>
          </ContentSection>

          <ImgContainer>
            <ImageSection src={Header} alt="منصة حجز مواعيد" />
          </ImgContainer>
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Very;
