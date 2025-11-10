// src/components/Help.jsx

import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding: 40px 20px;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      color: #333;
    }
  }

  span {
    color: #333;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 50%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 10px 0;
`;

const ArticleCount = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const FAQList = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 20px 24px;
  background: ${(props) => (props.$isOpen ? "#f8f8f8" : "white")};
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: right;
  font-size: 16px;
  color: #1a1a1a;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }

  &:focus {
    outline: none;
  }
`;

const QuestionText = styled.span`
  flex: 1;
  font-weight: 400;
`;

const Arrow = styled.span`
  margin-left: 16px;
  font-size: 18px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  color: #666;
`;

const FAQAnswer = styled.div`
  display: grid;
  grid-template-rows: ${(props) => (props.$isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 0.3s ease;
  background: #f8f8f8;
  overflow: hidden;
`;

const AnswerContent = styled.div`
  min-height: 0;
  padding: ${(props) => (props.$isOpen ? "20px 24px" : "0 24px")};
  color: #555;
  line-height: 1.6;
  font-size: 15px;
`;

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "كيف أقوم بإنشاء حساب في زوكدوك؟",
      answer:
        "لإنشاء حساب جديد، انقر على زر 'التسجيل' في الصفحة الرئيسية، ثم أدخل بريدك الإلكتروني وكلمة المرور. ستتلقى بريدًا إلكترونيًا للتحقق لتفعيل حسابك.",
    },
    {
      question: "حسابي مقفل. كيف أستعيد الوصول إليه؟",
      answer:
        "إذا كان حسابك مقفلاً، يمكنك التواصل مع فريق الدعم عبر البريد الإلكتروني support@zocdoc.com أو استخدام خيار 'نسيت كلمة المرور' لإعادة تعيين بياناتك.",
    },
    {
      question: "كيف أقوم بإعادة تعيين كلمة المرور؟",
      answer:
        "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، ثم أدخل بريدك الإلكتروني. ستتلقى رابطًا لإعادة تعيين كلمة المرور خلال دقائق قليلة.",
    },
    {
      question: "ما هي خيارات الجنس المتاحة في زوكدوك؟",
      answer:
        "يوفر زوكدوك مجموعة شاملة من خيارات الجنس والهوية لضمان الشمولية والاحترام لجميع المستخدمين. يمكنك اختيار الخيار المناسب لك في إعدادات الحساب.",
    },
    {
      question: "كيف أغير الاسم والمعلومات الأخرى في حسابي؟",
      answer:
        "انتقل إلى 'إعدادات الحساب' من القائمة الرئيسية، ثم اختر 'الملف الشخصي'. يمكنك تحديث اسمك ورقم هاتفك وعنوانك وغيرها من المعلومات الشخصية.",
    },
    {
      question: "كيف أحذف أو أعطل حسابي؟",
      answer:
        "لحذف حسابك، انتقل إلى 'إعدادات الحساب' ثم 'الخصوصية والأمان'. ستجد خيار 'حذف الحساب' في أسفل الصفحة. يرجى ملاحظة أن هذا الإجراء غير قابل للتراجع.",
    },
    {
      question: "كيف أقوم بتسجيل الدخول إلى زوكدوك؟",
      answer:
        "يمكنك تسجيل الدخول عبر إدخال بريدك الإلكتروني وكلمة المرور في صفحة تسجيل الدخول. يمكنك أيضًا استخدام خيارات تسجيل الدخول السريع عبر Google أو Apple.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Breadcrumb>
        <a href="/">جميع المجموعات</a>
        <span>›</span>
        <span>حسابي</span>
      </Breadcrumb>

      <Header>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <Title>حسابي</Title>
        <ArticleCount>{faqData.length} مقالات</ArticleCount>
      </Header>

      <FAQList>
        {faqData.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion
              onClick={() => toggleFAQ(index)}
              $isOpen={openIndex === index}
            >
              <QuestionText>{faq.question}</QuestionText>
              <Arrow $isOpen={openIndex === index}>›</Arrow>
            </FAQQuestion>
            <FAQAnswer $isOpen={openIndex === index}>
              <AnswerContent $isOpen={openIndex === index}>
                {faq.answer}
              </AnswerContent>
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
    </Container>
  );
};

export default Help;
