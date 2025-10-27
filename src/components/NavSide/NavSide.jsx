import {
  NavLeft,
  NavMain,
  NavSubMain,
  NavStart,
  NavRe,
  ListUl,
  ListLi,
  ListDiv,
  ListBtn,
  ListSpan,
  SectionDiv,
  SectionUl,
  SectionLi,
  SectionAt,
  SectionIcon,
  StoreSec,
  StoreItem,
  StoreLink,
  StoreIconImg,
  StoreLabel,
  TogWr,
  TogCon,
  TogUl,
  TogLi,
  TogDiv,
  TogStart,
  TogBtn,
  TogBtnSp,
  TogBtnDiv,
} from "./NavSide.elements";
import homeIcon from "../../assets/home.png";
import ordersIcon from "../../assets/orders.png";
import tagIcon from "../../assets/tag.png";
import customersIcon from "../../assets/customers.png";
import marketingIcon from "../../assets/marketing.png";
import discountsIcon from "../../assets/discount.png";
import contentIcon from "../../assets/content.png";
import marketsIcon from "../../assets/markets.png";
import analyticsIcon from "../../assets/analytics.png";
import storeIcon from "../../assets/store.png";
import plusIcon from "../../assets/plus.png";
import settingIcon from "../../assets/setting.png";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/tabRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavSide = () => {
  const [activeToggle, setActiveToggle] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTab = (item) => {
    dispatch(setActiveTab(item));
    navigate(`/control?tab=${encodeURIComponent(item)}`);
    setActiveToggle(activeToggle === item ? null : item);
    // Clear subcategory selection when main tab is clicked
    setSelectedSubcategory(null);
  };

  const handleSubcategory = (subcategory, parentCategory) => {
    setSelectedSubcategory(subcategory.text);
    // Keep the parent toggle open
    setActiveToggle(parentCategory);

    // Navigate to subcategory destination if provided
    if (subcategory.destination) {
      navigate(subcategory.destination);
    }

    // Dispatch the subcategory as active tab
    dispatch(setActiveTab(subcategory.text));
  };

  const handleDestination = (des) => {
    navigate(des);
  };

  const Sales = [
    {
      text: "قنوات البيع",
      subText: "المتجر الإلكتروني",
      icon: storeIcon,
      destination: "المتجر",
    },
    {
      text: "التطبيقات",
      subText: "إضافة",
      icon: plusIcon,
      destination: "التطبيقات",
    },
  ];

  const Pages = [
    {
      text: "الرئيسية",
      icon: homeIcon,
    },
    {
      text: "الطلبات",
      icon: ordersIcon,
      products: [{ text: "السلات المتروكة" }, { text: "مسودة" }],
    },
    {
      text: "المنتجات",
      icon: tagIcon,
      products: [
        { text: "المجموعة" },
        { text: "المخزون" },
        { text: "تاريخ الشراء" },
        { text: "التحويل" },
        { text: "الهدايا" },
      ],
    },
    {
      text: "العملاء",
      icon: customersIcon,
      products: [{ text: "جزء" }],
    },
    {
      text: "التسويق",
      icon: marketingIcon,
      products: [{ text: "الحملات" }, { text: "الاتمته" }],
    },
    {
      text: "الخصومات",
      icon: discountsIcon,
      products: [],
    },
    {
      text: "المحتوى",
      icon: contentIcon,
      products: [{ text: "الملفات" }, { text: "المنيو" }, { text: "البلوقز" }],
    },
    {
      text: "الأسواق",
      icon: marketsIcon,
      products: [{ text: "الكتلوق" }],
    },
    {
      text: "التحليلات",
      icon: analyticsIcon,
      products: [{ text: "الربورت" }, { text: "لايف" }],
    },
  ];

  return (
    <NavLeft>
      <NavMain>
        <NavSubMain>
          <NavStart>
            <NavRe>
              <SectionDiv>
                <SectionUl>
                  {Pages.map((item, index) => {
                    return (
                      <SectionLi key={index}>
                        <SectionAt onClick={() => handleTab(item.text)}>
                          <SectionIcon src={item.icon} />
                          <span>{item.text}</span>
                        </SectionAt>
                        {activeToggle === item.text &&
                        item.products?.length > 0 ? (
                          <TogWr>
                            <TogCon>
                              <TogUl>
                                <TogLi>
                                  <TogDiv>
                                    <TogStart>
                                      <TogBtnDiv>
                                        {item.products.map(
                                          (subcategory, subIndex) => {
                                            return (
                                              <TogBtn
                                                key={subIndex}
                                                onClick={() =>
                                                  handleSubcategory(
                                                    subcategory,
                                                    item.text
                                                  )
                                                }
                                                $isSelected={
                                                  selectedSubcategory ===
                                                  subcategory.text
                                                }
                                              >
                                                <TogBtnSp>
                                                  {subcategory.text}
                                                </TogBtnSp>
                                              </TogBtn>
                                            );
                                          }
                                        )}
                                      </TogBtnDiv>
                                    </TogStart>
                                  </TogDiv>
                                </TogLi>
                              </TogUl>
                            </TogCon>
                          </TogWr>
                        ) : null}
                      </SectionLi>
                    );
                  })}
                </SectionUl>
              </SectionDiv>
              <ListUl>
                {Sales.map((item, index) => {
                  return (
                    <ListLi key={index}>
                      <ListDiv>
                        <ListBtn>
                          <ListSpan>{item.text}</ListSpan>
                          <span>.</span>
                        </ListBtn>
                      </ListDiv>
                      <StoreSec>
                        <StoreItem>
                          <StoreLink
                            onClick={() => handleTab(item.destination)}
                          >
                            <StoreIconImg src={item.icon} />
                            <StoreLabel>{item.subText}</StoreLabel>
                          </StoreLink>
                        </StoreItem>
                      </StoreSec>
                    </ListLi>
                  );
                })}
              </ListUl>

              <StoreSec>
                <StoreItem>
                  <StoreLink onClick={() => handleDestination("/preference")}>
                    <StoreIconImg src={settingIcon} alt="Online Store" />
                    <StoreLabel>الاعدادات</StoreLabel>
                  </StoreLink>
                </StoreItem>
              </StoreSec>
            </NavRe>
          </NavStart>
        </NavSubMain>
      </NavMain>
    </NavLeft>
  );
};

export default NavSide;
