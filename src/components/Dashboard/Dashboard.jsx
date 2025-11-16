import { useEffect, useMemo, useState } from "react";
import { updateBusinessProfile } from "../../redux/userRedux";
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
  PageWrapper,
  MainContentArea,
  TopHeaderSection,
  HeaderFlexRow,
  MainTitle,
  SaveButton,
  TwoColumnGrid,
  LeftColumnWrapper,
  WhiteCard,
  CardHeading,
  TwoFieldGrid,
  InputFieldWrapper,
  FieldLabel,
  TextInput,
  ProfileImageRow,
  ProfileImagePreview,
  ImagePlaceholder,
  ImageUploadArea,
  UploadLabel,
  UploadHintText,
  HiddenFileInput,
  SmallFieldLabel,
  SelectDropdown,
  TimeInput,
  CheckboxLabel,
  CheckboxInput,
  CheckboxText,
  NumberInput,
  CheckboxGroup,
  HolidayInputRow,
  DateInputWrapper,
  DateInput,
  DescriptionInputWrapper,
  AddButton,
  HolidayListSection,
  HolidayListTitle,
  HolidayItemsWrapper,
  HolidayItem,
  HolidayInfo,
  HolidayName,
  HolidayDate,
  DeleteButton,
  RightColumnSticky,
  PhonePreviewFrame,
  PreviewSection,
  PreviewTitle,
  DoctorInfoRow,
  DoctorAvatar,
  DoctorDetails,
  DoctorName,
  DoctorSpecialty,
  RatingRow,
  ScheduleHeading,
  ReasonBox,
  ReasonText,
  FeeBox,
  NoWorkDaysAlert,
  DateSlotSection,
  DateTitle,
  NoSlotsMessage,
  TimeSlotGrid,
  TimeSlotButton,
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
import logo from "../../assets/logoWhite.png";
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

import { Star, MapPin, Plus, Trash2, Upload } from "lucide-react";
import { userRequest } from "../../requestMethods";

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
  const [docFirstName, setDocFirstName] = useState("");
  const [docLastName, setDocLastName] = useState("");
  const [major, setMajor] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [country, setCountry] = useState("");
  const [paymentSettings, setPaymentSettings] = useState({
    enabled: true,
    appointmentFee: 1,
    allowPayOnArrival: true,
    allowOnlinePayment: true,
    requireUpfrontPayment: false,
  });
  const [reviewSettings, setReviewSettings] = useState({
    enabled: true,
    rating: 4,
    review: 3,
  });
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    description: "",
  });

  const navigate = useNavigate();
  const { currentUser } = useSelector(userSelector);

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
  }, [workingHours.startDay, workingHours.endDay]);

  useEffect(() => {
    if (currentUser) {
      setDocFirstName(currentUser.docFirstName || "");
      setDocLastName(currentUser.docLastName || "");
      setMajor(currentUser.major || "");
      setProfileImg(currentUser.profileImg || "");
      setCountry(currentUser.country || "");

      // Initialize payment settings
      if (currentUser.appointmentSettings?.paymentSettings) {
        setPaymentSettings(currentUser.appointmentSettings.paymentSettings);
      }

      // Initialize review settings
      if (currentUser.appointmentSettings?.reviewSettings) {
        setReviewSettings(currentUser.appointmentSettings.reviewSettings);
      }

      // Initialize holidays
      if (currentUser.appointmentSettings?.holidays) {
        setHolidays(currentUser.appointmentSettings.holidays);
      }

      // Initialize working hours if available
      if (currentUser.appointmentSettings?.workingHours) {
        // Find the first and last open days
        const days = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const workingDaysSettings =
          currentUser.appointmentSettings.workingHours;

        let firstOpenDay = null;
        let lastOpenDay = null;
        let startTime = "09:00";
        let endTime = "17:00";

        days.forEach((day, index) => {
          if (workingDaysSettings[day]?.isOpen) {
            if (firstOpenDay === null) {
              firstOpenDay = index;
              // Get time from first open day
              if (workingDaysSettings[day].slots?.[0]) {
                startTime =
                  workingDaysSettings[day].slots[0].startTime || "09:00";
                endTime = workingDaysSettings[day].slots[0].endTime || "17:00";
              }
            }
            lastOpenDay = index;
          }
        });

        setWorkingHours({
          start: startTime,
          end: endTime,
          startDay: firstOpenDay !== null ? String(firstOpenDay) : "0",
          endDay: lastOpenDay !== null ? String(lastOpenDay) : "4",
        });
      }
    }
  }, [currentUser]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImgFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await userRequest.post(
        `/business/upload/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw error;
    }
  };

  // Handle Adding Holiday
  const handleAddHoliday = () => {
    if (newHoliday.date && newHoliday.description) {
      setHolidays([...holidays, { ...newHoliday }]);
      setNewHoliday({ date: "", description: "" });
    }
  };

  // Handle Removing Holiday
  const handleRemoveHoliday = (index) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const handleSaveAllSettings = async () => {
    if (!currentUser?._id) {
      console.error("User ID not found");
      alert("معرف المستخدم غير موجود");
      return;
    }

    try {
      setIsLoading(true);

      let uploadedImageUrl = profileImg;

      // Upload new image if file was selected
      if (profileImgFile) {
        try {
          uploadedImageUrl = await uploadProfileImage(profileImgFile);
          console.log("Image uploaded successfully:", uploadedImageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          alert("فشل رفع الصورة. سيتم حفظ التغييرات الأخرى.");
          uploadedImageUrl = profileImg;
        }
      }

      // Helper function to check if a day is within working range
      const isDayInWorkingRange = (dayIndex) => {
        const startDay = parseInt(workingHours.startDay ?? 0);
        const endDay = parseInt(workingHours.endDay ?? 6);

        if (startDay <= endDay) {
          // Normal range (e.g., Monday to Friday)
          return dayIndex >= startDay && dayIndex <= endDay;
        } else {
          // Wrapped range (e.g., Friday to Tuesday)
          return dayIndex >= startDay || dayIndex <= endDay;
        }
      };

      // Prepare the complete update data
      const updateData = {
        // Doctor Information
        docFirstName: docFirstName.trim(),
        docLastName: docLastName.trim(),
        major: major.trim(),

        // Profile Settings
        profileImg: uploadedImageUrl,
        country: country.trim(),

        // Appointment Settings
        appointmentSettings: {
          workingHours: {
            sunday: {
              isOpen: isDayInWorkingRange(0),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            monday: {
              isOpen: isDayInWorkingRange(1),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            tuesday: {
              isOpen: isDayInWorkingRange(2),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            wednesday: {
              isOpen: isDayInWorkingRange(3),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            thursday: {
              isOpen: isDayInWorkingRange(4),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            friday: {
              isOpen: isDayInWorkingRange(5),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
            saturday: {
              isOpen: isDayInWorkingRange(6),
              slots: [
                { startTime: workingHours.start, endTime: workingHours.end },
              ],
            },
          },

          paymentSettings: {
            enabled: paymentSettings.enabled,
            appointmentFee: parseFloat(paymentSettings.appointmentFee) || 0,
            allowPayOnArrival: paymentSettings.allowPayOnArrival,
            allowOnlinePayment: paymentSettings.allowOnlinePayment,
            requireUpfrontPayment: paymentSettings.requireUpfrontPayment,
          },
          reviewSettings: {
            enabled: reviewSettings.enabled,
            review: reviewSettings.review || 0,
            rating: reviewSettings.rating || 0,
          },

          holidays: holidays.map((h) => ({
            date: new Date(h.date),
            description: h.description,
          })),
        },
      };

      await dispatch(
        updateBusinessProfile({
          id: currentUser._id,
          updateData,
        })
      ).unwrap();

      console.log("All settings updated successfully");
      alert("تم حفظ جميع التغييرات بنجاح");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("فشل حفظ التغييرات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
      setProfileImgFile(null);
    }
  };

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
          <PageWrapper>
            <MainContentArea>
              {/* Header */}
              <TopHeaderSection>
                <HeaderFlexRow>
                  <MainTitle>إعدادات حجز المواعيد</MainTitle>
                  <SaveButton
                    onClick={handleSaveAllSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
                  </SaveButton>
                </HeaderFlexRow>
              </TopHeaderSection>

              <TwoColumnGrid>
                {/* Left Column - Settings */}
                <LeftColumnWrapper>
                  {/* Doctor Information Card */}
                  <WhiteCard>
                    <CardHeading>معلومات الطبيب</CardHeading>

                    <TwoFieldGrid>
                      <div>
                        <FieldLabel>الاسم الأول</FieldLabel>
                        <TextInput
                          type="text"
                          value={docFirstName}
                          onChange={(e) => setDocFirstName(e.target.value)}
                          placeholder="أدخل الاسم الأول"
                        />
                      </div>

                      <div>
                        <FieldLabel>الاسم الأخير</FieldLabel>
                        <TextInput
                          type="text"
                          value={docLastName}
                          onChange={(e) => setDocLastName(e.target.value)}
                          placeholder="أدخل الاسم الأخير"
                        />
                      </div>
                    </TwoFieldGrid>

                    <InputFieldWrapper $marginBottom="1rem">
                      <FieldLabel>التخصص</FieldLabel>
                      <TextInput
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        placeholder="مثال: طبيب رعاية أولية"
                      />
                    </InputFieldWrapper>

                    <InputFieldWrapper>
                      <FieldLabel>البلد</FieldLabel>
                      <TextInput
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="أدخل البلد"
                      />
                    </InputFieldWrapper>
                  </WhiteCard>

                  {/* Profile Image Card */}
                  <WhiteCard>
                    <CardHeading>صورة الملف الشخصي</CardHeading>

                    <ProfileImageRow>
                      <div>
                        {profileImg ? (
                          <ProfileImagePreview src={profileImg} alt="Profile" />
                        ) : (
                          <ImagePlaceholder>
                            <Upload size={32} color="#6b7280" />
                          </ImagePlaceholder>
                        )}
                      </div>

                      <ImageUploadArea>
                        <UploadLabel>
                          <Upload
                            size={18}
                            style={{
                              marginRight: "0.5rem",
                              verticalAlign: "middle",
                            }}
                          />
                          اختر صورة جديدة
                          <HiddenFileInput
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                          />
                        </UploadLabel>
                        <UploadHintText>
                          JPG, PNG أو GIF (الحد الأقصى 5 ميجابايت)
                        </UploadHintText>
                      </ImageUploadArea>
                    </ProfileImageRow>
                  </WhiteCard>

                  {/* Working Hours Card */}
                  <WhiteCard>
                    <CardHeading>أوقات العمل</CardHeading>

                    <InputFieldWrapper $marginBottom="1.5rem">
                      <FieldLabel>أيام العمل</FieldLabel>
                      <TwoFieldGrid>
                        <div>
                          <SmallFieldLabel>من يوم</SmallFieldLabel>
                          <SelectDropdown
                            value={workingHours.startDay}
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
                          </SelectDropdown>
                        </div>

                        <div>
                          <SmallFieldLabel>إلى يوم</SmallFieldLabel>
                          <SelectDropdown
                            value={workingHours.endDay}
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
                          </SelectDropdown>
                        </div>
                      </TwoFieldGrid>
                    </InputFieldWrapper>

                    <div>
                      <FieldLabel>ساعات العمل</FieldLabel>
                      <TwoFieldGrid>
                        <div>
                          <SmallFieldLabel>من الساعة</SmallFieldLabel>
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
                          <SmallFieldLabel>إلى الساعة</SmallFieldLabel>
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
                      </TwoFieldGrid>
                    </div>
                  </WhiteCard>

                  {/* Payment Settings Card */}
                  <WhiteCard>
                    <CardHeading>إعدادات الدفع</CardHeading>

                    <InputFieldWrapper $marginBottom="1rem">
                      <CheckboxLabel>
                        <CheckboxInput
                          type="checkbox"
                          checked={paymentSettings.enabled}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              enabled: e.target.checked,
                            }))
                          }
                        />
                        <CheckboxText $bold>تفعيل نظام الدفع</CheckboxText>
                      </CheckboxLabel>
                    </InputFieldWrapper>

                    <InputFieldWrapper $marginBottom="1rem">
                      <FieldLabel>رسوم الموعد</FieldLabel>
                      <NumberInput
                        type="number"
                        value={paymentSettings.appointmentFee}
                        onChange={(e) =>
                          setPaymentSettings((prev) => ({
                            ...prev,
                            appointmentFee: e.target.value,
                          }))
                        }
                        min="0"
                        step="0.01"
                      />
                    </InputFieldWrapper>

                    <CheckboxGroup>
                      <CheckboxLabel>
                        <CheckboxInput
                          type="checkbox"
                          checked={paymentSettings.allowPayOnArrival}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              allowPayOnArrival: e.target.checked,
                            }))
                          }
                        />
                        <CheckboxText>السماح بالدفع عند الوصول</CheckboxText>
                      </CheckboxLabel>

                      <CheckboxLabel>
                        <CheckboxInput
                          type="checkbox"
                          checked={paymentSettings.allowOnlinePayment}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              allowOnlinePayment: e.target.checked,
                            }))
                          }
                        />
                        <CheckboxText>السماح بالدفع الإلكتروني</CheckboxText>
                      </CheckboxLabel>

                      <CheckboxLabel>
                        <CheckboxInput
                          type="checkbox"
                          checked={paymentSettings.requireUpfrontPayment}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              requireUpfrontPayment: e.target.checked,
                            }))
                          }
                        />
                        <CheckboxText>يتطلب الدفع المسبق</CheckboxText>
                      </CheckboxLabel>
                      <CheckboxLabel>
                        <CheckboxInput
                          type="checkbox"
                          checked={reviewSettings.enabled}
                          onChange={(e) =>
                            setReviewSettings((prev) => ({
                              ...prev,
                              enabled: e.target.checked,
                            }))
                          }
                        />
                        <CheckboxText>اظهار التقاييم</CheckboxText>
                      </CheckboxLabel>
                    </CheckboxGroup>
                  </WhiteCard>

                  {/* Holidays Card */}
                  <WhiteCard>
                    <CardHeading>العطلات الرسمية</CardHeading>

                    <HolidayInputRow>
                      <DateInputWrapper>
                        <SmallFieldLabel>التاريخ</SmallFieldLabel>
                        <DateInput
                          type="date"
                          value={newHoliday.date}
                          onChange={(e) =>
                            setNewHoliday((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                        />
                      </DateInputWrapper>

                      <DescriptionInputWrapper>
                        <SmallFieldLabel>الوصف</SmallFieldLabel>
                        <TextInput
                          type="text"
                          value={newHoliday.description}
                          onChange={(e) =>
                            setNewHoliday((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="مثال: عيد الفطر"
                        />
                      </DescriptionInputWrapper>

                      <AddButton onClick={handleAddHoliday}>
                        <Plus size={18} />
                        إضافة
                      </AddButton>
                    </HolidayInputRow>

                    {holidays.length > 0 && (
                      <HolidayListSection>
                        <HolidayListTitle>العطلات المضافة:</HolidayListTitle>
                        <HolidayItemsWrapper>
                          {holidays.map((holiday, index) => (
                            <HolidayItem key={index}>
                              <HolidayInfo>
                                <HolidayName>{holiday.description}</HolidayName>
                                <HolidayDate>
                                  {new Date(holiday.date).toLocaleDateString(
                                    "ar-SA"
                                  )}
                                </HolidayDate>
                              </HolidayInfo>
                              <DeleteButton
                                onClick={() => handleRemoveHoliday(index)}
                              >
                                <Trash2 size={16} />
                              </DeleteButton>
                            </HolidayItem>
                          ))}
                        </HolidayItemsWrapper>
                      </HolidayListSection>
                    )}
                  </WhiteCard>
                </LeftColumnWrapper>

                {/* Right Column - Phone Preview */}
                <div>
                  <RightColumnSticky>
                    <PhonePreviewFrame>
                      {/* Phone Preview Content */}
                      <PreviewSection $padding="8px 12px">
                        <PreviewTitle>حجز موعد</PreviewTitle>
                      </PreviewSection>

                      <PreviewSection $padding="6px 12px">
                        <DoctorInfoRow>
                          <DoctorAvatar
                            src={
                              profileImg ||
                              "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=128&auto=format&fit=crop"
                            }
                            alt="doctor"
                          />
                          <DoctorDetails>
                            <DoctorName>
                              {docFirstName && docLastName
                                ? `د. ${docFirstName} ${docLastName}`
                                : "د. هارولد واتسون، MD"}
                            </DoctorName>
                            <DoctorSpecialty>
                              {major || "طبيب رعاية أولية"}
                            </DoctorSpecialty>
                            {reviewSettings.enabled ? (
                              <RatingRow>
                                <Rating
                                  value={currentUser?.rating || 4.9}
                                  reviews={currentUser?.reviews || 860}
                                />
                              </RatingRow>
                            ) : null}
                          </DoctorDetails>
                        </DoctorInfoRow>
                      </PreviewSection>

                      <PreviewSection $padding="10px 12px">
                        <ScheduleHeading>تفاصيل الجدولة</ScheduleHeading>
                        <ReasonBox>
                          <ReasonText>{reason}</ReasonText>
                        </ReasonBox>
                        {paymentSettings.enabled && (
                          <FeeBox>
                            رسوم الموعد: {paymentSettings.appointmentFee} ريال
                          </FeeBox>
                        )}
                      </PreviewSection>

                      <PreviewSection $padding="10px 12px">
                        <ScheduleHeading>المواعيد المتاحة</ScheduleHeading>
                        {availableDates.length === 0 ? (
                          <NoWorkDaysAlert>
                            لا توجد أيام عمل محددة
                          </NoWorkDaysAlert>
                        ) : (
                          availableDates.slice(0, 2).map((date, idx) => {
                            const dateKey = date.toISOString().split("T")[0];
                            const slots = dateSlots[dateKey] || [];
                            const previewSlots = slots.slice(0, 4);
                            const isToday = idx === 0;

                            return (
                              <DateSlotSection key={dateKey}>
                                <DateTitle>
                                  {isToday ? "اليوم، " : ""}
                                  {formatDate(date)}
                                </DateTitle>
                                {previewSlots.length === 0 ? (
                                  <NoSlotsMessage>
                                    لا توجد أوقات متاحة لهذا اليوم.
                                  </NoSlotsMessage>
                                ) : (
                                  <TimeSlotGrid>
                                    {previewSlots.map((time) => {
                                      const slotKey = `${dateKey}-${time}`;
                                      const selected = selectedSlot === slotKey;

                                      return (
                                        <TimeSlotButton
                                          key={slotKey}
                                          onClick={() =>
                                            setSelectedSlot(slotKey)
                                          }
                                          $selected={selected}
                                        >
                                          {time}
                                        </TimeSlotButton>
                                      );
                                    })}
                                  </TimeSlotGrid>
                                )}
                              </DateSlotSection>
                            );
                          })
                        )}
                      </PreviewSection>
                    </PhonePreviewFrame>
                  </RightColumnSticky>
                </div>
              </TwoColumnGrid>
            </MainContentArea>
          </PageWrapper>
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
