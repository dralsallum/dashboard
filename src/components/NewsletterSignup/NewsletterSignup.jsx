import styled from "styled-components";
import { useState } from "react";
import Header from "../../assets/make1.png"; // swap for a relevant newsletter/mail illustration if you have one
import ArrowCurve from "../../assets/arrowCurve.png";
import { publicRequest } from "../../requestMethods"; // adjust relative path to match where requestMethods.js lives

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
    font-size: 2.3rem;
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

const FormContainer = styled.form`
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  position: relative;
  color: #000;
  width: 100%;
  max-width: 420px;

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  min-width: 220px;
  font-size: 1.05rem;
  font-family: "Tajawal", "Arial", sans-serif;
  padding: 0.75rem 1.1rem;
  border-radius: 8px;
  border: 1.5px solid rgba(45, 90, 78, 0.3);
  background-color: #fff;
  color: #000;
  text-align: right;
  direction: ltr; /* email addresses read left-to-right even in RTL layout */
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #6b7d76;
    text-align: right;
  }

  &:focus {
    border-color: #2d5a4e;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  font-size: 1.125rem;
  line-height: 1.55556;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #2d5a4e;
  border-radius: 8px;
  padding: 0.75rem 1.4rem;
  font-family: "Tajawal", "Arial", sans-serif;
  text-decoration: none;
  transition: background-color 0.2s;
  box-shadow: 0 4px 4px -4px #1a1a1929;
  border: none;
  cursor: pointer;
  font-weight: 800;

  &:hover:not(:disabled) {
    background-color: #255048;
  }

  &:disabled {
    background-color: #7a9c92;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
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
  width: 100%;

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
    font-size: 0.8rem;
    white-space: normal;
    text-align: right;
    border-radius: 12px;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: ${(props) =>
    props.$variant === "error"
      ? "rgba(196, 68, 68, 0.12)"
      : "rgba(45, 90, 78, 0.12)"};
  border: 1px solid
    ${(props) =>
      props.$variant === "error"
        ? "rgba(196, 68, 68, 0.28)"
        : "rgba(45, 90, 78, 0.22)"};
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  color: ${(props) => (props.$variant === "error" ? "#7a1f1f" : "#1a3d31")};
  font-family: "Tajawal", "Arial", sans-serif;
  font-weight: 700;
  white-space: normal;
  line-height: 1.4;
  margin-top: 1.25rem;
  text-align: right;
`;

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const { data } = await publicRequest.post(
        "/newsletter-subscribers/subscribe",
        {
          email,
        },
      );

      if (!data.success) {
        throw new Error(data.message || "حدث خطأ ما");
      }

      setStatus("success");
      setMessage(data.message || "تفقد بريدك الإلكتروني لتأكيد الاشتراك");
      setEmail("");
    } catch (err) {
      setStatus("error");
      const apiMessage = err.response?.data?.message;
      setMessage(apiMessage || err.message || "تعذر الاشتراك، حاول مرة أخرى");
    }
  };

  return (
    <MaFirst>
      <MaSec>
        <MaAll>
          <ContentSection>
            <LeftDiv>
              <MainHeading>
                اشترك في نشرتنا
                <br />
                وابقَ على اطلاع
              </MainHeading>

              <SubText>
                تحديثات صحية، ونصائح مفيدة
                <br />
                تصلك مباشرة على بريدك الإلكتروني
              </SubText>

              <FormContainer onSubmit={handleSubmit}>
                <InputRow>
                  <EmailInput
                    type="email"
                    required
                    placeholder="بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />
                  <SubmitButton type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "جاري الإرسال..." : "اشترك"}
                  </SubmitButton>
                </InputRow>
              </FormContainer>

              {message && (
                <StatText>
                  <StatusBadge
                    $variant={status === "error" ? "error" : "success"}
                  >
                    {message}
                  </StatusBadge>
                </StatText>
              )}

              {status === "idle" && (
                <StatText>
                  <ArrowImg src={ArrowCurve} alt="" />
                  <ArrowPara>يمكنك إلغاء الاشتراك في أي وقت</ArrowPara>
                </StatText>
              )}
            </LeftDiv>
          </ContentSection>

          <ImgContainer>
            <ImageSection src={Header} alt="اشترك في النشرة البريدية" />
          </ImgContainer>
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default NewsletterSignup;
