import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { publicRequest } from "../../requestMethods";
import { useParams } from "react-router-dom";
import Location from "../../assets/location.png";
import AetnaLogo from "../../assets/aetna.png";
import CignaLogo from "../../assets/cigna.png";
import {
  Increase,
  LoadingWrapper,
  LoadingBar,
  LoadingSp,
  LoadingBarFill,
  C,
  Phone,
  PhoneInner,
  Card,
  Section,
  SectionHeader,
  HeaderRow,
  Avatar,
  Title,
  Subtle,
  LocationDiv,
  Tiny,
  Row,
  Grow,
  Heading20,
  P,
  LinkText,
  TabsBar,
  TabBtn,
  Big,
  Stars,
  Label,
  SelectWrap,
  Select,
  TextArea,
  Toggle,
  ToggleBtn,
  AvailBlock,
  DayHeader,
  TimesRow,
  TimeBtn,
  MoreBtn,
  OutlineBtn,
  FormGroup,
  FormLabel,
  FormInput,
  BackBtn,
  AppointmentSummary,
  SummaryRow,
  PaymentMethodCard,
  PaymentMethodTitle,
  PaymentMethodDesc,
  PriceHighlight,
  PriceAmount,
  PriceLabel,
  TwoCol,
  Spacer16,
  BottomBar,
  BookBtn,
  KPI,
  LocImg,
  SuccessWrapper,
  SuccessIcon,
  SuccessTitle,
  SuccessMessage,
  SuccessBtn,
  InsuranceList,
  InsuranceItem,
  InsuranceLogo,
  InsuranceName,
  CardPad,
  SeeMoreLink,
  CheckCoverageButton,
  FaqContainer,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
  DocExpertiseContainer,
  DocExpertiseDescription,
  DocExpertiseList,
  DocExpertiseItem,
  DocExpertiseCheckmark,
  DocExpertiseItemText,
  ReviewCard,
  ReviewTitle,
  ReviewSubtitle,
  ReviewMetricsContainer,
  ReviewMetricSection,
  ReviewMetricLabel,
  ReviewRatingLarge,
  ReviewStarsContainer,
  ReviewStar,
  ReviewRatingText,
  ReviewTrustNote,
  ReviewLink,
  ReviewControlsContainer,
  ReviewSelect,
  ReviewSearchContainer,
  ReviewSearchIcon,
  ReviewSearchInput,
  ReviewItemContainer,
  ReviewItemStars,
  ReviewItemStar,
  ReviewItemMeta,
  ReviewItemText,
  RateFlex,
} from "./Website.elements";

/* ---------- حركة التحميل ---------- */

const StarReview = ({ fillPercentage = 0, size = 20 }) => {
  const starId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={starId} x1="1" x2="0" y1="0" y2="0">
          <stop offset={`${fillPercentage * 100}%`} stopColor="#FFB800" />
          <stop offset={`${fillPercentage * 100}%`} stopColor="#ddd" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={`url(#${starId})`}
        stroke="#ddd"
        strokeWidth="0.5"
      />
    </svg>
  );
};

/* ===================================================== */
const Website = () => {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("الحجز");
  const [activeLocation, setActiveLocation] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [err, setErr] = useState("");
  const [visibleDays, setVisibleDays] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState("مرض عارض");
  const [describe, setDescribe] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
  const [slotsToShowPerDay, setSlotsToShowPerDay] = useState({});
  const [daysToShow, setDaysToShow] = useState(3);
  const [allAvailableDays, setAllAvailableDays] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [sortBy, setSortBy] = useState("الأكثر صلة");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const fmtDayTitle = (dateISO) => {
    const d = new Date(dateISO + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dKey = d.toISOString().split("T")[0];
    const tKey = today.toISOString().split("T")[0];
    const tmKey = tomorrow.toISOString().split("T")[0];

    const fmt = (opts) =>
      d.toLocaleDateString("ar", { ...opts, calendar: "gregory" });

    if (dKey === tKey)
      return `اليوم، ${fmt({ month: "short", day: "numeric" })}`;
    if (dKey === tmKey)
      return `غدًا، ${fmt({ month: "short", day: "numeric" })}`;
    return fmt({ weekday: "long", month: "short", day: "numeric" });
  };

  const isSlotBooked = (date, time) => {
    return bookedSlots[date]?.includes(time) || false;
  };

  const handleShowMoreDays = () => {
    const newDaysToShow = daysToShow + 3;
    setDaysToShow(newDaysToShow);

    const nextDays = allAvailableDays.slice(0, newDaysToShow);
    const normalized = nextDays.map((day) => ({
      date: day.date,
      title: fmtDayTitle(day.date),
      slots: day.availableSlots,
    }));
    setVisibleDays(normalized);
  };

  useEffect(() => {
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

        const extractedBusinessId = data?._id;
        if (!extractedBusinessId) {
          throw new Error("Business ID not found in response");
        }

        setBusinessId(extractedBusinessId);

        // Store payment settings
        const paymentConfig = data?.appointmentSettings?.paymentSettings;
        setPaymentSettings(paymentConfig);

        const mapped = {
          name:
            data?.docFirstName && data?.docLastName
              ? `د.${data?.docFirstName} ${data?.docLastName}`
              : data.username,
          specialty: data?.major || "طبيب تجميل",
          location: data?.location || "الرياض",
          allowReview: data?.appointmentSettings.reviewSettings.enabled || true,
          expertise: data?.expertise || null,
          rating: data.appointmentSettings.reviewSettings.rating || null,
          reviewHighlight: "تجربة ممتازة، إنصات واهتمام ونصائح واضحة",
          inNetwork: "تأمينات متعددة (Aetna, BCBS, Cigna, ...)",
          avatar:
            data?.profileImg ||
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=256&q=80",
          locationOptions: [
            data?.storeSettings?.description ? "العيادة" : "زيارة في العيادة",
            "زيارة عبر الفيديو",
          ],
          businessId: extractedBusinessId,
        };

        setDoctor(mapped);
        setActiveLocation(mapped.locationOptions[0]);
        if (data.rating) {
          setReviewToggle(true);
        }
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

        const bookedRes = await publicRequest.get(
          `/quota/booked-slots/${extractedBusinessId}`,
          {
            params: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          }
        );

        setBookedSlots(bookedRes.data?.bookedSlots || {});

        const availabilityWithBookings = availability.map((day) => {
          const availableSlots = (day.availableSlots || []).filter(
            (slot) => !bookedRes.data?.bookedSlots[day.date]?.includes(slot)
          );

          return {
            ...day,
            availableSlots,
          };
        });

        const daysWithSlots = availabilityWithBookings.filter(
          (d) => Array.isArray(d.availableSlots) && d.availableSlots.length > 0
        );
        setAllAvailableDays(daysWithSlots);

        const firstAvailableIdx = availabilityWithBookings.findIndex(
          (d) => Array.isArray(d.availableSlots) && d.availableSlots.length > 0
        );

        if (firstAvailableIdx === -1) {
          setVisibleDays([]);
        } else {
          const nextThree = availabilityWithBookings.slice(
            firstAvailableIdx,
            firstAvailableIdx + 3
          );
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
  }, [slug]);

  const handlePickTime = (date, time) => {
    if (isSlotBooked(date, time)) {
      return;
    }
    setSelectedSlot({ date, time });
  };

  const canProceedStep1 = appointmentType && activeLocation && selectedSlot;

  const goToStep2 = () => {
    if (!canProceedStep1) return;
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToSelection = () => {
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPatientInfo = () => {
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (field, value) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Check if payment step should be shown
  const shouldShowPaymentStep = () => {
    return paymentSettings?.enabled && paymentSettings?.appointmentFee > 0;
  };

  const goToStep3 = () => {
    const isFormValid =
      patientInfo.email &&
      patientInfo.firstName &&
      patientInfo.lastName &&
      patientInfo.phoneNumber &&
      describe;

    if (!isFormValid) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    // If payment is enabled and fee > 0, go to payment step
    if (shouldShowPaymentStep()) {
      setBookingStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Skip payment step and submit directly
      handleBookingSubmit();
    }
  };

  const handleBookingSubmit = async () => {
    // If on step 3 (payment), validate payment method selection
    if (bookingStep === 3 && !paymentMethod) {
      alert("الرجاء اختيار طريقة الدفع");
      return;
    }

    if (!businessId) {
      alert("خطأ: لم يتم العثور على معرف العيادة");
      return;
    }

    if (isSlotBooked(selectedSlot?.date, selectedSlot?.time)) {
      alert("عذراً، هذا الموعد تم حجزه بالفعل. الرجاء اختيار وقت آخر.");
      setBookingStep(1);
      return;
    }

    setSubmitting(true);

    try {
      const appointmentDetailsText = `
نوع الموعد: ${appointmentType}
الموقع: ${activeLocation}
نوع المراجع: ${isNewPatient ? "مراجع جديد" : "مراجع سابق"}
التاريخ: ${fmtDayTitle(selectedSlot?.date)}
الوقت: ${selectedSlot?.time}
الطبيب: ${doctor?.name}
التخصص: ${doctor?.specialty}
وصف الزيارة: ${describe}
${paymentMethod ? `طريقة الدفع: ${paymentMethod}` : ""}
${
  shouldShowPaymentStep()
    ? `قيمة الموعد: ${paymentSettings.appointmentFee} ريال`
    : ""
}
      `.trim();

      const quotaData = {
        firstName: patientInfo.firstName,
        lastName: patientInfo.lastName,
        email: patientInfo.email,
        phoneNumber: patientInfo.phoneNumber,
        weddingDate: selectedSlot?.date,
        guestCount: appointmentType,
        weddingDetails: appointmentDetailsText,
        visitTime: selectedSlot?.time,
        businessId: businessId,
        paymentMethod: paymentMethod || "غير محدد",
        appointmentFee: shouldShowPaymentStep()
          ? paymentSettings.appointmentFee
          : 0,
      };

      const response = await publicRequest.post("/quota", quotaData);

      setBookedSlots((prev) => ({
        ...prev,
        [selectedSlot.date]: [
          ...(prev[selectedSlot.date] || []),
          selectedSlot.time,
        ],
      }));

      setBookingStep(1);
      setSelectedSlot(null);
      setDescribe("");
      setPaymentMethod("");
      setPatientInfo({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);

      if (error.response?.status === 409) {
        alert("عذراً، هذا الموعد تم حجزه للتو. الرجاء اختيار وقت آخر.");
        setBookingStep(1);
      } else {
        alert("حدث خطأ أثناء الحجز. الرجاء المحاولة مرة أخرى.");
      }
    } finally {
      setIsSuccess(true);
    }
  };

  const handleSuccess = () => {
    setIsSuccess(false);
  };

  if (loading)
    return (
      <LoadingWrapper>
        <LoadingSp>جاري التحميل…</LoadingSp>
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
      </LoadingWrapper>
    );

  if (isSuccess)
    return (
      <LoadingWrapper>
        <SuccessWrapper>
          <SuccessIcon
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success"
          />
          <SuccessTitle>تم حجز موعدك بنجاح </SuccessTitle>
          <SuccessMessage>
            ستصلك رسالة تأكيد الموعد على بريدك الإلكتروني وواتساب قريبًا.
          </SuccessMessage>
          <SuccessBtn onClick={handleSuccess}>الرجوع للحجز</SuccessBtn>
        </SuccessWrapper>
      </LoadingWrapper>
    );

  if (err)
    return (
      <div style={{ padding: 24, color: "crimson", direction: "rtl" }}>
        {err}
      </div>
    );

  if (!doctor) return null;

  const reviews = [
    {
      rating: 5,
      date: "منذ أكثر من سنة",
      initials: "DS",
      text: "",
      source: "",
    },
    {
      rating: 2,
      date: "منذ أكثر من سنة",
      initials: "مخفي",
      text: "",
      source: "شريك",
    },
    {
      rating: 5,
      date: "منذ أكثر من سنة",
      initials: "AB",
      text: "",
      source: "",
    },
  ];

  const insuranceData = [
    { name: "aenta", img: AetnaLogo },
    { name: "cigna", img: CignaLogo },
  ];

  const faqs = [
    {
      question: `كم من الوقت يستغرق حجز موعد مع  ${doctor.name}؟`,
      answer: `بشكل عام، لدى ${doctor.name}؟ مواعيد متاحة على وقتنا في غضون أسبوع واحد. يمكنك رؤية أقرب موعد متاح على وقتنا وحجز موعد عبر الإنترنت.`,
    },
    {
      question: `هل يقبل ${doctor.name}؟ مرضى جدد؟`,
      answer: `يقبل ${doctor.name}؟ عمومًا مرضى جدد على وقتنا. يمكنك رؤية أقرب موعد متاح على وقتنا وجدولة موعد عبر الإنترنت.`,
    },
    {
      question: `هل يقبل ${doctor.name}؟ تأميني؟`,
      answer: `اختر خطة التأمين الخاصة بك للتحقق مما إذا كان ضمن الشبكة.`,
    },
    {
      question: `هل يمكنني حجز موعد مع ${doctor.name}؟ عبر الإنترنت؟`,
      answer: "نعم، يمكنك حجز موعد عبر الإنترنت مع باستخدام وقتنا. الأمر بسيط.",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "الحجز":
        return (
          <Card>
            <SectionHeader>
              <Heading20>احجز موعدك اليوم</Heading20>
              <P>أكمل التفاصيل ثم اختر الوقت، واضغط زر الحجز للمتابعة.</P>
            </SectionHeader>

            <Section>
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

              <div>
                <Label>المواعيد المتاحة *</Label>
                <AvailBlock>
                  {visibleDays.length === 0 ? (
                    <P>لا توجد مواعيد متاحة حاليًا.</P>
                  ) : (
                    visibleDays.map((day, idx) => {
                      const slotsToShow = slotsToShowPerDay[day.date] || 8;
                      const hasMoreSlots = day.slots.length > slotsToShow;

                      return (
                        <div key={day.date + idx}>
                          <DayHeader>{day.title}</DayHeader>
                          <TimesRow>
                            {day.slots.slice(0, slotsToShow).map((t) => {
                              const selected =
                                selectedSlot?.date === day.date &&
                                selectedSlot?.time === t;
                              const booked = isSlotBooked(day.date, t);

                              return (
                                <TimeBtn
                                  key={t}
                                  $selected={selected}
                                  $booked={booked}
                                  onClick={() => handlePickTime(day.date, t)}
                                  type="button"
                                  aria-pressed={selected}
                                  disabled={booked}
                                  style={{
                                    cursor: booked ? "not-allowed" : "pointer",
                                    opacity: booked ? 0.5 : 1,
                                    backgroundColor: booked
                                      ? "#e0e0e0"
                                      : selected
                                      ? "#4b90f2"
                                      : "#fff",
                                    color: booked
                                      ? "#999"
                                      : selected
                                      ? "#fff"
                                      : "#000",
                                  }}
                                >
                                  {t}
                                </TimeBtn>
                              );
                            })}
                            {hasMoreSlots && (
                              <MoreBtn
                                type="button"
                                onClick={() => handleMore(day.date)}
                              >
                                المزيد
                              </MoreBtn>
                            )}
                          </TimesRow>
                        </div>
                      );
                    })
                  )}
                  {visibleDays.length > 0 &&
                    visibleDays.length < allAvailableDays.length && (
                      <OutlineBtn type="button" onClick={handleShowMoreDays}>
                        عرض المزيد من التوافر
                      </OutlineBtn>
                    )}
                </AvailBlock>
              </div>
            </Section>
          </Card>
        );
      case "عن الطبيب":
        return (
          <Card>
            <DocExpertiseContainer>
              <ReviewTitle>مجالات الخبرة</ReviewTitle>

              <DocExpertiseDescription>
                تعزز خبرة هذا الطبيب كفاءته في الحالات المشابهة. فيما يلي
                الحالات أو العمليات الجراحية التي يعالجها بشكل متكرر
              </DocExpertiseDescription>

              <DocExpertiseList>
                {doctor.expertise.map((area, index) => (
                  <DocExpertiseItem key={index}>
                    <DocExpertiseCheckmark />
                    <DocExpertiseItemText>{area}</DocExpertiseItemText>
                  </DocExpertiseItem>
                ))}
              </DocExpertiseList>
            </DocExpertiseContainer>
          </Card>
        );
      case "التأمين":
        return (
          <Card>
            <CardPad>
              <ReviewTitle>التأمينات الطبية المشمولة</ReviewTitle>

              <InsuranceList>
                {insuranceData.map((item, index) => {
                  // Changed from InsuranceList to insuranceData
                  return (
                    <InsuranceItem key={index}>
                      <InsuranceLogo src={item.img} alt="Aetna" />
                      <InsuranceName>{item.name}</InsuranceName>
                    </InsuranceItem>
                  );
                })}
              </InsuranceList>

              <SeeMoreLink>عرض المزيد</SeeMoreLink>

              <CheckCoverageButton>
                تحقق من تغطية التأمين الخاص بك
              </CheckCoverageButton>
            </CardPad>
          </Card>
        );
      case "التقييمات":
        return (
          <Card>
            <ReviewCard>
              <ReviewTitle>تقييمات المرضى</ReviewTitle>
              <ReviewSubtitle>
                جميع التقييمات تم إرسالها من قبل المرضى بعد التفاعل مع العيادة.
              </ReviewSubtitle>

              <ReviewMetricsContainer>
                <ReviewMetricSection>
                  <ReviewMetricLabel>التقييم الإجمالي</ReviewMetricLabel>
                  <ReviewRatingLarge>{doctor.rating}</ReviewRatingLarge>
                  <Grow>
                    <KPI $mt={4} $size={0}>
                      <Stars style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: 5 }).map((_, i) => {
                          const fillPercentage = Math.min(
                            Math.max(doctor.rating - i, 0),
                            1
                          );
                          return (
                            <StarReview
                              key={i}
                              fillPercentage={fillPercentage}
                              size={20}
                            />
                          );
                        })}
                      </Stars>
                    </KPI>
                    <P $size={14}>{doctor.reviewHighlight}</P>
                  </Grow>
                </ReviewMetricSection>

                <ReviewMetricSection>
                  <ReviewMetricLabel>وقت الانتظار</ReviewMetricLabel>
                  <ReviewStarsContainer style={{ marginBottom: "16px" }}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <ReviewStar key={index} filled={index < doctor.rating}>
                        ★
                      </ReviewStar>
                    ))}
                    <ReviewRatingText>5.00</ReviewRatingText>
                  </ReviewStarsContainer>

                  <ReviewMetricLabel>أسلوب التعامل</ReviewMetricLabel>
                  <ReviewStarsContainer>
                    {Array.from({ length: 5 }, (_, index) => (
                      <ReviewStar key={index} filled={index < doctor.rating}>
                        ★
                      </ReviewStar>
                    ))}
                    <ReviewRatingText>5.00</ReviewRatingText>
                  </ReviewStarsContainer>
                </ReviewMetricSection>
              </ReviewMetricsContainer>

              <ReviewTrustNote>
                ثقتك هي أهم اهتماماتنا، لذلك لا يمكن لمقدمي الخدمة الدفع لتغيير
                أو إزالة التقييمات. كما أننا لا ننشر التقييمات التي تحتوي على أي
                معلومات صحية خاصة بالمريض.{" "}
                <ReviewLink>اعرف المزيد هنا</ReviewLink>
              </ReviewTrustNote>

              <ReviewControlsContainer>
                <ReviewSelect
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="الأكثر صلة">الأكثر صلة</option>
                  <option value="الأحدث">الأحدث</option>
                  <option value="الأقدم">الأقدم</option>
                  <option value="الأعلى تقييماً">الأعلى تقييماً</option>
                  <option value="الأقل تقييماً">الأقل تقييماً</option>
                </ReviewSelect>

                <ReviewSearchContainer>
                  <ReviewSearchIcon>🔍</ReviewSearchIcon>
                  <ReviewSearchInput
                    type="text"
                    placeholder="بحث"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </ReviewSearchContainer>
              </ReviewControlsContainer>

              {reviews.map((review, index) => (
                <ReviewItemContainer key={index}>
                  <ReviewItemStars>
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <ReviewItemStar
                        key={starIndex}
                        filled={starIndex < review.rating}
                      >
                        ★
                      </ReviewItemStar>
                    ))}
                  </ReviewItemStars>
                  <ReviewItemMeta>
                    <span>{review.date}</span>
                    <span>•</span>
                    <span>{review.initials}</span>
                    {review.source && (
                      <>
                        <span>•</span>
                        <span>المصدر: {review.source}</span>
                      </>
                    )}
                  </ReviewItemMeta>
                  {review.text && (
                    <ReviewItemText>{review.text}</ReviewItemText>
                  )}
                </ReviewItemContainer>
              ))}
            </ReviewCard>
          </Card>
        );
      case "الأسئلة الشائعة":
        return (
          <Card>
            <FaqContainer>
              <ReviewTitle>الأسئلة الشائعة</ReviewTitle>
              {faqs.map((faq, index) => (
                <FaqItem key={index}>
                  <FaqQuestion>{faq.question}</FaqQuestion>
                  <FaqAnswer>{faq.answer}</FaqAnswer>
                </FaqItem>
              ))}
            </FaqContainer>
          </Card>
        );
    }
  };

  /* ---------- Step 3: Payment Method ---------- */
  if (bookingStep === 3) {
    const canProceed = paymentMethod !== "";

    return (
      <>
        <Phone>
          <PhoneInner>
            <Card>
              <Section>
                <BackBtn onClick={handleBackToPatientInfo}>العودة→</BackBtn>
              </Section>

              <SectionHeader>
                <Heading20>اختر طريقة الدفع</Heading20>
                <P>اختر كيف تريد الدفع مقابل موعدك</P>
              </SectionHeader>

              <Section>
                <AppointmentSummary>
                  <DayHeader style={{ fontSize: 16, marginBottom: 12 }}>
                    ملخص الموعد
                  </DayHeader>
                  <SummaryRow>
                    <strong>{doctor.name}</strong> - {doctor.specialty}
                  </SummaryRow>
                  <SummaryRow>
                    📅 {fmtDayTitle(selectedSlot?.date)} في {selectedSlot?.time}
                  </SummaryRow>
                  <SummaryRow>📍 {activeLocation}</SummaryRow>
                  <SummaryRow>📝 {appointmentType}</SummaryRow>
                </AppointmentSummary>

                <PriceHighlight>
                  <PriceAmount>
                    {paymentSettings?.appointmentFee} ريال
                  </PriceAmount>
                  <PriceLabel>قيمة الموعد</PriceLabel>
                </PriceHighlight>

                <div>
                  {paymentSettings?.allowOnlinePayment && (
                    <PaymentMethodCard
                      type="button"
                      $selected={paymentMethod === "تحويل بنكي"}
                      onClick={() => setPaymentMethod("تحويل بنكي")}
                    >
                      <PaymentMethodTitle>
                        💳 الدفع عبر التحويل البنكي
                      </PaymentMethodTitle>
                      <PaymentMethodDesc>
                        قم بتحويل المبلغ الآن وسيتم تأكيد موعدك فوراً
                      </PaymentMethodDesc>
                    </PaymentMethodCard>
                  )}

                  {paymentSettings?.allowPayOnArrival && (
                    <PaymentMethodCard
                      type="button"
                      $selected={paymentMethod === "الدفع عند الحضور"}
                      onClick={() => setPaymentMethod("الدفع عند الحضور")}
                    >
                      <PaymentMethodTitle>
                        🏥 الدفع عند الحضور
                      </PaymentMethodTitle>
                      <PaymentMethodDesc>
                        ادفع عندما تصل إلى العيادة في يوم موعدك
                      </PaymentMethodDesc>
                    </PaymentMethodCard>
                  )}
                </div>

                {paymentMethod === "تحويل بنكي" && (
                  <AppointmentSummary style={{ marginTop: 16 }}>
                    <DayHeader style={{ fontSize: 14, marginBottom: 8 }}>
                      معلومات التحويل البنكي
                    </DayHeader>
                    <P style={{ marginBottom: 8 }}>
                      يرجى التحويل إلى الحساب التالي:
                    </P>
                    <SummaryRow>
                      <strong>اسم البنك:</strong> البنك الأهلي
                    </SummaryRow>
                    <SummaryRow>
                      <strong>رقم الحساب:</strong> SA1234567890
                    </SummaryRow>
                    <SummaryRow>
                      <strong>المبلغ:</strong> {paymentSettings?.appointmentFee}{" "}
                      ريال
                    </SummaryRow>
                    <P style={{ marginTop: 12, fontSize: 13, color: C.ink500 }}>
                      ملاحظة: يرجى إرسال إثبات التحويل عبر الواتساب بعد الحجز
                    </P>
                  </AppointmentSummary>
                )}
              </Section>
            </Card>
          </PhoneInner>
        </Phone>

        <BottomBar>
          <BookBtn
            onClick={handleBookingSubmit}
            disabled={!canProceed || submitting}
          >
            {submitting ? "جاري الحجز..." : "تأكيد الحجز"}
          </BookBtn>
        </BottomBar>
      </>
    );
  }

  /* ---------- Step 2: Patient Information ---------- */
  if (bookingStep === 2) {
    const isFormValid =
      patientInfo.email &&
      patientInfo.firstName &&
      patientInfo.lastName &&
      patientInfo.phoneNumber &&
      describe;

    return (
      <>
        <Phone>
          <PhoneInner>
            <Card>
              <Section>
                <BackBtn onClick={handleBackToSelection}>← العودة</BackBtn>
              </Section>

              <SectionHeader>
                <Heading20>أخبرنا قليلاً عنك</Heading20>
                <P>لحجز موعدك، نحتاج للتحقق من بعض المعلومات</P>
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
                  {shouldShowPaymentStep() && (
                    <SummaryRow>
                      💰 قيمة الموعد: {paymentSettings.appointmentFee} ريال
                    </SummaryRow>
                  )}
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
                  <FormLabel>رقم الهاتف *</FormLabel>
                  <FormInput
                    type="tel"
                    value={patientInfo.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="05xxxxxxxx"
                    required
                  />
                </FormGroup>

                <div>
                  <Label>وصف الزيارة *</Label>
                  <TextArea
                    placeholder="مثال: أعاني من آلام في الركبة منذ أسبوع"
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                  />
                </div>
              </Section>
            </Card>
          </PhoneInner>
        </Phone>

        <BottomBar>
          <BookBtn onClick={goToStep3} disabled={!isFormValid || submitting}>
            {shouldShowPaymentStep()
              ? "التالي: الدفع"
              : submitting
              ? "جاري الحجز..."
              : "تأكيد الحجز"}
          </BookBtn>
        </BottomBar>
      </>
    );
  }

  /* ---------- Step 1: Select Appointment Time ---------- */
  return (
    <>
      <Phone>
        <PhoneInner>
          <HeaderRow>
            <Avatar src={doctor.avatar} alt="doctor" />

            <div>
              <Title>{doctor.name}</Title>

              <Row $align="center" $gap={6}>
                <Subtle>{doctor.specialty}</Subtle>

                {/* Rating next to specialty */}
                {reviewToggle && doctor.allowReview ? (
                  <Row $align="center" $gap={2}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const fillPercentage = Math.min(
                        Math.max(doctor.rating - i, 0),
                        1
                      );
                      return (
                        <StarReview
                          key={i}
                          fillPercentage={fillPercentage}
                          size={14} // ⭐ Smaller stars
                        />
                      );
                    })}
                    <Tiny style={{ fontSize: "13px", color: "#888" }}>
                      ({doctor.rating.toFixed(1)})
                    </Tiny>
                  </Row>
                ) : null}
              </Row>

              <LocationDiv
                style={{ cursor: "pointer", color: "#4b90f2" }}
                onClick={() => {
                  const query = encodeURIComponent(doctor.location);
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${query}`,
                    "_blank"
                  );
                }}
              >
                <LocImg src={Location} alt="" />
                <span>موقع العيادة</span>
              </LocationDiv>
            </div>
          </HeaderRow>

          <TabsBar>
            {[
              "الحجز",
              "عن الطبيب",
              "التأمين",
              "التقييمات",
              "الأسئلة الشائعة",
            ].map((t) => (
              <TabBtn
                key={t}
                $active={t === activeTab}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </TabBtn>
            ))}
          </TabsBar>
          {/* it is gonna be here */}
          {renderContent()}
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
