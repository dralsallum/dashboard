import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowUpDown,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Filter,
  Globe,
  LayoutGrid,
  Maximize2,
  Minus,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import NavSide from "../NavSide/NavSide";
import { userRequest } from "../../requestMethods";
import { setStoreName, setActiveTab } from "../../redux/tabRedux";
import { setSettingTab } from "../../redux/settingRedux";
import {
  updateBusinessProfile,
  updateStoreName,
  userSelector,
  clearState,
  signOut,
} from "../../redux/userRedux";
import * as S from "./Dashboard.elements";

// Tab icons
import ordersIcon from "../../assets/orders.png";
import tagIcon from "../../assets/tag.png";
import discountsIcon from "../../assets/discount.png";
import contentIcon from "../../assets/content.png";
import marketsIcon from "../../assets/markets.png";
// Illustrations
import ordersImage from "../../assets/order.png";
import draftImage from "../../assets/draft.svg";
import customersImage from "../../assets/customerImage.svg";
import contentImage from "../../assets/content.svg";
import abandonImage from "../../assets/abandon.svg";
import inventoryImage from "../../assets/inventory.svg";
import historyImage from "../../assets/historyPur.svg";
import giftImage from "../../assets/gift.svg";
import transferImage from "../../assets/transfer.svg";
import automationImage from "../../assets/automation.svg";
import campaignImage from "../../assets/campaign.svg";
import stateImage from "../../assets/state.svg";
import discountImage from "../../assets/discount.svg";
import productsImage from "../../assets/products.svg";
// Brand / product images
import paypalIcon from "../../assets/paypal.svg";
import visaIcon from "../../assets/visa.svg";
import madaIcon from "../../assets/mada.jpg";
import domesticIcon from "../../assets/domestic.png";
import internationalIcon from "../../assets/international.png";
import WeddingCake from "../../assets/weddingCake.png";
import Flower from "../../assets/flowerBrand.png";
import Board from "../../assets/board.png";
import Board2 from "../../assets/board2.png";
import Board3 from "../../assets/board3.png";
import Chair from "../../assets/chair.webp";
import logo from "../../assets/logoWhite.png";

/* ============================================================
   Constants & helpers
   ============================================================ */

const BASE_URL = "https://amanapi-f8ce9693a253.herokuapp.com/api";
const T = S.theme;

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const DAY_LABELS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const MONTH_LABELS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const ORDER_FILTERS = [
  "الكل",
  "مدفوع",
  "مفتوح",
  "فشل",
  "قيد المراجعة",
  "تم الاسترداد",
  "ملغي",
];
const DEFAULT_STATUS = "قيد المراجعة";
const ORDERS_PAGE_SIZE = 10;

const STATUS_TONES = {
  مدفوع: "success",
  مكتملة: "success",
  completed: "success",
  paid: "success",
  "قيد المراجعة": "warning",
  مفتوح: "warning",
  pending: "warning",
  فشل: "danger",
  ملغي: "danger",
  ملغية: "danger",
  cancelled: "danger",
  failed: "danger",
};

const shortDateFmt = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

const formatDayLabel = (date) =>
  `${DAY_LABELS[date.getDay()]}، ${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`;

// Local yyyy-mm-dd (toISOString shifts the day for UTC+3 near midnight)
const toDateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const isDayInRange = (day, start, end) =>
  start <= end ? day >= start && day <= end : day >= start || day <= end;

const generateTimeSlots = (startTime, endTime, interval = 30) => {
  if (!startTime || !endTime) return [];
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const slots = [];
  for (let m = sh * 60 + sm; m < eh * 60 + em; m += interval) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(
      `${h % 12 || 12}:${String(min).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`,
    );
  }
  return slots;
};

const parseWorkingHours = (wh) => {
  let first = null;
  let last = null;
  let start = "09:00";
  let end = "17:00";
  DAY_KEYS.forEach((key, i) => {
    const day = wh[key];
    if (!day?.isOpen) return;
    if (first === null) {
      first = i;
      const slot = day.slots?.[0];
      if (slot) {
        start = slot.startTime || start;
        end = slot.endTime || end;
      }
    }
    last = i;
  });
  return {
    start,
    end,
    startDay: String(first ?? 0),
    endDay: String(last ?? 4),
  };
};

// Generic input binder: bind(setState, "key") -> onChange handler
const bind = (setter, key) => (e) => {
  const { type, checked, value } = e.target;
  setter((prev) => ({ ...prev, [key]: type === "checkbox" ? checked : value }));
};

/* ============================================================
   Static content
   ============================================================ */

const HERO_CARDS = [
  {
    title: "اختر تصميم متجرك",
    text: "تصفّح التصاميم الجاهزة وابدأ بتخصيص واجهة متجرك.",
    images: [Board, Board2, Board3],
    primary: "تصفح المواقع",
    secondary: "اصنع",
    action: { type: "page", value: "المتجر" },
  },
  {
    title: "أضف منتجك الأول",
    text: "ابدأ بإضافة منتج وبعض التفاصيل الأساسية.",
    images: [Flower, WeddingCake, Chair],
    primary: "اضافة المنتجات",
    secondary: "استيراد",
    action: { type: "route", value: "/item" },
  },
];

const SETUP_CARDS = [
  {
    title: "أضف طرق الدفع",
    btn: "تفعيل",
    tab: "المدفوعات",
    logos: [paypalIcon, visaIcon, madaIcon],
    max: "5rem",
  },
  {
    title: "راجع أسعار الشحن الخاصة بك",
    btn: "مراجعة",
    tab: "الشحن",
    logos: [domesticIcon, internationalIcon],
    max: "4.5rem",
  },
  {
    title: "خصص نطاقك",
    btn: "تخصيص",
    tab: "الرابط",
    domain: "f8u1iq-av.myshopify.com",
  },
];

// Centered empty-state tabs
const EMPTY_TABS = {
  الخصومات: {
    icon: discountsIcon,
    image: discountImage,
    title: "الخصومات",
    heading: "إدارة الخصومات والعروض الترويجية",
    text: "أضف رموز خصم وخصومات تلقائية تُطبق عند إتمام الدفع. يمكنك أيضًا استخدام الخصومات مع الأسعار المقارنة.",
    cta: "انشاء خصومات",
    topic: "الخصومات",
  },
  المحتوى: {
    icon: contentIcon,
    image: contentImage,
    title: "المحتوى",
    heading: "بسّط عملية إنشاء المحتوى باستخدام الكائنات الوصفية",
    text: "تتيح لك الكائنات الوصفية تجميع الحقول وربطها بمختلف أجزاء متجرك. استخدمها لإنشاء محتوى مخصص أو هياكل بيانات خاصة بك.",
    cta: "اضافة تعريف",
    topic: "المحتوى",
  },
  مسودة: {
    icon: ordersIcon,
    image: draftImage,
    title: "مسودة",
    heading: "إنشاء الطلبات والفواتير يدويًا",
    text: "استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، واجمع المدفوعات.",
    cta: "انشاء مسودة طلب",
    topic: "الطلبات المسودة",
  },
  المخزون: {
    icon: ordersIcon,
    image: inventoryImage,
    title: "المخزون",
    heading: "تتبّع مخزونك في مكان واحد",
    text: "اعرف الكميات المتوفرة من كل منتج، وعدّلها يدويًا أو استوردها دفعة واحدة.",
    cta: "إدارة المخزون",
    topic: "المخزون",
  },
  "تاريخ الشراء": {
    icon: ordersIcon,
    image: historyImage,
    title: "تاريخ الشراء",
    heading: "تابع أوامر الشراء من الموردين",
    text: "أنشئ أوامر شراء لتتبّع المنتجات التي تطلبها من الموردين، وحدّث مخزونك تلقائيًا عند استلامها.",
    cta: "إنشاء أمر شراء",
    topic: "أوامر الشراء",
  },
  التحويل: {
    icon: ordersIcon,
    image: transferImage,
    title: "التحويل",
    heading: "انقل المخزون بين مواقعك",
    text: "سجّل تحويلات المخزون بين مستودعاتك أو فروعك وتابع حالتها حتى الاستلام.",
    cta: "إنشاء تحويل",
    topic: "التحويلات",
  },
  الهدايا: {
    icon: ordersIcon,
    image: giftImage,
    title: "الهدايا",
    heading: "بطاقات الهدايا",
    text: "أنشئ بطاقات هدايا يمكن لعملائك شراؤها لأحبّائهم أو استخدامها عند الدفع.",
    cta: "إنشاء بطاقة هدية",
    topic: "بطاقات الهدايا",
  },
};

const ORDERS_EMPTY = {
  icon: ordersIcon,
  image: ordersImage,
  title: "الطلبات",
  heading: "ستظهر طلباتك هنا",
  text: "للحصول على الطلبات وقبول المدفوعات من العملاء، تحتاج إلى اختيار خطة. سيتم فرض رسوم الخطة عليك فقط بعد انتهاء الفترة التجريبية المجانية.",
  cta: "اختار الخطة",
  to: "/pay",
  topic: "الطلبات",
};

// List-style tabs (toolbar + hero + promo)
const LIST_TABS = {
  المنتجات: {
    icon: ordersIcon,
    image: productsImage,
    title: "المنتجات",
    heading: "أضف منتجاتك",
    text: "ابدأ بتجهيز متجرك بمنتجات سيحبها عملاؤك.",
    primary: "اضافة منتج",
    secondary: "استورد",
    to: "/item",
    promo: {
      heading: "ابحث عن منتجات لبيعها",
      text: "اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه.",
      cta: "تصفح تطبيقات توريد المنتجات",
    },
  },
  العملاء: {
    icon: tagIcon,
    image: customersImage,
    title: "العملاء",
    heading: "كل ما يتعلق بالعملاء في مكان واحد",
    text: "قم بإدارة تفاصيل العملاء، واطّلع على سجل طلباتهم، وقم بتقسيمهم إلى مجموعات.",
    primary: "اضافة عميل",
    secondary: "استيراد العملاء",
    promo: {
      heading: "احصل على عملاء من خلال التطبيقات",
      text: "نمِّ قائمة عملائك من خلال إضافة نموذج لجمع بيانات العملاء إلى متجرك وحملاتك التسويقية.",
      cta: "اطّلع على التطبيقات الموصى بها",
    },
  },
  الحملات: {
    icon: ordersIcon,
    image: campaignImage,
    title: "الحملات",
    heading: "أطلق حملتك التسويقية الأولى",
    text: "خطّط لحملاتك عبر القنوات المختلفة وتابع أثرها على مبيعاتك من مكان واحد.",
    primary: "إنشاء حملة",
    promo: {
      heading: "زِد عدد الزوار باستخدام تطبيقات التسويق",
      text: "اربط حساباتك على منصات التواصل الاجتماعي والبريد الإلكتروني لإدارة حملاتك بسهولة.",
      cta: "استكشف تطبيقات التسويق",
    },
  },
  الاتمته: {
    icon: ordersIcon,
    image: automationImage,
    title: "الأتمتة",
    heading: "وفّر وقتك بالأتمتة",
    text: "أنشئ مسارات تلقائية لرسائل الترحيب، والسلات المتروكة، ومتابعة العملاء بعد الشراء.",
    primary: "إنشاء أتمتة",
  },
  "السلات المتروكة": {
    icon: ordersIcon,
    image: abandonImage,
    title: "السلات المتروكة",
    heading: "ستظهر عمليات الدفع المتروكة هنا",
    text: "اطّلع على الوقت الذي يضيف فيه العملاء منتجًا إلى سلة التسوق دون إتمام عملية الدفع. يمكنك أيضًا إرسال رابط السلة إلى العملاء عبر البريد الإلكتروني.",
    toolbar: false,
  },
};

const MARKET_TABS = {
  الأسواق: { title: "الأسواق" },
  جزء: { title: "جزء" },
  المجموعة: { title: "المجموعة", action: "اصنع مجموعة" },
};

const MARKETING_METRICS = [
  "جلسات المتجر الإلكتروني",
  "معدل التحويل",
  "متوسط قيمة الطلب",
  "إجمالي المبيعات",
  "المبيعات من التسويق",
  "الطلبات من التسويق",
];

const CAMPAIGNS = [
  {
    image: campaignImage,
    title: "مركز تتبع حملاتك التسويقية",
    text: "أنشئ حملات لتقييم مدى تأثير المبادرات التسويقية على أهداف عملك. سجّل نقاط التواصل عبر الإنترنت أو دون اتصال، وأضف أنشطة الحملات من قنوات تسويقية متعددة، وتابع النتائج بسهولة.",
    cta: "اصنع حملتك",
  },
  {
    image: stateImage,
    title: "زِد عدد الزوار باستخدام تطبيقات التسويق",
    text: "نمّ جمهورك على منصات التواصل الاجتماعي، واجذب عملاء جدد من خلال الاشتراك في النشرات البريدية، وزِد من معدلات التحويل باستخدام الدردشة، والمزيد.",
    cta: "استكشف تسويق التطبيقات",
  },
];

const ANALYTICS_KPIS = [
  { title: "صافي المبيعات", value: "0 ريال" },
  { title: "معدل عودة العملاء", value: "0%" },
  { title: "طلبات نفذت", value: "0" },
  { title: "الطلبات", value: "0" },
];

const ANALYTICS_BREAKDOWN = [
  { title: "كامل المبيعات", value: 0 },
  { title: "الخصومات", value: 0 },
  { title: "الترجيع", value: 0 },
  { title: "صافي المبيعات", value: 0, total: true },
  { title: "تكاليف الشحن", value: 0 },
  { title: "الضريبة", value: 0 },
  { title: "جميع المبيعات", value: 0, total: true },
];

const Y_LABELS = ["10 ريال", "5 ريال", "0 ريال"];
const X_LABELS = [
  "12 AM",
  "3 AM",
  "6 AM",
  "9 AM",
  "12 PM",
  "3 PM",
  "6 PM",
  "9 PM",
];

const DEFAULT_HOURS = {
  start: "09:00",
  end: "17:00",
  startDay: "0",
  endDay: "4",
};
const DEFAULT_PAYMENT = {
  enabled: true,
  appointmentFee: 1,
  allowPayOnArrival: true,
  allowOnlinePayment: true,
  requireUpfrontPayment: false,
};
const DEFAULT_REVIEWS = { enabled: true, rating: 4, review: 3 };
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=128&auto=format&fit=crop";

/* ============================================================
   Shared pieces
   ============================================================ */

const PageHeader = memo(({ icon, title, children }) => (
  <S.Row $between $wrap $gap="1rem">
    <S.Row>
      {icon && <S.TitleIcon src={icon} alt="" />}
      <S.PageTitle>{title}</S.PageTitle>
    </S.Row>
    {children && <S.Row>{children}</S.Row>}
  </S.Row>
));

const ReportActions = memo(() => (
  <>
    <S.Button type="button" $icon aria-label="تحديث">
      <RefreshCw size={15} />
    </S.Button>
    <S.Button type="button" $icon aria-label="توسيع">
      <Maximize2 size={15} />
    </S.Button>
    <S.Button type="button" $variant="primary">
      تخصيص
    </S.Button>
  </>
));

const DateFilters = memo(({ compare }) => (
  <S.Row $wrap>
    <S.Button type="button">
      <Calendar size={15} />
      اليوم
    </S.Button>
    <S.Button type="button">مقارنة مع: {compare}</S.Button>
  </S.Row>
));

const LearnMore = memo(({ topic }) => (
  <S.Text $muted $center $size="0.8125rem">
    اعرف المزيد عن <S.LinkButton type="button">{topic}</S.LinkButton>
  </S.Text>
));

const TrendIcon = memo(() => (
  <S.Trend>
    <Minus size={12} />
  </S.Trend>
));

const MetricCard = memo(({ title, value }) => (
  <S.Card>
    <S.CardLabel>{title}</S.CardLabel>
    <S.Row $between>
      <S.MetricValue>{value}</S.MetricValue>
      <TrendIcon />
    </S.Row>
    <S.Sparkline
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="30"
        x2="100"
        y2="30"
        stroke={T.primary}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </S.Sparkline>
  </S.Card>
));

const Rating = memo(({ value, reviews }) => (
  <S.Row $gap="0.375rem" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
    <Star size={16} fill="#f59e0b" color="#f59e0b" />
    {Number(value).toFixed(2)} · {Number(reviews).toLocaleString("ar-SA")} تقييم
  </S.Row>
));

/* ============================================================
   Modals
   ============================================================ */

const TimeoutModal = memo(({ open, onLogin }) =>
  open ? (
    <S.Overlay>
      <S.ModalBox $center role="alertdialog" aria-modal="true">
        <S.Heading $size="1.125rem">انتهت الجلسة</S.Heading>
        <S.Text $muted>يجب تسجيل الدخول من جديد للمتابعة.</S.Text>
        <S.Button type="button" $variant="primary" $size="lg" onClick={onLogin}>
          سجل الآن
        </S.Button>
      </S.ModalBox>
    </S.Overlay>
  ) : null,
);

const StoreNameModal = memo(({ value, onChange, onClose, onSave, saving }) => (
  <S.Overlay onClick={onClose}>
    <S.ModalBox
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
    >
      <S.Row $between>
        <S.Heading $size="1.125rem">اختار اسم لمتجرك</S.Heading>
        <S.PlainIconButton type="button" aria-label="إغلاق" onClick={onClose}>
          <X size={18} />
        </S.PlainIconButton>
      </S.Row>
      <S.Input
        autoFocus
        placeholder="اختار اسم المتجر"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSave()}
      />
      <S.Row $gap="0.5rem" style={{ justifyContent: "flex-end" }}>
        <S.Button type="button" onClick={onClose}>
          إلغاء
        </S.Button>
        <S.Button
          type="button"
          $variant="primary"
          onClick={onSave}
          disabled={saving || !value.trim()}
        >
          {saving ? "جاري المعالجة ..." : "احفظ"}
        </S.Button>
      </S.Row>
    </S.ModalBox>
  </S.Overlay>
));

/* ============================================================
   Tab: الرئيسية
   ============================================================ */

const HeroCard = memo(
  ({ title, text, images, primary, secondary, onPrimary }) => (
    <S.HeroCard>
      <S.HeroStage>
        {images.map((src, i) => (
          <S.HeroImage key={src} src={src} alt="" $delay={i * 4} />
        ))}
      </S.HeroStage>
      <S.HeroBody>
        <S.Stack $gap="0.25rem">
          <S.Heading>{title}</S.Heading>
          <S.Text $muted $size="0.8125rem">
            {text}
          </S.Text>
        </S.Stack>
        <S.ButtonRow>
          <S.Button type="button" $variant="primary" onClick={onPrimary}>
            {primary}
          </S.Button>
          <S.Button type="button">{secondary}</S.Button>
        </S.ButtonRow>
      </S.HeroBody>
    </S.HeroCard>
  ),
);

const SetupCard = memo(({ title, btn, logos, max, domain, onClick }) => (
  <S.Card $gap="1rem">
    <S.Heading $size="0.875rem">{title}</S.Heading>
    <S.LogoRow>
      {logos?.map((src) => (
        <S.BrandLogo key={src} src={src} alt="" $max={max} />
      ))}
      {domain && (
        <S.DomainPill>
          {domain}
          <Copy size={13} />
        </S.DomainPill>
      )}
    </S.LogoRow>
    <div>
      <S.Button type="button" $size="sm" onClick={onClick}>
        {btn}
      </S.Button>
    </div>
  </S.Card>
));

const HomeTab = memo(
  ({
    storeName,
    showBanner,
    onCloseBanner,
    onChoosePlan,
    onEditName,
    onHero,
    onSetup,
  }) => (
    <S.Page $max="56rem">
      {showBanner && (
        <S.Banner>
          <span>اختر خطة واحصل على 3 أشهر مقابل 1 ريال شهريًا</span>
          <S.Row>
            <S.Button
              type="button"
              $variant="inverse"
              $size="sm"
              onClick={onChoosePlan}
            >
              اختار الخطة
            </S.Button>
            <S.PlainIconButton
              type="button"
              aria-label="إغلاق"
              onClick={onCloseBanner}
            >
              <X size={18} />
            </S.PlainIconButton>
          </S.Row>
        </S.Banner>
      )}

      <S.Card $gap="1rem">
        <S.Row>
          <S.Heading>{storeName || "متجري"}</S.Heading>
          <S.Button
            type="button"
            $variant="ghost"
            $size="sm"
            $icon
            aria-label="تعديل اسم المتجر"
            onClick={onEditName}
          >
            <Pencil size={14} />
          </S.Button>
        </S.Row>

        <S.Grid $cols={2}>
          {HERO_CARDS.map((card) => (
            <HeroCard
              key={card.title}
              {...card}
              onPrimary={() => onHero(card.action)}
            />
          ))}
        </S.Grid>

        <S.Grid $cols={3}>
          {SETUP_CARDS.map((card) => (
            <SetupCard
              key={card.title}
              {...card}
              onClick={() => onSetup(card.tab)}
            />
          ))}
        </S.Grid>
      </S.Card>
    </S.Page>
  ),
);

/* ============================================================
   Tab: generic empty state / list pages
   ============================================================ */

const EmptyTab = memo(
  ({
    icon,
    image,
    title,
    heading,
    text,
    cta,
    to,
    topic,
    onNavigate,
    headerAction,
  }) => (
    <S.Page>
      <PageHeader icon={icon} title={title}>
        {headerAction ?? (
          <S.Button type="button" $size="sm">
            خيارات اكثر
            <ChevronDown size={14} />
          </S.Button>
        )}
      </PageHeader>
      <S.EmptyState>
        <S.Illustration src={image} alt="" $w="200px" />
        <S.Heading $size="1.125rem">{heading}</S.Heading>
        <S.Text $muted>{text}</S.Text>
        {cta && (
          <S.Button
            type="button"
            $variant="primary"
            onClick={to ? () => onNavigate(to) : undefined}
          >
            {cta}
          </S.Button>
        )}
      </S.EmptyState>
      {topic && <LearnMore topic={topic} />}
    </S.Page>
  ),
);

const ListTab = memo(
  ({
    icon,
    image,
    title,
    heading,
    text,
    primary,
    secondary,
    to,
    promo,
    toolbar = true,
    onNavigate,
  }) => (
    <S.Page>
      <PageHeader icon={icon} title={title} />
      <S.Card $flush>
        {toolbar && (
          <S.TableToolbar>
            <S.Row $gap="0.25rem">
              <S.TabChip>الكل</S.TabChip>
              <S.Button
                type="button"
                $variant="ghost"
                $size="sm"
                $icon
                aria-label="إضافة عرض"
              >
                <Plus size={15} />
              </S.Button>
            </S.Row>
            <S.Row $gap="0.375rem">
              <S.Button type="button" $size="sm" $icon aria-label="تصفية">
                <Filter size={14} />
              </S.Button>
              <S.Button type="button" $size="sm" $icon aria-label="ترتيب">
                <ArrowUpDown size={14} />
              </S.Button>
            </S.Row>
          </S.TableToolbar>
        )}

        <S.ListHero>
          <S.Split>
            <S.Stack $gap="0.75rem">
              <S.Heading $size="1.375rem">{heading}</S.Heading>
              <S.Text $muted $size="0.9375rem">
                {text}
              </S.Text>
              {(primary || secondary) && (
                <S.Row $wrap style={{ marginTop: "0.5rem" }}>
                  {primary && (
                    <S.Button
                      type="button"
                      $variant="primary"
                      onClick={to ? () => onNavigate(to) : undefined}
                    >
                      {primary}
                    </S.Button>
                  )}
                  {secondary && <S.Button type="button">{secondary}</S.Button>}
                </S.Row>
              )}
            </S.Stack>
            <S.Illustration src={image} alt="" $w="240px" />
          </S.Split>
        </S.ListHero>

        {promo && (
          <S.ListPromo>
            <S.Stack $gap="0.25rem" style={{ maxWidth: "36rem" }}>
              <S.Heading $size="0.9375rem">{promo.heading}</S.Heading>
              <S.Text $muted $size="0.8125rem">
                {promo.text}
              </S.Text>
            </S.Stack>
            <S.Button type="button">{promo.cta}</S.Button>
          </S.ListPromo>
        )}
      </S.Card>
    </S.Page>
  ),
);

/* ============================================================
   Tab: الأسواق / جزء / المجموعة
   ============================================================ */

const MarketsTab = memo(({ title, action }) => (
  <S.Page>
    <PageHeader icon={marketsIcon} title={title}>
      {action && (
        <S.Button type="button" $variant="primary">
          {action}
        </S.Button>
      )}
    </PageHeader>
    <S.Card $flush>
      <S.TableToolbar>
        <S.Button type="button" $size="sm" $icon aria-label="خيارات العرض">
          <SlidersHorizontal size={14} />
        </S.Button>
        <S.SearchField>
          <Search size={15} />
          <input type="text" placeholder="ابحث بكل الأسواق" />
        </S.SearchField>
        <S.Button type="button" $size="sm" $icon aria-label="الأعمدة">
          <LayoutGrid size={14} />
        </S.Button>
      </S.TableToolbar>

      <S.TableScroll>
        <S.DataTable>
          <thead>
            <tr>
              <th>السوق</th>
              <th>الحالة</th>
              <th style={{ width: "1%" }}>تخصيص</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>المملكة العربية السعودية</td>
              <td>
                <S.StatusBadge $tone="success">نشط</S.StatusBadge>
              </td>
              <td>
                <S.Row $gap="0.25rem">
                  <S.Button
                    type="button"
                    $variant="ghost"
                    $size="sm"
                    $icon
                    aria-label="النطاق"
                  >
                    <Globe size={15} />
                  </S.Button>
                  <S.Button
                    type="button"
                    $variant="ghost"
                    $size="sm"
                    $icon
                    aria-label="الكتالوج"
                  >
                    <BookOpen size={15} />
                  </S.Button>
                </S.Row>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <S.LinkButton type="button">اصنع سوق عالمي</S.LinkButton>
              </td>
              <td>
                <S.LinkButton type="button" style={{ color: T.danger }}>
                  ازالة
                </S.LinkButton>
              </td>
            </tr>
          </tbody>
        </S.DataTable>
      </S.TableScroll>
    </S.Card>
  </S.Page>
));

/* ============================================================
   Tab: الطلبات  (booking requests + paid orders + waitlist)
   ============================================================ */

const ORDER_VIEWS = [
  { id: "quota", label: "طلبات الحجز" },
  { id: "paid", label: "الطلبات المدفوعة" },
  { id: "waitlist", label: "قائمة الانتظار" },
];

// Keys must match the `status` values stored on your Waitlist model
const WAITLIST_STATUS = {
  pending: { label: "قيد الانتظار", tone: "warning" },
  contacted: { label: "تم التواصل", tone: "neutral" },
  converted: { label: "تم التحويل", tone: "success" },
  cancelled: { label: "ملغي", tone: "danger" },
};

const VIEW_FILTERS = {
  quota: ORDER_FILTERS,
  paid: ["الكل"],
  waitlist: ["الكل", ...Object.values(WAITLIST_STATUS).map((s) => s.label)],
};

// Quiz question ids -> short labels (shown in the order details)
const ANSWER_LABELS = {
  sex: "الجنس",
  pastVitamins: "مستوى النشاط",
  currentSupplements: "الدافعية للتغيير",
  familiarity: "المعرفة بالمكملات",
  powders: "المساحيق التكميلية",
  healthGoals: "مجالات الدعم",
  exerciseTypes: "أنواع التمارين",
  stressLevel: "مستوى التوتر",
  sleepHours: "ساعات النوم",
  energyLevels: "مستوى الطاقة",
  digestiveDiscomfort: "الانزعاج الهضمي",
  getSick: "تكرار المرض",
  focusMemory: "التركيز والذاكرة",
  fruitVeggies: "الفواكه والخضروات",
  fiber: "الألياف",
  allergies: "الحساسية",
  smoke: "التدخين",
};

const formatDate = (d) => (d ? new Date(d).toLocaleDateString("ar-SA") : "—");

const formatSAR = (n) =>
  n === null || n === undefined || n === ""
    ? "—"
    : `${Number(n).toLocaleString("ar-SA", { maximumFractionDigits: 2 })} ر.س`;

const formatPhone = (p) => {
  if (!p) return "—";
  return /^(\+|00)/.test(p) ? p : `+966 ${String(p).replace(/^0/, "")}`;
};

const quotaName = (q) =>
  `${q.firstName || ""} ${q.lastName || ""}`.trim() || "—";

const getStatus = (view, row) => {
  if (view === "quota") {
    const s = row.status || DEFAULT_STATUS;
    return { label: s, tone: STATUS_TONES[s] || "neutral" };
  }
  if (view === "paid") return { label: "مدفوع", tone: "success" };
  return (
    WAITLIST_STATUS[row.status] || {
      label: row.status || "قيد الانتظار",
      tone: "warning",
    }
  );
};

// Column config per view. `w` = grid width, `ltr` = numbers/emails
const VIEW_COLUMNS = {
  quota: [
    { label: "تاريخ الطلب", w: "1fr", render: (r) => formatDate(r.createdAt) },
    {
      label: "الاسم",
      w: "1.2fr",
      weight: 600,
      ellipsis: true,
      render: quotaName,
    },
    {
      label: "رقم الجوال",
      w: "1fr",
      ltr: true,
      render: (r) => r.phoneNumber || "—",
    },
    {
      label: "تفاصيل الطلب",
      w: "1.6fr",
      ellipsis: true,
      title: true,
      render: (r) => r.weddingDetails || "لا توجد تفاصيل",
    },
    {
      label: "المورد",
      w: "1fr",
      ellipsis: true,
      render: (r) => r.vendor?.name || "غير محدد",
    },
    {
      label: "عدد الضيوف",
      w: "0.8fr",
      align: "center",
      weight: 600,
      render: (r) => r.guestCount ?? "—",
    },
    { label: "تاريخ الزواج", w: "1fr", render: (r) => r.weddingDate || "—" },
  ],
  paid: [
    { label: "تاريخ الدفع", w: "1fr", render: (r) => formatDate(r.createdAt) },
    {
      label: "الاسم",
      w: "1.2fr",
      weight: 600,
      ellipsis: true,
      render: (r) => r.name || "—",
    },
    {
      label: "رقم الجوال",
      w: "1.1fr",
      ltr: true,
      render: (r) => formatPhone(r.phone),
    },
    {
      label: "البريد الإلكتروني",
      w: "1.5fr",
      ltr: true,
      ellipsis: true,
      title: true,
      render: (r) => r.email || "—",
    },
    {
      label: "الباقة",
      w: "1fr",
      weight: 600,
      render: (r) => r.packageName || "—",
    },
    {
      label: "المبلغ",
      w: "1fr",
      align: "center",
      weight: 600,
      render: (r) => formatSAR(r.amount),
    },
    {
      label: "المدينة",
      w: "0.9fr",
      ellipsis: true,
      render: (r) => r.city || "—",
    },
  ],
  waitlist: [
    {
      label: "تاريخ التسجيل",
      w: "1fr",
      render: (r) => formatDate(r.createdAt),
    },
    {
      label: "الاسم",
      w: "1.2fr",
      weight: 600,
      ellipsis: true,
      render: (r) => r.name || "—",
    },
    {
      label: "رقم الجوال",
      w: "1.1fr",
      ltr: true,
      render: (r) => formatPhone(r.phone),
    },
    {
      label: "البريد الإلكتروني",
      w: "1.5fr",
      ltr: true,
      ellipsis: true,
      title: true,
      render: (r) => r.email || "—",
    },
    {
      label: "الباقة المهتم بها",
      w: "1fr",
      weight: 600,
      render: (r) => r.packageName || "—",
    },
    {
      label: "السعر المتوقع",
      w: "1fr",
      align: "center",
      render: (r) => formatSAR(r.amount),
    },
    {
      label: "المدينة",
      w: "0.9fr",
      ellipsis: true,
      render: (r) => r.city || "—",
    },
  ],
};

const OrderDetailModal = memo(
  ({ row, view, onClose, onStatusChange, savingStatus }) => {
    const status = getStatus(view, row);
    const answers = Object.entries(row.answers || {});
    const details = [
      ["رقم الجوال", formatPhone(row.phone), true],
      ["البريد الإلكتروني", row.email || "—", true],
      ["المدينة", row.city || "—"],
      ["رقم الهوية / الإقامة", row.idNumber || "—", true],
      ["تاريخ الميلاد", row.dob || "—", true],
      [
        view === "paid" ? "الباقة" : "الباقة المهتم بها",
        row.packageName || "—",
      ],
      [
        view === "paid" ? "المبلغ المدفوع" : "السعر المتوقع",
        formatSAR(row.amount),
      ],
      ...(row.analysisCount
        ? [["عدد التحاليل", `${row.analysisCount} تحليلاً`]]
        : []),
      ...(row.chargeId ? [["رقم العملية", row.chargeId, true]] : []),
    ];

    return (
      <S.Overlay onClick={onClose}>
        <S.ModalBox
          $max="560px"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <S.Row $between $align="flex-start">
            <S.Stack $gap="0.375rem">
              <S.Heading $size="1.125rem">{row.name || "—"}</S.Heading>
              <S.Row $wrap>
                <S.StatusBadge $tone={status.tone}>
                  {status.label}
                </S.StatusBadge>
                <S.Text $muted $size="0.8125rem">
                  {view === "paid" ? "طلب مدفوع" : "قائمة الانتظار"} ·{" "}
                  {formatDate(row.createdAt)}
                </S.Text>
              </S.Row>
            </S.Stack>
            <S.PlainIconButton
              type="button"
              aria-label="إغلاق"
              onClick={onClose}
            >
              <X size={18} />
            </S.PlainIconButton>
          </S.Row>

          <S.DetailList>
            {details.map(([label, value, ltr]) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd
                  style={
                    ltr ? { direction: "ltr", textAlign: "right" } : undefined
                  }
                >
                  {value}
                </dd>
              </Fragment>
            ))}
          </S.DetailList>

          {view === "waitlist" && (
            <S.Field>
              <S.FieldLabel>حالة التسجيل</S.FieldLabel>
              <S.Select
                value={row.status || "pending"}
                disabled={savingStatus}
                onChange={(e) => onStatusChange(row._id, e.target.value)}
              >
                {Object.entries(WAITLIST_STATUS).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </S.Select>
            </S.Field>
          )}

          {answers.length > 0 && (
            <S.Stack $gap="0.5rem">
              <S.Heading $size="0.9375rem">إجابات الاستبيان</S.Heading>
              <S.DetailList>
                {answers.map(([key, value]) => (
                  <Fragment key={key}>
                    <dt>{ANSWER_LABELS[key] || key}</dt>
                    <dd>
                      {Array.isArray(value) ? value.join("، ") : String(value)}
                    </dd>
                  </Fragment>
                ))}
              </S.DetailList>
            </S.Stack>
          )}
        </S.ModalBox>
      </S.Overlay>
    );
  },
);

const OrdersTab = memo(
  ({ accessToken, onAuthError, onNavigate, onOpenOrder }) => {
    const [data, setData] = useState({ quota: [], paid: [], waitlist: [] });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [reloadKey, setReloadKey] = useState(0);
    const [view, setView] = useState("quota");
    const [filter, setFilter] = useState("الكل");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(() => new Set());
    const [detailId, setDetailId] = useState(null);
    const [savingStatus, setSavingStatus] = useState(false);

    /* ---------- Fetch all three sources in parallel ---------- */
    useEffect(() => {
      if (!accessToken) {
        setLoading(false);
        return undefined;
      }
      const controller = new AbortController();
      const opts = {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      };

      (async () => {
        setLoading(true);
        const [quotaRes, extraRes] = await Promise.allSettled([
          axios.get(`${BASE_URL}/quota`, opts),
          axios.get(`${BASE_URL}/dashboard/orders`, opts),
        ]);
        if (controller.signal.aborted) return;

        const quotaStatus = quotaRes.reason?.response?.status;
        const extraStatus = extraRes.reason?.response?.status;
        if (quotaStatus === 401 || quotaStatus === 403 || extraStatus === 401) {
          onAuthError();
        }

        const next = { quota: [], paid: [], waitlist: [] };
        const errs = {};

        if (quotaRes.status === "fulfilled") {
          next.quota = Array.isArray(quotaRes.value.data)
            ? quotaRes.value.data
            : [];
        } else {
          errs.quota = "تعذّر جلب طلبات الحجز";
        }

        if (extraRes.status === "fulfilled") {
          next.paid = extraRes.value.data?.paid ?? [];
          next.waitlist = extraRes.value.data?.waitlist ?? [];
        } else {
          const msg =
            extraStatus === 403
              ? "لا تملك صلاحية عرض هذه الطلبات"
              : "تعذّر جلب الطلبات";
          errs.paid = msg;
          errs.waitlist = msg;
        }

        setData(next);
        setErrors(errs);
        setLoading(false);
      })();

      return () => controller.abort();
    }, [accessToken, onAuthError, reloadKey]);

    /* ---------- Derived rows ---------- */
    const columns = VIEW_COLUMNS[view];
    const gridColumns = `48px ${columns.map((c) => c.w).join(" ")} 1fr`;
    const filters = VIEW_FILTERS[view];

    const filtered = useMemo(() => {
      const rows = data[view];
      return filter === "الكل"
        ? rows
        : rows.filter((r) => getStatus(view, r).label === filter);
    }, [data, view, filter]);

    const pageCount = Math.max(
      1,
      Math.ceil(filtered.length / ORDERS_PAGE_SIZE),
    );
    const currentPage = Math.min(page, pageCount);
    const rows = useMemo(
      () =>
        filtered.slice(
          (currentPage - 1) * ORDERS_PAGE_SIZE,
          currentPage * ORDERS_PAGE_SIZE,
        ),
      [filtered, currentPage],
    );

    const detailRow = detailId
      ? data[view].find((r) => r._id === detailId)
      : null;
    const allSelected =
      rows.length > 0 && rows.every((r) => selected.has(r._id));

    /* ---------- Handlers ---------- */
    const changeView = (id) => {
      setView(id);
      setFilter("الكل");
      setPage(1);
      setSelected(new Set());
    };

    const changeFilter = (f) => {
      setFilter(f);
      setPage(1);
    };

    const toggleAll = () =>
      setSelected((prev) => {
        const next = new Set(prev);
        rows.forEach((r) =>
          allSelected ? next.delete(r._id) : next.add(r._id),
        );
        return next;
      });

    const toggleOne = (id) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    const openRow = (row) =>
      view === "quota" ? onOpenOrder(row._id) : setDetailId(row._id);

    const updateWaitlistStatus = async (id, status) => {
      setSavingStatus(true);
      try {
        await axios.patch(
          `${BASE_URL}/waitlist/${id}`,
          { status },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        setData((prev) => ({
          ...prev,
          waitlist: prev.waitlist.map((w) =>
            w._id === id ? { ...w, status } : w,
          ),
        }));
      } catch (err) {
        if (err.response?.status === 401) onAuthError();
        else alert("تعذّر تحديث الحالة. يرجى المحاولة مرة أخرى.");
      } finally {
        setSavingStatus(false);
      }
    };

    /* ---------- Nothing anywhere yet ---------- */
    const isEmpty =
      !loading &&
      Object.keys(errors).length === 0 &&
      data.quota.length === 0 &&
      data.paid.length === 0 &&
      data.waitlist.length === 0;

    if (isEmpty) return <EmptyTab {...ORDERS_EMPTY} onNavigate={onNavigate} />;

    const emptyMessage =
      filter !== "الكل"
        ? "لا توجد طلبات بهذه الحالة"
        : view === "paid"
          ? "لا توجد طلبات مدفوعة بعد"
          : view === "waitlist"
            ? "لا يوجد أحد في قائمة الانتظار بعد"
            : "لا توجد طلبات حجز بعد";

    return (
      <S.Page>
        <PageHeader icon={ordersIcon} title="الطلبات">
          <S.Button
            type="button"
            $icon
            aria-label="تحديث"
            disabled={loading}
            onClick={() => setReloadKey((k) => k + 1)}
          >
            <RefreshCw size={15} />
          </S.Button>
        </PageHeader>

        <S.Segmented role="tablist">
          {ORDER_VIEWS.map((v) => (
            <S.SegmentButton
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              $active={view === v.id}
              onClick={() => changeView(v.id)}
            >
              {v.label}
              <S.CountPill $active={view === v.id}>
                {loading ? "…" : data[v.id].length}
              </S.CountPill>
            </S.SegmentButton>
          ))}
        </S.Segmented>

        <S.Card $flush>
          <S.TableToolbar>
            <S.Row $wrap>
              {filters.length > 1 &&
                filters.map((f) => (
                  <S.FilterChip
                    key={f}
                    type="button"
                    $active={filter === f}
                    onClick={() => changeFilter(f)}
                  >
                    {f}
                  </S.FilterChip>
                ))}
            </S.Row>
            <S.Row $gap="0.375rem">
              <S.Button type="button" $size="sm" $icon aria-label="تصفية">
                <Filter size={14} />
              </S.Button>
              <S.Button type="button" $size="sm" $icon aria-label="ترتيب">
                <ArrowUpDown size={14} />
              </S.Button>
            </S.Row>
          </S.TableToolbar>

          <S.TableScroll $minH="400px">
            <S.GridTable $columns={gridColumns}>
              <S.Th $align="center">
                <S.Checkbox
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="تحديد الكل"
                />
              </S.Th>
              {columns.map((c) => (
                <S.Th key={c.label} $align={c.align}>
                  {c.label}
                </S.Th>
              ))}
              <S.Th $align="center">الحالة</S.Th>

              {loading ? (
                <S.TableMessage>جاري التحميل...</S.TableMessage>
              ) : errors[view] ? (
                <S.TableMessage $error>{errors[view]}</S.TableMessage>
              ) : rows.length === 0 ? (
                <S.TableMessage>{emptyMessage}</S.TableMessage>
              ) : (
                rows.map((row, i) => {
                  const status = getStatus(view, row);
                  return (
                    <S.Tr key={row._id || i} onClick={() => openRow(row)}>
                      <S.Td
                        $align="center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <S.Checkbox
                          checked={selected.has(row._id)}
                          onChange={() => toggleOne(row._id)}
                          aria-label="تحديد"
                        />
                      </S.Td>
                      {columns.map((c) => {
                        const value = c.render(row);
                        return (
                          <S.Td
                            key={c.label}
                            $align={c.align}
                            $weight={c.weight}
                            title={c.title ? String(value) : undefined}
                            style={
                              c.ltr
                                ? {
                                    direction: "ltr",
                                    justifyContent: "flex-end",
                                  }
                                : undefined
                            }
                          >
                            {c.ellipsis ? (
                              <S.Ellipsis>{value}</S.Ellipsis>
                            ) : (
                              value
                            )}
                          </S.Td>
                        );
                      })}
                      <S.Td $align="center">
                        <S.StatusBadge $tone={status.tone}>
                          {status.label}
                        </S.StatusBadge>
                      </S.Td>
                    </S.Tr>
                  );
                })
              )}
            </S.GridTable>
          </S.TableScroll>

          <S.TableFooter>
            <span>
              {filtered.length} طلب · صفحة {currentPage} من {pageCount}
            </span>
            <S.Row $gap="0.375rem">
              <S.Button
                type="button"
                $size="sm"
                $icon
                aria-label="السابق"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronRight size={16} />
              </S.Button>
              <S.Button
                type="button"
                $size="sm"
                $icon
                aria-label="التالي"
                disabled={currentPage >= pageCount}
                onClick={() => setPage(currentPage + 1)}
              >
                <ChevronLeft size={16} />
              </S.Button>
            </S.Row>
          </S.TableFooter>
        </S.Card>

        {detailRow && (
          <OrderDetailModal
            row={detailRow}
            view={view}
            onClose={() => setDetailId(null)}
            onStatusChange={updateWaitlistStatus}
            savingStatus={savingStatus}
          />
        )}
      </S.Page>
    );
  },
);

/* ============================================================
   Tab: التسويق
   ============================================================ */

const MarketingTab = memo(() => {
  const compare = useMemo(() => shortDateFmt.format(getYesterday()), []);

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="التسويق">
        <ReportActions />
      </PageHeader>
      <DateFilters compare={compare} />

      <S.Grid $cols={3}>
        {MARKETING_METRICS.map((title) => (
          <MetricCard key={title} title={title} value="—" />
        ))}
      </S.Grid>

      {CAMPAIGNS.map((c) => (
        <S.Card key={c.title} $padding="2rem">
          <S.Split>
            <S.Stack $gap="0.75rem">
              <S.Heading $size="1.25rem">{c.title}</S.Heading>
              <S.Text $muted>{c.text}</S.Text>
              <div>
                <S.Button type="button" $variant="primary">
                  {c.cta}
                </S.Button>
              </div>
            </S.Stack>
            <S.Illustration src={c.image} alt="" $w="200px" />
          </S.Split>
        </S.Card>
      ))}
    </S.Page>
  );
});

/* ============================================================
   Tab: التحليلات
   ============================================================ */

const FlatLine = memo(({ color, dashed }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <line
      x1="0"
      y1="100"
      x2="100"
      y2="100"
      stroke={color}
      strokeWidth="2"
      strokeDasharray={dashed ? "4 4" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
));

const AnalyticsTab = memo(
  ({ kpis = ANALYTICS_KPIS, breakdown = ANALYTICS_BREAKDOWN }) => {
    const dates = useMemo(
      () => ({
        today: shortDateFmt.format(new Date()),
        compare: shortDateFmt.format(getYesterday()),
      }),
      [],
    );

    return (
      <S.Page>
        <PageHeader icon={contentIcon} title="التحليلات">
          <ReportActions />
        </PageHeader>
        <DateFilters compare={dates.compare} />

        <S.Grid $cols={4}>
          {kpis.map((k) => (
            <MetricCard key={k.title} title={k.title} value={k.value} />
          ))}
        </S.Grid>

        <S.MainGrid>
          <S.Card>
            <S.CardLabel>المبيعات حسب الوقت</S.CardLabel>
            <S.Row $between>
              <S.MetricValue $big>0 ريال</S.MetricValue>
              <TrendIcon />
            </S.Row>

            <S.ChartArea>
              <S.YLabels>
                {Y_LABELS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </S.YLabels>
              <S.Plot>
                <FlatLine color={T.primarySoft} dashed />
                <FlatLine color={T.primary} />
              </S.Plot>
              <S.XLabels>
                {X_LABELS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </S.XLabels>
            </S.ChartArea>

            <S.Legend>
              <S.LegendItem $color={T.primary}>{dates.today}</S.LegendItem>
              <S.LegendItem $color={T.primarySoft} $dashed>
                {dates.compare}
              </S.LegendItem>
            </S.Legend>
          </S.Card>

          <S.Card>
            <S.CardLabel>تفصيل إجمالي المبيعات</S.CardLabel>
            <S.BreakList>
              {breakdown.map(({ title, value, total }) => (
                <S.BreakItem key={title} $total={total}>
                  <span>{title}</span>
                  <S.Amount>
                    {Number(value || 0).toFixed(2)} ريال
                    <TrendIcon />
                  </S.Amount>
                </S.BreakItem>
              ))}
            </S.BreakList>
          </S.Card>
        </S.MainGrid>

        <LearnMore topic="التحليلات" />
      </S.Page>
    );
  },
);

/* ============================================================
   Tab: المتجر (appointment settings)
   ============================================================ */

const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await userRequest.post(
    "/business/upload/profile-image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.imageUrl;
};

const DaySelect = ({ value, onChange }) => (
  <S.Select value={value} onChange={onChange}>
    {DAY_LABELS.map((label, i) => (
      <option key={label} value={String(i)}>
        {label}
      </option>
    ))}
  </S.Select>
);

const AppointmentSettings = memo(() => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);

  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    docFirstName: "",
    docLastName: "",
    major: "",
    country: "",
  });
  const [profileImg, setProfileImg] = useState("");
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [payment, setPayment] = useState(DEFAULT_PAYMENT);
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: "", description: "" });
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Load saved settings
  useEffect(() => {
    if (!currentUser) return;
    setProfile({
      docFirstName: currentUser.docFirstName || "",
      docLastName: currentUser.docLastName || "",
      major: currentUser.major || "",
      country: currentUser.country || "",
    });
    setProfileImg(currentUser.profileImg || "");
    const s = currentUser.appointmentSettings || {};
    if (s.paymentSettings) setPayment(s.paymentSettings);
    if (s.reviewSettings) setReviews(s.reviewSettings);
    if (s.holidays) setHolidays(s.holidays);
    if (s.workingHours) setHours(parseWorkingHours(s.workingHours));
  }, [currentUser]);

  // Preview: next 2 working days + first 4 slots
  const previewDates = useMemo(() => {
    const start = Number(hours.startDay);
    const end = Number(hours.endDay);
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14 && dates.length < 2; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (isDayInRange(d.getDay(), start, end)) dates.push(d);
    }
    return dates;
  }, [hours.startDay, hours.endDay]);

  const previewSlots = useMemo(
    () => generateTimeSlots(hours.start, hours.end).slice(0, 4),
    [hours.start, hours.end],
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يتجاوز 5 ميجابايت");
      return;
    }
    setProfileImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImg(reader.result);
    reader.readAsDataURL(file);
  };

  const addHoliday = () => {
    if (!newHoliday.date || !newHoliday.description.trim()) return;
    setHolidays((prev) => [
      ...prev,
      { ...newHoliday, description: newHoliday.description.trim() },
    ]);
    setNewHoliday({ date: "", description: "" });
  };

  const removeHoliday = (index) =>
    setHolidays((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!currentUser?._id) {
      alert("معرف المستخدم غير موجود");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = profileImg;
      if (profileImgFile) {
        try {
          imageUrl = await uploadProfileImage(profileImgFile);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          alert("فشل رفع الصورة. سيتم حفظ التغييرات الأخرى.");
          imageUrl = currentUser.profileImg || ""; // never save the base64 preview
        }
      }

      const startDay = Number(hours.startDay);
      const endDay = Number(hours.endDay);
      const workingHours = Object.fromEntries(
        DAY_KEYS.map((key, i) => [
          key,
          {
            isOpen: isDayInRange(i, startDay, endDay),
            slots: [{ startTime: hours.start, endTime: hours.end }],
          },
        ]),
      );

      const updateData = {
        docFirstName: profile.docFirstName.trim(),
        docLastName: profile.docLastName.trim(),
        major: profile.major.trim(),
        country: profile.country.trim(),
        profileImg: imageUrl,
        appointmentSettings: {
          workingHours,
          paymentSettings: {
            enabled: payment.enabled,
            appointmentFee: parseFloat(payment.appointmentFee) || 0,
            allowPayOnArrival: payment.allowPayOnArrival,
            allowOnlinePayment: payment.allowOnlinePayment,
            requireUpfrontPayment: payment.requireUpfrontPayment,
          },
          reviewSettings: {
            enabled: reviews.enabled,
            review: reviews.review || 0,
            rating: reviews.rating || 0,
          },
          holidays: holidays.map((h) => ({
            date: new Date(h.date),
            description: h.description,
          })),
        },
      };

      await dispatch(
        updateBusinessProfile({ id: currentUser._id, updateData }),
      ).unwrap();
      setProfileImgFile(null);
      alert("تم حفظ جميع التغييرات بنجاح");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("فشل حفظ التغييرات. يرجى المحاولة مرة أخرى.");
    } finally {
      setSaving(false);
    }
  };

  const doctorName = [profile.docFirstName, profile.docLastName]
    .filter(Boolean)
    .join(" ");

  return (
    <S.Page $max="1400px">
      <S.Card $padding="1rem 1.25rem">
        <S.Row $between $wrap $gap="1rem">
          <S.PageTitle>إعدادات حجز المواعيد</S.PageTitle>
          <S.Button
            type="button"
            $variant="primary"
            $size="lg"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
          </S.Button>
        </S.Row>
      </S.Card>

      <S.SettingsGrid>
        {/* ---------- Settings column ---------- */}
        <S.Stack $gap="1.25rem">
          <S.Card $padding="1.5rem" $gap="1rem">
            <S.Heading $size="1.0625rem">معلومات الطبيب</S.Heading>
            <S.FormGrid>
              <S.Field>
                <S.FieldLabel>الاسم الأول</S.FieldLabel>
                <S.Input
                  value={profile.docFirstName}
                  onChange={bind(setProfile, "docFirstName")}
                  placeholder="أدخل الاسم الأول"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>الاسم الأخير</S.FieldLabel>
                <S.Input
                  value={profile.docLastName}
                  onChange={bind(setProfile, "docLastName")}
                  placeholder="أدخل الاسم الأخير"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>التخصص</S.FieldLabel>
                <S.Input
                  value={profile.major}
                  onChange={bind(setProfile, "major")}
                  placeholder="مثال: طبيب رعاية أولية"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>البلد</S.FieldLabel>
                <S.Input
                  value={profile.country}
                  onChange={bind(setProfile, "country")}
                  placeholder="أدخل البلد"
                />
              </S.Field>
            </S.FormGrid>
          </S.Card>

          <S.Card $padding="1.5rem" $gap="1rem">
            <S.Heading $size="1.0625rem">صورة الملف الشخصي</S.Heading>
            <S.ProfileRow>
              {profileImg ? (
                <S.ProfilePreview src={profileImg} alt="" />
              ) : (
                <S.ProfilePlaceholder>
                  <Upload size={28} />
                </S.ProfilePlaceholder>
              )}
              <S.Stack $gap="0.5rem">
                <S.UploadLabel>
                  <Upload size={16} />
                  اختر صورة جديدة
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </S.UploadLabel>
                <S.Text $muted $size="0.8125rem">
                  JPG, PNG أو GIF (الحد الأقصى 5 ميجابايت)
                </S.Text>
              </S.Stack>
            </S.ProfileRow>
          </S.Card>

          <S.Card $padding="1.5rem" $gap="1rem">
            <S.Heading $size="1.0625rem">أوقات العمل</S.Heading>
            <S.FormGrid>
              <S.Field>
                <S.FieldLabel $small>من يوم</S.FieldLabel>
                <DaySelect
                  value={hours.startDay}
                  onChange={bind(setHours, "startDay")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>إلى يوم</S.FieldLabel>
                <DaySelect
                  value={hours.endDay}
                  onChange={bind(setHours, "endDay")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>من الساعة</S.FieldLabel>
                <S.Input
                  type="time"
                  value={hours.start}
                  onChange={bind(setHours, "start")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>إلى الساعة</S.FieldLabel>
                <S.Input
                  type="time"
                  value={hours.end}
                  onChange={bind(setHours, "end")}
                />
              </S.Field>
            </S.FormGrid>
          </S.Card>

          <S.Card $padding="1.5rem" $gap="1rem">
            <S.Heading $size="1.0625rem">إعدادات الدفع</S.Heading>
            <S.Check $bold>
              <input
                type="checkbox"
                checked={payment.enabled}
                onChange={bind(setPayment, "enabled")}
              />
              تفعيل نظام الدفع
            </S.Check>
            <S.Field style={{ maxWidth: "16rem" }}>
              <S.FieldLabel>رسوم الموعد (ريال)</S.FieldLabel>
              <S.Input
                type="number"
                min="0"
                step="0.01"
                value={payment.appointmentFee}
                onChange={bind(setPayment, "appointmentFee")}
                disabled={!payment.enabled}
              />
            </S.Field>
            <S.Stack $gap="0.75rem">
              <S.Check>
                <input
                  type="checkbox"
                  checked={payment.allowPayOnArrival}
                  onChange={bind(setPayment, "allowPayOnArrival")}
                />
                السماح بالدفع عند الوصول
              </S.Check>
              <S.Check>
                <input
                  type="checkbox"
                  checked={payment.allowOnlinePayment}
                  onChange={bind(setPayment, "allowOnlinePayment")}
                />
                السماح بالدفع الإلكتروني
              </S.Check>
              <S.Check>
                <input
                  type="checkbox"
                  checked={payment.requireUpfrontPayment}
                  onChange={bind(setPayment, "requireUpfrontPayment")}
                />
                يتطلب الدفع المسبق
              </S.Check>
              <S.Check>
                <input
                  type="checkbox"
                  checked={reviews.enabled}
                  onChange={bind(setReviews, "enabled")}
                />
                إظهار التقييمات
              </S.Check>
            </S.Stack>
          </S.Card>

          <S.Card $padding="1.5rem" $gap="1rem">
            <S.Heading $size="1.0625rem">العطلات الرسمية</S.Heading>
            <S.HolidayRow>
              <S.Field>
                <S.FieldLabel $small>التاريخ</S.FieldLabel>
                <S.Input
                  type="date"
                  value={newHoliday.date}
                  onChange={bind(setNewHoliday, "date")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>الوصف</S.FieldLabel>
                <S.Input
                  value={newHoliday.description}
                  onChange={bind(setNewHoliday, "description")}
                  onKeyDown={(e) => e.key === "Enter" && addHoliday()}
                  placeholder="مثال: عيد الفطر"
                />
              </S.Field>
              <S.Button
                type="button"
                $variant="primary"
                style={{ height: "2.5rem" }}
                onClick={addHoliday}
                disabled={!newHoliday.date || !newHoliday.description.trim()}
              >
                <Plus size={16} />
                إضافة
              </S.Button>
            </S.HolidayRow>

            {holidays.length > 0 && (
              <S.Stack $gap="0.5rem">
                <S.FieldLabel>العطلات المضافة</S.FieldLabel>
                {holidays.map((h, i) => (
                  <S.HolidayItem key={`${h.date}-${i}`}>
                    <S.Row $gap="0.75rem">
                      <strong>{h.description}</strong>
                      <S.Text $muted $size="0.8125rem">
                        {new Date(h.date).toLocaleDateString("ar-SA")}
                      </S.Text>
                    </S.Row>
                    <S.Button
                      type="button"
                      $variant="danger"
                      $size="sm"
                      $icon
                      aria-label="حذف"
                      onClick={() => removeHoliday(i)}
                    >
                      <Trash2 size={14} />
                    </S.Button>
                  </S.HolidayItem>
                ))}
              </S.Stack>
            )}
          </S.Card>
        </S.Stack>

        {/* ---------- Phone preview ---------- */}
        <S.PreviewSticky>
          <S.Card $padding="1.25rem" $gap="1rem">
            <S.CardLabel>معاينة صفحة الحجز</S.CardLabel>
            <S.PhoneFrame>
              <S.Heading $size="1.375rem">حجز موعد</S.Heading>

              <S.Row $align="flex-start" $gap="0.75rem">
                <S.DoctorAvatar src={profileImg || FALLBACK_AVATAR} alt="" />
                <S.Stack $gap="0.125rem">
                  <S.Heading $size="1rem">
                    {doctorName ? `د. ${doctorName}` : "د. هارولد واتسون، MD"}
                  </S.Heading>
                  <S.Text $muted $size="0.8125rem">
                    {profile.major || "طبيب رعاية أولية"}
                  </S.Text>
                  {reviews.enabled && (
                    <Rating
                      value={currentUser?.rating || 4.9}
                      reviews={currentUser?.reviews || 860}
                    />
                  )}
                </S.Stack>
              </S.Row>

              <S.Stack $gap="0.5rem">
                <S.Heading $size="0.9375rem">تفاصيل الجدولة</S.Heading>
                <S.InfoBox>زيارة جديدة</S.InfoBox>
                {payment.enabled && (
                  <S.InfoBox $accent>
                    رسوم الموعد: {payment.appointmentFee} ريال
                  </S.InfoBox>
                )}
              </S.Stack>

              <S.Stack $gap="0.75rem">
                <S.Heading $size="0.9375rem">المواعيد المتاحة</S.Heading>
                {previewDates.length === 0 ? (
                  <S.Alert>لا توجد أيام عمل محددة</S.Alert>
                ) : (
                  previewDates.map((date, idx) => {
                    const dateKey = toDateKey(date);
                    return (
                      <S.Stack key={dateKey} $gap="0.5rem">
                        <S.Text $size="0.875rem" style={{ fontWeight: 700 }}>
                          {idx === 0 && toDateKey(new Date()) === dateKey
                            ? "اليوم، "
                            : ""}
                          {formatDayLabel(date)}
                        </S.Text>
                        {previewSlots.length === 0 ? (
                          <S.InfoBox>لا توجد أوقات متاحة لهذا اليوم.</S.InfoBox>
                        ) : (
                          <S.SlotGrid>
                            {previewSlots.map((time) => {
                              const key = `${dateKey}-${time}`;
                              return (
                                <S.Slot
                                  key={key}
                                  type="button"
                                  $selected={selectedSlot === key}
                                  onClick={() => setSelectedSlot(key)}
                                >
                                  {time}
                                </S.Slot>
                              );
                            })}
                          </S.SlotGrid>
                        )}
                      </S.Stack>
                    );
                  })
                )}
              </S.Stack>
            </S.PhoneFrame>
          </S.Card>
        </S.PreviewSticky>
      </S.SettingsGrid>
    </S.Page>
  );
});

/* ============================================================
   Tab: التطبيقات
   ============================================================ */

const AppsTab = memo(() => (
  <S.Page>
    <PageHeader icon={contentIcon} title="التطبيقات" />
    <S.EmptyState>
      <S.Heading $size="1.125rem">لا توجد تطبيقات مثبتة بعد</S.Heading>
      <S.Text $muted>
        ستظهر هنا التطبيقات التي تضيفها لتوسيع إمكانيات متجرك.
      </S.Text>
      <S.Button type="button" $variant="primary">
        تصفح التطبيقات
      </S.Button>
    </S.EmptyState>
  </S.Page>
));

/* ============================================================
   Dashboard
   ============================================================ */

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.tab.activeTab);
  const storeName = useSelector((state) => state.tab.storeName);
  const { currentUser } = useSelector(userSelector);
  const accessToken = currentUser?.accessToken;

  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [localName, setLocalName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showTimeout, setShowTimeout] = useState(false);

  /* ---------- Navigation ---------- */

  const goTo = useCallback((path) => navigate(path), [navigate]);

  const goToSetting = useCallback(
    (tab) => {
      dispatch(setSettingTab(tab));
      navigate(`/preference?tab=${encodeURIComponent(tab)}`);
    },
    [dispatch, navigate],
  );

  const goToTab = useCallback(
    (tab) => {
      dispatch(setActiveTab(tab));
      navigate(`/control?tab=${encodeURIComponent(tab)}`);
    },
    [dispatch, navigate],
  );

  const handleHeroAction = useCallback(
    ({ type, value }) => (type === "page" ? goToTab(value) : goTo(value)),
    [goTo, goToTab],
  );

  const openOrder = useCallback(
    (id) => id && navigate(`/quota/${id}`),
    [navigate],
  );
  const choosePlan = useCallback(() => navigate("/pay"), [navigate]);
  const closeBanner = useCallback(() => setShowBanner(false), []);

  /* ---------- Auth ---------- */

  const handleAuthError = useCallback(() => setShowTimeout(true), []);

  const handleLogin = useCallback(() => {
    dispatch(signOut());
    dispatch(clearState());
  }, [dispatch]);

  /* ---------- Store name ---------- */

  const openNameModal = useCallback(() => {
    setLocalName(storeName || "");
    setNameModalOpen(true);
  }, [storeName]);

  const closeNameModal = useCallback(() => setNameModalOpen(false), []);

  const saveStoreName = useCallback(async () => {
    const name = localName.trim();
    if (!currentUser?._id || !name) return;

    dispatch(setStoreName(name));
    setSavingName(true);
    try {
      await dispatch(
        updateStoreName({ id: currentUser._id, storeName: name }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to update store name:", error);
    } finally {
      setSavingName(false);
      setNameModalOpen(false);
    }
  }, [currentUser?._id, dispatch, localName]);

  /* ---------- Content ---------- */

  const renderContent = () => {
    if (EMPTY_TABS[activeTab])
      return <EmptyTab {...EMPTY_TABS[activeTab]} onNavigate={goTo} />;
    if (LIST_TABS[activeTab])
      return <ListTab {...LIST_TABS[activeTab]} onNavigate={goTo} />;
    if (MARKET_TABS[activeTab])
      return <MarketsTab {...MARKET_TABS[activeTab]} />;

    switch (activeTab) {
      case "الرئيسية":
        return (
          <HomeTab
            storeName={storeName}
            showBanner={showBanner}
            onCloseBanner={closeBanner}
            onChoosePlan={choosePlan}
            onEditName={openNameModal}
            onHero={handleHeroAction}
            onSetup={goToSetting}
          />
        );
      case "الطلبات":
        return (
          <OrdersTab
            accessToken={accessToken}
            onAuthError={handleAuthError}
            onNavigate={goTo}
            onOpenOrder={openOrder}
          />
        );
      case "التسويق":
        return <MarketingTab />;
      case "التحليلات":
        return <AnalyticsTab />;
      case "المتجر":
        return <AppointmentSettings />;
      case "التطبيقات":
        return <AppsTab />;
      default:
        return null;
    }
  };

  const initials = (storeName || "MS").trim().slice(0, 2).toUpperCase();

  return (
    <S.Shell>
      <S.TopBar>
        <S.Logo src={logo} alt="" onClick={() => goToTab("الرئيسية")} />
        <S.SearchTrigger type="button">
          <Search size={16} />
          <span>ابحث</span>
          <S.KbdGroup>
            <S.Kbd>⌘</S.Kbd>
            <S.Kbd>K</S.Kbd>
          </S.KbdGroup>
        </S.SearchTrigger>
        <S.StoreChip type="button">
          <S.Avatar>{initials}</S.Avatar>
          <span>{storeName}</span>
        </S.StoreChip>
      </S.TopBar>

      <S.Body>
        <NavSide />
        <S.Main>
          <S.MainInner>{renderContent()}</S.MainInner>
        </S.Main>
      </S.Body>

      {nameModalOpen && (
        <StoreNameModal
          value={localName}
          onChange={setLocalName}
          onClose={closeNameModal}
          onSave={saveStoreName}
          saving={savingName}
        />
      )}
      <TimeoutModal open={showTimeout} onLogin={handleLogin} />
    </S.Shell>
  );
};

export default Dashboard;
