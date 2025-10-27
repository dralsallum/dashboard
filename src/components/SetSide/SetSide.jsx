import {
  NavLeft,
  NavMain,
  SectionUl,
  SectionLi,
  SectionAt,
  SectionIcon,
  NavLeftCon,
  NavTop,
  NavTopLe,
  NotifBtnDiv,
  NotDiv,
  NotSpan,
  NotSp,
} from "./SetSide.elements";
import homeIcon from "../../assets/home.png";
import ordersIcon from "../../assets/orders.png";
import tagIcon from "../../assets/tag.png";
import customersIcon from "../../assets/customers.png";
import marketingIcon from "../../assets/marketing.png";
import discountsIcon from "../../assets/discount.png";
import contentIcon from "../../assets/content.png";
import marketsIcon from "../../assets/markets.png";
import analyticsIcon from "../../assets/analytics.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSettingTab } from "../../redux/settingRedux";

const SetSide = () => {
  const navigate = useNavigate();
  const storeName = useSelector((state) => state.tab.storeName);
  const dispatch = useDispatch();
  const handleTab = (item) => {
    dispatch(setSettingTab(item));
    navigate(`/preference?tab=${encodeURIComponent(item)}`);
  };

  const Pages = [
    {
      text: "عام",
      icon: homeIcon,
    },
    {
      text: "الاشتراك",
      icon: ordersIcon,
    },
    {
      text: "الفواتير",
      icon: tagIcon,
    },
    {
      text: "الرابط",
      icon: customersIcon,
    },
    {
      text: "المدفوعات",
      icon: marketingIcon,
    },
    {
      text: "السلة",
      icon: discountsIcon,
    },
    {
      text: "الشحن",
      icon: contentIcon,
    },
    {
      text: "التنبيهات",
      icon: analyticsIcon,
    },
    {
      text: "القوانين",
      icon: marketsIcon,
    },
  ];

  return (
    <NavLeftCon>
      <NavLeft>
        <NavMain>
          <NavTop>
            <NavTopLe>
              <NotifBtnDiv>
                <NotDiv>
                  <NotSpan>MS</NotSpan>
                </NotDiv>
                <NotSp>{storeName}</NotSp>
              </NotifBtnDiv>
            </NavTopLe>
          </NavTop>
          <SectionUl>
            {Pages.map((item, index) => {
              return (
                <SectionLi key={index}>
                  <SectionAt onClick={() => handleTab(item.text)}>
                    <SectionIcon src={item.icon} />
                    <span>{item.text}</span>
                  </SectionAt>
                </SectionLi>
              );
            })}
          </SectionUl>
        </NavMain>
      </NavLeft>
    </NavLeftCon>
  );
};

export default SetSide;
