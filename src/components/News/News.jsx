import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";

const News = () => {
  const { id } = useParams(); // Changed from slug to id
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate id parameter exists
    if (!id) {
      setError("لا يوجد معرف للنشرة الإخبارية");
      setLoading(false);
      return;
    }

    const fetchNewsletter = async () => {
      setLoading(true);
      setError(null);

      try {
        // Call the correct backend endpoint: GET /newsletter/:id
        const response = await publicRequest.get(`/newsletter/${id}`);

        // Validate response has data
        if (!response.data) {
          throw new Error("لا توجد بيانات في الاستجابة");
        }

        // The backend now returns the newsletter directly (not nested)
        // Map and structure the data with safe fallbacks
        const newsletterData = {
          id: response.data._id,
          title: response.data.title || "بدون عنوان",
          titleImg: response.data.titleImg || "",
          mainText: response.data.mainText || "",
          mainImg: response.data.mainImg || "",
          firstText: response.data.firstText || "",
          firstImg: response.data.firstImg || "",
          isFeatured: response.data.isFeatured || false,
          author: response.data.author || "الكاتب",
          publishDate: response.data.publishDate
            ? new Date(response.data.publishDate).toLocaleDateString("ar-SA")
            : new Date().toLocaleDateString("ar-SA"),
          reviewedBy: response.data.reviewedBy || "المراجع الطبي",
        };

        setData(newsletterData);
      } catch (err) {
        console.error("Error fetching newsletter:", err);

        // Handle different error types
        if (err.response) {
          // Server responded with error status
          switch (err.response.status) {
            case 404:
              setError("النشرة الإخبارية غير موجودة");
              break;
            case 400:
              setError("معرف النشرة الإخبارية غير صالح");
              break;
            case 500:
              setError("خطأ في الخادم، يرجى المحاولة لاحقاً");
              break;
            default:
              setError("حدث خطأ أثناء جلب البيانات");
          }
        } else if (err.request) {
          // Request made but no response received
          setError("لا يوجد اتصال بالخادم، يرجى التحقق من الإنترنت");
        } else {
          // Something else happened
          setError(err.message || "تعذر جلب بيانات النشرة الإخبارية");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]); // Changed dependency from slug to id

  // Loading State
  if (loading) {
    return (
      <ArticleWrapper>
        <Container>
          <LoadingContainer>
            <Spinner />
            <LoadingText>جاري تحميل النشرة الإخبارية...</LoadingText>
          </LoadingContainer>
        </Container>
      </ArticleWrapper>
    );
  }

  // Error State
  if (error) {
    return (
      <ArticleWrapper>
        <Container>
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>عذراً، حدث خطأ</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <ErrorActions>
              <RetryButton onClick={() => window.location.reload()}>
                حاول مرة أخرى
              </RetryButton>
              <BackButton onClick={() => navigate(-1)}>العودة للخلف</BackButton>
            </ErrorActions>
          </ErrorContainer>
        </Container>
      </ArticleWrapper>
    );
  }

  // No Data State (shouldn't happen but good to have)
  if (!data) {
    return (
      <ArticleWrapper>
        <Container>
          <ErrorContainer>
            <ErrorMessage>لا توجد بيانات للعرض</ErrorMessage>
          </ErrorContainer>
        </Container>
      </ArticleWrapper>
    );
  }

  // Main Content
  return (
    <ArticleWrapper>
      <Container>
        <Article>
          <Header>
            <Title>{data.title}</Title>
            <Meta>
              <Author>
                بقلم <Link href="#">{data.author}</Link>
              </Author>
              <Separator>|</Separator>
              <PublishDate>نُشر في {data.publishDate}</PublishDate>
            </Meta>
            <ReviewedBy>
              ✓ تمت المراجعة الطبية بواسطة{" "}
              <Link href="#">{data.reviewedBy}</Link>
            </ReviewedBy>
          </Header>

          {data.titleImg && (
            <>
              <HeroImage
                src={data.titleImg}
                alt={data.title}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <Caption>
                {data.mainText || "صورة توضيحية للمقال"}
                <br />
                <Credit>الصورة من المصدر</Credit>
              </Caption>
            </>
          )}

          <ContentGrid>
            <MainContent>
              <Intro>
                {data.firstText || data.mainText || "مرحباً بك في هذا المقال"}
              </Intro>

              <Section>
                <SectionTitle>المحتوى الرئيسي</SectionTitle>
                <Paragraph>
                  {data.mainText || "المحتوى غير متوفر حالياً"}
                </Paragraph>

                {data.mainImg && (
                  <ContentImage
                    src={data.mainImg}
                    alt="صورة المحتوى"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Section>

              <Section>
                <SectionTitle>معلومات إضافية</SectionTitle>
                <Paragraph>
                  {data.firstText || "لا توجد معلومات إضافية"}
                </Paragraph>

                {data.firstImg && (
                  <ContentImage
                    src={data.firstImg}
                    alt="صورة إضافية"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Section>

              {data.isFeatured && <FeaturedBadge>⭐ مقال مميز</FeaturedBadge>}

              <RelatedSection>
                <RelatedTitle>قصص ذات صلة</RelatedTitle>
                <RelatedStory>
                  <RelatedImage
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=100&q=80"
                    alt="مقال ذو صلة"
                  />
                  <RelatedLink href="#">
                    اقرأ المزيد من المقالات المشابهة
                  </RelatedLink>
                </RelatedStory>
              </RelatedSection>
            </MainContent>

            <Sidebar>
              <TOCBox>
                <TOCTitle>جدول المحتويات</TOCTitle>
                <TOCList>
                  <TOCItem>
                    <TOCLink href="#intro">المقدمة</TOCLink>
                  </TOCItem>
                  <TOCItem>
                    <TOCLink href="#main">المحتوى الرئيسي</TOCLink>
                  </TOCItem>
                  <TOCItem>
                    <TOCLink href="#additional">معلومات إضافية</TOCLink>
                  </TOCItem>
                </TOCList>
              </TOCBox>

              <KeyTakeawaysBox>
                <KeyTitle>النقاط الرئيسية</KeyTitle>
                <KeyList>
                  <KeyItem>{data.title}</KeyItem>
                  <KeyItem>نُشر في {data.publishDate}</KeyItem>
                  {data.isFeatured && <KeyItem>مقال مميز ⭐</KeyItem>}
                </KeyList>
              </KeyTakeawaysBox>

              <ShareBox>
                <ShareTitle>شارك هذا المقال</ShareTitle>
                <ShareButtons>
                  <ShareButton
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: data.title,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    📤 مشاركة
                  </ShareButton>
                </ShareButtons>
              </ShareBox>
            </Sidebar>
          </ContentGrid>
        </Article>
      </Container>
    </ArticleWrapper>
  );
};

// =====================================================
// STYLED COMPONENTS
// =====================================================

const ArticleWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: #1a1a1a;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// =====================================================
// LOADING STATES
// =====================================================

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
`;

// =====================================================
// ERROR STATES
// =====================================================

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h2`
  font-size: 1.8rem;
  color: #d32f2f;
  margin-bottom: 12px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 500px;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const RetryButton = styled.button`
  padding: 12px 28px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052a3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const BackButton = styled.button`
  padding: 12px 28px;
  background-color: transparent;
  color: #0066cc;
  border: 2px solid #0066cc;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0066cc;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// =====================================================
// ARTICLE COMPONENTS
// =====================================================

const Article = styled.article`
  background: white;
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #000;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 8px;
  direction: rtl;
  flex-wrap: wrap;
`;

const Author = styled.span`
  color: #666;
`;

const Separator = styled.span`
  color: #ccc;
`;

const PublishDate = styled.span`
  color: #666;
`;

const ReviewedBy = styled.div`
  font-size: 0.875rem;
  color: #0066cc;
  display: flex;
  align-items: center;
  gap: 4px;
  direction: rtl;
`;

const Link = styled.a`
  color: #0066cc;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 20px 0;
`;

const Caption = styled.figcaption`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
  text-align: right;
`;

const Credit = styled.span`
  font-style: italic;
  color: #999;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  max-width: 700px;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #333;
  text-align: right;
  font-weight: 500;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000;
  text-align: right;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 16px;
  color: #333;
  text-align: right;
`;

const FeaturedBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
`;

// =====================================================
// SIDEBAR COMPONENTS
// =====================================================

const Sidebar = styled.aside`
  @media (max-width: 968px) {
    order: -1;
  }
`;

const TOCBox = styled.div`
  background: #f8f9fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: sticky;
  top: 20px;
`;

const TOCTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000;
  text-align: right;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li`
  margin-bottom: 12px;
  text-align: right;
`;

const TOCLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #0052a3;
    text-decoration: underline;
  }
`;

const KeyTakeawaysBox = styled.div`
  background: #f0f7ff;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const KeyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000;
  text-align: right;
`;

const KeyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const KeyItem = styled.li`
  position: relative;
  padding-right: 24px;
  padding-left: 0;
  margin-bottom: 16px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #333;
  text-align: right;

  &::before {
    content: "■";
    position: absolute;
    right: 0;
    left: auto;
    color: #0066cc;
    font-size: 0.7rem;
    top: 0.35em;
  }
`;

const ShareBox = styled.div`
  background: #fff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
`;

const ShareTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000;
  text-align: right;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const ShareButton = styled.button`
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: #0052a3;
  }
`;

// =====================================================
// RELATED CONTENT
// =====================================================

const RelatedSection = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e1e4e8;
`;

const RelatedTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
  text-align: right;
`;

const RelatedStory = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s;
  direction: rtl;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RelatedImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

const RelatedLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: right;

  &:hover {
    color: #0066cc;
  }
`;

export default News;
