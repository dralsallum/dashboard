import React, { useEffect, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import styled, { css, keyframes } from "styled-components";
import { Star, ChevronDown } from "lucide-react";
import { publicRequest } from "../../requestMethods";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import Location from "../../assets/location.png";

/* ---------- حركة التحميل ---------- */

const Increase = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
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

const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(246, 224, 94, 0.2);
  border-radius: 4px;
  overflow: hidden;

  position: relative;
`;
const LoadingSp = styled.span`
  margin-bottom: 12px;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  background-color: #f6e05e;
  border-radius: 4px;
  animation: ${Increase} 3s ease-out forwards;
  width: 0%;
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
  margin: 12px 0 0 0;
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

const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${C.ink500};
  font-size: 14px;
  margin-top: 2px;
`;

const Tiny = styled.div`
  color: ${C.ink500};
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

const TextArea = styled.textarea`
  width: 100%;
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  color: ${C.ink900};
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;

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

/* ---------- Payment Method Cards ---------- */
const PaymentMethodCard = styled.button`
  width: 100%;
  background: #fff;
  border: 2px solid ${(p) => (p.$selected ? C.ink900 : C.line)};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: right;
  margin-bottom: 12px;

  &:hover {
    border-color: ${C.ink900};
    transform: translateY(-2px);
  }
`;

const PaymentMethodTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${C.ink900};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PaymentMethodDesc = styled.div`
  font-size: 14px;
  color: ${C.ink600};
  line-height: 1.5;
`;

const PriceHighlight = styled.div`
  background: ${C.yellow};
  border: 2px solid ${C.yellowBorder};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

const PriceAmount = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${C.ink900};
  margin-bottom: 4px;
`;

const PriceLabel = styled.div`
  font-size: 14px;
  color: ${C.ink700};
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
  padding: 4px;
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

const LocImg = styled.img`
  width: 14px;
  height: 14px;
  opacity: 0.8;
  margin: 0 0 0 2px;
  padding: 0;
`;

const LocationSp = styled.span`
  color: #000;
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  color: #2e7d32;
  font-family: "system-ui", sans-serif;
  background-color: #f8fff8;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const SuccessIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 12px 0;
`;

const SuccessMessage = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin: 0;
`;

const SuccessBtn = styled.button`
  background-color: #f7e05e;
  color: white;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0 0 0;

  &:hover {
    background-color: #ffdf2dff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
  }
`;

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
  const [activeTab] = useState("الحجز");
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
  const [patientInfo, setPatientInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleMore = (dateKey) => {
    setSlotsToShowPerDay((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || 8) + 8,
    }));
  };

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
          rating: data.rating,
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
              <Subtle>{doctor.specialty}</Subtle>
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
          {reviewToggle ? (
            <Card>
              <Section>
                <Row $gap={12} $align="flex-start">
                  <Big>{doctor.rating.toFixed(2)}</Big>
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
                    <LinkText style={{ marginTop: 8 }}>
                      عرض جميع التقييمات
                    </LinkText>
                  </Grow>
                </Row>
              </Section>
            </Card>
          ) : null}

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
