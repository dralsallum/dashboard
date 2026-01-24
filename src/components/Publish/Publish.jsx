import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { publicRequest } from "../../requestMethods";
import Mail from "../../assets/gmail.png";
export const Increase = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  direction: rtl;
  color: #444;
  background: #f7f2e6;
  font-size: 1.2rem;
  font-weight: 600;
  min-height: 100dvh;
`;

export const LoadingSp = styled.span`
  margin-bottom: 12px;
`;

export const LoadingBarFill = styled.div`
  height: 100%;
  background-color: #f6e05e;
  border-radius: 4px;
  animation: ${Increase} 3s ease-out forwards;
  width: 0%;
`;
const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  direction: rtl;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 15px;
  }
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 1.5fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    /* Reorder cards on mobile - Ad card (3rd in RTL) appears first */
    & > *:nth-child(1) {
      order: 3;
    }
    & > *:nth-child(2) {
      order: 2;
    }
    & > *:nth-child(3) {
      order: 1;
    }
  }
`;

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(248, 196, 79, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(248, 196, 79, 0.1);
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(248, 196, 79, 0.12);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(248, 196, 79, 0.08) 100%
    );
  }
`;

const FeaturedCardImage = styled(CardImage)`
  height: 450px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const CardContent = styled.div`
  padding: 20px 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Category = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #d4a944;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: inline-block;
  background: rgba(248, 196, 79, 0.1);
  padding: 4px 12px;
  border-radius: 16px;
  align-self: flex-end;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
  margin: 0 0 12px 0;
  flex: 1;
  transition: color 0.2s ease;
`;

const CardMeta = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: auto;
`;

const NewsCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  border: none;
`;

const NewsHeader = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: right;
  backdrop-filter: blur(10px);
`;

const NewsContent = styled.div`
  padding: 24px;
  text-align: right;
`;

const NewsItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(-5px);
  }
`;

const NewsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const NewsMeta = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
`;

const NewsTime = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
`;

const ReadMoreButton = styled.button`
  background: white;
  border: 2px solid white;
  color: #d4a944;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-right: auto;
  outline: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
  }
`;

const AdCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  justify-content: space-between;
  text-align: center;
  padding: 20px 15px;
  min-height: 100%;
  border: none;
`;

const AdImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const AdTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  margin: 0 0 24px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdButton = styled.button`
  background: white;
  border: none;
  color: #d4a944;
  padding: 14px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  outline: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
  }
`;

const EditorsCard = styled(Card)`
  background: linear-gradient(135deg, #f8c44f 0%, #f5b93a 100%);
  text-align: center;
  padding: 24px 16px;
  justify-content: center;
  border: none;
`;

const EditorsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EditorsSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 20px 0;
  font-weight: 500;
`;

const EditorButton = styled.button`
  background: white;
  border: 2px solid white;
  color: #d4a944;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin: 6px 0;
  width: 100%;
  max-width: 280px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  outline: none;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(246, 224, 94, 0.2);
  border-radius: 4px;
  overflow: hidden;

  position: relative;
`;

const SubscribeCon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba (0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 32px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: rtl;
  text-align: center;
  @media (max-width: 768px) {
    padding: 32px 24px;
    max-width: 90%;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background: transparent;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background: rgba(248, 196, 79, 0.1);
    color: #d4a944;
  }

  &:focus {
    outline: none;
  }
`;

const ModalIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135 deg, #f8c44f 0 %, #f5b93a 100 %);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
`;
const ModalIconImg = styled.img`
  width: 64px;
  height: 64px;
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 16px;

  color: #666;

  margin: 0 0 32px 0;

  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const InputWrapper = styled.div`
  margin-bottom: 24px;
`;
const EmailInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  direction: rtl;
  text-align: right;
  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #f8c44f;

    box-shadow: 0 0 0 4px rgba(248, 196, 79, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 15px;

    padding: 12px 16px;
  }
`;
const SubscribeButton = styled.button`
  width: 100%;
  background: #f7c24b;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(248, 196, 79, 0.3);
  outline: none;
  &:hover {
    transform: translateY (-2px);
    box-shadow: 0 6px 16px rgba(248, 196, 79, 0.4);
  }

  &:active {
    transform: translateY (0);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 12px 28px;
  }
`;
const PrivacyText = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 16px;
  line-height: 1.5;
`;

// Helper function to format time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const created = new Date(date);
  const diffInMs = now - created;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "منذ دقائق";
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  }
};

const Publish = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribe, setSubscribe] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicRequest.get("/newsletter?limit=8&page=1");

      // Handle both response formats
      const newsletterData = response.data.data || response.data;
      setNewsletters(Array.isArray(newsletterData) ? newsletterData : []);
    } catch (err) {
      console.error("Error fetching newsletters:", err);
      setError("فشل في تحميل النشرات الإخبارية. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterClick = (id) => {
    // Navigate to newsletter detail page
    window.location.href = `/knowledge/${id}`;
  };

  const handleClose = () => setSubscribe(false);

  if (subscribe)
    return (
      <SubscribeCon>
        <ModalContainer>
          <CloseButton onClick={handleClose}>x</CloseButton>
          <ModalIcon>
            <ModalIconImg src={Mail} alt="" />
          </ModalIcon>
          <ModalTitle>اشترك في نشرتنا </ModalTitle>
          <ModalSubtitle>
            احصل على آخر الأخبار والمقالات المميزة مباشرة في بريدك الالكتروني
          </ModalSubtitle>
          <InputWrapper>
            <EmailInput
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              dir="rtl"
            />
          </InputWrapper>
          <SubscribeButton>اشترك</SubscribeButton>
          <PrivacyText>
            نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث.
          </PrivacyText>
        </ModalContainer>
      </SubscribeCon>
    );

  if (loading)
    return (
      <LoadingWrapper>
        <LoadingSp>جاري التحميل…</LoadingSp>
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
      </LoadingWrapper>
    );

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  // Split newsletters for display
  const featuredNewsletter = newsletters[0]; // Main featured article
  const newsItems = newsletters.slice(1, 5); // 4 items for news card
  const bottomNewsletters = newsletters.slice(5, 8); // 3 items for bottom row

  return (
    <Container>
      <Grid>
        {/* FIRST ROW - 3 columns (reversed order for RTL) */}
        <FirstRow>
          {/* Ad Card - Featured Newsletter or First Newsletter */}
          {featuredNewsletter && (
            <AdCard
              onClick={() => handleNewsletterClick(featuredNewsletter._id)}
            >
              <div>
                <AdImage src={featuredNewsletter.titleImg} />
                <AdTitle>{featuredNewsletter.title}</AdTitle>
              </div>
              <AdButton>اقرأ المزيد</AdButton>
            </AdCard>
          )}

          {/* News and Trending Card */}
          <NewsCard>
            <NewsHeader>الأخبار والشائع</NewsHeader>
            <NewsContent>
              {newsItems.length > 0 ? (
                newsItems.map((newsletter) => (
                  <NewsItem
                    key={newsletter._id}
                    onClick={() => handleNewsletterClick(newsletter._id)}
                  >
                    <NewsTitle>{newsletter.title}</NewsTitle>
                    {newsletter.author && (
                      <NewsMeta>بقلم {newsletter.author}</NewsMeta>
                    )}
                    <NewsTime>{getTimeAgo(newsletter.createdAt)}</NewsTime>
                  </NewsItem>
                ))
              ) : (
                <NewsItem>
                  <NewsTitle>لا توجد أخبار متاحة حالياً</NewsTitle>
                </NewsItem>
              )}
              <ReadMoreButton
                onClick={() => (window.location.href = "/newsletters")}
              >
                <span>←</span> اقرأ المزيد من الأخبار
              </ReadMoreButton>
            </NewsContent>
          </NewsCard>

          {/* Main Featured Article - Second Newsletter */}
          {newsletters[1] && (
            <Card onClick={() => handleNewsletterClick(newsletters[1]._id)}>
              <FeaturedCardImage src={newsletters[1].titleImg} />
              <CardContent>
                {newsletters[1].category && (
                  <Category>{newsletters[1].category}</Category>
                )}
                <CardTitle>{newsletters[1].title}</CardTitle>
                {newsletters[1].author && (
                  <CardMeta>بقلم {newsletters[1].author}</CardMeta>
                )}
              </CardContent>
            </Card>
          )}
        </FirstRow>

        {/* SECOND ROW - 4 columns (reversed order for RTL) */}
        <SecondRow>
          {/* Editors' Picks Card */}
          <EditorsCard>
            <div>
              <EditorsTitle>اختيارات المحررين</EditorsTitle>
              <EditorsSubtitle>
                محتوى منسق حول المواضيع التي تهمك
              </EditorsSubtitle>
            </div>
            <div>
              <EditorButton
                onClick={() => (window.location.href = "/category/skin-health")}
              >
                صحة البشرة
              </EditorButton>
              <EditorButton
                onClick={() => (window.location.href = "/category/supplements")}
              >
                المكملات الغذائية
              </EditorButton>
              <EditorButton
                onClick={() => (window.location.href = "/category/nutrition")}
              >
                التغذية الصحية
              </EditorButton>
              <EditorButton
                onClick={() => (window.location.href = "/category/wellness")}
              >
                الصحة العامة
              </EditorButton>
            </div>
          </EditorsCard>

          {/* Display remaining newsletters */}
          {bottomNewsletters.map((newsletter) => (
            <Card
              key={newsletter._id}
              onClick={() => handleNewsletterClick(newsletter._id)}
            >
              <CardImage src={newsletter.titleImg} />
              <CardContent>
                {newsletter.category && (
                  <Category>{newsletter.category}</Category>
                )}
                <CardTitle>{newsletter.title}</CardTitle>
                {newsletter.author && (
                  <CardMeta>بقلم {newsletter.author}</CardMeta>
                )}
              </CardContent>
            </Card>
          ))}
        </SecondRow>
      </Grid>
    </Container>
  );
};

export default Publish;
