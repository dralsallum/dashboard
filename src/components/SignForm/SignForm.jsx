// SignForm.jsx
import React, { useState } from "react";
import {
  SignContainer,
  LoginContainer,
  LoginSignHeader,
  LoginSignSubHeader,
  LoginSignInput,
  LoginSignForm,
  ErrorMessage,
  SignButton,
  RegistarButton,
  LoginSignPara,
  Loader,
} from "./SignForm.elements";
import { useDispatch } from "react-redux";
import { register } from "../../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const SignForm = () => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getArabicErrorMessage = (msg) => {
    switch (msg) {
      case "The email address is already in use by another account.":
        return "عنوان البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر.";
      case "Invalid password":
        return "يجب أن تكون كلمة المرور مكونة من 6 عناصر وتحتوي على أحرف وأرقام.";
      default:
        return "حدث خطأ غير معروف. يرجى المحاولة مرة أخرى.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await dispatch(register(inputs)).unwrap();
      navigate("/control");
    } catch (error) {
      setErrorMessage(getArabicErrorMessage(error.message || ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignContainer>
      <LoginContainer>
        <LoginSignHeader>تسجيل حساب جديد</LoginSignHeader>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <LoginSignForm onSubmit={handleSubmit}>
          <LoginSignSubHeader>اسم المستخدم</LoginSignSubHeader>
          <LoginSignInput
            name="username"
            placeholder="اسم المستخدم"
            onChange={handleChange}
            required
          />

          <LoginSignSubHeader>الايميل</LoginSignSubHeader>
          <LoginSignInput
            name="email"
            type="email"
            placeholder="example@domain.com"
            onChange={handleChange}
            required
          />

          <LoginSignSubHeader>كلمة المرور</LoginSignSubHeader>
          <LoginSignInput
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />

          <SignButton disabled={isLoading}>
            {isLoading ? <Loader /> : "إنشاء حساب"}
          </SignButton>
        </LoginSignForm>

        <LoginSignPara>
          بالتسجيل، أنت توافق على شروط استخدام فلونت فوكس. للاطلاع على سياسة
          الخصوصية، إشعارات الكوكيز والإعلانات:{" "}
          <Link to="/condition">اضغط هنا</Link>
        </LoginSignPara>

        <Link to="/login">
          <RegistarButton>لديك حساب مسبقاً؟ تسجيل دخول</RegistarButton>
        </Link>
      </LoginContainer>
    </SignContainer>
  );
};

export default SignForm;
