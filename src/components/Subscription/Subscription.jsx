import React from "react";
import styled, { css } from "styled-components";
import crossIcon from "../../assets/cross.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

const plans = [
  {
    id: "basic",
    name: "الخطة الأساسية",
    tagline: "لروّاد الأعمال الفرديين",
    oldPrice: 27,
    promoPrice: 27,
    promoSuffix: "دولار/شهرياً لأول 3 أشهر",
    rate: "2% رسوم مزوّدي الدفع الخارجيين",
    bullets: [
      "10 مواقع مخزون",
      "دعم محادثة 24/7",
      "البيع حضورياً عبر الهاتف أو جهاز نقاط البيع",
    ],
    highlightLabel: "الأكثر شيوعاً",
    highlight: true,
  },
  {
    id: "grow",
    name: "خطة النمو",
    tagline: "للفرق الصغيرة",
    oldPrice: 72,
    promoPrice: 69,
    promoSuffix: "دولار/شهرياً لأول 3 أشهر",
    rate: "1% رسوم مزوّدي الدفع الخارجيين",
    bullets: [
      "10 مواقع مخزون",
      "دعم محادثة 24/7",
      "5 حسابات موظفين إضافية",
      "البيع حضورياً عبر الهاتف أو جهاز نقاط البيع",
    ],
  },
  {
    id: "advanced",
    name: "الخطة المتقدمة",
    tagline: "عندما يتوسّع عملك",
    oldPrice: 399,
    promoPrice: 250,
    promoSuffix: "دولار/شهرياً لأول 3 أشهر",
    rate: "0.6% رسوم مزوّدي الدفع الخارجيين",
    bullets: [
      "10 مواقع مخزون",
      "دعم محادثة مُعزّز 24/7",
      "متاجر محلية حسب السوق",
      "15 حساب موظف إضافي",
      "البيع حضورياً عبر الهاتف أو جهاز نقاط البيع",
    ],
  },
  {
    id: "plus",
    name: "خطة بلس (مؤسسات)",
    tagline: "للأعمال المعقّدة",
    startingLabel: "ابتداءً من",
    price: 2300,
    priceSuffix: "دولار/شهرياً",
    rate: "0.2% رسوم مزوّدي الدفع الخارجيين",
    bullets: [
      "200 موقع مخزون",
      "دعم هاتفي أولوية 24/7",
      "متاجر محلية حسب السوق",
      "حسابات موظفين غير محدودة",
      "عملية دفع قابلة للتخصيص لحجمٍ عالٍ",
      "البيع بالجملة / B2B",
      "حتى 200 موقع نقاط بيع Pro",
    ],
    enterprise: true,
  },
];

const Subscription = ({ onSelect, initialSelected = true }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(initialSelected || null);
  const navigate = useNavigate();

  const handleDestination = (des) => {
    navigate(des);
  };

  const handleSelect = (id) => {
    setSelected(id);
    onSelect?.(id);

    // Find the selected plan
    const selectedPlan = plans.find((plan) => plan.id === id);

    if (selectedPlan) {
      // Create product object similar to handleEnroll
      const product = {
        _id: selectedPlan.id.toUpperCase(),
        title: selectedPlan.name,
        price: selectedPlan.enterprise
          ? selectedPlan.price
          : selectedPlan.promoPrice,
        quantity: 1,
        metadata: {
          oldPrice: selectedPlan.oldPrice,
          priceSuffix: selectedPlan.enterprise
            ? selectedPlan.priceSuffix
            : selectedPlan.promoSuffix,
          rate: selectedPlan.rate,
          isEnterprise: selectedPlan.enterprise || false,
          type: "subscription",
        },
      };

      // Dispatch to Redux store (you'll need to import addProduct)
      dispatch(addProduct(product));

      // Navigate to checkout
      navigate("/outcome");
    }
  };
  /* Utility */
  function formatNumber(n) {
    if (typeof n !== "number") return n;
    return n.toLocaleString();
  }

  return (
    <PageWrapper dir="rtl">
      <TopBar>
        <CloseBtn
          onClick={() => {
            handleDestination("/control");
          }}
        >
          <CrossImg src={crossIcon} alt="" />
        </CloseBtn>
        <Crumb>صفحة الدفع </Crumb>
      </TopBar>

      <Headline>اختر خطتك</Headline>
      <TaglineRow>
        <TaglineCheck>✓ أفضل نظام دفع</TaglineCheck>
        <TaglineCheck>✓ بيع عبر الإنترنت وحضورياً</TaglineCheck>
        <TaglineCheck>✓ دعم محادثة 24/7</TaglineCheck>
        <TaglineCheck>✓ أكثر من 13,000 تطبيق</TaglineCheck>
      </TaglineRow>

      <CardsGrid>
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            $highlight={p.highlight}
            $enterprise={p.enterprise}
          >
            {p.highlight && (
              <Badge>{p.highlightLabel || "الأكثر شيوعاً"}</Badge>
            )}
            <CardInner>
              <PlanHeader>
                <PlanTitle>{p.name}</PlanTitle>
                <PlanSubtitle>{p.tagline}</PlanSubtitle>
              </PlanHeader>

              {p.enterprise ? (
                <PriceBlock>
                  <PriceStarting>{p.startingLabel}</PriceStarting>
                  <BigPrice>${formatNumber(p.price)}</BigPrice>
                  <PriceSuffix>{p.priceSuffix}</PriceSuffix>
                </PriceBlock>
              ) : (
                <PriceBlock>
                  <OldPrice>${formatNumber(p.oldPrice)}</OldPrice>
                  <PromoPriceWrap>
                    <BigPrice>${p.promoPrice}</BigPrice>
                    <PriceSuffix>{p.promoSuffix}</PriceSuffix>
                  </PromoPriceWrap>
                </PriceBlock>
              )}

              <SelectBtn
                type="button"
                onClick={() => handleSelect(p.id)}
                $selected={selected === p.id}
              >
                {`اختر ${p.name}`}
              </SelectBtn>

              <RateBox>
                تبدأ رسوم البطاقات من
                <br />
                <strong>{p.rate}</strong>
              </RateBox>

              <Bullets>
                {p.bullets.map((b, i) => (
                  <li key={i}>
                    <Check>✓</Check>
                    <span>{b}</span>
                  </li>
                ))}
              </Bullets>
            </CardInner>
          </PlanCard>
        ))}
      </CardsGrid>
    </PageWrapper>
  );
};
/* -------------------- Styled Components -------------------- */

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 3rem 3rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  color: #000;
  background-color: #f1f1f1;
  /* اجعل النص الافتراضي من اليمين */
  text-align: center;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: #6b7280;
  padding: 0 1rem 0;
`;

const Crumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #9ca3af;
  padding: 0 0.25rem;
  transition: color 0.15s ease;
  &:hover {
    color: #4b5563;
  }
  &:focus {
    outline: none;
  }
`;

const Headline = styled.h1`
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 0.75rem;
  text-align: center;
`;

const CrossImg = styled.img`
  width: 40px;
  height: 40px;
`;

const TaglineRow = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 1.5rem;
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 2rem;
`;

const TaglineCheck = styled.span`
  white-space: nowrap;
`;

const CardsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
  align-items: stretch;
`;

const PlanCard = styled.article`
  position: relative;
  background: #fff;
  border-radius: 1.25rem;
  /* تمت إزالة الإطار الأزرق والخلفية المزروقة للخطة المميزة */
  ${({ $highlight }) =>
    $highlight
      ? css`
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.08);
          /* يمكنك إضافة تمييز خفيف مختلف هنا لو رغبت */
        `
      : css`
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.08);
        `}
  padding-top: 2.25rem; /* مساحة للشارة */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 520px;

  ${({ $enterprise }) =>
    $enterprise &&
    css`
      min-height: 560px;
    `}
`;

const Badge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 50%;
  transform: translateX(50%); /* لأن RTL */
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0b5cff;
  background: #e2ecff;
  border-radius: 999px;
  pointer-events: none;
  white-space: nowrap;
`;

const CardInner = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanHeader = styled.header`
  text-align: center;
  margin-bottom: 1.25rem;
`;

const PlanTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
`;

const PlanSubtitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
`;

const PriceBlock = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1.25rem;
`;

const OldPrice = styled.span`
  display: block;
  font-size: 1.25rem;
  color: #b7b9c3;
  text-decoration: line-through;
  margin-bottom: 0.25rem;
`;

const PromoPriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigPrice = styled.span`
  display: block;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 0.25rem;
`;

const PriceSuffix = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

const PriceStarting = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const SelectBtn = styled.button`
  width: 100%;
  height: 44px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: #1f1f1f;
  color: #fff;
  transition: transform 0.07s ease, box-shadow 0.07s ease;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.8);
  &:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background: #0b5cff;
      box-shadow: 0 2px 0 rgba(11, 92, 255, 0.8);
    `}
`;

const RateBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background: #f3f4f6;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  color: #4b5563;
  line-height: 1.25;
`;

const Bullets = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #111827;

  /* مهم: محاذاة يمين لقائمة عربية */
  text-align: right;

  li {
    display: flex;
    flex-direction: row-reverse; /* أيقونة بعد النص بصرياً، لكن منطقيًا تبقى منظمة */
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.25;
  }
`;

const Check = styled.span`
  line-height: 1;
`;

export default Subscription;
