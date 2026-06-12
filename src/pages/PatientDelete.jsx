import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { deletePatientAccount, clearError } from "../redux/patientAuth";

const T = {
  primary: "#2D5A4E",
  primaryDk: "#1e3e36",
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
  max-width: 480px;
  background: ${T.card};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(45, 90, 78, 0.1);
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  text-align: right;
`;

const DangerStripe = styled.div`
  height: 5px;
  background: linear-gradient(90deg, #7b1111, ${T.error}, #f87171);
`;

const CardBody = styled.div`
  padding: 40px 44px;
  @media (max-width: 520px) {
    padding: 28px 22px;
  }
`;

const IconWrap = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: #fff2f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-size: 24px;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: ${T.text};
  margin: 0 0 8px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${T.muted};
  margin: 0 0 24px;
  line-height: 1.7;
`;

const WarningBox = styled.div`
  background: #fffbeb;
  border: 1px solid #f6d860;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 22px;
`;

const WarningTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #7a4f00;
  margin: 0 0 6px;
`;

const WarningList = styled.ul`
  margin: 0;
  padding-right: 16px;
  padding-left: 0;
  font-size: 13px;
  color: #7b5500;
  line-height: 1.9;
`;

const ConfirmPrompt = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: ${T.text};
  margin-bottom: 7px;
`;

const ConfirmCode = styled.span`
  font-family: "Courier New", monospace;
  background: #f0f4f8;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 13px;
  color: ${T.error};
  font-weight: 700;
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
  text-align: center;
  letter-spacing: 0.08em;

  &:focus {
    border-color: ${({ $error }) => ($error ? T.error : T.error)};
    box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.1);
    background: #fff;
  }
  &::placeholder {
    color: #9ab4ae;
    letter-spacing: 0;
    text-align: right;
    direction: rtl;
  }
`;

const PwInput = styled(Input)`
  text-align: right;
  letter-spacing: 0;
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
    color: ${T.error};
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
  flex-direction: row-reverse;
  gap: 8px;
`;

const SuccessState = styled.div`
  text-align: center;
  padding: 50px 32px;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 14px;
`;

const SuccessTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: ${T.text};
  margin: 0 0 8px;
`;

const SuccessSub = styled.p`
  font-size: 14px;
  color: ${T.muted};
  margin: 0 0 20px;
  line-height: 1.7;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;

const DeleteBtn = styled.button`
  width: 100%;
  height: 46px;
  background: ${({ disabled }) =>
    disabled ? "#f5a0a0" : "linear-gradient(135deg, #7b1111, #d93025)"};
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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

const CancelBtn = styled(Link)`
  display: block;
  text-align: center;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border: 1.5px solid ${T.border};
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  color: ${T.muted};
  text-decoration: none;
  box-sizing: border-box;
  transition: background 0.15s;
  &:hover {
    background: ${T.bg};
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const CONFIRM_PHRASE = "احذف";

const PatientDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isFetching = false,
    error = false,
    errorMessage = null,
  } = useSelector((s) => s.patientAuth) ?? {};

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [pwError, setPwError] = useState(false);

  const canDelete = confirmText === CONFIRM_PHRASE && password.length >= 1;

  const handleDelete = async () => {
    if (!canDelete) return;
    setPwError(false);
    const result = await dispatch(deletePatientAccount(password));
    if (result.success) {
      setDeleted(true);
      setTimeout(() => navigate("/patient/login"), 3000);
    } else {
      setPwError(true);
    }
  };

  if (deleted) {
    return (
      <>
        <GlobalRTL />
        <Page>
          <Card>
            <DangerStripe />
            <SuccessState>
              <SuccessIcon>🗑️</SuccessIcon>
              <SuccessTitle>تم حذف الحساب</SuccessTitle>
              <SuccessSub>
                تم حذف حسابك وجميع بياناتك المرتبطة به بشكل نهائي. سيتم تحويلك
                تلقائياً...
              </SuccessSub>
            </SuccessState>
          </Card>
        </Page>
      </>
    );
  }

  return (
    <>
      <GlobalRTL />
      <Page>
        <Card>
          <DangerStripe />
          <CardBody>
            <IconWrap>⚠️</IconWrap>
            <Title>حذف حسابك</Title>
            <SubText>
              هذا الإجراء نهائي ولا يمكن التراجع عنه. لن يكون بإمكانك استرجاع
              حسابك بعد الحذف.
            </SubText>

            <WarningBox>
              <WarningTitle>ما الذي سيتم حذفه:</WarningTitle>
              <WarningList>
                <li>بيانات تسجيل الدخول وملفك الشخصي</li>
                <li>جميع تفضيلات وإعدادات البوابة</li>
                <li>الوصول إلى السجل الطبي المرتبط</li>
                <li>سجل المراسلات مع فريق الرعاية</li>
              </WarningList>
            </WarningBox>

            {(error || pwError) && (
              <ErrorBanner>
                <span>⚠</span>
                <span>
                  {errorMessage || "كلمة المرور غير صحيحة. حاول مرة أخرى."}
                </span>
              </ErrorBanner>
            )}

            <ConfirmPrompt>
              <Label>
                اكتب <ConfirmCode>{CONFIRM_PHRASE}</ConfirmCode> للتأكيد
              </Label>
              <Input
                type="text"
                placeholder={CONFIRM_PHRASE}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                $error={
                  confirmText.length > 0 && confirmText !== CONFIRM_PHRASE
                }
                autoComplete="off"
              />
            </ConfirmPrompt>

            <ConfirmPrompt>
              <Label>أدخل كلمة المرور</Label>
              <PwWrap>
                <PwInput
                  type={showPw ? "text" : "password"}
                  placeholder="كلمة المرور الحالية"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPwError(false);
                  }}
                  $error={pwError}
                  autoComplete="current-password"
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
            </ConfirmPrompt>

            <ButtonGroup>
              <DeleteBtn
                type="button"
                onClick={handleDelete}
                disabled={!canDelete || isFetching}
              >
                {isFetching ? <Spinner /> : "حذف الحساب نهائياً"}
              </DeleteBtn>
              <CancelBtn to="/portal/settings">
                إلغاء — الاحتفاظ بحسابي
              </CancelBtn>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Page>
    </>
  );
};

export default PatientDeleteAccount;
