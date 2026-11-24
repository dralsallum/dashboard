import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowUpDown,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  Filter,
  Globe,
  LayoutGrid,
  Maximize2,
  Minus,
  Package,
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
    action: { type: "newProduct" },
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

// Booking requests live on the theknot server; everything else is on amanapi (userRequest)
const QUOTA_URL = "https://theknot-30278e2ff419.herokuapp.com/api/quota";

const amanapiError = (status, fallback) =>
  status === 401 || status === 403
    ? "انتهت صلاحية الجلسة أو لا تملك صلاحية — سجّل الدخول من جديد"
    : fallback;

// Turns a raw Waitlist document from GET /api/waitlist into a table row
const normalizeWaitlistEntry = (w) => ({
  _id: w._id,
  source: "waitlist",
  createdAt: w.createdAt,
  firstName: w.firstName ?? "",
  lastName: w.lastName ?? "",
  name: [w.firstName, w.lastName].filter(Boolean).join(" "),
  phone: w.phone ?? "",
  email: w.email ?? "",
  city: w.city ?? "",
  idNumber: w.idNumber ?? "",
  dob: w.dob ?? "",
  packageName: w.interestedPackage?.name ?? null,
  amount: w.interestedPackage?.price ?? null,
  status: w.status || "pending",
  notes: w.notes ?? "",
  answers: w.answers ?? {},
});

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
      // userRequest (requestMethods.js -> amanapi) adds the Bearer token itself
      const opts = { signal: controller.signal };

      (async () => {
        setLoading(true);
        const [quotaRes, waitlistRes] = await Promise.allSettled([
          axios.get(QUOTA_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: controller.signal,
          }),
          userRequest.get("/waitlist", { ...opts, params: { limit: 500 } }),
        ]);
        if (controller.signal.aborted) return;

        // The login token comes from amanapi (/bus_auth/login):
        // 401 from amanapi = no/expired session -> show the "login again" modal.
        const quotaStatus = quotaRes.reason?.response?.status;
        const waitlistStatus = waitlistRes.reason?.response?.status;
        if (waitlistStatus === 401 || quotaStatus === 401) onAuthError();

        const next = { quota: [], paid: [], waitlist: [] };
        const errs = {};

        if (quotaRes.status === "fulfilled") {
          next.quota = Array.isArray(quotaRes.value.data)
            ? quotaRes.value.data
            : [];
        } else {
          errs.quota = "تعذّر جلب طلبات الحجز";
        }

        if (waitlistRes.status === "fulfilled") {
          const wl = waitlistRes.value.data;
          next.waitlist = (wl?.entries ?? (Array.isArray(wl) ? wl : [])).map(
            normalizeWaitlistEntry,
          );
        } else {
          errs.waitlist = amanapiError(
            waitlistStatus,
            "تعذّر جلب قائمة الانتظار",
          );
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
        await userRequest.patch(`/waitlist/${id}`, { status });
        setData((prev) => ({
          ...prev,
          waitlist: prev.waitlist.map((w) =>
            w._id === id ? { ...w, status } : w,
          ),
        }));
      } catch (err) {
        alert(
          amanapiError(
            err.response?.status,
            "تعذّر تحديث الحالة. يرجى المحاولة مرة أخرى.",
          ),
        );
      } finally {
        setSavingStatus(false);
      }
    };

    /* ---------- Nothing anywhere yet ---------- */
    const isEmpty =
      !loading &&
      Object.keys(errors).length === 0 &&
      data.quota.length === 0 &&
      data.waitlist.length === 0;

    if (isEmpty) return <EmptyTab {...ORDERS_EMPTY} onNavigate={onNavigate} />;

    const emptyMessage =
      filter !== "الكل"
        ? "لا توجد طلبات بهذه الحالة"
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
   Tab: العملاء  (customer data — who they are, not what they bought)
   ============================================================ */

const CUSTOMER_PAGE_SIZES = [25, 50, 100];
const COLUMN_STORE_KEY = "dashboard.customers.columns.v2";
const DEFAULT_HIDDEN_COLUMNS = [
  "idNumber",
  "dob",
  "activity",
  "sleep",
  "smoke",
  "allergies",
];

const DATE_RANGES = [
  { id: "all", label: "كل الأوقات" },
  { id: "today", label: "اليوم" },
  { id: "7", label: "آخر 7 أيام" },
  { id: "30", label: "آخر 30 يوماً" },
  { id: "90", label: "آخر 90 يوماً" },
];

const AGE_GROUPS = [
  { label: "أقل من 25", max: 24 },
  { label: "25 – 34", max: 34 },
  { label: "35 – 44", max: 44 },
  { label: "45 – 54", max: 54 },
  { label: "55 فأكثر", max: Infinity },
];

const SORT_OPTIONS = [
  { key: "date", dir: "desc", label: "الأحدث تسجيلاً" },
  { key: "date", dir: "asc", label: "الأقدم تسجيلاً" },
  { key: "name", dir: "asc", label: "الاسم (أ - ي)" },
  { key: "name", dir: "desc", label: "الاسم (ي - أ)" },
  { key: "age", dir: "asc", label: "العمر: الأصغر أولاً" },
  { key: "age", dir: "desc", label: "العمر: الأكبر أولاً" },
  { key: "city", dir: "asc", label: "المدينة (أ - ي)" },
];

/* ---------- Helpers ---------- */

const ageOf = (dob) => {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age >= 0 && age < 130 ? age : null;
};

const ageGroupOf = (r) => {
  const age = ageOf(r.dob);
  return age === null ? "—" : AGE_GROUPS.find((g) => age <= g.max).label;
};

const answerText = (r, key) => {
  const v = r.answers?.[key];
  if (v === undefined || v === null || v === "") return "";
  return Array.isArray(v) ? v.join("، ") : String(v);
};

// Fields we expect for every customer (used by the "بيانات ناقصة" view)
const isIncomplete = (r) =>
  !r.email || !r.phone || !r.city || !r.idNumber || !r.dob;

const SORTERS = {
  date: (r) => new Date(r.createdAt).getTime() || 0,
  name: (r) => r.name || "",
  age: (r) => ageOf(r.dob),
  city: (r) => r.city || "",
};

const sortRows = (rows, { key, dir }) => {
  const get = SORTERS[key];
  return [...rows].sort((a, b) => {
    const va = get(a);
    const vb = get(b);
    // Missing values always go last, whichever direction
    if (va === null || va === "") return vb === null || vb === "" ? 0 : 1;
    if (vb === null || vb === "") return -1;
    const c = typeof va === "string" ? va.localeCompare(vb, "ar") : va - vb;
    return dir === "asc" ? c : -c;
  });
};

// Arabic-aware search: أ/إ/آ → ا, ة → ه, ى → ي, strip diacritics
const normalizeAr = (v) =>
  String(v ?? "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ً-ْ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Arabic letters join into one shape, so Arabic names get a single letter
const initialsOf = (name) => {
  const words = (name || "؟").trim().split(/\s+/);
  if (/[؀-ۿ]/.test(words[0])) return words[0].replace(/^ال/, "")[0] || "؟";
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

const inDateRange = (date, rangeId) => {
  if (rangeId === "all") return true;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return false;
  if (rangeId === "today") return toDateKey(d) === toDateKey(new Date());
  return Date.now() - d.getTime() <= Number(rangeId) * 864e5;
};

const facetOf = (rows, get, order) => {
  const counts = new Map();
  rows.forEach((r) => {
    const v = get(r) || "—";
    counts.set(v, (counts.get(v) || 0) + 1);
  });
  const entries = [...counts.entries()];
  entries.sort(
    order
      ? (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
      : (a, b) => b[1] - a[1],
  );
  return entries.map(([value, count]) => ({
    value,
    count,
    label: value === "—" ? "غير محدد" : value,
  }));
};

const loadHiddenColumns = () => {
  try {
    const v = JSON.parse(localStorage.getItem(COLUMN_STORE_KEY));
    return Array.isArray(v) ? v : DEFAULT_HIDDEN_COLUMNS;
  } catch {
    return DEFAULT_HIDDEN_COLUMNS;
  }
};

/* ---------- CSV export ---------- */

const exportPhone = (p) => {
  if (!p) return "";
  const digits = String(p).replace(/\D/g, "");
  return digits.startsWith("966") ? digits : `966${digits.replace(/^0/, "")}`;
};

const exportDateTime = (d) => {
  if (!d) return "";
  const x = new Date(d);
  if (Number.isNaN(x.getTime())) return "";
  return `${toDateKey(x)} ${String(x.getHours()).padStart(2, "0")}:${String(x.getMinutes()).padStart(2, "0")}`;
};

const CSV_COLUMNS = [
  ["الاسم الأول", (r) => r.firstName],
  ["اسم العائلة", (r) => r.lastName],
  ["البريد الإلكتروني", (r) => r.email],
  ["الجوال", (r) => exportPhone(r.phone)],
  ["المدينة", (r) => r.city],
  ["رقم الهوية / الإقامة", (r) => r.idNumber],
  ["تاريخ الميلاد", (r) => r.dob],
  ["العمر", (r) => ageOf(r.dob)],
  ["الجنس", (r) => answerText(r, "sex")],
  ["تاريخ التسجيل", (r) => exportDateTime(r.createdAt)],
];

// Quote when needed; neutralise spreadsheet formulas (= + - @) to block CSV injection
const csvCell = (value) => {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const buildCustomersCsv = (rows, { excel, withAnswers }) => {
  const columns = [
    ...CSV_COLUMNS,
    ...(withAnswers
      ? Object.entries(ANSWER_LABELS)
          .filter(([key]) => key !== "sex") // already its own column
          .map(([key, label]) => [label, (r) => answerText(r, key)])
      : []),
  ];
  const eol = excel ? "\r\n" : "\n";
  const lines = [
    columns.map(([label]) => csvCell(label)).join(","),
    ...rows.map((r) => columns.map(([, get]) => csvCell(get(r))).join(",")),
  ];
  // BOM so Excel opens Arabic text as UTF-8
  return (excel ? "﻿" : "") + lines.join(eol) + eol;
};

const downloadFile = (content, filename, type) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/* ---------- Data ---------- */

const useWaitlist = (accessToken, onAuthError) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await userRequest.get("/waitlist", {
          params: { limit: 1000 },
          signal: controller.signal,
        });
        const list = data?.entries ?? (Array.isArray(data) ? data : []);
        setEntries(list.map(normalizeWaitlistEntry));
      } catch (err) {
        if (axios.isCancel(err)) return;
        const status = err.response?.status;
        if (status === 401) onAuthError();
        setError(amanapiError(status, "تعذّر جلب قائمة العملاء"));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [accessToken, onAuthError, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { entries, loading, error, reload };
};

/* ---------- Small UI pieces ---------- */

const Popover = ({ trigger, children, align }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <S.PopoverWrap ref={ref}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <S.PopoverPanel $align={align} role="menu">
          {typeof children === "function" ? children({ close }) : children}
        </S.PopoverPanel>
      )}
    </S.PopoverWrap>
  );
};

const MultiFilter = memo(({ label, options, value, onChange }) => (
  <Popover
    trigger={({ toggle, open }) => (
      <S.FilterPill
        type="button"
        $active={value.length > 0}
        aria-expanded={open}
        onClick={toggle}
      >
        {label}
        {value.length === 1 &&
          `: ${options.find((o) => o.value === value[0])?.label ?? value[0]}`}
        {value.length > 1 && `: ${value.length} محدد`}
        <ChevronDown size={13} />
      </S.FilterPill>
    )}
  >
    {options.length === 0 ? (
      <S.MenuEmpty>لا توجد خيارات</S.MenuEmpty>
    ) : (
      options.map((o) => {
        const checked = value.includes(o.value);
        return (
          <S.MenuCheck key={o.value}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(
                  checked
                    ? value.filter((v) => v !== o.value)
                    : [...value, o.value],
                )
              }
            />
            {o.label}
            <S.MenuCount>{o.count}</S.MenuCount>
          </S.MenuCheck>
        );
      })
    )}
    {value.length > 0 && (
      <S.MenuFooter>
        <S.LinkButton type="button" onClick={() => onChange([])}>
          مسح
        </S.LinkButton>
      </S.MenuFooter>
    )}
  </Popover>
));

const StatCard = memo(({ label, value, hint }) => (
  <S.Card $gap="0.375rem">
    <S.CardLabel>{label}</S.CardLabel>
    <S.MetricValue>{value}</S.MetricValue>
    {hint && (
      <S.Text $muted $size="0.75rem">
        {hint}
      </S.Text>
    )}
  </S.Card>
));

const CustomerCell = ({ row }) => (
  <S.Row $gap="0.625rem" style={{ minWidth: 0 }}>
    <S.InitialAvatar aria-hidden="true">{initialsOf(row.name)}</S.InitialAvatar>
    <S.Stack $gap="0" style={{ minWidth: 0 }}>
      <S.Ellipsis style={{ fontWeight: 600 }}>{row.name || "—"}</S.Ellipsis>
      {row.email && (
        <S.Ellipsis
          style={{
            fontSize: "0.75rem",
            color: T.textMuted,
            direction: "ltr",
            textAlign: "right",
          }}
        >
          {row.email}
        </S.Ellipsis>
      )}
    </S.Stack>
  </S.Row>
);

const Dash = ({ children }) => children || "—";

// `always` = can't be hidden; `sort` = header is clickable
const CUSTOMER_COLUMNS = [
  {
    id: "name",
    label: "العميل",
    w: "minmax(220px, 1.8fr)",
    sort: "name",
    always: true,
    render: (r) => <CustomerCell row={r} />,
  },
  {
    id: "phone",
    label: "الجوال",
    w: "1.1fr",
    ltr: true,
    render: (r) => formatPhone(r.phone),
  },
  {
    id: "city",
    label: "المدينة",
    w: "0.9fr",
    sort: "city",
    render: (r) => <Dash>{r.city}</Dash>,
  },
  {
    id: "gender",
    label: "الجنس",
    w: "0.7fr",
    align: "center",
    render: (r) => <Dash>{answerText(r, "sex")}</Dash>,
  },
  {
    id: "age",
    label: "العمر",
    w: "0.6fr",
    sort: "age",
    align: "center",
    render: (r) => ageOf(r.dob) ?? "—",
  },
  {
    id: "idNumber",
    label: "رقم الهوية",
    w: "1fr",
    ltr: true,
    render: (r) => <Dash>{r.idNumber}</Dash>,
  },
  {
    id: "dob",
    label: "تاريخ الميلاد",
    w: "1fr",
    ltr: true,
    render: (r) => <Dash>{r.dob}</Dash>,
  },
  {
    id: "activity",
    label: "مستوى النشاط",
    w: "1.1fr",
    ellipsis: true,
    render: (r) => <Dash>{answerText(r, "pastVitamins")}</Dash>,
  },
  {
    id: "sleep",
    label: "ساعات النوم",
    w: "0.9fr",
    render: (r) => <Dash>{answerText(r, "sleepHours")}</Dash>,
  },
  {
    id: "smoke",
    label: "التدخين",
    w: "0.7fr",
    align: "center",
    render: (r) => <Dash>{answerText(r, "smoke")}</Dash>,
  },
  {
    id: "allergies",
    label: "الحساسية",
    w: "1.1fr",
    ellipsis: true,
    render: (r) => <Dash>{answerText(r, "allergies")}</Dash>,
  },
  {
    id: "date",
    label: "تاريخ التسجيل",
    w: "1fr",
    sort: "date",
    render: (r) => formatDate(r.createdAt),
  },
];

/* ---------- Customer profile ---------- */

const CustomerProfileModal = memo(({ row, onClose }) => {
  const age = ageOf(row.dob);
  const phoneDigits = exportPhone(row.phone);
  const answers = Object.entries(row.answers || {}).filter(
    ([, v]) => v !== "" && v !== null && v !== undefined,
  );
  const ltr = { direction: "ltr", textAlign: "right" };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox
        $max="560px"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <S.Row $between $align="flex-start">
          <S.Row $gap="0.75rem">
            <S.InitialAvatar
              aria-hidden="true"
              style={{ width: 44, height: 44, fontSize: "1rem" }}
            >
              {initialsOf(row.name)}
            </S.InitialAvatar>
            <S.Stack $gap="0.125rem">
              <S.Heading $size="1.125rem">{row.name || "—"}</S.Heading>
              <S.Text $muted $size="0.8125rem">
                عميل منذ {formatDate(row.createdAt)}
                {row.city ? ` · ${row.city}` : ""}
              </S.Text>
            </S.Stack>
          </S.Row>
          <S.PlainIconButton type="button" aria-label="إغلاق" onClick={onClose}>
            <X size={18} />
          </S.PlainIconButton>
        </S.Row>

        <S.Stack $gap="0.5rem">
          <S.Heading $size="0.9375rem">بيانات التواصل</S.Heading>
          <S.DetailList>
            <dt>الجوال</dt>
            <dd style={ltr}>
              {row.phone ? (
                <a href={`tel:+${phoneDigits}`}>{formatPhone(row.phone)}</a>
              ) : (
                "—"
              )}
            </dd>
            <dt>البريد الإلكتروني</dt>
            <dd style={ltr}>
              {row.email ? (
                <a href={`mailto:${row.email}`}>{row.email}</a>
              ) : (
                "—"
              )}
            </dd>
            <dt>المدينة</dt>
            <dd>{row.city || "—"}</dd>
          </S.DetailList>
        </S.Stack>

        <S.Stack $gap="0.5rem">
          <S.Heading $size="0.9375rem">البيانات الشخصية</S.Heading>
          <S.DetailList>
            <dt>رقم الهوية / الإقامة</dt>
            <dd style={ltr}>{row.idNumber || "—"}</dd>
            <dt>تاريخ الميلاد</dt>
            <dd style={ltr}>{row.dob || "—"}</dd>
            <dt>العمر</dt>
            <dd>{age !== null ? `${age} سنة` : "—"}</dd>
            <dt>الجنس</dt>
            <dd>{answerText(row, "sex") || "—"}</dd>
          </S.DetailList>
        </S.Stack>

        {answers.length > 0 && (
          <S.Stack $gap="0.5rem">
            <S.Heading $size="0.9375rem">الملف الصحي (من الاستبيان)</S.Heading>
            <S.DetailList>
              {answers
                .filter(([key]) => key !== "sex")
                .map(([key]) => (
                  <Fragment key={key}>
                    <dt>{ANSWER_LABELS[key] || key}</dt>
                    <dd>{answerText(row, key)}</dd>
                  </Fragment>
                ))}
            </S.DetailList>
          </S.Stack>
        )}
      </S.ModalBox>
    </S.Overlay>
  );
});

/* ---------- Export dialog ---------- */

const ExportModal = memo(({ counts, onClose, onExport }) => {
  const scopes = [
    { id: "page", label: "الصفحة الحالية", count: counts.page },
    { id: "all", label: "كل العملاء", count: counts.all },
    { id: "selected", label: "العملاء المحددون", count: counts.selected },
    {
      id: "filtered",
      label: "نتائج البحث والتصفية الحالية",
      count: counts.filtered,
    },
  ];
  const [scope, setScope] = useState(
    counts.selected > 0
      ? "selected"
      : counts.filtered !== counts.all
        ? "filtered"
        : "all",
  );
  const [format, setFormat] = useState("excel");
  const [withAnswers, setWithAnswers] = useState(false);
  const chosen = scopes.find((s) => s.id === scope);

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox
        $max="480px"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <S.Row $between>
          <S.Heading $size="1.125rem">تصدير بيانات العملاء</S.Heading>
          <S.PlainIconButton type="button" aria-label="إغلاق" onClick={onClose}>
            <X size={18} />
          </S.PlainIconButton>
        </S.Row>

        <S.Stack $gap="0.5rem">
          <S.FieldLabel>ماذا تريد أن تصدّر؟</S.FieldLabel>
          {scopes.map((s) => (
            <S.RadioRow key={s.id} $disabled={!s.count}>
              <input
                type="radio"
                name="export-scope"
                checked={scope === s.id}
                disabled={!s.count}
                onChange={() => setScope(s.id)}
              />
              {s.label}
              <S.MenuCount>{s.count}</S.MenuCount>
            </S.RadioRow>
          ))}
        </S.Stack>

        <S.Stack $gap="0.5rem">
          <S.FieldLabel>صيغة الملف</S.FieldLabel>
          <S.RadioRow>
            <input
              type="radio"
              name="export-format"
              checked={format === "excel"}
              onChange={() => setFormat("excel")}
            />
            CSV لبرنامج Excel أو Numbers
          </S.RadioRow>
          <S.RadioRow>
            <input
              type="radio"
              name="export-format"
              checked={format === "plain"}
              onChange={() => setFormat("plain")}
            />
            ملف CSV عادي
          </S.RadioRow>
        </S.Stack>

        <S.Check>
          <input
            type="checkbox"
            checked={withAnswers}
            onChange={(e) => setWithAnswers(e.target.checked)}
          />
          تضمين الملف الصحي (إجابات الاستبيان)
        </S.Check>

        <S.Row $gap="0.5rem" style={{ justifyContent: "flex-end" }}>
          <S.Button type="button" onClick={onClose}>
            إلغاء
          </S.Button>
          <S.Button
            type="button"
            $variant="primary"
            disabled={!chosen?.count}
            onClick={() => onExport(scope, format, withAnswers)}
          >
            <Download size={15} />
            تصدير {chosen?.count ?? 0} عميل
          </S.Button>
        </S.Row>
      </S.ModalBox>
    </S.Overlay>
  );
});

/* ---------- The tab ---------- */

const CUSTOMER_VIEWS = [
  { id: "all", label: "كل العملاء", test: () => true },
  {
    id: "new",
    label: "جدد (آخر 30 يوماً)",
    test: (r) => inDateRange(r.createdAt, "30"),
  },
  { id: "incomplete", label: "بيانات ناقصة", test: isIncomplete },
];

const CustomersTab = memo(({ accessToken, onAuthError, onNavigate }) => {
  const { entries, loading, error, reload } = useWaitlist(
    accessToken,
    onAuthError,
  );

  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [activity, setActivity] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selected, setSelected] = useState(() => new Set());
  const [hidden, setHidden] = useState(loadHiddenColumns);
  const [profileId, setProfileId] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(COLUMN_STORE_KEY, JSON.stringify(hidden));
    } catch {
      /* storage unavailable — column choice just won't persist */
    }
  }, [hidden]);

  // Back to page 1 whenever the result set changes
  useEffect(
    () => setPage(1),
    [
      view,
      query,
      cities,
      genders,
      ageGroups,
      activity,
      smoke,
      range,
      sort,
      pageSize,
    ],
  );

  /* ---------- Facets & stats (from all customers) ---------- */
  const facets = useMemo(
    () => ({
      cities: facetOf(entries, (r) => r.city),
      genders: facetOf(entries, (r) => answerText(r, "sex")),
      ageGroups: facetOf(entries, ageGroupOf, [
        ...AGE_GROUPS.map((g) => g.label),
        "—",
      ]),
      activity: facetOf(entries, (r) => answerText(r, "pastVitamins")),
      smoke: facetOf(entries, (r) => answerText(r, "smoke")),
    }),
    [entries],
  );

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    const ages = entries.map((r) => ageOf(r.dob)).filter((a) => a !== null);
    const genderTotal = facets.genders
      .filter((g) => g.value !== "—")
      .reduce((s, g) => s + g.count, 0);
    const genderSplit = facets.genders
      .filter((g) => g.value !== "—")
      .map((g) => `${g.label} ${Math.round((g.count / genderTotal) * 100)}٪`)
      .join(" · ");
    return {
      total: entries.length,
      newWeek: entries.filter((r) => new Date(r.createdAt).getTime() >= weekAgo)
        .length,
      avgAge: ages.length
        ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length)
        : null,
      topCity: facets.cities.find((c) => c.value !== "—"),
      genderSplit,
      incomplete: entries.filter(isIncomplete).length,
    };
  }, [entries, facets]);

  /* ---------- Filter → sort → paginate ---------- */
  const filtered = useMemo(() => {
    const viewTest = CUSTOMER_VIEWS.find((v) => v.id === view).test;
    const q = normalizeAr(query);
    const qDigits = query
      .replace(/\D/g, "")
      .replace(/^966/, "")
      .replace(/^0/, "");
    const has = (list, v) => !list.length || list.includes(v || "—");

    return entries.filter((r) => {
      if (!viewTest(r)) return false;
      if (!has(cities, r.city)) return false;
      if (!has(genders, answerText(r, "sex"))) return false;
      if (!has(ageGroups, ageGroupOf(r))) return false;
      if (!has(activity, answerText(r, "pastVitamins"))) return false;
      if (!has(smoke, answerText(r, "smoke"))) return false;
      if (!inDateRange(r.createdAt, range)) return false;
      if (q) {
        const hay = normalizeAr(
          [r.name, r.email, r.city, r.idNumber].join(" "),
        );
        const phoneHit =
          qDigits.length >= 3 &&
          String(r.phone || "")
            .replace(/\D/g, "")
            .includes(qDigits);
        if (!hay.includes(q) && !phoneHit) return false;
      }
      return true;
    });
  }, [
    entries,
    view,
    query,
    cities,
    genders,
    ageGroups,
    activity,
    smoke,
    range,
  ]);

  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pageRows = useMemo(
    () => sorted.slice(pageStart, pageStart + pageSize),
    [sorted, pageStart, pageSize],
  );

  const visibleColumns = CUSTOMER_COLUMNS.filter(
    (c) => c.always || !hidden.includes(c.id),
  );
  const gridColumns = `48px ${visibleColumns.map((c) => c.w).join(" ")}`;
  const activeSort = SORT_OPTIONS.find(
    (o) => o.key === sort.key && o.dir === sort.dir,
  );
  const activeRange = DATE_RANGES.find((r) => r.id === range);
  const activeFilterCount =
    cities.length +
    genders.length +
    ageGroups.length +
    activity.length +
    smoke.length +
    (range !== "all" ? 1 : 0) +
    (query ? 1 : 0);

  const clearFilters = () => {
    setQuery("");
    setCities([]);
    setGenders([]);
    setAgeGroups([]);
    setActivity([]);
    setSmoke([]);
    setRange("all");
  };

  /* ---------- Selection ---------- */
  const pageAllSelected =
    pageRows.length > 0 && pageRows.every((r) => selected.has(r._id));

  const togglePage = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      pageRows.forEach((r) =>
        pageAllSelected ? next.delete(r._id) : next.add(r._id),
      );
      return next;
    });

  const toggleOne = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectAllResults = () => setSelected(new Set(sorted.map((r) => r._id)));
  const clearSelection = () => setSelected(new Set());

  /* ---------- Actions ---------- */
  const onHeaderSort = (col) =>
    setSort((prev) =>
      prev.key === col.sort
        ? { key: col.sort, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key: col.sort, dir: col.sort === "date" ? "desc" : "asc" },
    );

  const handleExport = (scope, format, withAnswers) => {
    const rows =
      scope === "page"
        ? pageRows
        : scope === "selected"
          ? sortRows(
              entries.filter((r) => selected.has(r._id)),
              sort,
            )
          : scope === "filtered"
            ? sorted
            : sortRows(entries, sort);
    const csv = buildCustomersCsv(rows, {
      excel: format === "excel",
      withAnswers,
    });
    downloadFile(
      csv,
      `customers-${toDateKey(new Date())}.csv`,
      "text/csv;charset=utf-8",
    );
    setExportOpen(false);
  };

  /* ---------- No customers yet → original empty page ---------- */
  if (!loading && !error && entries.length === 0) {
    return <ListTab {...LIST_TABS["العملاء"]} onNavigate={onNavigate} />;
  }

  const profileRow = profileId
    ? entries.find((r) => r._id === profileId)
    : null;
  const viewCounts = {
    all: entries.length,
    new: entries.filter(CUSTOMER_VIEWS[1].test).length,
    incomplete: stats.incomplete,
  };

  return (
    <S.Page $max="1400px">
      <PageHeader icon={tagIcon} title="العملاء">
        <S.Button
          type="button"
          $icon
          aria-label="تحديث"
          disabled={loading}
          onClick={reload}
        >
          <RefreshCw size={15} />
        </S.Button>
        <S.Button
          type="button"
          disabled={!entries.length}
          onClick={() => setExportOpen(true)}
        >
          <Download size={15} />
          تصدير
        </S.Button>
      </PageHeader>

      <S.Grid $cols={4}>
        <StatCard
          label="إجمالي العملاء"
          value={stats.total.toLocaleString("ar-SA")}
          hint={stats.genderSplit}
        />
        <StatCard
          label="جدد خلال آخر 7 أيام"
          value={stats.newWeek.toLocaleString("ar-SA")}
        />
        <StatCard
          label="متوسط العمر"
          value={stats.avgAge !== null ? `${stats.avgAge} سنة` : "—"}
        />
        <StatCard
          label="المدينة الأكثر تسجيلاً"
          value={stats.topCity?.label || "—"}
          hint={
            stats.topCity
              ? `${stats.topCity.count.toLocaleString("ar-SA")} عميل`
              : ""
          }
        />
      </S.Grid>

      <S.Card $flush $overflow>
        {/* Saved views */}
        <S.ViewTabs role="tablist">
          {CUSTOMER_VIEWS.map((v) => (
            <S.ViewTab
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              $active={view === v.id}
              onClick={() => setView(v.id)}
            >
              {v.label}
              <S.MenuCount>{viewCounts[v.id]}</S.MenuCount>
            </S.ViewTab>
          ))}
        </S.ViewTabs>

        {/* Selection bar or search + filters */}
        {selected.size > 0 ? (
          <S.BulkBar>
            <S.Row $gap="0.75rem" $wrap>
              <strong>تم تحديد {selected.size.toLocaleString("ar-SA")}</strong>
              {selected.size < sorted.length && (
                <S.LinkButton type="button" onClick={selectAllResults}>
                  تحديد كل النتائج ({sorted.length.toLocaleString("ar-SA")})
                </S.LinkButton>
              )}
            </S.Row>
            <S.Row $gap="0.5rem" $wrap>
              <S.Button
                type="button"
                $size="sm"
                onClick={() => setExportOpen(true)}
              >
                <Download size={14} />
                تصدير المحدد
              </S.Button>
              <S.Button
                type="button"
                $size="sm"
                $variant="ghost"
                onClick={clearSelection}
              >
                إلغاء التحديد
              </S.Button>
            </S.Row>
          </S.BulkBar>
        ) : (
          <S.FilterBar>
            <S.Row $gap="0.5rem" $wrap style={{ flex: 1, minWidth: 0 }}>
              <S.SearchField style={{ maxWidth: "22rem" }}>
                <Search size={15} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث بالاسم أو الجوال أو البريد أو الهوية"
                />
              </S.SearchField>
              <MultiFilter
                label="المدينة"
                options={facets.cities}
                value={cities}
                onChange={setCities}
              />
              <MultiFilter
                label="الجنس"
                options={facets.genders}
                value={genders}
                onChange={setGenders}
              />
              <MultiFilter
                label="الفئة العمرية"
                options={facets.ageGroups}
                value={ageGroups}
                onChange={setAgeGroups}
              />
              <MultiFilter
                label="مستوى النشاط"
                options={facets.activity}
                value={activity}
                onChange={setActivity}
              />
              <MultiFilter
                label="التدخين"
                options={facets.smoke}
                value={smoke}
                onChange={setSmoke}
              />
              <Popover
                trigger={({ toggle, open }) => (
                  <S.FilterPill
                    type="button"
                    $active={range !== "all"}
                    aria-expanded={open}
                    onClick={toggle}
                  >
                    تاريخ التسجيل{range !== "all" && `: ${activeRange.label}`}
                    <ChevronDown size={13} />
                  </S.FilterPill>
                )}
              >
                {({ close }) =>
                  DATE_RANGES.map((r) => (
                    <S.MenuItem
                      key={r.id}
                      type="button"
                      $active={range === r.id}
                      onClick={() => {
                        setRange(r.id);
                        close();
                      }}
                    >
                      {r.label}
                      {range === r.id && (
                        <Check
                          size={14}
                          style={{ marginInlineStart: "auto" }}
                        />
                      )}
                    </S.MenuItem>
                  ))
                }
              </Popover>
              {activeFilterCount > 0 && (
                <S.LinkButton
                  type="button"
                  onClick={clearFilters}
                  style={{ fontSize: "0.8125rem" }}
                >
                  مسح الكل
                </S.LinkButton>
              )}
            </S.Row>

            <S.Row $gap="0.375rem">
              <Popover
                align="end"
                trigger={({ toggle }) => (
                  <S.Button
                    type="button"
                    $size="sm"
                    onClick={toggle}
                    aria-label="ترتيب"
                  >
                    <ArrowUpDown size={14} />
                    {activeSort?.label}
                  </S.Button>
                )}
              >
                {({ close }) => (
                  <>
                    <S.MenuLabel>ترتيب حسب</S.MenuLabel>
                    {SORT_OPTIONS.map((o) => {
                      const active = o.key === sort.key && o.dir === sort.dir;
                      return (
                        <S.MenuItem
                          key={o.label}
                          type="button"
                          $active={active}
                          onClick={() => {
                            setSort({ key: o.key, dir: o.dir });
                            close();
                          }}
                        >
                          {o.label}
                          {active && (
                            <Check
                              size={14}
                              style={{ marginInlineStart: "auto" }}
                            />
                          )}
                        </S.MenuItem>
                      );
                    })}
                  </>
                )}
              </Popover>
              <Popover
                align="end"
                trigger={({ toggle }) => (
                  <S.Button
                    type="button"
                    $size="sm"
                    $icon
                    aria-label="الأعمدة"
                    onClick={toggle}
                  >
                    <SlidersHorizontal size={14} />
                  </S.Button>
                )}
              >
                <S.MenuLabel>الأعمدة الظاهرة</S.MenuLabel>
                {CUSTOMER_COLUMNS.filter((c) => !c.always).map((c) => {
                  const shown = !hidden.includes(c.id);
                  return (
                    <S.MenuCheck key={c.id}>
                      <input
                        type="checkbox"
                        checked={shown}
                        onChange={() =>
                          setHidden((prev) =>
                            shown
                              ? [...prev, c.id]
                              : prev.filter((id) => id !== c.id),
                          )
                        }
                      />
                      {c.label}
                    </S.MenuCheck>
                  );
                })}
              </Popover>
            </S.Row>
          </S.FilterBar>
        )}

        {/* Table */}
        <S.TableScroll $minH="420px">
          <S.GridTable $columns={gridColumns} $minWidth="900px">
            <S.Th $align="center">
              <S.Checkbox
                checked={pageAllSelected}
                onChange={togglePage}
                aria-label="تحديد الصفحة"
              />
            </S.Th>
            {visibleColumns.map((c) => (
              <S.Th key={c.id} $align={c.align}>
                {c.sort ? (
                  <S.SortHeader
                    type="button"
                    $active={sort.key === c.sort}
                    onClick={() => onHeaderSort(c)}
                  >
                    {c.label}
                    {sort.key === c.sort &&
                      (sort.dir === "asc" ? (
                        <ChevronUp size={13} />
                      ) : (
                        <ChevronDown size={13} />
                      ))}
                  </S.SortHeader>
                ) : (
                  c.label
                )}
              </S.Th>
            ))}

            {loading ? (
              <S.TableMessage>جاري التحميل...</S.TableMessage>
            ) : error ? (
              <S.TableMessage $error>
                {error}{" "}
                <S.LinkButton type="button" onClick={reload}>
                  إعادة المحاولة
                </S.LinkButton>
              </S.TableMessage>
            ) : pageRows.length === 0 ? (
              <S.TableMessage>
                لا يوجد عملاء يطابقون البحث أو التصفية.{" "}
                <S.LinkButton
                  type="button"
                  onClick={() => {
                    clearFilters();
                    setView("all");
                  }}
                >
                  مسح عوامل التصفية
                </S.LinkButton>
              </S.TableMessage>
            ) : (
              pageRows.map((row) => (
                <S.Tr key={row._id} onClick={() => setProfileId(row._id)}>
                  <S.Td $align="center" onClick={(e) => e.stopPropagation()}>
                    <S.Checkbox
                      checked={selected.has(row._id)}
                      onChange={() => toggleOne(row._id)}
                      aria-label="تحديد"
                    />
                  </S.Td>
                  {visibleColumns.map((c) => {
                    const content = c.render(row);
                    return (
                      <S.Td
                        key={c.id}
                        $align={c.align}
                        style={
                          c.ltr
                            ? { direction: "ltr", justifyContent: "flex-end" }
                            : undefined
                        }
                      >
                        {c.ellipsis ? (
                          <S.Ellipsis>{content}</S.Ellipsis>
                        ) : (
                          content
                        )}
                      </S.Td>
                    );
                  })}
                </S.Tr>
              ))
            )}
          </S.GridTable>
        </S.TableScroll>

        <S.TableFooter>
          <span>
            {sorted.length
              ? `عرض ${(pageStart + 1).toLocaleString("ar-SA")}–${(
                  pageStart + pageRows.length
                ).toLocaleString(
                  "ar-SA",
                )} من ${sorted.length.toLocaleString("ar-SA")}`
              : "لا توجد نتائج"}
          </span>
          <S.Row $gap="0.5rem">
            <S.PageSizeSelect
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {CUSTOMER_PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n} لكل صفحة
                </option>
              ))}
            </S.PageSizeSelect>
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

      {profileRow && (
        <CustomerProfileModal
          row={profileRow}
          onClose={() => setProfileId(null)}
        />
      )}

      {exportOpen && (
        <ExportModal
          counts={{
            page: pageRows.length,
            all: entries.length,
            selected: selected.size,
            filtered: sorted.length,
          }}
          onClose={() => setExportOpen(false)}
          onExport={handleExport}
        />
      )}
    </S.Page>
  );
});

/* ============================================================
   Tabs: المنتجات + المجموعة + المخزون  (packages from /api/packages)
   ============================================================ */

const MAX_FEATURED = 3;
const LOW_STOCK = 5;

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  images: [""],
  price: "",
  analysisCount: "",
  compareIntro: "",
  categories: [],
  productCollection: "",
  status: "draft",
  featured: false,
  mostPopular: false,
  sortOrder: 0,
  trackInventory: false,
  stock: 0,
};

const apiMessage = (err, fallback) => err?.response?.data?.message || fallback;

const productStatus = (p) =>
  p.status === "active"
    ? { label: "نشط", tone: "success" }
    : { label: "مسودة", tone: "neutral" };

const stockState = (p) => {
  if (!p.trackInventory) return { label: "غير متتبع", tone: "neutral" };
  if (p.stock <= 0) return { label: "نفد", tone: "danger" };
  if (p.stock <= LOW_STOCK) return { label: "منخفض", tone: "warning" };
  return { label: "متوفر", tone: "success" };
};

/* ---------- Data ---------- */

const usePackages = (accessToken, onAuthError) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await userRequest.get("/packages/admin", {
          signal: controller.signal,
        });
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const status = err.response?.status;
        if (status === 401) onAuthError();
        setError(
          status === 404
            ? "مسار المنتجات غير موجود على الخادم بعد (/api/packages)"
            : amanapiError(status, "تعذّر جلب المنتجات"),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [accessToken, onAuthError, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const guard = useCallback(
    async (fn) => {
      try {
        return await fn();
      } catch (err) {
        if (err.response?.status === 401) onAuthError();
        throw err;
      }
    },
    [onAuthError],
  );

  // Keeps "most popular" unique locally, same as the server does
  const merge = (saved) =>
    setItems((prev) => {
      const exists = prev.some((p) => p._id === saved._id);
      let next = exists
        ? prev.map((p) => (p._id === saved._id ? saved : p))
        : [saved, ...prev];
      if (saved.mostPopular)
        next = next.map((p) =>
          p._id === saved._id ? p : { ...p, mostPopular: false },
        );
      return next;
    });

  const save = useCallback(
    (id, payload) =>
      guard(async () => {
        const { data } = id
          ? await userRequest.put(`/packages/${id}`, payload)
          : await userRequest.post("/packages", payload);
        merge(data);
        return data;
      }),
    [guard],
  );

  const updateStock = useCallback(
    (id, patch) =>
      guard(async () => {
        const { data } = await userRequest.patch(
          `/packages/${id}/stock`,
          patch,
        );
        merge(data);
        return data;
      }),
    [guard],
  );

  const remove = useCallback(
    (id) =>
      guard(async () => {
        await userRequest.delete(`/packages/${id}`);
        setItems((prev) => prev.filter((p) => p._id !== id));
      }),
    [guard],
  );

  return { items, loading, error, reload, save, updateStock, remove };
};

/* ---------- Shared bits ---------- */

const ProductThumb = ({ src, size = 40 }) => {
  const [broken, setBroken] = useState(false);
  return src && !broken ? (
    <S.Thumb src={src} alt="" $size={size} onError={() => setBroken(true)} />
  ) : (
    <S.ThumbPlaceholder $size={size}>
      <Package size={size * 0.4} />
    </S.ThumbPlaceholder>
  );
};

const ProductCell = ({ p }) => (
  <S.Row $gap="0.75rem" style={{ minWidth: 0 }}>
    <ProductThumb src={p.images?.[0]} />
    <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
      <S.Row $gap="0.375rem" style={{ minWidth: 0 }}>
        <S.Ellipsis style={{ fontWeight: 600 }}>{p.name}</S.Ellipsis>
        {p.mostPopular && (
          <S.StatusBadge $tone="success">الأكثر اختياراً</S.StatusBadge>
        )}
      </S.Row>
      <S.Text $muted $size="0.75rem">
        {(p.analysisCount || 0).toLocaleString("ar-SA")} تحليلاً
      </S.Text>
    </S.Stack>
  </S.Row>
);

const NeedProducts = ({ loading, error, onRetry, onGoProducts }) =>
  loading ? (
    <S.Card $padding="3rem">
      <S.Text $muted $center>
        جاري التحميل...
      </S.Text>
    </S.Card>
  ) : error ? (
    <S.Card $padding="3rem">
      <S.Text $center style={{ color: T.danger }}>
        {error}{" "}
        <S.LinkButton type="button" onClick={onRetry}>
          إعادة المحاولة
        </S.LinkButton>
      </S.Text>
    </S.Card>
  ) : (
    <S.EmptyState>
      <S.Heading $size="1.125rem">لا توجد منتجات بعد</S.Heading>
      <S.Text $muted>
        أضف منتجاتك أولاً من صفحة المنتجات، وستظهر هنا تلقائياً.
      </S.Text>
      <S.Button type="button" $variant="primary" onClick={onGoProducts}>
        الذهاب إلى المنتجات
      </S.Button>
    </S.EmptyState>
  );

/* ---------- Product editor (add / edit) ---------- */

const toForm = (p) =>
  p
    ? {
        ...EMPTY_PRODUCT,
        ...p,
        images: p.images?.length ? p.images : [""],
        categories: (p.categories || []).map((c) => ({
          title: c.title,
          itemsText: (c.items || []).join("\n"),
        })),
      }
    : { ...EMPTY_PRODUCT };

const linesOf = (text) =>
  String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const ProductEditor = memo(
  ({ product, collections, featuredCount, onBack, onSave, onDelete }) => {
    const isNew = !product;
    const [form, setForm] = useState(() => toForm(product));
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const featuredLocked =
      !form.featured && !product?.featured && featuredCount >= MAX_FEATURED;
    const testsListed = form.categories.reduce(
      (n, c) => n + linesOf(c.itemsText).length,
      0,
    );
    const priceWithVat =
      Number(form.price) > 0 ? Number(form.price) * 1.15 : null;

    const setImage = (i, value) =>
      setForm((f) => ({
        ...f,
        images: f.images.map((u, idx) => (idx === i ? value : u)),
      }));
    const addImage = () =>
      setForm((f) => ({ ...f, images: [...f.images, ""] }));
    const removeImage = (i) =>
      setForm((f) => ({
        ...f,
        images:
          f.images.length > 1 ? f.images.filter((_, idx) => idx !== i) : [""],
      }));

    const setCategory = (i, key, value) =>
      setForm((f) => ({
        ...f,
        categories: f.categories.map((c, idx) =>
          idx === i ? { ...c, [key]: value } : c,
        ),
      }));
    const addCategory = () =>
      setForm((f) => ({
        ...f,
        categories: [...f.categories, { title: "", itemsText: "" }],
      }));
    const removeCategory = (i) =>
      setForm((f) => ({
        ...f,
        categories: f.categories.filter((_, idx) => idx !== i),
      }));

    const handleSave = async () => {
      if (!form.name.trim()) return setError("اسم المنتج مطلوب");
      if (form.price === "" || !(Number(form.price) >= 0))
        return setError("أدخل سعراً صحيحاً");

      const payload = {
        name: form.name.trim(),
        description: form.description,
        images: form.images.map((u) => u.trim()).filter(Boolean),
        price: Number(form.price),
        analysisCount: Number(form.analysisCount) || 0,
        compareIntro: form.compareIntro,
        categories: form.categories
          .map((c) => ({ title: c.title.trim(), items: linesOf(c.itemsText) }))
          .filter((c) => c.title),
        productCollection: form.productCollection.trim(),
        status: form.status,
        featured: form.featured,
        mostPopular: form.mostPopular,
        sortOrder: Number(form.sortOrder) || 0,
        trackInventory: form.trackInventory,
        stock: Number(form.stock) || 0,
      };

      setSaving(true);
      setError("");
      try {
        await onSave(product?._id, payload);
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حفظ المنتج. يرجى المحاولة مرة أخرى."));
        setSaving(false);
      }
    };

    const handleDelete = async () => {
      if (
        !window.confirm(
          `حذف "${product.name}"؟ لا يمكن التراجع عن هذا الإجراء.`,
        )
      )
        return;
      setDeleting(true);
      try {
        await onDelete(product._id);
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حذف المنتج."));
        setDeleting(false);
      }
    };

    const status = productStatus(form);

    return (
      <S.Page $max="1100px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع إلى المنتجات"
              onClick={onBack}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle>
              {isNew ? "إضافة منتج" : form.name || "تعديل المنتج"}
            </S.PageTitle>
            {!isNew && (
              <S.StatusBadge $tone={status.tone}>{status.label}</S.StatusBadge>
            )}
          </S.Row>
          <S.Row>
            <S.Button type="button" onClick={onBack}>
              إلغاء
            </S.Button>
            <S.Button
              type="button"
              $variant="primary"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </S.Button>
          </S.Row>
        </S.Row>

        {error && <S.Alert>{error}</S.Alert>}

        <S.EditorGrid>
          {/* ---------- Main column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="1rem">
              <S.Field>
                <S.FieldLabel>اسم المنتج</S.FieldLabel>
                <S.Input
                  value={form.name}
                  onChange={bind(setForm, "name")}
                  placeholder="مثال: الباقة الشاملة"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>الوصف</S.FieldLabel>
                <S.Textarea
                  rows={4}
                  value={form.description}
                  onChange={bind(setForm, "description")}
                  placeholder="وصف مختصر يظهر للعميل"
                />
              </S.Field>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الصور</S.Heading>
              {form.images.map((url, i) => (
                <S.Row key={i} $gap="0.5rem">
                  <ProductThumb src={url.trim()} size={40} />
                  <S.Input
                    value={url}
                    onChange={(e) => setImage(i, e.target.value)}
                    placeholder="https://..."
                    style={{ direction: "ltr" }}
                  />
                  <S.Button
                    type="button"
                    $variant="ghost"
                    $icon
                    aria-label="حذف الصورة"
                    onClick={() => removeImage(i)}
                  >
                    <Trash2 size={15} />
                  </S.Button>
                </S.Row>
              ))}
              <div>
                <S.Button type="button" $size="sm" onClick={addImage}>
                  <Plus size={14} />
                  إضافة رابط صورة
                </S.Button>
              </div>
              <S.Text $muted $size="0.75rem">
                الصورة الأولى هي التي تظهر في بطاقة الباقة.
              </S.Text>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="1rem">
              <S.Heading $size="0.9375rem">السعر</S.Heading>
              <S.FormGrid>
                <S.Field>
                  <S.FieldLabel>السعر قبل الضريبة (ر.س)</S.FieldLabel>
                  <S.Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={bind(setForm, "price")}
                  />
                  <S.Text $muted $size="0.75rem">
                    {priceWithVat !== null
                      ? `يدفع العميل ${formatSAR(priceWithVat)} شامل الضريبة 15٪`
                      : " "}
                  </S.Text>
                </S.Field>
                <S.Field>
                  <S.FieldLabel>عدد التحاليل</S.FieldLabel>
                  <S.Input
                    type="number"
                    min="0"
                    value={form.analysisCount}
                    onChange={bind(setForm, "analysisCount")}
                  />
                  <S.Text $muted $size="0.75rem">
                    يظهر في البطاقة كـ "{Number(form.analysisCount) || 0}{" "}
                    تحليلاً"
                  </S.Text>
                </S.Field>
              </S.FormGrid>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">
                  التحاليل المشمولة (مقارنة الباقات)
                </S.Heading>
                <S.Text $muted $size="0.75rem">
                  {testsListed} مؤشر مُدرج
                </S.Text>
              </S.Row>
              <S.Field>
                <S.FieldLabel $small>جملة تمهيدية (اختياري)</S.FieldLabel>
                <S.Input
                  value={form.compareIntro}
                  onChange={bind(setForm, "compareIntro")}
                  placeholder="مثال: إضافةً إلى كل مؤشرات الباقة الأساسية:"
                />
              </S.Field>
              {form.categories.map((c, i) => (
                <S.SubCard key={i}>
                  <S.Row $gap="0.5rem">
                    <S.Input
                      value={c.title}
                      onChange={(e) => setCategory(i, "title", e.target.value)}
                      placeholder="اسم الفئة، مثال: صحة الكبد"
                    />
                    <S.Button
                      type="button"
                      $variant="ghost"
                      $icon
                      aria-label="حذف الفئة"
                      onClick={() => removeCategory(i)}
                    >
                      <Trash2 size={15} />
                    </S.Button>
                  </S.Row>
                  <S.Textarea
                    rows={4}
                    value={c.itemsText}
                    onChange={(e) =>
                      setCategory(i, "itemsText", e.target.value)
                    }
                    placeholder={"تحليل في كل سطر\nAST\nALT"}
                  />
                </S.SubCard>
              ))}
              <div>
                <S.Button type="button" $size="sm" onClick={addCategory}>
                  <Plus size={14} />
                  إضافة فئة
                </S.Button>
              </div>
            </S.Card>
          </S.Stack>

          {/* ---------- Side column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الحالة</S.Heading>
              <S.Select value={form.status} onChange={bind(setForm, "status")}>
                <option value="active">نشط</option>
                <option value="draft">مسودة</option>
              </S.Select>
              <S.Text $muted $size="0.75rem">
                المسودة لا تظهر للعملاء حتى لو كانت مميزة.
              </S.Text>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الظهور في قائمة الانتظار</S.Heading>
              <S.Check
                $bold
                style={featuredLocked ? { opacity: 0.55 } : undefined}
              >
                <input
                  type="checkbox"
                  checked={form.featured}
                  disabled={featuredLocked}
                  onChange={bind(setForm, "featured")}
                />
                منتج مميز
              </S.Check>
              <S.Text $muted $size="0.75rem">
                {featuredLocked
                  ? `يوجد ${MAX_FEATURED} منتجات مميزة بالفعل. ألغِ تمييز أحدها أولاً.`
                  : `المنتجات المميزة (حتى ${MAX_FEATURED}) هي التي تظهر في صفحة قائمة الانتظار.`}
              </S.Text>
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.mostPopular}
                  onChange={bind(setForm, "mostPopular")}
                />
                شارة "الأكثر اختياراً"
              </S.Check>
              <S.Field>
                <S.FieldLabel $small>ترتيب الظهور (الأصغر أولاً)</S.FieldLabel>
                <S.Input
                  type="number"
                  value={form.sortOrder}
                  onChange={bind(setForm, "sortOrder")}
                />
              </S.Field>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">المجموعة</S.Heading>
              <S.Input
                list="product-collections"
                value={form.productCollection}
                onChange={bind(setForm, "productCollection")}
                placeholder="مثال: الفحص السنوي"
              />
              <datalist id="product-collections">
                {collections.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">المخزون</S.Heading>
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.trackInventory}
                  onChange={bind(setForm, "trackInventory")}
                />
                تتبع الكمية
              </S.Check>
              {form.trackInventory && (
                <S.Field>
                  <S.FieldLabel $small>الكمية المتوفرة</S.FieldLabel>
                  <S.Input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={bind(setForm, "stock")}
                  />
                </S.Field>
              )}
            </S.Card>
          </S.Stack>
        </S.EditorGrid>

        {!isNew && (
          <S.Row style={{ justifyContent: "flex-end" }}>
            <S.Button
              type="button"
              $variant="danger"
              disabled={deleting}
              onClick={handleDelete}
            >
              <Trash2 size={15} />
              {deleting ? "جارٍ الحذف..." : "حذف المنتج"}
            </S.Button>
          </S.Row>
        )}
      </S.Page>
    );
  },
);

/* ---------- المنتجات ---------- */

const PRODUCT_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  { id: "active", label: "نشط", test: (p) => p.status === "active" },
  { id: "draft", label: "مسودة", test: (p) => p.status !== "active" },
  { id: "featured", label: "مميز", test: (p) => p.featured },
];

const PRODUCT_SORTS = [
  {
    id: "order",
    label: "ترتيب الظهور",
    fn: (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  },
  {
    id: "newest",
    label: "الأحدث",
    fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  },
  {
    id: "name",
    label: "الاسم (أ - ي)",
    fn: (a, b) => (a.name || "").localeCompare(b.name || "", "ar"),
  },
  {
    id: "priceDesc",
    label: "السعر: الأعلى",
    fn: (a, b) => (b.price || 0) - (a.price || 0),
  },
  {
    id: "priceAsc",
    label: "السعر: الأقل",
    fn: (a, b) => (a.price || 0) - (b.price || 0),
  },
];

const PRODUCT_GRID = "minmax(260px, 2.2fr) 0.8fr 0.6fr 1fr 1fr 1fr";

const ProductsTab = memo(
  ({ accessToken, onAuthError, startNew, onCloseNew }) => {
    const pk = usePackages(accessToken, onAuthError);
    const [editing, setEditing] = useState(startNew ? "new" : null); // null | "new" | product id

    // /item and the home "اضافة المنتجات" button land here with ?new=1
    useEffect(() => {
      if (startNew) setEditing("new");
    }, [startNew]);

    const closeEditor = () => {
      setEditing(null);
      if (startNew) onCloseNew?.(); // drop ?new=1 so a refresh shows the list
    };
    const [view, setView] = useState("all");
    const [query, setQuery] = useState("");
    const [collections, setCollections] = useState([]);
    const [sortId, setSortId] = useState("order");
    const [busyId, setBusyId] = useState(null);

    const featuredCount = pk.items.filter((p) => p.featured).length;
    const collectionFacet = useMemo(
      () => facetOf(pk.items, (p) => p.productCollection),
      [pk.items],
    );
    const collectionNames = collectionFacet
      .filter((c) => c.value !== "—")
      .map((c) => c.value);

    const rows = useMemo(() => {
      const viewTest = PRODUCT_VIEWS.find((v) => v.id === view).test;
      const q = normalizeAr(query);
      const sorter = PRODUCT_SORTS.find((s) => s.id === sortId).fn;
      return pk.items
        .filter(
          (p) =>
            viewTest(p) &&
            (!collections.length ||
              collections.includes(p.productCollection || "—")) &&
            (!q ||
              normalizeAr(
                `${p.name} ${p.description} ${p.productCollection}`,
              ).includes(q)),
        )
        .sort(sorter);
    }, [pk.items, view, query, collections, sortId]);

    const toggleFeatured = async (p) => {
      if (!p.featured && featuredCount >= MAX_FEATURED) {
        alert(
          `يمكن تمييز ${MAX_FEATURED} منتجات فقط. ألغِ تمييز منتج آخر أولاً.`,
        );
        return;
      }
      setBusyId(p._id);
      try {
        await pk.save(p._id, { featured: !p.featured });
      } catch (err) {
        alert(apiMessage(err, "تعذّر تحديث المنتج"));
      } finally {
        setBusyId(null);
      }
    };

    if (editing) {
      const product =
        editing === "new" ? null : pk.items.find((p) => p._id === editing);
      return (
        <ProductEditor
          key={editing}
          product={product}
          collections={collectionNames}
          featuredCount={featuredCount}
          onBack={closeEditor}
          onSave={pk.save}
          onDelete={pk.remove}
        />
      );
    }

    const activeSort = PRODUCT_SORTS.find((s) => s.id === sortId);

    return (
      <S.Page>
        <PageHeader icon={ordersIcon} title="المنتجات">
          <S.Button
            type="button"
            $icon
            aria-label="تحديث"
            disabled={pk.loading}
            onClick={pk.reload}
          >
            <RefreshCw size={15} />
          </S.Button>
          <S.Button
            type="button"
            $variant="primary"
            onClick={() => setEditing("new")}
          >
            <Plus size={15} />
            إضافة منتج
          </S.Button>
        </PageHeader>

        {pk.loading || pk.error ? (
          <NeedProducts
            loading={pk.loading}
            error={pk.error}
            onRetry={pk.reload}
          />
        ) : pk.items.length === 0 ? (
          <S.EmptyState>
            <S.Illustration src={productsImage} alt="" $w="200px" />
            <S.Heading $size="1.125rem">أضف منتجاتك</S.Heading>
            <S.Text $muted>
              ابدأ بإضافة باقاتك. المنتجات النشطة المميزة (حتى {MAX_FEATURED})
              تظهر في صفحة قائمة الانتظار.
            </S.Text>
            <S.Button
              type="button"
              $variant="primary"
              onClick={() => setEditing("new")}
            >
              <Plus size={15} />
              إضافة منتج
            </S.Button>
          </S.EmptyState>
        ) : (
          <>
            <S.Notice>
              <Star size={16} fill="currentColor" />
              <span>
                المنتجات المميزة النشطة تظهر في صفحة قائمة الانتظار —{" "}
                <strong>
                  {featuredCount} من {MAX_FEATURED}
                </strong>{" "}
                مميزة. اضغط على النجمة للتمييز أو الإلغاء.
              </span>
            </S.Notice>

            <S.Card $flush $overflow>
              <S.ViewTabs role="tablist">
                {PRODUCT_VIEWS.map((v) => (
                  <S.ViewTab
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={view === v.id}
                    $active={view === v.id}
                    onClick={() => setView(v.id)}
                  >
                    {v.label}
                    <S.MenuCount>{pk.items.filter(v.test).length}</S.MenuCount>
                  </S.ViewTab>
                ))}
              </S.ViewTabs>

              <S.FilterBar>
                <S.Row $gap="0.5rem" $wrap style={{ flex: 1, minWidth: 0 }}>
                  <S.SearchField style={{ maxWidth: "20rem" }}>
                    <Search size={15} />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ابحث في المنتجات"
                    />
                  </S.SearchField>
                  <MultiFilter
                    label="المجموعة"
                    options={collectionFacet}
                    value={collections}
                    onChange={setCollections}
                  />
                </S.Row>
                <Popover
                  align="end"
                  trigger={({ toggle }) => (
                    <S.Button type="button" $size="sm" onClick={toggle}>
                      <ArrowUpDown size={14} />
                      {activeSort.label}
                    </S.Button>
                  )}
                >
                  {({ close }) =>
                    PRODUCT_SORTS.map((s) => (
                      <S.MenuItem
                        key={s.id}
                        type="button"
                        $active={sortId === s.id}
                        onClick={() => {
                          setSortId(s.id);
                          close();
                        }}
                      >
                        {s.label}
                        {sortId === s.id && (
                          <Check
                            size={14}
                            style={{ marginInlineStart: "auto" }}
                          />
                        )}
                      </S.MenuItem>
                    ))
                  }
                </Popover>
              </S.FilterBar>

              <S.TableScroll $minH="320px">
                <S.GridTable $columns={PRODUCT_GRID} $minWidth="860px">
                  <S.Th>المنتج</S.Th>
                  <S.Th $align="center">الحالة</S.Th>
                  <S.Th $align="center">مميز</S.Th>
                  <S.Th>المخزون</S.Th>
                  <S.Th>المجموعة</S.Th>
                  <S.Th>السعر</S.Th>

                  {rows.length === 0 ? (
                    <S.TableMessage>
                      لا توجد منتجات تطابق البحث أو التصفية.
                    </S.TableMessage>
                  ) : (
                    rows.map((p) => {
                      const st = productStatus(p);
                      const stock = stockState(p);
                      return (
                        <S.Tr key={p._id} onClick={() => setEditing(p._id)}>
                          <S.Td>
                            <ProductCell p={p} />
                          </S.Td>
                          <S.Td $align="center">
                            <S.StatusBadge $tone={st.tone}>
                              {st.label}
                            </S.StatusBadge>
                          </S.Td>
                          <S.Td $align="center">
                            <S.StarToggle
                              type="button"
                              $on={p.featured}
                              aria-pressed={p.featured}
                              aria-label={
                                p.featured ? "إلغاء التمييز" : "تمييز المنتج"
                              }
                              disabled={busyId === p._id}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFeatured(p);
                              }}
                            >
                              <Star
                                size={17}
                                fill={p.featured ? "currentColor" : "none"}
                              />
                            </S.StarToggle>
                          </S.Td>
                          <S.Td>
                            <S.Row $gap="0.375rem">
                              <S.StatusBadge $tone={stock.tone}>
                                {stock.label}
                              </S.StatusBadge>
                              {p.trackInventory && (
                                <S.Text $muted $size="0.8125rem">
                                  {p.stock}
                                </S.Text>
                              )}
                            </S.Row>
                          </S.Td>
                          <S.Td>
                            <S.Ellipsis>
                              {p.productCollection || "—"}
                            </S.Ellipsis>
                          </S.Td>
                          <S.Td $weight={600}>{formatSAR(p.price)}</S.Td>
                        </S.Tr>
                      );
                    })
                  )}
                </S.GridTable>
              </S.TableScroll>

              <S.TableFooter>
                <span>
                  {rows.length.toLocaleString("ar-SA")} من{" "}
                  {pk.items.length.toLocaleString("ar-SA")} منتج
                </span>
              </S.TableFooter>
            </S.Card>
          </>
        )}
      </S.Page>
    );
  },
);

/* ---------- المجموعة ---------- */

const CollectionsTab = memo(({ accessToken, onAuthError, onGoProducts }) => {
  const pk = usePackages(accessToken, onAuthError);
  const [created, setCreated] = useState([]); // new, still-empty collections
  const [openName, setOpenName] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  const groups = useMemo(() => {
    const map = new Map();
    created.forEach((n) => map.set(n, []));
    pk.items.forEach((p) => {
      const k = p.productCollection || "";
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(p);
    });
    return [...map.entries()]
      .map(([name, products]) => ({ name, products }))
      .sort((a, b) =>
        a.name === ""
          ? 1
          : b.name === ""
            ? -1
            : a.name.localeCompare(b.name, "ar"),
      );
  }, [pk.items, created]);

  const assign = async (ids, name) => {
    setBusy(true);
    try {
      await Promise.all(
        ids.map((id) => pk.save(id, { productCollection: name })),
      );
    } catch (err) {
      alert(apiMessage(err, "تعذّر تحديث المجموعة"));
    } finally {
      setBusy(false);
    }
  };

  const createCollection = () => {
    const name = newName.trim();
    if (!name) return;
    if (!groups.some((g) => g.name === name))
      setCreated((prev) => [...prev, name]);
    setCreating(false);
    setNewName("");
    setOpenName(name);
  };

  if (pk.loading || pk.error || pk.items.length === 0) {
    return (
      <S.Page>
        <PageHeader icon={marketsIcon} title="المجموعة" />
        <NeedProducts
          loading={pk.loading}
          error={pk.error}
          onRetry={pk.reload}
          onGoProducts={onGoProducts}
        />
      </S.Page>
    );
  }

  /* ----- one collection ----- */
  if (openName !== null) {
    const group = groups.find((g) => g.name === openName) || {
      name: openName,
      products: [],
    };
    const others = pk.items.filter(
      (p) => (p.productCollection || "") !== openName,
    );
    const unassigned = openName === "";

    return (
      <S.Page>
        <S.Row $between $wrap $gap="1rem">
          <S.Row>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع"
              onClick={() => setOpenName(null)}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle>{unassigned ? "بدون مجموعة" : openName}</S.PageTitle>
            <S.StatusBadge $tone="neutral">
              {group.products.length} منتج
            </S.StatusBadge>
          </S.Row>
          {!unassigned && (
            <Popover
              align="end"
              trigger={({ toggle }) => (
                <S.Button
                  type="button"
                  $variant="primary"
                  disabled={busy || !others.length}
                  onClick={toggle}
                >
                  <Plus size={15} />
                  إضافة منتجات
                </S.Button>
              )}
            >
              {({ close }) => (
                <>
                  <S.MenuLabel>انقل منتجاً إلى هذه المجموعة</S.MenuLabel>
                  {others.map((p) => (
                    <S.MenuItem
                      key={p._id}
                      type="button"
                      onClick={() => {
                        close();
                        assign([p._id], openName);
                      }}
                    >
                      <ProductThumb src={p.images?.[0]} size={28} />
                      {p.name}
                      <S.MenuCount>
                        {p.productCollection || "بدون مجموعة"}
                      </S.MenuCount>
                    </S.MenuItem>
                  ))}
                </>
              )}
            </Popover>
          )}
        </S.Row>

        <S.Card $flush>
          {group.products.length === 0 ? (
            <S.Text $muted $center style={{ padding: "3rem 1rem" }}>
              لا توجد منتجات في هذه المجموعة بعد. استخدم "إضافة منتجات".
            </S.Text>
          ) : (
            <S.DataTable>
              <thead>
                <tr>
                  <th>المنتج</th>
                  <th>الحالة</th>
                  <th>السعر</th>
                  {!unassigned && <th style={{ width: "1%" }} />}
                </tr>
              </thead>
              <tbody>
                {group.products.map((p) => {
                  const st = productStatus(p);
                  return (
                    <tr key={p._id}>
                      <td>
                        <ProductCell p={p} />
                      </td>
                      <td>
                        <S.StatusBadge $tone={st.tone}>
                          {st.label}
                        </S.StatusBadge>
                      </td>
                      <td style={{ fontWeight: 600 }}>{formatSAR(p.price)}</td>
                      {!unassigned && (
                        <td>
                          <S.LinkButton
                            type="button"
                            disabled={busy}
                            style={{ color: T.danger }}
                            onClick={() => assign([p._id], "")}
                          >
                            إزالة
                          </S.LinkButton>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </S.DataTable>
          )}
        </S.Card>
      </S.Page>
    );
  }

  /* ----- all collections ----- */
  return (
    <S.Page>
      <PageHeader icon={marketsIcon} title="المجموعة">
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => setCreating(true)}
        >
          <Plus size={15} />
          اصنع مجموعة
        </S.Button>
      </PageHeader>

      <S.Card $flush>
        <S.DataTable>
          <thead>
            <tr>
              <th>المجموعة</th>
              <th>المنتجات</th>
              <th>النشطة</th>
              <th>المميزة</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr
                key={g.name || "__none"}
                style={{ cursor: "pointer" }}
                onClick={() => setOpenName(g.name)}
              >
                <td>
                  <S.Row $gap="0.75rem">
                    <S.Row $gap="0">
                      {g.products.slice(0, 3).map((p, i) => (
                        <span
                          key={p._id}
                          style={{ marginInlineStart: i ? -10 : 0 }}
                        >
                          <ProductThumb src={p.images?.[0]} size={32} />
                        </span>
                      ))}
                      {g.products.length === 0 && <ProductThumb size={32} />}
                    </S.Row>
                    <strong>{g.name || "بدون مجموعة"}</strong>
                  </S.Row>
                </td>
                <td>{g.products.length}</td>
                <td>
                  {g.products.filter((p) => p.status === "active").length}
                </td>
                <td>{g.products.filter((p) => p.featured).length}</td>
              </tr>
            ))}
          </tbody>
        </S.DataTable>
      </S.Card>

      {creating && (
        <S.Overlay onClick={() => setCreating(false)}>
          <S.ModalBox
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <S.Row $between>
              <S.Heading $size="1.125rem">مجموعة جديدة</S.Heading>
              <S.PlainIconButton
                type="button"
                aria-label="إغلاق"
                onClick={() => setCreating(false)}
              >
                <X size={18} />
              </S.PlainIconButton>
            </S.Row>
            <S.Input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createCollection()}
              placeholder="مثال: باقات النساء"
            />
            <S.Row $gap="0.5rem" style={{ justifyContent: "flex-end" }}>
              <S.Button type="button" onClick={() => setCreating(false)}>
                إلغاء
              </S.Button>
              <S.Button
                type="button"
                $variant="primary"
                disabled={!newName.trim()}
                onClick={createCollection}
              >
                إنشاء
              </S.Button>
            </S.Row>
          </S.ModalBox>
        </S.Overlay>
      )}
    </S.Page>
  );
});

/* ---------- المخزون ---------- */

const INVENTORY_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  { id: "tracked", label: "متتبع", test: (p) => p.trackInventory },
  {
    id: "low",
    label: "منخفض",
    test: (p) => p.trackInventory && p.stock > 0 && p.stock <= LOW_STOCK,
  },
  { id: "out", label: "نفد", test: (p) => p.trackInventory && p.stock <= 0 },
];

const INVENTORY_GRID = "minmax(260px, 2fr) 0.9fr 0.9fr 1.5fr";

const InventoryTab = memo(({ accessToken, onAuthError, onGoProducts }) => {
  const pk = usePackages(accessToken, onAuthError);
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [drafts, setDrafts] = useState({}); // id -> typed quantity
  const [savingId, setSavingId] = useState(null);

  const rows = useMemo(() => {
    const test = INVENTORY_VIEWS.find((v) => v.id === view).test;
    const q = normalizeAr(query);
    return pk.items
      .filter((p) => test(p) && (!q || normalizeAr(p.name).includes(q)))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [pk.items, view, query]);

  const saveRow = async (p, patch) => {
    setSavingId(p._id);
    try {
      await pk.updateStock(p._id, patch);
      setDrafts((d) => {
        const next = { ...d };
        delete next[p._id];
        return next;
      });
    } catch (err) {
      alert(apiMessage(err, "تعذّر تحديث المخزون"));
    } finally {
      setSavingId(null);
    }
  };

  if (pk.loading || pk.error || pk.items.length === 0) {
    return (
      <S.Page>
        <PageHeader icon={ordersIcon} title="المخزون" />
        <NeedProducts
          loading={pk.loading}
          error={pk.error}
          onRetry={pk.reload}
          onGoProducts={onGoProducts}
        />
      </S.Page>
    );
  }

  return (
    <S.Page>
      <PageHeader icon={ordersIcon} title="المخزون">
        <S.Button type="button" $icon aria-label="تحديث" onClick={pk.reload}>
          <RefreshCw size={15} />
        </S.Button>
      </PageHeader>

      <S.Card $flush $overflow>
        <S.ViewTabs role="tablist">
          {INVENTORY_VIEWS.map((v) => (
            <S.ViewTab
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              $active={view === v.id}
              onClick={() => setView(v.id)}
            >
              {v.label}
              <S.MenuCount>{pk.items.filter(v.test).length}</S.MenuCount>
            </S.ViewTab>
          ))}
        </S.ViewTabs>

        <S.FilterBar>
          <S.SearchField style={{ maxWidth: "20rem" }}>
            <Search size={15} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج"
            />
          </S.SearchField>
        </S.FilterBar>

        <S.TableScroll $minH="320px">
          <S.GridTable $columns={INVENTORY_GRID} $minWidth="760px">
            <S.Th>المنتج</S.Th>
            <S.Th>الحالة</S.Th>
            <S.Th $align="center">تتبع الكمية</S.Th>
            <S.Th>الكمية المتوفرة</S.Th>

            {rows.length === 0 ? (
              <S.TableMessage>لا توجد منتجات في هذا العرض.</S.TableMessage>
            ) : (
              rows.map((p) => {
                const st = stockState(p);
                const draft = drafts[p._id];
                const changed =
                  draft !== undefined && Number(draft) !== p.stock;
                const busy = savingId === p._id;
                return (
                  <Fragment key={p._id}>
                    <S.Td>
                      <ProductCell p={p} />
                    </S.Td>
                    <S.Td>
                      <S.StatusBadge $tone={st.tone}>{st.label}</S.StatusBadge>
                    </S.Td>
                    <S.Td $align="center">
                      <S.Checkbox
                        checked={p.trackInventory}
                        disabled={busy}
                        aria-label="تتبع الكمية"
                        onChange={() =>
                          saveRow(p, { trackInventory: !p.trackInventory })
                        }
                      />
                    </S.Td>
                    <S.Td>
                      <S.Row $gap="0.5rem">
                        <S.Input
                          type="number"
                          min="0"
                          disabled={!p.trackInventory || busy}
                          value={draft ?? p.stock}
                          onChange={(e) =>
                            setDrafts((d) => ({
                              ...d,
                              [p._id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            changed &&
                            saveRow(p, { stock: Number(draft) })
                          }
                          style={{ width: "6.5rem", height: "2rem" }}
                        />
                        {changed && (
                          <S.Button
                            type="button"
                            $size="sm"
                            $variant="primary"
                            disabled={busy}
                            onClick={() => saveRow(p, { stock: Number(draft) })}
                          >
                            {busy ? "..." : "حفظ"}
                          </S.Button>
                        )}
                      </S.Row>
                    </S.Td>
                  </Fragment>
                );
              })
            )}
          </S.GridTable>
        </S.TableScroll>

        <S.TableFooter>
          <span>
            المخزون المنخفض: {LOW_STOCK} قطع أو أقل · المسودات والمنتجات غير
            المتتبعة لا تتأثر بالكمية
          </span>
        </S.TableFooter>
      </S.Card>
    </S.Page>
  );
});

/* ============================================================
   Tab: الخصومات  (discount codes from /api/discounts)
   ============================================================ */

const DISCOUNT_STATES = {
  active: { label: "نشط", tone: "success" },
  scheduled: { label: "مجدول", tone: "warning" },
  expired: { label: "منتهي", tone: "neutral" },
  used_up: { label: "مستنفد", tone: "neutral" },
  disabled: { label: "معطل", tone: "danger" },
};

// Same rules as the server (models/Discount.js → stateOf)
const discountStateOf = (d, now = new Date()) => {
  if (d.status === "disabled") return "disabled";
  if (d.startsAt && new Date(d.startsAt) > now) return "scheduled";
  if (d.endsAt && new Date(d.endsAt) < now) return "expired";
  if (d.usageLimit && d.usedCount >= d.usageLimit) return "used_up";
  return "active";
};

const DISCOUNT_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  { id: "active", label: "نشط", test: (d) => discountStateOf(d) === "active" },
  {
    id: "scheduled",
    label: "مجدول",
    test: (d) => discountStateOf(d) === "scheduled",
  },
  {
    id: "ended",
    label: "منتهي",
    test: (d) => ["expired", "used_up"].includes(discountStateOf(d)),
  },
  {
    id: "disabled",
    label: "معطل",
    test: (d) => discountStateOf(d) === "disabled",
  },
];

const CODE_RE = /^[A-Z0-9_-]{3,30}$/;
const DISCOUNT_GRID = "minmax(220px, 1.6fr) 1.3fr 0.8fr 0.8fr 1.4fr";

const discountValueLabel = (d) =>
  d.type === "percentage" ? `${d.value}٪` : formatSAR(d.value);

const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("ar-SA-u-ca-gregory", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

// ISO → value for <input type="datetime-local"> (local time)
const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${toDateKey(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// No 0/O/1/I so codes are easy to read out loud
const generateCode = (length = 8) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};

const appliesLabel = (d, packagesById) => {
  if (d.appliesTo !== "packages") return "كل الباقات";
  const names = (d.packageIds || [])
    .map((id) => packagesById[id]?.name)
    .filter(Boolean);
  if (names.length === 0) return "باقات محددة";
  return names.length <= 2 ? names.join("، ") : `${names.length} باقات`;
};

/* ---------- Data ---------- */

const useDiscounts = (accessToken, onAuthError) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await userRequest.get("/discounts/admin", {
          signal: controller.signal,
        });
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const status = err.response?.status;
        if (status === 401) onAuthError();
        setError(
          status === 404
            ? "مسار الخصومات غير موجود على الخادم بعد (/api/discounts)"
            : amanapiError(status, "تعذّر جلب أكواد الخصم"),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [accessToken, onAuthError, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const guard = useCallback(
    async (fn) => {
      try {
        return await fn();
      } catch (err) {
        if (err.response?.status === 401) onAuthError();
        throw err;
      }
    },
    [onAuthError],
  );

  const save = useCallback(
    (id, payload) =>
      guard(async () => {
        const { data } = id
          ? await userRequest.put(`/discounts/${id}`, payload)
          : await userRequest.post("/discounts", payload);
        setItems((prev) =>
          prev.some((d) => d._id === data._id)
            ? prev.map((d) => (d._id === data._id ? data : d))
            : [data, ...prev],
        );
        return data;
      }),
    [guard],
  );

  const remove = useCallback(
    (id) =>
      guard(async () => {
        await userRequest.delete(`/discounts/${id}`);
        setItems((prev) => prev.filter((d) => d._id !== id));
      }),
    [guard],
  );

  return { items, loading, error, reload, save, remove };
};

/* ---------- Editor ---------- */

const discountToForm = (d) => ({
  code: d?.code ?? "",
  title: d?.title ?? "",
  type: d?.type ?? "percentage",
  value: d?.value ?? "",
  appliesTo: d?.appliesTo ?? "all",
  packageIds: (d?.packageIds ?? []).map(String),
  hasMin: Boolean(d?.minPurchase),
  minPurchase: d?.minPurchase || "",
  hasLimit: Boolean(d?.usageLimit),
  usageLimit: d?.usageLimit ?? "",
  oncePerCustomer: Boolean(d?.oncePerCustomer),
  startsAt: toLocalInput(d?.startsAt ?? new Date().toISOString()),
  hasEnd: Boolean(d?.endsAt),
  endsAt: toLocalInput(d?.endsAt),
  status: d?.status ?? "active",
});

const DiscountEditor = memo(
  ({ discount, packages, onBack, onSave, onDelete }) => {
    const isNew = !discount;
    const [form, setForm] = useState(() => discountToForm(discount));
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const code = form.code.trim().toUpperCase();
    const value = Number(form.value);
    const packagesById = useMemo(
      () => Object.fromEntries(packages.map((p) => [String(p._id), p])),
      [packages],
    );

    const togglePackage = (id) =>
      setForm((f) => ({
        ...f,
        packageIds: f.packageIds.includes(id)
          ? f.packageIds.filter((x) => x !== id)
          : [...f.packageIds, id],
      }));

    // Live price example (first chosen package, or the first package)
    const examplePkg =
      (form.appliesTo === "packages"
        ? packagesById[form.packageIds[0]]
        : packages[0]) || null;
    const example = useMemo(() => {
      if (!examplePkg || !(value > 0)) return null;
      const subtotal = Number(examplePkg.price) || 0;
      const off =
        form.type === "percentage"
          ? (subtotal * Math.min(value, 100)) / 100
          : Math.min(value, subtotal);
      const after = subtotal - off;
      return { name: examplePkg.name, subtotal, after, total: after * 1.15 };
    }, [examplePkg, value, form.type]);

    const handleSave = async () => {
      if (!CODE_RE.test(code))
        return setError(
          "الكود يجب أن يكون من 3 إلى 30 حرفاً إنجليزياً أو أرقاماً (مسموح - و _)",
        );
      if (!(value > 0)) return setError("أدخل قيمة خصم صحيحة");
      if (form.type === "percentage" && value > 100)
        return setError("النسبة لا يمكن أن تتجاوز 100٪");
      if (form.appliesTo === "packages" && form.packageIds.length === 0)
        return setError("اختر باقة واحدة على الأقل");
      if (form.hasLimit && !(Number(form.usageLimit) >= 1))
        return setError("أدخل حداً صحيحاً لعدد مرات الاستخدام");
      if (
        form.hasEnd &&
        (!form.endsAt || new Date(form.endsAt) <= new Date(form.startsAt))
      ) {
        return setError("تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية");
      }

      const payload = {
        code,
        title: form.title.trim(),
        type: form.type,
        value,
        appliesTo: form.appliesTo,
        packageIds: form.appliesTo === "packages" ? form.packageIds : [],
        minPurchase: form.hasMin ? Number(form.minPurchase) || 0 : 0,
        usageLimit: form.hasLimit ? Number(form.usageLimit) : null,
        oncePerCustomer: form.oncePerCustomer,
        startsAt: form.startsAt
          ? new Date(form.startsAt).toISOString()
          : new Date().toISOString(),
        endsAt:
          form.hasEnd && form.endsAt
            ? new Date(form.endsAt).toISOString()
            : null,
        status: form.status,
      };

      setSaving(true);
      setError("");
      try {
        await onSave(discount?._id, payload);
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حفظ الكود. يرجى المحاولة مرة أخرى."));
        setSaving(false);
      }
    };

    const handleDelete = async () => {
      if (
        !window.confirm(
          `حذف الكود "${discount.code}"؟ لن يتمكن العملاء من استخدامه بعد الآن.`,
        )
      )
        return;
      setDeleting(true);
      try {
        await onDelete(discount._id);
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حذف الكود."));
        setDeleting(false);
      }
    };

    // What the code will be once saved (for the summary badge)
    const previewState =
      DISCOUNT_STATES[
        discountStateOf({
          status: form.status,
          startsAt: form.startsAt,
          endsAt: form.hasEnd ? form.endsAt : null,
          usageLimit: form.hasLimit ? Number(form.usageLimit) : null,
          usedCount: discount?.usedCount ?? 0,
        })
      ];

    const summary = [
      value > 0 &&
        `خصم ${form.type === "percentage" ? `${value}٪` : formatSAR(value)} على ${appliesLabel(
          { appliesTo: form.appliesTo, packageIds: form.packageIds },
          packagesById,
        )}`,
      form.hasMin && Number(form.minPurchase) > 0
        ? `حد أدنى للشراء ${formatSAR(form.minPurchase)}`
        : "بدون حد أدنى للشراء",
      form.hasLimit && Number(form.usageLimit) >= 1
        ? `يُستخدم ${Number(form.usageLimit).toLocaleString("ar-SA")} مرة كحد أقصى`
        : "عدد استخدامات غير محدود",
      form.oncePerCustomer && "مرة واحدة لكل عميل",
      form.startsAt && `يبدأ ${fmtDateTime(form.startsAt)}`,
      form.hasEnd && form.endsAt
        ? `ينتهي ${fmtDateTime(form.endsAt)}`
        : "بدون تاريخ انتهاء",
    ].filter(Boolean);

    return (
      <S.Page $max="1100px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع إلى الخصومات"
              onClick={onBack}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle>{isNew ? "إنشاء كود خصم" : discount.code}</S.PageTitle>
          </S.Row>
          <S.Row>
            <S.Button type="button" onClick={onBack}>
              إلغاء
            </S.Button>
            <S.Button
              type="button"
              $variant="primary"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </S.Button>
          </S.Row>
        </S.Row>

        {error && <S.Alert>{error}</S.Alert>}

        <S.EditorGrid>
          {/* ---------- Main column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">كود الخصم</S.Heading>
                <S.LinkButton
                  type="button"
                  style={{ fontSize: "0.8125rem" }}
                  onClick={() =>
                    setForm((f) => ({ ...f, code: generateCode() }))
                  }
                >
                  توليد كود عشوائي
                </S.LinkButton>
              </S.Row>
              <S.Input
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    code: e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9_-]/g, ""),
                  }))
                }
                placeholder="مثال: SAVE15"
                maxLength={30}
                style={{
                  direction: "ltr",
                  textAlign: "right",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              />
              <S.Text $muted $size="0.75rem">
                يكتبه العميل عند الدفع. حروف إنجليزية وأرقام فقط، ولا يهم حجم
                الأحرف.
              </S.Text>
              <S.Field>
                <S.FieldLabel $small>
                  ملاحظة داخلية (لا تظهر للعميل)
                </S.FieldLabel>
                <S.Input
                  value={form.title}
                  onChange={bind(setForm, "title")}
                  placeholder="مثال: حملة اليوم الوطني"
                />
              </S.Field>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">قيمة الخصم</S.Heading>
              <S.Segmented role="tablist">
                {[
                  ["percentage", "نسبة مئوية"],
                  ["fixed", "مبلغ ثابت"],
                ].map(([id, label]) => (
                  <S.SegmentButton
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={form.type === id}
                    $active={form.type === id}
                    onClick={() => setForm((f) => ({ ...f, type: id }))}
                  >
                    {label}
                  </S.SegmentButton>
                ))}
              </S.Segmented>
              <S.AffixField style={{ maxWidth: "14rem" }}>
                <S.Input
                  type="number"
                  min="0"
                  max={form.type === "percentage" ? 100 : undefined}
                  step="0.01"
                  value={form.value}
                  onChange={bind(setForm, "value")}
                  placeholder="0"
                />
                <span>{form.type === "percentage" ? "٪" : "ر.س"}</span>
              </S.AffixField>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">ينطبق على</S.Heading>
              <S.RadioRow>
                <input
                  type="radio"
                  name="applies"
                  checked={form.appliesTo === "all"}
                  onChange={() => setForm((f) => ({ ...f, appliesTo: "all" }))}
                />
                كل الباقات
              </S.RadioRow>
              <S.RadioRow>
                <input
                  type="radio"
                  name="applies"
                  checked={form.appliesTo === "packages"}
                  onChange={() =>
                    setForm((f) => ({ ...f, appliesTo: "packages" }))
                  }
                />
                باقات محددة
              </S.RadioRow>
              {form.appliesTo === "packages" && (
                <S.SubCard>
                  {packages.length === 0 ? (
                    <S.Text $muted $size="0.8125rem">
                      لا توجد منتجات بعد. أضفها من صفحة المنتجات أولاً.
                    </S.Text>
                  ) : (
                    packages.map((p) => (
                      <S.Check key={p._id}>
                        <input
                          type="checkbox"
                          checked={form.packageIds.includes(String(p._id))}
                          onChange={() => togglePackage(String(p._id))}
                        />
                        <ProductThumb src={p.images?.[0]} size={28} />
                        <span style={{ flex: 1 }}>{p.name}</span>
                        <S.Text as="span" $muted $size="0.8125rem">
                          {formatSAR(p.price)}
                        </S.Text>
                      </S.Check>
                    ))
                  )}
                </S.SubCard>
              )}
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الحد الأدنى للشراء</S.Heading>
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.hasMin}
                  onChange={bind(setForm, "hasMin")}
                />
                يتطلب حداً أدنى لسعر الباقة (قبل الضريبة)
              </S.Check>
              {form.hasMin && (
                <S.AffixField style={{ maxWidth: "14rem" }}>
                  <S.Input
                    type="number"
                    min="0"
                    value={form.minPurchase}
                    onChange={bind(setForm, "minPurchase")}
                    placeholder="0"
                  />
                  <span>ر.س</span>
                </S.AffixField>
              )}
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">حدود الاستخدام</S.Heading>
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.hasLimit}
                  onChange={bind(setForm, "hasLimit")}
                />
                تحديد عدد مرات استخدام الكود إجمالاً
              </S.Check>
              {form.hasLimit && (
                <S.Input
                  type="number"
                  min="1"
                  value={form.usageLimit}
                  onChange={bind(setForm, "usageLimit")}
                  placeholder="مثال: 100"
                  style={{ maxWidth: "14rem" }}
                />
              )}
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.oncePerCustomer}
                  onChange={bind(setForm, "oncePerCustomer")}
                />
                مرة واحدة فقط لكل عميل (حسب الجوال أو البريد)
              </S.Check>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">مدة الصلاحية</S.Heading>
              <S.FormGrid>
                <S.Field>
                  <S.FieldLabel $small>يبدأ في</S.FieldLabel>
                  <S.Input
                    type="datetime-local"
                    value={form.startsAt}
                    onChange={bind(setForm, "startsAt")}
                  />
                </S.Field>
                {form.hasEnd && (
                  <S.Field>
                    <S.FieldLabel $small>ينتهي في</S.FieldLabel>
                    <S.Input
                      type="datetime-local"
                      value={form.endsAt}
                      onChange={bind(setForm, "endsAt")}
                    />
                  </S.Field>
                )}
              </S.FormGrid>
              <S.Check>
                <input
                  type="checkbox"
                  checked={form.hasEnd}
                  onChange={bind(setForm, "hasEnd")}
                />
                تحديد تاريخ انتهاء
              </S.Check>
            </S.Card>
          </S.Stack>

          {/* ---------- Side column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">الملخص</S.Heading>
                <S.StatusBadge $tone={previewState.tone}>
                  {previewState.label}
                </S.StatusBadge>
              </S.Row>
              <S.CodeTag>{code || "—"}</S.CodeTag>
              <S.SummaryList>
                {summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </S.SummaryList>
              {example && (
                <S.InfoBox $accent>
                  مثال: {example.name} {formatSAR(example.subtotal)} ←{" "}
                  {formatSAR(example.after)}
                  <S.Text $muted $size="0.75rem" style={{ fontWeight: 400 }}>
                    يدفع العميل {formatSAR(example.total)} شامل الضريبة 15٪
                  </S.Text>
                </S.InfoBox>
              )}
              {!isNew && (
                <S.Text $muted $size="0.8125rem">
                  استُخدم {(discount.usedCount || 0).toLocaleString("ar-SA")}{" "}
                  مرة
                  {discount.usageLimit
                    ? ` من ${discount.usageLimit.toLocaleString("ar-SA")}`
                    : ""}
                </S.Text>
              )}
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الحالة</S.Heading>
              <S.Select value={form.status} onChange={bind(setForm, "status")}>
                <option value="active">مفعّل</option>
                <option value="disabled">معطل</option>
              </S.Select>
              <S.Text $muted $size="0.75rem">
                عطّل الكود لإيقافه فوراً دون حذفه.
              </S.Text>
            </S.Card>
          </S.Stack>
        </S.EditorGrid>

        {!isNew && (
          <S.Row style={{ justifyContent: "flex-end" }}>
            <S.Button
              type="button"
              $variant="danger"
              disabled={deleting}
              onClick={handleDelete}
            >
              <Trash2 size={15} />
              {deleting ? "جارٍ الحذف..." : "حذف الكود"}
            </S.Button>
          </S.Row>
        )}
      </S.Page>
    );
  },
);

/* ---------- List ---------- */

const DiscountsTab = memo(({ accessToken, onAuthError }) => {
  const dc = useDiscounts(accessToken, onAuthError);
  const pk = usePackages(accessToken, onAuthError);
  const [editing, setEditing] = useState(null); // null | "new" | discount id
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const packagesById = useMemo(
    () => Object.fromEntries(pk.items.map((p) => [String(p._id), p])),
    [pk.items],
  );

  const rows = useMemo(() => {
    const test = DISCOUNT_VIEWS.find((v) => v.id === view).test;
    const q = normalizeAr(query);
    return dc.items.filter(
      (d) => test(d) && (!q || normalizeAr(`${d.code} ${d.title}`).includes(q)),
    );
  }, [dc.items, view, query]);

  const stats = useMemo(
    () => ({
      active: dc.items.filter((d) => discountStateOf(d) === "active").length,
      scheduled: dc.items.filter((d) => discountStateOf(d) === "scheduled")
        .length,
      uses: dc.items.reduce((n, d) => n + (d.usedCount || 0), 0),
    }),
    [dc.items],
  );

  const copyCode = async (d) => {
    try {
      await navigator.clipboard.writeText(d.code);
      setCopiedId(d._id);
      setTimeout(() => setCopiedId((id) => (id === d._id ? null : id)), 1500);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  const toggleStatus = async (d) => {
    setBusyId(d._id);
    try {
      await dc.save(d._id, {
        status: d.status === "disabled" ? "active" : "disabled",
      });
    } catch (err) {
      alert(apiMessage(err, "تعذّر تحديث الكود"));
    } finally {
      setBusyId(null);
    }
  };

  if (editing) {
    const discount =
      editing === "new" ? null : dc.items.find((d) => d._id === editing);
    return (
      <DiscountEditor
        key={editing}
        discount={discount}
        packages={pk.items}
        onBack={() => setEditing(null)}
        onSave={dc.save}
        onDelete={dc.remove}
      />
    );
  }

  return (
    <S.Page>
      <PageHeader icon={discountsIcon} title="الخصومات">
        <S.Button
          type="button"
          $icon
          aria-label="تحديث"
          disabled={dc.loading}
          onClick={dc.reload}
        >
          <RefreshCw size={15} />
        </S.Button>
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => setEditing("new")}
        >
          <Plus size={15} />
          إنشاء كود خصم
        </S.Button>
      </PageHeader>

      {dc.loading || dc.error ? (
        <NeedProducts
          loading={dc.loading}
          error={dc.error}
          onRetry={dc.reload}
        />
      ) : dc.items.length === 0 ? (
        <S.EmptyState>
          <S.Illustration src={discountImage} alt="" $w="200px" />
          <S.Heading $size="1.125rem">إدارة أكواد الخصم</S.Heading>
          <S.Text $muted>
            أنشئ أكواد خصم بنسبة مئوية أو مبلغ ثابت، لكل الباقات أو لباقات
            محددة، مع حد للاستخدام وتاريخ انتهاء.
          </S.Text>
          <S.Button
            type="button"
            $variant="primary"
            onClick={() => setEditing("new")}
          >
            <Plus size={15} />
            إنشاء كود خصم
          </S.Button>
        </S.EmptyState>
      ) : (
        <>
          <S.Grid $cols={3}>
            <StatCard
              label="أكواد نشطة"
              value={stats.active.toLocaleString("ar-SA")}
            />
            <StatCard
              label="أكواد مجدولة"
              value={stats.scheduled.toLocaleString("ar-SA")}
            />
            <StatCard
              label="إجمالي الاستخدامات"
              value={stats.uses.toLocaleString("ar-SA")}
            />
          </S.Grid>

          <S.Card $flush $overflow>
            <S.ViewTabs role="tablist">
              {DISCOUNT_VIEWS.map((v) => (
                <S.ViewTab
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={view === v.id}
                  $active={view === v.id}
                  onClick={() => setView(v.id)}
                >
                  {v.label}
                  <S.MenuCount>{dc.items.filter(v.test).length}</S.MenuCount>
                </S.ViewTab>
              ))}
            </S.ViewTabs>

            <S.FilterBar>
              <S.SearchField style={{ maxWidth: "20rem" }}>
                <Search size={15} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث بالكود أو الملاحظة"
                />
              </S.SearchField>
            </S.FilterBar>

            <S.TableScroll $minH="300px">
              <S.GridTable $columns={DISCOUNT_GRID} $minWidth="860px">
                <S.Th>الكود</S.Th>
                <S.Th>الخصم</S.Th>
                <S.Th $align="center">الاستخدام</S.Th>
                <S.Th $align="center">الحالة</S.Th>
                <S.Th>الصلاحية</S.Th>

                {rows.length === 0 ? (
                  <S.TableMessage>لا توجد أكواد في هذا العرض.</S.TableMessage>
                ) : (
                  rows.map((d) => {
                    const st = DISCOUNT_STATES[discountStateOf(d)];
                    return (
                      <S.Tr key={d._id} onClick={() => setEditing(d._id)}>
                        <S.Td>
                          <S.Row $gap="0.5rem" style={{ minWidth: 0 }}>
                            <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                              <S.CodeTag $inline>{d.code}</S.CodeTag>
                              {d.title && (
                                <S.Ellipsis
                                  style={{
                                    fontSize: "0.75rem",
                                    color: T.textMuted,
                                  }}
                                >
                                  {d.title}
                                </S.Ellipsis>
                              )}
                            </S.Stack>
                            <S.Button
                              type="button"
                              $variant="ghost"
                              $size="sm"
                              $icon
                              aria-label="نسخ الكود"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyCode(d);
                              }}
                            >
                              {copiedId === d._id ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </S.Button>
                          </S.Row>
                        </S.Td>
                        <S.Td>
                          <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                            <strong>{discountValueLabel(d)}</strong>
                            <S.Ellipsis
                              style={{
                                fontSize: "0.75rem",
                                color: T.textMuted,
                              }}
                            >
                              {appliesLabel(d, packagesById)}
                              {d.minPurchase
                                ? ` · حد أدنى ${formatSAR(d.minPurchase)}`
                                : ""}
                            </S.Ellipsis>
                          </S.Stack>
                        </S.Td>
                        <S.Td $align="center">
                          {(d.usedCount || 0).toLocaleString("ar-SA")}
                          {d.usageLimit
                            ? ` / ${d.usageLimit.toLocaleString("ar-SA")}`
                            : ""}
                        </S.Td>
                        <S.Td
                          $align="center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <S.StatusBadge
                            as="button"
                            type="button"
                            $tone={st.tone}
                            disabled={busyId === d._id}
                            title={
                              d.status === "disabled"
                                ? "اضغط للتفعيل"
                                : "اضغط للتعطيل"
                            }
                            onClick={() => toggleStatus(d)}
                            style={{
                              border: "none",
                              cursor: "pointer",
                              font: "inherit",
                              fontSize: "0.75rem",
                            }}
                          >
                            {st.label}
                          </S.StatusBadge>
                        </S.Td>
                        <S.Td>
                          <S.Stack
                            $gap="0.125rem"
                            style={{ fontSize: "0.8125rem" }}
                          >
                            <span>من {fmtDateTime(d.startsAt)}</span>
                            <S.Text as="span" $muted $size="0.75rem">
                              {d.endsAt
                                ? `إلى ${fmtDateTime(d.endsAt)}`
                                : "بدون تاريخ انتهاء"}
                            </S.Text>
                          </S.Stack>
                        </S.Td>
                      </S.Tr>
                    );
                  })
                )}
              </S.GridTable>
            </S.TableScroll>

            <S.TableFooter>
              <span>
                {rows.length.toLocaleString("ar-SA")} من{" "}
                {dc.items.length.toLocaleString("ar-SA")} كود · اضغط على الحالة
                للتفعيل أو التعطيل
              </span>
            </S.TableFooter>
          </S.Card>
        </>
      )}
    </S.Page>
  );
});

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
  const location = useLocation();
  const startNewProduct =
    new URLSearchParams(location.search).get("new") === "1";
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

  const openNewProduct = useCallback(() => {
    dispatch(setActiveTab("المنتجات"));
    navigate(`/control?tab=${encodeURIComponent("المنتجات")}&new=1`);
  }, [dispatch, navigate]);

  const closeNewProduct = useCallback(
    () =>
      navigate(`/control?tab=${encodeURIComponent("المنتجات")}`, {
        replace: true,
      }),
    [navigate],
  );

  const handleHeroAction = useCallback(
    ({ type, value }) => {
      if (type === "newProduct") return openNewProduct();
      return type === "page" ? goToTab(value) : goTo(value);
    },
    [goTo, goToTab, openNewProduct],
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
    if (activeTab === "الخصومات") {
      return (
        <DiscountsTab accessToken={accessToken} onAuthError={handleAuthError} />
      );
    }
    if (activeTab === "المنتجات") {
      return (
        <ProductsTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          startNew={startNewProduct}
          onCloseNew={closeNewProduct}
        />
      );
    }
    if (activeTab === "المجموعة") {
      return (
        <CollectionsTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          onGoProducts={() => goToTab("المنتجات")}
        />
      );
    }
    if (activeTab === "المخزون") {
      return (
        <InventoryTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          onGoProducts={() => goToTab("المنتجات")}
        />
      );
    }
    if (activeTab === "العملاء") {
      return (
        <CustomersTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          onNavigate={goTo}
        />
      );
    }
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
