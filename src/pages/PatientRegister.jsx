import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { registerPatient, clearError } from "../redux/patientAuth";

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

const GlobalRTL = createGlobalStyle`body { direction: rtl; }`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}`;
const spin = keyframes`to{transform:rotate(360deg)}`;

// ── Page ──────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  background: ${T.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 80px;
  font-family: "Tajawal, Cairo, Segoe UI", sans-serif;
  direction: rtl;
`;

const TopBar = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 16px;
  color: ${T.primaryDk};
`;

const LogoIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${T.primaryDk}, ${T.accent});
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
    stroke: #fff;
    fill: none;
    stroke-width: 2.2;
    stroke-linecap: round;
  }
`;

const LoginLink = styled(Link)`
  font-size: 13.5px;
  color: ${T.primary};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

// ── Step bar ──────────────────────────────────────────────────────
const StepBar = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  border: 2px solid
    ${({ $active, $done }) =>
      $done ? T.primary : $active ? T.primary : T.border};
  background: ${({ $active, $done }) =>
    $done ? T.primary : $active ? T.primaryLt : "#fff"};
  color: ${({ $active, $done }) =>
    $done ? "#fff" : $active ? T.primary : "#9ab0bc"};
  transition: all 0.25s;
`;

const StepLabel = styled.span`
  font-size: 11px;
  margin-top: 5px;
  font-weight: 600;
  color: ${({ $active, $done }) => ($done || $active ? T.primary : "#9ab0bc")};
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ $done }) => ($done ? T.primary : T.border)};
  margin-bottom: 22px;
  transition: background 0.25s;
`;

// ── Card ──────────────────────────────────────────────────────────
const Card = styled.div`
  width: 100%;
  max-width: 700px;
  background: ${T.card};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(45, 90, 78, 0.1);
  padding: 44px 48px;
  animation: ${fadeUp} 0.4s ease both;
  text-align: right;

  @media (max-width: 620px) {
    padding: 28px 20px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: ${T.text};
  margin: 0 0 5px;
`;

const SectionSub = styled.p`
  font-size: 14px;
  color: ${T.muted};
  margin: 0 0 26px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols || 2}, 1fr)`};
  gap: 16px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const FullCol = styled.div`
  grid-column: 1 / -1;
`;

const FieldGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: ${T.text};
  margin-bottom: 6px;
  span.req {
    color: ${T.error};
    margin-right: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1.5px solid ${({ $error }) => ($error ? T.error : T.border)};
  border-radius: 9px;
  font-size: 14px;
  font-family: inherit;
  color: ${T.text};
  outline: none;
  box-sizing: border-box;
  background: ${({ $error }) => ($error ? T.errorBg : "#fafdff")};
  transition:
    border-color 0.18s,
    box-shadow 0.18s;
  direction: ltr;
  text-align: right;

  &:focus {
    border-color: ${({ $error }) => ($error ? T.error : T.primary)};
    box-shadow: 0 0 0 3px
      ${({ $error }) =>
        $error ? "rgba(217,48,37,0.10)" : "rgba(45,90,78,0.12)"};
    background: #fff;
  }
  &::placeholder {
    color: #9ab4ae;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1.5px solid ${T.border};
  border-radius: 9px;
  font-size: 14px;
  font-family: inherit;
  color: ${T.text};
  outline: none;
  background: #fafdff;
  box-sizing: border-box;
  transition: border-color 0.18s;
  cursor: pointer;
  appearance: none;
  direction: rtl;

  &:focus {
    border-color: ${T.primary};
    box-shadow: 0 0 0 3px rgba(45, 90, 78, 0.12);
  }
`;

// Password strength
const StrengthRow = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 7px;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 3px;
  border-radius: 4px;
  background: ${({ $lit, $level }) => {
    if (!$lit) return T.border;
    if ($level <= 1) return T.error;
    if ($level === 2) return "#dd6b20";
    if ($level === 3) return "#c7a21a";
    return "#2e9e5e";
  }};
  transition: background 0.2s;
`;

const StrengthLabel = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: ${({ $level }) => {
    if ($level <= 1) return T.error;
    if ($level === 2) return "#dd6b20";
    if ($level === 3) return "#c7a21a";
    return "#2e9e5e";
  }};
`;

const getPasswordStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};
const strengthLabels = ["", "ضعيفة", "مقبولة", "جيدة", "قوية"];

// Agreements
const CheckRow = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex-direction: row-reverse;
  cursor: pointer;
  font-size: 14px;
  color: ${T.text};
  line-height: 1.6;
  margin-bottom: 14px;

  input[type="checkbox"] {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    accent-color: ${T.primary};
    flex-shrink: 0;
    cursor: pointer;
  }
  a {
    color: ${T.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorBanner = styled.div`
  background: ${T.errorBg};
  border: 1px solid ${T.errorBdr};
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 13px;
  color: ${T.error};
  margin-bottom: 20px;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
`;

// Buttons
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  gap: 12px;
  flex-direction: row-reverse;
`;

const BackBtn = styled.button`
  height: 44px;
  padding: 0 24px;
  border: 1.5px solid ${T.border};
  border-radius: 9px;
  background: #fff;
  color: ${T.muted};
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${T.bg};
  }
`;

const NextBtn = styled.button`
  height: 44px;
  padding: 0 32px;
  background: ${({ disabled }) =>
    disabled
      ? "#7aa89e"
      : `linear-gradient(135deg, ${T.primaryDk}, ${T.primary} 60%, ${T.accent})`};
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  gap: 8px;
  transition:
    opacity 0.18s,
    transform 0.12s;
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const ProgressText = styled.span`
  font-size: 12.5px;
  color: ${T.muted};
`;

// ── Data ──────────────────────────────────────────────────────────
const STEPS = ["الحساب", "المعلومات", "العنوان", "الموافقات"];

const INITIAL = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  legalSex: "",
  address: { street: "", apt: "", city: "", state: "", zip: "" },
  agreedToPrivacyNotice: false,
  agreedToMedicalTerms: false,
  agreedToMembershipTerms: false,
  acknowledgedHipaa: false,
};

// ── Component ─────────────────────────────────────────────────────
const PatientRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isFetching = false,
    error = false,
    errorMessage = null,
    currentPatient = null,
  } = useSelector((s) => s.patientAuth) ?? {};

  // Redirect already-authenticated patients away from register page
  useEffect(() => {
    if (currentPatient) navigate("/", { replace: true });
  }, [currentPatient, navigate]);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL);
  const [showPw, setShowPw] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => () => dispatch(clearError()), [dispatch]);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const setAddr = (f, v) =>
    setForm((p) => ({ ...p, address: { ...p.address, [f]: v } }));

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.email) errs.email = true;
      if (!form.password || form.password.length < 8) errs.password = true;
      if (form.password !== form.confirmPassword) errs.confirmPassword = true;
    }
    if (step === 1) {
      if (!form.firstName) errs.firstName = true;
      if (!form.lastName) errs.lastName = true;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };
  const handleBack = () => {
    setFieldErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    const { confirmPassword, ...payload } = form;
    const result = await dispatch(registerPatient(payload));
    if (result.success) navigate("/");
  };

  const pwStrength = getPasswordStrength(form.password);

  return (
    <>
      <GlobalRTL />
      <Page>
        <TopBar>
          <Logo>
            <LogoIcon>
              <svg viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </LogoIcon>
            بوابة المريض
          </Logo>
          <LoginLink to="/patientlogin">لديك حساب بالفعل؟ سجّل دخولك</LoginLink>
        </TopBar>

        {/* Step bar */}
        <StepBar>
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <StepItem>
                <StepCircle $active={step === i} $done={step > i}>
                  {step > i ? "✓" : i + 1}
                </StepCircle>
                <StepLabel $active={step === i} $done={step > i}>
                  {label}
                </StepLabel>
              </StepItem>
              {i < STEPS.length - 1 && <StepLine $done={step > i} />}
            </React.Fragment>
          ))}
        </StepBar>

        <Card>
          {error && (
            <ErrorBanner>
              <span>⚠</span>
              <span>{errorMessage}</span>
            </ErrorBanner>
          )}

          {/* Step 0: Account */}
          {step === 0 && (
            <>
              <SectionTitle>إنشاء حساب جديد</SectionTitle>
              <SectionSub>ابدأ ببيانات تسجيل الدخول</SectionSub>
              <Grid $cols={1}>
                <FieldGroup>
                  <Label htmlFor="email">
                    البريد الإلكتروني <span className="req">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    $error={fieldErrors.email}
                    autoComplete="email"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="password">
                    كلمة المرور <span className="req">*</span>
                  </Label>
                  <div style={{ position: "relative" }}>
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="٨ أحرف على الأقل"
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      $error={fieldErrors.password}
                      autoComplete="new-password"
                      style={{ paddingLeft: "60px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: T.muted,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "inherit",
                      }}
                      tabIndex={-1}
                    >
                      {showPw ? "إخفاء" : "إظهار"}
                    </button>
                  </div>
                  {form.password && (
                    <>
                      <StrengthRow>
                        {[1, 2, 3, 4].map((n) => (
                          <StrengthBar
                            key={n}
                            $lit={pwStrength >= n}
                            $level={pwStrength}
                          />
                        ))}
                      </StrengthRow>
                      <StrengthLabel $level={pwStrength}>
                        {strengthLabels[pwStrength]}
                      </StrengthLabel>
                    </>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="confirmPassword">
                    تأكيد كلمة المرور <span className="req">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="أعد إدخال كلمة المرور"
                    value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    $error={fieldErrors.confirmPassword}
                    autoComplete="new-password"
                  />
                  {fieldErrors.confirmPassword && (
                    <span style={{ fontSize: 12, color: T.error }}>
                      كلمتا المرور غير متطابقتين
                    </span>
                  )}
                </FieldGroup>
              </Grid>
            </>
          )}

          {/* Step 1: Personal */}
          {step === 1 && (
            <>
              <SectionTitle>المعلومات الشخصية</SectionTitle>
              <SectionSub>تساعدنا في ربط سجلاتك بشكل صحيح</SectionSub>
              <Grid>
                <FieldGroup>
                  <Label>
                    الاسم الأول <span className="req">*</span>
                  </Label>
                  <Input
                    placeholder="محمد"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    $error={fieldErrors.firstName}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>
                    الاسم الأخير <span className="req">*</span>
                  </Label>
                  <Input
                    placeholder="العلي"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    $error={fieldErrors.lastName}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>رقم الهاتف</Label>
                  <Input
                    type="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>تاريخ الميلاد</Label>
                  <Input
                    placeholder="DD/MM/YYYY"
                    value={form.dateOfBirth}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>الجنس</Label>
                  <Select
                    value={form.legalSex}
                    onChange={(e) => set("legalSex", e.target.value)}
                  >
                    <option value="">اختر...</option>
                    <option value="female">أنثى</option>
                    <option value="male">ذكر</option>
                  </Select>
                </FieldGroup>
              </Grid>
            </>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <>
              <SectionTitle>عنوانك</SectionTitle>
              <SectionSub>يُستخدم لربطك بالخدمات القريبة منك</SectionSub>
              <Grid>
                <FullCol>
                  <FieldGroup>
                    <Label>عنوان الشارع</Label>
                    <Input
                      placeholder="شارع الملك فهد، حي العليا"
                      value={form.address.street}
                      onChange={(e) => setAddr("street", e.target.value)}
                    />
                  </FieldGroup>
                </FullCol>
                <FieldGroup>
                  <Label>رقم الشقة / الوحدة</Label>
                  <Input
                    placeholder="شقة ٤ب"
                    value={form.address.apt}
                    onChange={(e) => setAddr("apt", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>المدينة</Label>
                  <Input
                    placeholder="الرياض"
                    value={form.address.city}
                    onChange={(e) => setAddr("city", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>المنطقة / الولاية</Label>
                  <Input
                    placeholder="منطقة الرياض"
                    value={form.address.state}
                    onChange={(e) => setAddr("state", e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>الرمز البريدي</Label>
                  <Input
                    placeholder="12345"
                    value={form.address.zip}
                    onChange={(e) => setAddr("zip", e.target.value)}
                  />
                </FieldGroup>
              </Grid>
            </>
          )}

          {/* Step 3: Agreements */}
          {step === 3 && (
            <>
              <SectionTitle>الموافقات والإقرارات</SectionTitle>
              <SectionSub>
                يُرجى مراجعة ما يلي والموافقة عليه قبل إنشاء حسابك
              </SectionSub>

              <CheckRow>
                <span>
                  لقد قرأت وأوافق على{" "}
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    إشعار الخصوصية
                  </a>
                </span>
                <input
                  type="checkbox"
                  checked={form.agreedToPrivacyNotice}
                  onChange={(e) =>
                    set("agreedToPrivacyNotice", e.target.checked)
                  }
                />
              </CheckRow>
              <CheckRow>
                <span>
                  أوافق على{" "}
                  <a href="/terms/medical" target="_blank" rel="noreferrer">
                    شروط الخدمة الطبية
                  </a>
                </span>
                <input
                  type="checkbox"
                  checked={form.agreedToMedicalTerms}
                  onChange={(e) =>
                    set("agreedToMedicalTerms", e.target.checked)
                  }
                />
              </CheckRow>
              <CheckRow>
                <span>
                  أوافق على{" "}
                  <a href="/terms/membership" target="_blank" rel="noreferrer">
                    شروط العضوية
                  </a>
                </span>
                <input
                  type="checkbox"
                  checked={form.agreedToMembershipTerms}
                  onChange={(e) =>
                    set("agreedToMembershipTerms", e.target.checked)
                  }
                />
              </CheckRow>
              <CheckRow>
                <span>
                  أُقرّ بالاطلاع على{" "}
                  <a href="/hipaa" target="_blank" rel="noreferrer">
                    إشعار ممارسات خصوصية HIPAA
                  </a>
                </span>
                <input
                  type="checkbox"
                  checked={form.acknowledgedHipaa}
                  onChange={(e) => set("acknowledgedHipaa", e.target.checked)}
                />
              </CheckRow>
            </>
          )}

          <ButtonRow>
            <ProgressText>
              الخطوة {step + 1} من {STEPS.length}
            </ProgressText>
            <div style={{ display: "flex", gap: 12 }}>
              {step > 0 && (
                <BackBtn type="button" onClick={handleBack}>
                  → رجوع
                </BackBtn>
              )}
              {step < STEPS.length - 1 ? (
                <NextBtn type="button" onClick={handleNext}>
                  متابعة ←
                </NextBtn>
              ) : (
                <NextBtn
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    isFetching ||
                    !form.agreedToPrivacyNotice ||
                    !form.agreedToMedicalTerms ||
                    !form.agreedToMembershipTerms ||
                    !form.acknowledgedHipaa
                  }
                >
                  {isFetching ? <Spinner /> : "إنشاء الحساب"}
                </NextBtn>
              )}
            </div>
          </ButtonRow>
        </Card>
      </Page>
    </>
  );
};

export default PatientRegister;
