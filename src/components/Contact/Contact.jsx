import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

/* ─── Design tokens (matches Health.jsx / HowItWorks.jsx) ─────────── */
const PRIMARY = "#2D5A4E";
const PRIMARY_DARK = "#1f3f36";
const BG_SECTION = "#f0f5f3";
const CARD_BG = "#ddeae5";
const CARD_BG_ALT = "#ffffff";
const HEADING_COLOR = "#1a2e27";
const MUTED = "#5a7a70";
const DIVIDER = "#cfe0da";
const ERROR = "#b3413a";
const SHADOW = "rgba(45, 90, 78, 0.18)";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Layout ───────────────────────────────────────────────────────── */
const Section = styled.section`
  background: ${BG_SECTION};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 24px;
  font-family: "Tajawal", sans-serif;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

const Eyebrow = styled.span`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  color: ${PRIMARY};
  background: ${CARD_BG};
  padding: 6px 18px;
  border-radius: 999px;
  margin-bottom: 18px;
`;

const Heading = styled.h1`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 44px;
  color: ${HEADING_COLOR};
  margin: 0 0 14px;
  text-align: center;

  em {
    font-style: italic;
    color: ${PRIMARY};
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SubHeading = styled.p`
  font-size: 16px;
  color: ${MUTED};
  text-align: center;
  max-width: 520px;
  line-height: 1.8;
  margin: 0 0 48px;
`;

/* ─── Two-column content ──────────────────────────────────────────── */
const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Info column ──────────────────────────────────────────────────── */
const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoCard = styled.div`
  background: ${CARD_BG_ALT};
  border-radius: 18px;
  padding: 22px 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 4px 18px ${SHADOW};
`;

const IconBox = styled.div`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: ${CARD_BG};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${PRIMARY};
`;

const InfoTitle = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: ${HEADING_COLOR};
  margin: 0 0 4px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: ${MUTED};
  line-height: 1.7;
  margin: 0;
  direction: ltr;
  text-align: right;
  unicode-bidi: plaintext;
`;

const EmergencyCard = styled(InfoCard)`
  background: ${PRIMARY};
`;

const EmergencyTitle = styled(InfoTitle)`
  color: #ffffff;
`;

const EmergencyText = styled(InfoText)`
  color: #d9ece6;
`;

const EmergencyIconBox = styled(IconBox)`
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
`;

/* ─── Form column ──────────────────────────────────────────────────── */
const FormCard = styled.div`
  background: ${CARD_BG_ALT};
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 4px 18px ${SHADOW};

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const FormTitle = styled.h2`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 24px;
  color: ${HEADING_COLOR};
  margin: 0 0 6px;
`;

const FormSub = styled.p`
  font-size: 14px;
  color: ${MUTED};
  margin: 0 0 28px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: ${HEADING_COLOR};
  margin-bottom: 8px;
`;

const inputStyles = css`
  font-family: "Tajawal", sans-serif;
  font-size: 15px;
  color: ${HEADING_COLOR};
  background: ${BG_SECTION};
  border: 1.5px solid ${DIVIDER};
  border-radius: 12px;
  padding: 13px 16px;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;

  &::placeholder {
    color: #8fa9a0;
  }

  &:focus {
    border-color: ${PRIMARY};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  appearance: none;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 120px;
  font-family: "Tajawal", sans-serif;
`;

const ErrorText = styled.span`
  font-size: 13px;
  color: ${ERROR};
  margin-top: 6px;
`;

const SubmitBtn = styled.button`
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  background: ${PRIMARY};
  border: none;
  border-radius: 999px;
  padding: 15px 0;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    background 0.25s ease,
    transform 0.15s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: ${PRIMARY_DARK};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${CARD_BG};
  color: ${PRIMARY_DARK};
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.4s ease forwards;
`;

const ErrorBox = styled(SuccessBox)`
  background: #fbe9e7;
  color: ${ERROR};
`;

/* ─── Data ─────────────────────────────────────────────────────────── */
const infoItems = [
  {
    icon: <Phone size={20} />,
    title: "اتصل بنا",
    text: "920XXXXX",
  },
  {
    icon: <Mail size={20} />,
    title: "البريد الإلكتروني",
    text: "support@carehome.sa",
  },
  {
    icon: <MapPin size={20} />,
    title: "العنوان",
    text: "الرياض، حي العليا، المملكة العربية السعودية",
  },
  {
    icon: <Clock size={20} />,
    title: "ساعات العمل",
    text: "الأحد – الخميس، ٨:٠٠ص – ٥:٠٠م",
  },
];

const subjectOptions = [
  "استفسار عام",
  "حجز فحص سنوي",
  "طلب رعاية منزلية",
  "شكوى طبية",
  "أخرى",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  subject: subjectOptions[0],
  message: "",
};

/* ─── Component ────────────────────────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "الاسم مطلوب";
    if (!form.phone.trim()) next.phone = "رقم الجوال مطلوب";
    if (!form.message.trim()) next.message = "يرجى كتابة رسالتك";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      // Express backend endpoint, e.g. router.post("/api/contact", ...)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("request_failed");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Section>
        <Eyebrow>تواصل معنا</Eyebrow>
        <Heading>
          نحن هنا <em>لمساعدتك</em>
        </Heading>
        <SubHeading>
          لأي استفسار عن الفحص السنوي أو الرعاية المنزلية، فريقنا جاهز للرد عليك
          في أقرب وقت.
        </SubHeading>

        <Wrapper>
          {/* Info column */}
          <InfoCol>
            {infoItems.map((item) => (
              <InfoCard key={item.title}>
                <IconBox>{item.icon}</IconBox>
                <div>
                  <InfoTitle>{item.title}</InfoTitle>
                  <InfoText>{item.text}</InfoText>
                </div>
              </InfoCard>
            ))}

            <EmergencyCard>
              <EmergencyIconBox>
                <MessageCircle size={20} />
              </EmergencyIconBox>
              <div>
                <EmergencyTitle>خط الطوارئ</EmergencyTitle>
                <EmergencyText>
                  متاح على مدار الساعة لحالات الرعاية المنزلية العاجلة
                </EmergencyText>
              </div>
            </EmergencyCard>
          </InfoCol>

          {/* Form column */}
          <FormCard>
            <FormTitle>أرسل لنا رسالة</FormTitle>
            <FormSub>سنعاود التواصل معك خلال ساعات العمل الرسمية</FormSub>

            {status === "success" && (
              <SuccessBox>
                <CheckCircle2 size={18} />
                تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.
              </SuccessBox>
            )}
            {status === "error" && (
              <ErrorBox>تعذّر إرسال الرسالة، يرجى المحاولة مرة أخرى.</ErrorBox>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Row>
                <Field>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثال: محمد العتيبي"
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </Field>
                <Field>
                  <Label htmlFor="phone">رقم الجوال</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="05XXXXXXXX"
                    dir="ltr"
                  />
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </Field>
              </Row>

              <Field>
                <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </Field>

              <Field>
                <Label htmlFor="subject">نوع الطلب</Label>
                <Select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <Label htmlFor="message">رسالتك</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="اكتب تفاصيل طلبك أو استفسارك هنا..."
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </Field>

              <SubmitBtn type="submit" disabled={status === "loading"}>
                {status === "loading" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
                <Send size={18} />
              </SubmitBtn>
            </form>
          </FormCard>
        </Wrapper>
      </Section>
    </>
  );
};

export default ContactPage;
