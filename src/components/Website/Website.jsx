import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Star, ChevronDown } from "lucide-react";
import { publicRequest } from "../../requestMethods";
import { Loader2 } from "lucide-react";

/* ---------- حركة التحميل ---------- */
const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  direction: rtl;
  color: #444;
  background: #f7f2e6;
  font-size: 1.2rem;
  font-weight: 600;
  min-height: 100dvh;
`;

const Gear = styled(Loader2)`
  animation: ${Spin} 1.2s linear infinite;
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  color: #f6e05e;
`;

/* ---------- لوحة الألوان ---------- */
const C = {
  cream: "#F7F2E6",
  yellow: "#F6E05E",
  yellowBorder: "#F2CF5C",
  ink900: "#111827",
  ink700: "#374151",
  ink600: "#4B5563",
  ink500: "#6B7280",
  ink400: "#9CA3AF",
  line: "#E5E7EB",
  card: "#FFFFFF",
};

/* ---------- إطار الهاتف ---------- */
const Phone = styled.div`
  min-height: 100dvh;
  background: ${C.cream};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const PhoneInner = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${C.cream};
  padding-bottom: 116px;
  -webkit-overflow-scrolling: touch;
  direction: rtl;
  text-align: right;
`;

/* ---------- بطاقة ومقاطع ---------- */
const Card = styled.div`
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin: 16px 12px 0;
`;

const Section = styled.div`
  padding: 16px;
  & + & {
    border-top: 1px solid ${C.line};
  }
`;

const SectionHeader = styled(Section)`
  border-bottom: 1px solid ${C.line};
  color: ${C.ink900};
`;

/* ---------- صف الترويسة (الصورة + الاسم) ---------- */
const HeaderRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 12px 0;
  margin: 10px 0 0 0;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  object-fit: cover;
`;

const Title = styled.h1`
  margin: 0;
  color: ${C.ink900};
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
  word-break: break-word;
`;

const Subtle = styled.div`
  color: ${C.ink500};
  font-size: 14px;
  margin-top: 2px;
`;

const Tiny = styled.div`
  color: ${C.ink400};
  font-size: 12px;
  margin-top: 2px;
`;

/* ---------- عناصر عامة ---------- */
const Row = styled.div`
  display: flex;
  gap: ${(p) => p.$gap || 0}px;
  align-items: ${(p) => p.$align || "stretch"};
`;

const Grow = styled.div`
  flex: 1;
`;

const Heading20 = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${C.ink900};
`;

const P = styled.p`
  margin: 0;
  color: ${(p) => p.$color || C.ink600};
  font-size: ${(p) => p.$size || 14}px;
  line-height: 1.7;
`;

const LinkText = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 14px;
  color: ${C.ink900};
  text-decoration: underline;
  cursor: pointer;
`;

/* ---------- التبويبات ---------- */
const TabsBar = styled.div`
  display: flex;
  gap: 24px;
  padding: 6px 16px 0;
  margin: 8px 12px 0;
  border-bottom: 1px solid ${C.line};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 12px 0;
  font-size: 14px;
  color: ${(p) => (p.$active ? C.ink900 : C.ink500)};
  position: relative;
  flex: 0 0 auto;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(p) => (p.$active ? C.ink900 : "transparent")};
  }
`;

/* ---------- التقييم ---------- */
const Big = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: ${C.ink900};
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  color: #f6c81e;
`;

const StarFill = styled(Star)`
  fill: currentColor;
  stroke: currentColor;
`;

/* ---------- حقول الإدخال ---------- */
const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${C.ink900};
`;

const SelectWrap = styled.div`
  position: relative;
`;

const Select = styled.select`
  appearance: none;
  width: 100%;
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

const Input = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};

  &::placeholder {
    color: ${C.ink400};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

const Toggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid ${C.line};
  border-radius: 8px;
  overflow: hidden;
`;

const ToggleBtn = styled.button`
  padding: 12px;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  cursor: pointer;

  ${(p) =>
    p.$active
      ? css`
          background: ${C.ink900};
          color: #fff;
        `
      : css`
          background: #fff;
          color: ${C.ink900};
        `}
`;

/* ---------- التوافر ---------- */
const AvailBlock = styled.div`
  display: grid;
  gap: 12px;
`;

const DayHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${C.ink900};
  margin-top: 4px;
`;

const TimesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (min-width: 380px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TimeBtn = styled.button`
  padding: 10px 0;
  border-radius: 10px;
  border: 2px solid ${(p) => (p.$selected ? C.ink900 : C.yellowBorder)};
  background: ${(p) => (p.$selected ? "#fff" : C.yellow)};
  color: ${C.ink900};
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$selected ? "#fff" : C.yellowBorder)};
    transform: translateY(-2px);
  }
`;

const MoreBtn = styled(TimeBtn)`
  background: ${C.yellow};
  border-style: dashed;
`;

const OutlineBtn = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  background: #fff;
  border: 1px solid ${C.ink900};
  border-radius: 10px;
  font-weight: 700;
  color: ${C.ink900};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${C.ink900};
    color: #fff;
  }
`;

/* ---------- Patient Info Form ---------- */
const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${C.ink900};
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};
  box-sizing: border-box;

  &::placeholder {
    color: ${C.ink400};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${C.ink900}22;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: ${C.ink900};
  cursor: pointer;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const BackBtn = styled.button`
  background: transparent;
  border: none;
  color: ${C.ink900};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: ${C.ink700};
  }
`;

const AppointmentSummary = styled.div`
  background: ${C.cream};
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: ${C.ink700};
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

/* ---------- تخطيطات مساعدة ---------- */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Spacer16 = styled.div`
  height: 16px;
`;

/* ---------- شريط الحجز السفلي ---------- */
const BottomBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${C.yellow};
  border-top: 1px solid ${C.yellowBorder};
  padding: 8px;
  display: flex;
  justify-content: center;
  z-index: 40;
`;

const BookBtn = styled.button`
  width: 100%;
  max-width: 420px;
  background: ${C.yellow};
  color: ${C.ink900};
  font-weight: 800;
  font-size: 17px;
  padding: 14px 16px;
  border: 2px solid ${C.ink900};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${C.yellowBorder};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const KPI = styled.div`
  font-size: ${(p) => p.$size || 18}px;
  font-weight: ${(p) => (p.$bold ? 700 : 600)};
  color: ${C.ink900};
  margin-top: ${(p) => p.$mt || 0}px;
`;

/* ===================================================== */
const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

const Website = () => {
  const [doctor, setDoctor] = useState(null);
  const [activeTab] = useState("الحجز");
  const [activeLocation, setActiveLocation] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [visibleDays, setVisibleDays] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState("مرض عارض");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
  });

  // --- helpers to extract slug from URL ---
  const getSlugFromUrl = () => {
    try {
      const { hostname, pathname, search } = window.location;
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && parts[0].toLowerCase().includes("appointment")) {
        return parts[1];
      }
      if (parts.length >= 1) {
        const maybe = parts[parts.length - 1];
        if (
          maybe &&
          !["appointment", "doctor", "store"].includes(maybe.toLowerCase())
        ) {
          return maybe;
        }
      }
      const qs = new URLSearchParams(search);
      const fromQuery = qs.get("store");
      if (fromQuery) return fromQuery;
      const first = hostname.split(".")[0];
      if (first && first !== "localhost" && first !== "www") return first;
      return null;
    } catch {
      return null;
    }
  };

  // عرض عنوان اليوم بالعربية (اليوم/غدًا/اسم اليوم)
  const fmtDayTitle = (dateISO) => {
    const d = new Date(dateISO + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dKey = d.toISOString().split("T")[0];
    const tKey = today.toISOString().split("T")[0];
    const tmKey = tomorrow.toISOString().split("T")[0];

    const fmt = (opts) => d.toLocaleDateString("ar-SA", opts);

    if (dKey === tKey)
      return `اليوم، ${fmt({ month: "short", day: "numeric" })}`;
    if (dKey === tmKey)
      return `غدًا، ${fmt({ month: "short", day: "numeric" })}`;
    return fmt({ weekday: "long", month: "short", day: "numeric" });
  };

  useEffect(() => {
    const slug = getSlugFromUrl();
    if (!slug) {
      setErr("لم يتم العثور على معرف العيادة في الرابط.");
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      setErr("");
      try {
        const storeRes = await publicRequest.get(`/business/store/${slug}`);
        const data = storeRes.data;

        const mapped = {
          name: data?.username || "طبيب",
          specialty: data?.storeName || "طبيب عام",
          initials: (data?.username || "طبيب")
            .split(" ")
            .map((w) => w[0]?.toUpperCase())
            .join("")
            .slice(0, 2),
          rating: 4.6,
          reviewHighlight: "تجربة ممتازة، إنصات واهتمام ونصائح واضحة.",
          inNetwork: "تأمينات متعددة (Aetna, BCBS, Cigna, ...)",
          avatar:
            data?.storeSettings?.logo ||
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&auto=format&fit=crop",
          locationOptions: [
            data?.storeSettings?.description ? "العيادة" : "زيارة في العيادة",
            "زيارة عبر الفيديو",
          ],
        };

        setDoctor(mapped);
        setActiveLocation(mapped.locationOptions[0]);

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        const availRes = await publicRequest.get(
          `/appointments/available/${slug}`,
          {
            params: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          }
        );

        const availability = Array.isArray(availRes.data?.availability)
          ? availRes.data.availability
          : [];

        const firstIdx = availability.findIndex(
          (d) => Array.isArray(d.availableSlots) && d.availableSlots.length > 0
        );

        if (firstIdx === -1) {
          setVisibleDays([]);
        } else {
          const nextThree = availability.slice(firstIdx, firstIdx + 3);
          const normalized = nextThree.map((day) => ({
            date: day.date,
            title: fmtDayTitle(day.date),
            slots: day.availableSlots,
          }));
          setVisibleDays(normalized);
        }
      } catch (e) {
        console.error(e);
        setErr("تعذر جلب بيانات العيادة أو التوافر.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* ---------- أحداث خطوة 1 ---------- */
  const handlePickTime = (date, time) => {
    // فقط اختيار الوقت — لا ننتقل تلقائياً
    setSelectedSlot({ date, time });
  };

  const canProceedStep1 =
    appointmentType &&
    insurancePlan.trim().length > 0 &&
    activeLocation &&
    selectedSlot;

  const goToStep2 = () => {
    if (!canProceedStep1) return;
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- أحداث خطوة 2 ---------- */
  const handleBackToSelection = () => {
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (field, value) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = async () => {
    const isFormValid =
      patientInfo.email &&
      patientInfo.firstName &&
      patientInfo.lastName &&
      patientInfo.dob &&
      patientInfo.sex;

    if (!isFormValid) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      const bookingData = {
        appointmentType,
        insurancePlan,
        location: activeLocation,
        isNewPatient,
        slotDate: selectedSlot?.date,
        slotTime: selectedSlot?.time,
        patient: {
          email: patientInfo.email,
          firstName: patientInfo.firstName,
          lastName: patientInfo.lastName,
          dob: patientInfo.dob,
          sex: patientInfo.sex,
        },
        doctorName: doctor?.name,
      };

      console.log("Booking submitted:", bookingData);

      alert("تم حجز الموعد بنجاح!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("حدث خطأ أثناء الحجز. الرجاء المحاولة مرة أخرى.");
    }
  };

  if (loading)
    return (
      <LoadingWrapper>
        <Gear />
        جاري التحميل…
      </LoadingWrapper>
    );

  if (err)
    return (
      <div style={{ padding: 24, color: "crimson", direction: "rtl" }}>
        {err}
      </div>
    );

  if (!doctor) return null;

  /* ---------- الخطوة 2: بيانات المراجع ---------- */
  if (bookingStep === 2) {
    const isFormValid =
      patientInfo.email &&
      patientInfo.firstName &&
      patientInfo.lastName &&
      patientInfo.dob &&
      patientInfo.sex;

    return (
      <>
        <Phone>
          <PhoneInner>
            <Card>
              <Section>
                <BackBtn onClick={handleBackToSelection}> العودة</BackBtn>
              </Section>

              <SectionHeader>
                <Heading20>أخبرنا قليلاً عنك</Heading20>
                <P>لحجز موعدك، نحتاج للتحقق من بعض المعلومات.</P>
              </SectionHeader>

              <Section>
                <AppointmentSummary>
                  <DayHeader style={{ fontSize: 16, marginBottom: 12 }}>
                    تفاصيل الموعد
                  </DayHeader>
                  <SummaryRow>
                    <strong>{doctor.name}</strong> - {doctor.specialty}
                  </SummaryRow>
                  <SummaryRow>
                    📅 {fmtDayTitle(selectedSlot?.date)} في {selectedSlot?.time}
                  </SummaryRow>
                  <SummaryRow>📍 {activeLocation}</SummaryRow>
                  <SummaryRow>📝 {appointmentType}</SummaryRow>
                  <SummaryRow>
                    👤 {isNewPatient ? "مراجع جديد" : "مراجع سابق"}
                  </SummaryRow>
                  <SummaryRow>💳 {insurancePlan}</SummaryRow>
                </AppointmentSummary>

                <FormGroup>
                  <FormLabel>البريد الإلكتروني *</FormLabel>
                  <FormInput
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                </FormGroup>

                <TwoCol>
                  <FormGroup>
                    <FormLabel>الاسم الأول *</FormLabel>
                    <FormInput
                      value={patientInfo.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="الاسم الأول"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>اسم العائلة *</FormLabel>
                    <FormInput
                      value={patientInfo.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="اسم العائلة"
                      required
                    />
                  </FormGroup>
                </TwoCol>

                <FormGroup>
                  <FormLabel>تاريخ الميلاد *</FormLabel>
                  <FormInput
                    type="date"
                    value={patientInfo.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>الجنس *</FormLabel>
                  <RadioGroup>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="sex"
                        value="male"
                        checked={patientInfo.sex === "male"}
                        onChange={(e) =>
                          handleInputChange("sex", e.target.value)
                        }
                      />
                      ذكر
                    </RadioLabel>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="sex"
                        value="female"
                        checked={patientInfo.sex === "female"}
                        onChange={(e) =>
                          handleInputChange("sex", e.target.value)
                        }
                      />
                      أنثى
                    </RadioLabel>
                  </RadioGroup>
                </FormGroup>
              </Section>
            </Card>
          </PhoneInner>
        </Phone>

        <BottomBar>
          <BookBtn onClick={handleBookingSubmit} disabled={!isFormValid}>
            تأكيد الحجز
          </BookBtn>
        </BottomBar>
      </>
    );
  }

  /* ---------- الخطوة 1: اختيار الموعد + بيانات أساسية ---------- */
  return (
    <>
      <Phone>
        <PhoneInner>
          {/* الترويسة */}
          <HeaderRow>
            <Avatar src={doctor.avatar} alt="doctor" />
            <div>
              <Title>{doctor.name}</Title>
              <Subtle>{doctor.specialty}</Subtle>
              <Tiny>{doctor.initials}</Tiny>
            </div>
          </HeaderRow>

          {/* التقييم العام */}
          <Card>
            <Section>
              <Row $gap={12} $align="flex-start">
                <Big>{doctor.rating.toFixed(2)}</Big>
                <Grow>
                  <KPI $mt={4} $size={0}>
                    <Stars>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarFill key={i} width={20} height={20} />
                      ))}
                    </Stars>
                  </KPI>
                  <P $size={14}>{doctor.reviewHighlight}</P>
                  <LinkText style={{ marginTop: 8 }}>
                    عرض جميع التقييمات
                  </LinkText>
                </Grow>
              </Row>
            </Section>
          </Card>

          {/* تبويبات */}
          <TabsBar>
            {[
              "الحجز",
              "عن الطبيب",
              "التأمين",
              "التقييمات",
              "الأسئلة الشائعة",
            ].map((t) => (
              <TabBtn key={t} $active={t === activeTab}>
                {t}
              </TabBtn>
            ))}
          </TabsBar>

          {/* تأمين */}
          <Card>
            <Section>
              <Heading20>شركات التأمين ضمن الشبكة</Heading20>
              <P>{doctor.inNetwork}</P>
              <LinkText>(+200) خطط أخرى ضمن الشبكة</LinkText>
            </Section>
          </Card>

          {/* بطاقة الحجز */}
          <Card>
            <SectionHeader>
              <Heading20>احجز موعدًا مجانًا</Heading20>
              <P>أكمل التفاصيل ثم اختر الوقت، واضغط زر الحجز للمتابعة.</P>
            </SectionHeader>

            <Section>
              {/* نوع الموعد */}
              <div>
                <Label>تفاصيل الحجز</Label>
                <SelectWrap>
                  <Select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                  >
                    <option>مرض عارض</option>
                    <option>مراجعة متابعة</option>
                    <option>فحص سنوي</option>
                    <option>استشارة</option>
                    <option>أخرى</option>
                  </Select>
                </SelectWrap>
              </div>

              <Spacer16 />

              {/* التأمين */}
              <div>
                <Label>شركة التأمين والخطة *</Label>
                <Input
                  placeholder="مثال: BUPA — Classic"
                  value={insurancePlan}
                  onChange={(e) => setInsurancePlan(e.target.value)}
                />
              </div>

              <Spacer16 />

              {/* مراجع جديد/سابق */}
              <div>
                <Label>نوع المراجع</Label>
                <Toggle>
                  <ToggleBtn
                    $active={isNewPatient}
                    onClick={() => setIsNewPatient(true)}
                    type="button"
                  >
                    مراجع جديد
                  </ToggleBtn>
                  <ToggleBtn
                    $active={!isNewPatient}
                    onClick={() => setIsNewPatient(false)}
                    type="button"
                  >
                    مراجع سابق
                  </ToggleBtn>
                </Toggle>
              </div>

              <Spacer16 />

              {/* الموقع */}
              <div>
                <Label>الموقع</Label>
                <SelectWrap>
                  <Select
                    value={activeLocation}
                    onChange={(e) => setActiveLocation(e.target.value)}
                  >
                    {doctor.locationOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </Select>
                </SelectWrap>
              </div>

              <Spacer16 />

              {/* التوافر من الباكند: أقرب 3 أيام بدءاً من أول يوم متاح */}
              <div>
                <Label>المواعيد المتاحة *</Label>
                <AvailBlock>
                  {visibleDays.length === 0 ? (
                    <P>لا توجد مواعيد متاحة حاليًا.</P>
                  ) : (
                    visibleDays.map((day, idx) => (
                      <div key={day.date + idx}>
                        <DayHeader>{day.title}</DayHeader>
                        <TimesRow>
                          {day.slots.slice(0, 7).map((t) => {
                            const selected =
                              selectedSlot?.date === day.date &&
                              selectedSlot?.time === t;
                            return (
                              <TimeBtn
                                key={t}
                                $selected={selected}
                                onClick={() => handlePickTime(day.date, t)}
                                type="button"
                                aria-pressed={selected}
                              >
                                {t}
                              </TimeBtn>
                            );
                          })}
                          {day.slots.length > 7 && (
                            <MoreBtn type="button">المزيد</MoreBtn>
                          )}
                        </TimesRow>
                      </div>
                    ))
                  )}
                  {visibleDays.length > 0 && (
                    <OutlineBtn type="button">عرض المزيد من التوافر</OutlineBtn>
                  )}
                </AvailBlock>
              </div>
            </Section>
          </Card>
        </PhoneInner>
      </Phone>

      <BottomBar>
        <BookBtn onClick={goToStep2} disabled={!canProceedStep1}>
          احجز الموعد الآن
        </BookBtn>
      </BottomBar>
    </>
  );
};

export default Website;
