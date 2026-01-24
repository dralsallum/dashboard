import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { publicRequest } from "../../requestMethods";

const News = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- helpers ----------
  const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

  const formatDate = (date) => {
    try {
      return date
        ? new Date(date).toLocaleDateString("ar-SA")
        : new Date().toLocaleDateString("ar-SA");
    } catch {
      return new Date().toLocaleDateString("ar-SA");
    }
  };

  const SafeImage = ({ src, alt, variant = "content" }) => {
    const [hidden, setHidden] = useState(false);

    if (!isNonEmptyString(src) || hidden) return null;

    const Img = variant === "hero" ? HeroImage : ContentImage;

    return (
      <Img src={src} alt={alt} loading="lazy" onError={() => setHidden(true)} />
    );
  };

  // ---------- fetch ----------
  useEffect(() => {
    if (!id) {
      setError("لا يوجد معرف للنشرة الإخبارية");
      setLoading(false);
      return;
    }

    const fetchNewsletter = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await publicRequest.get(`/newsletter/${id}`);
        const n = res?.data;

        if (!n) throw new Error("لا توجد بيانات في الاستجابة");

        // Map backend schema -> frontend (matches your new schema exactly)
        const mapped = {
          id: n._id,
          title: n.title || "بدون عنوان",
          titleImg: n.titleImg || "",

          mainText: n.mainText || "",
          mainImg: n.mainImg || "",

          firstTitle: n.firstTitle || "",
          firstText: n.firstText || "",
          firstImg: n.firstImg || "",

          secTitle: n.secTitle || "",
          secText: n.secText || "",
          secImg: n.secImg || "",

          thirdTitle: n.thirdTitle || "",
          thirdText: n.thirdText || "",
          thirdImg: n.thirdImg || "",

          fourthTitle: n.fourthTitle || "",
          fourthText: n.fourthText || "",
          fourthImg: n.fourthImg || "",

          fivthTitle: n.fivthTitle || "",
          fivthText: n.fivthText || "",
          fivthImg: n.fivthImg || "",

          isFeatured: Boolean(n.isFeatured),
          author: n.author || "الكاتب",
          reviewedBy: n.reviewedBy || "المراجع الطبي",
          publishDate: formatDate(n.publishDate),
        };

        setData(mapped);
      } catch (err) {
        console.error("Error fetching newsletter:", err);

        if (err.response) {
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
          setError("لا يوجد اتصال بالخادم، يرجى التحقق من الإنترنت");
        } else {
          setError(err.message || "تعذر جلب بيانات النشرة الإخبارية");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]);

  // ---------- build sections dynamically (only show if it has text or image) ----------
  const sections = useMemo(() => {
    if (!data) return [];

    const rawSections = [
      {
        id: "main",
        title: "المحتوى الرئيسي",
        text: data.mainText,
        image: data.mainImg,
        fallbackTitle: "المحتوى الرئيسي",
      },
      {
        id: "first",
        title: data.firstTitle,
        text: data.firstText,
        image: data.firstImg,
        fallbackTitle: "القسم الأول",
      },
      {
        id: "second",
        title: data.secTitle,
        text: data.secText,
        image: data.secImg,
        fallbackTitle: "القسم الثاني",
      },
      {
        id: "third",
        title: data.thirdTitle,
        text: data.thirdText,
        image: data.thirdImg,
        fallbackTitle: "القسم الثالث",
      },
      {
        id: "fourth",
        title: data.fourthTitle,
        text: data.fourthText,
        image: data.fourthImg,
        fallbackTitle: "القسم الرابع",
      },
      {
        id: "fivth",
        title: data.fivthTitle,
        text: data.fivthText,
        image: data.fivthImg,
        fallbackTitle: "القسم الخامس",
      },
    ];

    return rawSections
      .filter(
        (section) =>
          isNonEmptyString(section.text) || isNonEmptyString(section.image),
      )
      .map((section) => ({
        ...section,
        title: isNonEmptyString(section.title)
          ? section.title.trim()
          : section.fallbackTitle,
      }));
  }, [data]);

  // ---------- states ----------
  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingSp>جاري التحميل…</LoadingSp>
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
      </LoadingWrapper>
    );
  }

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

  // optional intro (only show if exists)
  const introText =
    (isNonEmptyString(data.mainText) &&
      data.mainText.split("\n").slice(0, 2).join("\n")) ||
    (isNonEmptyString(data.firstText) &&
      data.firstText.split("\n").slice(0, 2).join("\n")) ||
    "";

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

          {/* Hero image only if exists */}
          <SafeImage src={data.titleImg} alt={data.title} variant="hero" />

          {/* Caption only if hero exists */}
          {isNonEmptyString(data.titleImg) && (
            <Caption>
              صورة توضيحية: {data.title}
              <br />
              <Credit>المصدر: الصورة الرئيسية للمقال</Credit>
            </Caption>
          )}

          <ContentGrid>
            <MainContent>
              {data.isFeatured && <FeaturedBadge>⭐ مقال مميز</FeaturedBadge>}

              {/* Intro only if we have content */}
              {isNonEmptyString(introText) && (
                <Intro id="intro">{introText}</Intro>
              )}

              {/* Render sections - each section shows text if exists and image if exists */}
              {sections.length > 0 ? (
                sections.map((section) => (
                  <Section key={section.id} id={section.id}>
                    <SectionTitle>{section.title}</SectionTitle>

                    {isNonEmptyString(section.text) && (
                      <Paragraph>{section.text}</Paragraph>
                    )}

                    <SafeImage
                      src={section.image}
                      alt={section.title}
                      variant="content"
                    />
                  </Section>
                ))
              ) : (
                <Paragraph>لا يوجد محتوى متاح لهذا المقال</Paragraph>
              )}

              <RelatedSection>
                <RelatedTitle>قصص ذات صلة</RelatedTitle>
                <RelatedStory>
                  <RelatedImage
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=100&q=80"
                    alt="مقال ذو صلة"
                    loading="lazy"
                  />
                  <RelatedLink href="#">
                    اقرأ المزيد من المقالات المشابهة
                  </RelatedLink>
                </RelatedStory>
              </RelatedSection>
            </MainContent>

            <Sidebar>
              {sections.length > 0 && (
                <TOCBox>
                  <TOCTitle>جدول المحتويات</TOCTitle>
                  <TOCList>
                    {isNonEmptyString(introText) && (
                      <TOCItem>
                        <TOCLink href="#intro">المقدمة</TOCLink>
                      </TOCItem>
                    )}

                    {sections.map((s) => (
                      <TOCItem key={s.id}>
                        <TOCLink href={`#${s.id}`}>{s.title}</TOCLink>
                      </TOCItem>
                    ))}
                  </TOCList>
                </TOCBox>
              )}

              <KeyTakeawaysBox>
                <KeyTitle>النقاط الرئيسية</KeyTitle>
                <KeyList>
                  <KeyItem>{data.title}</KeyItem>
                  <KeyItem>نُشر في {data.publishDate}</KeyItem>
                  <KeyItem>بقلم {data.author}</KeyItem>
                  {data.isFeatured && <KeyItem>مقال مميز ⭐</KeyItem>}
                </KeyList>
              </KeyTakeawaysBox>

              <ShareBox>
                <ShareTitle>شارك هذا المقال</ShareTitle>
                <ShareButtons>
                  <ShareButton
                    onClick={() => {
                      const url = window.location.href;
                      if (navigator.share) {
                        navigator.share({ title: data.title, url });
                      } else {
                        navigator.clipboard.writeText(url);
                        alert("تم نسخ الرابط");
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

const Increase = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(246, 224, 94, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ArticleWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  color: #1a1a1a;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
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

// ERROR STATES
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

// ARTICLE
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
  white-space: pre-wrap;
`;

const Section = styled.section`
  margin-bottom: 40px;
  scroll-margin-top: 20px;
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
  white-space: pre-wrap;
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

// SIDEBAR
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

// RELATED
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
