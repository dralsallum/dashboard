import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { publicRequest } from "../requestMethods"; // adjust path to match where requestMethods.js actually lives relative to /pages

const Wrapper = styled.div`
  background: #f4f9f7;
  padding: 5rem 4rem;
  direction: rtl;
  font-family: "Tajawal", "Arial", sans-serif;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Card = styled.div`
  background-color: #ddeae5;
  border-radius: 1rem;
  padding: 3.5rem 3rem;
  max-width: 32rem;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$variant === "error" ? "#c44444" : "#2d5a4e"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  color: #fff;
  font-size: 1.8rem;
`;

const Heading = styled.h1`
  font-size: 1.75rem;
  color: #000;
  margin: 0 0 0.75rem 0;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.5;
  margin: 0 0 2rem 0;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  font-size: 1.05rem;
  color: #fff;
  background-color: #2d5a4e;
  border-radius: 8px;
  padding: 0.65rem 1.6rem;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #255048;
  }
`;

const ConfirmSubscription = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirm = async () => {
      if (!token) {
        setStatus("error");
        setMessage("رابط التأكيد غير صالح");
        return;
      }

      try {
        const { data } = await publicRequest.get(
          "/newsletter-subscribers/confirm",
          {
            params: { token },
          },
        );

        if (!data.success) {
          throw new Error(data.message || "حدث خطأ ما");
        }

        setStatus("success");
        setMessage(
          "تم تأكيد اشتراكك بنجاح! ستصلك تحديثاتنا القادمة على بريدك الإلكتروني.",
        );
      } catch (err) {
        setStatus("error");
        const apiMessage = err.response?.data?.message;
        setMessage(apiMessage || "رابط التأكيد غير صالح أو منتهي الصلاحية");
      }
    };

    confirm();
  }, [token]);

  return (
    <Wrapper>
      <Card>
        {status === "loading" && (
          <>
            <IconCircle>...</IconCircle>
            <Heading>جاري التأكيد...</Heading>
            <Message>يرجى الانتظار قليلاً</Message>
          </>
        )}

        {status === "success" && (
          <>
            <IconCircle>✓</IconCircle>
            <Heading>تم التأكيد بنجاح</Heading>
            <Message>{message}</Message>
            <HomeLink to="/">العودة للرئيسية</HomeLink>
          </>
        )}

        {status === "error" && (
          <>
            <IconCircle $variant="error">!</IconCircle>
            <Heading>تعذر التأكيد</Heading>
            <Message>{message}</Message>
            <HomeLink to="/">العودة للرئيسية</HomeLink>
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default ConfirmSubscription;
