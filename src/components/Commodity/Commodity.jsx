import React, { useState } from "react";
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
  OreWr,
  OreForm,
  OreCon,
  OreLeft,
  OreLeSt,
  OreLeDiv,
  OreLeCol,
  OreLeSec,
  OreLeRe,
  OreLeSp,
  OreLeStart,
  OreLeSta,
  OreLeInDiv,
  OreLeInSub,
  OreLeIn,
  OreLeInSu,
  OreRight,
  OreRiTop,
  OreRiToTi,
  OreRiToHe,
  OreRiBo,
  OreRiSeDiv,
  OreRiSe,
  OreRiCon,
  OreRiSpan,
  OreRiSp,
  OreRiImg,
  OreBo,
  OreBoSub,
  OreBoBtnCon,
  OreBoBtn,
  OreBoBtnSp,
  DesWr,
  DesAreaWr,
  DesArea,
  DesWrap,
  DesTextarea,
  DesIcWr,
  DesIcCon,
  DesIcFl,
  DesArr,
  DesBtn,
  DesHtmlImg,
  DesLe,
  DesSec,
  DesThi,
  DesFir,
  DesDiv,
  DesFirSp,
  FontBtn,
  FontFlex,
  MedWr,
  MedCon,
  MedFl,
  MedPara,
  MedStart,
  MedBtnCon,
  MedBtn,
  MedBtnSp,
  MedBtnSel,
  MedSel,
  CatPara,
  CatCon,
  CatGrid,
  CatGridTop,
  CatGridBot,
  CatSu,
  CatSuBtn,
  CatDiv,
  CatGr,
  CatGri,
  CatInpCon,
  CatInp,
  ManageBtn,
  ManageSpan,
  ManageDiv,
  OnlUl,
  OnlLi,
  OnlWr,
  OnlSp,
  OnlBtn,
  ManRiTop,
  ManDiv,
  ScheduleImg,
  ScheduleDiv,
  TypeWr,
  TypeCon,
  TypeStart,
  TypeDiv,
  TypeInpWr,
  TypeInpCon,
  TypeBox,
  TypeBoxIn,
  TypeBoxBo,
  PriWr,
  PriCon,
  PriTop,
  PriTopSp,
  PriMid,
  PriBot,
  PriMidFl,
  ChaWr,
  ChaLa,
  ChaLaSpan,
  ChaRe,
  ChaMa,
  ChaInp,
  ChaInpCon,
  ChaInpWhite,
  MonWr,
  MonCon,
  MonGri,
  MonCol,
  MonTop,
  MonLab,
  MonBot,
  MonBotWr,
  MonBotFl,
  MonBotTag,
  MonBotIn,
  MonBotSel,
  MonBotSelCon,
  MoSp,
  CatOpt,
  DoneCon,
  DoneCard,
  DoneHeader,
  DoneBody,
  DoneLink,
} from "./Commodity.elements";
import inputIcon from "../../assets/input.png";
import htmlIcon from "../../assets/html.png";
import aiIcon from "../../assets/ai.png";
import boldIcon from "../../assets/bold.png";
import underlineIcon from "../../assets/underline.png";
import alignIcon from "../../assets/align.png";
import italicIcon from "../../assets/italic.png";
import logo from "../../assets/drslallum.png";
import { useDispatch, useSelector } from "react-redux";
import NavSide from "../NavSide/NavSide";
import ordersIcon from "../../assets/orders.png";
import ScheduleIcon from "../../assets/schedule.png";
import selectIcon from "../../assets/selectIcon.png";
import moreIcon from "../../assets/more.png";
import contentIcon from "../../assets/content.png";
import contentImage from "../../assets/content.svg";
import ordersImage from "../../assets/order.png";
import arrowDown from "../../assets/arrowDown.png";
import discountImage from "../../assets/discount.svg";
import discountsIcon from "../../assets/discount.png";
import { publicRequest, userRequest } from "../../requestMethods";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

const Commodity = () => {
  const [doneToggle, setDoneToggle] = useState(false);
  const activeTab = useSelector((state) => state.tab.activeTab);
  const storeName = useSelector((state) => state.tab.storeName);
  const accessToken = useSelector(
    (state) => state.user?.currentUser?.accessToken
  );
  const businessId = useSelector(
    (state) => state.user?.currentUser?.businessId
  );

  const countryArray = [
    { title: "الحالة الافتراضية" },
    { title: "الرياض" },
    { title: "جدة" },
  ];
  const featureArray = [
    { title: "الحالة الافتراضية" },
    { title: "نعم" },
    { title: "لا" },
  ];

  const typeArray = [
    { label: "الحالة الافتراضية", title: "" }, // أو "default" إن أردت
    { label: "قاعات / مواقع الفعاليات", title: "venues" },
    { label: "مصورين", title: "photographers" },
    { label: "دي جي", title: "dj" },
    { label: "صالون تجميل", title: "salon" },
    { label: "المغني", title: "bands" },
    { label: "استئجار", title: "rentals" },
    { label: "تصوير الفيديوات", title: "videographer" },
    { label: "التموين", title: "catering" },
  ];

  const renderContent = () => {
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
    }) => {
      const [info, setInfo] = useState({
        title: "",
        des: "",
        madia: "",
        type: "",
        prePrice: null,
        postPrice: null,
        weight: "",
        status: "",
        unique: "",
        seller: "",
        category: "",
        brand: "",
        theme: "",
        location: "",
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const [success, setSuccess] = useState(false);

      const handleChange = (e, item) => {
        setInfo((pre) => ({ ...pre, [item]: e.target.value }));
      };

      const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const res = await axios.post(
            `${BASE_URL}/vendors`,
            {
              name: info.title,
              description: info.des,
              category: info.type,
              location: info.location,
              businessId,
              prePrice: info.prePrice,
              postPrice: info.postPrice,
              weight: info.weight,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setSuccess(true);
        } catch (err) {
          setError(
            err.response?.data?.error ||
              err.response?.data?.message ||
              "An error occurred"
          );
          console.error(err);
        } finally {
          setDoneToggle(true);
          setLoading(false);
        }
      };

      const InputProps = ({
        title,
        subTitle,
        handleLocation,
        country,
        main,
        arr,
        target,
      }) => {
        return (
          <OreRiTop>
            <OreRiToTi>
              <OreRiToHe>{title}</OreRiToHe>
            </OreRiToTi>
            <OreRiBo>
              <OreRiSeDiv>
                <OreRiSe
                  type="select"
                  name={country}
                  id={main}
                  value={target}
                  onChange={handleLocation}
                  disabled={loading}
                  required
                >
                  {arr.map((item, index) => {
                    return <CatOpt key={index}>{item.title}</CatOpt>;
                  })}
                </OreRiSe>
                <CatSu>
                  <CatSuBtn>
                    <OreRiSp>
                      <OreRiImg src={selectIcon} alt="" />
                    </OreRiSp>
                  </CatSuBtn>
                </CatSu>
              </OreRiSeDiv>
            </OreRiBo>
          </OreRiTop>
        );
      };

      const TypeProps = ({ title, PaddingDown }) => {
        return (
          <TypeWr PaddingBottom={PaddingDown}>
            <TypeCon>
              <TypeStart>
                <TypeDiv>
                  <label htmlFor="type">{title}</label>
                </TypeDiv>
                <TypeInpWr>
                  <div></div>
                  <TypeInpCon>
                    <TypeBox>
                      <TypeBoxIn type="text" />
                      <TypeBoxBo></TypeBoxBo>
                    </TypeBox>
                  </TypeInpCon>
                </TypeInpWr>
              </TypeStart>
            </TypeCon>
          </TypeWr>
        );
      };

      return (
        <OreWr>
          {doneToggle ? (
            <DoneCon>
              <DoneCard>
                <DoneHeader>
                  <FaCheckCircle style={{ marginLeft: "0.5rem" }} />
                  <span>تهانينا! لقد أضفت أول منتج لك</span>
                </DoneHeader>
                <DoneBody>
                  <DoneLink to={"/control"}>تابع إعداد متجرك</DoneLink>
                </DoneBody>
              </DoneCard>
            </DoneCon>
          ) : null}
          <OreForm onSubmit={handleForm}>
            <OreCon>
              <OreLeft>
                <OreLeSt>
                  <OreLeDiv>
                    <OreLeCol>
                      <OreLeRe>
                        <OreLeSec>
                          <OreLeRe>
                            <div>
                              <OreLeStart>
                                <OreLeSp>العنوان</OreLeSp>
                              </OreLeStart>
                              <OreLeSta>
                                <OreLeInDiv>
                                  <OreLeInSub>
                                    <OreLeIn
                                      id="title-text"
                                      name="title"
                                      type="text"
                                      placeholder="شرح بسيط عن المنتج"
                                      value={info.title}
                                      onChange={(e) => handleChange(e, "title")}
                                      disabled={loading}
                                      required
                                      autoComplete="off"
                                      autoFocus
                                    />
                                    <OreLeInSu></OreLeInSu>
                                  </OreLeInSub>
                                </OreLeInDiv>
                              </OreLeSta>
                            </div>
                          </OreLeRe>
                          <OreLeRe>
                            <div>
                              <OreLeStart>
                                <OreLeSp>الوصف</OreLeSp>
                              </OreLeStart>
                              <DesWr>
                                <DesIcWr>
                                  <DesIcCon>
                                    <DesIcFl>
                                      <DesLe>
                                        <DesFir>
                                          <DesBtn>
                                            <DesHtmlImg src={aiIcon} alt="" />
                                            <DesHtmlImg
                                              src={arrowDown}
                                              alt=""
                                            />
                                          </DesBtn>
                                        </DesFir>
                                        <DesDiv />
                                        <DesSec>
                                          <DesBtn>
                                            <DesFirSp>Paragraph</DesFirSp>
                                            <DesHtmlImg
                                              src={arrowDown}
                                              alt=""
                                            />
                                          </DesBtn>
                                          <DesDiv />
                                          <FontFlex>
                                            <FontBtn>
                                              <DesHtmlImg
                                                src={boldIcon}
                                                alt=""
                                              />
                                            </FontBtn>
                                            <FontBtn>
                                              <DesHtmlImg
                                                src={italicIcon}
                                                alt=""
                                              />
                                            </FontBtn>
                                            <FontBtn>
                                              <DesHtmlImg
                                                src={underlineIcon}
                                                alt=""
                                              />
                                            </FontBtn>
                                          </FontFlex>
                                          <DesDiv />
                                          <div>
                                            <DesBtn>
                                              <DesHtmlImg
                                                src={alignIcon}
                                                alt=""
                                              />
                                              <DesHtmlImg
                                                src={arrowDown}
                                                alt=""
                                              />
                                            </DesBtn>
                                          </div>
                                        </DesSec>
                                        <DesDiv />
                                        <DesThi>
                                          <DesBtn>
                                            <DesHtmlImg src={moreIcon} alt="" />
                                          </DesBtn>
                                        </DesThi>
                                      </DesLe>
                                      <DesArr>
                                        <DesBtn>
                                          <DesHtmlImg src={htmlIcon} alt="" />
                                        </DesBtn>
                                      </DesArr>
                                    </DesIcFl>
                                  </DesIcCon>
                                </DesIcWr>
                                <DesWrap>
                                  <DesAreaWr>
                                    <DesTextarea
                                      name="des"
                                      id="des-text"
                                      value={info.des}
                                      onChange={(e) => {
                                        handleChange(e, "des");
                                      }}
                                      disabled={loading}
                                      required
                                    ></DesTextarea>
                                    <DesArea></DesArea>
                                  </DesAreaWr>
                                </DesWrap>
                              </DesWr>
                            </div>
                          </OreLeRe>
                          <OreLeRe>
                            <div>
                              <OreLeStart>
                                <OreLeSp>الوسائط</OreLeSp>
                              </OreLeStart>
                              <DesWr>
                                <MedWr>
                                  <MedCon>
                                    <MedFl>
                                      <MedStart>
                                        <MedBtnCon>
                                          <MedBtn>
                                            <MedBtnSp>وسائط جديدة</MedBtnSp>
                                          </MedBtn>
                                        </MedBtnCon>
                                        <MedSel>
                                          <MedBtnSel>مرفوع بالسابق</MedBtnSel>
                                        </MedSel>
                                      </MedStart>
                                      <MedPara>
                                        يقبل الصور ومقاطع الفيديو أو النماذج
                                        ثلاثية الأبعاد
                                      </MedPara>
                                    </MedFl>
                                  </MedCon>
                                </MedWr>
                              </DesWr>
                            </div>
                          </OreLeRe>
                          <OreLeRe>
                            <div>
                              <OreLeStart>
                                <OreLeSp>الفئة</OreLeSp>
                              </OreLeStart>
                              <CatCon>
                                <CatGrid>
                                  <CatGridTop>
                                    <CatDiv>
                                      <div></div>
                                      <CatGr>
                                        <CatGri>
                                          <CatInpCon>
                                            <CatInp
                                              type="select"
                                              placeholder="اختر فئة المنتج"
                                              value={info.type}
                                              onChange={(e) => {
                                                handleChange(e, "type");
                                              }}
                                              disabled={loading}
                                            >
                                              {typeArray.map((item, index) => {
                                                return (
                                                  <CatOpt
                                                    key={index}
                                                    value={item.title}
                                                  >
                                                    {item.label}
                                                  </CatOpt>
                                                );
                                              })}
                                            </CatInp>
                                          </CatInpCon>
                                        </CatGri>
                                      </CatGr>
                                    </CatDiv>
                                    <CatSu>
                                      <CatSuBtn>
                                        <OreRiSp>
                                          <OreRiImg src={selectIcon} alt="" />
                                        </OreRiSp>
                                      </CatSuBtn>
                                    </CatSu>
                                  </CatGridTop>
                                  {/* come back an do when the cat open */}
                                  <CatGridBot></CatGridBot>
                                </CatGrid>
                              </CatCon>
                              <CatPara>
                                يحدد معدلات الضرائب ويضيف الحقول الوصفية لتحسين
                                البحث، والفلاتر، والمبيعات عبر القنوات المختلفة.
                              </CatPara>
                            </div>
                          </OreLeRe>
                        </OreLeSec>
                      </OreLeRe>
                      <div></div>
                      <div></div>
                    </OreLeCol>
                  </OreLeDiv>
                </OreLeSt>
                <PriWr>
                  <PriCon>
                    <PriTop>
                      <PriTopSp>السعر</PriTopSp>
                    </PriTop>
                    <PriMid>
                      <PriMidFl>
                        <MonWr>
                          <MonCon>
                            <MonGri>
                              <MonCol>
                                <MonTop>
                                  <MonLab>السعر</MonLab>
                                </MonTop>
                                <MonBot>
                                  <MonBotWr>
                                    <MonBotFl>
                                      <MonBotTag>SAR</MonBotTag>
                                      <MonBotIn
                                        type="number"
                                        name="prePrice"
                                        placeholder="0.00"
                                        id="prePrice-text"
                                        value={info.prePrice}
                                        onChange={(e) => {
                                          handleChange(
                                            {
                                              target: {
                                                value: Number(e.target.value),
                                              },
                                            },
                                            "prePrice"
                                          );
                                        }}
                                        disabled={loading}
                                        required
                                      />
                                    </MonBotFl>
                                  </MonBotWr>
                                </MonBot>
                              </MonCol>
                              <MonCol>
                                <MonTop>
                                  <MonLab>السعر السابق</MonLab>
                                </MonTop>
                                <MonBot>
                                  <MonBotWr>
                                    <MonBotFl>
                                      <MonBotTag>SAR</MonBotTag>
                                      <MonBotIn
                                        type="number"
                                        placeholder="0.00"
                                        name="postPrice"
                                        id="postPrice-text"
                                        value={info.postPrice ?? ""}
                                        onChange={(e) => {
                                          handleChange(
                                            {
                                              target: {
                                                value: Number(e.target.value),
                                              },
                                            },
                                            "postPrice"
                                          );
                                        }}
                                        disabled={loading}
                                        required
                                      />
                                    </MonBotFl>
                                  </MonBotWr>
                                </MonBot>
                              </MonCol>
                            </MonGri>
                          </MonCon>
                        </MonWr>
                        <ChaWr>
                          <ChaLa htmlFor="">
                            <ChaMa>
                              <ChaRe>
                                <ChaInp type="checkbox" />
                                <ChaInpCon></ChaInpCon>
                                <ChaInpWhite></ChaInpWhite>
                              </ChaRe>
                              <ChaLaSpan>اضافة ضريبة لهذا المنتج</ChaLaSpan>
                            </ChaMa>
                          </ChaLa>
                        </ChaWr>
                      </PriMidFl>
                    </PriMid>
                    <PriBot></PriBot>
                  </PriCon>
                </PriWr>
                <PriWr>
                  <PriCon>
                    <PriTop>
                      <PriTopSp>الشحن</PriTopSp>
                    </PriTop>
                    <PriMid>
                      <PriMidFl>
                        <ChaWr>
                          <ChaLa htmlFor="">
                            <ChaMa>
                              <ChaRe>
                                <ChaInp type="checkbox" />
                                <ChaInpCon></ChaInpCon>
                                <ChaInpWhite></ChaInpWhite>
                              </ChaRe>
                              <ChaLaSpan>هذا منتج غير رقمي</ChaLaSpan>
                            </ChaMa>
                          </ChaLa>
                        </ChaWr>
                        <MonWr>
                          <MonCon>
                            <MonGri>
                              <MonCol>
                                <MonTop>
                                  <MonLab>الوزن</MonLab>
                                </MonTop>
                                <MonBot>
                                  <MonBotWr>
                                    <MonBotFl>
                                      <MonBotIn
                                        type="number"
                                        name="weight"
                                        id="weight-text"
                                        value={info.weight}
                                        placeholder="0.00"
                                        onChange={(e) => {
                                          handleChange(e, "weight");
                                        }}
                                        disabled={loading}
                                        required
                                      />
                                    </MonBotFl>
                                  </MonBotWr>
                                </MonBot>
                                <MonBot>
                                  <MonBotWr>
                                    <MonBotFl>
                                      <MonBotSel name="KG" id="">
                                        <option value="">Kg</option>
                                        <option value="">lb</option>
                                      </MonBotSel>
                                      <MonBotSelCon>
                                        <MoSp>KG</MoSp>
                                        <OreRiSp>
                                          <OreRiImg src={selectIcon} alt="" />
                                        </OreRiSp>
                                      </MonBotSelCon>
                                    </MonBotFl>
                                  </MonBotWr>
                                </MonBot>
                              </MonCol>
                            </MonGri>
                          </MonCon>
                        </MonWr>
                      </PriMidFl>
                    </PriMid>
                    <PriBot></PriBot>
                  </PriCon>
                </PriWr>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </OreLeft>
              <OreRight>
                <InputProps
                  title="الحالة"
                  subTitle="نشط"
                  target={info.status}
                  arr={featureArray}
                  handleLocation={(e) => {
                    handleChange(e, "status");
                  }}
                />
                <ManRiTop>
                  <ManageDiv>
                    <OreRiToHe>نشر</OreRiToHe>
                    <ManageBtn>
                      <ManageSpan>ادارة</ManageSpan>
                    </ManageBtn>
                  </ManageDiv>
                  <OnlUl>
                    <OnlLi>
                      <OnlWr>
                        <ManDiv>
                          <OnlBtn>
                            <OnlSp>Online Store</OnlSp>
                            <ScheduleDiv>
                              <ScheduleImg src={ScheduleIcon} alt="" />
                            </ScheduleDiv>
                          </OnlBtn>
                        </ManDiv>
                        <ManDiv>
                          <OnlBtn>
                            <OnlSp>Point of Sale</OnlSp>
                          </OnlBtn>
                        </ManDiv>
                      </OnlWr>
                    </OnlLi>
                    <li></li>
                  </OnlUl>
                </ManRiTop>
                <OreRiTop>
                  <OreRiToTi>
                    <OreRiToHe>ترتيب المنتجات</OreRiToHe>
                  </OreRiToTi>

                  <TypeProps title="النوع" />
                  <TypeProps title="البائع" />
                  <TypeProps title="المجموعة" />
                  <TypeProps title="العلامة" PaddingDown={"1rem"} />
                </OreRiTop>
                <InputProps
                  title="الدولة"
                  arr={countryArray}
                  target={info.location}
                  subTitle="المنتج الافتراضي"
                  main="location"
                  country="country"
                  handleLocation={(e) => {
                    handleChange(e, "location");
                  }}
                />
              </OreRight>
              <OreBo>
                <OreBoSub>
                  <OreBoBtnCon>
                    <OreBoBtn type="submit">
                      <OreBoBtnSp>
                        {loading ? "جاري المعالجة" : "احفظ"}
                      </OreBoBtnSp>
                    </OreBoBtn>
                  </OreBoBtnCon>
                </OreBoSub>
              </OreBo>
            </OreCon>
          </OreForm>
        </OreWr>
      );
    };

    switch (activeTab) {
      case "الرئيسية":
        return (
          <>
            <OrderProps
              title="اضافة منتجات"
              subTitle="خيارات اكثر"
              heText="ستظهر طلباتك هنا"
              paraText="للحصول على الطلبات وقبول المدفوعات من العملاء، تحتاج إلى اختيار خطة. سيتم فرض رسوم الخطة عليك فقط بعد انتهاء الفترة التجريبية المجانية"
              firBtn="اختار الخطة"
              exFir="اعرف المزيد عن"
              exSec="الطلبات"
              imgSrc={ordersIcon}
              imgImg={ordersImage}
              imgSvg={arrowDown}
            />
          </>
        );
      case "الطلبات":
        return (
          <>
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
            />
          </>
        );
      case "المنتجات":
        return (
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
          />
        );
      case "العملاء":
        return (
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
          />
        );
      case "التسويق":
        return (
          <>
            <div>التسويق ...</div>
            <div></div>
          </>
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
        return (
          <>
            <div>الاسواق ...</div>
            <div></div>
          </>
        );
      case "التحليلات":
        return (
          <>
            <div>التخليلات ...</div>
            <div></div>
          </>
        );
      case "المتجر":
        return (
          <>
            <div>المتجر ...</div>
            <div></div>
          </>
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
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Commodity;
