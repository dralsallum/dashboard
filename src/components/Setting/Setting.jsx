// Setting.jsx
import React, { useState, useEffect, useRef } from "react";
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
  StartDiv,
  SettingWr,
  SettingCon,
  SettingPad,
  SettingTop,
  SetTop,
  SetTopSub,
  SetTopSu,
  SetTopSuq,
  SetTopHe,
  SetTopUr,
  SetTopImgCon,
  SettingSp,
  SettingImg,
  SettingMiddle,
  SettingsSection,
  SectionHeader,
  SectionTitle,
  SectionContent,
  StoreCard,
  StoreIcon,
  StoreInfo,
  StoreName,
  StoreEmail,
  AddressSection,
  AddressLabel,
  AddressIcon,
  AddressText,
  AddressValue,
  SettingsRow,
  SettingLabel,
  SettingTitle,
  SettingDesc,
  SettingValue,
  SettingSelect,
  LinkText,
  InfoText,
  // Order ID section components
  OrderIdSection,
  OrderIdHeader,
  OrderIdTitle,
  OrderIdDesc,
  OrderIdInputs,
  InputGroup,
  InputLabel,
  StyledInput,
  OrderIdPreview,
  // Processing section components
  ProcessingSection,
  ProcessingHeader,
  ProcessingTitle,
  InfoIcon,
  ProcessingGroup,
  ProcessingGroupTitle,
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
  CheckboxOption,
  CheckboxInput,
  CheckboxContent,
  CheckboxLabel,
  CheckboxDesc,
  // Assets section components
  AssetsSection,
  AssetsHeader,
  AssetsTitle,
  AssetsList,
  AssetItem,
  AssetIcon,
  AssetContent,
  AssetName,
  AssetDescription,
  AssetArrow,
  // Resources section components
  ResourcesSection,
  ResourcesTitle,
  ResourcesList,
  ResourceItem,
  ResourceLeft,
  ResourceIcon,
  ResourceText,
  ResourceRight,
  ResourceButton,
  ResourceArrow,
  // Organization section components
  OrganizationSection,
  OrganizationHeader,
  OrganizationContent,
  OrganizationTitle,
  OrganizationDesc,
  LearnMoreLink,
  ManageButton,
  // Save button components
  SaveButtonContainer,
  SaveButton,
  PlanDetailsContainer,
  PlanDetailsTitle,
  TrialContainer,
  TrialLeft,
  TrialText,
  TrialBadge,
  TrialButtons,
  CancelButton,
  ChoosePlanButton,
  LinksContainer,
  StyledLink,
  BillingProfileBtn,
  BillingProfileIcon,
  BillingProfileText,
  BillingSection,
  BillingSectionHeader,
  BillingSectionTitle,
  BillingTotal,
  BillingTotalLabel,
  BillingTotalAmount,
  BillingDetails,
  BillingDate,
  BillingLink,
  PaymentMethodSection,
  PaymentMethodBtn,
  PaymentMethodIcon,
  PaymentMethodText,
  BillingThresholdNotice,
  NoticeIcon,
  NoticeText,
  PlanSettingsNote,
  PastBillsEmpty,
  SubscriptionsDesc,
  SubscriptionItem,
  SubscriptionIcon,
  SubscriptionDetails,
  SubscriptionTitle,
  SubscriptionDate,
  SubscriptionsLink,
  SubscriptionsLinkText,
  SubscriptionsArrow,
  PaymentSection,
  PaymentSectionHeader,
  PaymentSectionTitle,
  PaymentSectionDescription,
  PaymentLink,
  PaymentProviderBtn,
  PaymentMethodsContainer,
  PaymentMethodCard,
  PaymentMethodInfo,
  PaymentMethodDetails,
  PaymentMethodName,
  PaymentMethodFee,
  AddPaymentMethodBtn,
  AddPaymentMethodIcon,
  AddPaymentMethodText,
  PaymentCaptureOptions,
  PaymentCaptureOption,
  PaymentRadio,
  PaymentCaptureLabel,
  PaymentCaptureTitle,
  PaymentCaptureDesc,
  ManualPaymentMethodBtn,
  ManualPaymentMethodText,
  CustomizationBtn,
  AppleWalletHeader,
  AppleWalletInfo,
  CustomizeBtn,
  CheckoutContainer,
  SectionCard,
  SectionDescription,
  RadioDescription,
  CheckboxContainer,
  Checkbox,
  LinkAt,
  RecommendedTag,
  MarketingSection,
  MarketingContent,
  MarketingTitle,
  CustomizeButton,
  MarketingOptions,
  MarketingOption,
  MarketingOptionLeft,
  MarketingIcon,
  MarketingOptionLabel,
  Toggle,
  LanguageSelector,
  LanguageInput,
  AdvancedOption,
  AdvancedOptionLeft,
  AdvancedIcon,
  AdvancedOptionTitle,
  AdvancedOptionDescription,
  ArrowIcon,
  ToggleContainer,
  ToggleStatus,
  ShippingSection,
  SectionSubtitle,
  ShippingCard,
  ShippingLeft,
  ShippingRatesTitle,
  ProductCount,
  ProductIcon,
  ShippingRight,
  RatesSection,
  RatesTitle,
  RateOption,
  RateIcon,
  RateText,
  CustomProfileLink,
  CalculateButton,
  DeliveryOptions,
  DeliveryOption,
  OptionLeft,
  OptionTitle,
  OptionDesc,
  ToggleSwitch,
  SetupButton,
  AddButton,
  PackageCard,
  PackageIcon,
  PackageDetails,
  PackageName,
  PackageDimensions,
  PackageStatus,
  MoreOptions,
  PackageNote,
  DomainSection,
  DomainHeader,
  DomainTitle,
  DomainIconWrapper,
  DomainDescription,
  DomainActions,
  PrimaryButton,
  SecondaryButton,
  SearchSection,
  SearchInput,
  DomainList,
  DomainListItem,
  DomainListLeft,
  DomainListIcon,
  DomainListText,
  DomainName,
  DomainSubtitle,
  ChangeLink,
  LogoLink,
  SenderEmailSection,
  SectionDesc,
  InputWrapper,
  EmailInput,
  UnverifiedBadge,
  VerificationText,
  ResendLink,
  NotificationsSection,
  NotificationItem,
  LeftContent,
  IconWrapper,
  Info,
  InfoTitle,
  InfoDesc,
  ArrowWrapper,
  ReturnRulesCard,
  CardHeader,
  HeaderInfo,
  RuleIcon,
  RuleTitle,
  OffBadge,
  RuleDesc,
  WrittenPoliciesSection,
  PoliciesHeader,
  PoliciesTitle,
  PoliciesSub,
  FooterLink,
  PoliciesList,
  PolicyItem,
  ItemLeft,
  ItemIcon,
  ItemText,
  ItemRight,
  StatusBadge,
  Arrow,
  RadioBackground,
  SearchContainer,
  SearchInputWrapper,
  SearchIcon,
  FilterButton,
  ProvidersList,
  ProviderItem,
  ProviderLeft,
  ProviderIcon,
  ProviderInfo,
  ProviderName,
  ProviderSubtext,
  PaymentMethods,
  PaymentIcon,
  MoreIcon,
  ChevronRight,
  PaymentIcons,
  SearchInputs,
  SearchSections,
  ProFilter,
  SettingMiddles,
  ModalOverlay,
  ModalContainer,
  ModalClose,
  ModalImg,
  ModalHeader,
  StoreInput,
  ButtonRow,
  Button,
  MessageBox,
  WireAccountDisplay,
  WireAccountItem,
  WireAccountLabel,
  WireAccountValue,
  WireAccountForm,
  FormGroup,
  FormLabel,
  SaveBut,
  CanButton,
  FormHelper,
  FormActions,
  VerificationStatus,
  EditButton,
  FormInput,
} from "./Setting.elements";
import inputIcon from "../../assets/input.png";
import homeIcon from "../../assets/home.png";
import filterIcon from "../../assets/filter.png";
import logo from "../../assets/drslallum.png";
import crossIcon from "../../assets/cross.png";
import { useDispatch, useSelector } from "react-redux";
import SetSide from "../SetSide/SetSide";
import { useNavigate } from "react-router-dom";
import { setSettingTab } from "../../redux/settingRedux";
import { userSelector } from "../../redux/userRedux";
import axios from "axios";

const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputModule, setInputModule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const settingTab = useSelector((state) => state.setting.settingTab);
  const storeName = useSelector((state) => state.tab.storeName);
  const { currentUser } = useSelector(userSelector);
  const email = useSelector((state) => state.user.currentUser?.email ?? "");
  const country = useSelector((state) => state.user.currentUser?.country ?? "");
  const [data, setData] = useState("");
  const [wireAccount, setWireAccount] = useState({
    bankName: "",
    accountHolderName: "",
    iban: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const businessId = currentUser?._id;
  const accessToken = currentUser?.accessToken;

  useEffect(() => {
    fetchWireAccount();
  }, []);

  const fetchWireAccount = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/business/wire-account/${currentUser._id}`,
        { headers: { Authorization: `Bearer ${currentUser.accessToken}` } }
      );
      if (response.data.wireAccount) {
        setWireAccount(response.data.wireAccount);
      }
    } catch (error) {
      console.error("Error fetching wire account:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWireAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.put(
        `${BASE_URL}/business/wire-account/${currentUser._id}`,
        wireAccount,
        { headers: { Authorization: `Bearer ${currentUser.accessToken}` } }
      );

      setWireAccount(response.data.wireAccount);
      setIsEditing(false);
      setMessage({
        type: "success",
        text: "تم حفظ معلومات الحساب البنكي بنجاح",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "حدث خطأ أثناء حفظ البيانات",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasWireAccount =
    wireAccount.bankName && wireAccount.accountHolderName && wireAccount.iban;

  useEffect(() => {
    if (!accessToken || !businessId) {
      console.log("Missing:", { accessToken, businessId });
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/business/${currentUser._id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setData(response.data.businessBalance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleDestination = (des) => {
    navigate(des);
  };

  const paymentMethods = {
    visa: { bgColor: "#1a1f71", textColor: "white", text: "VISA" },
    mastercard: { bgColor: "#eb001b", textColor: "white", text: "MC" },
    amex: { bgColor: "#006fcf", textColor: "white", text: "AMEX" },
    discover: { bgColor: "#ff6000", textColor: "white", text: "DISC" },
    jcb: { bgColor: "#0e4c96", textColor: "white", text: "JCB" },
    diners: { bgColor: "#0079be", textColor: "white", text: "DC" },
    unionpay: { bgColor: "#e21836", textColor: "white", text: "UP" },
    electron: { bgColor: "#1a1f71", textColor: "white", text: "VE" },
    maestro: { bgColor: "#eb001b", textColor: "white", text: "MA" },
    applepay: { bgColor: "#000000", textColor: "white", text: "PAY" },
    cartebleue: { bgColor: "#00579f", textColor: "white", text: "CB" },
    elo: { bgColor: "#ffcc00", textColor: "black", text: "ELO" },
    hipercard: { bgColor: "#cc092f", textColor: "white", text: "HC" },
    aura: { bgColor: "#fd6c00", textColor: "white", text: "AURA" },
  };

  const renderContent = () => {
    switch (settingTab) {
      case "عام":
        return (
          <SettingWr>
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>عام</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>
                <SettingMiddle>
                  {inputModule ? (
                    <ModalOverlay>
                      <ModalContainer>
                        <ModalClose
                          onClick={() => handleToggle(setInputModule)}
                        >
                          <ModalImg src={crossIcon} alt="" />
                        </ModalClose>
                        <ModalHeader>اختار اسم لمتجرك</ModalHeader>
                        <StoreInput placeholder="اختار اسم المتجر" />
                        <ButtonRow>
                          <Button>
                            {isLoading ? "جاري المعالجة ..." : "احفظ"}
                          </Button>
                        </ButtonRow>
                      </ModalContainer>
                    </ModalOverlay>
                  ) : null}
                  {/* Store Details Section */}
                  <SettingsSection>
                    <SectionHeader>
                      <SectionTitle>تفاصيل المتجر</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <StoreCard>
                        <StoreIcon>🏪</StoreIcon>
                        <StoreInfo>
                          <StoreName>متجري</StoreName>
                          <StoreEmail>{email}• لا يوجد رقم هاتف</StoreEmail>

                          <AddressSection>
                            <AddressLabel>
                              <AddressIcon>📍</AddressIcon>
                              <AddressText>عنوان الفواتير</AddressText>
                            </AddressLabel>
                            <AddressValue>
                              المملكة العربية السعودية, {country}
                            </AddressValue>
                          </AddressSection>
                        </StoreInfo>
                      </StoreCard>
                    </SectionContent>
                  </SettingsSection>

                  {/* Store Defaults Section */}
                  <SettingsSection>
                    <SectionHeader>
                      <SectionTitle>إعدادات المتجر الافتراضية</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <SettingsRow>
                        <SettingLabel>
                          <SettingTitle>عرض العملة</SettingTitle>
                          <SettingDesc>
                            لإدارة العملات التي يراها العملاء، انتقل إلى{" "}
                            <LinkText href="#">الأسواق</LinkText>
                          </SettingDesc>
                        </SettingLabel>
                        <SettingValue>
                          <SettingSelect>
                            <option>الريال السعودي (SAR)</option>
                          </SettingSelect>
                        </SettingValue>
                      </SettingsRow>

                      <SettingsRow>
                        <SettingLabel>
                          <SettingTitle>المنطقة الاحتياطية</SettingTitle>
                          <SettingDesc>
                            تحدد الإعدادات للعملاء خارج أسواقك.
                          </SettingDesc>
                        </SettingLabel>
                        <SettingValue>
                          <SettingSelect>
                            <option>المملكة العربية السعودية</option>
                          </SettingSelect>
                        </SettingValue>
                      </SettingsRow>

                      <SettingsRow>
                        <SettingLabel>
                          <SettingTitle>نظام الوحدات</SettingTitle>
                        </SettingLabel>
                        <SettingValue>
                          <SettingSelect>
                            <option>النظام المتري</option>
                          </SettingSelect>
                        </SettingValue>
                      </SettingsRow>

                      <SettingsRow>
                        <SettingLabel>
                          <SettingTitle>وحدة الوزن الافتراضية</SettingTitle>
                        </SettingLabel>
                        <SettingValue>
                          <SettingSelect>
                            <option>كيلوجرام (kg)</option>
                          </SettingSelect>
                        </SettingValue>
                      </SettingsRow>

                      <SettingsRow>
                        <SettingLabel>
                          <SettingTitle>المنطقة الزمنية</SettingTitle>
                          <SettingDesc>
                            يحدد الوقت لتسجيل الطلبات والتحليلات
                          </SettingDesc>
                        </SettingLabel>
                        <SettingValue>
                          <SettingSelect>
                            <option>(GMT+03:00) الرياض</option>
                          </SettingSelect>
                        </SettingValue>
                      </SettingsRow>

                      <InfoText>
                        لتغيير المنطقة الزمنية واللغة على مستوى المستخدم، قم
                        بزيارة <LinkText href="#">إعدادات الحساب</LinkText>
                      </InfoText>
                    </SectionContent>
                  </SettingsSection>
                  {/* Order ID Section */}
                  <OrderIdSection>
                    <OrderIdHeader>
                      <OrderIdTitle>معرف الطلب</OrderIdTitle>
                      <OrderIdDesc>
                        يظهر في صفحة الطلب وصفحات العملاء وإشعارات طلبات العملاء
                        لتحديد الطلب
                      </OrderIdDesc>
                    </OrderIdHeader>
                    <OrderIdInputs>
                      <InputGroup>
                        <InputLabel>البادئة</InputLabel>
                        <StyledInput type="text" defaultValue="#" />
                      </InputGroup>
                      <InputGroup>
                        <InputLabel>اللاحقة</InputLabel>
                        <StyledInput type="text" />
                      </InputGroup>
                    </OrderIdInputs>
                    <OrderIdPreview>
                      سيظهر معرف طلبك كـ #1001، #1002، #1003 ...
                    </OrderIdPreview>
                  </OrderIdSection>

                  {/* Order Processing Section */}
                  <ProcessingSection>
                    <ProcessingHeader>
                      <ProcessingTitle>معالجة الطلبات</ProcessingTitle>
                      <InfoIcon>i</InfoIcon>
                    </ProcessingHeader>

                    <ProcessingGroup>
                      <ProcessingGroupTitle>بعد دفع الطلب</ProcessingGroupTitle>
                      <RadioGroup>
                        <RadioOption>
                          <RadioInput type="radio" name="fulfillment" />
                          <RadioLabel>تنفيذ عناصر الطلب تلقائياً</RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput type="radio" name="fulfillment" />
                          <RadioLabel>
                            تنفيذ بطاقات الهدايا فقط في الطلب تلقائياً
                          </RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="fulfillment"
                            defaultChecked
                          />
                          <RadioLabel>
                            عدم تنفيذ أي من عناصر الطلب تلقائياً
                          </RadioLabel>
                        </RadioOption>
                      </RadioGroup>
                    </ProcessingGroup>

                    <ProcessingGroup>
                      <ProcessingGroupTitle>
                        بعد تنفيذ الطلب ودفعه، أو عند استرداد جميع العناصر
                      </ProcessingGroupTitle>
                      <CheckboxOption>
                        <CheckboxInput type="checkbox" defaultChecked />
                        <CheckboxContent>
                          <CheckboxLabel>أرشفة الطلب تلقائياً</CheckboxLabel>
                          <CheckboxDesc>
                            سيتم إزالة الطلب من قائمة الطلبات المفتوحة.
                          </CheckboxDesc>
                        </CheckboxContent>
                      </CheckboxOption>
                    </ProcessingGroup>
                  </ProcessingSection>

                  {/* Store Assets Section */}
                  <AssetsSection>
                    <AssetsHeader>
                      <AssetsTitle>أصول المتجر</AssetsTitle>
                    </AssetsHeader>
                    <AssetsList>
                      <AssetItem>
                        <AssetIcon>📊</AssetIcon>
                        <AssetContent>
                          <AssetName>الحقول الوصفية</AssetName>
                          <AssetDescription>
                            متاحة في المظاهر وقابلة للتكوين لـ Storefront API
                          </AssetDescription>
                        </AssetContent>
                        <AssetArrow>›</AssetArrow>
                      </AssetItem>
                      <AssetItem>
                        <AssetIcon>🏷️</AssetIcon>
                        <AssetContent>
                          <AssetName>العلامة التجارية</AssetName>
                          <AssetDescription>
                            دمج أصول العلامة التجارية عبر قنوات المبيعات
                            والمظاهر والتطبيقات
                          </AssetDescription>
                        </AssetContent>
                        <AssetArrow>›</AssetArrow>
                      </AssetItem>
                    </AssetsList>
                  </AssetsSection>
                  {/* Resources Section */}
                  <ResourcesSection>
                    <ResourcesTitle>الموارد</ResourcesTitle>
                    <ResourcesList>
                      <ResourceItem>
                        <ResourceLeft>
                          <ResourceIcon>🔗</ResourceIcon>
                          <ResourceText>سجل التغييرات</ResourceText>
                        </ResourceLeft>
                        <ResourceRight>
                          <ResourceButton>عرض سجل التغييرات</ResourceButton>
                        </ResourceRight>
                      </ResourceItem>

                      <ResourceItem>
                        <ResourceLeft>
                          <ResourceIcon>❓</ResourceIcon>
                          <ResourceText>مركز مساعدة Shopify</ResourceText>
                        </ResourceLeft>
                        <ResourceRight>
                          <ResourceButton>الحصول على مساعدة</ResourceButton>
                        </ResourceRight>
                      </ResourceItem>

                      <ResourceItem>
                        <ResourceLeft>
                          <ResourceIcon>💻</ResourceIcon>
                          <ResourceText>توظيف شريك Shopify</ResourceText>
                        </ResourceLeft>
                        <ResourceRight>
                          <ResourceButton>توظيف شريك</ResourceButton>
                        </ResourceRight>
                      </ResourceItem>

                      <ResourceItem>
                        <ResourceLeft>
                          <ResourceIcon>⌨️</ResourceIcon>
                          <ResourceText>اختصارات لوحة المفاتيح</ResourceText>
                        </ResourceLeft>
                        <ResourceRight>
                          <ResourceArrow>›</ResourceArrow>
                        </ResourceRight>
                      </ResourceItem>

                      <ResourceItem>
                        <ResourceLeft>
                          <ResourceIcon>📊</ResourceIcon>
                          <ResourceText>سجل نشاط المتجر</ResourceText>
                        </ResourceLeft>
                        <ResourceRight>
                          <ResourceArrow>›</ResourceArrow>
                        </ResourceRight>
                      </ResourceItem>
                    </ResourcesList>
                  </ResourcesSection>

                  {/* Organizations and Store Transfers Section */}
                  <OrganizationSection>
                    <OrganizationHeader>
                      <OrganizationContent>
                        <OrganizationTitle>
                          المنظمات ونقل المتاجر
                        </OrganizationTitle>
                        <OrganizationDesc>
                          اجمع متاجرك معاً في منظمة أو انقل هذا المتجر إلى مالك
                          جديد خارج عملك.{" "}
                          <LearnMoreLink href="#">تعلم المزيد</LearnMoreLink>
                        </OrganizationDesc>
                      </OrganizationContent>
                      <ManageButton>إدارة</ManageButton>
                    </OrganizationHeader>
                  </OrganizationSection>

                  {/* Save Button */}
                  <SaveButtonContainer>
                    <SaveButton>حفظ</SaveButton>
                  </SaveButtonContainer>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "الاشتراك":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>الاشتراك</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddle>
                  <PlanDetailsContainer>
                    <PlanDetailsTitle>تفاصيل الخطة</PlanDetailsTitle>

                    <TrialContainer>
                      <TrialLeft>
                        <TrialText>النسخة التجريبية</TrialText>
                        <TrialBadge>٣ أيام متبقية</TrialBadge>
                      </TrialLeft>

                      <TrialButtons>
                        <CancelButton>إلغاء التجربة</CancelButton>
                        <ChoosePlanButton
                          onClick={() => {
                            handleDestination("/pay");
                          }}
                        >
                          اختر خطة
                        </ChoosePlanButton>
                      </TrialButtons>
                    </TrialContainer>

                    <LinksContainer>
                      <LinkText>عرض </LinkText>
                      <StyledLink href="#">شروط الخدمة</StyledLink>
                      <LinkText> و </LinkText>
                      <StyledLink href="#">سياسة الخصوصية</StyledLink>
                    </LinksContainer>
                  </PlanDetailsContainer>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "المبيعات":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>بوابات الدفع</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddles>
                  <SearchSections>
                    <SearchContainer>
                      <SearchInputWrapper>
                        <SearchInputs
                          type="text"
                          placeholder="Filter third-party payment providers"
                        />
                      </SearchInputWrapper>
                      <FilterButton>
                        <ProFilter src={filterIcon} alt="" />
                      </FilterButton>
                    </SearchContainer>
                  </SearchSections>

                  <ProvidersList>
                    {/* Bogus Gateway */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#f59e0b">B</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>
                            (for testing) Bogus Gateway
                          </ProviderName>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* Adyen Payments */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#0abf53">A</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>
                            Adyen Payments - Credit Cards
                          </ProviderName>
                          <ProviderSubtext>Supports 3DS</ProviderSubtext>
                          <PaymentMethods>
                            <PaymentIcons
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.discover.bgColor}
                              textColor={paymentMethods.discover.textColor}
                            >
                              {paymentMethods.discover.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.jcb.bgColor}
                              textColor={paymentMethods.jcb.textColor}
                            >
                              {paymentMethods.jcb.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.diners.bgColor}
                              textColor={paymentMethods.diners.textColor}
                            >
                              {paymentMethods.diners.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.unionpay.bgColor}
                              textColor={paymentMethods.unionpay.textColor}
                            >
                              {paymentMethods.unionpay.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.electron.bgColor}
                              textColor={paymentMethods.electron.textColor}
                            >
                              {paymentMethods.electron.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.maestro.bgColor}
                              textColor={paymentMethods.maestro.textColor}
                            >
                              {paymentMethods.maestro.text}
                            </PaymentIcons>
                            <PaymentIcons
                              bgColor={paymentMethods.applepay.bgColor}
                              textColor={paymentMethods.applepay.textColor}
                            >
                              {paymentMethods.applepay.text}
                            </PaymentIcons>
                            <MoreIcon>+2</MoreIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* AsiaBill Payments */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#2563eb">A</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>
                            AsiaBill Payments (Direct)
                          </ProviderName>
                          <ProviderSubtext>Supports 3DS</ProviderSubtext>
                          <PaymentMethods>
                            <PaymentIcon
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.discover.bgColor}
                              textColor={paymentMethods.discover.textColor}
                            >
                              {paymentMethods.discover.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.jcb.bgColor}
                              textColor={paymentMethods.jcb.textColor}
                            >
                              {paymentMethods.jcb.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.diners.bgColor}
                              textColor={paymentMethods.diners.textColor}
                            >
                              {paymentMethods.diners.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.maestro.bgColor}
                              textColor={paymentMethods.maestro.textColor}
                            >
                              {paymentMethods.maestro.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.electron.bgColor}
                              textColor={paymentMethods.electron.textColor}
                            >
                              {paymentMethods.electron.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.cartebleue.bgColor}
                              textColor={paymentMethods.cartebleue.textColor}
                            >
                              {paymentMethods.cartebleue.text}
                            </PaymentIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* MyFatoorah */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#10b981">M</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>MyFatoorah</ProviderName>
                          <ProviderSubtext>Supports 3DS</ProviderSubtext>
                          <PaymentMethods>
                            <PaymentIcon
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcon>
                            <PaymentIcon bgColor="#00a651" textColor="white">
                              KNET
                            </PaymentIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* ONERWAY */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#6366f1">O</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>ONERWAY (Direct)</ProviderName>
                          <ProviderSubtext>Supports 3DS</ProviderSubtext>
                          <PaymentMethods>
                            <PaymentIcon
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.discover.bgColor}
                              textColor={paymentMethods.discover.textColor}
                            >
                              {paymentMethods.discover.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.jcb.bgColor}
                              textColor={paymentMethods.jcb.textColor}
                            >
                              {paymentMethods.jcb.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.diners.bgColor}
                              textColor={paymentMethods.diners.textColor}
                            >
                              {paymentMethods.diners.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.electron.bgColor}
                              textColor={paymentMethods.electron.textColor}
                            >
                              {paymentMethods.electron.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.maestro.bgColor}
                              textColor={paymentMethods.maestro.textColor}
                            >
                              {paymentMethods.maestro.text}
                            </PaymentIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* PagBrasil */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#059669">P</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>
                            PagBrasil - Cartão de crédito
                          </ProviderName>
                          <PaymentMethods>
                            <PaymentIcon
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.elo.bgColor}
                              textColor={paymentMethods.elo.textColor}
                            >
                              {paymentMethods.elo.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.hipercard.bgColor}
                              textColor={paymentMethods.hipercard.textColor}
                            >
                              {paymentMethods.hipercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.aura.bgColor}
                              textColor={paymentMethods.aura.textColor}
                            >
                              {paymentMethods.aura.text}
                            </PaymentIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>

                    {/* Paymob */}
                    <ProviderItem>
                      <ProviderLeft>
                        <ProviderIcon bgColor="#8b5cf6">P</ProviderIcon>
                        <ProviderInfo>
                          <ProviderName>
                            Paymob - Native Checkout for Debit/Credit Cards
                          </ProviderName>
                          <ProviderSubtext>Supports 3DS</ProviderSubtext>
                          <PaymentMethods>
                            <PaymentIcon
                              bgColor={paymentMethods.visa.bgColor}
                              textColor={paymentMethods.visa.textColor}
                            >
                              {paymentMethods.visa.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.mastercard.bgColor}
                              textColor={paymentMethods.mastercard.textColor}
                            >
                              {paymentMethods.mastercard.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.amex.bgColor}
                              textColor={paymentMethods.amex.textColor}
                            >
                              {paymentMethods.amex.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.discover.bgColor}
                              textColor={paymentMethods.discover.textColor}
                            >
                              {paymentMethods.discover.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.jcb.bgColor}
                              textColor={paymentMethods.jcb.textColor}
                            >
                              {paymentMethods.jcb.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.diners.bgColor}
                              textColor={paymentMethods.diners.textColor}
                            >
                              {paymentMethods.diners.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.unionpay.bgColor}
                              textColor={paymentMethods.unionpay.textColor}
                            >
                              {paymentMethods.unionpay.text}
                            </PaymentIcon>
                            <PaymentIcon
                              bgColor={paymentMethods.maestro.bgColor}
                              textColor={paymentMethods.maestro.textColor}
                            >
                              {paymentMethods.maestro.text}
                            </PaymentIcon>
                          </PaymentMethods>
                        </ProviderInfo>
                      </ProviderLeft>
                      <ChevronRight>›</ChevronRight>
                    </ProviderItem>
                  </ProvidersList>
                </SettingMiddles>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "الفواتير":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>الفواتير</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                        <BillingProfileBtn>
                          <BillingProfileIcon>📊</BillingProfileIcon>
                          <BillingProfileText>ملف الفوترة</BillingProfileText>
                        </BillingProfileBtn>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddle>
                  {/* دورة الفوترة الحالية */}
                  <BillingSection>
                    <BillingSectionHeader>
                      <BillingTotal>
                        <BillingTotalLabel>الإجمالي الحالي</BillingTotalLabel>
                        <BillingTotalAmount>{data} ريال</BillingTotalAmount>
                      </BillingTotal>
                      <BillingSectionTitle>
                        دورة الفوترة الحالية
                      </BillingSectionTitle>
                    </BillingSectionHeader>

                    <BillingDetails>
                      <BillingDate>
                        تم الفوترة في: 4 يوليو 2025
                        <BillingLink>عرض الرسوم الحالية</BillingLink>
                      </BillingDate>
                    </BillingDetails>

                    <PaymentMethodSection>
                      <PaymentMethodBtn>
                        <PaymentMethodIcon>+</PaymentMethodIcon>
                        <PaymentMethodText>إضافة طريقة دفع</PaymentMethodText>
                      </PaymentMethodBtn>
                    </PaymentMethodSection>

                    <BillingThresholdNotice>
                      <NoticeIcon>⚪</NoticeIcon>
                      <NoticeText>
                        تبقى $60 للوصول إلى حد الفوترة البالغ $60 USD. إذا تم
                        الوصول، سيتم إصدار الفاتورة تلقائيًا خارج دورة الفوترة
                        المعتادة.
                      </NoticeText>
                    </BillingThresholdNotice>

                    <PlanSettingsNote>
                      لتعديل خطتك،{" "}
                      <BillingLink>اذهب إلى إعدادات الخطة</BillingLink>
                    </PlanSettingsNote>
                  </BillingSection>

                  {/* الفواتير السابقة */}
                  <BillingSection>
                    <BillingSectionTitle>الفواتير السابقة</BillingSectionTitle>
                    <PastBillsEmpty>لا توجد فواتير سابقة بعد.</PastBillsEmpty>
                  </BillingSection>

                  {/* الاشتراكات */}
                  <BillingSection>
                    <BillingSectionTitle>الاشتراكات</BillingSectionTitle>
                    <SubscriptionsDesc>
                      العناصر التي يتم إصدار فواتير بها بشكل متكرر، مثل خطة
                      Shopify والتطبيقات.
                    </SubscriptionsDesc>

                    <SubscriptionItem>
                      <SubscriptionIcon>🛍️</SubscriptionIcon>
                      <SubscriptionDetails>
                        <SubscriptionTitle>التجربة المجانية</SubscriptionTitle>
                        <SubscriptionDate>
                          تنتهي تجربتك في 3 يوليو 2025
                        </SubscriptionDate>
                      </SubscriptionDetails>
                    </SubscriptionItem>

                    <SubscriptionsLink>
                      <SubscriptionsLinkText>
                        عرض جميع الاشتراكات
                      </SubscriptionsLinkText>
                      <SubscriptionsArrow>›</SubscriptionsArrow>
                    </SubscriptionsLink>
                  </BillingSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );

      case "الرابط":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>الرابط</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>
                <SettingMiddle>
                  {/* — Buy or connect a domain — */}
                  <DomainSection>
                    <DomainHeader>
                      <DomainTitle>شراء أو ربط نطاق</DomainTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </DomainHeader>
                    <DomainDescription>
                      أضمن نطاقًا مثاليًا لمتجرك يمكن للعملاء الوثوق به والعثور
                      عليه بسهولة. اشترِ نطاقًا جديدًا من Shopify، أو اربط
                      نطاقًا اشتريته مسبقًا من موفر خارجي مثل Namecheap أو
                      GoDaddy.
                    </DomainDescription>
                    <DomainActions>
                      <PrimaryButton>شراء نطاق جديد</PrimaryButton>
                      <SecondaryButton>ربط نطاق موجود</SecondaryButton>
                    </DomainActions>
                  </DomainSection>

                  {/* — Search & list existing domains — */}
                  <SearchSection>
                    <SearchInput placeholder="ابحث عن النطاقات" />

                    <DomainList>
                      <DomainListItem>
                        <DomainListLeft>
                          <DomainListIcon>🌐</DomainListIcon>
                          <DomainListText>
                            <DomainName>9zbskk-rf.myshopify.com</DomainName>
                            <DomainSubtitle>
                              أساسي للمتجر الإلكتروني
                            </DomainSubtitle>
                          </DomainListText>
                        </DomainListLeft>
                      </DomainListItem>
                      {/* … more <DomainListItem> as needed … */}
                    </DomainList>

                    <ChangeLink href="#">
                      تغيير إلى نطاق myshopify.com جديد
                    </ChangeLink>
                  </SearchSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "المدفوعات":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>المدفوعات</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddle>
                  {/* Wire Transfer Account Section */}
                  <PaymentSection>
                    <PaymentSectionHeader>
                      <PaymentSectionTitle>
                        معلومات الحساب البنكي
                      </PaymentSectionTitle>
                      <PaymentSectionDescription>
                        أضف معلومات حسابك البنكي لاستلام المدفوعات عبر التحويل
                        البنكي
                      </PaymentSectionDescription>
                    </PaymentSectionHeader>

                    {message.text && (
                      <MessageBox type={message.type}>
                        {message.text}
                      </MessageBox>
                    )}

                    {!isEditing ? (
                      <WireAccountDisplay>
                        <WireAccountItem>
                          <WireAccountLabel>اسم البنك:</WireAccountLabel>
                          <WireAccountValue>
                            {wireAccount.bankName}
                          </WireAccountValue>
                        </WireAccountItem>
                        <WireAccountItem>
                          <WireAccountLabel>اسم صاحب الحساب:</WireAccountLabel>
                          <WireAccountValue>
                            {wireAccount.accountHolderName}
                          </WireAccountValue>
                        </WireAccountItem>
                        <WireAccountItem>
                          <WireAccountLabel>رقم IBAN:</WireAccountLabel>
                          <WireAccountValue>
                            {wireAccount.iban}
                          </WireAccountValue>
                        </WireAccountItem>
                        <WireAccountItem>
                          <WireAccountLabel>حالة التحقق:</WireAccountLabel>
                          <VerificationStatus verified={wireAccount.isVerified}>
                            {wireAccount.isVerified
                              ? "✓ تم التحقق"
                              : "⏳ قيد المراجعة"}
                          </VerificationStatus>
                        </WireAccountItem>
                        <EditButton onClick={() => setIsEditing(true)}>
                          تعديل المعلومات
                        </EditButton>
                      </WireAccountDisplay>
                    ) : (
                      <WireAccountForm onSubmit={handleSubmit}>
                        <FormGroup>
                          <FormLabel>اسم البنك *</FormLabel>
                          <FormInput
                            type="text"
                            name="bankName"
                            value={wireAccount.bankName}
                            onChange={handleInputChange}
                            placeholder="مثال: البنك الأهلي السعودي"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel>اسم صاحب الحساب بالكامل *</FormLabel>
                          <FormInput
                            type="text"
                            name="accountHolderName"
                            value={wireAccount.accountHolderName}
                            onChange={handleInputChange}
                            placeholder="الاسم كما هو مسجل في البنك"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <FormLabel>رقم IBAN *</FormLabel>
                          <FormInput
                            type="text"
                            name="iban"
                            value={wireAccount.iban}
                            onChange={handleInputChange}
                            placeholder="SA0000000000000000000000"
                            required
                          />
                          <FormHelper>
                            أدخل رقم IBAN بدون مسافات (يبدأ عادة بـ SA)
                          </FormHelper>
                        </FormGroup>

                        <FormActions>
                          <SaveBut type="submit" disabled={loading}>
                            {loading ? "جاري الحفظ..." : "حفظ المعلومات"}
                          </SaveBut>
                          {hasWireAccount && (
                            <CanButton
                              type="button"
                              onClick={() => {
                                setIsEditing(false);
                                fetchWireAccount();
                              }}
                            >
                              إلغاء
                            </CanButton>
                          )}
                        </FormActions>
                      </WireAccountForm>
                    )}
                  </PaymentSection>

                  {/* Payment Capture Method Section */}
                  <PaymentSection>
                    <PaymentSectionHeader>
                      <PaymentSectionTitle>
                        طريقة تحصيل الدفع
                      </PaymentSectionTitle>
                      <PaymentSectionDescription>
                        يتم تفويض المدفوعات عند تقديم الطلب. حدد كيفية{" "}
                        <PaymentLink>تحصيل المدفوعات</PaymentLink>:
                      </PaymentSectionDescription>
                    </PaymentSectionHeader>

                    <PaymentCaptureOptions>
                      <PaymentCaptureOption>
                        <PaymentRadio
                          type="radio"
                          name="capture"
                          id="auto-checkout"
                          defaultChecked
                        />
                        <PaymentCaptureLabel htmlFor="auto-checkout">
                          <PaymentCaptureTitle>
                            تلقائياً عند الخروج
                          </PaymentCaptureTitle>
                          <PaymentCaptureDesc>
                            تحصيل الدفع عند تقديم الطلب
                          </PaymentCaptureDesc>
                        </PaymentCaptureLabel>
                      </PaymentCaptureOption>

                      <PaymentCaptureOption>
                        <PaymentRadio
                          type="radio"
                          name="capture"
                          id="auto-fulfilled"
                        />
                        <PaymentCaptureLabel htmlFor="auto-fulfilled">
                          <PaymentCaptureTitle>
                            تلقائياً عند اكتمال الطلب بالكامل
                          </PaymentCaptureTitle>
                          <PaymentCaptureDesc>
                            تفويض الدفع عند الخروج وتحصيله بمجرد اكتمال الطلب
                            بالكامل
                          </PaymentCaptureDesc>
                        </PaymentCaptureLabel>
                      </PaymentCaptureOption>

                      <PaymentCaptureOption>
                        <PaymentRadio type="radio" name="capture" id="manual" />
                        <PaymentCaptureLabel htmlFor="manual">
                          <PaymentCaptureTitle>يدوياً</PaymentCaptureTitle>
                          <PaymentCaptureDesc>
                            تفويض الدفع عند الخروج وتحصيله يدوياً
                          </PaymentCaptureDesc>
                        </PaymentCaptureLabel>
                      </PaymentCaptureOption>
                    </PaymentCaptureOptions>
                  </PaymentSection>

                  {/* Manual Payment Methods Section */}
                  <PaymentSection>
                    <PaymentSectionHeader>
                      <PaymentSectionTitle>
                        طرق الدفع اليدوية
                      </PaymentSectionTitle>
                      <PaymentSectionDescription>
                        المدفوعات التي تتم خارج متجرك الإلكتروني. يجب الموافقة
                        على الطلبات المدفوعة يدوياً قبل تنفيذها
                      </PaymentSectionDescription>
                    </PaymentSectionHeader>

                    <ManualPaymentMethodBtn>
                      <AddPaymentMethodIcon>+</AddPaymentMethodIcon>
                      <ManualPaymentMethodText>
                        طريقة دفع يدوية
                      </ManualPaymentMethodText>
                    </ManualPaymentMethodBtn>
                  </PaymentSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );

      case "السلة":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>السلة</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddle>
                  <CheckoutContainer>
                    {/* Customer Contact Method */}
                    <SectionCard>
                      <SectionTitle>
                        طريقة التواصل مع العملاء
                        <InfoIcon>i</InfoIcon>
                      </SectionTitle>
                      <SectionDescription>
                        طريقة التواصل التي يدخلها العملاء عند الخروج ستتلقى
                        الطلب والشحن <LinkAt href="#">الإشعارات</LinkAt>
                      </SectionDescription>

                      <RadioGroup>
                        <RadioOption>
                          <RadioInput type="radio" id="phone" value="phone" />
                          <RadioBackground>
                            <RadioLabel htmlFor="phone">
                              رقم الهاتف أو البريد الإلكتروني
                            </RadioLabel>
                            <RadioDescription>
                              لإرسال تحديثات الرسائل النصية، تحتاج إلى تثبيت{" "}
                              <LinkAt href="#">تطبيق الرسائل النصية</LinkAt>
                            </RadioDescription>
                          </RadioBackground>
                        </RadioOption>

                        <RadioOption>
                          <RadioInput type="radio" id="email" value="email" />
                          <RadioLabel htmlFor="email">
                            البريد الإلكتروني
                          </RadioLabel>
                        </RadioOption>
                      </RadioGroup>

                      <CheckboxContainer>
                        <Checkbox type="checkbox" id="trackingLink" />
                        <div>
                          <CheckboxLabel htmlFor="trackingLink">
                            إظهار رابط للعملاء لتتبع طلبهم مع{" "}
                            <LinkAt href="#">المتجر</LinkAt>
                          </CheckboxLabel>
                          <RadioDescription>
                            سيتمكن العملاء من تنزيل التطبيق من صفحة حالة الطلب
                          </RadioDescription>
                        </div>
                      </CheckboxContainer>

                      <CheckboxContainer>
                        <Checkbox type="checkbox" />
                        <div>
                          <CheckboxLabel>
                            مطالبة العملاء بتسجيل الدخول إلى حسابهم قبل الخروج
                          </CheckboxLabel>
                          <RadioDescription>
                            يمكن للعملاء استخدام البريد الإلكتروني فقط عند
                            الحاجة لتسجيل الدخول
                          </RadioDescription>
                        </div>
                      </CheckboxContainer>
                    </SectionCard>

                    {/* Customer Information */}
                    <SectionCard>
                      <SectionTitle>معلومات العميل</SectionTitle>

                      <div style={{ marginBottom: "24px" }}>
                        <RadioLabel
                          style={{ marginBottom: "16px", display: "block" }}
                        >
                          الاسم الكامل
                        </RadioLabel>
                        <RadioGroup>
                          <RadioOption>
                            <RadioInput type="radio" id="lastName" />
                            <RadioLabel htmlFor="lastName">
                              مطالبة باسم العائلة فقط
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="fullName" />
                            <RadioLabel htmlFor="fullName">
                              مطالبة بالاسم الأول واسم العائلة
                            </RadioLabel>
                          </RadioOption>
                        </RadioGroup>
                      </div>

                      <div style={{ marginBottom: "24px" }}>
                        <RadioLabel
                          style={{ marginBottom: "16px", display: "block" }}
                        >
                          اسم الشركة
                        </RadioLabel>
                        <RadioGroup>
                          <RadioOption>
                            <RadioInput type="radio" id="companyNone" />
                            <RadioLabel htmlFor="companyNone">
                              لا تشمل <RecommendedTag>موصى به</RecommendedTag>
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="companyOptional" />
                            <RadioLabel htmlFor="companyOptional">
                              اختياري
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="companyRequired" />
                            <RadioLabel htmlFor="companyRequired">
                              مطلوب
                            </RadioLabel>
                          </RadioOption>
                        </RadioGroup>
                      </div>

                      <div style={{ marginBottom: "24px" }}>
                        <RadioLabel
                          style={{ marginBottom: "16px", display: "block" }}
                        >
                          السطر الثاني من العنوان (شقة، وحدة، إلخ.)
                        </RadioLabel>
                        <RadioGroup>
                          <RadioOption>
                            <RadioInput type="radio" id="addressNone" />
                            <RadioLabel htmlFor="addressNone">
                              لا تشمل
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="addressOptional" />
                            <RadioLabel htmlFor="addressOptional">
                              اختياري <RecommendedTag>موصى به</RecommendedTag>
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="addressRequired" />
                            <RadioLabel htmlFor="addressRequired">
                              مطلوب
                            </RadioLabel>
                          </RadioOption>
                        </RadioGroup>
                      </div>

                      <div>
                        <RadioLabel
                          style={{ marginBottom: "16px", display: "block" }}
                        >
                          رقم هاتف عنوان الشحن
                        </RadioLabel>
                        <RadioGroup>
                          <RadioOption>
                            <RadioInput type="radio" id="phoneNone" />
                            <RadioLabel htmlFor="phoneNone">لا تشمل</RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="phoneOptional" />
                            <RadioLabel htmlFor="phoneOptional">
                              اختياري
                            </RadioLabel>
                          </RadioOption>

                          <RadioOption>
                            <RadioInput type="radio" id="phoneRequired" />
                            <RadioLabel htmlFor="phoneRequired">
                              مطلوب
                            </RadioLabel>
                          </RadioOption>
                        </RadioGroup>
                      </div>
                    </SectionCard>

                    {/* Marketing Options */}
                    <SectionCard>
                      <MarketingSection>
                        <MarketingContent>
                          <MarketingTitle>
                            خيارات التسويق
                            <InfoIcon>i</InfoIcon>
                          </MarketingTitle>
                          <SectionDescription>
                            عرض مربع اختيار للعملاء للاشتراك في التسويق عبر
                            البريد الإلكتروني أو الرسائل النصية
                          </SectionDescription>
                        </MarketingContent>
                        <CustomizeButton>تخصيص التسميات</CustomizeButton>
                      </MarketingSection>

                      <MarketingOptions>
                        <MarketingOption>
                          <MarketingOptionLeft>
                            <MarketingIcon>✉</MarketingIcon>
                            <MarketingOptionLabel>
                              البريد الإلكتروني
                            </MarketingOptionLabel>
                          </MarketingOptionLeft>
                          <Toggle />
                        </MarketingOption>

                        <MarketingOption>
                          <MarketingOptionLeft>
                            <MarketingIcon>📱</MarketingIcon>
                            <MarketingOptionLabel>
                              الرسائل النصية
                            </MarketingOptionLabel>
                          </MarketingOptionLeft>
                          <Toggle />
                        </MarketingOption>
                      </MarketingOptions>
                    </SectionCard>
                    <SectionCard>
                      <SectionTitle>
                        البقشيش
                        <InfoIcon>i</InfoIcon>
                      </SectionTitle>
                      <SectionDescription>
                        يمكن للعملاء الاختيار بين 3 إعدادات مسبقة أو إدخال مبلغ
                        مخصص
                      </SectionDescription>

                      <CheckboxContainer>
                        <Checkbox type="checkbox" id="showTipping" />
                        <CheckboxLabel htmlFor="showTipping">
                          إظهار خيارات البقشيش عند الخروج
                        </CheckboxLabel>
                      </CheckboxContainer>
                    </SectionCard>

                    {/* Checkout Language */}
                    <SectionCard>
                      <SectionTitle>لغة الخروج</SectionTitle>

                      <LanguageSelector>
                        <LanguageInput>العربية</LanguageInput>
                        <CustomizeButton>تحرير محتوى الخروج</CustomizeButton>
                      </LanguageSelector>
                    </SectionCard>

                    {/* Advanced Preferences */}
                    <SectionCard>
                      <SectionTitle>التفضيلات المتقدمة</SectionTitle>

                      <AdvancedOption>
                        <AdvancedOptionLeft>
                          <AdvancedIcon>📍</AdvancedIcon>
                          <div>
                            <AdvancedOptionTitle>
                              جمع العناوين
                            </AdvancedOptionTitle>
                            <AdvancedOptionDescription>
                              إدارة كيفية جمع عناوين الشحن والفواتير
                            </AdvancedOptionDescription>
                          </div>
                        </AdvancedOptionLeft>
                        <ArrowIcon>›</ArrowIcon>
                      </AdvancedOption>

                      <AdvancedOption>
                        <AdvancedOptionLeft>
                          <AdvancedIcon>🛒</AdvancedIcon>
                          <div>
                            <AdvancedOptionTitle>
                              حد الإضافة إلى السلة
                              <RecommendedTag>موصى به</RecommendedTag>
                            </AdvancedOptionTitle>
                            <AdvancedOptionDescription>
                              يحمي كميات المخزون المتاحة من الكشف عنها
                            </AdvancedOptionDescription>
                          </div>
                        </AdvancedOptionLeft>
                        <ToggleContainer>
                          <ToggleStatus>تشغيل</ToggleStatus>
                          <ArrowIcon>›</ArrowIcon>
                        </ToggleContainer>
                      </AdvancedOption>
                    </SectionCard>
                    <SaveButtonContainer>
                      <SaveButton>حفظ</SaveButton>
                    </SaveButtonContainer>
                  </CheckoutContainer>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "الشحن":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>الشحن والتوصيل</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>

                <SettingMiddle>
                  {/* Shipping Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>الشحن</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>
                    <SectionSubtitle>
                      إدارة أماكن الشحن وكم تتقاضى
                    </SectionSubtitle>

                    <ShippingCard>
                      <ShippingLeft>
                        <ShippingRatesTitle>
                          أسعار الشحن العامة
                        </ShippingRatesTitle>
                        <ProductCount>
                          <ProductIcon>📦</ProductIcon>
                          <span>0 منتجات</span>
                        </ProductCount>
                      </ShippingLeft>

                      <ShippingRight>
                        <RatesSection>
                          <RatesTitle>الأسعار لـ</RatesTitle>
                          <RateOption>
                            <RateIcon>🌍</RateIcon>
                            <RateText>محلي</RateText>
                            <ArrowIcon>←</ArrowIcon>
                          </RateOption>
                          <RateOption>
                            <RateIcon>🌏</RateIcon>
                            <RateText>دولي</RateText>
                          </RateOption>
                        </RatesSection>
                      </ShippingRight>
                    </ShippingCard>

                    <CustomProfileLink>
                      إنشاء ملف تعريف مخصص لتعيين أسعار مختلفة أو تقييد الوجهات
                      لمنتجات محددة
                    </CustomProfileLink>
                  </ShippingSection>

                  {/* Shipping Labels Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>ملصقات الشحن</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>
                    <SectionSubtitle>
                      شراء الملصقات بأقل الأسعار. إدارة شركات النقل لتنفيذ
                      الطلبات بشكل أسرع.
                    </SectionSubtitle>
                    <CalculateButton>حساب الأسعار</CalculateButton>
                  </ShippingSection>

                  {/* Expected Delivery Dates Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>تواريخ التسليم المتوقعة</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>
                    <SectionSubtitle>
                      زيادة التحويل وبناء الثقة مع تواريخ التسليم المقدرة على
                      الطلبات المؤهلة
                    </SectionSubtitle>

                    <DeliveryOptions>
                      <DeliveryOption>
                        <OptionLeft>
                          <OptionTitle>وعد المتجر</OptionTitle>
                          <OptionDesc>
                            أبرز أنك شاحن استثنائي مع تواريخ مدعومة بشارة وضمان
                          </OptionDesc>
                        </OptionLeft>
                        <ToggleSwitch>إيقاف</ToggleSwitch>
                      </DeliveryOption>

                      <DeliveryOption>
                        <OptionLeft>
                          <OptionTitle>تواريخ التسليم اليدوية</OptionTitle>
                          <OptionDesc>
                            حساب التواريخ يدوياً عند الدفع عندما تكون تواريخ
                            التسليم التلقائية غير متاحة
                          </OptionDesc>
                        </OptionLeft>
                        <ToggleSwitch>إيقاف</ToggleSwitch>
                      </DeliveryOption>
                    </DeliveryOptions>
                  </ShippingSection>

                  {/* Local Delivery Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>التوصيل المحلي</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>
                    <SectionSubtitle>
                      توصيل الطلبات للعملاء مباشرة من مواقعك
                    </SectionSubtitle>
                    <SetupButton>إعداد</SetupButton>
                  </ShippingSection>

                  {/* Pickup in Store Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>الاستلام من المتجر</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>
                    <SectionSubtitle>
                      دع العملاء يستلمون طلباتهم من مواقعك
                    </SectionSubtitle>
                    <SetupButton>إعداد</SetupButton>
                  </ShippingSection>

                  {/* Delivery Customizations Section */}
                  <ShippingSection>
                    <SectionTitle>تخصيصات التوصيل</SectionTitle>
                    <SectionSubtitle>
                      التخصيصات تتحكم في كيفية ظهور خيارات التوصيل للمشترين عند
                      الدفع. يمكنك إخفاء وإعادة ترتيب وإعادة تسمية خيارات
                      التوصيل.
                    </SectionSubtitle>

                    <AddButton>
                      <span>+</span>
                      إضافة تخصيص التوصيل
                    </AddButton>
                  </ShippingSection>

                  {/* Saved Packages Section */}
                  <ShippingSection>
                    <SectionHeader>
                      <SectionTitle>الحزم المحفوظة</SectionTitle>
                      <InfoIcon>ⓘ</InfoIcon>
                    </SectionHeader>

                    <PackageCard>
                      <PackageIcon>📦</PackageIcon>
                      <PackageDetails>
                        <PackageName>صندوق عينة</PackageName>
                        <PackageDimensions>
                          22 × 13.7 × 4.2 سم، 0 كجم
                        </PackageDimensions>
                      </PackageDetails>
                      <PackageStatus>الحزمة الافتراضية</PackageStatus>
                      <MoreOptions>⋯</MoreOptions>
                    </PackageCard>

                    <PackageNote>
                      <InfoIcon>ⓘ</InfoIcon>
                      تُستخدم لحساب أسعار الشحن عند الدفع ومحددة مسبقاً عند شراء
                      الملصقات
                    </PackageNote>

                    <AddButton>
                      <span>+</span>
                      إضافة حزمة
                    </AddButton>
                  </ShippingSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );
      case "التنبيهات":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>التنبيهات</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>
                <SettingMiddle>
                  {/* بطاقة البريد الإلكتروني للمرسل */}
                  <SenderEmailSection>
                    <SectionTitle>البريد الإلكتروني للمرسل</SectionTitle>
                    <SectionDesc>
                      البريد الإلكتروني الذي يستخدمه متجرك لإرسال الرسائل إلى
                      عملائك
                    </SectionDesc>
                    <InputWrapper>
                      <EmailInput value="alsabahiyah@hotmail.com" readOnly />
                      <UnverifiedBadge>غير موثق</UnverifiedBadge>
                    </InputWrapper>
                    <VerificationText>
                      تأكد من أنك تمتلك حق الوصول إلى هذا البريد الإلكتروني.{" "}
                      <ResendLink>إعادة إرسال التوثيق</ResendLink>
                    </VerificationText>
                  </SenderEmailSection>

                  {/* قائمة التنبيهات */}
                  <NotificationsSection>
                    <NotificationItem>
                      <LeftContent>
                        <IconWrapper>
                          <SettingImg src={homeIcon} alt="" />
                        </IconWrapper>
                        <Info>
                          <InfoTitle>إشعارات العملاء</InfoTitle>
                          <InfoDesc>
                            إعلام العملاء بحالة الطلب وحساباتهم
                          </InfoDesc>
                        </Info>
                      </LeftContent>
                      <ArrowWrapper>
                        <SettingImg src={homeIcon} alt="" />
                      </ArrowWrapper>
                    </NotificationItem>

                    <NotificationItem>
                      <LeftContent>
                        <IconWrapper>
                          <SettingImg src={homeIcon} alt="" />
                        </IconWrapper>
                        <Info>
                          <InfoTitle>إشعارات الموظفين</InfoTitle>
                          <InfoDesc>
                            إعلام أعضاء الفريق بأحداث الطلبات الجديدة
                          </InfoDesc>
                        </Info>
                      </LeftContent>
                      <ArrowWrapper>
                        <SettingImg src={homeIcon} alt="" />
                      </ArrowWrapper>
                    </NotificationItem>

                    <NotificationItem>
                      <LeftContent>
                        <IconWrapper>
                          <SettingImg src={homeIcon} alt="" />
                        </IconWrapper>
                        <Info>
                          <InfoTitle>إشعار طلب التنفيذ</InfoTitle>
                          <InfoDesc>
                            إعلام مزود خدمة التنفيذ عند تعليم طلب كمُنَفَّذ
                          </InfoDesc>
                        </Info>
                      </LeftContent>
                      <ArrowWrapper>
                        <SettingImg src={homeIcon} alt="" />
                      </ArrowWrapper>
                    </NotificationItem>

                    <NotificationItem last>
                      <LeftContent>
                        <IconWrapper>
                          <SettingImg src={homeIcon} alt="" />
                        </IconWrapper>
                        <Info>
                          <InfoTitle>الويب هوك (Webhooks)</InfoTitle>
                          <InfoDesc>
                            إرسال إشعارات XML أو JSON حول أحداث المتجر إلى عنوان
                            URL
                          </InfoDesc>
                        </Info>
                      </LeftContent>
                      <ArrowWrapper>
                        <SettingImg src={homeIcon} alt="" />
                      </ArrowWrapper>
                    </NotificationItem>
                  </NotificationsSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
        );

      case "القوانين":
        return (
          <SettingWr dir="rtl">
            <SettingCon>
              <SettingPad>
                <SettingTop>
                  <SetTop>
                    <SetTopSub>
                      <SetTopSu>
                        <SetTopSuq>
                          <SetTopImgCon>
                            <SettingSp>
                              <SettingImg src={homeIcon} alt="" />
                            </SettingSp>
                          </SetTopImgCon>
                          <SetTopUr>
                            <SetTopHe>القوانين</SetTopHe>
                          </SetTopUr>
                        </SetTopSuq>
                      </SetTopSu>
                    </SetTopSub>
                  </SetTop>
                </SettingTop>
                <SettingMiddle>
                  {/* بطاقة قواعد الإرجاع */}
                  <ReturnRulesCard>
                    <CardHeader>
                      <HeaderInfo>
                        <RuleIcon src={homeIcon} alt="" />
                        <RuleTitle>قواعد الإرجاع</RuleTitle>
                      </HeaderInfo>
                      <OffBadge>إيقاف</OffBadge>
                    </CardHeader>
                    <RuleDesc>
                      قم بتمكين قواعد الإرجاع لتبسيط إدارة الإرجاع، وتحديد رسوم
                      الإرجاع، وشحن الإرجاع، وتعيين العناصر التي تُباع نهائيًا
                    </RuleDesc>
                    <ManageButton>إدارة</ManageButton>
                  </ReturnRulesCard>

                  {/* قائمة السياسات المكتوبة */}
                  <WrittenPoliciesSection>
                    <PoliciesHeader>
                      <PoliciesTitle>السياسات المكتوبة</PoliciesTitle>
                      <PoliciesSub>
                        تُضاف السياسات إلى تذييل صفحة الدفع ويمكن إضافتها إلى{" "}
                        <FooterLink href="#">
                          قائمة المتجر الإلكترونية
                        </FooterLink>
                      </PoliciesSub>
                    </PoliciesHeader>

                    <PoliciesList>
                      <PolicyItem>
                        <ItemLeft>
                          <ItemIcon src={homeIcon} alt="" />
                          <ItemText>سياسة الإرجاع والاسترداد</ItemText>
                        </ItemLeft>
                        <ItemRight>
                          <StatusBadge>لم يتم تعيين سياسة</StatusBadge>
                          <Arrow src={homeIcon} alt="" />
                        </ItemRight>
                      </PolicyItem>

                      <PolicyItem>
                        <ItemLeft>
                          <ItemIcon src={homeIcon} alt="" />
                          <ItemText>سياسة الخصوصية</ItemText>
                        </ItemLeft>
                        <ItemRight>
                          <StatusBadge automated>مؤتمتة</StatusBadge>
                          <Arrow src={homeIcon} alt="" />
                        </ItemRight>
                      </PolicyItem>

                      <PolicyItem>
                        <ItemLeft>
                          <ItemIcon src={homeIcon} alt="" />
                          <ItemText>شروط الخدمة</ItemText>
                        </ItemLeft>
                        <ItemRight>
                          <StatusBadge>لم يتم تعيين سياسة</StatusBadge>
                          <Arrow src={homeIcon} alt="" />
                        </ItemRight>
                      </PolicyItem>

                      <PolicyItem>
                        <ItemLeft>
                          <ItemIcon src={homeIcon} alt="" />
                          <ItemText>سياسة الشحن</ItemText>
                        </ItemLeft>
                        <ItemRight>
                          <StatusBadge>لم يتم تعيين سياسة</StatusBadge>
                          <Arrow src={homeIcon} alt="" />
                        </ItemRight>
                      </PolicyItem>

                      <PolicyItem last>
                        <ItemLeft>
                          <ItemIcon src={homeIcon} alt="" />
                          <ItemText>معلومات الاتصال</ItemText>
                        </ItemLeft>
                        <ItemRight>
                          <StatusBadge required>مطلوبة</StatusBadge>
                          <Arrow src={homeIcon} alt="" />
                        </ItemRight>
                      </PolicyItem>
                    </PoliciesList>
                  </WrittenPoliciesSection>
                </SettingMiddle>
              </SettingPad>
            </SettingCon>
          </SettingWr>
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
                      <LogoLink to={"/control"}>
                        <LogoImg src={logo} alt="" />
                      </LogoLink>
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
                <StartCon>
                  <SetSide />
                  <StartDiv>{renderContent()}</StartDiv>
                </StartCon>
              </MainSubCon>
            </MainCon>
          </ContentSection>
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Setting;
