import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  ArrowUpDown,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Flame,
  Globe,
  History,
  LayoutGrid,
  Link,
  LogOut,
  Mail,
  Monitor,
  Package,
  Pencil,
  Plus,
  Printer,
  Quote,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  Tablet,
  Trash2,
  Upload,
  X,
  Zap,
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
import HealthBookletPrint from "./HealthBookletPrint";

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

const LearnMore = memo(({ topic }) => (
  <S.Text $muted $center $size="0.8125rem">
    اعرف المزيد عن <S.LinkButton type="button">{topic}</S.LinkButton>
  </S.Text>
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

// Blocks the dashboard until the user logs out; there is no way to close it otherwise
const TimeoutModal = memo(({ open, onLogin }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    if (open) buttonRef.current?.focus();
  }, [open]);

  return open ? (
    <S.Overlay>
      <S.ModalBox
        $center
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-expired-title"
        onKeyDown={(e) => e.key === "Tab" && e.preventDefault()}
      >
        <S.IconBubble style={{ margin: "0 auto" }}>
          <Clock size={20} />
        </S.IconBubble>
        <S.Heading id="session-expired-title" $size="1.125rem">
          انتهت صلاحية الجلسة
        </S.Heading>
        <S.Text $muted>
          لحماية حسابك، انتهت صلاحية تسجيل الدخول. سجّل الخروج ثم ادخل من جديد
          للمتابعة.
        </S.Text>
        <S.Button
          ref={buttonRef}
          type="button"
          $variant="primary"
          $size="lg"
          onClick={onLogin}
        >
          <LogOut size={16} />
          تسجيل الخروج
        </S.Button>
      </S.ModalBox>
    </S.Overlay>
  ) : null;
});

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

/* ---------- Session (login token) ---------- */

// amanapi answers 401 when the token is missing and 403 when it is expired or invalid.
// A 403 for a real permission problem ("not allowed") is not treated as an expired session.
const SESSION_MSG_RE = /token|jwt|expired|authenticat|not valid|التوكن|الجلسة/i;
const LOGIN_PATH = "/login";

const isAuthFailure = (err) => {
  const status = err?.response?.status;
  if (status === 401) return true;
  if (status !== 403) return false;
  const d = err.response.data;
  const msg = typeof d === "string" ? d : d?.message || d?.error || "";
  return !msg || SESSION_MSG_RE.test(msg);
};

// Expiry time (ms) written inside the JWT, or null if the token has none
const tokenExpiresAt = (token) => {
  try {
    const part = String(token)
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(part)
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    );
    const { exp } = JSON.parse(json);
    return exp ? exp * 1000 : null;
  } catch {
    return null;
  }
};

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

        // The login token comes from amanapi (/bus_auth/login): an expired session there
        // shows the "session expired" popup.
        const quotaStatus = quotaRes.reason?.response?.status;
        const waitlistStatus = waitlistRes.reason?.response?.status;
        if (isAuthFailure(waitlistRes.reason) || quotaStatus === 401)
          onAuthError();

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
        if (isAuthFailure(err)) onAuthError();
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
        if (isAuthFailure(err)) onAuthError();
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
        if (isAuthFailure(err)) onAuthError();
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
        if (isAuthFailure(err)) onAuthError();
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
        if (isAuthFailure(err)) onAuthError();
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
   Shared: data hook, date range, chart, bars  (analytics + marketing)
   ============================================================ */

const RANGE_PRESETS = [
  { days: 7, label: "7 أيام" },
  { days: 30, label: "30 يوماً" },
  { days: 90, label: "90 يوماً" },
];

const SOURCE_LABELS = {
  direct: "مباشر",
  instagram: "انستقرام",
  snapchat: "سناب شات",
  tiktok: "تيك توك",
  x: "إكس (تويتر)",
  google: "قوقل",
  facebook: "فيسبوك",
  whatsapp: "واتساب",
  linkedin: "لينكدإن",
  youtube: "يوتيوب",
  bing: "بينق",
  email: "البريد الإلكتروني",
  sms: "رسائل SMS",
  influencer: "مشاهير",
  other: "أخرى",
};
const sourceLabel = (s) => SOURCE_LABELS[s] || s || "مباشر";

// Quiz question order = ANSWER_LABELS order
const QUIZ_STEPS = Object.keys(ANSWER_LABELS);
const questionLabel = (step) =>
  ANSWER_LABELS[QUIZ_STEPS[step]] || `السؤال ${Number(step) + 1}`;

const pct = (r) =>
  r === null || r === undefined || Number.isNaN(r)
    ? "—"
    : `${(r * 100).toLocaleString("ar-SA", { maximumFractionDigits: 1 })}٪`;
const num = (n) => Number(n || 0).toLocaleString("ar-SA");

const timeAgo = (d) => {
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "الآن";
  if (s < 3600) return `منذ ${Math.floor(s / 60)} د`;
  return `منذ ${Math.floor(s / 3600)} س`;
};

// GET with loading/error, optional silent polling while the tab is visible
const useAdminGet = (accessToken, onAuthError, path, { pollMs = 0 } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!accessToken || !path) {
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    const load = async (silent) => {
      if (!silent) setLoading(true);
      try {
        const { data: d } = await userRequest.get(path, {
          signal: controller.signal,
        });
        setData(d);
        setError("");
      } catch (err) {
        if (axios.isCancel(err)) return;
        const status = err.response?.status;
        if (isAuthFailure(err)) onAuthError();
        if (!silent) {
          setError(
            status === 404
              ? `المسار غير موجود على الخادم بعد (/api${path.split("?")[0]})`
              : amanapiError(status, "تعذّر جلب البيانات"),
          );
        }
      } finally {
        if (!silent && !controller.signal.aborted) setLoading(false);
      }
    };
    load(false);
    const timer = pollMs
      ? setInterval(
          () => document.visibilityState === "visible" && load(true),
          pollMs,
        )
      : null;
    return () => {
      controller.abort();
      if (timer) clearInterval(timer);
    };
  }, [accessToken, onAuthError, path, pollMs, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);
  return { data, setData, loading, error, reload };
};

// Wraps a write call so an expired session shows the login popup
const callApi = async (fn, onAuthError) => {
  try {
    return await fn();
  } catch (err) {
    if (isAuthFailure(err)) onAuthError();
    throw err;
  }
};

const RangePicker = memo(({ days, onChange }) => (
  <S.Segmented role="tablist">
    {RANGE_PRESETS.map((r) => (
      <S.SegmentButton
        key={r.days}
        type="button"
        role="tab"
        aria-selected={days === r.days}
        $active={days === r.days}
        onClick={() => onChange(r.days)}
      >
        {r.label}
      </S.SegmentButton>
    ))}
  </S.Segmented>
));

const LoadState = ({ loading, error, onRetry, children }) =>
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
    children
  );

// Daily bars (sign-ups) + line (visitors). Time runs left → right.
const TrendChart = memo(({ daily }) => {
  const W = 720;
  const H = 220;
  const pad = { t: 14, r: 12, b: 26, l: 34 };
  const n = Math.max(daily.length, 1);
  const peak = Math.max(
    1,
    ...daily.map((d) => Math.max(d.signups, d.visitors)),
  );
  const step = 10 ** Math.floor(Math.log10(peak));
  const top = Math.ceil(peak / step) * step;
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const bw = iw / n;
  const x = (i) => pad.l + i * bw + bw / 2;
  const y = (v) => pad.t + ih - (v / top) * ih;
  const labelEvery = Math.ceil(n / 8);
  const line = daily
    .map(
      (d, i) =>
        `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.visitors).toFixed(1)}`,
    )
    .join(" ");

  return (
    <S.ChartBox>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="التسجيلات والزوار يومياً"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={y(top * f)}
              y2={y(top * f)}
              className="grid"
            />
            <text
              x={pad.l - 6}
              y={y(top * f) + 4}
              textAnchor="end"
              className="axis"
            >
              {Math.round(top * f)}
            </text>
          </g>
        ))}
        {daily.map((d, i) => (
          <g key={d.date}>
            <rect
              x={x(i) - bw * 0.3}
              y={y(d.signups)}
              width={Math.max(bw * 0.6, 1)}
              height={Math.max(pad.t + ih - y(d.signups), 0)}
              rx="2"
              className="bar"
            >
              <title>{`${d.date}: ${d.signups} تسجيل · ${d.visitors} زائر`}</title>
            </rect>
            {i % labelEvery === 0 && (
              <text x={x(i)} y={H - 8} textAnchor="middle" className="axis">
                {d.date.slice(8)}/{d.date.slice(5, 7)}
              </text>
            )}
          </g>
        ))}
        {daily.length > 1 && <path d={line} className="line" />}
      </svg>
      <S.Legend>
        <S.LegendItem $color={T.primary}>التسجيلات</S.LegendItem>
        <S.LegendItem $color={T.primarySoft} $dashed>
          الزوار
        </S.LegendItem>
      </S.Legend>
    </S.ChartBox>
  );
});

const BarList = memo(({ rows, empty = "لا توجد بيانات بعد", format = num }) => {
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (!rows.length) {
    return (
      <S.Text $muted $size="0.8125rem">
        {empty}
      </S.Text>
    );
  }
  return (
    <S.Stack $gap="0.5rem">
      {rows.map((r) => (
        <S.BarRow key={r.label} title={`${r.label}: ${r.count}`}>
          <span>{r.label}</span>
          <S.BarTrack>
            <S.BarFill style={{ width: `${(r.count / max) * 100}%` }} />
          </S.BarTrack>
          <strong>{format(r.count)}</strong>
        </S.BarRow>
      ))}
    </S.Stack>
  );
});

const FunnelView = memo(({ funnel }) => {
  const first = funnel[0]?.count || 0;
  return (
    <S.Stack $gap="0.625rem">
      {funnel.map((f, i) => {
        const prev = i ? funnel[i - 1].count : null;
        return (
          <S.Stack key={f.step} $gap="0.25rem">
            <S.Row $between>
              <S.Text $size="0.8125rem" style={{ fontWeight: 600 }}>
                {f.label}
              </S.Text>
              <S.Text $size="0.8125rem">
                <strong>{num(f.count)}</strong>{" "}
                <S.Text as="span" $muted $size="0.75rem">
                  {first ? pct(f.count / first) : ""}
                </S.Text>
              </S.Text>
            </S.Row>
            <S.BarTrack $tall>
              <S.BarFill
                style={{ width: `${first ? (f.count / first) * 100 : 0}%` }}
              />
            </S.BarTrack>
            {prev !== null && prev > 0 && prev > f.count && (
              <S.Text $muted $size="0.75rem">
                خرج {num(prev - f.count)} ({pct((prev - f.count) / prev)}) قبل
                هذه الخطوة
              </S.Text>
            )}
          </S.Stack>
        );
      })}
    </S.Stack>
  );
});

/* ============================================================
   Tab: التحليلات  (overview)
   ============================================================ */

const AnalyticsTab = memo(({ accessToken, onAuthError }) => {
  const [days, setDays] = useState(30);
  const { data, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    `/analytics/overview?days=${days}`,
  );
  const t = data?.totals;

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="التحليلات">
        <RangePicker days={days} onChange={setDays} />
        <S.Button type="button" $icon aria-label="تحديث" onClick={reload}>
          <RefreshCw size={15} />
        </S.Button>
      </PageHeader>

      <LoadState loading={loading && !data} error={error} onRetry={reload}>
        {data && (
          <>
            {t.visitors === 0 && (
              <S.Notice>
                <Activity size={16} style={{ color: T.textMuted }} />
                <span>
                  بيانات الزيارات ومسار الاستبيان تبدأ من لحظة نشر نسخة صفحة
                  قائمة الانتظار التي تحتوي على التتبع. التسجيلات تظهر من كل
                  البيانات السابقة.
                </span>
              </S.Notice>
            )}

            <S.Grid $cols={4}>
              <StatCard
                label="الزوار"
                value={num(t.visitors)}
                hint={`خلال آخر ${num(days)} يوماً`}
              />
              <StatCard label="التسجيلات" value={num(t.signups)} />
              <StatCard
                label="معدل التحويل"
                value={pct(t.conversionRate)}
                hint="من زار الصفحة ← انضم للقائمة"
              />
              <StatCard
                label="أكملوا الاستبيان"
                value={num(t.quizCompletes)}
                hint={
                  t.quizStarts
                    ? `${pct(t.quizCompletes / t.quizStarts)} ممن بدأوه`
                    : ""
                }
              />
            </S.Grid>

            <S.Card $padding="1.25rem">
              <S.CardLabel>التسجيلات والزوار يومياً</S.CardLabel>
              <TrendChart daily={data.daily} />
            </S.Card>

            <S.Grid $cols={2}>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>مسار الاستبيان</S.CardLabel>
                <FunnelView funnel={data.funnel} />
              </S.Card>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>أكثر المصادر جلباً للتسجيلات</S.CardLabel>
                <BarList
                  rows={data.sources
                    .slice(0, 6)
                    .map((s) => ({
                      label: sourceLabel(s.source),
                      count: s.joins,
                    }))}
                  empty="لم تُسجَّل مصادر بعد"
                />
              </S.Card>
            </S.Grid>

            <S.Grid $cols={3}>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>حسب الباقة</S.CardLabel>
                <BarList rows={data.byPackage} />
              </S.Card>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>حسب المدينة</S.CardLabel>
                <BarList rows={data.byCity.slice(0, 8)} />
              </S.Card>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>حسب الجنس</S.CardLabel>
                <BarList rows={data.byGender} />
              </S.Card>
            </S.Grid>
          </>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Tab: الربورت  (reports + CSV)
   ============================================================ */

const REPORTS = [
  {
    id: "funnel",
    label: "مسار الاستبيان",
    columns: [
      "الخطوة",
      "عدد الزوار",
      "من إجمالي الزوار",
      "التسرب من الخطوة السابقة",
    ],
    rows: (d) => {
      const visitors = d.totals.visitors;
      const steps = [
        { label: "زاروا الصفحة", count: d.funnel[0].count },
        { label: "بدأوا الاستبيان", count: d.funnel[1].count },
        ...d.questions.map((q) => ({
          label: `أجابوا: ${questionLabel(q.step)}`,
          count: q.count,
        })),
        { label: "أكملوا الاستبيان", count: d.funnel[2].count },
        { label: "انضموا لقائمة الانتظار", count: d.funnel[3].count },
      ];
      return steps.map((s, i) => {
        const prev = i ? steps[i - 1].count : null;
        return [
          s.label,
          num(s.count),
          visitors ? pct(s.count / visitors) : "—",
          prev ? pct(Math.max(prev - s.count, 0) / prev) : "—",
        ];
      });
    },
  },
  {
    id: "sources",
    label: "مصادر الزيارات",
    columns: ["المصدر", "الزوار", "التسجيلات", "معدل التحويل"],
    rows: (d) =>
      d.sources.map((s) => [
        sourceLabel(s.source),
        num(s.visitors),
        num(s.joins),
        pct(s.rate),
      ]),
  },
  {
    id: "daily",
    label: "يومياً",
    columns: ["التاريخ", "الزوار", "التسجيلات"],
    rows: (d) =>
      [...d.daily]
        .reverse()
        .map((r) => [r.date, num(r.visitors), num(r.signups)]),
  },
  {
    id: "package",
    label: "حسب الباقة",
    columns: ["الباقة", "التسجيلات", "النسبة"],
    rows: (d) =>
      d.byPackage.map((r) => [
        r.label,
        num(r.count),
        pct(r.count / (d.totals.signups || 1)),
      ]),
  },
  {
    id: "city",
    label: "حسب المدينة",
    columns: ["المدينة", "التسجيلات", "النسبة"],
    rows: (d) =>
      d.byCity.map((r) => [
        r.label,
        num(r.count),
        pct(r.count / (d.totals.signups || 1)),
      ]),
  },
  {
    id: "gender",
    label: "حسب الجنس",
    columns: ["الجنس", "التسجيلات", "النسبة"],
    rows: (d) =>
      d.byGender.map((r) => [
        r.label,
        num(r.count),
        pct(r.count / (d.totals.signups || 1)),
      ]),
  },
];

const ReportsTab = memo(({ accessToken, onAuthError }) => {
  const [reportId, setReportId] = useState("funnel");
  const [days, setDays] = useState(30);
  const [custom, setCustom] = useState({ from: "", to: "" });
  const useCustom = custom.from && custom.to && custom.to >= custom.from;
  const path = useCustom
    ? `/analytics/overview?from=${custom.from}&to=${custom.to}`
    : `/analytics/overview?days=${days}`;
  const { data, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    path,
  );

  const report = REPORTS.find((r) => r.id === reportId);
  const rows = data ? report.rows(data) : [];
  const rangeLabel = useCustom
    ? `${custom.from} → ${custom.to}`
    : `آخر ${days} يوماً`;

  const exportCsv = () => {
    const lines = [report.columns, ...rows].map((r) =>
      r.map(csvCell).join(","),
    );
    downloadFile(
      `﻿${lines.join("\r\n")}\r\n`,
      `report-${report.id}-${useCustom ? `${custom.from}_${custom.to}` : `${days}d`}.csv`,
      "text/csv;charset=utf-8",
    );
  };

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="الربورت">
        <S.Button type="button" disabled={!rows.length} onClick={exportCsv}>
          <Download size={15} />
          تصدير CSV
        </S.Button>
      </PageHeader>

      <S.Card $padding="1rem" $gap="0.75rem">
        <S.Row $between $wrap $gap="0.75rem">
          <RangePicker
            days={useCustom ? null : days}
            onChange={(d) => {
              setDays(d);
              setCustom({ from: "", to: "" });
            }}
          />
          <S.Row $gap="0.5rem" $wrap>
            <S.Text as="span" $muted $size="0.8125rem">
              أو من
            </S.Text>
            <S.Input
              type="date"
              value={custom.from}
              onChange={(e) =>
                setCustom((c) => ({ ...c, from: e.target.value }))
              }
              style={{ width: "auto", height: "2rem" }}
            />
            <S.Text as="span" $muted $size="0.8125rem">
              إلى
            </S.Text>
            <S.Input
              type="date"
              value={custom.to}
              min={custom.from || undefined}
              onChange={(e) => setCustom((c) => ({ ...c, to: e.target.value }))}
              style={{ width: "auto", height: "2rem" }}
            />
          </S.Row>
        </S.Row>
      </S.Card>

      <S.Card $flush $overflow>
        <S.ViewTabs role="tablist">
          {REPORTS.map((r) => (
            <S.ViewTab
              key={r.id}
              type="button"
              role="tab"
              aria-selected={reportId === r.id}
              $active={reportId === r.id}
              onClick={() => setReportId(r.id)}
            >
              {r.label}
            </S.ViewTab>
          ))}
        </S.ViewTabs>
        <LoadState loading={loading && !data} error={error} onRetry={reload}>
          <S.TableScroll>
            <S.DataTable>
              <thead>
                <tr>
                  {report.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={report.columns.length}
                      style={{
                        textAlign: "center",
                        color: T.textMuted,
                        padding: "2.5rem",
                      }}
                    >
                      لا توجد بيانات في هذه الفترة
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <tr key={i}>
                      {r.map((cell, j) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <td
                          key={j}
                          style={j === 0 ? { fontWeight: 600 } : undefined}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </S.DataTable>
          </S.TableScroll>
          <S.TableFooter>
            <span>
              {report.label} · {rangeLabel}
            </span>
          </S.TableFooter>
        </LoadState>
      </S.Card>
    </S.Page>
  );
});

/* ============================================================
   Tab: لايف  (live view, refreshes every 15s)
   ============================================================ */

const EVENT_TEXT = {
  visit: () => "زار الصفحة",
  quiz_start: () => "بدأ الاستبيان",
  question: (e) =>
    `أجاب على: ${ANSWER_LABELS[e.stepId] || questionLabel(e.step)}`,
  quiz_complete: () => "أكمل الاستبيان",
  waitlist_join: () => "انضم لقائمة الانتظار",
};

const DeviceIcon = ({ device }) =>
  device === "mobile" ? (
    <Smartphone size={15} />
  ) : device === "tablet" ? (
    <Tablet size={15} />
  ) : (
    <Monitor size={15} />
  );

const LiveTab = memo(({ accessToken, onAuthError }) => {
  const { data, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    "/analytics/live",
    {
      pollMs: 15000,
    },
  );

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="لايف">
        <S.Row $gap="0.5rem">
          <S.LiveDot />
          <S.Text as="span" $muted $size="0.8125rem">
            {data
              ? `آخر تحديث ${new Date(data.at).toLocaleTimeString("ar-SA")}`
              : "يتحدث كل 15 ثانية"}
          </S.Text>
        </S.Row>
        <S.Button type="button" $icon aria-label="تحديث" onClick={reload}>
          <RefreshCw size={15} />
        </S.Button>
      </PageHeader>

      <LoadState loading={loading && !data} error={error} onRetry={reload}>
        {data && (
          <>
            <S.Grid $cols={4}>
              <S.Card $gap="0.375rem" $padding="1.25rem">
                <S.CardLabel>زوار الآن</S.CardLabel>
                <S.MetricValue $big style={{ fontSize: "2.25rem" }}>
                  {num(data.activeNow)}
                </S.MetricValue>
                <S.Text $muted $size="0.75rem">
                  نشطون خلال آخر 5 دقائق
                </S.Text>
              </S.Card>
              <StatCard
                label="داخل الاستبيان الآن"
                value={num(data.stages.inQuiz)}
              />
              <StatCard label="زوار اليوم" value={num(data.today.visitors)} />
              <StatCard label="تسجيلات اليوم" value={num(data.today.signups)} />
            </S.Grid>

            <S.Grid $cols={2}>
              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>أين هم الآن؟</S.CardLabel>
                <BarList
                  rows={[
                    { label: "يتصفحون الصفحة", count: data.stages.browsing },
                    { label: "داخل الاستبيان", count: data.stages.inQuiz },
                    { label: "أكملوا الاستبيان", count: data.stages.finished },
                    { label: "انضموا للتو", count: data.stages.joined },
                  ]}
                />
                {data.steps.length > 0 && (
                  <>
                    <S.CardLabel>عند أي سؤال</S.CardLabel>
                    <BarList
                      rows={[...data.steps]
                        .sort((a, b) => a.step - b.step)
                        .map((s) => ({
                          label: questionLabel(s.step),
                          count: s.count,
                        }))}
                    />
                  </>
                )}
              </S.Card>

              <S.Card $padding="1.25rem" $gap="1rem">
                <S.CardLabel>الأجهزة</S.CardLabel>
                <BarList
                  rows={[
                    { label: "جوال", count: data.devices.mobile },
                    { label: "كمبيوتر", count: data.devices.desktop },
                    { label: "تابلت", count: data.devices.tablet },
                  ]}
                />
              </S.Card>
            </S.Grid>

            <S.Card $padding="1.25rem" $gap="0.5rem">
              <S.CardLabel>آخر النشاطات (آخر ساعة)</S.CardLabel>
              {data.recent.length === 0 ? (
                <S.Text $muted $size="0.8125rem">
                  لا يوجد نشاط خلال الساعة الماضية.
                </S.Text>
              ) : (
                <S.Feed>
                  {data.recent.map((e) => (
                    <li
                      key={e._id}
                      data-join={e.type === "waitlist_join" || undefined}
                    >
                      <DeviceIcon device={e.device} />
                      <span>
                        زائر من <strong>{sourceLabel(e.source)}</strong>{" "}
                        {EVENT_TEXT[e.type]?.(e) || e.type}
                      </span>
                      <time>{timeAgo(e.createdAt)}</time>
                    </li>
                  ))}
                </S.Feed>
              )}
            </S.Card>
          </>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Marketing: shared email pieces (segment, content, test send)
   ============================================================ */

const EMPTY_SEGMENT = { packages: [], cities: [], statuses: [], genders: [] };
const MESSAGE_VARIABLES = [
  ["{{firstName}}", "الاسم الأول"],
  ["{{lastName}}", "اسم العائلة"],
  ["{{package}}", "الباقة"],
  ["{{city}}", "المدينة"],
];
const SAMPLE_PERSON = {
  firstName: "محمد",
  lastName: "العتيبي",
  package: "الشاملة",
  city: "الرياض",
};
const fillSample = (text) =>
  String(text || "").replace(
    /\{\{\s*(firstName|lastName|package|city)\s*\}\}/g,
    (_, k) => SAMPLE_PERSON[k],
  );

const segmentSummary = (seg) => {
  const parts = [];
  if (seg?.packages?.length) parts.push(`الباقة: ${seg.packages.join("، ")}`);
  if (seg?.cities?.length) parts.push(`المدينة: ${seg.cities.join("، ")}`);
  if (seg?.genders?.length) parts.push(`الجنس: ${seg.genders.join("، ")}`);
  if (seg?.statuses?.length) {
    parts.push(
      `الحالة: ${seg.statuses.map((s) => WAITLIST_STATUS[s]?.label || s).join("، ")}`,
    );
  }
  return parts.length ? parts.join(" · ") : "كل قائمة الانتظار";
};

// Options for the segment filters, from the real waitlist
const useSegmentOptions = (accessToken, onAuthError) => {
  const { entries } = useWaitlist(accessToken, onAuthError);
  return useMemo(() => {
    const real = (rows) => rows.filter((r) => r.value !== "—");
    return {
      packages: real(facetOf(entries, (r) => r.packageName)),
      cities: real(facetOf(entries, (r) => r.city)),
      genders: real(facetOf(entries, (r) => answerText(r, "sex"))),
      statuses: Object.entries(WAITLIST_STATUS).map(([value, s]) => ({
        value,
        label: s.label,
        count: entries.filter((e) => (e.status || "pending") === value).length,
      })),
    };
  }, [entries]);
};

const SegmentCard = memo(
  ({ segment, onChange, options, count, counting, note }) => (
    <S.Card $padding="1.25rem" $gap="0.75rem" style={{ overflow: "visible" }}>
      <S.Row $between>
        <S.Heading $size="0.9375rem">المستلمون</S.Heading>
        {count !== undefined && (
          <S.StatusBadge $tone={count ? "success" : "neutral"}>
            {counting ? "..." : `${num(count)} مستلم`}
          </S.StatusBadge>
        )}
      </S.Row>
      <S.Row $wrap $gap="0.5rem">
        <MultiFilter
          label="الباقة"
          options={options.packages}
          value={segment.packages}
          onChange={(v) => onChange({ ...segment, packages: v })}
        />
        <MultiFilter
          label="المدينة"
          options={options.cities}
          value={segment.cities}
          onChange={(v) => onChange({ ...segment, cities: v })}
        />
        <MultiFilter
          label="الجنس"
          options={options.genders}
          value={segment.genders}
          onChange={(v) => onChange({ ...segment, genders: v })}
        />
        <MultiFilter
          label="الحالة"
          options={options.statuses}
          value={segment.statuses}
          onChange={(v) => onChange({ ...segment, statuses: v })}
        />
      </S.Row>
      <S.Text $muted $size="0.75rem">
        {segmentSummary(segment)}
        {note ? ` · ${note}` : ""}
      </S.Text>
    </S.Card>
  ),
);

const EmailContentCard = memo(({ subject, body, onChange }) => {
  const bodyRef = useRef(null);
  const insert = (token) => {
    const el = bodyRef.current;
    if (!el) return onChange({ subject, body: body + token });
    const start = el.selectionStart ?? body.length;
    const end = el.selectionEnd ?? body.length;
    const next = body.slice(0, start) + token + body.slice(end);
    onChange({ subject, body: next });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
    return undefined;
  };

  return (
    <S.Card $padding="1.25rem" $gap="0.75rem">
      <S.Heading $size="0.9375rem">محتوى الرسالة</S.Heading>
      <S.Field>
        <S.FieldLabel $small>العنوان</S.FieldLabel>
        <S.Input
          value={subject}
          onChange={(e) => onChange({ subject: e.target.value, body })}
          placeholder="مثال: {{firstName}}، باقات الفحص السنوي متاحة الآن"
        />
      </S.Field>
      <S.Field>
        <S.FieldLabel $small>النص</S.FieldLabel>
        <S.Textarea
          ref={bodyRef}
          rows={8}
          value={body}
          onChange={(e) => onChange({ subject, body: e.target.value })}
          placeholder={
            "مرحباً {{firstName}}،\n\nاكتب رسالتك هنا. سطر فارغ = فقرة جديدة، والروابط تصبح قابلة للضغط."
          }
        />
      </S.Field>
      <S.Row $wrap $gap="0.375rem">
        <S.Text as="span" $muted $size="0.75rem">
          أدرج:
        </S.Text>
        {MESSAGE_VARIABLES.map(([token, label]) => (
          <S.VarChip key={token} type="button" onClick={() => insert(token)}>
            {label}
          </S.VarChip>
        ))}
      </S.Row>
      {(subject || body) && (
        <S.EmailPreview>
          <small>معاينة (ببيانات مثال)</small>
          <strong>{fillSample(subject) || "—"}</strong>
          <p>{fillSample(body)}</p>
          <footer>إلغاء الاشتراك</footer>
        </S.EmailPreview>
      )}
    </S.Card>
  );
});

const TestSend = memo(({ onSend, disabled }) => {
  const [to, setTo] = useState(() => {
    try {
      return localStorage.getItem("dashboard.testEmail") || "";
    } catch {
      return "";
    }
  });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const send = async () => {
    setBusy(true);
    setResult(null);
    try {
      localStorage.setItem("dashboard.testEmail", to);
    } catch {
      /* ignore */
    }
    try {
      const msg = await onSend(to.trim());
      setResult({ ok: true, text: msg });
    } catch (err) {
      setResult({ ok: false, text: apiMessage(err, "تعذّر الإرسال") });
    } finally {
      setBusy(false);
    }
  };

  return (
    <S.Card $padding="1.25rem" $gap="0.75rem">
      <S.Heading $size="0.9375rem">رسالة تجريبية</S.Heading>
      <S.Input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="your@email.com"
        style={{ direction: "ltr" }}
      />
      <S.Button
        type="button"
        disabled={disabled || busy || !to.includes("@")}
        onClick={send}
      >
        <Send size={14} />
        {busy ? "جارٍ الإرسال..." : "أرسل لي نسخة تجريبية"}
      </S.Button>
      {result && (
        <S.Text
          $size="0.8125rem"
          style={{ color: result.ok ? T.success : T.danger }}
        >
          {result.text}
        </S.Text>
      )}
    </S.Card>
  );
});

const EmailSetupNotice = ({ status }) =>
  status && !status.email ? (
    <S.Notice>
      <Mail size={16} style={{ color: T.warning }} />
      <span>
        إرسال البريد غير مفعّل بعد. أضف <strong>SES_FROM_EMAIL</strong> (بريد
        موثّق في Amazon SES) في إعدادات الخادم على Heroku. يمكنك تجهيز الرسائل
        والأتمتة الآن، وستبدأ بالعمل فور التفعيل.
      </span>
    </S.Notice>
  ) : null;

/* ============================================================
   Tab: التسويق  (overview + email broadcasts)
   ============================================================ */

const MESSAGE_STATES = {
  sending: { label: "جارٍ الإرسال", tone: "warning" },
  sent: { label: "أُرسلت", tone: "success" },
  failed: { label: "فشلت", tone: "danger" },
};

const BroadcastComposer = memo(
  ({
    accessToken,
    onAuthError,
    emailReady,
    initialContent,
    onBack,
    onSent,
  }) => {
    const options = useSegmentOptions(accessToken, onAuthError);
    const [segment, setSegment] = useState(EMPTY_SEGMENT);
    const [content, setContent] = useState(
      () => initialContent || { subject: "", body: "" },
    );
    const [audience, setAudience] = useState({
      count: undefined,
      counting: false,
    });
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    // Live recipient count (debounced)
    useEffect(() => {
      let cancelled = false;
      setAudience((a) => ({ ...a, counting: true }));
      const timer = setTimeout(async () => {
        try {
          const { data } = await userRequest.post("/broadcasts/audience", {
            segment,
          });
          if (!cancelled) setAudience({ count: data.count, counting: false });
        } catch {
          if (!cancelled) setAudience({ count: undefined, counting: false });
        }
      }, 350);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }, [segment]);

    const send = async () => {
      if (!content.subject.trim() || !content.body.trim())
        return setError("اكتب عنوان الرسالة ونصها");
      if (!audience.count) return setError("لا يوجد مستلمون في هذه الشريحة");
      if (
        !window.confirm(
          `إرسال الرسالة إلى ${audience.count} شخص؟ لا يمكن التراجع بعد الإرسال.`,
        )
      )
        return undefined;
      setSending(true);
      setError("");
      try {
        await callApi(
          () => userRequest.post("/broadcasts/send", { ...content, segment }),
          onAuthError,
        );
        onSent();
      } catch (err) {
        setError(apiMessage(err, "تعذّر الإرسال"));
        setSending(false);
      }
      return undefined;
    };

    return (
      <S.Page $max="1100px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع"
              onClick={onBack}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle>رسالة بريد جديدة</S.PageTitle>
          </S.Row>
          <S.Row>
            <S.Button type="button" onClick={onBack}>
              إلغاء
            </S.Button>
            <S.Button
              type="button"
              $variant="primary"
              disabled={!emailReady || sending}
              onClick={send}
            >
              <Send size={15} />
              {sending
                ? "جارٍ الإرسال..."
                : `إرسال${audience.count ? ` إلى ${num(audience.count)}` : ""}`}
            </S.Button>
          </S.Row>
        </S.Row>
        {error && <S.Alert>{error}</S.Alert>}
        <S.EditorGrid>
          <S.Stack $gap="1rem">
            <SegmentCard
              segment={segment}
              onChange={setSegment}
              options={options}
              count={audience.count}
              counting={audience.counting}
              note="يُستبعد من ألغى الاشتراك ومن لا يملك بريداً"
            />
            <EmailContentCard
              subject={content.subject}
              body={content.body}
              onChange={setContent}
            />
          </S.Stack>
          <S.Stack $gap="1rem">
            <TestSend
              disabled={
                !emailReady || !content.subject.trim() || !content.body.trim()
              }
              onSend={async (to) => {
                const { data } = await callApi(
                  () =>
                    userRequest.post("/broadcasts/test", { ...content, to }),
                  onAuthError,
                );
                return data.message;
              }}
            />
            <S.Card $padding="1.25rem" $gap="0.5rem">
              <S.Heading $size="0.9375rem">نصائح</S.Heading>
              <S.SummaryList>
                <li>أرسل نسخة تجريبية لنفسك قبل الإرسال للجميع.</li>
                <li>كل رسالة تحتوي تلقائياً على رابط إلغاء الاشتراك.</li>
                <li>
                  الإرسال يستمر في الخلفية، ويمكنك متابعة التقدم من صفحة
                  التسويق.
                </li>
              </S.SummaryList>
            </S.Card>
          </S.Stack>
        </S.EditorGrid>
      </S.Page>
    );
  },
);

const MarketingTab = memo(
  ({ accessToken, onAuthError, onGoTab, draft, onDraftUsed }) => {
    const [composing, setComposing] = useState(false);
    const [initialContent, setInitialContent] = useState(null);

    // "إرسال بالبريد" on an article opens the composer pre-filled
    useEffect(() => {
      if (!draft) return;
      setInitialContent(draft);
      setComposing(true);
      onDraftUsed?.();
    }, [draft, onDraftUsed]);

    const closeComposer = () => {
      setComposing(false);
      setInitialContent(null);
    };
    const status = useAdminGet(
      accessToken,
      onAuthError,
      "/broadcasts/status",
    ).data;
    const campaigns = useAdminGet(
      accessToken,
      onAuthError,
      "/campaigns/admin?days=30",
    );
    const automations = useAdminGet(
      accessToken,
      onAuthError,
      "/automations/admin",
    );
    const messages = useAdminGet(accessToken, onAuthError, "/broadcasts/admin");
    const sendingNow = (messages.data || []).some(
      (m) => m.status === "sending",
    );

    // Refresh every 5s while a broadcast is still going out
    const { reload: reloadMessages } = messages;
    useEffect(() => {
      if (!sendingNow) return undefined;
      const timer = setInterval(reloadMessages, 5000);
      return () => clearInterval(timer);
    }, [sendingNow, reloadMessages]);

    if (composing) {
      return (
        <BroadcastComposer
          accessToken={accessToken}
          onAuthError={onAuthError}
          emailReady={Boolean(status?.email)}
          initialContent={initialContent}
          onBack={closeComposer}
          onSent={() => {
            closeComposer();
            messages.reload();
          }}
        />
      );
    }

    const list = campaigns.data?.campaigns || [];
    const campaignJoins = list.reduce((n, c) => n + c.stats.joins, 0);
    const sentTotal = (messages.data || []).reduce(
      (n, m) => n + (m.sent || 0),
      0,
    );
    const activeAutomations = (automations.data || []).filter(
      (a) => a.enabled,
    ).length;

    return (
      <S.Page>
        <PageHeader icon={contentIcon} title="التسويق">
          <S.Button type="button" onClick={() => onGoTab("الحملات")}>
            <Link size={15} />
            حملة جديدة
          </S.Button>
          <S.Button
            type="button"
            $variant="primary"
            onClick={() => setComposing(true)}
          >
            <Mail size={15} />
            رسالة بريد جديدة
          </S.Button>
        </PageHeader>

        <EmailSetupNotice status={status} />

        <S.Grid $cols={4}>
          <StatCard
            label="الحملات النشطة"
            value={num(list.filter((c) => c.status === "active").length)}
          />
          <StatCard
            label="تسجيلات من الحملات"
            value={num(campaignJoins)}
            hint="آخر 30 يوماً"
          />
          <StatCard label="رسائل بريد أُرسلت" value={num(sentTotal)} />
          <StatCard label="أتمتة مفعّلة" value={num(activeAutomations)} />
        </S.Grid>

        <S.Card $flush>
          <S.TableToolbar>
            <S.Heading $size="0.9375rem">رسائل البريد</S.Heading>
            <S.Button
              type="button"
              $size="sm"
              $icon
              aria-label="تحديث"
              onClick={messages.reload}
            >
              <RefreshCw size={14} />
            </S.Button>
          </S.TableToolbar>
          <LoadState
            loading={messages.loading && !messages.data}
            error={messages.error}
            onRetry={messages.reload}
          >
            {(messages.data || []).length === 0 ? (
              <S.Text $muted $center style={{ padding: "2.5rem 1rem" }}>
                لم تُرسل أي رسالة بعد.{" "}
                <S.LinkButton type="button" onClick={() => setComposing(true)}>
                  اكتب أول رسالة
                </S.LinkButton>
              </S.Text>
            ) : (
              <S.TableScroll>
                <S.DataTable>
                  <thead>
                    <tr>
                      <th>العنوان</th>
                      <th>المستلمون</th>
                      <th>التسليم</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.data.map((m) => {
                      const st =
                        MESSAGE_STATES[m.status] || MESSAGE_STATES.sent;
                      return (
                        <tr key={m._id}>
                          <td>
                            <S.Stack $gap="0.125rem">
                              <strong>{m.subject}</strong>
                              <S.Text as="span" $muted $size="0.75rem">
                                {segmentSummary(m.segment)}
                              </S.Text>
                            </S.Stack>
                          </td>
                          <td>{num(m.recipients)}</td>
                          <td>
                            {num(m.sent)} أُرسلت
                            {m.failed ? (
                              <S.Text
                                as="span"
                                $size="0.75rem"
                                style={{ color: T.danger }}
                                title={m.error}
                              >
                                {" "}
                                · {num(m.failed)} فشلت
                              </S.Text>
                            ) : null}
                          </td>
                          <td>
                            <S.StatusBadge $tone={st.tone}>
                              {st.label}
                            </S.StatusBadge>
                          </td>
                          <td>{fmtDateTime(m.sentAt || m.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </S.DataTable>
              </S.TableScroll>
            )}
          </LoadState>
        </S.Card>

        <S.Card $padding="1.25rem" $gap="1rem">
          <S.Row $between>
            <S.CardLabel>أفضل الحملات (آخر 30 يوماً)</S.CardLabel>
            <S.LinkButton
              type="button"
              style={{ fontSize: "0.8125rem" }}
              onClick={() => onGoTab("الحملات")}
            >
              كل الحملات
            </S.LinkButton>
          </S.Row>
          <BarList
            rows={[...list]
              .sort((a, b) => b.stats.joins - a.stats.joins)
              .slice(0, 5)
              .map((c) => ({ label: c.name, count: c.stats.joins }))}
            empty="أنشئ حملة لتتبع التسجيلات القادمة من كل قناة."
          />
        </S.Card>
      </S.Page>
    );
  },
);

/* ============================================================
   Tab: الحملات  (tracked links)
   ============================================================ */

const CHANNELS = [
  ["instagram", "social"],
  ["snapchat", "social"],
  ["tiktok", "social"],
  ["x", "social"],
  ["google", "cpc"],
  ["whatsapp", "messaging"],
  ["email", "email"],
  ["sms", "sms"],
  ["influencer", "influencer"],
  ["other", ""],
];
const LANDING_KEY = "dashboard.campaigns.landingUrl";

const campaignLink = (c) => {
  if (!c.landingUrl) return "";
  try {
    const url = new URL(c.landingUrl);
    url.searchParams.set("utm_source", c.channel);
    if (c.medium) url.searchParams.set("utm_medium", c.medium);
    url.searchParams.set("utm_campaign", c.slug);
    return url.toString();
  } catch {
    return "";
  }
};

const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const CampaignEditor = memo(({ campaign, onBack, onSave, onDelete }) => {
  const isNew = !campaign;
  const [form, setForm] = useState(() => ({
    name: campaign?.name ?? "",
    channel: campaign?.channel ?? "instagram",
    medium: campaign?.medium ?? "social",
    slug: campaign?.slug ?? "",
    landingUrl:
      campaign?.landingUrl ??
      (() => {
        try {
          return localStorage.getItem(LANDING_KEY) || "";
        } catch {
          return "";
        }
      })(),
    cost: campaign?.cost || "",
    notes: campaign?.notes ?? "",
    status: campaign?.status ?? "active",
  }));
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Suggest an id like "instagram-2026-11" until the user edits it
  useEffect(() => {
    if (slugTouched) return;
    const d = new Date();
    const fromName = slugify(form.name);
    setForm((f) => ({
      ...f,
      slug:
        fromName ||
        `${f.channel}-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    }));
  }, [form.name, form.channel, slugTouched]);

  const link = campaignLink(form);

  const save = async () => {
    if (!form.name.trim()) return setError("اسم الحملة مطلوب");
    if (!/^[a-z0-9][a-z0-9-]{1,59}$/.test(form.slug)) {
      return setError("معرّف الحملة: أحرف إنجليزية صغيرة وأرقام وشرطة فقط");
    }
    if (!/^https?:\/\//i.test(form.landingUrl))
      return setError("رابط الصفحة يجب أن يبدأ بـ https://");
    setSaving(true);
    setError("");
    try {
      localStorage.setItem(LANDING_KEY, form.landingUrl);
    } catch {
      /* ignore */
    }
    try {
      await onSave(campaign?._id, { ...form, cost: Number(form.cost) || 0 });
      onBack();
    } catch (err) {
      setError(apiMessage(err, "تعذّر حفظ الحملة"));
      setSaving(false);
    }
    return undefined;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <S.Page $max="1000px">
      <S.Row $between $wrap $gap="1rem">
        <S.Row>
          <S.Button
            type="button"
            $variant="ghost"
            $icon
            aria-label="رجوع"
            onClick={onBack}
          >
            <ChevronRight size={18} />
          </S.Button>
          <S.PageTitle>{isNew ? "حملة جديدة" : campaign.name}</S.PageTitle>
        </S.Row>
        <S.Row>
          <S.Button type="button" onClick={onBack}>
            إلغاء
          </S.Button>
          <S.Button
            type="button"
            $variant="primary"
            disabled={saving}
            onClick={save}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ"}
          </S.Button>
        </S.Row>
      </S.Row>
      {error && <S.Alert>{error}</S.Alert>}

      <S.EditorGrid>
        <S.Stack $gap="1rem">
          <S.Card $padding="1.25rem" $gap="1rem">
            <S.Field>
              <S.FieldLabel>اسم الحملة</S.FieldLabel>
              <S.Input
                value={form.name}
                onChange={bind(setForm, "name")}
                placeholder="مثال: إعلان سناب — رمضان"
              />
            </S.Field>
            <S.FormGrid>
              <S.Field>
                <S.FieldLabel $small>القناة</S.FieldLabel>
                <S.Select
                  value={form.channel}
                  onChange={(e) => {
                    const ch = e.target.value;
                    setForm((f) => ({
                      ...f,
                      channel: ch,
                      medium: CHANNELS.find(([c]) => c === ch)?.[1] ?? f.medium,
                    }));
                  }}
                >
                  {CHANNELS.map(([c]) => (
                    <option key={c} value={c}>
                      {sourceLabel(c)}
                    </option>
                  ))}
                </S.Select>
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>النوع (utm_medium)</S.FieldLabel>
                <S.Input
                  value={form.medium}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      medium: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_-]/g, ""),
                    }))
                  }
                  placeholder="social / cpc / email"
                  style={{ direction: "ltr" }}
                />
              </S.Field>
            </S.FormGrid>
            <S.Field>
              <S.FieldLabel $small>معرّف الحملة (utm_campaign)</S.FieldLabel>
              <S.Input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({
                    ...f,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, ""),
                  }));
                }}
                style={{ direction: "ltr" }}
              />
              <S.Text $muted $size="0.75rem">
                لا تغيّره بعد نشر الرابط، وإلا ستُحسب الزيارات الجديدة كحملة
                أخرى.
              </S.Text>
            </S.Field>
            <S.Field>
              <S.FieldLabel $small>رابط صفحة قائمة الانتظار</S.FieldLabel>
              <S.Input
                value={form.landingUrl}
                onChange={bind(setForm, "landingUrl")}
                placeholder="https://yoursite.com/waitlist"
                style={{ direction: "ltr" }}
              />
            </S.Field>
          </S.Card>

          <S.Card $padding="1.25rem" $gap="0.75rem">
            <S.Heading $size="0.9375rem">رابط الحملة</S.Heading>
            {link ? (
              <>
                <S.CodeTag
                  style={{
                    fontSize: "0.8125rem",
                    whiteSpace: "normal",
                    wordBreak: "break-all",
                    letterSpacing: 0,
                  }}
                >
                  {link}
                </S.CodeTag>
                <S.Row>
                  <S.Button type="button" $variant="primary" onClick={copy}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "تم النسخ" : "نسخ الرابط"}
                  </S.Button>
                  <S.Button
                    type="button"
                    as="a"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={15} />
                    فتح
                  </S.Button>
                </S.Row>
                <S.Text $muted $size="0.75rem">
                  ضع هذا الرابط في الإعلان أو البايو أو الرسالة. كل من يدخل منه
                  ويسجّل يُحسب لهذه الحملة.
                </S.Text>
              </>
            ) : (
              <S.Text $muted $size="0.8125rem">
                أدخل رابط الصفحة ليظهر رابط الحملة.
              </S.Text>
            )}
          </S.Card>
        </S.Stack>

        <S.Stack $gap="1rem">
          <S.Card $padding="1.25rem" $gap="0.75rem">
            <S.Heading $size="0.9375rem">التكلفة (اختياري)</S.Heading>
            <S.AffixField>
              <S.Input
                type="number"
                min="0"
                value={form.cost}
                onChange={bind(setForm, "cost")}
                placeholder="0"
              />
              <span>ر.س</span>
            </S.AffixField>
            <S.Text $muted $size="0.75rem">
              لحساب تكلفة كل تسجيل.
            </S.Text>
          </S.Card>
          <S.Card $padding="1.25rem" $gap="0.75rem">
            <S.Heading $size="0.9375rem">الحالة</S.Heading>
            <S.Select value={form.status} onChange={bind(setForm, "status")}>
              <option value="active">نشطة</option>
              <option value="archived">مؤرشفة</option>
            </S.Select>
          </S.Card>
          <S.Card $padding="1.25rem" $gap="0.75rem">
            <S.Heading $size="0.9375rem">ملاحظات</S.Heading>
            <S.Textarea
              rows={3}
              value={form.notes}
              onChange={bind(setForm, "notes")}
            />
          </S.Card>
        </S.Stack>
      </S.EditorGrid>

      {!isNew && (
        <S.Row style={{ justifyContent: "flex-end" }}>
          <S.Button
            type="button"
            $variant="danger"
            onClick={async () => {
              if (
                !window.confirm(
                  `حذف الحملة "${campaign.name}"؟ تبقى الزيارات المسجلة لكن لن تظهر هنا.`,
                )
              )
                return;
              try {
                await onDelete(campaign._id);
                onBack();
              } catch (err) {
                setError(apiMessage(err, "تعذّر حذف الحملة"));
              }
            }}
          >
            <Trash2 size={15} />
            حذف الحملة
          </S.Button>
        </S.Row>
      )}
    </S.Page>
  );
});

const CAMPAIGN_GRID =
  "minmax(220px, 1.8fr) 0.9fr 0.8fr 0.8fr 0.8fr 0.9fr 0.9fr 0.5fr";

const CampaignsTab = memo(({ accessToken, onAuthError }) => {
  const [days, setDays] = useState(30);
  const [editing, setEditing] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const { data, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    `/campaigns/admin?days=${days}`,
  );

  const all = data?.campaigns || [];
  const rows = all.filter((c) => showArchived || c.status === "active");

  const save = async (id, payload) => {
    await callApi(
      () =>
        id
          ? userRequest.put(`/campaigns/${id}`, payload)
          : userRequest.post("/campaigns", payload),
      onAuthError,
    );
    reload();
  };
  const remove = async (id) => {
    await callApi(() => userRequest.delete(`/campaigns/${id}`), onAuthError);
    reload();
  };

  const copy = async (c) => {
    try {
      await navigator.clipboard.writeText(campaignLink(c));
      setCopiedId(c._id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* ignore */
    }
  };

  if (editing) {
    return (
      <CampaignEditor
        key={editing}
        campaign={editing === "new" ? null : all.find((c) => c._id === editing)}
        onBack={() => setEditing(null)}
        onSave={save}
        onDelete={remove}
      />
    );
  }

  const totals = rows.reduce(
    (t, c) => ({
      visitors: t.visitors + c.stats.visitors,
      joins: t.joins + c.stats.joins,
      cost: t.cost + (c.cost || 0),
    }),
    { visitors: 0, joins: 0, cost: 0 },
  );

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="الحملات">
        <RangePicker days={days} onChange={setDays} />
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => setEditing("new")}
        >
          <Plus size={15} />
          حملة جديدة
        </S.Button>
      </PageHeader>

      <LoadState loading={loading && !data} error={error} onRetry={reload}>
        {all.length === 0 ? (
          <S.EmptyState>
            <S.Illustration src={campaignImage} alt="" $w="200px" />
            <S.Heading $size="1.125rem">اعرف أي إعلان يجلب التسجيلات</S.Heading>
            <S.Text $muted>
              أنشئ رابطاً خاصاً لكل حملة (سناب، انستقرام، مشاهير، رسائل…). كل
              زائر يدخل من الرابط ويكمل الاستبيان ويسجّل يُحسب لتلك الحملة.
            </S.Text>
            <S.Button
              type="button"
              $variant="primary"
              onClick={() => setEditing("new")}
            >
              <Plus size={15} />
              إنشاء أول حملة
            </S.Button>
          </S.EmptyState>
        ) : (
          <>
            <S.Grid $cols={3}>
              <StatCard label="زوار من الحملات" value={num(totals.visitors)} />
              <StatCard
                label="تسجيلات من الحملات"
                value={num(totals.joins)}
                hint={pct(
                  totals.visitors ? totals.joins / totals.visitors : null,
                )}
              />
              <StatCard
                label="تكلفة التسجيل"
                value={
                  totals.joins && totals.cost
                    ? formatSAR(totals.cost / totals.joins)
                    : "—"
                }
                hint={
                  totals.cost
                    ? `إجمالي الإنفاق ${formatSAR(totals.cost)}`
                    : "أضف التكلفة لكل حملة"
                }
              />
            </S.Grid>

            <S.Card $flush>
              <S.TableToolbar>
                <S.Check>
                  <input
                    type="checkbox"
                    checked={showArchived}
                    onChange={(e) => setShowArchived(e.target.checked)}
                  />
                  إظهار الحملات المؤرشفة
                </S.Check>
              </S.TableToolbar>
              <S.TableScroll $minH="240px">
                <S.GridTable $columns={CAMPAIGN_GRID} $minWidth="980px">
                  <S.Th>الحملة</S.Th>
                  <S.Th>القناة</S.Th>
                  <S.Th $align="center">الزوار</S.Th>
                  <S.Th $align="center">بدأوا</S.Th>
                  <S.Th $align="center">سجّلوا</S.Th>
                  <S.Th $align="center">التحويل</S.Th>
                  <S.Th $align="center">تكلفة التسجيل</S.Th>
                  <S.Th $align="center">الرابط</S.Th>
                  {rows.length === 0 ? (
                    <S.TableMessage>لا توجد حملات نشطة.</S.TableMessage>
                  ) : (
                    rows.map((c) => (
                      <S.Tr key={c._id} onClick={() => setEditing(c._id)}>
                        <S.Td>
                          <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                            <S.Row $gap="0.375rem">
                              <S.Ellipsis style={{ fontWeight: 600 }}>
                                {c.name}
                              </S.Ellipsis>
                              {c.status === "archived" && (
                                <S.StatusBadge $tone="neutral">
                                  مؤرشفة
                                </S.StatusBadge>
                              )}
                            </S.Row>
                            <S.Ellipsis
                              style={{
                                fontSize: "0.75rem",
                                color: T.textMuted,
                                direction: "ltr",
                                textAlign: "right",
                              }}
                            >
                              {c.slug}
                            </S.Ellipsis>
                          </S.Stack>
                        </S.Td>
                        <S.Td>{sourceLabel(c.channel)}</S.Td>
                        <S.Td $align="center">{num(c.stats.visitors)}</S.Td>
                        <S.Td $align="center">{num(c.stats.quizStarts)}</S.Td>
                        <S.Td $align="center" $weight={700}>
                          {num(c.stats.joins)}
                        </S.Td>
                        <S.Td $align="center">
                          {pct(c.stats.conversionRate)}
                        </S.Td>
                        <S.Td $align="center">
                          {c.stats.costPerJoin
                            ? formatSAR(c.stats.costPerJoin)
                            : "—"}
                        </S.Td>
                        <S.Td
                          $align="center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <S.Button
                            type="button"
                            $variant="ghost"
                            $size="sm"
                            $icon
                            aria-label="نسخ الرابط"
                            onClick={() => copy(c)}
                          >
                            {copiedId === c._id ? (
                              <Check size={14} />
                            ) : (
                              <Copy size={14} />
                            )}
                          </S.Button>
                        </S.Td>
                      </S.Tr>
                    ))
                  )}
                </S.GridTable>
              </S.TableScroll>
              <S.TableFooter>
                <span>
                  الأرقام لآخر {num(days)} يوماً · الزائر يُحسب مرة واحدة لكل
                  زيارة
                </span>
              </S.TableFooter>
            </S.Card>
          </>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Tab: الاتمته  (automatic emails)
   ============================================================ */

const AUTOMATION_TEMPLATES = [
  {
    name: "رسالة ترحيب",
    delayDays: 0,
    subject: "أهلاً {{firstName}}، تم تسجيلك في قائمة الانتظار",
    body: "مرحباً {{firstName}}،\n\nشكراً لاهتمامك بباقة {{package}}. سجّلناك في قائمة الانتظار وسنتواصل معك فور فتح الحجز.\n\nمع التحية،\nفريق العيادة",
  },
  {
    name: "تذكير بعد 3 أيام",
    delayDays: 3,
    subject: "{{firstName}}، هل لديك أي سؤال عن باقة {{package}}؟",
    body: "مرحباً {{firstName}}،\n\nما زلت في قائمة الانتظار لباقة {{package}}. إذا كان لديك أي سؤال عن التحاليل المشمولة، يسعدنا الرد عليك.\n\nمع التحية،\nفريق العيادة",
  },
];

const timingLabel = (a) =>
  a.delayDays
    ? `بعد ${num(a.delayDays)} يوم من الانضمام`
    : "مباشرة بعد الانضمام";

const AutomationEditor = memo(
  ({
    automation,
    template,
    accessToken,
    onAuthError,
    emailReady,
    onBack,
    onSave,
    onDelete,
  }) => {
    const isNew = !automation;
    const options = useSegmentOptions(accessToken, onAuthError);
    const base = automation || template || {};
    const [form, setForm] = useState({
      name: base.name || "",
      delayDays: base.delayDays ?? 0,
      subject: base.subject || "",
      body: base.body || "",
      segment: { ...EMPTY_SEGMENT, ...(base.segment || {}) },
      enabled: automation ? automation.enabled : false,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const save = async () => {
      if (!form.name.trim()) return setError("اسم الأتمتة مطلوب");
      if (!form.subject.trim() || !form.body.trim())
        return setError("اكتب عنوان الرسالة ونصها");
      setSaving(true);
      setError("");
      try {
        await onSave(automation?._id, {
          ...form,
          delayDays: Number(form.delayDays) || 0,
        });
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حفظ الأتمتة"));
        setSaving(false);
      }
      return undefined;
    };

    return (
      <S.Page $max="1100px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع"
              onClick={onBack}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle>{isNew ? "أتمتة جديدة" : automation.name}</S.PageTitle>
          </S.Row>
          <S.Row>
            <S.Button type="button" onClick={onBack}>
              إلغاء
            </S.Button>
            <S.Button
              type="button"
              $variant="primary"
              disabled={saving}
              onClick={save}
            >
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </S.Button>
          </S.Row>
        </S.Row>
        {error && <S.Alert>{error}</S.Alert>}

        <S.EditorGrid>
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="1rem">
              <S.Field>
                <S.FieldLabel>اسم الأتمتة</S.FieldLabel>
                <S.Input
                  value={form.name}
                  onChange={bind(setForm, "name")}
                  placeholder="مثال: رسالة ترحيب"
                />
              </S.Field>
              <S.Heading $size="0.9375rem">متى تُرسل؟</S.Heading>
              <S.RadioRow>
                <input
                  type="radio"
                  name="timing"
                  checked={Number(form.delayDays) === 0}
                  onChange={() => setForm((f) => ({ ...f, delayDays: 0 }))}
                />
                مباشرة بعد انضمام الشخص لقائمة الانتظار
              </S.RadioRow>
              <S.RadioRow>
                <input
                  type="radio"
                  name="timing"
                  checked={Number(form.delayDays) > 0}
                  onChange={() =>
                    setForm((f) => ({
                      ...f,
                      delayDays: Number(f.delayDays) > 0 ? f.delayDays : 3,
                    }))
                  }
                />
                بعد
                <S.Input
                  type="number"
                  min="1"
                  max="365"
                  value={Number(form.delayDays) > 0 ? form.delayDays : ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, delayDays: e.target.value }))
                  }
                  onFocus={() =>
                    Number(form.delayDays) === 0 &&
                    setForm((f) => ({ ...f, delayDays: 3 }))
                  }
                  style={{ width: "5rem", height: "2rem" }}
                />
                يوم من الانضمام
              </S.RadioRow>
            </S.Card>

            <SegmentCard
              segment={form.segment}
              onChange={(segment) => setForm((f) => ({ ...f, segment }))}
              options={options}
              note="من ينطبق عليه الشرط فقط"
            />

            <EmailContentCard
              subject={form.subject}
              body={form.body}
              onChange={({ subject, body }) =>
                setForm((f) => ({ ...f, subject, body }))
              }
            />
          </S.Stack>

          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">التفعيل</S.Heading>
                <S.Switch
                  type="button"
                  role="switch"
                  aria-checked={form.enabled}
                  $on={form.enabled}
                  onClick={() =>
                    setForm((f) => ({ ...f, enabled: !f.enabled }))
                  }
                />
              </S.Row>
              <S.Text $muted $size="0.75rem">
                {form.enabled
                  ? "مفعّلة: تُرسل لمن ينضم من الآن فصاعداً."
                  : "متوقفة. عند التفعيل لن تُرسل لمن انضم قبل ذلك — فقط للمنضمين الجدد."}
              </S.Text>
              {!isNew && (
                <S.Text $size="0.8125rem">
                  أُرسلت {num(automation.sentCount)} مرة
                  {automation.failedCount
                    ? ` · فشلت ${num(automation.failedCount)}`
                    : ""}
                </S.Text>
              )}
            </S.Card>
            {!isNew && (
              <TestSend
                disabled={!emailReady}
                onSend={async (to) => {
                  const { data } = await callApi(
                    () =>
                      userRequest.post(`/automations/${automation._id}/test`, {
                        to,
                      }),
                    onAuthError,
                  );
                  return data.message;
                }}
              />
            )}
          </S.Stack>
        </S.EditorGrid>

        {!isNew && (
          <S.Row style={{ justifyContent: "flex-end" }}>
            <S.Button
              type="button"
              $variant="danger"
              onClick={async () => {
                if (!window.confirm(`حذف "${automation.name}"؟`)) return;
                try {
                  await onDelete(automation._id);
                  onBack();
                } catch (err) {
                  setError(apiMessage(err, "تعذّر الحذف"));
                }
              }}
            >
              <Trash2 size={15} />
              حذف الأتمتة
            </S.Button>
          </S.Row>
        )}
      </S.Page>
    );
  },
);

const AutomationsTab = memo(({ accessToken, onAuthError }) => {
  const [editing, setEditing] = useState(null); // null | { id } | { template }
  const [busyId, setBusyId] = useState(null);
  const status = useAdminGet(
    accessToken,
    onAuthError,
    "/broadcasts/status",
  ).data;
  const { data, setData, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    "/automations/admin",
  );
  const list = data || [];

  const save = async (id, payload) => {
    const { data: saved } = await callApi(
      () =>
        id
          ? userRequest.put(`/automations/${id}`, payload)
          : userRequest.post("/automations", payload),
      onAuthError,
    );
    setData((prev) =>
      id
        ? (prev || []).map((a) => (a._id === id ? saved : a))
        : [saved, ...(prev || [])],
    );
  };
  const remove = async (id) => {
    await callApi(() => userRequest.delete(`/automations/${id}`), onAuthError);
    setData((prev) => (prev || []).filter((a) => a._id !== id));
  };
  const toggle = async (a) => {
    setBusyId(a._id);
    try {
      await save(a._id, { enabled: !a.enabled });
    } catch (err) {
      alert(apiMessage(err, "تعذّر التحديث"));
    } finally {
      setBusyId(null);
    }
  };

  if (editing) {
    return (
      <AutomationEditor
        key={editing.id || editing.template?.name || "new"}
        automation={editing.id ? list.find((a) => a._id === editing.id) : null}
        template={editing.template}
        accessToken={accessToken}
        onAuthError={onAuthError}
        emailReady={Boolean(status?.email)}
        onBack={() => setEditing(null)}
        onSave={save}
        onDelete={remove}
      />
    );
  }

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="الاتمته">
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => setEditing({ template: null })}
        >
          <Plus size={15} />
          أتمتة جديدة
        </S.Button>
      </PageHeader>

      <EmailSetupNotice status={status} />

      <LoadState loading={loading && !data} error={error} onRetry={reload}>
        {list.length === 0 ? (
          <S.EmptyState>
            <S.Illustration src={automationImage} alt="" $w="200px" />
            <S.Heading $size="1.125rem">رسائل تلقائية لكل من ينضم</S.Heading>
            <S.Text $muted>ابدأ بقالب جاهز وعدّله كما تريد:</S.Text>
            <S.Row $wrap style={{ justifyContent: "center" }}>
              {AUTOMATION_TEMPLATES.map((t) => (
                <S.Button
                  key={t.name}
                  type="button"
                  onClick={() => setEditing({ template: t })}
                >
                  <Zap size={15} />
                  {t.name}
                </S.Button>
              ))}
            </S.Row>
          </S.EmptyState>
        ) : (
          <S.Stack $gap="0.75rem">
            {list.map((a) => (
              <S.Card key={a._id} $padding="1rem 1.25rem">
                <S.Row $between $wrap $gap="1rem">
                  <S.Row
                    $gap="0.875rem"
                    style={{ minWidth: 0, flex: 1, cursor: "pointer" }}
                    onClick={() => setEditing({ id: a._id })}
                  >
                    <S.IconBubble $on={a.enabled}>
                      {a.delayDays ? <Clock size={18} /> : <Zap size={18} />}
                    </S.IconBubble>
                    <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                      <strong>{a.name}</strong>
                      <S.Text $muted $size="0.8125rem">
                        {timingLabel(a)} · {segmentSummary(a.segment)}
                      </S.Text>
                      <S.Ellipsis
                        style={{ fontSize: "0.75rem", color: T.textSubtle }}
                      >
                        البريد: {a.subject}
                      </S.Ellipsis>
                    </S.Stack>
                  </S.Row>
                  <S.Row $gap="1rem">
                    <S.Text $muted $size="0.8125rem">
                      {num(a.sentCount)} أُرسلت
                    </S.Text>
                    <S.Switch
                      type="button"
                      role="switch"
                      aria-checked={a.enabled}
                      aria-label={a.enabled ? "إيقاف" : "تفعيل"}
                      $on={a.enabled}
                      disabled={busyId === a._id}
                      onClick={() => toggle(a)}
                    />
                  </S.Row>
                </S.Row>
              </S.Card>
            ))}
            <S.Row $wrap $gap="0.5rem">
              <S.Text as="span" $muted $size="0.8125rem">
                قوالب:
              </S.Text>
              {AUTOMATION_TEMPLATES.map((t) => (
                <S.VarChip
                  key={t.name}
                  type="button"
                  onClick={() => setEditing({ template: t })}
                >
                  {t.name}
                </S.VarChip>
              ))}
            </S.Row>
          </S.Stack>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Content: shared (articles, quotes)
   ============================================================ */

// Side-menu names. Keep NavSide.jsx in sync with these (aliases are accepted too).
const CONTENT_TAB = "المحتوى";
const QUOTES_TAB = "الاقتباسات";
const CONTENT_TAB_NAMES = [CONTENT_TAB, "المدونة", "المقالات"];
const QUOTES_TAB_NAMES = [
  QUOTES_TAB,
  "اقتباسات",
  "الاقتباس",
  "Quota",
  "quota",
  "Quotes",
];

const SECTION_KEYS = [
  ["firstTitle", "firstText", "firstImg"],
  ["secTitle", "secText", "secImg"],
  ["thirdTitle", "thirdText", "thirdImg"],
  ["fourthTitle", "fourthText", "fourthImg"],
  ["fivthTitle", "fivthText", "fivthImg"], // spelled like the Newsletter model
];

// Article page address, e.g. https://yoursite.com/newsletter/{id} (saved in this browser)
const ARTICLE_URL_KEY = "dashboard.content.articleUrl";
const loadArticleUrl = () => {
  try {
    return localStorage.getItem(ARTICLE_URL_KEY) || "";
  } catch {
    return "";
  }
};

const excerptOf = (a, max = 280) => {
  const raw = String(a?.mainText || a?.firstText || "")
    .replace(/\s+\n/g, "\n")
    .trim();
  return raw.length > max
    ? `${raw.slice(0, max).replace(/\s+\S*$/, "")}…`
    : raw;
};

const articleUrl = (template, id) =>
  template && id ? template.replace(/\{id\}/g, id) : "";

const toDateInput = (d) => {
  if (!d) return "";
  const x = new Date(d);
  return Number.isNaN(x.getTime())
    ? ""
    : `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};

// Email draft for the marketing composer
const emailFromArticle = (a, link) => ({
  subject: `مقال جديد: ${a.title}`,
  body: [
    "مرحباً {{firstName}}،",
    `نشرنا مقالاً جديداً بعنوان "${a.title}".`,
    excerptOf(a, 400),
    link ? `اقرأ المقال كاملاً:\n${link}` : "",
  ]
    .filter(Boolean)
    .join("\n\n"),
});

// Newsletter articles (existing /api/newsletter routes)
const useArticles = (accessToken, onAuthError) => {
  const { data, setData, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    "/newsletter?limit=1000",
  );
  const items = useMemo(
    () => (Array.isArray(data) ? data : data?.data) || [],
    [data],
  );

  const save = useCallback(
    async (id, payload) => {
      const { data: res } = await callApi(
        () =>
          id
            ? userRequest.put(`/newsletter/${id}`, payload)
            : userRequest.post("/newsletter", payload),
        onAuthError,
      );
      const saved = res?.data || res;
      setData((prev) => {
        const list = (Array.isArray(prev) ? prev : prev?.data) || [];
        return {
          data: id
            ? list.map((a) => (a._id === id ? saved : a))
            : [saved, ...list],
        };
      });
      return saved;
    },
    [onAuthError, setData],
  );

  const remove = useCallback(
    async (id) => {
      await callApi(() => userRequest.delete(`/newsletter/${id}`), onAuthError);
      setData((prev) => ({
        data: ((Array.isArray(prev) ? prev : prev?.data) || []).filter(
          (a) => a._id !== id,
        ),
      }));
    },
    [onAuthError, setData],
  );

  return { items, loading, error, reload, save, remove };
};

// Quote bank (existing /api/quotes routes)
const useQuotes = (accessToken, onAuthError) => {
  const { data, setData, loading, error, reload } = useAdminGet(
    accessToken,
    onAuthError,
    "/quotes",
  );
  const items = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const add = useCallback(
    async (texts) => {
      if (texts.length === 1) {
        const { data: q } = await callApi(
          () => userRequest.post("/quotes", { textAr: texts[0] }),
          onAuthError,
        );
        setData((prev) => [q, ...(prev || [])]);
        return 1;
      }
      const { data: res } = await callApi(
        () => userRequest.post("/quotes/bulk", { quotes: texts }),
        onAuthError,
      );
      setData((prev) => [
        ...(res.quotes || []).slice().reverse(),
        ...(prev || []),
      ]);
      return res.inserted || 0;
    },
    [onAuthError, setData],
  );

  const update = useCallback(
    async (id, patch) => {
      const { data: q } = await callApi(
        () => userRequest.patch(`/quotes/${id}`, patch),
        onAuthError,
      );
      setData((prev) => (prev || []).map((x) => (x._id === id ? q : x)));
    },
    [onAuthError, setData],
  );

  const remove = useCallback(
    async (id) => {
      await callApi(() => userRequest.delete(`/quotes/${id}`), onAuthError);
      setData((prev) => (prev || []).filter((x) => x._id !== id));
    },
    [onAuthError, setData],
  );

  return { items, loading, error, reload, add, update, remove };
};

const ArticleThumb = ({ src, size = 40 }) => {
  const [broken, setBroken] = useState(false);
  return src && !broken ? (
    <S.Thumb src={src} alt="" $size={size} onError={() => setBroken(true)} />
  ) : (
    <S.ThumbPlaceholder $size={size}>
      <FileText size={size * 0.4} />
    </S.ThumbPlaceholder>
  );
};

/* ============================================================
   Tab: المحتوى  (blog articles)
   ============================================================ */

const EMPTY_ARTICLE = {
  title: "",
  titleImg: "",
  mainText: "",
  mainImg: "",
  ...Object.fromEntries(SECTION_KEYS.flat().map((k) => [k, ""])),
  author: "الكاتب",
  reviewedBy: "المراجع الطبي",
  publishDate: toDateInput(new Date()),
  isFeatured: false,
  isPopular: false,
  sources: [],
};

const articleToForm = (a) =>
  a
    ? {
        ...EMPTY_ARTICLE,
        ...Object.fromEntries(
          Object.keys(EMPTY_ARTICLE).map((k) => [k, a[k] ?? EMPTY_ARTICLE[k]]),
        ),
        publishDate: toDateInput(a.publishDate || a.createdAt),
        sources: (a.sources || []).map((s) => ({
          publisher: s.publisher || "",
          title: s.title || "",
          url: s.url || "",
        })),
      }
    : { ...EMPTY_ARTICLE, sources: [] };

const sectionsUsed = (form) => {
  let last = 0;
  SECTION_KEYS.forEach((keys, i) => {
    if (keys.some((k) => String(form[k] || "").trim())) last = i + 1;
  });
  return last;
};

const ImageField = ({ label, value, onChange, hint }) => (
  <S.Field>
    <S.FieldLabel $small>{label}</S.FieldLabel>
    <S.Row $gap="0.5rem">
      <ArticleThumb src={value.trim()} size={40} />
      <S.Input
        value={value}
        onChange={onChange}
        placeholder="https://..."
        style={{ direction: "ltr" }}
      />
    </S.Row>
    {hint && (
      <S.Text $muted $size="0.75rem">
        {hint}
      </S.Text>
    )}
  </S.Field>
);

const ArticleEditor = memo(
  ({
    article,
    articleLinkTemplate,
    onBack,
    onSave,
    onDelete,
    onSaved,
    onShareEmail,
  }) => {
    const isNew = !article;
    const initial = useMemo(() => articleToForm(article), [article]);
    const [form, setForm] = useState(initial);
    const [sectionCount, setSectionCount] = useState(() =>
      Math.max(1, sectionsUsed(initial)),
    );
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const dirty = JSON.stringify(form) !== JSON.stringify(initial);

    // After a save the parent passes the saved article back: start clean from it
    useEffect(() => {
      setForm(initial);
      setSectionCount((n) => Math.max(1, n, sectionsUsed(initial)));
    }, [initial]);
    const link = articleUrl(articleLinkTemplate, article?._id);

    const removeSection = (i) => {
      // Shift later sections up so there are no gaps
      setForm((f) => {
        const next = { ...f };
        for (let j = i; j < SECTION_KEYS.length; j += 1) {
          SECTION_KEYS[j].forEach((k, idx) => {
            next[k] =
              j + 1 < SECTION_KEYS.length ? f[SECTION_KEYS[j + 1][idx]] : "";
          });
        }
        return next;
      });
      setSectionCount((n) => Math.max(0, n - 1));
    };

    const setSource = (i, key, value) =>
      setForm((f) => ({
        ...f,
        sources: f.sources.map((s, idx) =>
          idx === i ? { ...s, [key]: value } : s,
        ),
      }));

    const handleSave = async () => {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (typeof payload[k] === "string") payload[k] = payload[k].trim();
      });
      if (!payload.title) return setError("عنوان المقال مطلوب");
      if (!payload.titleImg) return setError("صورة الغلاف مطلوبة");
      const sources = form.sources
        .map((s) => ({
          publisher: s.publisher.trim(),
          title: s.title.trim(),
          url: s.url.trim(),
        }))
        .filter((s) => s.publisher || s.title || s.url);
      if (sources.some((s) => !s.title || !s.url))
        return setError("كل مصدر يحتاج عنواناً ورابطاً");
      payload.sources = sources;
      payload.publishDate = payload.publishDate
        ? new Date(`${payload.publishDate}T12:00:00`).toISOString()
        : new Date().toISOString();

      setSaving(true);
      setError("");
      try {
        const saved = await onSave(article?._id, payload);
        setSavedNote(isNew ? "تم نشر المقال" : "تم حفظ التعديلات");
        onSaved(saved?._id);
      } catch (err) {
        const errs = err?.response?.data?.errors;
        setError(
          errs?.length ? errs.join("، ") : apiMessage(err, "تعذّر حفظ المقال"),
        );
      } finally {
        setSaving(false);
      }
      return undefined;
    };

    const handleDelete = async () => {
      if (!window.confirm(`حذف المقال "${article.title}" نهائياً؟`)) return;
      setDeleting(true);
      try {
        await onDelete(article._id);
        onBack();
      } catch (err) {
        setError(apiMessage(err, "تعذّر حذف المقال"));
        setDeleting(false);
      }
    };

    return (
      <S.Page $max="1100px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row style={{ minWidth: 0 }}>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="رجوع"
              onClick={onBack}
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.PageTitle style={{ minWidth: 0 }}>
              <S.Ellipsis>{isNew ? "مقال جديد" : article.title}</S.Ellipsis>
            </S.PageTitle>
          </S.Row>
          <S.Row>
            <S.Button type="button" onClick={onBack}>
              {dirty ? "إلغاء" : "رجوع"}
            </S.Button>
            <S.Button
              type="button"
              $variant="primary"
              disabled={saving || (!isNew && !dirty)}
              onClick={handleSave}
            >
              {saving ? "جارٍ الحفظ..." : isNew ? "نشر المقال" : "حفظ"}
            </S.Button>
          </S.Row>
        </S.Row>

        {error && <S.Alert>{error}</S.Alert>}
        {savedNote && !dirty && (
          <S.Notice>
            <Check size={16} style={{ color: T.success }} />
            <span>
              {savedNote}. يمكنك الآن إرساله لقائمة الانتظار بالبريد من القائمة
              الجانبية.
            </span>
          </S.Notice>
        )}

        <S.EditorGrid>
          {/* ---------- Main column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="1rem">
              <S.Field>
                <S.FieldLabel>العنوان</S.FieldLabel>
                <S.Input
                  value={form.title}
                  onChange={bind(setForm, "title")}
                  placeholder="مثال: كيف يؤثر النوم على صحة القلب؟"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>المقدمة</S.FieldLabel>
                <S.Textarea
                  rows={6}
                  value={form.mainText}
                  onChange={bind(setForm, "mainText")}
                  placeholder="الفقرة الأولى من المقال. تُستخدم أيضاً كملخص في رسائل البريد."
                />
              </S.Field>
              <S.FormGrid>
                <ImageField
                  label="صورة الغلاف (مطلوبة)"
                  value={form.titleImg}
                  onChange={bind(setForm, "titleImg")}
                  hint="تظهر في قائمة المقالات وفي صفحة المدونة."
                />
                <ImageField
                  label="الصورة الرئيسية"
                  value={form.mainImg}
                  onChange={bind(setForm, "mainImg")}
                />
              </S.FormGrid>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">أقسام المقال</S.Heading>
                <S.Text $muted $size="0.75rem">
                  {num(sectionCount)} من {num(SECTION_KEYS.length)}
                </S.Text>
              </S.Row>
              {SECTION_KEYS.slice(0, sectionCount).map(
                ([tKey, xKey, iKey], i) => (
                  <S.SubCard key={tKey}>
                    <S.Row $gap="0.5rem">
                      <S.Text
                        as="span"
                        $muted
                        $size="0.75rem"
                        style={{ flexShrink: 0 }}
                      >
                        {num(i + 1)}
                      </S.Text>
                      <S.Input
                        value={form[tKey]}
                        onChange={bind(setForm, tKey)}
                        placeholder="عنوان القسم"
                      />
                      <S.Button
                        type="button"
                        $variant="ghost"
                        $icon
                        aria-label="حذف القسم"
                        onClick={() => removeSection(i)}
                      >
                        <Trash2 size={15} />
                      </S.Button>
                    </S.Row>
                    <S.Textarea
                      rows={5}
                      value={form[xKey]}
                      onChange={bind(setForm, xKey)}
                      placeholder="نص القسم"
                    />
                    <ImageField
                      label="صورة القسم (اختياري)"
                      value={form[iKey]}
                      onChange={bind(setForm, iKey)}
                    />
                  </S.SubCard>
                ),
              )}
              {sectionCount < SECTION_KEYS.length && (
                <div>
                  <S.Button
                    type="button"
                    $size="sm"
                    onClick={() => setSectionCount((n) => n + 1)}
                  >
                    <Plus size={14} />
                    إضافة قسم
                  </S.Button>
                </div>
              )}
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">المصادر</S.Heading>
              {form.sources.length === 0 && (
                <S.Text $muted $size="0.8125rem">
                  أضف المراجع العلمية للمقال لتظهر في آخره.
                </S.Text>
              )}
              {form.sources.map((s, i) => (
                <S.SubCard key={i}>
                  <S.FormGrid>
                    <S.Input
                      value={s.title}
                      onChange={(e) => setSource(i, "title", e.target.value)}
                      placeholder="عنوان المصدر"
                    />
                    <S.Input
                      value={s.publisher}
                      onChange={(e) =>
                        setSource(i, "publisher", e.target.value)
                      }
                      placeholder="الناشر (اختياري)، مثال: WHO"
                    />
                  </S.FormGrid>
                  <S.Row $gap="0.5rem">
                    <S.Input
                      value={s.url}
                      onChange={(e) => setSource(i, "url", e.target.value)}
                      placeholder="https://..."
                      style={{ direction: "ltr" }}
                    />
                    <S.Button
                      type="button"
                      $variant="ghost"
                      $icon
                      aria-label="حذف المصدر"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          sources: f.sources.filter((_, idx) => idx !== i),
                        }))
                      }
                    >
                      <Trash2 size={15} />
                    </S.Button>
                  </S.Row>
                </S.SubCard>
              ))}
              <div>
                <S.Button
                  type="button"
                  $size="sm"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      sources: [
                        ...f.sources,
                        { publisher: "", title: "", url: "" },
                      ],
                    }))
                  }
                >
                  <Plus size={14} />
                  إضافة مصدر
                </S.Button>
              </div>
            </S.Card>
          </S.Stack>

          {/* ---------- Side column ---------- */}
          <S.Stack $gap="1rem">
            {!isNew && (
              <S.Card $padding="1.25rem" $gap="0.75rem">
                <S.Heading $size="0.9375rem">إرسال المقال</S.Heading>
                <S.Button
                  type="button"
                  $variant="primary"
                  disabled={dirty}
                  onClick={() => onShareEmail(emailFromArticle(article, link))}
                >
                  <Mail size={15} />
                  إرسال بالبريد لقائمة الانتظار
                </S.Button>
                {dirty && (
                  <S.Text $muted $size="0.75rem">
                    احفظ التعديلات أولاً.
                  </S.Text>
                )}
                {link ? (
                  <S.LinkButton
                    as="a"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <ExternalLink size={13} /> فتح صفحة المقال
                  </S.LinkButton>
                ) : (
                  <S.Text $muted $size="0.75rem">
                    لإضافة رابط المقال في البريد، اضبط "رابط المقال" في أعلى
                    صفحة المحتوى.
                  </S.Text>
                )}
              </S.Card>
            )}

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">الظهور</S.Heading>
              <S.Check $bold>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={bind(setForm, "isFeatured")}
                />
                مقال مميز
              </S.Check>
              <S.Check $bold>
                <input
                  type="checkbox"
                  checked={form.isPopular}
                  onChange={bind(setForm, "isPopular")}
                />
                الأكثر قراءة
              </S.Check>
              <S.Text $muted $size="0.75rem">
                تحدد أين يظهر المقال في صفحة المدونة.
              </S.Text>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">النشر</S.Heading>
              <S.Field>
                <S.FieldLabel $small>تاريخ النشر</S.FieldLabel>
                <S.Input
                  type="date"
                  value={form.publishDate}
                  onChange={bind(setForm, "publishDate")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>الكاتب</S.FieldLabel>
                <S.Input
                  value={form.author}
                  onChange={bind(setForm, "author")}
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>المراجعة الطبية</S.FieldLabel>
                <S.Input
                  value={form.reviewedBy}
                  onChange={bind(setForm, "reviewedBy")}
                />
              </S.Field>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">معاينة البطاقة</S.Heading>
              <S.ArticleCard>
                {form.titleImg.trim() ? (
                  <img src={form.titleImg.trim()} alt="" />
                ) : (
                  <div className="ph">
                    <FileText size={28} />
                  </div>
                )}
                <div>
                  <strong>{form.title || "عنوان المقال"}</strong>
                  <p>{excerptOf(form, 140) || "المقدمة تظهر هنا"}</p>
                  <small>
                    {form.author} ·{" "}
                    {form.publishDate
                      ? new Date(form.publishDate).toLocaleDateString("ar-SA")
                      : "—"}
                  </small>
                </div>
              </S.ArticleCard>
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
              {deleting ? "جارٍ الحذف..." : "حذف المقال"}
            </S.Button>
          </S.Row>
        )}
      </S.Page>
    );
  },
);

const ARTICLE_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  { id: "featured", label: "مميز", test: (a) => a.isFeatured },
  { id: "popular", label: "الأكثر قراءة", test: (a) => a.isPopular },
];

const ARTICLE_SORTS = [
  {
    id: "newest",
    label: "الأحدث نشراً",
    fn: (a, b) =>
      new Date(b.publishDate || b.createdAt) -
      new Date(a.publishDate || a.createdAt),
  },
  {
    id: "oldest",
    label: "الأقدم نشراً",
    fn: (a, b) =>
      new Date(a.publishDate || a.createdAt) -
      new Date(b.publishDate || b.createdAt),
  },
  {
    id: "title",
    label: "العنوان (أ-ي)",
    fn: (a, b) => String(a.title).localeCompare(String(b.title), "ar"),
  },
];

const ARTICLE_GRID = "minmax(280px, 2.6fr) 1fr 1fr 0.6fr 0.6fr 1fr";

const ContentTab = memo(({ accessToken, onAuthError, onShareEmail }) => {
  const ar = useArticles(accessToken, onAuthError);
  const [editing, setEditing] = useState(null); // null | "new" | id
  const [editorKey, setEditorKey] = useState(0);
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [sortId, setSortId] = useState("newest");

  const openEditor = (id) => {
    setEditorKey((k) => k + 1);
    setEditing(id);
  };
  const [busyId, setBusyId] = useState(null);

  const [linkTemplate, setLinkTemplate] = useState(loadArticleUrl);
  const [linkDraft, setLinkDraft] = useState(linkTemplate);
  const linkValid =
    !linkDraft.trim() ||
    (/^https:\/\/\S+$/i.test(linkDraft.trim()) && linkDraft.includes("{id}"));
  const saveLink = () => {
    const v = linkDraft.trim();
    try {
      localStorage.setItem(ARTICLE_URL_KEY, v);
    } catch {
      /* ignore */
    }
    setLinkTemplate(v);
  };

  const rows = useMemo(() => {
    const viewTest = ARTICLE_VIEWS.find((v) => v.id === view).test;
    const q = normalizeAr(query);
    return ar.items
      .filter(
        (a) =>
          viewTest(a) &&
          (!q ||
            normalizeAr(`${a.title} ${a.author} ${a.mainText}`).includes(q)),
      )
      .sort(ARTICLE_SORTS.find((s) => s.id === sortId).fn);
  }, [ar.items, view, query, sortId]);

  const toggle = async (a, key) => {
    setBusyId(`${a._id}${key}`);
    try {
      await ar.save(a._id, { [key]: !a[key] });
    } catch (err) {
      alert(apiMessage(err, "تعذّر تحديث المقال"));
    } finally {
      setBusyId(null);
    }
  };

  if (editing) {
    return (
      <ArticleEditor
        key={editorKey}
        article={
          editing === "new" ? null : ar.items.find((a) => a._id === editing)
        }
        articleLinkTemplate={linkTemplate}
        onBack={() => setEditing(null)}
        onSave={ar.save}
        onDelete={ar.remove}
        onSaved={(id) => id && setEditing(id)}
        onShareEmail={onShareEmail}
      />
    );
  }

  const activeSort = ARTICLE_SORTS.find((s) => s.id === sortId);

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="المحتوى">
        <Popover
          align="end"
          trigger={({ toggle: open }) => (
            <S.Button type="button" onClick={open}>
              <Link size={15} />
              رابط المقال
            </S.Button>
          )}
        >
          {({ close }) => (
            <S.Stack
              $gap="0.5rem"
              style={{ padding: "0.75rem", width: "20rem" }}
            >
              <S.FieldLabel $small>رابط صفحة المقال في موقعك</S.FieldLabel>
              <S.Input
                value={linkDraft}
                onChange={(e) => setLinkDraft(e.target.value)}
                placeholder="https://yoursite.com/newsletter/{id}"
                style={{ direction: "ltr" }}
              />
              <S.Text
                $muted
                $size="0.75rem"
                style={{ color: linkValid ? undefined : T.danger }}
              >
                {linkValid
                  ? "اكتب {id} مكان رقم المقال. يُضاف الرابط تلقائياً في رسائل البريد."
                  : "يجب أن يبدأ بـ https:// ويحتوي على {id}"}
              </S.Text>
              <S.Button
                type="button"
                $size="sm"
                $variant="primary"
                disabled={!linkValid}
                onClick={() => {
                  saveLink();
                  close();
                }}
              >
                حفظ
              </S.Button>
            </S.Stack>
          )}
        </Popover>
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => openEditor("new")}
        >
          <Plus size={15} />
          مقال جديد
        </S.Button>
      </PageHeader>

      <LoadState
        loading={ar.loading && !ar.items.length}
        error={ar.error}
        onRetry={ar.reload}
      >
        {ar.items.length === 0 ? (
          <S.EmptyState>
            <S.Illustration src={contentImage} alt="" $w="200px" />
            <S.Heading $size="1.125rem">اكتب أول مقال في المدونة</S.Heading>
            <S.Text $muted>
              المقالات تظهر في صفحة المدونة، ويمكنك إرسالها بالبريد لقائمة
              الانتظار بضغطة زر.
            </S.Text>
            <S.Button
              type="button"
              $variant="primary"
              onClick={() => openEditor("new")}
            >
              <Plus size={15} />
              مقال جديد
            </S.Button>
          </S.EmptyState>
        ) : (
          <>
            <S.Grid $cols={3}>
              <StatCard label="المقالات" value={num(ar.items.length)} />
              <StatCard
                label="مميزة"
                value={num(ar.items.filter((a) => a.isFeatured).length)}
              />
              <StatCard
                label="الأكثر قراءة"
                value={num(ar.items.filter((a) => a.isPopular).length)}
              />
            </S.Grid>

            <S.Card $flush $overflow>
              <S.ViewTabs role="tablist">
                {ARTICLE_VIEWS.map((v) => (
                  <S.ViewTab
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={view === v.id}
                    $active={view === v.id}
                    onClick={() => setView(v.id)}
                  >
                    {v.label}
                    <S.MenuCount>
                      {num(ar.items.filter(v.test).length)}
                    </S.MenuCount>
                  </S.ViewTab>
                ))}
              </S.ViewTabs>

              <S.FilterBar>
                <S.SearchField style={{ maxWidth: "22rem", flex: 1 }}>
                  <Search size={15} />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ابحث في المقالات"
                  />
                </S.SearchField>
                <Popover
                  align="end"
                  trigger={({ toggle: open }) => (
                    <S.Button type="button" $size="sm" onClick={open}>
                      <ArrowUpDown size={14} />
                      {activeSort.label}
                    </S.Button>
                  )}
                >
                  {({ close }) =>
                    ARTICLE_SORTS.map((s) => (
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
                <S.GridTable $columns={ARTICLE_GRID} $minWidth="900px">
                  <S.Th>المقال</S.Th>
                  <S.Th>الكاتب</S.Th>
                  <S.Th>تاريخ النشر</S.Th>
                  <S.Th $align="center">مميز</S.Th>
                  <S.Th $align="center">رائج</S.Th>
                  <S.Th $align="center">إرسال</S.Th>
                  {rows.length === 0 ? (
                    <S.TableMessage>
                      لا توجد مقالات تطابق البحث أو التصفية.
                    </S.TableMessage>
                  ) : (
                    rows.map((a) => (
                      <S.Tr key={a._id} onClick={() => openEditor(a._id)}>
                        <S.Td>
                          <S.Row $gap="0.75rem" style={{ minWidth: 0 }}>
                            <ArticleThumb src={a.titleImg} />
                            <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                              <S.Ellipsis style={{ fontWeight: 600 }}>
                                {a.title}
                              </S.Ellipsis>
                              <S.Ellipsis
                                style={{
                                  fontSize: "0.75rem",
                                  color: T.textMuted,
                                }}
                              >
                                {excerptOf(a, 90) || "—"}
                              </S.Ellipsis>
                            </S.Stack>
                          </S.Row>
                        </S.Td>
                        <S.Td>
                          <S.Ellipsis>{a.author || "—"}</S.Ellipsis>
                        </S.Td>
                        <S.Td>{formatDate(a.publishDate || a.createdAt)}</S.Td>
                        <S.Td $align="center">
                          <S.StarToggle
                            type="button"
                            $on={a.isFeatured}
                            aria-pressed={a.isFeatured}
                            aria-label={
                              a.isFeatured ? "إلغاء التمييز" : "تمييز المقال"
                            }
                            disabled={busyId === `${a._id}isFeatured`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(a, "isFeatured");
                            }}
                          >
                            <Star
                              size={17}
                              fill={a.isFeatured ? "currentColor" : "none"}
                            />
                          </S.StarToggle>
                        </S.Td>
                        <S.Td $align="center">
                          <S.StarToggle
                            type="button"
                            $on={a.isPopular}
                            aria-pressed={a.isPopular}
                            aria-label={
                              a.isPopular
                                ? "إزالة من الأكثر قراءة"
                                : "إضافة إلى الأكثر قراءة"
                            }
                            disabled={busyId === `${a._id}isPopular`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(a, "isPopular");
                            }}
                          >
                            <Flame
                              size={17}
                              fill={a.isPopular ? "currentColor" : "none"}
                            />
                          </S.StarToggle>
                        </S.Td>
                        <S.Td
                          $align="center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <S.Row
                            $gap="0.25rem"
                            style={{ justifyContent: "center" }}
                          >
                            <S.Button
                              type="button"
                              $variant="ghost"
                              $size="sm"
                              $icon
                              aria-label="إرسال بالبريد"
                              title="إرسال بالبريد لقائمة الانتظار"
                              onClick={() =>
                                onShareEmail(
                                  emailFromArticle(
                                    a,
                                    articleUrl(linkTemplate, a._id),
                                  ),
                                )
                              }
                            >
                              <Mail size={14} />
                            </S.Button>
                          </S.Row>
                        </S.Td>
                      </S.Tr>
                    ))
                  )}
                </S.GridTable>
              </S.TableScroll>
              <S.TableFooter>
                <span>
                  {num(rows.length)} من {num(ar.items.length)} مقال
                </span>
              </S.TableFooter>
            </S.Card>
          </>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Tab: الاقتباسات  (quote bank for the app)
   ============================================================ */

const QUOTE_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  { id: "active", label: "ظاهر", test: (q) => q.active },
  { id: "hidden", label: "مخفي", test: (q) => !q.active },
];

const QuoteAddCard = memo(({ existing, onAdd, onClose }) => {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const lines = useMemo(
    () => [
      ...new Set(
        text
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean),
      ),
    ],
    [text],
  );
  const known = useMemo(
    () => new Set(existing.map((q) => normalizeAr(q.textAr))),
    [existing],
  );
  const fresh = lines.filter((l) => !known.has(normalizeAr(l)));
  const dupes = lines.length - fresh.length;

  const save = async () => {
    if (!fresh.length)
      return setError(
        lines.length
          ? "كل هذه الاقتباسات موجودة بالفعل"
          : "اكتب اقتباساً واحداً على الأقل",
      );
    setBusy(true);
    setError("");
    try {
      await onAdd(fresh);
      onClose();
    } catch (err) {
      setError(apiMessage(err, "تعذّرت الإضافة"));
      setBusy(false);
    }
    return undefined;
  };

  return (
    <S.Card $padding="1.25rem" $gap="0.75rem">
      <S.Row $between>
        <S.Heading $size="0.9375rem">إضافة اقتباسات</S.Heading>
        <S.Button
          type="button"
          $variant="ghost"
          $icon
          aria-label="إغلاق"
          onClick={onClose}
        >
          <X size={16} />
        </S.Button>
      </S.Row>
      <S.Textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          "اقتباس في كل سطر\nالصحة تاج على رؤوس الأصحاء\nالوقاية خير من العلاج"
        }
        autoFocus
      />
      {error && (
        <S.Text $size="0.8125rem" style={{ color: T.danger }}>
          {error}
        </S.Text>
      )}
      <S.Row $between $wrap $gap="0.5rem">
        <S.Text $muted $size="0.75rem">
          {lines.length
            ? `${num(fresh.length)} جديد${dupes ? ` · ${num(dupes)} موجود مسبقاً وسيُتجاهل` : ""}`
            : "يمكنك لصق قائمة كاملة دفعة واحدة."}
        </S.Text>
        <S.Button
          type="button"
          $variant="primary"
          disabled={busy || !fresh.length}
          onClick={save}
        >
          {busy
            ? "جارٍ الإضافة..."
            : `إضافة${fresh.length > 1 ? ` ${num(fresh.length)}` : ""}`}
        </S.Button>
      </S.Row>
    </S.Card>
  );
});

const QuoteRow = memo(({ q, isToday, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(q.textAr);
  const [busy, setBusy] = useState(false);

  const run = async (fn) => {
    setBusy(true);
    try {
      await fn();
      return true;
    } catch (err) {
      alert(apiMessage(err, "تعذّرت العملية"));
      return false;
    } finally {
      setBusy(false);
    }
  };

  const saveText = async () => {
    const v = value.trim();
    if (!v || v === q.textAr) return setEditing(false);
    if (await run(() => onUpdate(q._id, { textAr: v }))) setEditing(false);
    return undefined;
  };

  return (
    <S.QuoteItem $muted={!q.active}>
      <Quote size={16} className="mark" />
      <S.Stack $gap="0.375rem" style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <>
            <S.Textarea
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            <S.Row $gap="0.5rem">
              <S.Button
                type="button"
                $size="sm"
                $variant="primary"
                disabled={busy}
                onClick={saveText}
              >
                حفظ
              </S.Button>
              <S.Button
                type="button"
                $size="sm"
                onClick={() => {
                  setValue(q.textAr);
                  setEditing(false);
                }}
              >
                إلغاء
              </S.Button>
            </S.Row>
          </>
        ) : (
          <p onDoubleClick={() => setEditing(true)}>{q.textAr}</p>
        )}
        <S.Row $gap="0.5rem" $wrap>
          {isToday && (
            <S.StatusBadge $tone="success">اقتباس اليوم</S.StatusBadge>
          )}
          {!q.active && <S.StatusBadge $tone="neutral">مخفي</S.StatusBadge>}
          <S.Text as="span" $muted $size="0.6875rem">
            أُضيف {formatDate(q.createdAt)}
          </S.Text>
        </S.Row>
      </S.Stack>
      <S.Row $gap="0.25rem" style={{ flexShrink: 0 }}>
        <S.Button
          type="button"
          $variant="ghost"
          $size="sm"
          $icon
          aria-label="تعديل"
          title="تعديل"
          disabled={busy}
          onClick={() => setEditing(true)}
        >
          <Pencil size={14} />
        </S.Button>
        <S.Button
          type="button"
          $variant="ghost"
          $size="sm"
          $icon
          aria-label="حذف"
          title="حذف"
          disabled={busy}
          onClick={() =>
            window.confirm("حذف هذا الاقتباس نهائياً؟") &&
            run(() => onRemove(q._id))
          }
        >
          <Trash2 size={14} />
        </S.Button>
        <S.Switch
          type="button"
          role="switch"
          aria-checked={q.active}
          aria-label={q.active ? "إخفاء من التطبيق" : "إظهار في التطبيق"}
          title={q.active ? "ظاهر في التطبيق" : "مخفي من التطبيق"}
          $on={q.active}
          disabled={busy}
          onClick={() => run(() => onUpdate(q._id, { active: !q.active }))}
          style={{ marginInlineStart: "0.375rem" }}
        />
      </S.Row>
    </S.QuoteItem>
  );
});

const QUOTES_PAGE = 50;

const QuotesTab = memo(({ accessToken, onAuthError }) => {
  const qs = useQuotes(accessToken, onAuthError);
  const daily = useAdminGet(
    accessToken,
    onAuthError,
    qs.items.length
      ? `/quotes/daily?n=${qs.items.filter((q) => q.active).length}`
      : null,
  );
  const [adding, setAdding] = useState(false);
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(QUOTES_PAGE);

  const rows = useMemo(() => {
    const test = QUOTE_VIEWS.find((v) => v.id === view).test;
    const q = normalizeAr(query);
    return qs.items.filter(
      (x) => test(x) && (!q || normalizeAr(x.textAr).includes(q)),
    );
  }, [qs.items, view, query]);

  useEffect(() => setShown(QUOTES_PAGE), [view, query]);

  const todayId = daily.data?._id;
  const activeCount = qs.items.filter((q) => q.active).length;

  const exportCsv = () => {
    const lines = [
      ["الاقتباس", "الحالة", "تاريخ الإضافة"],
      ...qs.items.map((q) => [
        q.textAr,
        q.active ? "ظاهر" : "مخفي",
        exportDateTime(q.createdAt),
      ]),
    ];
    downloadFile(
      `﻿${lines.map((r) => r.map(csvCell).join(",")).join("\r\n")}`,
      `quotes-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv;charset=utf-8",
    );
  };

  return (
    <S.Page>
      <PageHeader icon={contentIcon} title="الاقتباسات">
        {qs.items.length > 0 && (
          <S.Button type="button" onClick={exportCsv}>
            <Download size={15} />
            تصدير
          </S.Button>
        )}
        <S.Button
          type="button"
          $variant="primary"
          onClick={() => setAdding(true)}
        >
          <Plus size={15} />
          إضافة اقتباسات
        </S.Button>
      </PageHeader>

      {adding && (
        <QuoteAddCard
          existing={qs.items}
          onAdd={qs.add}
          onClose={() => setAdding(false)}
        />
      )}

      <LoadState
        loading={qs.loading && !qs.items.length}
        error={qs.error}
        onRetry={qs.reload}
      >
        {qs.items.length === 0 ? (
          !adding && (
            <S.EmptyState>
              <S.Illustration src={contentImage} alt="" $w="200px" />
              <S.Heading $size="1.125rem">اقتباس ملهم كل يوم</S.Heading>
              <S.Text $muted>
                أضف اقتباساتك هنا. يظهر اقتباس مختلف كل يوم في التطبيق.
              </S.Text>
              <S.Button
                type="button"
                $variant="primary"
                onClick={() => setAdding(true)}
              >
                <Plus size={15} />
                إضافة اقتباسات
              </S.Button>
            </S.EmptyState>
          )
        ) : (
          <>
            <S.ContentSplit>
              <S.Card $padding="1.5rem" $gap="0.875rem">
                <S.Row $between>
                  <S.CardLabel>اقتباس اليوم في التطبيق</S.CardLabel>
                  <Sparkles size={16} style={{ color: "#f59e0b" }} />
                </S.Row>
                {daily.data?.textAr ? (
                  <S.DailyQuote>{daily.data.textAr}</S.DailyQuote>
                ) : (
                  <S.Text $muted>
                    {daily.loading ? "..." : "لا توجد اقتباسات ظاهرة"}
                  </S.Text>
                )}
                <S.Text $muted $size="0.75rem">
                  يتغير تلقائياً كل يوم، ويراه كل المستخدمين في التطبيق.
                </S.Text>
              </S.Card>
              <S.Grid $cols={2}>
                <StatCard label="كل الاقتباسات" value={num(qs.items.length)} />
                <StatCard
                  label="ظاهرة في التطبيق"
                  value={num(activeCount)}
                  hint={
                    activeCount
                      ? `تكفي ${num(activeCount)} يوماً دون تكرار تقريباً`
                      : undefined
                  }
                />
              </S.Grid>
            </S.ContentSplit>

            <S.Card $flush $overflow>
              <S.ViewTabs role="tablist">
                {QUOTE_VIEWS.map((v) => (
                  <S.ViewTab
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={view === v.id}
                    $active={view === v.id}
                    onClick={() => setView(v.id)}
                  >
                    {v.label}
                    <S.MenuCount>
                      {num(qs.items.filter(v.test).length)}
                    </S.MenuCount>
                  </S.ViewTab>
                ))}
              </S.ViewTabs>
              <S.FilterBar>
                <S.SearchField style={{ maxWidth: "22rem", flex: 1 }}>
                  <Search size={15} />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ابحث في الاقتباسات"
                  />
                </S.SearchField>
                <S.Text $muted $size="0.75rem">
                  اضغط مرتين على النص لتعديله
                </S.Text>
              </S.FilterBar>
              {rows.length === 0 ? (
                <S.Text $muted $center style={{ padding: "2.5rem 1rem" }}>
                  لا توجد اقتباسات تطابق البحث.
                </S.Text>
              ) : (
                <div>
                  {rows.slice(0, shown).map((q) => (
                    <QuoteRow
                      key={`${q._id}-${q.updatedAt}`}
                      q={q}
                      isToday={q._id === todayId}
                      onUpdate={qs.update}
                      onRemove={qs.remove}
                    />
                  ))}
                </div>
              )}
              <S.TableFooter>
                <span>
                  {num(Math.min(shown, rows.length))} من {num(rows.length)}{" "}
                  اقتباس
                </span>
                {shown < rows.length && (
                  <S.LinkButton
                    type="button"
                    onClick={() => setShown((n) => n + QUOTES_PAGE)}
                  >
                    عرض المزيد
                  </S.LinkButton>
                )}
              </S.TableFooter>
            </S.Card>
          </>
        )}
      </LoadState>
    </S.Page>
  );
});

/* ============================================================
   Health booklet (الكتيب الصحي + سجل الكتيبات)
   ============================================================ */

// Side-menu names. Keep NavSide.jsx in sync with these (aliases are accepted too).
const BOOKLET_TAB = "الكتيب الصحي";
const BOOKLET_HISTORY_TAB = "سجل الكتيبات";
const BOOKLET_TAB_NAMES = [
  BOOKLET_TAB,
  "الكتيب",
  "كتيب صحي",
  "الكتيبات الصحية",
];
const BOOKLET_HISTORY_TAB_NAMES = [
  BOOKLET_HISTORY_TAB,
  "الكتيبات",
  "سجل الكتيب",
];

const BOOKLET_CONDITIONS = [
  ["diabetes", "السكري"],
  ["hypertension", "ارتفاع الضغط"],
  ["dyslipidemia", "ارتفاع الدهون"],
  ["ckd", "مرض الكلى المزمن"],
  ["cad", "أمراض القلب"],
  ["fatty_liver", "الكبد الدهني"],
  ["asthma", "الربو"],
  ["copd", "الانسداد الرئوي"],
  ["hypothyroid", "قصور الغدة"],
];
const CONDITION_LABEL = Object.fromEntries(BOOKLET_CONDITIONS);

// [key, label, min, max] — same plausible ranges the server uses
const BOOKLET_FIELDS = [
  ["weightKg", "الوزن (كغ)", 20, 350],
  ["heightCm", "الطول (سم)", 100, 250],
  ["waistCm", "محيط الخصر (سم)", 40, 250],
  ["systolic", "الضغط الانقباضي", 60, 260],
  ["diastolic", "الضغط الانبساطي", 30, 160],
  ["activityMinPerWeek", "دقائق النشاط أسبوعياً", 0, 5000],
  ["sittingHours", "ساعات الجلوس يومياً", 0, 24],
  ["sleepHours", "ساعات النوم", 0, 24],
  ["sugaryDrinksPerDay", "مشروبات محلاة يومياً", 0, 50],
  ["vegFruitServings", "حصص خضار وفاكهة يومياً", 0, 30],
  ["stress", "التوتر (0–10)", 0, 10],
];

const BOOKLET_SMOKING = [
  ["never", "لا يدخن"],
  ["former", "مدخن سابق"],
  ["cigarettes", "سجائر"],
  ["shisha", "شيشة"],
  ["vape", "إلكتروني"],
  ["mixed", "أكثر من نوع"],
];

const BOOKLET_CATEGORIES = [
  ["summary", "ملخص"],
  ["followup", "متابعة طبية"],
  ["diet", "الغذاء"],
  ["activity", "الحركة"],
  ["sleep", "النوم والراحة"],
  ["lifestyle", "نمط الحياة"],
];
const BOOKLET_CATEGORY_LABEL = Object.fromEntries(BOOKLET_CATEGORIES);

const LAB_STATUS = {
  normal: { label: "طبيعي", tone: "success" },
  borderline: { label: "حدّي", tone: "warning" },
  high: { label: "مرتفع", tone: "danger" },
  low: { label: "منخفض", tone: "danger" },
};

const PRINT_MODES = [
  {
    id: "booklet",
    label: "كتيب مطوي",
    hint: "A4 أفقي، وجهين، القلب من الحافة القصيرة، ثم اطوِ الأوراق ودبّسها من المنتصف.",
  },
  {
    id: "pages",
    label: "صفحات A5",
    hint: 'صفحة A5 لكل ورقة، أو اختر "Booklet" من إعدادات الطابعة.',
  },
];

const BOOKLET_PREFS_KEY = "dashboard.booklet.prefs";
const loadBookletPrefs = () => {
  try {
    return {
      doctorName: "",
      clinicName: "",
      clinicPhone: "",
      mode: "booklet",
      ...JSON.parse(localStorage.getItem(BOOKLET_PREFS_KEY) || "{}"),
    };
  } catch {
    return { doctorName: "", clinicName: "", clinicPhone: "", mode: "booklet" };
  }
};
const saveBookletPrefs = (prefs) => {
  try {
    localStorage.setItem(BOOKLET_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
};

const intakeOutOfRange = (key, value) => {
  if (value === "" || value == null) return false;
  const f = BOOKLET_FIELDS.find(([k]) => k === key);
  const n = Number(value);
  return !Number.isFinite(n) || n < f[2] || n > f[3];
};

const bmiPreview = (intake) => {
  const w = Number(intake.weightKg);
  const h = Number(intake.heightCm) / 100;
  return w > 0 && h > 0 ? Math.round((w / (h * h)) * 10) / 10 : null;
};

const ageGapLabel = (bio) => {
  if (!bio) return "";
  const gap = Math.round((bio.biologicalAge - bio.actualAge) * 10) / 10;
  if (gap > 0) return `أكبر بـ ${num(gap)} سنة`;
  if (gap < 0) return `أصغر بـ ${num(Math.abs(gap))} سنة`;
  return "مطابق للعمر الفعلي";
};

/* ---------- Printing ---------- */

// Renders the booklet on its own under <body> and prints only that.
// Everything else on the page (sidebar, top bar, the editor) is hidden while printing.
const BOOKLET_PRINT_CSS = `
@media screen { .hb-print-portal { display: none !important; } }
@media print {
  body > *:not(.hb-print-portal) { display: none !important; }
  .hb-print-portal { display: block !important; }
  html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
}`;

const BookletPrintPortal = ({ job, onDone }) => {
  const [host] = useState(() => {
    const el = document.createElement("div");
    el.className = "hb-print-portal";
    return el;
  });

  useEffect(() => {
    document.body.appendChild(host);
    return () => host.remove();
  }, [host]);

  useEffect(() => {
    if (!job) return undefined;
    let cancelled = false;
    const finish = () => onDone?.();
    window.addEventListener("afterprint", finish, { once: true });
    // wait for the Arabic font, so the first print is not in a fallback font
    const ready = document.fonts?.ready ?? Promise.resolve();
    const timer = setTimeout(() => {
      Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]).then(
        () => {
          if (!cancelled) window.print();
        },
      );
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("afterprint", finish);
    };
  }, [job, onDone]);

  return createPortal(
    <>
      <style>{BOOKLET_PRINT_CSS}</style>
      {job && (
        <HealthBookletPrint key={job.key} data={job.data} mode={job.mode} />
      )}
    </>,
    host,
  );
};

/* ---------- Data ---------- */

const callBooklet = (fn, onAuthError) =>
  callApi(fn, onAuthError).then((r) => r.data);

const usePatientSearch = (accessToken, onAuthError, query) => {
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);
  return useAdminGet(
    accessToken,
    onAuthError,
    `/health-booklet/patients?limit=20${debounced ? `&q=${encodeURIComponent(debounced)}` : ""}`,
  );
};

/* ---------- Pieces ---------- */

const PatientPicker = memo(({ accessToken, onAuthError, onPick }) => {
  const [query, setQuery] = useState("");
  const search = usePatientSearch(accessToken, onAuthError, query);
  const list = Array.isArray(search.data) ? search.data : [];

  return (
    <S.Card $flush $overflow>
      <S.FilterBar>
        <S.SearchField style={{ flex: 1 }}>
          <Search size={15} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالاسم أو الجوال أو رقم الملف"
            autoFocus
          />
        </S.SearchField>
      </S.FilterBar>
      {search.error ? (
        <S.Text $center style={{ padding: "2rem 1rem", color: T.danger }}>
          {search.error}{" "}
          <S.LinkButton type="button" onClick={search.reload}>
            إعادة المحاولة
          </S.LinkButton>
        </S.Text>
      ) : search.loading && !list.length ? (
        <S.Text $muted $center style={{ padding: "2rem 1rem" }}>
          جاري البحث...
        </S.Text>
      ) : list.length === 0 ? (
        <S.Text $muted $center style={{ padding: "2rem 1rem" }}>
          لا يوجد مريض بهذا البحث.
        </S.Text>
      ) : (
        <S.TableScroll>
          <S.DataTable>
            <thead>
              <tr>
                <th>المريض</th>
                <th>رقم الملف</th>
                <th>الجوال</th>
                <th>العمر</th>
                <th>آخر كتيب</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr
                  key={p._id}
                  onClick={() => onPick(p)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <S.Row $gap="0.625rem" style={{ minWidth: 0 }}>
                      <S.InitialAvatar aria-hidden="true">
                        {initialsOf(p.name)}
                      </S.InitialAvatar>
                      <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
                        <S.Ellipsis style={{ fontWeight: 600 }}>
                          {p.name || "بدون اسم"}
                        </S.Ellipsis>
                        {!p.hasEmr && (
                          <S.Text
                            as="span"
                            $size="0.6875rem"
                            style={{ color: T.warning }}
                          >
                            غير مربوط بملف طبي (لا فحوصات)
                          </S.Text>
                        )}
                      </S.Stack>
                    </S.Row>
                  </td>
                  <td>{p.mrn || "—"}</td>
                  <td style={{ direction: "ltr", textAlign: "right" }}>
                    {p.phone || "—"}
                  </td>
                  <td>{p.age != null ? num(p.age) : "—"}</td>
                  <td>{p.lastBookletAt ? formatDate(p.lastBookletAt) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </S.DataTable>
        </S.TableScroll>
      )}
    </S.Card>
  );
});

const AdviceEditorItem = memo(({ item, index, onChange, onRemove }) => (
  <S.SubCard style={{ opacity: item.included ? 1 : 0.5 }}>
    <S.Row $between $gap="0.5rem" $wrap>
      <S.Row $gap="0.5rem">
        <S.Check $bold>
          <input
            type="checkbox"
            checked={item.included}
            onChange={(e) => onChange(index, { included: e.target.checked })}
          />
          تضمين
        </S.Check>
        {item.ruleId === "custom" ? (
          <S.Select
            value={item.category}
            onChange={(e) => onChange(index, { category: e.target.value })}
            style={{ width: "auto", minHeight: "2rem", padding: "0 0.5rem" }}
            aria-label="التصنيف"
          >
            {BOOKLET_CATEGORIES.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </S.Select>
        ) : (
          <S.StatusBadge $tone="neutral">
            {BOOKLET_CATEGORY_LABEL[item.category] || item.category}
          </S.StatusBadge>
        )}
        {item.priority === 1 && (
          <S.StatusBadge $tone="danger">أولوية</S.StatusBadge>
        )}
        {item.ruleId === "custom" && (
          <S.StatusBadge $tone="success">من الطبيب</S.StatusBadge>
        )}
      </S.Row>
      {item.ruleId === "custom" && (
        <S.Button
          type="button"
          $variant="ghost"
          $size="sm"
          $icon
          aria-label="حذف النصيحة"
          onClick={() => onRemove(index)}
        >
          <Trash2 size={14} />
        </S.Button>
      )}
    </S.Row>
    <S.Input
      value={item.title}
      onChange={(e) => onChange(index, { title: e.target.value })}
      placeholder="العنوان"
      style={{ fontWeight: 700 }}
      disabled={!item.included}
    />
    <S.Textarea
      rows={3}
      value={item.body}
      onChange={(e) => onChange(index, { body: e.target.value })}
      placeholder="النص"
      disabled={!item.included}
    />
    {item.because && (
      <S.Text $muted $size="0.75rem">
        السبب: {item.because}
      </S.Text>
    )}
  </S.SubCard>
));

const LabsCard = ({ labs }) => (
  <S.Card $padding="1.25rem" $gap="0.75rem">
    <S.Row $between>
      <S.Heading $size="0.9375rem">الفحوصات</S.Heading>
      <S.Text as="span" $muted $size="0.75rem">
        آخر سنة
      </S.Text>
    </S.Row>
    {labs.length === 0 ? (
      <S.Text $muted $size="0.8125rem">
        لا توجد فحوصات مطابقة خلال آخر سنة. ستُبنى النصائح على نمط الحياة
        والأمراض المزمنة فقط.
      </S.Text>
    ) : (
      <S.Stack $gap="0">
        {labs.map((l) => {
          const st = LAB_STATUS[l.status] || LAB_STATUS.normal;
          return (
            <S.Row
              key={l.key}
              $between
              $gap="0.5rem"
              style={{
                padding: "0.4rem 0",
                borderBottom: `1px solid ${T.divider}`,
              }}
            >
              <S.Ellipsis style={{ fontSize: "0.8125rem" }}>
                {l.label}
              </S.Ellipsis>
              <S.Row $gap="0.5rem" style={{ flexShrink: 0 }}>
                <span
                  style={{
                    direction: "ltr",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}
                >
                  {l.value}{" "}
                  <small style={{ color: T.textSubtle }}>{l.unit}</small>
                </span>
                <S.StatusBadge $tone={st.tone}>{st.label}</S.StatusBadge>
              </S.Row>
            </S.Row>
          );
        })}
      </S.Stack>
    )}
  </S.Card>
);

/* ============================================================
   Tab: الكتيب الصحي
   ============================================================ */

const EMPTY_INTAKE = { smoking: "never" };

const BookletTab = memo(
  ({
    accessToken,
    onAuthError,
    initialPatient,
    onInitialPatientUsed,
    onGoTab,
  }) => {
    const [patient, setPatient] = useState(null);
    const [comorbidities, setComorbidities] = useState([]);
    const [intake, setIntake] = useState(EMPTY_INTAKE);
    const [draft, setDraft] = useState(null);
    const [edited, setEdited] = useState(false);
    const [latest, setLatest] = useState(null);
    const [prefs, setPrefs] = useState(loadBookletPrefs);
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(null);
    const [printJob, setPrintJob] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => saveBookletPrefs(prefs), [prefs]);

    const pick = useCallback(
      async (p) => {
        setPatient(p);
        setDraft(null);
        setEdited(false);
        setSaved(null);
        setError("");
        setLatest(null);
        setComorbidities([]);
        setIntake(EMPTY_INTAKE);
        // Start from the last booklet's answers so the doctor only updates what changed
        try {
          const last = await callBooklet(
            () => userRequest.get(`/health-booklet/${p._id}/latest`),
            onAuthError,
          );
          setLatest(last);
          setComorbidities(last.comorbidities || []);
          setIntake({
            ...EMPTY_INTAKE,
            ...Object.fromEntries(
              Object.entries(last.intake || {}).map(([k, v]) => [
                k,
                v == null ? "" : String(v),
              ]),
            ),
          });
        } catch {
          /* no previous booklet */
        }
      },
      [onAuthError],
    );

    // "كتيب جديد" from the history tab
    useEffect(() => {
      if (!initialPatient) return;
      pick(initialPatient);
      onInitialPatientUsed?.();
    }, [initialPatient, onInitialPatientUsed, pick]);

    const toggleCondition = (code) =>
      setComorbidities((c) =>
        c.includes(code) ? c.filter((x) => x !== code) : [...c, code],
      );

    const badFields = BOOKLET_FIELDS.filter(([k]) =>
      intakeOutOfRange(k, intake[k]),
    );

    const generate = async () => {
      if (
        edited &&
        !window.confirm("إعادة التوليد ستلغي تعديلاتك على النصائح. متابعة؟")
      )
        return;
      setBusy("generate");
      setError("");
      setSaved(null);
      try {
        const d = await callBooklet(
          () =>
            userRequest.post(`/health-booklet/${patient._id}/draft`, {
              comorbidities,
              intake,
            }),
          onAuthError,
        );
        setDraft({
          ...d,
          goals: [...(d.goals || []), "", "", ""].slice(0, 3),
          doctorNote: "",
          followUpDate: "",
          nextLabs: "",
        });
        setEdited(false);
      } catch (err) {
        setError(apiMessage(err, "تعذّر توليد النصائح"));
      } finally {
        setBusy("");
      }
    };

    const updateDraft = (patch) => {
      setDraft((d) => ({ ...d, ...patch }));
      setEdited(true);
      setSaved(null);
    };
    const updateItem = useCallback((i, patch) => {
      setDraft((d) => ({
        ...d,
        items: d.items.map((it, j) => (j === i ? { ...it, ...patch } : it)),
      }));
      setEdited(true);
      setSaved(null);
    }, []);
    const removeItem = useCallback((i) => {
      setDraft((d) => ({ ...d, items: d.items.filter((_, j) => j !== i) }));
      setEdited(true);
    }, []);
    const addCustom = () =>
      updateDraft({
        items: [
          ...draft.items,
          {
            ruleId: "custom",
            category: "lifestyle",
            priority: 2,
            title: "",
            body: "",
            because: "",
            included: true,
          },
        ],
      });

    // What the preview / print shows
    const printable = useMemo(
      () =>
        draft && {
          ...draft,
          goals: draft.goals.filter((g) => g.trim()),
          doctorName: prefs.doctorName,
          clinic: { name: prefs.clinicName, phone: prefs.clinicPhone },
          date: new Date(),
        },
      [draft, prefs.doctorName, prefs.clinicName, prefs.clinicPhone],
    );

    const included = draft ? draft.items.filter((i) => i.included).length : 0;

    const saveAndPrint = async () => {
      const bad = draft.items.find(
        (i) => i.included && (!i.title.trim() || !i.body.trim()),
      );
      if (bad)
        return setError(
          "كل نصيحة مضمّنة تحتاج عنواناً ونصاً، أو أزل علامة التضمين.",
        );
      if (!included) return setError("اختر نصيحة واحدة على الأقل.");
      setBusy("save");
      setError("");
      try {
        const doc = await callBooklet(
          () =>
            userRequest.post(`/health-booklet/${patient._id}`, {
              comorbidities: draft.comorbidities,
              intake: draft.intake,
              items: draft.items,
              goals: draft.goals,
              doctorNote: draft.doctorNote,
              followUpDate: draft.followUpDate || null,
              nextLabs: draft.nextLabs,
              doctorName: prefs.doctorName,
              clinic: { name: prefs.clinicName, phone: prefs.clinicPhone },
            }),
          onAuthError,
        );
        setSaved(doc);
        setEdited(false);
        // print exactly what was saved (lab values come from the server)
        setPrintJob({ key: Date.now(), data: doc, mode: prefs.mode });
      } catch (err) {
        setError(apiMessage(err, "تعذّر حفظ الكتيب"));
      } finally {
        setBusy("");
      }
      return undefined;
    };

    const clearPrintJob = useCallback(() => setPrintJob(null), []);
    const portal = <BookletPrintPortal job={printJob} onDone={clearPrintJob} />;

    /* ----- Step 1: choose a patient ----- */
    if (!patient) {
      return (
        <S.Page>
          <PageHeader icon={contentIcon} title="الكتيب الصحي">
            <S.Button
              type="button"
              onClick={() => onGoTab(BOOKLET_HISTORY_TAB)}
            >
              <History size={15} />
              سجل الكتيبات
            </S.Button>
          </PageHeader>
          <S.Notice>
            <BookOpen size={16} />
            <span>
              اختر المريض، أكّد حالته ونمط حياته، ثم تُولَّد النصائح من فحوصاته
              وعمره الحيوي. يراجعها الطبيب ويعدّلها قبل الطباعة.
            </span>
          </S.Notice>
          <PatientPicker
            accessToken={accessToken}
            onAuthError={onAuthError}
            onPick={pick}
          />
          {portal}
        </S.Page>
      );
    }

    const bmi = bmiPreview(intake);
    const mode = PRINT_MODES.find((m) => m.id === prefs.mode) || PRINT_MODES[0];

    /* ----- Step 2: intake, review, print ----- */
    return (
      <S.Page $max="1200px">
        <S.Row $between $wrap $gap="1rem">
          <S.Row style={{ minWidth: 0 }}>
            <S.Button
              type="button"
              $variant="ghost"
              $icon
              aria-label="تغيير المريض"
              onClick={() =>
                (!edited ||
                  window.confirm("ستفقد التعديلات غير المحفوظة. متابعة؟")) &&
                setPatient(null)
              }
            >
              <ChevronRight size={18} />
            </S.Button>
            <S.Stack $gap="0.125rem" style={{ minWidth: 0 }}>
              <S.PageTitle style={{ minWidth: 0 }}>
                <S.Ellipsis>الكتيب الصحي · {patient.name || "مريض"}</S.Ellipsis>
              </S.PageTitle>
              <S.Text $muted $size="0.8125rem">
                {[
                  patient.age != null && `${num(patient.age)} سنة`,
                  patient.mrn && `ملف ${patient.mrn}`,
                  patient.phone,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </S.Text>
            </S.Stack>
          </S.Row>
          {latest && (
            <S.Button
              type="button"
              onClick={() =>
                setPrintJob({ key: Date.now(), data: latest, mode: prefs.mode })
              }
            >
              <Printer size={15} />
              طباعة آخر كتيب ({formatDate(latest.signedAt)})
            </S.Button>
          )}
        </S.Row>

        {error && <S.Alert>{error}</S.Alert>}
        {saved && (
          <S.Notice>
            <Check size={16} style={{ color: T.success }} />
            <span>تم حفظ الكتيب وفُتحت نافذة الطباعة.</span>
            <S.LinkButton
              type="button"
              onClick={() =>
                setPrintJob({ key: Date.now(), data: saved, mode: prefs.mode })
              }
            >
              طباعة مرة أخرى
            </S.LinkButton>
          </S.Notice>
        )}

        <S.EditorGrid>
          {/* ---------- Main column ---------- */}
          <S.Stack $gap="1rem">
            <S.Card $padding="1.25rem" $gap="0.875rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">الأمراض المزمنة</S.Heading>
                {latest && (
                  <S.Text as="span" $muted $size="0.75rem">
                    من آخر كتيب
                  </S.Text>
                )}
              </S.Row>
              <S.Row $wrap $gap="0.5rem 1.25rem">
                {BOOKLET_CONDITIONS.map(([code, label]) => (
                  <S.Check key={code}>
                    <input
                      type="checkbox"
                      checked={comorbidities.includes(code)}
                      onChange={() => toggleCondition(code)}
                    />
                    {label}
                  </S.Check>
                ))}
              </S.Row>
            </S.Card>

            <S.Card $padding="1.25rem" $gap="0.875rem">
              <S.Row $between>
                <S.Heading $size="0.9375rem">نمط الحياة والقياسات</S.Heading>
                <S.Text as="span" $muted $size="0.75rem">
                  {bmi
                    ? `مؤشر كتلة الجسم ${num(bmi)}`
                    : "اترك الحقل فارغاً إن لم يُسأل"}
                </S.Text>
              </S.Row>
              <S.BookletFields>
                {BOOKLET_FIELDS.map(([k, label]) => (
                  <S.Field key={k}>
                    <S.FieldLabel $small>{label}</S.FieldLabel>
                    <S.Input
                      type="number"
                      inputMode="decimal"
                      value={intake[k] ?? ""}
                      onChange={(e) =>
                        setIntake((x) => ({ ...x, [k]: e.target.value }))
                      }
                      style={
                        intakeOutOfRange(k, intake[k])
                          ? { borderColor: T.danger }
                          : undefined
                      }
                      aria-invalid={intakeOutOfRange(k, intake[k])}
                    />
                  </S.Field>
                ))}
                <S.Field>
                  <S.FieldLabel $small>التدخين</S.FieldLabel>
                  <S.Select
                    value={intake.smoking}
                    onChange={(e) =>
                      setIntake((x) => ({ ...x, smoking: e.target.value }))
                    }
                  >
                    {BOOKLET_SMOKING.map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </S.Select>
                </S.Field>
              </S.BookletFields>
              {badFields.length > 0 && (
                <S.Text $size="0.75rem" style={{ color: T.danger }}>
                  قيم غير منطقية وسيتم تجاهلها:{" "}
                  {badFields.map(([, l]) => l).join("، ")}
                </S.Text>
              )}
              <S.Row style={{ justifyContent: "flex-end" }}>
                <S.Button
                  type="button"
                  $variant={draft ? "secondary" : "primary"}
                  disabled={busy === "generate"}
                  onClick={generate}
                >
                  <Sparkles size={15} />
                  {busy === "generate"
                    ? "جارٍ التوليد..."
                    : draft
                      ? "إعادة التوليد"
                      : "توليد النصائح"}
                </S.Button>
              </S.Row>
            </S.Card>

            {draft && (
              <>
                <S.Card $padding="1.25rem" $gap="0.75rem">
                  <S.Row $between $wrap $gap="0.5rem">
                    <S.Heading $size="0.9375rem">مراجعة النصائح</S.Heading>
                    <S.Text as="span" $muted $size="0.75rem">
                      {num(included)} من {num(draft.items.length)} ستُطبع
                    </S.Text>
                  </S.Row>
                  {draft.items.length === 0 && (
                    <S.Text $muted $size="0.8125rem">
                      لم تنتج البيانات أي نصيحة تلقائية. أضف نصيحة من الطبيب.
                    </S.Text>
                  )}
                  {draft.items.map((it, i) => (
                    <AdviceEditorItem
                      key={i}
                      item={it}
                      index={i}
                      onChange={updateItem}
                      onRemove={removeItem}
                    />
                  ))}
                  <div>
                    <S.Button type="button" $size="sm" onClick={addCustom}>
                      <Plus size={14} />
                      نصيحة من الطبيب
                    </S.Button>
                  </div>
                </S.Card>

                <S.Card $padding="1.25rem" $gap="0.75rem">
                  <S.Heading $size="0.9375rem">
                    أهداف المريض لـ 12 أسبوعاً
                  </S.Heading>
                  <S.Text $muted $size="0.75rem">
                    تظهر في صفحة المتابعة الأسبوعية. اتركها فارغة ليكتبها المريض
                    بيده.
                  </S.Text>
                  {[0, 1, 2].map((i) => (
                    <S.Row key={i} $gap="0.5rem">
                      <S.IconBubble
                        style={{
                          width: 28,
                          height: 28,
                          fontSize: "0.75rem",
                          flexShrink: 0,
                        }}
                      >
                        {num(i + 1)}
                      </S.IconBubble>
                      <S.Input
                        value={draft.goals[i] ?? ""}
                        onChange={(e) => {
                          const g = [...draft.goals];
                          g[i] = e.target.value;
                          updateDraft({ goals: g });
                        }}
                        placeholder="هدف قابل للقياس، مثال: مشي 30 دقيقة 5 أيام في الأسبوع"
                      />
                    </S.Row>
                  ))}
                </S.Card>

                <S.Card $padding="1.25rem" $gap="0.875rem">
                  <S.Heading $size="0.9375rem">
                    المتابعة وملاحظة الطبيب
                  </S.Heading>
                  <S.FormGrid>
                    <S.Field>
                      <S.FieldLabel $small>موعد المراجعة القادم</S.FieldLabel>
                      <S.Input
                        type="date"
                        value={draft.followUpDate}
                        onChange={(e) =>
                          updateDraft({ followUpDate: e.target.value })
                        }
                      />
                    </S.Field>
                    <S.Field>
                      <S.FieldLabel $small>الفحوصات المطلوبة قبله</S.FieldLabel>
                      <S.Input
                        value={draft.nextLabs}
                        onChange={(e) =>
                          updateDraft({ nextLabs: e.target.value })
                        }
                        placeholder="إعادة فحوصات العمر الحيوي"
                      />
                    </S.Field>
                  </S.FormGrid>
                  <S.Field>
                    <S.FieldLabel $small>ملاحظة الطبيب</S.FieldLabel>
                    <S.Textarea
                      rows={3}
                      value={draft.doctorNote}
                      onChange={(e) =>
                        updateDraft({ doctorNote: e.target.value })
                      }
                    />
                  </S.Field>
                </S.Card>
              </>
            )}
          </S.Stack>

          {/* ---------- Side column ---------- */}
          <S.Stack $gap="1rem">
            {draft && (
              <S.Card $padding="1.25rem" $gap="0.875rem">
                <S.Heading $size="0.9375rem">الطباعة</S.Heading>
                <S.Segmented role="tablist" style={{ alignSelf: "stretch" }}>
                  {PRINT_MODES.map((m) => (
                    <S.SegmentButton
                      key={m.id}
                      type="button"
                      role="tab"
                      aria-selected={prefs.mode === m.id}
                      $active={prefs.mode === m.id}
                      onClick={() => setPrefs((p) => ({ ...p, mode: m.id }))}
                      style={{ flex: 1 }}
                    >
                      {m.label}
                    </S.SegmentButton>
                  ))}
                </S.Segmented>
                <S.Text $muted $size="0.75rem">
                  {mode.hint}
                </S.Text>
                <S.Button
                  type="button"
                  $variant="primary"
                  disabled={busy === "save" || !included}
                  onClick={saveAndPrint}
                >
                  <Printer size={15} />
                  {busy === "save" ? "جارٍ الحفظ..." : "حفظ وطباعة"}
                </S.Button>
                <S.Button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                >
                  <Eye size={15} />
                  {showPreview ? "إخفاء المعاينة" : "معاينة الكتيب"}
                </S.Button>
              </S.Card>
            )}

            {draft && (
              <S.Card $padding="1.25rem" $gap="0.5rem">
                <S.Heading $size="0.9375rem">العمر الحيوي</S.Heading>
                {draft.bio ? (
                  <>
                    <S.Row $gap="1rem">
                      <S.Stack $gap="0">
                        <S.MetricValue>
                          {num(draft.bio.biologicalAge)}
                        </S.MetricValue>
                        <S.Text $muted $size="0.75rem">
                          الحيوي
                        </S.Text>
                      </S.Stack>
                      <S.Stack $gap="0">
                        <S.MetricValue style={{ color: T.textSubtle }}>
                          {num(draft.bio.actualAge)}
                        </S.MetricValue>
                        <S.Text $muted $size="0.75rem">
                          الفعلي
                        </S.Text>
                      </S.Stack>
                    </S.Row>
                    <S.Text
                      $size="0.8125rem"
                      style={{
                        color:
                          draft.bio.biologicalAge > draft.bio.actualAge
                            ? T.danger
                            : T.success,
                        fontWeight: 600,
                      }}
                    >
                      {ageGapLabel(draft.bio)}
                    </S.Text>
                  </>
                ) : (
                  <S.Text $muted $size="0.8125rem">
                    لم يُحسب بعد لعدم اكتمال الفحوصات المطلوبة.
                  </S.Text>
                )}
              </S.Card>
            )}

            {draft && <LabsCard labs={draft.labs || []} />}

            <S.Card $padding="1.25rem" $gap="0.75rem">
              <S.Heading $size="0.9375rem">بيانات الطبيب والعيادة</S.Heading>
              <S.Field>
                <S.FieldLabel $small>اسم الطبيب</S.FieldLabel>
                <S.Input
                  value={prefs.doctorName}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, doctorName: e.target.value }))
                  }
                  placeholder="د. ..."
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>اسم العيادة</S.FieldLabel>
                <S.Input
                  value={prefs.clinicName}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, clinicName: e.target.value }))
                  }
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel $small>هاتف العيادة</S.FieldLabel>
                <S.Input
                  value={prefs.clinicPhone}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, clinicPhone: e.target.value }))
                  }
                  style={{ direction: "ltr" }}
                />
              </S.Field>
              <S.Text $muted $size="0.75rem">
                تُحفظ في هذا المتصفح وتظهر على الغلاف الخلفي وصفحة المتابعة.
              </S.Text>
            </S.Card>
          </S.Stack>
        </S.EditorGrid>

        {draft && showPreview && (
          <S.Card $flush $overflow>
            <S.Row $between style={{ padding: "0.875rem 1.25rem" }}>
              <S.Heading $size="0.9375rem">معاينة ({mode.label})</S.Heading>
              <S.Text as="span" $muted $size="0.75rem">
                هكذا ستُطبع الأوراق
              </S.Text>
            </S.Row>
            <S.BookletPreview>
              <HealthBookletPrint data={printable} mode={prefs.mode} />
            </S.BookletPreview>
          </S.Card>
        )}
        {portal}
      </S.Page>
    );
  },
);

/* ============================================================
   Tab: سجل الكتيبات
   ============================================================ */

const BOOKLET_HISTORY_VIEWS = [
  { id: "all", label: "الكل", test: () => true },
  {
    id: "due",
    label: "مراجعة خلال 14 يوماً",
    test: (b, now) =>
      b.followUpDate &&
      new Date(b.followUpDate) >= now &&
      new Date(b.followUpDate) - now <= 14 * 864e5,
  },
  {
    id: "overdue",
    label: "تجاوزت موعد المراجعة",
    test: (b, now) => b.followUpDate && new Date(b.followUpDate) < now,
  },
];

const BookletHistoryTab = memo(
  ({ accessToken, onAuthError, onNewForPatient }) => {
    const history = useAdminGet(
      accessToken,
      onAuthError,
      "/health-booklet?limit=500",
    );
    const [query, setQuery] = useState("");
    const [view, setView] = useState("all");
    const [printJob, setPrintJob] = useState(null);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState("");
    const mode = loadBookletPrefs().mode;

    const all = useMemo(
      () => (Array.isArray(history.data) ? history.data : []),
      [history.data],
    );
    const today = useMemo(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }, []);

    // Only the latest booklet per patient decides "due / overdue"
    const latestIds = useMemo(() => {
      const seen = new Set();
      const ids = new Set();
      all.forEach((b) => {
        const k = String(b.patientUser);
        if (!seen.has(k)) {
          seen.add(k);
          ids.add(b._id);
        }
      });
      return ids;
    }, [all]);

    const countFor = (v) =>
      all.filter(
        (b) => (v.id === "all" || latestIds.has(b._id)) && v.test(b, today),
      ).length;

    const rows = useMemo(() => {
      const v = BOOKLET_HISTORY_VIEWS.find((x) => x.id === view);
      const q = normalizeAr(query);
      return all.filter(
        (b) =>
          (view === "all" || latestIds.has(b._id)) &&
          v.test(b, today) &&
          (!q ||
            normalizeAr(`${b.patientName} ${b.mrn} ${b.doctorName}`).includes(
              q,
            )),
      );
    }, [all, view, query, latestIds, today]);

    const reprint = async (b) => {
      setBusyId(b._id);
      setError("");
      try {
        const data = await callBooklet(
          () => userRequest.get(`/health-booklet/booklet/${b._id}`),
          onAuthError,
        );
        setPrintJob({ key: Date.now(), data, mode });
      } catch (err) {
        setError(apiMessage(err, "تعذّر فتح الكتيب"));
      } finally {
        setBusyId(null);
      }
    };

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonth = all.filter(
      (b) => new Date(b.signedAt) >= monthStart,
    ).length;
    const clearPrintJob = useCallback(() => setPrintJob(null), []);

    return (
      <S.Page>
        <PageHeader icon={contentIcon} title="سجل الكتيبات">
          <S.Button
            type="button"
            $variant="primary"
            onClick={() => onNewForPatient(null)}
          >
            <Plus size={15} />
            كتيب جديد
          </S.Button>
        </PageHeader>

        {error && <S.Alert>{error}</S.Alert>}

        <LoadState
          loading={history.loading && !history.data}
          error={history.error}
          onRetry={history.reload}
        >
          {all.length === 0 ? (
            <S.EmptyState>
              <S.Illustration src={contentImage} alt="" $w="200px" />
              <S.Heading $size="1.125rem">لم يُطبع أي كتيب بعد</S.Heading>
              <S.Text $muted>
                كل كتيب تحفظه وتطبعه يظهر هنا، مع موعد المراجعة وإمكانية إعادة
                الطباعة.
              </S.Text>
              <S.Button
                type="button"
                $variant="primary"
                onClick={() => onNewForPatient(null)}
              >
                <Plus size={15} />
                كتيب جديد
              </S.Button>
            </S.EmptyState>
          ) : (
            <>
              <S.Grid $cols={3}>
                <StatCard label="كتيبات هذا الشهر" value={num(thisMonth)} />
                <StatCard
                  label="مراجعات خلال 14 يوماً"
                  value={num(countFor(BOOKLET_HISTORY_VIEWS[1]))}
                />
                <StatCard
                  label="تجاوزوا موعد المراجعة"
                  value={num(countFor(BOOKLET_HISTORY_VIEWS[2]))}
                />
              </S.Grid>

              <S.Card $flush $overflow>
                <S.ViewTabs role="tablist">
                  {BOOKLET_HISTORY_VIEWS.map((v) => (
                    <S.ViewTab
                      key={v.id}
                      type="button"
                      role="tab"
                      aria-selected={view === v.id}
                      $active={view === v.id}
                      onClick={() => setView(v.id)}
                    >
                      {v.label}
                      <S.MenuCount>{num(countFor(v))}</S.MenuCount>
                    </S.ViewTab>
                  ))}
                </S.ViewTabs>
                <S.FilterBar>
                  <S.SearchField style={{ maxWidth: "22rem", flex: 1 }}>
                    <Search size={15} />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="ابحث باسم المريض أو رقم الملف أو الطبيب"
                    />
                  </S.SearchField>
                </S.FilterBar>
                {rows.length === 0 ? (
                  <S.Text $muted $center style={{ padding: "2.5rem 1rem" }}>
                    لا توجد كتيبات هنا.
                  </S.Text>
                ) : (
                  <S.TableScroll>
                    <S.DataTable>
                      <thead>
                        <tr>
                          <th>المريض</th>
                          <th>العمر الحيوي</th>
                          <th>الحالة الصحية</th>
                          <th>النصائح</th>
                          <th>المراجعة</th>
                          <th>الطبيب</th>
                          <th>تاريخ الطباعة</th>
                          <th aria-label="إجراءات" />
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((b) => {
                          const overdue =
                            b.followUpDate &&
                            new Date(b.followUpDate) < today &&
                            latestIds.has(b._id);
                          return (
                            <tr key={b._id}>
                              <td>
                                <S.Stack $gap="0.125rem">
                                  <strong>{b.patientName || "—"}</strong>
                                  {b.mrn && (
                                    <S.Text as="span" $muted $size="0.6875rem">
                                      ملف {b.mrn}
                                    </S.Text>
                                  )}
                                </S.Stack>
                              </td>
                              <td>
                                {b.bio ? (
                                  <span
                                    style={{
                                      color:
                                        b.bio.biologicalAge > b.bio.actualAge
                                          ? T.danger
                                          : T.success,
                                      fontWeight: 600,
                                    }}
                                  >
                                    {num(b.bio.biologicalAge)}{" "}
                                    <S.Text as="span" $muted $size="0.6875rem">
                                      / {num(b.bio.actualAge)}
                                    </S.Text>
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td style={{ maxWidth: "14rem" }}>
                                <S.Ellipsis>
                                  {b.comorbidities
                                    .map((c) => CONDITION_LABEL[c] || c)
                                    .join("، ") || "—"}
                                </S.Ellipsis>
                              </td>
                              <td>{num(b.itemCount)}</td>
                              <td>
                                {b.followUpDate ? (
                                  <S.StatusBadge
                                    $tone={overdue ? "danger" : "neutral"}
                                  >
                                    {formatDate(b.followUpDate)}
                                  </S.StatusBadge>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td>{b.doctorName || "—"}</td>
                              <td>{formatDate(b.signedAt)}</td>
                              <td>
                                <S.Row
                                  $gap="0.25rem"
                                  style={{ justifyContent: "flex-end" }}
                                >
                                  <S.Button
                                    type="button"
                                    $variant="ghost"
                                    $size="sm"
                                    $icon
                                    aria-label="إعادة الطباعة"
                                    title="إعادة الطباعة"
                                    disabled={busyId === b._id}
                                    onClick={() => reprint(b)}
                                  >
                                    <Printer size={14} />
                                  </S.Button>
                                  <S.Button
                                    type="button"
                                    $variant="ghost"
                                    $size="sm"
                                    $icon
                                    aria-label="كتيب جديد لهذا المريض"
                                    title="كتيب جديد لهذا المريض"
                                    onClick={() =>
                                      onNewForPatient({
                                        _id: b.patientUser,
                                        name: b.patientName,
                                        mrn: b.mrn,
                                        age: b.age,
                                      })
                                    }
                                  >
                                    <Plus size={14} />
                                  </S.Button>
                                </S.Row>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </S.DataTable>
                  </S.TableScroll>
                )}
                <S.TableFooter>
                  <span>
                    {num(rows.length)} من {num(all.length)} كتيب
                  </span>
                </S.TableFooter>
              </S.Card>
            </>
          )}
        </LoadState>
        <BookletPrintPortal job={printJob} onDone={clearPrintJob} />
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

  // History → new booklet for a patient
  const [bookletPatient, setBookletPatient] = useState(null);
  const clearBookletPatient = useCallback(() => setBookletPatient(null), []);
  const newBookletFor = useCallback(
    (p) => {
      setBookletPatient(p);
      goToTab(BOOKLET_TAB);
    },
    [goToTab],
  );

  // Content → email hand-off
  const [emailDraft, setEmailDraft] = useState(null);
  const clearEmailDraft = useCallback(() => setEmailDraft(null), []);
  const shareByEmail = useCallback(
    (d) => {
      setEmailDraft(d);
      goToTab("التسويق");
    },
    [goToTab],
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
    setShowTimeout(false);
    dispatch(signOut());
    dispatch(clearState());
    navigate(LOGIN_PATH, { replace: true });
  }, [dispatch, navigate]);

  // 1) Show the popup the moment the token's own expiry time passes.
  //    Also re-check when the tab comes back into view (timers pause while a laptop sleeps).
  useEffect(() => {
    if (!accessToken) return undefined;
    const expiresAt = tokenExpiresAt(accessToken);
    if (!expiresAt) return undefined;

    const check = () => {
      if (Date.now() >= expiresAt) setShowTimeout(true);
    };
    check();
    const timer = setTimeout(
      check,
      Math.min(Math.max(expiresAt - Date.now(), 0) + 1000, 2147483647),
    );
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, [accessToken]);

  // 2) Any amanapi request rejected because of the session (e.g. the server ended it early)
  useEffect(() => {
    const interceptors = userRequest.interceptors?.response;
    if (!interceptors) return undefined;
    const id = interceptors.use(
      (res) => res,
      (err) => {
        if (isAuthFailure(err)) setShowTimeout(true);
        return Promise.reject(err);
      },
    );
    return () => interceptors.eject(id);
  }, []);

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
    if (CONTENT_TAB_NAMES.includes(activeTab)) {
      return (
        <ContentTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          onShareEmail={shareByEmail}
        />
      );
    }
    if (BOOKLET_TAB_NAMES.includes(activeTab)) {
      return (
        <BookletTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          initialPatient={bookletPatient}
          onInitialPatientUsed={clearBookletPatient}
          onGoTab={goToTab}
        />
      );
    }
    if (BOOKLET_HISTORY_TAB_NAMES.includes(activeTab)) {
      return (
        <BookletHistoryTab
          accessToken={accessToken}
          onAuthError={handleAuthError}
          onNewForPatient={newBookletFor}
        />
      );
    }
    if (QUOTES_TAB_NAMES.includes(activeTab)) {
      return (
        <QuotesTab accessToken={accessToken} onAuthError={handleAuthError} />
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
      case "التحليلات":
        return (
          <AnalyticsTab
            accessToken={accessToken}
            onAuthError={handleAuthError}
          />
        );
      case "الربورت":
        return (
          <ReportsTab accessToken={accessToken} onAuthError={handleAuthError} />
        );
      case "لايف":
        return (
          <LiveTab accessToken={accessToken} onAuthError={handleAuthError} />
        );
      case "التسويق":
        return (
          <MarketingTab
            accessToken={accessToken}
            onAuthError={handleAuthError}
            onGoTab={goToTab}
            draft={emailDraft}
            onDraftUsed={clearEmailDraft}
          />
        );
      case "الحملات":
        return (
          <CampaignsTab
            accessToken={accessToken}
            onAuthError={handleAuthError}
          />
        );
      case "الاتمته":
        return (
          <AutomationsTab
            accessToken={accessToken}
            onAuthError={handleAuthError}
          />
        );
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
