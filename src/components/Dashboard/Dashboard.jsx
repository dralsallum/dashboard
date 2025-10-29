import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setStoreName } from "../../redux/tabRedux";
import NavSide from "../NavSide/NavSide";
import {
  MaFirst,
  MaSec,
  MaAll,
  ContentSection,
  MainCon,
  LogoCon,
  LogoGrid,
  LogoDiv,
  LogoSubDiv,
  SearchWr,
  SearchCon,
  SearchSu,
  SearchSub,
  SearchRe,
  SearchBtn,
  InputWr,
  InputCon,
  InputSp,
  InputKbd,
  LogoImg,
  NavCon,
  MainSubCon,
  StartCon,
  StartDiv,
  StartSub,
  StartRe,
  StartSa,
  StartWa,
  StartLa,
  StartTop,
  TopUl,
  TopLi,
  TopStart,
  TopRe,
  TopAt,
  TopSelect,
  TopFlex,
  TopToo,
  TopSpan,
  TopSp,
  TopImg,
  TopBtn,
  TopRight,
  TopMore,
  MidWr,
  MidCo,
  MidUl,
  MidDiv,
  MidStart,
  MidSe,
  MidThi,
  MidLa,
  MidTop,
  ChWr,
  ChCo,
  ChHe,
  ChBtn,
  ChSpan,
  ChImg,
  MidMid,
  StoWr,
  StoTop,
  StoBot,
  StoMap,
  StoBtn,
  StoSpan,
  StoreBot,
  StoreTop,
  StoreHe,
  StoreMid,
  StoreEx,
  StoreBtn,
  StoreDiv,
  StoreSp,
  StoreImg,
  SiteWr,
  SiteMid,
  SiteDes,
  SiteBo,
  SiteWrap,
  SiteSp,
  SiteSpa,
  SiteAt,
  SiteBtn,
  SiteDiv,
  SiteEx,
  SiteFir,
  SiteSec,
  SiteThi,
  SiteSubThi,
  SiteSuThi,
  SiteSThi,
  SiteSubImg,
  SiteFou,
  CircleFi,
  CircleSe,
  CircleThi,
  CircleFou,
  CircleFiv,
  CircleSi,
  OreWr,
  OreCon,
  OreSubCon,
  OreTop,
  OreSubTop,
  OreSu,
  OreDivImg,
  OreHeDiv,
  OreHe,
  OreImg,
  OreTopRight,
  OreTopRi,
  OreTopFi,
  OreSubFi,
  OreSubBtn,
  OreSubImg,
  OreSpan,
  OreSpa,
  OreMid,
  OreMidSub,
  OreMidSu,
  OreFlex,
  CenterTop,
  CenterTopImg,
  CenterBot,
  CenterBotBtnDiv,
  CenterBotBtn,
  CenterBotSp,
  CenSp,
  CenDivMain,
  CenDiv,
  CenDivSp,
  OreBot,
  OreBotSub,
  OreBotBtn,
  OreBotPa,
  OreBotSpa,
  ProWr,
  ProCon,
  ProStart,
  ProSub,
  ProDiv,
  ProTop,
  ProTopSt,
  ProTopFl,
  ProTopLe,
  ProTopLef,
  ProTopLeft,
  ProTopLeftTo,
  ProTopLeftBtn,
  ProTopLeftSp,
  ProTopRightTo,
  ProTopPlus,
  ProPlus,
  ProUpDow,
  ProFilter,
  ProTopRi,
  ProTopRiDiv,
  ProTopRiBtn,
  ProBot,
  ProBo,
  ProBott,
  ProBottHe,
  ProBottPa,
  ProBottDiv,
  ProBottSp,
  ProBottBtn,
  ProMid,
  ProMidSub,
  ProMidStart,
  ProMidTop,
  ProMidImg,
  ProMidHe,
  ProMidPa,
  ProBtnWr,
  ProBtnFl,
  ProBtnLe,
  ProBtnSp,
  ProBtnRi,
  InputSpan,
  InputImg,
  InputSpa,
  NotifWr,
  NotifCon,
  NotifSub,
  NotifStore,
  NotifBtn,
  NotifBtnDiv,
  NotDiv,
  NotSpan,
  NotSp,
  ButtonRow,
  StoreInput,
  ModalHeader,
  Button,
  ModalContainer,
  ModalImg,
  ModalClose,
  ModalOverlay,
  MarketTopBtn,
  MarketMidImg,
  SearWr,
  SearLe,
  SearLeImg,
  SearSha,
  SearLeIn,
  MarketBot,
  MarkMid,
  MarkTable,
  MarkTabHe,
  MarkTabBod,
  MarkTabTr,
  MarkTh,
  MarkBtn,
  MarkBtnWr,
  MarkBtnCon,
  MarkBtnSp,
  MarkTw,
  MarkTwDiv,
  BodyWr,
  BodyTh,
  BodyBtnWr,
  BodyBtnCon,
  BodyBtn,
  BodyBtnSp,
  BodyTw,
  BodyTwDiv,
  BodyImg,
  BodyBtSp,
  BodyBot,
  BodyRiBtnSp,
  RepBtn,
  RepExBtn,
  RepSubImg,
  RepBot,
  RepDate,
  RepMain,
  RepTod,
  RepTodBtn,
  RepTodSp,
  RepBotto,
  RepTop,
  RepBotPa,
  RepTopDiv,
  RepTopSta,
  RepSec,
  RepSecFi,
  RepSecBtn,
  RepBtnDiv,
  RepBtnSec,
  RepBtnFl,
  RepFl,
  RepFlex,
  RepFlTop,
  ReportWr,
  ReportLine,
  ReportLin,
  ReportLi,
  ReportLiFi,
  ReportImg,
  ReportText,
  ReportTex,
  ReportTe,
  ReportPa,
  AnalWr,
  AnalCon,
  AnalSub,
  AnalMain,
  AnalPad,
  AnalFl,
  AnalTop,
  AnalTopBtn,
  AnalTopPad,
  AnalTopFl,
  AnalTopGr,
  AnalTopGrBtn,
  AnalTopGrHe,
  AnalGrSp,
  BreakWr,
  BreakCon,
  BreakSub,
  BreakRe,
  BreakUl,
  BreakLi,
  BreakLiSp,
  BreakLiSpan,
  BreakLiBtn,
  BreakPrice,
  GraphWr,
  GraphTop,
  GraphBot,
  GraphTopPa,
  GraphTopCon,
  GraphBotWr,
  GraphBotCon,
  GraphBotSt,
  GraWr,
  GraBtn,
  GraBtnImgCon,
  GraBtnImg,
  GraSp,
  AllStart,
  ChartLine,
  XAxisLabels,
  XAxisLabel,
  YAxisLabels,
  YAxisLabel,
  AdWr,
  AdGrid,
  AdSec,
  AdPad,
  AdTop,
  AdTopSp,
  AdTopSpan,
  AdTopBtn,
  AdMid,
  AdBot,
  AdBotCon,
  AdBotWr,
  AdBotRe,
  CampWr,
  CampCon,
  CampCol,
  CampFl,
  CampFlTop,
  CampFlHe,
  CampFlDiv,
  CampFlPa,
  CampBtnWr,
  CampBtnCon,
  CampBtnBtn,
  CampBtnSp,
  AbaMidPa,
  BillingContainer,
  BillingHeader,
  BillingFiltersContainer,
  BillingFilterButtons,
  BillingFilterButton,
  BillingActionButtons,
  BillingActionButton,
  BillingTableContainer,
  BillingTable,
  BillingTableHead,
  BillingTableRow,
  BillingTableHeader,
  BillingTableCell,
  BillingTableBody,
  BillingCheckbox,
  BillingStatusBadge,
  BillingPagination,
  BillingPaginationButton,
  BillingExtra,
  BillingLoadingRow,
  ArrowDir,
  OverlayRedirect,
  ModalRedirect,
  MessageRedirect,
  SubMessageRedirect,
  ButtonRedirect,
} from "./Dashboard.elements";
import ordersIcon from "../../assets/orders.png";
import draftImage from "../../assets/draft.svg";
import tagIcon from "../../assets/tag.png";
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
import discountsIcon from "../../assets/discount.png";
import catalogeIcon from "../../assets/catalogue.png";
import refreshIcon from "../../assets/repost.png";
import expandIcon from "../../assets/expand.png";
import domainIcon from "../../assets/domain.png";
import contentIcon from "../../assets/content.png";
import filterIcon from "../../assets/filter.png";
import removeIcon from "../../assets/remove.png";
import plusGrayIcon from "../../assets/plusGray.png";
import productsItem from "../../assets/products.svg";
import copyIcon from "../../assets/copy.png";
import rightBlockIcon from "../../assets/rightBlock.png";
import selectIcon from "../../assets/selectIcon.png";
import inputIcon from "../../assets/input.png";
import pulseIcon from "../../assets/pulse.png";
import crossIcon from "../../assets/cross.png";
import calendarIcon from "../../assets/calendar.png";
import arrowDown from "../../assets/arrowDown.png";
import arrowRight from "../../assets/rightArrow.png";
import arrowLeft from "../../assets/leftArrow.png";
import penIcon from "../../assets/pen.png";
import upDownIcon from "../../assets/upDown.png";
import domesticIcon from "../../assets/domestic.png";
import internationalIcon from "../../assets/international.png";
import paypalIcon from "../../assets/paypal.svg";
import ordersImage from "../../assets/order.png";
import visaIcon from "../../assets/visa.svg";
import madaIcon from "../../assets/mada.jpg";
import WeddingCake from "../../assets/weddingCake.png";
import Flower from "../../assets/flowerBrand.png";
import Board from "../../assets/board.png";
import Board2 from "../../assets/board2.png";
import Board3 from "../../assets/board3.png";
import Chair from "../../assets/chair.webp";
import logo from "../../assets/drslallum.png";
import marketsIcon from "../../assets/markets.png";
import { useNavigate } from "react-router-dom";
import { setSettingTab } from "../../redux/settingRedux";
import { setActiveTab } from "../../redux/tabRedux";
import {
  updateStoreName,
  userSelector,
  clearState,
  signOut,
} from "../../redux/userRedux";
import axios from "axios";
import { Star, ShieldCheck, MapPin } from "lucide-react";

/* ====== SHELL / LAYOUT ====== */

const SkyShell = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  direction: rtl;
  padding: 1rem;
`;

const FrostTop = styled.div`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
`;

const EchoRow = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ZenithTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ArcSet = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NovaBtn = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CoreBody = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const ShellGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.div``;

const RightCol = styled.div`
  position: sticky;
  top: 1.25rem;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  object-fit: cover;
`;

const DocName = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 4px;
`;

const Subtle = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
`;

const MetaLine = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 6px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #374151;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 800;
  margin: 1rem 0 0.75rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SelectWrap = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectEl = styled.select`
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: none;
  background: transparent;
  color: #111827;
`;

const DayHeading = styled.div`
  margin-top: 1.25rem;
  font-size: 1.05rem;
  font-weight: 900;
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 0.75rem;
`;

const SlotBtn = styled.button`
  background: ${(p) => (p.$available ? "#000" : "#e5e7eb")};
  color: ${(p) => (p.$available ? "#fff" : "#9ca3af")};
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: ${(p) => (p.$available ? "pointer" : "not-allowed")};
  transition: transform 0.06s ease, filter 0.15s ease;
  outline: ${(p) => (p.$selected ? "3px solid #1d4ed8" : "none")};

  &:active {
    transform: ${(p) => (p.$available ? "translateY(1px)" : "none")};
  }
  &:hover {
    filter: ${(p) => (p.$available ? "brightness(1.03)" : "none")};
  }
`;

const ContinueBar = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const ContinueBtn = styled.button`
  background: ${(p) => (p.disabled ? "#9ca3af" : "#70747e")};
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 12px 18px;
  font-weight: 800;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
`;

const AdminPanel = styled.div`
  background: #ffffffff;
  margin: 1rem 0 1.5rem 0;

  h3 {
    font-size: 1.05rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.75rem;
    color: #000;
  }

  hr {
    border: none;
    border-top: 1px solid #000;
    margin: 0.75rem 0;
  }
`;

const DaySelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 0.95rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  outline: none;
  appearance: none;
  cursor: pointer;
  color: #111827;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
  }
`;

const DayRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TimeGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const TimeInput = styled.input`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2px 4px;
  font-size: 0.95rem;
  width: 120px;
  background: #000;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  height: 40px;
  line-height: 1.2;
  outline: none;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
  }
`;

const Phone = styled.div`
  width: 390px;
  border-radius: 28px;
  padding: 12px;
  background: #e5e7eb;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin-inline-start: auto;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const PhoneScreen = styled.div`
  position: relative;
  height: 680px;
  border-radius: 24px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: stretch;
  justify-content: center;
  direction: rtl;
`;

const PhoneBody = styled.div`
  width: 92%;
  padding: 20px 0 28px;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
`;

const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

const Dashboard = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);
  const storeName = useSelector((state) => state.tab.storeName);
  const [localName, setLocalName] = useState("");
  const [inputModule, setInputModule] = useState(false);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [showTimeOutModal, setShowtimeOutModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleSubscribe, setToggleSubscribe] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [preOrdered, setPreOrdered] = useState(true);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("زيارة جديدة");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector(userSelector);

  const [isAdmin, setIsAdmin] = useState(true); // Toggle for demo

  // Admin configuration state
  const [workingDays, setWorkingDays] = useState({
    0: false, // Sunday
    1: true, // Monday
    2: true, // Tuesday
    3: true, // Wednesday
    4: true, // Thursday
    5: false, // Friday
    6: false, // Saturday
  });

  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });

  // Generate available dates (next 14 days)
  // Generate available dates (next 14 days)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();

    const startDay = parseInt(workingHours.startDay ?? 0);
    const endDay = parseInt(workingHours.endDay ?? 6);

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = date.getDay();

      // Include only days between startDay and endDay
      if (
        (startDay <= endDay && day >= startDay && day <= endDay) ||
        (startDay > endDay && (day >= startDay || day <= endDay))
      ) {
        dates.push(date);
      }
    }

    return dates.slice(0, 5); // Show first 5 available days
  }, [workingHours.startDay, workingHours.endDay, workingDays]);

  const generateTimeSlots = (startTime, endTime, interval = 30) => {
    const slots = [];
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMin < endMin)
    ) {
      const hour12 = currentHour % 12 || 12;
      const period = currentHour >= 12 ? "PM" : "AM";
      const timeStr = `${hour12}:${currentMin
        .toString()
        .padStart(2, "0")} ${period}`;
      slots.push(timeStr);

      currentMin += interval;
      if (currentMin >= 60) {
        currentMin -= 60;
        currentHour++;
      }
    }

    return slots;
  };
  // Generate time slots for available dates
  const dateSlots = useMemo(() => {
    const slots = {};
    availableDates.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      slots[dateKey] = generateTimeSlots(workingHours.start, workingHours.end);
    });
    return slots;
  }, [availableDates, workingHours]);

  const handleDayToggle = (day) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (field, value) => {
    setWorkingHours((prev) => ({ ...prev, [field]: value }));
  };

  const slots = useMemo(
    () => ({
      today: ["1:30 PM", "2:15 PM", "4:00 PM"],
      tomorrow: [
        "1:15 PM",
        "1:30 PM",
        "2:00 PM",
        "2:15 PM",
        "2:30 PM",
        "4:30 PM",
      ],
    }),
    []
  );

  const Rating = ({ value, reviews }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 800,
      }}
    >
      <Star size={18} style={{ color: "#f59e0b" }} />
      {value.toFixed(2)} · {reviews.toLocaleString()} reviews
    </span>
  );

  const AddressLine = ({ distance, addr }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <MapPin size={18} /> {distance} · {addr}
    </span>
  );

  const makeSlotKey = (dayLabel, t) => `${dayLabel}-${t}`;

  const handleTab = (item) => {
    dispatch(setSettingTab(item));
    navigate(`/preference?tab=${encodeURIComponent(item)}`);
  };

  const handlePage = (item) => {
    dispatch(setActiveTab(item));
    navigate(`/control?tab=${encodeURIComponent(item)}`);
  };

  const businessId = currentUser?._id;
  const accessToken = currentUser?.accessToken;

  const onOrderClick = (quotaId) => {
    if (quotaId) {
      navigate(`/quota/${quotaId}`);
    }
  };

  const handleTokenExpiration = () => {
    setShowtimeOutModel(true);
  };

  const handleLoginRedirect = () => {
    dispatch(signOut());
    dispatch(clearState());
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!accessToken || !businessId) {
        console.log("Missing:", { accessToken, businessId });
        return;
      }

      setIsLoading(true);
      setError("");
      console.log(businessId);

      try {
        const response = await axios.get(`${BASE_URL}/quota`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setOrdersData(response.data);
        setPreOrdered(response.data.length > 0);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          handleTokenExpiration();
        } else {
          setError("تعذّر جلب بيانات الطلبات");
        }
        setPreOrdered(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken, businessId]);

  const filters = [
    "الكل",
    "مدفوع",
    "مفتوح",
    "فشل",
    "قيد المراجعة",
    "تم الاسترداد",
    "ملغي",
  ];

  const handleDestination = (des) => {
    navigate(des);
  };

  const handleToggle = (toggle) => {
    toggle((pre) => !pre);
  };

  const handleStoreName = async () => {
    if (!currentUser?._id) {
      console.error("User ID not found");
      return;
    }

    const trimmedName = localName.trim();
    if (!trimmedName) {
      console.error("Store name cannot be empty");
      return;
    }

    dispatch(setStoreName(trimmedName));

    try {
      setIsLoading(true);
      await dispatch(
        updateStoreName({
          id: currentUser._id,
          storeName: trimmedName,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update store name:", error);
    } finally {
      setIsLoading(false);
      setInputModule(false);
    }
  };

  const formatDate = (date) => {
    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const months = [
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
    return `${days[date.getDay()]}، ${date.getDate()} ${
      months[date.getMonth()]
    }`;
  };

  const ImgArray1 = [
    { text: "", icon: paypalIcon },
    { text: "", icon: visaIcon },
    { text: "", icon: madaIcon },
  ];
  const ImgArray2 = [
    { text: "", icon: domesticIcon },
    { text: "", icon: internationalIcon },
  ];
  const ImgArray3 = [{ text: "f8u1iq-av.myshopify.com", icon: copyIcon }];

  const BtnArray = [
    { icon: refreshIcon, btn: handleStoreName },
    { icon: expandIcon, btn: handleStoreName },
  ];

  const AdArray = [
    { title: "Online store sessions" },
    { title: "Online store rate" },
    { title: "Average order value" },
    { title: "Total sales" },
    { title: "Sales attributed to marketing" },
    { title: "Orders attributed to marketing" },
  ];

  const BreakArray = [
    { title: "كامل المبيعات", price: "0.00" },
    { title: "الخصومات", price: "0.00" },
    { title: "الترجيع", price: "0.00" },
    { title: "صافي المبيعات", price: "0.00" },
    { title: "تكاليف الشحن", price: "0.00" },
    { title: "الضريبة", price: "0.00" },
    { title: "جميع المبيعات", price: "0.00" },
  ];

  const TimeOutModel = () => {
    if (!showTimeOutModal) return null;
    return (
      <OverlayRedirect>
        <ModalRedirect>
          <MessageRedirect>الجلسة انتهت سجل مره ثانية</MessageRedirect>
          <SubMessageRedirect>يجب تسجيل الدخول من جديد</SubMessageRedirect>
          <ButtonRedirect onClick={handleLoginRedirect}>
            سجل الآن
          </ButtonRedirect>
        </ModalRedirect>
      </OverlayRedirect>
    );
  };

  const renderContent = () => {
    const StoreMapped = ({
      title,
      btnText,
      arrayText,
      widthText,
      boxText,
      handlePro,
    }) => {
      return (
        <StoMap>
          <StoreTop>
            <StoreHe>{title}</StoreHe>
          </StoreTop>
          <StoreMid>
            <StoreEx>
              {arrayText.map((item, index) => {
                return (
                  <StoreBtn key={index}>
                    <StoreDiv>
                      <StoreSp>{item.text}</StoreSp>
                      <StoreImg
                        widthMax={widthText}
                        boxShadow={boxText}
                        src={item.icon}
                        alt=""
                      />
                    </StoreDiv>
                  </StoreBtn>
                );
              })}
            </StoreEx>
          </StoreMid>
          <StoreBot>
            <StoBtn onClick={handlePro}>
              <StoSpan>{btnText}</StoSpan>
            </StoBtn>
          </StoreBot>
        </StoMap>
      );
    };

    const SiteMapped = ({
      imgFirst,
      imgSec,
      imgThi,
      priBtn,
      secBtn,
      handlePri,
      handleDes,
    }) => {
      return (
        <SiteWr>
          <SiteFir></SiteFir>
          <SiteSec></SiteSec>
          <SiteThi>
            <SiteSuThi>
              <SiteSubImg src={imgFirst} alt="WeddingCake" />
            </SiteSuThi>
            <SiteSubThi>
              <SiteSubImg src={imgSec} alt="flowers" />
            </SiteSubThi>
            <SiteSThi>
              <SiteSubImg src={imgThi} alt="Chair" />
            </SiteSThi>
          </SiteThi>
          <SiteFou>
            <CircleFi>
              <CircleSe>
                <CircleThi>
                  <CircleFou>
                    <CircleFiv>
                      <CircleSi></CircleSi>
                    </CircleFiv>
                  </CircleFou>
                </CircleThi>
              </CircleSe>
            </CircleFi>
          </SiteFou>
          <SiteMid>
            <SiteEx></SiteEx>
            <SiteDes>
              <SiteSp>أضف منتجك الأول</SiteSp>
              <SiteWrap>
                <SiteSpa>ابدأ بإضافة منتج وبعض التفاصيل الأساسية.</SiteSpa>
                <SiteSpa>
                  <SiteAt>ابدأ بمنتج نموذجي</SiteAt>
                </SiteSpa>
              </SiteWrap>
            </SiteDes>
          </SiteMid>
          <SiteBo>
            <SiteDiv>
              <SiteBtn onClick={handlePri}>
                <SiteSp>{priBtn}</SiteSp>
              </SiteBtn>
            </SiteDiv>
            <SiteDiv
              background="rgba(255, 255, 255, 0.1)"
              boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)"
              color="rgba(48, 48, 48, 1)"
              border="1px solid rgba(0, 0, 0, 0.1)"
            >
              <SiteBtn onClick={handleDes}>
                <SiteSp>{secBtn}</SiteSp>
              </SiteBtn>
            </SiteDiv>
          </SiteBo>
        </SiteWr>
      );
    };

    const ProductProps = ({
      title,
      subTitle,
      imgSrc,
      heText,
      paraText,
      firBtn,
      secBtn,
      handlePro,
      exFir,
      exSec,
      exBtn,
      imgSvg,
    }) => {
      return (
        <ProWr>
          <ProCon>
            <ProStart>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={imgSrc} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe>{title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                </OreSubTop>
              </OreTop>
              <ProSub>
                <ProDiv>
                  <ProTop>
                    <ProTopSt>
                      <ProTopFl>
                        <ProTopLe>
                          <ProTopLef>
                            <ProTopLeft>
                              <ProTopLeftTo>
                                <ProTopLeftBtn>
                                  <ProTopLeftSp>{subTitle}</ProTopLeftSp>
                                </ProTopLeftBtn>
                              </ProTopLeftTo>
                              <ProTopRightTo>
                                <ProTopPlus>
                                  <ProPlus src={plusGrayIcon} alt="" />
                                </ProTopPlus>
                              </ProTopRightTo>
                            </ProTopLeft>
                          </ProTopLef>
                        </ProTopLe>
                        <ProTopRi>
                          <span>
                            <ProTopRiDiv>
                              <ProTopRiBtn>
                                <ProFilter src={filterIcon} alt="" />
                              </ProTopRiBtn>
                            </ProTopRiDiv>
                          </span>
                          <ProTopRiDiv>
                            <ProTopRiBtn>
                              <ProUpDow src={upDownIcon} alt="" />
                            </ProTopRiBtn>
                          </ProTopRiDiv>
                        </ProTopRi>
                      </ProTopFl>
                    </ProTopSt>
                  </ProTop>
                  <ProMid>
                    <ProMidSub>
                      <ProMidStart>
                        <ProMidTop>
                          <ProMidHe>{heText}</ProMidHe>
                          <ProMidPa>{paraText}</ProMidPa>
                          <ProBtnWr>
                            <ProBtnFl>
                              <ProBtnLe onClick={handlePro}>
                                <ProBtnSp>{firBtn}</ProBtnSp>
                              </ProBtnLe>
                              <ProBtnRi>
                                <ProBtnSp>{secBtn}</ProBtnSp>
                              </ProBtnRi>
                            </ProBtnFl>
                          </ProBtnWr>
                        </ProMidTop>
                        <ProMidImg src={imgSvg} alt="" />
                      </ProMidStart>
                    </ProMidSub>
                  </ProMid>
                  <ProBot>
                    <ProBo>
                      <ProBott>
                        <ProBottHe>{exFir}</ProBottHe>
                        <ProBottPa>{exSec}</ProBottPa>
                        <ProBottDiv>
                          <ProBottBtn>
                            <ProBottSp>{exBtn}</ProBottSp>
                          </ProBottBtn>
                        </ProBottDiv>
                      </ProBott>
                    </ProBo>
                  </ProBot>
                </ProDiv>
              </ProSub>
            </ProStart>
          </ProCon>
        </ProWr>
      );
    };
    const AbandonProps = ({ title, imgSrc, heText, paraText, imgSvg }) => {
      return (
        <ProWr>
          <ProCon>
            <ProStart>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={imgSrc} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe>{title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                </OreSubTop>
              </OreTop>
              <ProSub>
                <ProDiv>
                  <ProMid>
                    <ProMidSub>
                      <ProMidStart>
                        <ProMidTop>
                          <ProMidHe>{heText}</ProMidHe>
                          <AbaMidPa>{paraText}</AbaMidPa>
                        </ProMidTop>
                        <ProMidImg src={imgSvg} alt="" />
                      </ProMidStart>
                    </ProMidSub>
                  </ProMid>
                </ProDiv>
              </ProSub>
            </ProStart>
          </ProCon>
        </ProWr>
      );
    };

    const OrderProps = ({
      title,
      subTitle,
      imgSrc,
      heText,
      paraText,
      firBtn,
      imgImg,
      exFir,
      exSec,
      imgSvg,
      handleSub,
    }) => {
      return (
        <OreWr>
          <OreCon>
            <OreSubCon>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={imgSrc} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe> {title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                  <OreTopRight>
                    <OreTopRi>
                      <OreTopFi>
                        <OreSubFi>
                          <OreSubBtn>
                            <OreSpa>{subTitle}</OreSpa>
                            <OreSpan>
                              <OreSubImg src={imgSvg} alt="" />
                            </OreSpan>
                          </OreSubBtn>
                        </OreSubFi>
                      </OreTopFi>
                    </OreTopRi>
                  </OreTopRight>
                </OreSubTop>
              </OreTop>
              <OreMid>
                <OreMidSub>
                  <OreMidSu>
                    <OreFlex>
                      <CenterTop>
                        <CenterTopImg src={imgImg} alt="" />
                      </CenterTop>
                      <CenterBot>
                        <CenDivMain>
                          <CenDiv>
                            <CenDivSp>{heText}</CenDivSp>
                          </CenDiv>
                          <CenSp>{paraText}</CenSp>
                        </CenDivMain>
                        <CenterBotBtnDiv>
                          <CenterBotBtn onClick={handleSub}>
                            <CenterBotSp>{firBtn}</CenterBotSp>
                          </CenterBotBtn>
                        </CenterBotBtnDiv>
                      </CenterBot>
                    </OreFlex>
                  </OreMidSu>
                </OreMidSub>
              </OreMid>
              <OreBot>
                <OreBotSub>
                  <OreBotPa>{exFir}</OreBotPa>
                  <OreBotSpa>
                    <OreBotBtn>{exSec}</OreBotBtn>
                  </OreBotSpa>
                </OreBotSub>
              </OreBot>
            </OreSubCon>
          </OreCon>
        </OreWr>
      );
    };

    const ReportProps = ({ title, tran }) => {
      return (
        <RepSec transformLoc={tran}>
          <RepSecFi>
            <RepSecBtn>
              <RepBtnDiv>
                <RepBtnSec>
                  <RepBtnFl>
                    <RepFl>
                      <RepFlex>
                        <RepFlTop>{title}</RepFlTop>
                      </RepFlex>
                    </RepFl>
                    <ReportWr>
                      <ReportText>
                        <ReportTe>
                          <ReportPa> 0 ريال</ReportPa>
                        </ReportTe>
                        <ReportTex>
                          <ReportImg src={removeIcon} alt="" />
                        </ReportTex>
                      </ReportText>
                      <ReportLine>
                        <ReportLin>
                          <ReportLi>
                            <ReportLiFi>
                              <ReportImg src={pulseIcon} alt="" />
                            </ReportLiFi>
                          </ReportLi>
                        </ReportLin>
                      </ReportLine>
                    </ReportWr>
                  </RepBtnFl>
                </RepBtnSec>
              </RepBtnDiv>
            </RepSecBtn>
          </RepSecFi>
        </RepSec>
      );
    };

    const AnalyticProps = ({ title, tran }) => {
      return (
        <AnalWr>
          <AnalCon>
            <AnalSub>
              <AnalMain>
                <AnalPad>
                  <AnalFl>
                    <AnalTop>
                      <AnalTopBtn>
                        <AnalTopPad>
                          <AnalTopFl>
                            <AnalTopGr>
                              <span>
                                <AnalTopGrBtn>
                                  <AnalTopGrHe>
                                    <AnalGrSp>
                                      مجموع المبيعات من البداية
                                    </AnalGrSp>
                                  </AnalTopGrHe>
                                </AnalTopGrBtn>
                              </span>
                            </AnalTopGr>
                          </AnalTopFl>
                        </AnalTopPad>
                      </AnalTopBtn>
                    </AnalTop>
                    <GraphWr>
                      <GraphTop>
                        <GraphTopCon>
                          <GraphTopPa>0 ريال</GraphTopPa>
                        </GraphTopCon>
                        <ReportTex>
                          <ReportImg src={removeIcon} alt="" />
                        </ReportTex>
                      </GraphTop>
                      <GraphBot>
                        <GraphBotWr>
                          <GraphBotCon>
                            <GraphBotSt>
                              <AllStart>
                                <YAxisLabels>
                                  <YAxisLabel>10 ريال</YAxisLabel>
                                  <YAxisLabel>5 ريال</YAxisLabel>
                                  <YAxisLabel>0 ريال</YAxisLabel>
                                </YAxisLabels>
                                <ChartLine />
                                <XAxisLabels>
                                  <XAxisLabel>12 AM</XAxisLabel>
                                  <XAxisLabel>3 AM</XAxisLabel>
                                  <XAxisLabel>6 AM</XAxisLabel>
                                  <XAxisLabel>9 AM</XAxisLabel>
                                  <XAxisLabel>12 PM</XAxisLabel>
                                  <XAxisLabel>3 PM</XAxisLabel>
                                  <XAxisLabel>6 PM</XAxisLabel>
                                  <XAxisLabel>9 PM</XAxisLabel>
                                </XAxisLabels>
                              </AllStart>
                              <GraWr>
                                <GraBtn>
                                  <GraBtnImgCon>
                                    <GraBtnImg src={removeIcon} alt="" />
                                  </GraBtnImgCon>
                                  <GraSp>
                                    <span>Jun 26, 2025</span>
                                  </GraSp>
                                </GraBtn>
                                <GraBtn>
                                  <GraBtnImgCon>
                                    <GraBtnImg src={removeIcon} alt="" />
                                  </GraBtnImgCon>
                                  <GraSp>
                                    <span>Jun 27, 2025</span>
                                  </GraSp>
                                </GraBtn>
                              </GraWr>
                            </GraphBotSt>
                          </GraphBotCon>
                        </GraphBotWr>
                      </GraphBot>
                    </GraphWr>
                  </AnalFl>
                </AnalPad>
              </AnalMain>
            </AnalSub>
          </AnalCon>
        </AnalWr>
      );
    };

    const CampaignProps = ({ title, imgSrc, subTitle, btnText }) => {
      return (
        <AdWr>
          <CampWr>
            <CampCon>
              <CampCol>
                <CampFl>
                  <CampFlTop>
                    <CampFlHe>{title}</CampFlHe>
                    <CampFlDiv>
                      <CampFlPa>{subTitle}</CampFlPa>
                    </CampFlDiv>
                    <CampBtnWr>
                      <CampBtnCon>
                        <CampBtnBtn>
                          <CampBtnSp>{btnText}</CampBtnSp>
                        </CampBtnBtn>
                      </CampBtnCon>
                    </CampBtnWr>
                  </CampFlTop>
                  <img src={imgSrc} alt="" />
                </CampFl>
              </CampCol>
            </CampCon>
          </CampWr>
        </AdWr>
      );
    };

    const BreakProps = ({ title, tran }) => {
      return (
        <BreakWr>
          <AnalCon>
            <AnalSub>
              <AnalMain>
                <AnalPad>
                  <AnalFl>
                    <AnalTop>
                      <AnalTopBtn>
                        <AnalTopPad>
                          <AnalTopFl>
                            <AnalTopGr>
                              <span>
                                <AnalTopGrBtn>
                                  <AnalTopGrHe>
                                    <AnalGrSp>
                                      مجموع المبيعات من البداية
                                    </AnalGrSp>
                                  </AnalTopGrHe>
                                </AnalTopGrBtn>
                              </span>
                            </AnalTopGr>
                          </AnalTopFl>
                        </AnalTopPad>
                      </AnalTopBtn>
                    </AnalTop>
                    <BreakCon>
                      <BreakSub>
                        <BreakRe>
                          <BreakUl>
                            {BreakArray.map((item, index) => {
                              return (
                                <BreakLi>
                                  <BreakLiSp>
                                    <BreakLiBtn>{item.title}</BreakLiBtn>
                                  </BreakLiSp>
                                  <BreakLiSpan>
                                    <BreakPrice>ريال 0.00</BreakPrice>
                                    <ReportTex>
                                      <ReportImg src={removeIcon} alt="" />
                                    </ReportTex>
                                  </BreakLiSpan>
                                </BreakLi>
                              );
                            })}
                          </BreakUl>
                        </BreakRe>
                      </BreakSub>
                    </BreakCon>
                  </AnalFl>
                </AnalPad>
              </AnalMain>
            </AnalSub>
          </AnalCon>
        </BreakWr>
      );
    };

    const PageProps = ({ title, subTitle, imgSvg, tran }) => {
      return (
        <ProWr>
          <ProCon>
            <ProStart>
              <OreTop>
                <OreSubTop>
                  <OreSu>
                    <OreDivImg>
                      <span>
                        <OreImg src={marketsIcon} alt="" />
                      </span>
                    </OreDivImg>
                    <OreHeDiv>
                      <OreHe>{title}</OreHe>
                    </OreHeDiv>
                  </OreSu>
                  {subTitle && (
                    <OreTopRight>
                      <OreTopRi>
                        <OreTopFi>
                          <OreSubFi>
                            <RepBtn>
                              <OreSpa>{subTitle}</OreSpa>
                            </RepBtn>
                          </OreSubFi>
                        </OreTopFi>
                      </OreTopRi>
                    </OreTopRight>
                  )}
                </OreSubTop>
              </OreTop>
              <ProSub>
                <ProDiv>
                  <ProTop>
                    <ProTopSt>
                      <ProTopFl>
                        <ProTopLe>
                          <ProTopLef>
                            <ProTopLeft>
                              <ProTopRightTo>
                                <MarketTopBtn>
                                  <MarketMidImg src={selectIcon} alt="" />
                                </MarketTopBtn>
                              </ProTopRightTo>
                            </ProTopLeft>
                          </ProTopLef>
                        </ProTopLe>
                        <SearWr>
                          <SearLe>
                            <span>
                              <SearLeImg src={inputIcon} alt="" />
                            </span>
                          </SearLe>
                          <SearLeIn
                            type="text"
                            placeholder="ابحث بكل الاسواق"
                          />
                          <SearSha></SearSha>
                        </SearWr>
                        <ProTopRi>
                          <span>
                            <ProTopRiDiv>
                              <MarketTopBtn>
                                <MarketMidImg src={rightBlockIcon} alt="" />
                              </MarketTopBtn>
                            </ProTopRiDiv>
                          </span>
                        </ProTopRi>
                      </ProTopFl>
                    </ProTopSt>
                  </ProTop>
                  <MarkMid>
                    <MarkTable>
                      <MarkTabHe>
                        <MarkTabTr>
                          <MarkTh>
                            <MarkBtnWr>
                              <MarkBtnCon>
                                <MarkBtn>
                                  <MarkBtnSp>السوق</MarkBtnSp>
                                  <span></span>
                                </MarkBtn>
                              </MarkBtnCon>
                            </MarkBtnWr>
                          </MarkTh>
                          <MarkTw>
                            <MarkTwDiv>
                              <MarkBtnSp>الحالة</MarkBtnSp>
                            </MarkTwDiv>
                          </MarkTw>
                          <MarkTw>
                            <MarkTwDiv>
                              <MarkBtnSp>تخصيص</MarkBtnSp>
                            </MarkTwDiv>
                          </MarkTw>
                        </MarkTabTr>
                      </MarkTabHe>
                      <MarkTabBod>
                        <BodyWr>
                          <BodyTh>
                            <BodyBtnWr>
                              <BodyBtnCon>
                                <BodyBtn>
                                  <BodyBtnSp>
                                    المملكة العربية السعودية
                                  </BodyBtnSp>
                                  <span></span>
                                </BodyBtn>
                              </BodyBtnCon>
                            </BodyBtnWr>
                          </BodyTh>
                          <BodyTw>
                            <BodyTwDiv>
                              <MarkBtnSp>نشط</MarkBtnSp>
                            </BodyTwDiv>
                          </BodyTw>
                          <BodyTw>
                            <BodyTwDiv>
                              <BodyBtSp>
                                <BodyImg src={domainIcon} alt="" />
                              </BodyBtSp>
                              <BodyBtSp>
                                <BodyImg src={catalogeIcon} alt="" />
                              </BodyBtSp>
                            </BodyTwDiv>
                          </BodyTw>
                        </BodyWr>
                      </MarkTabBod>
                      <MarkTabBod>
                        <BodyWr>
                          <BodyTh background={"rgba(248, 247, 255, 1)"}>
                            <BodyBtnWr>
                              <BodyBtnCon>
                                <BodyBtn>
                                  <BodyRiBtnSp>اصنع سوق عالمي</BodyRiBtnSp>
                                  <span></span>
                                </BodyBtn>
                              </BodyBtnCon>
                            </BodyBtnWr>
                          </BodyTh>
                          <BodyTw background={"rgba(248, 247, 255, 1)"}>
                            <BodyTwDiv>
                              <MarkBtnSp></MarkBtnSp>
                            </BodyTwDiv>
                          </BodyTw>
                          <BodyTh background={"rgba(248, 247, 255, 1)"}>
                            <BodyBtnWr>
                              <BodyBtnCon>
                                <BodyBtn>
                                  <BodyRiBtnSp>ازالة</BodyRiBtnSp>
                                  <span></span>
                                </BodyBtn>
                              </BodyBtnCon>
                            </BodyBtnWr>
                          </BodyTh>
                        </BodyWr>
                      </MarkTabBod>
                    </MarkTable>
                  </MarkMid>
                </ProDiv>
              </ProSub>
            </ProStart>
          </ProCon>
        </ProWr>
      );
    };

    switch (activeTab) {
      case "الرئيسية":
        return (
          <StartSub>
            <StartRe>
              <StartSa>
                <StartWa>
                  <StartLa>
                    <StartTop>
                      <div></div>
                    </StartTop>
                    {inputModule ? (
                      <ModalOverlay>
                        <ModalContainer>
                          <ModalClose
                            onClick={() => handleToggle(setInputModule)}
                          >
                            <ModalImg src={crossIcon} alt="" />
                          </ModalClose>
                          <ModalHeader>اختار اسم لمتجرك</ModalHeader>
                          <StoreInput
                            placeholder="اختار اسم المتجر"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                          />
                          <ButtonRow>
                            <Button onClick={handleStoreName}>
                              {isLoading ? "جاري المعالجة ..." : "احفظ"}
                            </Button>
                          </ButtonRow>
                        </ModalContainer>
                      </ModalOverlay>
                    ) : null}
                    {toggleSubscribe ? (
                      <TopUl>
                        <TopLi>
                          <TopStart>
                            <TopRe>
                              <TopFlex>
                                <TopToo>
                                  <div>
                                    <TopMore>
                                      <TopSpan>
                                        <span>
                                          "اختر خطة واحصل على 3 أشهر مقابل 1
                                          ريال شهريًا
                                        </span>
                                      </TopSpan>
                                    </TopMore>
                                  </div>
                                  <TopAt
                                    onClick={() => {
                                      handleDestination("/pay");
                                    }}
                                  >
                                    <TopSelect>اختار الخطة</TopSelect>
                                  </TopAt>
                                </TopToo>
                                <div>
                                  <TopRight>
                                    <TopBtn
                                      onClick={() => {
                                        handleToggle(setToggleSubscribe);
                                      }}
                                    >
                                      <TopSp>
                                        <TopImg src={crossIcon} alt="" />
                                      </TopSp>
                                    </TopBtn>
                                  </TopRight>
                                </div>
                              </TopFlex>
                            </TopRe>
                          </TopStart>
                        </TopLi>
                      </TopUl>
                    ) : null}
                    <MidWr>
                      <MidCo>
                        <MidUl>
                          <MidDiv>
                            <MidStart>
                              <MidSe>
                                <MidThi>
                                  <MidLa>
                                    <MidTop>
                                      <ChWr>
                                        <ChCo>
                                          <ChHe>{storeName}</ChHe>
                                          <ChBtn
                                            onClick={() => {
                                              handleToggle(setInputModule);
                                            }}
                                          >
                                            <ChSpan>
                                              <ChImg src={penIcon} alt="" />
                                            </ChSpan>
                                          </ChBtn>
                                        </ChCo>
                                      </ChWr>
                                    </MidTop>
                                    <MidMid>
                                      <StoWr>
                                        <StoTop>
                                          <SiteMapped
                                            imgFirst={Board}
                                            imgSec={Board2}
                                            imgThi={Board3}
                                            priBtn="تصفح المواقع"
                                            secBtn="اصنع"
                                            handlePri={() => {
                                              handlePage("المتجر");
                                            }}
                                          />
                                          <SiteMapped
                                            imgFirst={Flower}
                                            imgSec={WeddingCake}
                                            imgThi={Chair}
                                            priBtn="اضافة المنتجات"
                                            secBtn="استيراد"
                                            handlePri={() => {
                                              handleDestination("/item");
                                            }}
                                          />
                                        </StoTop>
                                        <StoBot>
                                          <StoreMapped
                                            title={"أضف طرق الدفع"}
                                            btnText={"تفعيل"}
                                            arrayText={ImgArray1}
                                            widthText={"5rem"}
                                            handlePro={() => {
                                              handleTab("المدفوعات");
                                            }}
                                          />
                                          <StoreMapped
                                            title={"راجع أسعار الشحن الخاصة بك"}
                                            btnText={"مراجعة"}
                                            arrayText={ImgArray2}
                                            widthText={"4.5rem"}
                                            handlePro={() => {
                                              handleTab("الشحن");
                                            }}
                                          />
                                          <StoreMapped
                                            title={"خصص نطاقك"}
                                            btnText={"تخصيص"}
                                            arrayText={ImgArray3}
                                            widthText={"1.5rem"}
                                            boxText={"transparent"}
                                            handlePro={() => {
                                              handleTab("الرابط");
                                            }}
                                          />
                                        </StoBot>
                                      </StoWr>
                                    </MidMid>
                                  </MidLa>
                                </MidThi>
                              </MidSe>
                            </MidStart>
                          </MidDiv>
                        </MidUl>
                      </MidCo>
                    </MidWr>
                  </StartLa>
                </StartWa>
              </StartSa>
            </StartRe>
          </StartSub>
        );
      case "الطلبات":
        return (
          <>
            {preOrdered ? (
              <BillingContainer>
                <BillingHeader>
                  <BillingFiltersContainer>
                    <BillingFilterButtons>
                      {filters.map((filter) => (
                        <BillingFilterButton
                          key={filter}
                          active={activeFilter === filter}
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter}
                        </BillingFilterButton>
                      ))}
                    </BillingFilterButtons>

                    <BillingActionButtons>
                      <BillingActionButton>
                        <ProFilter src={filterIcon} alt="Filter" />
                      </BillingActionButton>
                      <BillingActionButton>
                        <ProFilter src={upDownIcon} alt="Sort" />
                      </BillingActionButton>
                    </BillingActionButtons>
                  </BillingFiltersContainer>
                </BillingHeader>

                <BillingTableContainer>
                  <BillingTable>
                    <BillingTableHead>
                      <BillingTableHeader>
                        <BillingCheckbox type="checkbox" />
                      </BillingTableHeader>
                      <BillingTableHeader>تاريخ الطلب</BillingTableHeader>
                      <BillingTableHeader>الاسم</BillingTableHeader>
                      <BillingTableHeader>رقم الجوال</BillingTableHeader>
                      <BillingTableHeader>تفاصيل الطلب</BillingTableHeader>
                      <BillingTableHeader>المورد</BillingTableHeader>
                      <BillingTableHeader align="center">
                        عدد الضيوف
                      </BillingTableHeader>
                      <BillingTableHeader>تاريخ الزواج</BillingTableHeader>
                      <BillingTableHeader align="center">
                        حالة الطلب
                      </BillingTableHeader>
                    </BillingTableHead>

                    <BillingTableBody>
                      {isLoading ? (
                        <BillingLoadingRow>جاري التحميل...</BillingLoadingRow>
                      ) : (
                        ordersData.map((quota, index) => (
                          <BillingTableRow
                            key={quota._id || index}
                            onClick={() => onOrderClick(quota._id)}
                          >
                            <BillingTableCell>
                              <BillingCheckbox
                                type="checkbox"
                                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                              />
                            </BillingTableCell>
                            <BillingTableCell>
                              {new Date(quota.createdAt).toLocaleDateString(
                                "ar-SA"
                              )}
                            </BillingTableCell>
                            <BillingTableCell>
                              {`${quota.firstName} ${quota.lastName}`}
                            </BillingTableCell>
                            <BillingTableCell>
                              {quota.phoneNumber}
                            </BillingTableCell>
                            <BillingTableCell
                              title={quota.weddingDetails || "لا توجد تفاصيل"}
                            >
                              {quota.weddingDetails || "لا توجد تفاصيل"}
                            </BillingTableCell>
                            <BillingTableCell>
                              {quota.vendor?.name || "غير محدد"}
                            </BillingTableCell>
                            <BillingTableCell align="center" weight="500">
                              {quota.guestCount}
                            </BillingTableCell>
                            <BillingTableCell>
                              {quota.weddingDate}
                            </BillingTableCell>
                            <BillingTableCell align="center">
                              <BillingStatusBadge status={quota.status}>
                                {quota.status || "قيد المراجعة"}
                              </BillingStatusBadge>
                            </BillingTableCell>
                          </BillingTableRow>
                        ))
                      )}
                    </BillingTableBody>
                  </BillingTable>
                </BillingTableContainer>

                <BillingPagination>
                  <BillingExtra>
                    <BillingPaginationButton disabled>
                      <ArrowDir src={arrowRight} alt="Filter" />
                    </BillingPaginationButton>
                    <BillingPaginationButton>
                      <ArrowDir src={arrowLeft} alt="Filter" />
                    </BillingPaginationButton>
                  </BillingExtra>
                </BillingPagination>
              </BillingContainer>
            ) : (
              <OrderProps
                title="الطلبات"
                subTitle="خيارات اكثر"
                heText="ستظهر طلباتك هنا"
                paraText="للحصول على الطلبات وقبول المدفوعات من العملاء، تحتاج إلى اختيار خطة. سيتم فرض رسوم الخطة عليك فقط بعد انتهاء الفترة التجريبية المجانية"
                firBtn="اختار الخطة"
                exFir="اعرف المزيد عن"
                exSec="الطلبات"
                imgSrc={ordersIcon}
                imgImg={ordersImage}
                imgSvg={arrowDown}
                handleSub={() => {
                  handleDestination("/pay");
                }}
              />
            )}
          </>
        );
      case "المنتجات":
        return (
          <ProductProps
            title="المنتجات"
            subTitle="الكل"
            heText="أضف منتجاتك"
            paraText="ابدأ بتجهيز متجرك بمنتجات سيحبها عملاؤك"
            firBtn="اضافة منتج"
            handlePro={() => {
              handleDestination("/item");
            }}
            secBtn="استورد"
            exFir="ابحث عن منتجات لبيعها"
            exSec="اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه"
            exBtn="تصفح تطبيقات توريد المنتجات"
            imgSrc={ordersIcon}
            imgSvg={productsItem}
          />
        );
      case "العملاء":
        return (
          <ProductProps
            title="العملاء"
            subTitle="الكل"
            heText="كل ما يتعلق بالعملاء في مكان واحد"
            paraText="قم بإدارة تفاصيل العملاء، واطّلع على سجل طلباتهم، وقم بتقسيمهم إلى مجموعات"
            firBtn="اضافة عميل"
            secBtn="استيراد العملاء"
            exFir="احصل على عملاء من خلال التطبيقات"
            exSec="نمِّ قائمة عملائك من خلال إضافة نموذج لجمع بيانات العملاء إلى متجرك وحملاتك التسويقية."
            exBtn="اطّلع على التطبيقات الموصى بها"
            imgSrc={tagIcon}
            imgSvg={customersImage}
          />
        );
      case "التسويق":
        return (
          <OreWr>
            <OreCon>
              <OreSubCon>
                <OreTop>
                  <OreSubTop>
                    <OreSu>
                      <OreDivImg>
                        <span>
                          <OreImg src={contentIcon} alt="" />
                        </span>
                      </OreDivImg>
                      <OreHeDiv>
                        <OreHe>التسويق</OreHe>
                      </OreHeDiv>
                    </OreSu>
                    <OreTopRight>
                      <OreTopRi>
                        <OreTopFi>
                          {BtnArray.map((item, index) => {
                            return (
                              <OreSpan key={index}>
                                <RepExBtn>
                                  <RepSubImg src={item.icon} alt="" />
                                </RepExBtn>
                              </OreSpan>
                            );
                          })}
                          <RepBtn>
                            <OreSpa>تخصيص</OreSpa>
                          </RepBtn>
                        </OreTopFi>
                      </OreTopRi>
                    </OreTopRight>
                  </OreSubTop>
                </OreTop>
                <RepBot>
                  <RepDate>
                    <RepTod>
                      <RepTodBtn>
                        <span>
                          <BodyImg src={calendarIcon} alt="" />
                        </span>
                        <RepTodSp>اليوم</RepTodSp>
                      </RepTodBtn>
                    </RepTod>
                    <RepTod>
                      <RepTodBtn>
                        <RepTodSp>مقارنة مع: ٢٤/٨/٢٠١٣</RepTodSp>
                      </RepTodBtn>
                    </RepTod>
                  </RepDate>
                  <AdWr>
                    <AdGrid>
                      {AdArray.map((item, index) => {
                        return (
                          <AdSec key={index}>
                            <AdPad>
                              <AdTop>
                                <AdTopSp>
                                  <AdTopSpan>{item.title}</AdTopSpan>
                                </AdTopSp>
                                <AdTopSp>
                                  <AdTopBtn>
                                    <AdTopSp>
                                      <ChImg src={contentIcon} alt="" />
                                    </AdTopSp>
                                  </AdTopBtn>
                                </AdTopSp>
                              </AdTop>
                              <AdMid>
                                <ReportTex>
                                  <ReportImg src={removeIcon} alt="" />
                                </ReportTex>
                              </AdMid>
                              <AdBot>
                                <AdBotWr>
                                  <AdBotCon>
                                    <AdBotRe>
                                      <div
                                        style={{
                                          height: "2px",
                                          width: "100%",
                                          backgroundColor: "#00b2ff",
                                          marginTop: "auto",
                                        }}
                                      />
                                    </AdBotRe>
                                  </AdBotCon>
                                </AdBotWr>
                              </AdBot>
                            </AdPad>
                          </AdSec>
                        );
                      })}
                    </AdGrid>
                  </AdWr>
                  <CampaignProps
                    imgSrc={campaignImage}
                    subTitle="أنشئ حملات لتقييم مدى تأثير المبادرات التسويقية على أهداف عملك. قم بتسجيل نقاط التواصل سواء كانت عبر  الإنترنت أو دون اتصال، أضف  أنشطة الحملات من قنوات تسويقية متعددة، وتابع  النتائج بسهولة "
                    title="مركز تتبع حملاتك التسويقية"
                    btnText="اصنع حملتك"
                  />
                  <CampaignProps
                    imgSrc={stateImage}
                    subTitle="نمّ جمهورك على منصات التواصل الاجتماعي، واجذب عملاء جدد من خلال الاشتراك في النشرات البريدية، وزِد من معدلات التحويل باستخدام الدردشة، والمزيد"
                    title="زِد عدد الزوار باستخدام تطبيقات التسويق"
                    btnText="استكشف تسويق التطبيقات"
                  />
                </RepBot>
              </OreSubCon>
            </OreCon>
          </OreWr>
        );
      case "الخصومات":
        return (
          <>
            <OrderProps
              title="الخصومات"
              subTitle="خيارات اكثر"
              heText="إدارة الخصومات والعروض الترويجية"
              paraText="أضف رموز خصم وخصومات تلقائية تُطبق عند إتمام الدفع. يمكنك أيضًا استخدام الخصومات مع الأسعار المقارنة."
              firBtn="انشاء خصومات"
              exFir="اعرف المزيد عن"
              exSec="الخصومات"
              imgSrc={discountsIcon}
              imgImg={discountImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "المحتوى":
        return (
          <>
            <OrderProps
              title="المحتوى"
              subTitle="خيارات اكثر"
              heText="بسّط عملية إنشاء المحتوى باستخدام الكائنات الوصفية"
              paraText="تتيح لك الكائنات الوصفية تجميع الحقول وربطها بمختلف أجزاء متجرك. استخدمها لإنشاء محتوى مخصص أو هياكل بيانات خاصة بك"
              firBtn="اضافة تعديف"
              exFir="اعرف المزيد عن"
              exSec="المحتوى"
              imgSrc={contentIcon}
              imgImg={contentImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "الأسواق":
        return <PageProps title="الاسواق" />;
      case "جزء":
        return <PageProps title="جزء" />;
      case "المجموعة":
        return <PageProps title="المجموعة" subTitle="اصنع مجموعة" />;
      case "التحليلات":
        return (
          <OreWr>
            <OreCon>
              <OreSubCon>
                <OreTop>
                  <OreSubTop>
                    <OreSu>
                      <OreDivImg>
                        <span>
                          <OreImg src={contentIcon} alt="" />
                        </span>
                      </OreDivImg>
                      <OreHeDiv>
                        <OreHe>التحليلات</OreHe>
                      </OreHeDiv>
                    </OreSu>
                    <OreTopRight>
                      <OreTopRi>
                        <OreTopFi>
                          {BtnArray.map((item, index) => {
                            return (
                              <OreSpan key={index}>
                                <RepExBtn>
                                  <RepSubImg src={item.icon} alt="" />
                                </RepExBtn>
                              </OreSpan>
                            );
                          })}
                          <RepBtn>
                            <OreSpa>تخصيص</OreSpa>
                          </RepBtn>
                        </OreTopFi>
                      </OreTopRi>
                    </OreTopRight>
                  </OreSubTop>
                </OreTop>
                <RepBot>
                  <RepDate>
                    <RepTod>
                      <RepTodBtn>
                        <span>
                          <BodyImg src={calendarIcon} alt="" />
                        </span>
                        <RepTodSp>اليوم</RepTodSp>
                      </RepTodBtn>
                    </RepTod>
                    <RepTod>
                      <RepTodBtn>
                        <RepTodSp>مقارنة مع: ٢٤/٨/٢٠١٣</RepTodSp>
                      </RepTodBtn>
                    </RepTod>
                  </RepDate>
                  <RepMain>
                    <RepTop>
                      <RepTopDiv>
                        <RepTopSta>
                          <ReportProps
                            title="صافي المبيعات"
                            tran={"translate(-216px, 0px)"}
                          />
                          <ReportProps
                            title="معدل عودة العملاء"
                            tran={"translate(22px, 0px)"}
                          />
                          <ReportProps
                            title="طلبات نفذت"
                            tran={"translate(260px, 0px)"}
                          />
                          <ReportProps
                            title="الطلبات"
                            tran={"translate(499px, 0px)"}
                          />
                          <AnalyticProps />
                          <BreakProps />
                        </RepTopSta>
                      </RepTopDiv>
                    </RepTop>
                    <RepBotto>
                      <RepBotPa>
                        Learn more about <span>analytic</span>
                      </RepBotPa>
                    </RepBotto>
                  </RepMain>
                </RepBot>
              </OreSubCon>
            </OreCon>
          </OreWr>
        );
      case "مسودة":
        return (
          <>
            <OrderProps
              title="مسودة"
              subTitle="خيارات اكثر"
              heText="إنشاء الطلبات والفواتير يدويًا"
              paraText="استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، وجمع المدفوعات "
              firBtn="انشاء مسودة طلب"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={draftImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "المخزون":
        return (
          <>
            <OrderProps
              title="المخزون"
              subTitle="خيارات اكثر"
              heText="إنشاء الطلبات والفواتير يدويًا"
              paraText="استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، وجمع المدفوعات "
              firBtn="انشاء مسودة طلب"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={inventoryImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "تاريخ الشراء":
        return (
          <>
            <OrderProps
              title="تاريخ الشراء"
              subTitle="خيارات اكثر"
              heText="إنشاء الطلبات والفواتير يدويًا"
              paraText="استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، وجمع المدفوعات "
              firBtn="انشاء مسودة طلب"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={historyImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "التحويل":
        return (
          <>
            <OrderProps
              title="التحويل"
              subTitle="خيارات اكثر"
              heText="إنشاء الطلبات والفواتير يدويًا"
              paraText="استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، وجمع المدفوعات "
              firBtn="انشاء مسودة طلب"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={transferImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "الهدايا":
        return (
          <>
            <OrderProps
              title="الهدايا"
              subTitle="خيارات اكثر"
              heText="إنشاء الطلبات والفواتير يدويًا"
              paraText="استخدم الطلبات المسودة لتلقي الطلبات عبر الهاتف، وأرسل الفواتير للعملاء عبر البريد الإلكتروني، وجمع المدفوعات "
              firBtn="انشاء مسودة طلب"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={giftImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "الحملات":
        return (
          <>
            <ProductProps
              title="الحملات"
              subTitle="الكل"
              heText="أضف منتجاتك"
              paraText="ابدأ بتجهيز متجرك بمنتجات سيحبها عملاؤك"
              firBtn="اضافة منتج"
              handlePro={() => {
                handleDestination("/item");
              }}
              secBtn="استورد"
              exFir="ابحث عن منتجات لبيعها"
              exSec="اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه"
              exBtn="تصفح تطبيقات توريد المنتجات"
              imgSrc={ordersIcon}
              imgSvg={campaignImage}
            />
          </>
        );
      case "الاتمته":
        return (
          <>
            <ProductProps
              title="الاتمته"
              subTitle="الكل"
              heText="أضف منتجاتك"
              paraText="ابدأ بتجهيز متجرك بمنتجات سيحبها عملاؤك"
              firBtn="اضافة منتج"
              handlePro={() => {
                handleDestination("/item");
              }}
              secBtn="استورد"
              exFir="ابحث عن منتجات لبيعها"
              exSec="اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه"
              exBtn="تصفح تطبيقات توريد المنتجات"
              imgSrc={ordersIcon}
              imgSvg={automationImage}
            />
          </>
        );
      case "السلات المتروكة":
        return (
          <>
            <AbandonProps
              title="السلات المتروكة"
              subTitle="الكل"
              heText="ستظهر عمليات الدفع المتروكة هنا"
              paraText="اطّلع على الوقت الذي يضيف فيه العملاء منتجًا إلى سلة التسوق دون إتمام عملية الدفع. يمكنك أيضًا إرسال رابط السلة إلى العملاء عبر البريد الإلكتروني."
              firBtn="اضافة منتج"
              handlePro={() => {
                handleDestination("/item");
              }}
              secBtn="استورد"
              exFir="ابحث عن منتجات لبيعها"
              exSec="اشحن منتجات الدروبشيبينغ أو الطباعة عند الطلب مباشرة من المورد إلى عميلك، وادفع فقط مقابل ما تبيعه"
              exBtn="تصفح تطبيقات توريد المنتجات"
              imgSrc={ordersIcon}
              imgSvg={abandonImage}
              handlePri={() => {
                handleDestination("/item");
              }}
            />
          </>
        );
      case "المتجر":
        return (
          <SkyShell>
            <FrostTop>
              <EchoRow>
                <ZenithTitle>حجز موعد</ZenithTitle>
                <ArcSet>
                  <NovaBtn onClick={() => setIsAdmin(!isAdmin)}>
                    {isAdmin ? "عرض العميل" : "لوحة الإدارة"}
                  </NovaBtn>
                </ArcSet>
              </EchoRow>
            </FrostTop>

            <CoreBody>
              <ShellGrid>
                <LeftCol>
                  <Card>
                    <Row>
                      <Avatar
                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop"
                        alt="doctor"
                      />
                      <div style={{ flex: 1 }}>
                        <DocName>د. هارولد واتسون، MD</DocName>
                        <Subtle>طبيب رعاية أولية</Subtle>
                        <MetaLine>
                          <Rating value={4.9} reviews={860} />
                        </MetaLine>
                        <MetaLine>
                          <AddressLine
                            distance="٥٫٣ ميل"
                            addr="1515 Park Center Dr، وحدة 2J، أورلاندو، فلوريدا 32835"
                          />
                        </MetaLine>
                      </div>
                    </Row>
                  </Card>

                  <Card>
                    <SectionTitle>تفاصيل الجدولة</SectionTitle>
                    <Label>سبب الزيارة</Label>
                    <SelectWrap>
                      <SelectEl
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      >
                        <option>مرض عارض</option>
                        <option>فحص سنوي</option>
                        <option>زيارة فيديو</option>
                        <option>مراجعة متابعة</option>
                      </SelectEl>
                    </SelectWrap>

                    {isAdmin && (
                      <AdminPanel>
                        <h3> اوقات العمل </h3>

                        <Label>أيام العمل:</Label>
                        <DayRow>
                          <div style={{ flex: 1 }}>
                            <Label style={{ fontSize: "0.85rem" }}>
                              اليوم الأول
                            </Label>
                            <DaySelect
                              value={workingHours.startDay || "0"}
                              onChange={(e) =>
                                setWorkingHours((prev) => ({
                                  ...prev,
                                  startDay: e.target.value,
                                }))
                              }
                            >
                              <option value="0">الأحد</option>
                              <option value="1">الاثنين</option>
                              <option value="2">الثلاثاء</option>
                              <option value="3">الأربعاء</option>
                              <option value="4">الخميس</option>
                              <option value="5">الجمعة</option>
                              <option value="6">السبت</option>
                            </DaySelect>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Label style={{ fontSize: "0.85rem" }}>
                              اليوم الأخير
                            </Label>
                            <DaySelect
                              value={workingHours.endDay || "4"}
                              onChange={(e) =>
                                setWorkingHours((prev) => ({
                                  ...prev,
                                  endDay: e.target.value,
                                }))
                              }
                            >
                              <option value="0">الأحد</option>
                              <option value="1">الاثنين</option>
                              <option value="2">الثلاثاء</option>
                              <option value="3">الأربعاء</option>
                              <option value="4">الخميس</option>
                              <option value="5">الجمعة</option>
                              <option value="6">السبت</option>
                            </DaySelect>
                          </div>
                        </DayRow>

                        <hr />

                        <Label>ساعات العمل:</Label>
                        <TimeGroup>
                          <div>
                            <Label style={{ fontSize: "0.85rem" }}>من:</Label>
                            <TimeInput
                              type="time"
                              value={workingHours.start}
                              onChange={(e) =>
                                setWorkingHours((prev) => ({
                                  ...prev,
                                  start: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label style={{ fontSize: "0.85rem" }}>إلى:</Label>
                            <TimeInput
                              type="time"
                              value={workingHours.end}
                              onChange={(e) =>
                                setWorkingHours((prev) => ({
                                  ...prev,
                                  end: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </TimeGroup>
                      </AdminPanel>
                    )}
                  </Card>

                  <Card>
                    <SectionTitle>المواعيد المتاحة</SectionTitle>

                    {availableDates.length === 0 ? (
                      <div
                        style={{
                          color: "#ef4444",
                          padding: "1rem",
                          textAlign: "center",
                        }}
                      >
                        لا توجد أيام عمل محددة. يرجى تكوين أيام العمل في لوحة
                        الإدارة.
                      </div>
                    ) : (
                      availableDates.map((date, idx) => {
                        const dateKey = date.toISOString().split("T")[0];
                        const slots = dateSlots[dateKey] || [];
                        const isToday = idx === 0;

                        return (
                          <div key={dateKey}>
                            <DayHeading>
                              {isToday ? "اليوم، " : ""}
                              {formatDate(date)}
                            </DayHeading>
                            <SlotsGrid>
                              {slots.map((time) => {
                                const slotKey = `${dateKey}-${time}`;
                                const isAvailable = true; // You can add logic to check bookings

                                return (
                                  <SlotBtn
                                    key={slotKey}
                                    onClick={() =>
                                      isAvailable && setSelectedSlot(slotKey)
                                    }
                                    $selected={selectedSlot === slotKey}
                                    $available={isAvailable}
                                  >
                                    {time}
                                  </SlotBtn>
                                );
                              })}
                            </SlotsGrid>
                          </div>
                        );
                      })
                    )}

                    <ContinueBar>
                      <ContinueBtn disabled={!selectedSlot}>
                        {selectedSlot ? "متابعة" : "اختر وقتًا"}
                      </ContinueBtn>
                    </ContinueBar>
                  </Card>
                </LeftCol>
                <RightCol>
                  <Phone>
                    <PhoneScreen>
                      <PhoneBody>
                        {/* رأس الصفحة */}
                        <div style={{ padding: "8px 12px" }}>
                          <h2
                            style={{
                              fontWeight: 900,
                              fontSize: 24,
                              margin: "8px 0",
                            }}
                          >
                            حجز موعد
                          </h2>
                        </div>

                        {/* ملخص الطبيب */}
                        <div style={{ padding: "6px 12px" }}>
                          <div style={{ display: "flex", gap: 12 }}>
                            <img
                              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=128&auto=format&fit=crop"
                              alt="doctor"
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: 9999,
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <div style={{ fontWeight: 900 }}>
                                د. هارولد واتسون، MD
                              </div>
                              <div style={{ color: "#6b7280" }}>
                                طبيب رعاية أولية
                              </div>
                              <div
                                style={{
                                  marginTop: 6,
                                  display: "flex",
                                  gap: 10,
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                >
                                  <Star
                                    size={16}
                                    style={{ color: "#f59e0b" }}
                                  />{" "}
                                  ٤٫٩٠ التقييم · ٨٦٠ مراجعات
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* تفاصيل الجدولة */}
                        <div style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 900, margin: "6px 0" }}>
                            تفاصيل الجدولة
                          </div>
                          <div
                            style={{
                              border: "1px solid #e5e7eb",
                              borderRadius: 12,
                              padding: "10px 12px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ fontWeight: 700 }}>{reason}</div>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6b7280"
                              strokeWidth="2"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            style={{
                              marginTop: 10,
                              border: "1px solid #e5e7eb",
                              borderRadius: 12,
                              padding: "10px 12px",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontWeight: 900,
                            }}
                          >
                            <ShieldCheck size={18} /> تحقّق إذا كان ضمن شبكة
                            التأمين
                          </div>
                        </div>

                        {/* المواعيد المتاحة (أول ٤ أوقات فقط لكل يوم) */}
                        <div style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 900, margin: "6px 0" }}>
                            المواعيد المتاحة
                          </div>

                          {availableDates.length === 0 ? (
                            <div
                              style={{
                                color: "#ef4444",
                                padding: "1rem",
                                textAlign: "center",
                                border: "1px solid #fee2e2",
                                borderRadius: 12,
                                background: "#fff1f2",
                                fontWeight: 700,
                              }}
                            >
                              لا توجد أيام عمل محددة. يرجى تكوين أيام العمل في
                              لوحة الإدارة.
                            </div>
                          ) : (
                            availableDates.map((date, idx) => {
                              const dateKey = date.toISOString().split("T")[0];
                              const slots = dateSlots[dateKey] || [];
                              const previewSlots = slots.slice(0, 4); // <-- أهم سطر: أول ٤ فقط
                              const isToday = idx === 0;

                              return (
                                <div
                                  key={`m-${dateKey}`}
                                  style={{ marginTop: 12 }}
                                >
                                  <div
                                    style={{ fontWeight: 900, marginTop: 6 }}
                                  >
                                    {isToday ? "اليوم، " : ""}
                                    {formatDate(date)}
                                  </div>

                                  {previewSlots.length === 0 ? (
                                    <div
                                      style={{
                                        marginTop: 8,
                                        padding: "8px 10px",
                                        border: "1px dashed #e5e7eb",
                                        borderRadius: 10,
                                        color: "#6b7280",
                                        fontWeight: 700,
                                      }}
                                    >
                                      لا توجد أوقات متاحة لهذا اليوم.
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 10,
                                        marginTop: 8,
                                      }}
                                    >
                                      {previewSlots.map((time) => {
                                        const slotKey = `${dateKey}-${time}`;
                                        const selected =
                                          selectedSlot === slotKey;

                                        return (
                                          <button
                                            key={`m-${slotKey}`}
                                            onClick={() =>
                                              setSelectedSlot(slotKey)
                                            }
                                            style={{
                                              background: "#000",
                                              color: "#fff",
                                              border: "none",
                                              borderRadius: 10,
                                              padding: "10px 12px",
                                              fontWeight: 900,
                                              outline: selected
                                                ? "3px solid #1d4ed8"
                                                : "none",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {time}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: 12,
                            }}
                          >
                            <button
                              disabled={!selectedSlot}
                              style={{
                                background: "#70747E",
                                color: "#fff",
                                border: "none",
                                borderRadius: 9999,
                                padding: "10px 16px",
                                fontWeight: 900,
                                opacity: selectedSlot ? 1 : 0.6,
                                cursor: selectedSlot ? "pointer" : "default",
                              }}
                            >
                              {selectedSlot ? "متابعة" : "اختر وقتًا"}
                            </button>
                          </div>
                        </div>
                      </PhoneBody>
                    </PhoneScreen>
                  </Phone>
                </RightCol>
              </ShellGrid>
            </CoreBody>
          </SkyShell>
        );

      case "التطبيقات":
        return (
          <>
            <div>التطبيقات ...</div>
            <div></div>
          </>
        );
    }
  };

  return (
    <MaFirst>
      <MaSec>
        <MaAll>
          <ContentSection>
            <MainCon>
              <LogoCon>
                <LogoGrid>
                  <LogoDiv>
                    <LogoSubDiv>
                      <LogoImg src={logo} alt="" />
                    </LogoSubDiv>
                  </LogoDiv>
                  <SearchWr>
                    <SearchCon>
                      <SearchSu>
                        <SearchSub>
                          <SearchRe>
                            <SearchBtn>
                              <InputWr>
                                <InputCon>
                                  <InputSpan>
                                    <InputImg src={inputIcon} alt="" />
                                  </InputSpan>
                                  <InputSpa>ابحث</InputSpa>
                                </InputCon>
                                <InputSp>
                                  <InputKbd>⌘</InputKbd>
                                  <InputKbd>K</InputKbd>
                                </InputSp>
                              </InputWr>
                            </SearchBtn>
                          </SearchRe>
                        </SearchSub>
                      </SearchSu>
                    </SearchCon>
                  </SearchWr>
                  <NotifWr>
                    <NotifCon></NotifCon>
                    <NotifSub>
                      <NotifStore>
                        <NotifBtn>
                          <NotifBtnDiv>
                            <NotDiv>
                              <NotSpan>MS</NotSpan>
                            </NotDiv>
                            <NotSp>{storeName}</NotSp>
                          </NotifBtnDiv>
                        </NotifBtn>
                      </NotifStore>
                    </NotifSub>
                  </NotifWr>
                </LogoGrid>
              </LogoCon>
              <NavCon></NavCon>
              <MainSubCon>
                <NavSide />
                <StartCon>
                  <StartDiv>{renderContent()}</StartDiv>
                </StartCon>
              </MainSubCon>
            </MainCon>
          </ContentSection>
          <TimeOutModel />
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Dashboard;
