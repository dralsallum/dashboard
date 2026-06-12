import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { loginPatient, clearError } from "../redux/patientAuth";

// ── Theme ─────────────────────────────────────────────────────────
const T = {
  primary: "#2D5A4E",
  primaryDk: "#1e3e36",
  primaryLt: "#e6f0ee",
  accent: "#3a7a69",
  bg: "#f2f6f5",
  card: "#ffffff",
  text: "#0d1f2d",
  muted: "#5a7080",
  border: "#c2d6d1",
  error: "#d93025",
  errorBg: "#fff2f1",
  errorBdr: "#f5c2be",
};

const GlobalRTL = createGlobalStyle`
  body { direction: rtl; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;

// ── Layout ────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  direction: rtl;
  font-family: "Tajawal, Cairo, Segoe UI", sans-serif;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Banner is on the LEFT visually but appears on the right in RTL grid order
const Banner = styled.div`
  background: linear-gradient(
    150deg,
    ${T.primaryDk} 0%,
    ${T.primary} 55%,
    ${T.accent} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 60px 56px;
  position: relative;
  overflow: hidden;
  order: 2;

  &::before {
    content: "";
    position: absolute;
    width: 460px;
    height: 460px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    top: -110px;
    left: -140px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    bottom: -70px;
    right: -70px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BannerEyebrow = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: #b3d5ce;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 24px;
`;

const BannerTitle = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.35;
  margin: 0 0 14px;
  max-width: 320px;
  text-align: right;
`;

const BannerSub = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
  line-height: 1.8;
  max-width: 300px;
  margin: 0 0 40px;
  text-align: right;
`;

const BannerFeature = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 10px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
  margin-bottom: 13px;
  text-align: right;

  span.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #7ecfc3;
    flex-shrink: 0;
  }
`;

// Form side
const FormSide = styled.div`
  background: ${T.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
  order: 1;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${T.card};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(45, 90, 78, 0.1);
  padding: 44px 40px;
  animation: ${fadeUp} 0.45s ease both;
  text-align: right;

  @media (max-width: 480px) {
    padding: 32px 22px;
    border-radius: 12px;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 32px;
`;

const LogoMark = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: linear-gradient(135deg, ${T.primary}, ${T.accent});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  margin-right: auto;
  margin-left: 0;

  svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #fff;
    stroke-width: 2.2;
    stroke-linecap: round;
  }
`;

const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: ${T.text};
  margin: 0 0 5px;
`;

const CardSub = styled.p`
  font-size: 14px;
  color: ${T.muted};
  margin: 0;
`;

// Fields
const FieldGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: ${T.text};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid ${({ $error }) => ($error ? T.error : T.border)};
  border-radius: 9px;
  font-size: 14px;
  font-family: inherit;
  color: ${T.text};
  background: ${({ $error }) => ($error ? T.errorBg : "#fafdff")};
  outline: none;
  transition:
    border-color 0.18s,
    box-shadow 0.18s;
  box-sizing: border-box;
  text-align: right;
  direction: ltr;

  &:focus {
    border-color: ${({ $error }) => ($error ? T.error : T.primary)};
    box-shadow: 0 0 0 3px
      ${({ $error }) =>
        $error ? "rgba(217,48,37,0.10)" : "rgba(45,90,78,0.12)"};
  }
  &::placeholder {
    color: #9ab4ae;
    direction: rtl;
    text-align: right;
  }
`;

const PwWrap = styled.div`
  position: relative;
`;

const TogglePw = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${T.muted};
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  padding: 4px;

  &:hover {
    color: ${T.primary};
  }
`;

const ForgotLink = styled(Link)`
  display: block;
  text-align: right;
  font-size: 12.5px;
  color: ${T.primary};
  text-decoration: none;
  margin-top: 6px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorBanner = styled.div`
  background: ${T.errorBg};
  border: 1px solid ${T.errorBdr};
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 13px;
  color: ${T.error};
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
  gap: 8px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 46px;
  background: ${({ disabled }) =>
    disabled
      ? "#7aa89e"
      : `linear-gradient(135deg, ${T.primaryDk} 0%, ${T.primary} 50%, ${T.accent} 100%)`};
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 8px;
  transition:
    opacity 0.18s,
    transform 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: ${T.border};
  font-size: 12px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${T.border};
  }
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 13.5px;
  color: ${T.muted};
  margin: 0;

  a {
    color: ${T.primary};
    font-weight: 700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// ── Component ─────────────────────────────────────────────────────
const PatientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isFetching = false,
    error = false,
    errorMessage = null,
    currentPatient = null,
  } = useSelector((s) => s.patientAuth) ?? {};

  // Redirect already-authenticated patients away from login page
  useEffect(() => {
    if (currentPatient) navigate("/", { replace: true });
  }, [currentPatient, navigate]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginPatient(form));
    if (result.success) navigate("/");
  };

  return (
    <>
      <GlobalRTL />
      <Page>
        {/* Form side (order:1 = appears first/right in RTL) */}
        <FormSide>
          <Card>
            <CardHeader>
              <LogoMark>
                <svg viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </LogoMark>
              <CardTitle>أهلاً بعودتك</CardTitle>
              <CardSub>سجّل دخولك إلى بوابة المريض</CardSub>
            </CardHeader>

            {error && (
              <ErrorBanner>
                <span>⚠</span>
                <span>{errorMessage}</span>
              </ErrorBanner>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  $error={error}
                  required
                  autoComplete="email"
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="password">كلمة المرور</Label>
                <PwWrap>
                  <Input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={form.password}
                    onChange={handleChange}
                    $error={error}
                    required
                    autoComplete="current-password"
                    style={{ paddingLeft: "52px" }}
                  />
                  <TogglePw
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? "إخفاء" : "إظهار"}
                  </TogglePw>
                </PwWrap>
                <ForgotLink to="/patient/resetpassword">
                  نسيت كلمة المرور؟
                </ForgotLink>
              </FieldGroup>

              <SubmitBtn type="submit" disabled={isFetching}>
                {isFetching ? <Spinner /> : "تسجيل الدخول"}
              </SubmitBtn>
            </form>

            <Divider>أو</Divider>

            <FooterText>
              ليس لديك حساب؟ <Link to="/patientregister">أنشئ حساباً</Link>
            </FooterText>
          </Card>
        </FormSide>

        {/* Banner (order:2 = appears second/left in RTL) */}
        <Banner>
          <BannerEyebrow>بوابة المريض</BannerEyebrow>
          <BannerTitle>صحتك في متناول يدك</BannerTitle>
          <BannerSub>
            اطّلع على سجلاتك الطبية ونتائج التحاليل وتواصل مع فريق رعايتك من
            مكان واحد آمن.
          </BannerSub>
          {[
            "عرض نتائج التحاليل وملخصات الزيارات",
            "التواصل المباشر مع فريق الرعاية",
            "متابعة الأدوية والوصفات الطبية",
            "طلب المواعيد عبر الإنترنت",
          ].map((f) => (
            <BannerFeature key={f}>
              <span className="dot" />
              {f}
            </BannerFeature>
          ))}
        </Banner>
      </Page>
    </>
  );
};

export default PatientLogin;
