import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { publicRequest } from "../requestMethods";

const T = {
  primary: "#2D5A4E",
  primaryDk: "#1e3e36",
  accent: "#3a7a69",
  primaryLt: "#e6f0ee",
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

const Page = styled.div`
  min-height: 100vh;
  background: ${T.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  font-family: "Tajawal, Cairo, Segoe UI", sans-serif;
  direction: rtl;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${T.card};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(45, 90, 78, 0.1);
  padding: 48px 44px;
  animation: ${fadeUp} 0.4s ease both;
  text-align: right;

  @media (max-width: 520px) {
    padding: 32px 22px;
    border-radius: 12px;
  }
`;

const TopAccent = styled.div`
  height: 4px;
  background: linear-gradient(90deg, ${T.primaryDk}, ${T.primary}, ${T.accent});
  border-radius: 18px 18px 0 0;
  margin: -48px -44px 36px;

  @media (max-width: 520px) {
    margin: -32px -22px 28px;
  }
`;

const LogoMark = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, ${T.primary}, ${T.accent});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-right: auto;
  font-size: 22px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: ${T.text};
  margin: 0 0 7px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${T.muted};
  margin: 0 0 26px;
  line-height: 1.7;
`;

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
  box-sizing: border-box;
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

const PwWrap = styled.div`
  position: relative;
`;

const ToggleBtn = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${T.muted};
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  padding: 4px;
  &:hover {
    color: ${T.primary};
  }
`;

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

const SuccessBanner = styled.div`
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 10px;
  padding: 16px;
  font-size: 14px;
  color: #166534;
  margin-bottom: 18px;
  line-height: 1.7;
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
  flex-direction: row-reverse;
  gap: 8px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 46px;
  background: ${({ disabled }) =>
    disabled
      ? "#7aa89e"
      : `linear-gradient(135deg, ${T.primaryDk}, ${T.primary} 55%, ${T.accent})`};
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 18px;
  font-size: 13.5px;
  color: ${T.primary};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const MutedHint = styled.p`
  font-size: 12.5px;
  color: ${T.muted};
  margin: 10px 0 0;
  line-height: 1.6;
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

const PatientResetPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pwError, setPwError] = useState(false);

  const pwStrength = getPasswordStrength(password);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      await publicRequest.post("/patient-auth/request-password-reset", {
        email,
      });
    } catch {
      // always show success to prevent email enumeration
    } finally {
      setEmailSent(true);
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setPwError(false);
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setPwError(true);
      setErrorMsg("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (password.length < 8) {
      setPwError(true);
      setErrorMsg("يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل.");
      return;
    }
    setLoading(true);
    try {
      await publicRequest.post("/patient-auth/reset-password", {
        token: resetToken,
        newPassword: password,
      });
      setResetDone(true);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "قد يكون هذا الرابط قد انتهت صلاحيته. يُرجى طلب رابط جديد.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────
  if (resetDone) {
    return (
      <>
        <GlobalRTL />
        <Page>
          <Card>
            <TopAccent />
            <LogoMark>✅</LogoMark>
            <Title>تم تحديث كلمة المرور</Title>
            <SubText>
              تم تغيير كلمة مرورك بنجاح. يمكنك الآن تسجيل الدخول بالبيانات
              الجديدة.
            </SubText>
            <BackLink to="/patient/login">→ العودة إلى تسجيل الدخول</BackLink>
          </Card>
        </Page>
      </>
    );
  }

  // ── Phase 2: set new password ──────────────────────────────────
  if (resetToken) {
    return (
      <>
        <GlobalRTL />
        <Page>
          <Card>
            <TopAccent />
            <LogoMark>🔒</LogoMark>
            <Title>تعيين كلمة مرور جديدة</Title>
            <SubText>اختر كلمة مرور قوية لحسابك.</SubText>

            {errorMsg && (
              <ErrorBanner>
                <span>⚠</span>
                <span>{errorMsg}</span>
              </ErrorBanner>
            )}

            <form onSubmit={handleConfirmReset} noValidate>
              <FieldGroup>
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <PwWrap>
                  <Input
                    id="new-password"
                    type={showPw ? "text" : "password"}
                    placeholder="٨ أحرف على الأقل"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    $error={pwError}
                    autoComplete="new-password"
                    style={{ paddingLeft: "60px" }}
                  />
                  <ToggleBtn
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? "إخفاء" : "إظهار"}
                  </ToggleBtn>
                </PwWrap>
                {password && (
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
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPwError(false);
                  }}
                  $error={pwError}
                  autoComplete="new-password"
                />
              </FieldGroup>

              <SubmitBtn type="submit" disabled={loading || !password}>
                {loading ? <Spinner /> : "تحديث كلمة المرور"}
              </SubmitBtn>
            </form>

            <BackLink to="/patient/login">→ العودة إلى تسجيل الدخول</BackLink>
          </Card>
        </Page>
      </>
    );
  }

  // ── Phase 1: request reset email ──────────────────────────────
  return (
    <>
      <GlobalRTL />
      <Page>
        <Card>
          <TopAccent />
          <LogoMark>📧</LogoMark>
          <Title>استعادة كلمة المرور</Title>
          <SubText>
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً آمناً لإعادة تعيين كلمة
            مرورك.
          </SubText>

          {emailSent ? (
            <>
              <SuccessBanner>
                <strong>تحقق من بريدك الإلكتروني</strong>
                <br />
                إذا كان البريد <strong>{email}</strong> مسجلاً لدينا، فقد أُرسل
                إليه رابط إعادة التعيين. الرابط صالح لمدة ١٥ دقيقة.
              </SuccessBanner>
              <MutedHint>
                لم تستلم الرابط؟ تحقق من مجلد الرسائل غير المرغوب، أو{" "}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: T.primary,
                    cursor: "pointer",
                    fontWeight: 700,
                    padding: 0,
                    fontSize: "inherit",
                    fontFamily: "inherit",
                  }}
                  onClick={() => setEmailSent(false)}
                >
                  جرّب بريداً آخر
                </button>
                .
              </MutedHint>
            </>
          ) : (
            <>
              {errorMsg && (
                <ErrorBanner>
                  <span>⚠</span>
                  <span>{errorMsg}</span>
                </ErrorBanner>
              )}
              <form onSubmit={handleRequestReset} noValidate>
                <FieldGroup>
                  <Label htmlFor="reset-email">البريد الإلكتروني</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </FieldGroup>
                <SubmitBtn type="submit" disabled={loading || !email}>
                  {loading ? <Spinner /> : "إرسال رابط الاستعادة"}
                </SubmitBtn>
              </form>
            </>
          )}

          <BackLink to="/patient/login">→ العودة إلى تسجيل الدخول</BackLink>
        </Card>
      </Page>
    </>
  );
};

export default PatientResetPassword;
