// SignLog.jsx
import React, { useState } from "react";
import {
  SignContainer,
  LoginContainer,
  LoginSignHeader,
  LoginSignSubHeader,
  LoginSignInput,
  ErrorCon,
  SignButton,
  RegistarButton,
  LoaderContainer,
  Loader,
  LoginSignPara,
  StyledLink,
} from "./SignLog.elements";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const SignLog = () => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalize first letter if it's the username field
    const processedValue =
      name === "username" && value.length > 0
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    setInputs((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login(inputs)).unwrap();
      navigate("/control");
    } catch (error) {
      setErrorMessage(error.message || "فشل تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignContainer>
      <LoginContainer>
        <LoginSignHeader>تسجيل دخول</LoginSignHeader>
        {errorMessage && <ErrorCon>{errorMessage}</ErrorCon>}
        <form onSubmit={handleSubmit}>
          <LoginSignSubHeader>اسم المستخدم</LoginSignSubHeader>
          <LoginSignInput
            name="username"
            placeholder="ادخل اسم المستخدم"
            value={inputs.username || ""}
            onChange={handleChange}
          />

          <LoginSignSubHeader>الرقم السري</LoginSignSubHeader>
          <LoginSignInput
            type="password"
            name="password"
            placeholder="••••••••"
            value={inputs.password || ""}
            onChange={handleChange}
          />

          <SignButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            ) : (
              "تسجيل الدخول"
            )}
          </SignButton>
        </form>

        <LoginSignPara>
          بتسجيل الدخول، أنت توافق على شروط استخدام فلونت فوكس. يُرجى الاطلاع
          على <Link to="/condition">إشعارات الخصوصية</Link>، وإشعار الكوكيز،
          وإشعار الإعلانات المستندة إلى الاهتمامات.
        </LoginSignPara>

        <StyledLink to="/forgot">نسيت كلمة المرور؟</StyledLink>
        <StyledLink to="/signup">
          <RegistarButton>إنشاء حساب جديد</RegistarButton>
        </StyledLink>
      </LoginContainer>
    </SignContainer>
  );
};

export default SignLog;
